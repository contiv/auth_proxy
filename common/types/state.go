package types

// State identifies data uniquely identifiable by 'id' and stored in a
// (distributed) key-value store implemented by types.StateDriver.
type State interface {
	Read(id string) error
	ReadAll() ([]State, error)
	Write() error
	Clear() error
}

// StateDriver provides the mechanism for reading/writing state for authN,
// authZ for RBAC. The state is assumed to be stored as key-value pairs
// with keys of type 'string' and value to be an opaque binary string,
// encoded/decoded by the logic specific to the high-level(consumer) interface.
type StateDriver interface {
	//Driver
	Init(config *KVStoreConfig) error
	Deinit()

	Mkdir(string) error

	// XXX: the following raw versions of Read, Write, and ReadAll
	// could be removed, since it is not used directly for now
	Read(key string) ([]byte, error)
	ReadAll(baseKey string) ([][]byte, error)
	Write(key string, value []byte) error
	Clear(key string) error

	ReadState(key string, value State,
		unmarshal func([]byte, interface{}) error) error
	ReadAllState(baseKey string, stateType State,
		unmarshal func([]byte, interface{}) error) ([]State, error)
	WriteState(key string, value State,
		marshal func(interface{}) ([]byte, error)) error
	ClearState(key string) error
}
