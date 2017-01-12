package types

// State identifies data uniquely identifiable by 'id' and stored in a
// (distributed) key-value store implemented by types.StateDriver.
type State interface {
	Read(id string) error
	ReadAll() ([]State, error)
	Write() error
	Clear() error
}

// WatchableState allows for the rest of types.State, plus the WatchAll call
// which allows the implementor to signal value changes over a channel.
type WatchableState interface {
	State
	WatchAll(chValueChanges chan WatchState) error
}

// StateDriver provides the mechanism for reading/writing state for authN,
// authZ for RBAC of CCN. The state is assumed to be stored as key-value pairs
// with keys of type 'string' and value to be an opaque binary string,
// encoded/decoded by the logic specific to the high-level(consumer) interface.
type StateDriver interface {
	//Driver
	Init(config *KVStoreConfig) error
	Deinit()

	Mkdir(string) error

	// XXX: the following raw versions of Read, Write, ReadAll and WatchAll
	// could be removed, since it is not used directly for now
	Read(key string) ([]byte, error)
	ReadAll(baseKey string) ([][]byte, error)
	Write(key string, value []byte) error
	Clear(key string) error
	WatchAll(baseKey string, chValueChanges chan [2][]byte) error

	ReadState(key string, value State,
		unmarshal func([]byte, interface{}) error) error
	ReadAllState(baseKey string, stateType State,
		unmarshal func([]byte, interface{}) error) ([]State, error)
	WriteState(key string, value State,
		marshal func(interface{}) ([]byte, error)) error
	// WatchAllState returns changes to a state from the point watch is started.
	// It's a blocking call.
	// XXX: This specification introduces a small time window where a few
	// updates might be missed that occurred just before watch was started.
	// May be watch shall return all existing state first and then subsequent
	// updates. Revisit if this enhancement is needed.
	WatchAllState(baseKey string, stateType State,
		unmarshal func([]byte, interface{}) error, chStateChanges chan WatchState) error
	ClearState(key string) error
}
