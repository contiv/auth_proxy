package state

import (
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/hashicorp/consul/api"

	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
)

// Max times to retry in case of failure
const maxConsulRetries = 10

// ConsulStateDriver implements the StateDriver interface for a
// consul-based distributed key-value store used to store any
// state information needed by auth_proxy
type ConsulStateDriver struct {

	// client used to access consul
	Client *api.Client
}

//
// Init initializes the state driver with needed configuration
//
// Parameters:
//   config: configuration parameters to create consul client
//
// Return values:
//   error:  error when creating a consul client
//
func (d *ConsulStateDriver) Init(config *types.KVStoreConfig) error {
	var err error

	if config == nil || !strings.Contains(config.StoreURL, "consul://") {
		return errors.New("Invalid consul config")
	}

	cfg := api.Config{
		Address: strings.TrimPrefix(config.StoreURL, "consul://"),
	}

	// create a consul client
	d.Client, err = api.NewClient(&cfg)
	if err != nil {
		return err
	}

	for _, dir := range types.DatastoreDirectories {
		// consul directories are created by appending a slash
		d.Mkdir(dir + "/")
	}

	return nil
}

// Deinit is currently a no-op.
func (d *ConsulStateDriver) Deinit() {
}

// Mkdir creates a directory.  If it already exists, this is a no-op.
//
// Parameters:
//   key: target directory path (must have trailing slash and not begin with a slash)
//
// Return values:
//   error: Error encountered when creating the directory
//   nil:   successfully created directory
//
func (d *ConsulStateDriver) Mkdir(key string) error {
	key = processKey(key)

	// sanity test
	if !strings.HasSuffix(key, "/") {
		return fmt.Errorf(
			"consul directory keys must end with a trailing slash (got '%s')",
			key,
		)
	}

	for i := 0; ; i++ {
		_, err := d.Client.KV().Put(&api.KVPair{Key: key, Value: nil}, nil)
		if err == nil {
			return nil
		}

		if api.IsServerError(err) || strings.Contains(err.Error(), "EOF") ||
			strings.Contains(err.Error(), "connection refused") {

			if i < maxConsulRetries {
				// Retry after a delay
				time.Sleep(time.Second)
				continue
			}
		}

		return err
	}

}

//
// processKey truncates the leading slash in a key
// (needed because consul doesn't accept keys with a leading '/')
//
// Parameters:
//   inKey: key string that may have a leading '/'
//
// Return value:
//   string: key string with trimmed leading '/'
//
func processKey(inKey string) string {
	return strings.TrimPrefix(inKey, "/")
}

//
// Write a key-value pair to the consul KV store
//
// Parameters:
//   key:    key to be stored
//   value:  value to be stored
//
// Return values:
//   error: Error when writing a KV pair via the consul client
//          nil if successful
//
func (d *ConsulStateDriver) Write(key string, value []byte) error {
	key = processKey(key)
	_, err := d.Client.KV().Put(&api.KVPair{Key: key, Value: value}, nil)
	if err != nil && (api.IsServerError(err) || strings.Contains(err.Error(), "EOF") ||
		strings.Contains(err.Error(), "connection refused")) {
		for i := 0; i < maxConsulRetries; i++ {
			_, err = d.Client.KV().Put(&api.KVPair{Key: key, Value: value}, nil)
			if err == nil {
				break
			}

			// Retry after a delay
			time.Sleep(time.Second)
		}
	}

	return err
}

//
// Read returns the value for a key
//
// Parameters:
//   key:    key for which value is to be retrieved
//
// Return values:
//   []byte: value associated with the given key
//   error: Error when reading from consul
//          nil if successful
//
func (d *ConsulStateDriver) Read(key string) ([]byte, error) {
	key = processKey(key)
	kv, _, err := d.Client.KV().Get(key, nil)
	if err != nil {
		if api.IsServerError(err) || strings.Contains(err.Error(), "EOF") ||
			strings.Contains(err.Error(), "connection refused") {
			for i := 0; i < maxConsulRetries; i++ {
				kv, _, err = d.Client.KV().Get(key, nil)
				if err == nil {
					break
				}

				// Retry after a delay
				time.Sleep(time.Second)
			}
		} else {
			return []byte{}, err
		}
	}

	// Consul returns success and a nil kv when a key is not found,
	// translate it to 'Key not found' error
	if kv == nil {
		return []byte{}, auth_errors.ErrKeyNotFound
	}

	return kv.Value, err
}

