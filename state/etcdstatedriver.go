package state

import (
	"errors"
	"reflect"
	"strings"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/coreos/etcd/client"
	"golang.org/x/net/context"

	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
)

const (

	// timeout used for etcd client calls
	ctxTimeout = 20 * time.Second

	// max times to retry in case of failure
	maxEtcdRetries = 10
)

// EtcdStateDriver implements the StateDriver interface for an etcd-based
// distributed key-value store that is used to store any state information
// needed by CCN proxy
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

	return nil
}

// Deinit is currently a no-op
func (d *EtcdStateDriver) Deinit() {}

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
			return nil, ccnerrors.ErrKeyNotFound
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
			return nil, ccnerrors.ErrKeyNotFound
		} else if err.Error() == client.ErrClusterUnavailable.Error() {
			// retry after a delay
			time.Sleep(time.Second)
			continue
		}

	}

	return [][]byte{}, err
}

//
// channelEtcdEvents
//
// Parameters:
//   watcher:        Any struct that implements the Watcher interface provided
//                   by the etcd client
//   chValueChanges: Channel of type [2][]byte used to communicate the value changes
//                   for a key in the KV store
//
func (d *EtcdStateDriver) channelEtcdEvents(watcher client.Watcher, chValueChanges chan [2][]byte) {
	for {
		// block on change notifications
		etcdRsp, err := watcher.Next(context.Background())
		if err != nil {
			log.Errorf("Error %v during watch", err)
			time.Sleep(time.Second)
			continue
		}

		// The logic below assumes that the node returned is always a node
		// of interest. Eg: If we set a watch on /a/b/c, then we are mostly
		// interested in changes in that directory i.e. changes to /a/b/c/d1..d2
		byteValues := [2][]byte{nil, nil}
		eventStr := "create"

		// store current node value
		if etcdRsp.Node.Value != "" {
			byteValues[0] = []byte(etcdRsp.Node.Value)
		}

		// store previous node value
		if etcdRsp.PrevNode != nil && etcdRsp.PrevNode.Value != "" {
			byteValues[1] = []byte(etcdRsp.PrevNode.Value)
			if etcdRsp.Node.Value != "" {
				eventStr = "modify"
			} else {
				eventStr = "delete"
			}
		}

		log.Debugf("Observed event:%q for key: %s", eventStr, etcdRsp.Node.Key)

		// send changes in values for the key to a channel
		chValueChanges <- byteValues
	}
}

//
// WatchAll watches value changes for a key in etcd
//
// Parameters:
//   baseKey:        key for which changes are to be watched
//   chValueChanges: channel for communicating the changes in
//                   the values for a key from this method
//
// Return values:
//   error: Any error when watching for a state transition
//          for a key
//          nil if successful
//
func (d *EtcdStateDriver) WatchAll(baseKey string, chValueChanges chan [2][]byte) error {

	watcher := d.KeysAPI.Watcher(baseKey, &client.WatcherOptions{Recursive: true})
	if watcher == nil {
		log.Errorf("etcd watch failed")
		return errors.New("etcd watch failed")
	}

	go d.channelEtcdEvents(watcher, chValueChanges)

	return nil
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
			return nil, ccnerrors.ErrCommonStateFieldsMissing
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
// channelStateEvents watches for updates (create, modify, delete) to a state of
// specified type and unmarshals (given a function) all changes and puts them on
// a channel of types.WatchState objects.
//
// Parameters:
//    d:              StateDriver that abstracts access to etcd or consul
//    sType:          types.State
//    unmarshal:      function used to unmarshall byte slice values into
//                    type types.State
//    chValueChanges: channel of [2][]byte via which this method
//                    returns any value changes that were observed in the KV store
//    chStateChanges: channel of type types.WatchState via which this method
//                    returns any state changes that were observed in the KV store
//    chErr:          channel of type error via which this method returns
//                    any errors encountered
//
func channelStateEvents(d types.StateDriver, sType types.State,
	unmarshal func([]byte, interface{}) error,
	chValueChanges chan [2][]byte,
	chStateChanges chan types.WatchState,
	chErr chan error) {

	for {
		// block on change notifications
		byteRsp := <-chValueChanges

		stateChange := types.WatchState{Curr: nil, Prev: nil}
		for i := 0; i < 2; i++ {
			if byteRsp[i] == nil {
				continue
			}
			stateType := reflect.TypeOf(sType)
			value := reflect.New(stateType)
			err := unmarshal(byteRsp[i], value.Interface())
			if err != nil {
				chErr <- err
				return
			}
			if !value.Elem().Elem().FieldByName("CommonState").IsValid() {
				chErr <- ccnerrors.ErrCommonStateFieldsMissing
				return
			}

			//the following works as every types.State is expected to embed core.CommonState struct
			value.Elem().Elem().FieldByName("CommonState").FieldByName("StateDriver").Set(reflect.ValueOf(d))
			switch i {
			case 0:
				stateChange.Curr = value.Elem().Interface().(types.State)
			case 1:
				stateChange.Prev = value.Elem().Interface().(types.State)
			}
		}

		// send state changes for the key to a channel
		chStateChanges <- stateChange
	}
}

//
// WatchAllState watches all state from the baseKey
//
// Parameters:
//    baseKey:        key to be watched
//    sType:          types.State struct to convert values to
//    unmarshal:      function used to convert values to types.State
//    chStateChanges: channel of types.WatchState
//
// Return values:
//    error: Any error when watching all state
//
func (d *EtcdStateDriver) WatchAllState(baseKey string, sType types.State,
	unmarshal func([]byte, interface{}) error, chStateChanges chan types.WatchState) error {

	// channel that will be used to communicate value changes
	// from the WatchAll function
	chValueChanges := make(chan [2][]byte, 1)

	// channel that will be used to communicate errors
	// from the channelStateEvents method
	chErr := make(chan error, 1)

	go channelStateEvents(d, sType, unmarshal, chValueChanges, chStateChanges, chErr)

	err := d.WatchAll(baseKey, chValueChanges)
	if err != nil {
		return err
	}

	err = <-chErr
	return err
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
