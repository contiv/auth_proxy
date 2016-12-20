package test

import (
	"testing"

	"github.com/contiv/ccn_proxy/common/test"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/db"
	"github.com/contiv/ccn_proxy/state"

	. "gopkg.in/check.v1"
)

var (
	config      types.KVStoreConfig
	stateDriver types.StateDriver
	commonState types.CommonState
	a1, a2      types.Authorization
)

func Test(t *testing.T) {
	// create config for KV store
	config = types.KVStoreConfig{
		StoreURL: "etcd://127.0.0.1:2379",
	}

	// create a state driver
	var err error
	stateDriver, err = state.NewStateDriver(state.EtcdName, &config)
	if err != nil {
		t.Fatal("failed to create a new state driver, err:", err)
	}

	// cleanup data store
	test.CleanupDatastore(state.EtcdName, []string{
		db.GetPath(db.RootLocalUsers),
		db.GetPath(db.RootLdapConfiguration),
		db.GetPath("authorizations"),
	})

	// create common state
	commonState = types.CommonState{
		ID:          "0000",
		StateDriver: stateDriver,
	}

	// create two authorizations
	a1 = types.Authorization{
		CommonState: commonState,
		UUID:        "1111",
		PrincipalID: "2222",
		ClaimKey:    "tenant: Tenant1",
		ClaimValue:  "devops",
	}

	a2 = types.Authorization{
		CommonState: commonState,
		UUID:        "3333",
		PrincipalID: "4444",
		ClaimKey:    "tenant: Tenant2",
		ClaimValue:  "devops",
	}

	TestingT(t)
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

	tmp1, ok := aList[0].(*types.Authorization)
	if !ok {
		t.Fatal("failed to convert state to Authorization")
	}

	tmp2, ok := aList[1].(*types.Authorization)
	if !ok {
		t.Fatal("failed to convert state to Authorization")
	}

	// check if any of the read values match 1st written value
	if !(*tmp1 == a1 || *tmp2 == a1) {
		t.Fatal("Neither read values:", *tmp1, *tmp2, " match written value:", a1)
	}
	// check if any of the read values match 2nd written value
	if !(*tmp1 == a2 || *tmp2 == a2) {
		t.Fatal("Neither read values:", *tmp1, *tmp2, " match written value:", a2)
	}

}
