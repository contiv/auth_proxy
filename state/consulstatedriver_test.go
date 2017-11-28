package state

import (
	"os"
	"testing"

	"github.com/contiv/auth_proxy/common/types"
)

func setupConsulDriver(t *testing.T) *ConsulStateDriver {
	config := types.KVStoreConfig{StoreURL: os.Getenv("DATASTORE_ADDRESS")}

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

// Test to check directory creation in KV store
func TestConsulStateDriverMkdir(t *testing.T) {
	driver := setupConsulDriver(t)
	commonTestStateDriverMkdir(t, driver, "test_mkdir/")
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
