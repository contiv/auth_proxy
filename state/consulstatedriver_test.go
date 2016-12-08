package state

import (
	"testing"

	"github.com/contiv/ccn_proxy/common/types"
)

func setupConsulDriver(t *testing.T) *ConsulStateDriver {
	config := types.KVStoreConfig{StoreURL: "consul://127.0.0.1:8500"}

	driver := &ConsulStateDriver{}

	err := driver.Init(&config)
	if err != nil {
		t.Fatalf("driver init failed, err: %s", err)
		return nil
	}

	return driver
}

func TestConsulStateDriverInit(t *testing.T) {
	setupConsulDriver(t)
}

// Test to check invalid state driver configurations
func TestConsulStateDriverInitInvalidConfig(t *testing.T) {
	driver := &ConsulStateDriver{}
	commonTestStateDriverInitInvalidConfig(t, driver)
}

// Test to check writes to KV store
func TestConsulStateDriverWrite(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverWrite(t, driver)
}

// Test to check read from KV store
func TestConsulStateDriverRead(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverRead(t, driver)
}

// Test to check `ReadAll` from KV store
func TestConsulStateDriverReadAll(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverReadAll(t, driver)
}

func TestConsulStateDriverWriteState(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverWriteState(t, driver)
}

// Test writing of state to KV store
func TestConsulStateDriverWriteStateForUpdate(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverWriteStateForUpdate(t, driver)
}

// Test clearing of state in KV store
func TestConsulStateDriverClearState(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverClearState(t, driver)
}

// Test reading of state from KV store
func TestConsulStateDriverReadState(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverReadState(t, driver)
}

// Test reading of state after update to KV store
func TestConsulStateDriverReadStateAfterUpdate(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverReadStateAfterUpdate(t, driver)
}

// Test reading of state after clear from KV store
func TestConsulStateDriverReadStateAfterClear(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverReadStateAfterClear(t, driver)
}

// Test to watch all 'created' state in KV store
func TestConsulStateDriverWatchAllStateCreate(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverWatchAllStateCreate(t, driver)
}

// Test to watch all 'modified' state in KV store
func TestConsulStateDriverWatchAllStateModify(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverWatchAllStateModify(t, driver)
}

// Test to watch all 'deleted' state in KV store
func TestConsulStateDriverWatchAllStateDelete(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverWatchAllStateDelete(t, driver)
}
