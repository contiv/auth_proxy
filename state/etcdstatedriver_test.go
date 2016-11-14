package state

import (
	"testing"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/types"
)

// Setup configuration needed to access local etcd
func setupEtcdDriver(t *testing.T) *EtcdStateDriver {

	config := types.KVStoreConfig{StoreURL: "etcd://127.0.0.1:2379"}

	driver := &EtcdStateDriver{}

	err := driver.Init(&config)
	if err != nil {
		t.Fatalf("driver init failedm err: %s", err)
		return nil
	}

	return driver
}

// Test to check state driver initialization
func TestEtcdStateDriverInit(t *testing.T) {
	setupEtcdDriver(t)
}

// Test to check invalid state driver configurations
func TestEtcdStateDriverInitInvalidConfig(t *testing.T) {
	driver := &EtcdStateDriver{}
	commonTestStateDriverInitInvalidConfig(t, driver)
}

// Test to check writes to KV store
func TestEtcdStateDriverWrite(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverWrite(t, driver)
}

// Test to check read from KV store
func TestEtcdStateDriverRead(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverRead(t, driver)
}

// Example "state" struct that will be written to and read from
// the KV store
type testState struct {
	types.CommonState
	IgnoredField types.StateDriver `json:"-"`
	IntField     int               `json:"intField"`
	StrField     string            `json:"strField"`
}

func (s *testState) Write() error {
	log.Debug("Not Implemented")
	return nil
}

func (s *testState) Read(id string) error {
	log.Debug("Not Implemented")
	return nil
}

func (s *testState) ReadAll() ([]types.State, error) {
	log.Debug("Not Implemented")
	return nil, nil
}

func (s *testState) Clear() error {
	log.Debug("Not Implemented")
	return nil
}

// Test writing of state to KV store
func TestEtcdStateDriverWriteState(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverWriteState(t, driver)
}

// Test writing updated state to KV store
func TestEtcdStateDriverWriteStateForUpdate(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverWriteStateForUpdate(t, driver)
}

// Test clearing of state in KV store
func TestEtcdStateDriverClearState(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverClearState(t, driver)
}

// Test reading of state from KV store
func TestEtcdStateDriverReadState(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverReadState(t, driver)
}

// Test reading of state after update to KV store
func TestEtcdStateDriverReadStateAfterUpdate(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverReadStateAfterUpdate(t, driver)
}

// Test reading of state after clearing it from KV store
func TestEtcdStateDriverReadStateAfterClear(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverReadStateAfterClear(t, driver)
}

// Test to watch all 'created' state in KV store
func TestEtcdStateDriverWatchAllStateCreate(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverWatchAllStateCreate(t, driver)
}

// Test to watch all 'modified' state in KV store
func TestEtcdStateDriverWatchAllStateModify(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverWatchAllStateModify(t, driver)
}

// Test to watch all 'deleted' state in KV store
func TestEtcdStateDriverWatchAllStateDelete(t *testing.T) {
	driver := setupEtcdDriver(t)
	commonTestStateDriverWatchAllStateDelete(t, driver)
}