//
// ReadAll returns all state for a key
//
// Parameters:
//   key:    key for which all values are to be retrieved
//
// Return values:
//   [][]byte: list of values associated with the given key
//   error: Error when writing to the KeysAPI of consul client
//          nil if successful
//
func (d *ConsulStateDriver) ReadAll(baseKey string) ([][]byte, error) {
	baseKey = processKey(baseKey)

	kvs, _, err := d.Client.KV().List(baseKey, nil)
	if err != nil {
		return nil, err
	}
	// Consul returns success and a nil kv when a key is not found,
	// translate it to 'Key not found' error
	if kvs == nil {
		return nil, auth_errors.ErrKeyNotFound
	}

	values := [][]byte{}
	for _, kv := range kvs {
		// if you KV().List() a directory called "foo", one of the results
		// will be a key called "foo/" with a 0 byte value.  we need to
		// skip these since empty strings aren't valid JSON records.
		if len(kv.Value) == 0 {
			continue
		}

		values = append(values, kv.Value)
	}

	return values, nil
}

//
// Clear clears the value for a key in consul
//
// Parameters:
//   key: key for which value is to be cleared
//
// Return value:
//   error: Error returned by consul client when deleting a key
//
func (d *ConsulStateDriver) Clear(key string) error {
	key = processKey(key)
	_, err := d.Client.KV().Delete(key, nil)
	return err
}

//
// ClearState clears the state for a key in consul
//
// Parameters:
//   key: key for which state is to be cleared
//
// Return value:
//   error: Error returned by consul client when deleting a key
//
func (d *ConsulStateDriver) ClearState(key string) error {
	return d.Clear(key)
}

//
// ReadState reads key into a types.State using the provided
// unmarshaling function
//
// Parameters:
//   key:        key whose value is to be retrieved
//   value:      retrieved value for the key
//   unmarshal: function to be used for unmarshaling retrieved
//               value from a byte slice in to type types.State
//
// Return value:
//   error: Error returned by consul client when reading key's value
//          or error in unmarshaling key's value
//
func (d *ConsulStateDriver) ReadState(key string, value types.State,
	unmarshal func([]byte, interface{}) error) error {
	key = processKey(key)
	encodedState, err := d.Read(key)
	if err != nil {
		return err
	}

	return unmarshal(encodedState, value)
}

//
// ReadAllState reads all the state for a baseKey and returns
// a list of types.State
//
// Parameters:
//   baseKey:    key whose values are to be read
//   sType:      types.State
//   unmarshal:  function that is used to convert key's values
//               from a byte slice to values of type types.State
//
// Return values:
//   []types.State: Retrieved values for a key as type types.State
//   error:         Any error returned by readAllStateCommon
//
func (d *ConsulStateDriver) ReadAllState(baseKey string, sType types.State,
	unmarshal func([]byte, interface{}) error) ([]types.State, error) {
	baseKey = processKey(baseKey)
	return readAllStateCommon(d, baseKey, sType, unmarshal)
}

//
// WriteState writes state for a key into the consul KV store
//
// Parameters:
//   key:     key to be stored in the KV store
//   value:   value to be stored for the key
//   marshal: function to be used to convert types.State to
//            a byte slice
//
// Return values:
//   error: Error while marshaling values for key or
//          when writing the key-value pair to consul,
//          nil if successful
//
func (d *ConsulStateDriver) WriteState(key string, value types.State,
	marshal func(interface{}) ([]byte, error)) error {
	key = processKey(key)
	encodedState, err := marshal(value)
	if err != nil {
		return err
	}

	return d.Write(key, encodedState)
}
