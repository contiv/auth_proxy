package state

import (
	"errors"
	"fmt"
	"net/url"
	"strings"
	"time"

	log "github.com/Sirupsen/logrus"
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
	var endpoint *url.URL

	if config == nil {
		return errors.New("Invalid consul config")
	}

	endpoint, err = url.Parse(config.StoreURL)
	if err != nil {
		return err
	}
	if endpoint.Scheme == "consul" {
		endpoint.Scheme = "http"
	} else if endpoint.Scheme != "http" && endpoint.Scheme != "https" {
		return fmt.Errorf("invalid consul URL scheme %q", endpoint.Scheme)
	}
	cfg := api.Config{
		Address: endpoint.Host,
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
// channelConsulEvents
//
// Parameters:
//   baseKey:        Key for which any state changes are to be notified
//   kvCache:        map of already seen keys
//   chKVPairs:      channel on which change notifications are received
//   chValueChanges: channel using which any value changes are communicated
//                   to the caller
//   chErr:          channel using which any errors are communicated to the
//                   caller
//   chStop:         channel using which waiting for events can be stopped
//
func (d *ConsulStateDriver) channelConsulEvents(baseKey string, kvCache map[string]*api.KVPair,
	chKVPairs chan api.KVPairs, chValueChanges chan [2][]byte, chErr chan error, chStop chan bool) {
	for {
		select {
		// block on change notifications
		case kvs := <-chKVPairs:
			kvsRcvd := map[string]*api.KVPair{}
			// Generate Create/Modifiy events for the keys recvd
			for _, kv := range kvs {
				// XXX: The logic below assumes that the node returned is always a node
				// of interest. Eg: If we set a watch on /a/b/c, then we are mostly
				// interested in changes in that directory i.e. changes to /a/b/c/d1..d2
				kvsRcvd[kv.Key] = kv
				valueChange := [2][]byte{nil, nil}
				valueChange[0] = kv.Value
				if kvSeen, ok := kvCache[kv.Key]; !ok {
					log.Debugf("Received create for key: %q, kv: %+v", kv.Key, kv)
				} else if kvSeen.ModifyIndex != kv.ModifyIndex {
					log.Debugf("Received modify for key: %q, kv: %+v", kv.Key, kv)
					valueChange[1] = kvSeen.Value
				} else {
					// no changes to the key, skipping
					log.Debugf("Skipping key with no changes: %s", kv.Key)
					continue
				}
				//update the map of seen keys
				kvCache[kv.Key] = kv

				//channel the translated response
				chValueChanges <- valueChange
			}

			// Generate Delete events for missing keys
			for key, kv := range kvCache {
				if _, ok := kvsRcvd[key]; !ok {
					log.Debugf("Received delete for key: %q, Pair: %+v", kv.Key, kv)
					chValueChanges <- [2][]byte{nil, kv.Value}
					// remove this key from the map of seen keys
					delete(kvCache, key)
				}
			}

		case <-chStop:
			log.Infof("Stop request received")
			return
		}
	}
}

//
// WatchAll watches value changes for a key in consul
//
// Parameters:
//   baseKey:         key for which changes are to be watched
//   chValueChanges:  channel that will be used to communicate
//                    any changes to values of a key
//
// Return values:
//   error: Any error when watching for a value change for a key,
//          nil if successful
//
func (d *ConsulStateDriver) WatchAll(baseKey string, chValueChanges chan [2][]byte) error {

	// trim leading '/' of a key
	baseKey = processKey(baseKey)

	chKVPairs := make(chan api.KVPairs, 1)

	// channel that will be used to stop watching for state-change events
	chStop := make(chan bool, 1)

	// channel that will be used to receive errors
	chErr := make(chan error, 2)

	// Consul returns all the keys as return value of List(). The following map helps
	// track of state that has been seen and used to appropriately generate
	// create, modify and delete events
	kvCache := map[string]*api.KVPair{}

	// read with index=0 to fetch all existing keys
	var waitIndex uint64
	kvs, qm, err := d.Client.KV().List(baseKey, &api.QueryOptions{WaitIndex: waitIndex})
	if err != nil {
		log.Errorf("consul read failed for key %q. Error: %s", baseKey, err)
		return err
	}

	// Consul returns success and a nil kv when a key is not found.
	// Treat this as starting with no state.
	// XXX: shall we fail the watch in this case?
	if kvs == nil {
		kvs = api.KVPairs{}
	}
	for _, kv := range kvs {
		kvCache[kv.Key] = kv
	}
	waitIndex = qm.LastIndex

	go d.channelConsulEvents(baseKey, kvCache, chKVPairs, chValueChanges, chErr, chStop)

	for {
		select {
		case err := <-chErr:
			return err
		default:
			kvs, qm, err := d.Client.KV().List(baseKey, &api.QueryOptions{WaitIndex: waitIndex})
			if err != nil {
				if api.IsServerError(err) || strings.Contains(err.Error(), "EOF") || strings.Contains(err.Error(), "connection refused") {
					log.Warnf("Consul watch: server error: %v for %s. Retrying..", err, baseKey)
					time.Sleep(5 * time.Second)
					continue
				} else {
					log.Errorf("consul watch failed for key %q. Error: %s. stopping watch..", baseKey, err)
					chStop <- true
					return err
				}
			}
			// Consul returns success and a nil kv when a key is not found.
			// This shall translate into appropriate 'Delete' events or
			// no events (depending on whether some keys were seen before)
			// XXX: shall we stop the watch in this case?
			if kvs == nil {
				kvs = api.KVPairs{}
			}

			waitIndex = qm.LastIndex
			chKVPairs <- kvs
		}
	}
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
// WatchAllState watches all state changes for a key
//
// Parameters:
//    baseKey:   key to be watched
//    sType:     types.State to convert values to/from
//    unmarshal: function used to convert values to types.State
//    chStateChanges:      channel of types.WatchState
//
// Return values:
//    error: Any error when watching all state
//
func (d *ConsulStateDriver) WatchAllState(baseKey string, sType types.State,
	unmarshal func([]byte, interface{}) error, chStateChanges chan types.WatchState) error {

	// trim leading '/' in key
	baseKey = processKey(baseKey)

	// channel that will be used to communicate value changes
	chValueChanges := make(chan [2][]byte, 1)

	// channel used to communicate errors
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
