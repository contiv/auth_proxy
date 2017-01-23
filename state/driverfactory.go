package state

import (
	"errors"
	"fmt"
	"reflect"
	"strings"

	"github.com/contiv/auth_proxy/common"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
)

// struct that holds the driver type
type driver struct {
	Type reflect.Type
}

// stateDriverRegistry is a registry that contains all the state driver details
var stateDriverRegistry = map[string]driver{
	EtcdName: {
		Type: reflect.TypeOf(EtcdStateDriver{}),
	},
	ConsulName: {
		Type: reflect.TypeOf(ConsulStateDriver{}),
	},
}

// this helps for the singleton behavior
var (
	stateDriver types.StateDriver
)

const (
	// EtcdName is a string constant for etcd state-store
	EtcdName = "etcd"
	// ConsulName is a string constant for consul state-store
	ConsulName = "consul"
)

// initHelper initializes the StateDriver by mapping driver names to actual driver objects
// params:
//  driverRegistry: map of driver name and driver type
//  driverName: string representing the driver to be fetched
// return values:
//  interface{}: returns actual driver as interface
//  error: returns error if it fails to find the driver from map
func initHelper(driverRegistry map[string]driver, driverName string) (interface{}, error) {
	if _, ok := driverRegistry[driverName]; ok {
		driver := driverRegistry[driverName].Type
		return reflect.New(driver).Interface(), nil // reflect.New returns a value representing the argument `driver`
	}

	return nil, fmt.Errorf("Failed to find a registered driver for: %s", driverName)
}

// NewStateDriver instantiates a 'named' state-driver with specified configuration
// params:
//  name: Name of the state driver. e.g. `etcd` or `consul`
//  config: configuration required to instantiate state driver
// return values:
//  returns types.StateDriver on successful instantiation or any relevant error
func NewStateDriver(name string, config *types.KVStoreConfig) (types.StateDriver, error) {
	if common.IsEmpty(name) || nil == config {
		return nil, errors.New("Empty driver name or configuration")
	}

	if stateDriver != nil {
		return nil, fmt.Errorf("StateDriver instance already exists %#v", stateDriver)
	}

	drv, err := initHelper(stateDriverRegistry, name)
	if err != nil {
		return nil, err
	}

	stateDriver = drv.(types.StateDriver)
	if err := stateDriver.Init(config); err != nil {
		return nil, err
	}

	return stateDriver, nil
}

// GetStateDriver returns the singleton instance of state-driver
// return values:
//  types.StateDriver: if its already instantiated
//  error: auth_errors.ErrStateDriverNotCreated
func GetStateDriver() (types.StateDriver, error) {
	if stateDriver == nil {
		return nil, auth_errors.ErrStateDriverNotCreated
	}

	return stateDriver, nil
}

// InitializeStateDriver initializes the state driver based on the given data store address
// params:
//  dataStoreAddress: address of the data store
// return values:
//  returns any error as NewStateDriver() + validation errors
func InitializeStateDriver(dataStoreAddress string) error {
	if common.IsEmpty(dataStoreAddress) {
		return errors.New("Empty data store address, please set --data-store-address")
	}

	if strings.HasPrefix(dataStoreAddress, EtcdName+"://") {
		_, err := NewStateDriver(EtcdName, &types.KVStoreConfig{StoreURL: dataStoreAddress})
		return err
	} else if strings.HasPrefix(dataStoreAddress, ConsulName+"://") {
		_, err := NewStateDriver(ConsulName, &types.KVStoreConfig{StoreURL: dataStoreAddress})
		return err
	}

	return errors.New("Invalid data store address")
}
