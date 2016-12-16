package test

import (
	"testing"

	"github.com/contiv/ccn_proxy/common/test"
	"github.com/contiv/ccn_proxy/common/types"
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
		//StoreURL: "etcd://127.0.0.1:2379",
		StoreURL: test.GetDatastoreAddress(),
	}

	// create a state driver
	var err error
	stateDriver, err = state.NewStateDriver(state.EtcdName, &config)
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
		PrincipalID:   "2222",
		PrincipalName: "2222",
		ClaimKey:      "tenant: Tenant1",
		ClaimValue:    "devops",
	}

	a2 = types.Authorization{
		CommonState:   commonState,
		UUID:          "3333",
		PrincipalID:   "2222",
		PrincipalName: "2222",
		ClaimKey:      "tenant: Tenant2",
		ClaimValue:    "devops",
	}
	TestingT(t)
}

// TestInsertAuthz tests inserting an authz
func TestInsertAuthz(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a1)

	// read an authz
	a, err := state.GetAuthorization(a1.UUID)
	if err != nil {
		t.Fatal("failed to get authz, err:", err)
	}

	// check that authz returned matches inserted authz
	if a != a1 {
		t.Fatal("failed to insert or get authz correctly")
	}
}

// TestDeleteAuthorization tests deleting an authz
func TestDeleteAuthorization(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a2)

	// delete authz
	state.DeleteAuthorization(a2.UUID)

	// check that deleted authz cannot be retrieved
	_, err := state.GetAuthorization(a2.UUID)
	if err == nil {
		t.Fatal("expecting read authz to fail")
	}

	// delete non-existent authz
	err = state.DeleteAuthorization(a2.UUID)
	if err == nil {
		t.Fatal("expecting deletion of non-existent authz",
			"to fail")
	}

}

// TestListAuthorizationsByPrincipal tests listing authorizations by
// principal
func TestListAuthorizationsByPrincipal(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a1)
	state.InsertAuthorization(&a2)

	// list authz by principal
	aList, err := state.ListAuthorizationsByPrincipal(a1.PrincipalID)
	if err != nil {
		t.Fatal("failed to list authz by principal, err: ", err)
	}

	// check that two authz instances are retrieved
	if len(aList) != 2 {
		t.Fatal("expecting exactly two authz to match principalID")
	}
}

// TestDeleteAuthorizationsByPrincipal tests deleting an authorization
// by principal
func TestDeleteAuthorizationsByPrincipal(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a1)

	// delete authz
	err := state.DeleteAuthorizationsByPrincipal(a1.PrincipalID)
	if err != nil {
		t.Fatal("failed to delete authz by principal, err: ", err)
	}

	// list authz by principal
	aList, err := state.ListAuthorizationsByPrincipal(a1.PrincipalID)
	if err != nil {
		t.Fatal("failed to list authz by principal, err: ", err)
	}

	// expecting to not find deleted authz
	if len(aList) != 0 {
		t.Fatal("failed to delete authz by principal")
	}
}

// TestListAuthorizationsByClaim tests listing authorizations
// by claim
func TestListAuthorizationsByClaim(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a1)
	state.InsertAuthorization(&a2)

	// test existing claim key
	aList, err := state.ListAuthorizationsByClaim(a1.ClaimKey)
	if err != nil {
		t.Fatal("failed to list authz by claim, err: ", err)
	}

	// check that exactly one authz is returned
	if len(aList) != 1 {
		t.Fatal("failed to correctly list authz by claim")
	}

	// test non-existing claim key
	aList, err = state.ListAuthorizationsByClaim("tenant: TenantX")
	if err != nil {
		t.Fatal("failed to correctly list authz by claim, err: ", err)
	}

	// check that 0 authz instances are returned
	if len(aList) != 0 {
		t.Fatal("failed to correctly list authz by claim")
	}
}

// TestDeleteAuthorizationsByClaim tests deleting authorizations
// by claim
func TestDeleteAuthorizationsByClaim(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a1)

	// delete authz by claim
	err := state.DeleteAuthorizationsByClaim(a1.ClaimKey)
	if err != nil {
		t.Fatal("failed to delete authz's by principal, err: ", err)
	}

	// test that listing deleted authz should not return any hits
	aList, err := state.ListAuthorizationsByClaim(a1.ClaimKey)
	if err != nil {
		t.Fatal("failed to list authz by claim, err: ", err)
	}

	if len(aList) != 0 {
		t.Fatal("failed to delete authz's by claim")
	}
}

// TestListAuthorizationsByClaimAndPrincipal tests listing authorizations
// by claim and principal
func TestListAuthorizationsByClaimAndPrincipal(t *testing.T) {

	// write an authz
	state.InsertAuthorization(&a1)
	state.InsertAuthorization(&a2)

	// test listing by existing claim key and principal
	aList, err := state.ListAuthorizationsByClaimAndPrincipal(a1.ClaimKey, a1.PrincipalID)
	if err != nil {
		t.Fatal("failed to list authz by claim and principal, err: ", err)
	}

	if len(aList) != 1 {
		t.Fatal("failed to correctly list authz by claim and principal")
	}

	// test listing by non-existing claim key
	aList, err = state.ListAuthorizationsByClaimAndPrincipal("tenant: TenantX", a1.PrincipalID)
	if err != nil {
		t.Fatal("failed to correctly list authz by claim and principal, err: ", err)
	}
	if len(aList) != 0 {
		t.Fatal("failed to correctly list authz by claim and principal")
	}

	// test listing by non-existing principal
	aList, err = state.ListAuthorizationsByClaimAndPrincipal(a1.ClaimKey, "1234")
	if err != nil {
		t.Fatal("failed to correctly list authz by claim and principal, err: ", err)
	}

	if len(aList) != 0 {
		t.Fatal("failed to correctly list authz by claim and principal")
	}
}
