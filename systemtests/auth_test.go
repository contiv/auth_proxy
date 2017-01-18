package systemtests

import (
	"encoding/json"

	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/db"
	"github.com/contiv/ccn_proxy/proxy"
	. "gopkg.in/check.v1"
)

// TestAdminAuthorizationResponse checks that add/get of admin response ignores
// tenant name.
func (s *systemtestSuite) TestAdminAuthorizationResponse(c *C) {
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		// grant admin access to username, tenant name is redundant and should be ignored
		data := `{"PrincipalName":"` + username + `","local":true,"role":"` + types.Admin.String() + `","tenantName":"XXX"}`
		authz := s.addAuthorization(c, data, adToken)
		c.Assert(authz.TenantName, DeepEquals, "")
		c.Assert(authz.PrincipalName, DeepEquals, username)
		c.Assert(authz.Local, Equals, true)
		c.Assert(authz.Role, DeepEquals, types.Admin.String())

		authz2 := s.getAuthorization(c, authz.AuthzUUID, adToken)
		c.Assert(authz.TenantName, DeepEquals, authz2.TenantName)
		c.Assert(authz.PrincipalName, DeepEquals, authz2.PrincipalName)
		c.Assert(authz.Local, Equals, authz2.Local)
		c.Assert(authz.Role, DeepEquals, authz2.Role)

		// We must delete the authorization explicitly right now, as
		// deleting users doesn't automatically deletes it.
		// TODO: Remove authorizations with delete user
		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		endpoint := "/api/v1/ccn_proxy/authorizations/" + authz.AuthzUUID
		resp, _ := proxyGet(c, adToken, endpoint)
		c.Assert(resp.StatusCode, Equals, 404)
	})
}

// TestTenantAuthorizationResponse checks that add/get of tenant response
// doesn't ignore tenant name.
func (s *systemtestSuite) TestTenantAuthorizationResponse(c *C) {
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		// grant ops access to username, tenant name is required and should not be ignored
		data := `{"PrincipalName":"` + username + `","local":true,"role":"` + types.Ops.String() + `","tenantName":""}`
		endpoint := "/api/v1/ccn_proxy/authorizations"

		resp, _ := proxyPost(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, 400)

		data = `{"PrincipalName":"` + username + `","local":true,"role":"` + types.Ops.String() + `","tenantName":"XXX"}`
		authz := s.addAuthorization(c, data, adToken)
		c.Assert(authz.TenantName, DeepEquals, "XXX")
		c.Assert(authz.PrincipalName, DeepEquals, username)
		c.Assert(authz.Local, Equals, true)
		c.Assert(authz.Role, DeepEquals, types.Ops.String())

		authz2 := s.getAuthorization(c, authz.AuthzUUID, adToken)
		c.Assert(authz.TenantName, DeepEquals, authz2.TenantName)
		c.Assert(authz.PrincipalName, DeepEquals, authz2.PrincipalName)
		c.Assert(authz.Local, Equals, authz2.Local)
		c.Assert(authz.Role, DeepEquals, authz2.Role)

		// We must delete the authorization explicitly right now, as
		// deleting users doesn't automatically deletes it.
		// TODO: Remove authorizations with delete user
		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		endpoint = "/api/v1/ccn_proxy/authorizations/" + authz.AuthzUUID
		resp, _ = proxyGet(c, adToken, endpoint)
		c.Assert(resp.StatusCode, Equals, 404)
	})
}

// TestBuiltInAdminAuthorizationImmortality checks that the built-in local admin
// user's sole authorization can't be deleted and that additional authorizations
// can't be added.
func (s *systemtestSuite) TestBuiltInAdminAuthorizationImmortality(c *C) {
	auths, err := db.ListAuthorizationsByPrincipal(types.Admin.String())
	c.Assert(err, IsNil)
	c.Assert(len(auths), Equals, 1)

	adminAuthUUID := auths[0].UUID

	baseURL := "/api/v1/ccn_proxy/authorizations"

	//
	// try to delete the sole authorization
	//
	resp, _ := proxyDelete(c, adToken, baseURL+"/"+adminAuthUUID)
	c.Assert(resp.StatusCode, Equals, 400)

	//
	// try to add an additional authorization
	//
	data := `{"PrincipalName":"` + types.Admin.String() +
		`","local":true,"role":"` + types.Admin.String() +
		`","tenantName":""}`

	resp, _ = proxyPost(c, adToken, baseURL, []byte(data))
	c.Assert(resp.StatusCode, Equals, 400)
}

// addAuthorization helper function for the tests
func (s *systemtestSuite) addAuthorization(c *C, data, token string) proxy.GetAuthorizationReply {
	endpoint := "/api/v1/ccn_proxy/authorizations"

	resp, body := proxyPost(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 201)

	authz := proxy.GetAuthorizationReply{}
	c.Assert(json.Unmarshal(body, &authz), IsNil)
	return authz
}

// getAuthorization helper function for the tests
func (s *systemtestSuite) getAuthorization(c *C, authzUUID, token string) proxy.GetAuthorizationReply {
	endpoint := "/api/v1/ccn_proxy/authorizations/" + authzUUID

	resp, body := proxyGet(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 200)

	authz := proxy.GetAuthorizationReply{}
	c.Assert(json.Unmarshal(body, &authz), IsNil)
	return authz
}

// deleteAuthorization helper function for the tests
func (s *systemtestSuite) deleteAuthorization(c *C, authzUUID, token string) {
	endpoint := "/api/v1/ccn_proxy/authorizations/" + authzUUID

	resp, _ := proxyDelete(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 204)
}
