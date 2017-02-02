package systemtests

import (
	"encoding/json"
	"net/http"

	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/auth_proxy/db"
	"github.com/contiv/auth_proxy/proxy"
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
		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		endpoint := proxy.V1Prefix + "/authorizations/" + authz.AuthzUUID
		resp, _ := proxyGet(c, adToken, endpoint)
		c.Assert(resp.StatusCode, Equals, 404)
	})

	// ldap user
	runTest(func(ms *MockServer) {
		// grant admin access to ldap group (which implies admin aceess to the members belonging to this group
		// tenant name is redundant and should be ignored
		ldapGroupDN := "CN=Domain Admins,CN=Users,DC=ccn,DC=example,DC=com"
		data := `{"PrincipalName":"` + ldapGroupDN + `","local":false,"role":"` + types.Admin.String() + `","tenantName":"XXX"}`
		authz := s.addAuthorization(c, data, adToken)
		c.Assert(authz.TenantName, DeepEquals, "")
		c.Assert(authz.PrincipalName, DeepEquals, ldapGroupDN)
		c.Assert(authz.Local, Equals, false)
		c.Assert(authz.Role, DeepEquals, types.Admin.String())

		c.Assert(authz, DeepEquals, s.getAuthorization(c, authz.AuthzUUID, adToken))

		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		endpoint := proxy.V1Prefix + "/authorizations/" + authz.AuthzUUID
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
		endpoint := proxy.V1Prefix + "/authorizations"

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

		endpoint = proxy.V1Prefix + "/authorizations/" + authz.AuthzUUID
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

	baseURL := proxy.V1Prefix + "/authorizations"

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

// TestAuthorizationAddEndpoint tests add authorization endpoints
func (s *systemtestSuite) TestAuthorizationAddEndpoint(c *C) {
	// this also sets adToken
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		userToken := loginAs(c, username, username)
		endpoint := proxy.V1Prefix + "/authorizations"

		// add authorization for the built-in admin user; it's an illegal operation
		data := `{"PrincipalName":"admin","local":true,"role":"admin","tenantName":""}`
		resp, body := proxyPost(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*illegal operation.*")

		// add authorization with empty principal name; bad request
		data = `{"PrincipalName":"","local":true,"role":"admin","tenantName":""}`
		resp, body = proxyPost(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*principal name is missing.*")

		// add authorization with invalid role; bad request
		data = `{"PrincipalName":"` + username + `","local":true,"role":"xxxx","tenantName":""}`
		resp, body = proxyPost(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*illegal role specified.*")

		// add ops authz with empty tenant name
		data = `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":""}`
		resp, body = proxyPost(c, adToken, endpoint, []byte(data))
		// bad request; tenantName can't be empty for ops role
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*ops role requires a tenant to be specified.*")
		// add authorization using user token
		resp, body = proxyPost(c, userToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)
		c.Assert(string(body), Matches, ".*access denied.*")

		data = `{"PrincipalName":"ops","local":true,"role":"admin","tenantName":""}`
		// add authorization for built-in ops user using admin token
		s.addAuthorization(c, data, adToken)

		// add authorization for `username`
		data = `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"default"}`
		// add authorization for `username` using admin token
		s.addAuthorization(c, data, adToken)

		// add admin authorization for `username`
		data = `{"PrincipalName":"` + username + `","local":true,"role":"admin","tenantName":""}`
		authz := s.addAuthorization(c, data, adToken)

		// `username` now became admin; so user is allowed to perform CRUD on authZ
		// add authZ for ldap group
		data = `{"PrincipalName":"cn=test,cn=Users,dc=contiv,dc=local","local":false,"role":"ops","tenantName":"defult"}`
		s.addAuthorization(c, data, userToken)

		// delete user's admin authorization
		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		data = `{"PrincipalName":"cn=test,cn=Users,dc=contiv,dc=local","local":false,"role":"ops","tenantName":"defult"}`
		// user doesn't hold admin privileges anymore, so the following request will be denied
		resp, body = proxyPost(c, userToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)
		c.Assert(string(body), Matches, ".*access denied.*")

	})
}

// TestAuthorizationDeleteEndpoint tests authorization delete endpoint
func (s *systemtestSuite) TestAuthorizationDeleteEndpoint(c *C) {
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		userToken := loginAs(c, username, username)
		endpoint := proxy.V1Prefix + "/authorizations"

		// add authorization for built-in ops user using admin token
		data := `{"PrincipalName":"ops","local":true,"role":"admin","tenantName":""}`
		opsAuthz := s.addAuthorization(c, data, adToken)

		opsToken := loginAs(c, "ops", "ops")

		// add, delete and get the authz
		data = `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"default"}`
		// add authorization for `username` using ops token
		authz := s.addAuthorization(c, data, opsToken)
		s.deleteAuthorization(c, authz.AuthzUUID, opsToken)
		resp, body := proxyGet(c, opsToken, endpoint+"/"+authz.AuthzUUID)
		c.Assert(resp.StatusCode, Equals, http.StatusNotFound)
		c.Assert(len(body), Equals, 0)

		// delete authz of built-in ops user
		s.deleteAuthorization(c, opsAuthz.AuthzUUID, adToken)
		resp, body = proxyGet(c, adToken, endpoint+"/"+authz.AuthzUUID)
		c.Assert(resp.StatusCode, Equals, http.StatusNotFound)
		c.Assert(len(body), Equals, 0)

		// non-admins cannot access this endpoint
		resp, _ = proxyDelete(c, userToken, endpoint+"/xxx")
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)

		// test 404
		resp, _ = proxyDelete(c, adToken, endpoint+"/xxx")
		c.Assert(resp.StatusCode, Equals, http.StatusNotFound)

	})
}

