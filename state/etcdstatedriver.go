package state

import (
	"errors"
	"fmt"
	"reflect"
	"strings"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/coreos/etcd/client"
	"golang.org/x/net/context"

	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
)

const (

	// timeout used for etcd client calls
	ctxTimeout = 20 * time.Second

	// max times to retry in case of failure
	maxEtcdRetries = 10
)

// EtcdStateDriver implements the StateDriver interface for an etcd-based
// distributed key-value store that is used to store any state information
// needed by auth proxy
type EtcdStateDriver struct {

	// Client to access etcd
	Client client.Client

	// KeysAPI is used to interact with etcd's key-value
	// API over HTTP
	KeysAPI client.KeysAPI
}

//
// Init initializes the state driver with needed config
//
// Parameters:
//   config: configuration parameters to create etcd client
//
// Return values:
//   error:  error when creating an etcd client
//
func (d *EtcdStateDriver) Init(config *types.KVStoreConfig) error {
	var err error

	if config == nil || !strings.Contains(config.StoreURL, "etcd://") {
		return errors.New("Invalid etcd config")
	}

	// configure etcd endpoints
	etcdURL := strings.Replace(config.StoreURL, "etcd://", "http://", 1)
	etcdConfig := client.Config{
		Endpoints: []string{etcdURL},
	}

	// create etcd client
	d.Client, err = client.New(etcdConfig)
	if err != nil {
		log.Fatalf("failed to create etcd client, err: %v", err)
	}

	// create keys api
	d.KeysAPI = client.NewKeysAPI(d.Client)

	for _, dir := range types.DatastoreDirectories {
		// etcd paths begin with a slash
		d.Mkdir("/" + dir)
	}

	return nil
}

// Deinit is currently a no-op
func (d *EtcdStateDriver) Deinit() {}

// Mkdir creates a directory.  If it already exists, this is a no-op.
//
// Parameters:
//   key: target directory path (must begin with a slash)
//
// Return values:
//   error: Error encountered when creating the directory
//   nil:   successfully created directory
//
func (d *EtcdStateDriver) Mkdir(key string) error {
	ctx, cancel := context.WithTimeout(context.Background(), ctxTimeout)
	defer cancel()

	// sanity test
	if !strings.HasPrefix(key, "/") {
		return fmt.Errorf(
			"etcd keys must begin with a slash (got '%s')",
			key,
		)
	}

	for i := 0; ; i++ {
		_, err := d.KeysAPI.Set(ctx, key, "", &client.SetOptions{Dir: true})
		if err == nil {
			return nil
		}

		// Retry few times if cluster is unavailable
		if err.Error() == client.ErrClusterUnavailable.Error() {
			if i < maxEtcdRetries {
				// Retry after a delay
				time.Sleep(time.Second)
				continue
			}
		}

		return err
	}
}

//
// Write state (consisting of a key-value pair) to the etcd
// KV store
//
// Parameters:
//   key:    key to be stored
//   value:  value to be stored
//
// Return values:
//   error: Error when writing to the KeysAPI of etcd client
//          nil if successful
//
func (d *EtcdStateDriver) Write(key string, value []byte) error {
	ctx, cancel := context.WithTimeout(context.Background(), ctxTimeout)
	defer cancel()

	_, err := d.KeysAPI.Set(ctx, key, string(value[:]), nil)
	if err != nil {
		// Retry few times if cluster is unavailable
		if err.Error() == client.ErrClusterUnavailable.Error() {
			for i := 0; i < maxEtcdRetries; i++ {
				_, err = d.KeysAPI.Set(ctx, key, string(value[:]), nil)
				if err == nil {
					break
				}

				// Retry after a delay
				time.Sleep(time.Second)
			}
		}
	}

	return err
}

//
// Read returns state for a key
//
// Parameters:
//   key:    key for which value is to be retrieved
//
// Return values:
//   []byte: value associated with the given key
//   error: Error when writing to the KeysAPI of etcd client
//          nil if successful
//
func (d *EtcdStateDriver) Read(key string) ([]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), ctxTimeout)
	defer cancel()

	var err error
	var resp *client.Response

	// i <= maxEtcdRetries to ensure that the initial `GET` call is also incorporated along with retries
	for i := 0; i <= maxEtcdRetries; i++ {
		resp, err = d.KeysAPI.Get(ctx, key, &client.GetOptions{Quorum: true})

		if err == nil {
			// on successful read
			return []byte(resp.Node.Value), nil
		} else if client.IsKeyNotFound(err) {
			return nil, auth_errors.ErrKeyNotFound
		} else if err.Error() == client.ErrClusterUnavailable.Error() {
			// retry after a delay
			time.Sleep(time.Second)
			continue
		}

	}

	return []byte{}, err
}

