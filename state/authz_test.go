package state

import (
	"os"
	"testing"

	"github.com/contiv/auth_proxy/common/types"
)

// This file contains tests to test RW operation on authZ object; only for `etcd` now

var (
	config      types.KVStoreConfig
	commonState types.CommonState
	a1, a2      types.Authorization
)

// TestAuthZInit init for all authZ tests
func TestAuthZInit(t *testing.T) {
	// create config for KV store
	config = types.KVStoreConfig{
		StoreURL:    os.Getenv("DATASTORE_ADDRESS"),
		StoreDriver: os.Getenv("DATASTORE_Driver"),
	}

	// create a state driver
	var err error
	stateDriver, err = NewStateDriver(EtcdName, &config)
	if err != nil {
		t.Fatal("failed to create a new state driver, err:", err)
	}

	// create common state
	commonState = types.CommonState{
		ID:          "0000",
		StateDriver: stateDriver,
	}

	// create two authorizations
	a1 = types.Authorization{
		CommonState:   commonState,
		UUID:          "1111",
		PrincipalName: "2222",
		ClaimKey:      "tenant: Tenant1",
		ClaimValue:    "devops",
	}

	a2 = types.Authorization{
		CommonState:   commonState,
		UUID:          "3333",
		PrincipalName: "4444",
		ClaimKey:      "tenant: Tenant2",
		ClaimValue:    "devops",
	}

}

// TestAuthZWrite tests writing an authz
func TestAuthZWrite(t *testing.T) {

	// write authorization
	a1.Write()

	// read authorization
	readAuthz := &types.Authorization{}
	readAuthz.StateDriver = stateDriver
	(*readAuthz).Read(a1.UUID)

	// check if the read authz matches the one written
	if *readAuthz != a1 {
		t.Fatal("Authorization value read doesn't match ",
			"written value, Read:", readAuthz, "Written:", a1)
	}
}

// TestAuthZClear tests deleting an authz
func TestAuthZClear(t *testing.T) {

	// write an authz
	a1.Write()

	// read the written authz
	readAuthz := &types.Authorization{}
	readAuthz.StateDriver = stateDriver
	(*readAuthz).Read(a1.UUID)

	// check if the read authz matches the one written
	if *readAuthz != a1 {
		t.Fatal("Authorization value read doesn't match ",
			"written value, Read:", readAuthz, "Written:", a1)
	}

	// clear the written authz
	a1.Clear()

	// try to read the cleared authz
	readAuthz2 := &types.Authorization{}
	readAuthz2.StateDriver = stateDriver
	(*readAuthz2).Read(a1.UUID)

	// expecting read to fail
	if *readAuthz2 == a1 {
		t.Fatal("Authz value read matches written value, ",
			"expecting read to fail after clear")
	}

}

// TestAuthZReadAll tests reading all authorizations in the KV store
func TestAuthZReadAll(t *testing.T) {

	// write 2 authorizations
	a1.Write()
	a2.Write()

	// read all authorizations
	readAuthz := &types.Authorization{}
	readAuthz.StateDriver = stateDriver
	aList, err := (*readAuthz).ReadAll()
	if err != nil {
		t.Fatal("ReadAll operation failed, err:", err)
	}

	count := 0
	for _, authZ := range aList {
		tmp, ok := authZ.(*types.Authorization)
		if !ok {
			t.Fatal("failed to convert state to Authorization")
		}

		// check if any of the read values match the written value
		if *tmp == a1 || *tmp == a2 {
			count++
		}
	}

	if count != 2 {
		t.Fatal("read values does not match the written value")
	}

}