// TestAuthorizationGetEndpoints tests authorization get endpoints (/authorizations, /authorizations/{ID})
func (s *systemtestSuite) TestAuthorizationGetEndpoints(c *C) {
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		userToken := loginAs(c, username, username)
		endpoint := proxy.V1Prefix + "/authorizations"

		// built-in admin user is always associated with a authz
		c.Assert(len(s.getAuthorizations(c, adToken)) >= 1, Equals, true)

		data := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"default"}`
		// add authorization for `username` using admin token
		authz := s.addAuthorization(c, data, adToken)
		c.Assert(authz, DeepEquals, s.getAuthorization(c, authz.AuthzUUID, adToken))

		// non-admins cannot access this endpoint
		resp, _ := proxyGet(c, userToken, endpoint)
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)

		// add admin authz for `username`
		data = `{"PrincipalName":"` + username + `","local":true,"role":"admin","tenantName":"default"}`
		authz = s.addAuthorization(c, data, adToken)
		c.Assert(authz.Role, Equals, "admin")
		// tenantName gets ignored for admin authzs
		c.Assert(authz.TenantName, Equals, "")
		c.Assert(authz, DeepEquals, s.getAuthorization(c, authz.AuthzUUID, adToken))

		// since `username` is an admin after the earlier update, he can access admin APIs now
		data = `{"PrincipalName":"ops","local":true,"role":"admin","tenantName":""}`
		s.addAuthorization(c, data, userToken)

		// admin API accessed using user token
		c.Assert(len(s.getAuthorizations(c, userToken)) >= 4, Equals, true)

		// NOTE: there is no straight forward to demote a user from admin to ops.
		// rather the same can be achieved using DELETE + ADD
		s.deleteAuthorization(c, authz.AuthzUUID, userToken)
		resp, _ = proxyGet(c, adToken, endpoint+"/"+authz.AuthzUUID)
		c.Assert(resp.StatusCode, Equals, http.StatusNotFound)

		// non-admins cannot access this endpoint
		resp, _ = proxyGet(c, userToken, endpoint)
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)

		// non-admins cannot access `*/authzUUID` endpoint
		resp, _ = proxyGet(c, userToken, endpoint+"/"+authz.AuthzUUID)
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)

		// delete all authorizations and try get
		// NOTE: Built-in admin authorizations cannot be deleted
		for _, authz := range s.getAuthorizations(c, adToken) {
			resp, _ = proxyDelete(c, adToken, endpoint+"/"+authz.AuthzUUID)
			c.Assert(resp.StatusCode == http.StatusNoContent || resp.StatusCode == http.StatusBadRequest, Equals, true)
		}

		c.Assert(len(s.getAuthorizations(c, adToken)), Equals, 1)

	})
}

// addAuthorization helper function for the tests
func (s *systemtestSuite) addAuthorization(c *C, data, token string) proxy.GetAuthorizationReply {
	endpoint := proxy.V1Prefix + "/authorizations"

	resp, body := proxyPost(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 201)

	authz := proxy.GetAuthorizationReply{}
	c.Assert(json.Unmarshal(body, &authz), IsNil)
	return authz
}

// getAuthorization helper function for the tests
func (s *systemtestSuite) getAuthorization(c *C, authzUUID, token string) proxy.GetAuthorizationReply {
	endpoint := proxy.V1Prefix + "/authorizations/" + authzUUID

	resp, body := proxyGet(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 200)

	authz := proxy.GetAuthorizationReply{}
	c.Assert(json.Unmarshal(body, &authz), IsNil)
	return authz
}

// getAuthorizations helper function for the tests
func (s *systemtestSuite) getAuthorizations(c *C, token string) []proxy.GetAuthorizationReply {
	endpoint := proxy.V1Prefix + "/authorizations"

	resp, body := proxyGet(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 200)

	authzs := []proxy.GetAuthorizationReply{}
	c.Assert(json.Unmarshal(body, &authzs), IsNil)
	return authzs
}

// deleteAuthorization helper function for the tests
func (s *systemtestSuite) deleteAuthorization(c *C, authzUUID, token string) {
	endpoint := proxy.V1Prefix + "/authorizations/" + authzUUID

	resp, _ := proxyDelete(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 204)
}