//
// ReadAll returns all values for a key
//
// Parameters:
//   key:    key for which all values are to be retrieved
//
// Return values:
//   [][]byte: slice of values associated with the given key
//   error:    Error when writing to the KeysAPI of etcd client
//             nil if successful
//
func (d *EtcdStateDriver) ReadAll(baseKey string) ([][]byte, error) {
	ctx, cancel := context.WithTimeout(context.Background(), ctxTimeout)
	defer cancel()

	var err error
	var resp *client.Response

	// i <= maxEtcdRetries to ensure that the initial `GET` call is also incorporated along with retries
	for i := 0; i <= maxEtcdRetries; i++ {
		resp, err = d.KeysAPI.Get(ctx, baseKey, &client.GetOptions{Recursive: true, Quorum: true})

		if err == nil {
			// on successful read
			values := [][]byte{}
			for _, node := range resp.Node.Nodes {
				values = append(values, []byte(node.Value))
			}

			return values, nil
		} else if client.IsKeyNotFound(err) {
			return nil, auth_errors.ErrKeyNotFound
		} else if err.Error() == client.ErrClusterUnavailable.Error() {
			// retry after a delay
			time.Sleep(time.Second)
			continue
		}

	}

	return [][]byte{}, err
}

//
// Clear removes a key from etcd
//
// Parameters:
//   key: key to be removed
//
// Return value:
//   error: Error returned by etcd client when deleting a key
//
func (d *EtcdStateDriver) Clear(key string) error {
	ctx, cancel := context.WithTimeout(context.Background(), ctxTimeout)
	defer cancel()

	_, err := d.KeysAPI.Delete(ctx, key, nil)

	if client.IsKeyNotFound(err) {
		return nil
	}

	return err
}

//
// ClearState removes a key from etcd
//
// Parameters:
//   key: key to be removed
//
// Return value:
//   error: Error returned by etcd client when deleting a key
//
func (d *EtcdStateDriver) ClearState(key string) error {
	return d.Clear(key)
}

//
// ReadState reads a key's value into a types.State struct using
// the provided unmarshaling function.
//
// Parameters:
//   key:       key whose value is to be retrieved
//   value:     value of the key as types.State
//   unmarshal: function to be used for unmarshaling the (byte
//              slice) value into types.State struct
//
// Return value:
//   error: Error returned by etcd client when reading key's value
//          or error in unmarshaling key's value
//
func (d *EtcdStateDriver) ReadState(key string, value types.State,
	unmarshal func([]byte, interface{}) error) error {

	encodedState, err := d.Read(key)
	if err != nil {
		return err
	}

	return unmarshal(encodedState, value)
}

//
// readAllStateCommon reads and unmarshals (given a function) all state into a
// slice of type types.State
//
// Parameters:
//   d:          StateDriver abstracting etcd or consul KV store
//   baseKey:    key whose state is to be read from KV store
//   sType:      State
//   unmarshal:  Unmarshal function to convert key's value from a byte slice
//               to a struct of type types.State
//
// Return value:
//   []types.State: slice of states
//   error:         Error returned when reading the key and unmarshaling it
//                  nil if successful
//
func readAllStateCommon(d types.StateDriver, baseKey string, sType types.State,
	unmarshal func([]byte, interface{}) error) ([]types.State, error) {

	stateType := reflect.TypeOf(sType)
	sliceType := reflect.SliceOf(stateType)
	values := reflect.MakeSlice(sliceType, 0, 1)

	byteValues, err := d.ReadAll(baseKey)
	if err != nil {
		return nil, err
	}
	for _, byteValue := range byteValues {
		value := reflect.New(stateType)
		err = unmarshal(byteValue, value.Interface())
		if err != nil {
			return nil, err
		}
		values = reflect.Append(values, value.Elem())
	}

	stateValues := []types.State{}
	for i := 0; i < values.Len(); i++ {
		// sanity checks
		if !values.Index(i).Elem().FieldByName("CommonState").IsValid() {
			return nil, auth_errors.ErrCommonStateFieldsMissing
		}

		//the following works as every types.State is expected to embed core.CommonState struct
		values.Index(i).Elem().FieldByName("CommonState").FieldByName("StateDriver").Set(reflect.ValueOf(d))
		stateValue := values.Index(i).Interface().(types.State)
		stateValues = append(stateValues, stateValue)
	}
	return stateValues, nil
}

//
// ReadAllState returns all state for a key
//
// Parameters:
//   baseKey:    key whose values are to be read
//   sType:      types.State struct into which values are to be
//               unmarshaled
//   unmarshal:  function that is used to convert key's values to
//               values of type types.State
//
// Return values:
//   []types.State: slice of states for the given key
//   error:         Any error returned by readAllStateCommon
//                  nil if successful
//
func (d *EtcdStateDriver) ReadAllState(baseKey string, sType types.State,
	unmarshal func([]byte, interface{}) error) ([]types.State, error) {
	return readAllStateCommon(d, baseKey, sType, unmarshal)
}

//
// WriteState writes a value of types.State for a key in the KV store
//
// Parameters:
//   key:   key to be stored in the KV store
//   value: value as types.State
//   marshal: function to be used to convert types.State to a form
//            that can be stored in the KV store
//
// Return values:
//   error: Error while marshaling or writing a key-value pair
//          to the KV store
//
func (d *EtcdStateDriver) WriteState(key string, value types.State,
	marshal func(interface{}) ([]byte, error)) error {
	encodedState, err := marshal(value)
	if err != nil {
		return err
	}

	return d.Write(key, encodedState)
}
