package db

import (
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/state"
	. "gopkg.in/check.v1"
)

var (
	// create common state
	commonState = types.CommonState{
		ID: "0000",
	}

	// create two authorizations
	a1 = types.Authorization{
		UUID:          "1111",
		PrincipalID:   "2222",
		PrincipalName: "2222",
		ClaimKey:      "tenant: Tenant1",
		ClaimValue:    "devops",
	}
	a2 = types.Authorization{
		UUID:          "3333",
		PrincipalID:   "2222",
		PrincipalName: "2222",
		ClaimKey:      "tenant: Tenant2",
		ClaimValue:    "devops",
	}
)

func (s *dbSuite) setAuthZStateDriver(c *C) {
	stateDrv, err := state.GetStateDriver()
	c.Assert(err, IsNil)

	commonState.StateDriver = stateDrv
	a1.CommonState = commonState
	a2.CommonState = commonState
}

// TestInsertAuthz tests inserting an authz
func (s *dbSuite) TestInsertAuthz(c *C) {

	// write an authz
	InsertAuthorization(&a1)

	// read an authz
	a, err := GetAuthorization(a1.UUID)
	c.Assert(err, IsNil)

	// check that authz returned matches inserted authz
	c.Assert(a, Equals, a1)
}

// TestDeleteAuthorization tests deleting an authz
func (s *dbSuite) TestDeleteAuthorization(c *C) {

	// write an authz
	InsertAuthorization(&a2)

	// delete authz
	DeleteAuthorization(a2.UUID)

	// check that deleted authz cannot be retrieved
	_, err := GetAuthorization(a2.UUID)
	c.Assert(err, NotNil)

	// delete non-existent authz
	err = DeleteAuthorization(a2.UUID)
	c.Assert(err, IsNil)
}

// TestListAuthorizationsByPrincipal tests listing authorizations by
// principal
func (s *dbSuite) TestListAuthorizationsByPrincipal(c *C) {

	// write an authz
	InsertAuthorization(&a1)
	InsertAuthorization(&a2)

	// list authz by principal
	aList, err := ListAuthorizationsByPrincipal(a1.PrincipalID)
	c.Assert(err, IsNil)

	// check that two authz instances are retrieved
	c.Assert(len(aList), Equals, 2)
}

// TestDeleteAuthorizationsByPrincipal tests deleting an authorization
// by principal
func (s *dbSuite) TestDeleteAuthorizationsByPrincipal(c *C) {

	// write an authz
	InsertAuthorization(&a1)

	// delete authz
	err := DeleteAuthorizationsByPrincipal(a1.PrincipalID)
	c.Assert(err, IsNil)

	// list authz by principal
	aList, err := ListAuthorizationsByPrincipal(a1.PrincipalID)
	c.Assert(err, IsNil)

	// expecting to not find deleted authz
	c.Assert(len(aList), Equals, 0)
}

// TestListAuthorizationsByClaim tests listing authorizations
// by claim
func (s *dbSuite) TestListAuthorizationsByClaim(c *C) {

	// write an authz
	InsertAuthorization(&a1)
	InsertAuthorization(&a2)

	// test existing claim key
	aList, err := ListAuthorizationsByClaim(a1.ClaimKey)
	c.Assert(err, IsNil)

	// check that exactly one authz is returned
	c.Assert(len(aList), Equals, 1)

	// test non-existing claim key
	aList, err = ListAuthorizationsByClaim("tenant: TenantX")
	c.Assert(err, IsNil)

	// check that 0 authz instances are returned
	c.Assert(len(aList), Equals, 0)
}

// TestDeleteAuthorizationsByClaim tests deleting authorizations
// by claim
func (s *dbSuite) TestDeleteAuthorizationsByClaim(c *C) {

	// write an authz
	InsertAuthorization(&a1)

	// delete authz by claim
	err := DeleteAuthorizationsByClaim(a1.ClaimKey)
	c.Assert(err, IsNil)

	// test that listing deleted authz should not return any hits
	aList, err := ListAuthorizationsByClaim(a1.ClaimKey)
	c.Assert(err, IsNil)

	c.Assert(len(aList), Equals, 0)
}

// TestListAuthorizationsByClaimAndPrincipal tests listing authorizations
// by claim and principal
func (s *dbSuite) TestListAuthorizationsByClaimAndPrincipal(c *C) {

	// write an authz
	InsertAuthorization(&a1)
	InsertAuthorization(&a2)

	// test listing by existing claim key and principal
	aList, err := ListAuthorizationsByClaimAndPrincipal(a1.ClaimKey, a1.PrincipalID)
	c.Assert(err, IsNil)

	c.Assert(len(aList), Equals, 1)

	// test listing by non-existing claim key
	aList, err = ListAuthorizationsByClaimAndPrincipal("tenant: TenantX", a1.PrincipalID)
	c.Assert(err, IsNil)

	c.Assert(len(aList), Equals, 0)

	// test listing by non-existing principal
	aList, err = ListAuthorizationsByClaimAndPrincipal(a1.ClaimKey, "1234")
	c.Assert(err, IsNil)

	c.Assert(len(aList), Equals, 0)
}
