package systemtests

import (
	"encoding/json"

	"github.com/contiv/ccn_proxy/proxy"
	. "gopkg.in/check.v1"
)

// TestAdminRoleAuthorization tests that a user can only
// perform admin level API call when it has an admin
// authorization for it.
func (s *systemtestSuite) TestAdminRoleAuthorization(c *C) {
	runTest(func(p *proxy.Server, ms *MockServer) {
		token := adminToken(c)

		username := newUsers[0]

		// add new local_user to the system
		data := `{"username":"` + username + `","password":"` + username + `", "disable":false}`
		respBody := `{"username":"` + username + `","first_name":"","last_name":"","disable":false}`
		s.addLocalUser(c, data, respBody, token)

		// login as username, should succeed
		testuserToken := loginAs(c, username, username)

		// try calling an admin api (e.g., update user) using test user token
		// This should fail with forbidden since user doesn't have admin access
		data = `{"first_name":"Temp", "last_name": "User"}`
		endpoint := "/api/v1/ccn_proxy/local_users/" + username
		resp, _ := proxyPatch(c, testuserToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, 403)

		// grant admin access to username
		data = `{"PrincipalName":"` + username + `","local":true,"role":"admin","tenantName":""}`
		s.addAuthorization(c, data, token)

		// retry calling the admin api, it should succeed now
		data = `{"first_name":"Temp", "last_name": "User"}`
		respBody = `{"username":"` + username + `","first_name":"Temp","last_name":"User","disable":false}`
		s.updateLocalUser(c, username, data, respBody, testuserToken)

		// delete local user
		endpoint = "/api/v1/ccn_proxy/local_users/" + username
		resp, _ = proxyDelete(c, token, endpoint)
		c.Assert(resp.StatusCode, Equals, 204)
	})
}

// TODO: Implement after API calls for tenant associated objects is routed properly
/*
func (s *systemtestSuite) TestTenantAuthorization(c *C) {
}
*/

// addAuthorization helper function for the tests
func (s *systemtestSuite) addAuthorization(c *C, data, token string) string {
	endpoint := "/api/v1/ccn_proxy/authorizations"

	resp, body := proxyPost(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 201)

	authz := proxy.GetAuthorizationReply{}
	c.Assert(json.Unmarshal(body, &authz), IsNil)
	return authz.AuthzUUID
}

// deleteAuthorization helper function for the tests
func (s *systemtestSuite) deleteAuthorization(c *C, authzUUID, token string) {
	endpoint := "/api/v1/ccn_proxy/authorizations/" + authzUUID

	resp, _ := proxyDelete(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 204)
}
