package systemtests

import (
	"io/ioutil"
	"net/http"
	"strings"

	. "gopkg.in/check.v1"
)

var (
	adToken  = ""
	username = "test_rbac"

	tenantName  = "t1"
	networkName = "n1"
	epgName     = "epg1"
	apName      = "ap1"
	ecgName     = "ecg1"
	npName      = "np1"
	policyName  = "p1"
	ruleName    = "r1"
	slbName     = "slb1"

	// endpoint suffixes of netmaster APIs
	epSuffixes = map[string]string{
		"appProfiles":        apName,
		"endpointGroups":     epgName,
		"extContractsGroups": ecgName,
		"netprofiles":        npName,
		"networks":           networkName,
		"policys":            policyName,
		"rules":              ruleName,
		"serviceLBs":         slbName,
	}

	// endpoint suffixes of admin only netmaster APIs
	adminEpSuffixes = map[string]string{
		"globals": "g1",
		"aciGws":  "aciGw1",
		"Bgps":    "bgp1",
	}
)

// TestRBACFilters tests all the netmaster filter(list) endpoints
func (s *systemtestSuite) TestRBACFilters(c *C) {
	s.addUser(c, username)

	// test all list endpoints
	runTest(func(ms *MockServer) {

		copy := []string{"tenants"}
		for resource := range epSuffixes {
			copy = append(copy, resource)
		}

		for _, resource := range copy {
			endpoint := "/api/v1/" + resource + "/"
			tenantList := `[{"tenantName":"t1"},{"tenantName":"t2"},{"tenantName":"t3"}]`
			ms.AddHardcodedResponse(endpoint, []byte(tenantList))

			// test using `admin` token
			resp, body := proxyGet(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), DeepEquals, tenantList)

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body = proxyGet(c, userToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), Equals, "[]")

			// grant tenant `t1` access to `username`
			authzRequest := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"t1"}`
			authz1 := s.addAuthorization(c, authzRequest, adToken)

			// test again using `username` token
			userToken = loginAs(c, username, username)
			resp, body = proxyGet(c, userToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)

			s.processListResponse(c, resource, string(body), []string{"t1"})

			// grant tenant `t3` access to `username`
			authzRequest = `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"t3"}`
			authz2 := s.addAuthorization(c, authzRequest, adToken)

			// test again using `username` token; new tenant `t3` should also be listed
			userToken = loginAs(c, username, username)
			resp, body = proxyGet(c, userToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			s.processListResponse(c, resource, string(body), []string{"t1", "t3"})

			s.deleteAuthorization(c, authz1.AuthzUUID, adToken)
			s.deleteAuthorization(c, authz2.AuthzUUID, adToken)

			// test using `username` token; all authzs removed
			userToken = loginAs(c, username, username)
			resp, body = proxyGet(c, userToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), Equals, "[]")

		}
	})

	// test adminOnly list endpoints
	runTest(func(ms *MockServer) {

		for resource := range adminEpSuffixes {
			endpoint := "/api/v1/" + resource + "/"
			respData := `{"foo":"bar"}`
			ms.AddHardcodedResponse(endpoint, []byte(respData))

			// test using `admin` token
			resp, body := proxyGet(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), DeepEquals, string(respData))

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body = proxyGet(c, userToken, endpoint)
			s.assertInsufficientPrivileges(c, resp, body)
		}

	})
}

// TestRBACOnDELETERequest tests netmaster DELETE endpoints
func (s *systemtestSuite) TestRBACOnDELETERequest(c *C) {
	s.addUser(c, username)

	// test `tenant` delete
	runTest(func(ms *MockServer) {

		endpoint := "/api/v1/tenants/" + tenantName + "/"
		respData := `{"foo":"bar"}`
		ms.AddHardcodedResponse(endpoint, []byte(respData))

		resp, body := proxyDelete(c, adToken, endpoint)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(string(body), DeepEquals, respData)

		// test using `username` token
		userToken := loginAs(c, username, username)
		resp, body = proxyDelete(c, userToken, endpoint)
		s.assertInsufficientPrivileges(c, resp, body)

		// grant tenant access to `username`
		authzRequest := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"` + tenantName + `"}`
		authz := s.addAuthorization(c, authzRequest, adToken)

		// tenant delete is a adminOnly API
		// test using `username` token
		userToken = loginAs(c, username, username)
		resp, body = proxyDelete(c, userToken, endpoint)
		s.assertInsufficientPrivileges(c, resp, body)

		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

	})

	// test all other endpoints
	runTest(func(ms *MockServer) {

		for resource, rName := range epSuffixes {
			endpoint := "/api/v1/" + resource + "/" + rName + "/"
			ms.AddHardcodedResponse(endpoint, []byte(`{"tenantName": "`+tenantName+`"}`))

			// test using `admin` token
			resp, _ := proxyDelete(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body := proxyDelete(c, userToken, endpoint)
			s.assertInsufficientPrivileges(c, resp, body)

			// grant tenant access to `username`
			authzRequest := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"` + tenantName + `"}`
			authz := s.addAuthorization(c, authzRequest, adToken)

			// user is authorized for this tenant so, he/she should be able to delete the resource
			// normal users cannot delete `tenant`
			userToken = loginAs(c, username, username)
			resp, _ = proxyDelete(c, userToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)

			s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		}
	})

	// test adminOnly list endpoints
	runTest(func(ms *MockServer) {

		for resource, rName := range adminEpSuffixes {
			endpoint := "/api/v1/" + resource + "/" + rName + "/"
			respData := `{"foo":"bar"}`
			ms.AddHardcodedResponse(endpoint, []byte(respData))

			// test using `admin` token
			resp, body := proxyDelete(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), DeepEquals, string(respData))

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body = proxyDelete(c, userToken, endpoint)
			s.assertInsufficientPrivileges(c, resp, body)
		}

	})

}

// TestRBACOnGETRequest tests netmaster GET endpoints
func (s *systemtestSuite) TestRBACOnGETRequest(c *C) {
	s.addUser(c, username)

	// test `tenant` get
	runTest(func(ms *MockServer) {

		endpoint := "/api/v1/tenants/" + tenantName + "/"
		respData := `{"foo":"bar"}`
		ms.AddHardcodedResponse(endpoint, []byte(respData))

		// test using `admin` token
		resp, body := proxyGet(c, adToken, endpoint)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(string(body), DeepEquals, respData)

		// test using `username` token
		userToken := loginAs(c, username, username)
		resp, body = proxyGet(c, userToken, endpoint)
		s.assertInsufficientPrivileges(c, resp, body)

		// grant tenant access to `username`
		authzRequest := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"` + tenantName + `"}`
		authz := s.addAuthorization(c, authzRequest, adToken)

		// user is authorized for this tenant so, he/she should be able to get the tenant details
		userToken = loginAs(c, username, username)
		resp, body = proxyGet(c, userToken, endpoint)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(string(body), DeepEquals, respData)

		// GET on unautorized tenant
		endpoint = "/api/v1/tenants/test/"
		userToken = loginAs(c, username, username)
		resp, body = proxyGet(c, userToken, endpoint)
		s.assertInsufficientPrivileges(c, resp, body)

		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

	})

	// test all other netmaster endpoints
	runTest(func(ms *MockServer) {

		for resource, rName := range epSuffixes {
			endpoint := "/api/v1/" + resource + "/" + rName + "/"
			ms.AddHardcodedResponse(endpoint, []byte(`{"tenantName": "`+tenantName+`"}`))

			// test using `admin` token
			resp, _ := proxyGet(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body := proxyGet(c, userToken, endpoint)
			s.assertInsufficientPrivileges(c, resp, body)

			// grant tenant access to `username`
			authzRequest := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"` + tenantName + `"}`
			authz := s.addAuthorization(c, authzRequest, adToken)

			// user is authorized for this tenant so, he/she should be able to get the tenant details
			userToken = loginAs(c, username, username)
			resp, _ = proxyGet(c, userToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)

			s.deleteAuthorization(c, authz.AuthzUUID, adToken)
		}

	})

	// test adminOnly list endpoints
	runTest(func(ms *MockServer) {

		for resource, rName := range adminEpSuffixes {
			endpoint := "/api/v1/" + resource + "/" + rName + "/"
			respData := `{"foo":"bar"}`
			ms.AddHardcodedResponse(endpoint, []byte(respData))

			// test using `admin` token
			resp, body := proxyGet(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), DeepEquals, string(respData))

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body = proxyGet(c, userToken, endpoint)
			s.assertInsufficientPrivileges(c, resp, body)
		}

	})
}

// TestRBACOnPOSTRequest tests netmaster POST endpoints
func (s *systemtestSuite) TestRBACOnPOSTRequest(c *C) {
	s.addUser(c, username)

	// test `tenant` creation
	runTest(func(ms *MockServer) {

		endpoint := "/api/v1/tenants/" + tenantName + "/"
		tenantCreateReq := `{"tenantName": "` + tenantName + `"}`

		// this handler sends the request body back as the response body
		ms.AddHandler(endpoint, func(w http.ResponseWriter, req *http.Request) {
			body, err := ioutil.ReadAll(req.Body)
			c.Assert(err, IsNil)

			w.WriteHeader(http.StatusOK)
			w.Write(body)
		})

		// POST using `admin` token
		resp, body := proxyPost(c, adToken, endpoint, []byte(tenantCreateReq))
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(string(body), Equals, tenantCreateReq)

		// tenant POST is adminOnly API
		userToken := loginAs(c, username, username)
		resp, body = proxyPost(c, userToken, endpoint, []byte(tenantCreateReq))
		s.assertInsufficientPrivileges(c, resp, body)

	})

	// test all other netmaster endpoints
	runTest(func(ms *MockServer) {
		for resource, rName := range epSuffixes {
			endpoint := "/api/v1/" + resource + "/" + rName + "/"
			createReq := `{"tenantName": "` + tenantName + `"}`

			// this handler sends the request body back as the response body
			ms.AddHandler(endpoint, func(w http.ResponseWriter, req *http.Request) {
				body, err := ioutil.ReadAll(req.Body)
				c.Assert(err, IsNil)

				w.WriteHeader(http.StatusOK)
				w.Write(body)
			})

			// POST using `admin` token
			resp, body := proxyPost(c, adToken, endpoint, []byte(createReq))
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), Equals, createReq)

			// POST using `username` token
			userToken := loginAs(c, username, username)
			resp, body = proxyPost(c, userToken, endpoint, []byte(createReq))
			s.assertInsufficientPrivileges(c, resp, body)

			// grant tenant access to `username`
			authzRequest := `{"PrincipalName":"` + username + `","local":true,"role":"ops","tenantName":"` + tenantName + `"}`
			authz := s.addAuthorization(c, authzRequest, adToken)

			// POST the request again with the updated token
			userToken = loginAs(c, username, username)
			resp, body = proxyPost(c, userToken, endpoint, []byte(createReq))
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), Equals, createReq)

			// Remove authorization
			s.deleteAuthorization(c, authz.AuthzUUID, adToken)
		}

	})

	// test adminOnly list endpoints
	runTest(func(ms *MockServer) {

		for resource, rName := range adminEpSuffixes {
			endpoint := "/api/v1/" + resource + "/" + rName + "/"
			respData := `{"foo":"bar"}`
			ms.AddHardcodedResponse(endpoint, []byte(respData))

			// test using `admin` token
			resp, body := proxyPost(c, adToken, endpoint, []byte(respData))
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), DeepEquals, string(respData))

			// test using `username` token
			userToken := loginAs(c, username, username)
			resp, body = proxyPost(c, userToken, endpoint, []byte(respData))
			s.assertInsufficientPrivileges(c, resp, body)
		}

	})

}

// addUser helper function that adds a new local user to the system
func (s *systemtestSuite) addUser(c *C, username string) {
	// add new local user
	runTest(func(ms *MockServer) {
		adToken = adminToken(c)

		endpoint := "/api/v1/ccn_proxy/local_users/" + username
		resp, _ := proxyGet(c, adToken, endpoint)
		if resp.StatusCode == 200 {
			resp, body := proxyDelete(c, adToken, endpoint)
			c.Assert(resp.StatusCode, Equals, 204)
			c.Assert(body, DeepEquals, []byte{})
		}

		data := `{"username":"` + username + `","password":"` + username + `", "disable":false}`
		respBody := `{"username":"` + username + `","first_name":"","last_name":"","disable":false}`
		s.addLocalUser(c, data, respBody, adToken)

	})
}

// processListResponse constructs the expected response body with the given
// params and checks it against the actual response body
func (s *systemtestSuite) processListResponse(c *C, resource, body string, expectedTenants []string) {

	expectedResponse := []string{}
	switch resource {
	case "tenants":
		for _, tenantName := range expectedTenants {
			expectedResponse = append(expectedResponse, `{"tenantName":"`+tenantName+`","link-sets":{}}`)
		}
		c.Assert(body, DeepEquals, "["+strings.Join(expectedResponse, ",")+"]")
	case "networks", "policys", "appProfiles", "netprofiles":
		for _, tenantName := range expectedTenants {
			expectedResponse = append(expectedResponse, `{"tenantName":"`+tenantName+`","link-sets":{},"links":{"Tenant":{}}}`)
		}
		c.Assert(body, DeepEquals, "["+strings.Join(expectedResponse, ",")+"]")
	case "endpointGroups":
		for _, tenantName := range expectedTenants {
			expectedResponse = append(expectedResponse, `{"tenantName":"`+tenantName+`","link-sets":{},"links":{"AppProfile":{},"NetProfile":{},"Network":{},"Tenant":{}}}`)
		}
		c.Assert(body, DeepEquals, "["+strings.Join(expectedResponse, ",")+"]")
	case "rules":
		for _, tenantName := range expectedTenants {
			expectedResponse = append(expectedResponse, `{"tenantName":"`+tenantName+`","link-sets":{},"links":{"MatchEndpointGroup":{}}}`)
		}
		c.Assert(body, DeepEquals, "["+strings.Join(expectedResponse, ",")+"]")
	case "serviceLBs":
		for _, tenantName := range expectedTenants {
			expectedResponse = append(expectedResponse, `{"tenantName":"`+tenantName+`","links":{"Network":{},"Tenant":{}}}`)
		}
		c.Assert(body, DeepEquals, "["+strings.Join(expectedResponse, ",")+"]")
	default:
		c.Assert(body, DeepEquals, "[]")
	}

}

// assertInsufficientPrivileges helper function that asserts 403
func (s *systemtestSuite) assertInsufficientPrivileges(c *C, resp *http.Response, body []byte) {
	c.Assert(resp.StatusCode, Equals, 403)
	c.Assert(string(body), DeepEquals, `{"error":"Insufficient privileges"}`)
}

// TestAdminRoleRequired tests that a user can only perform an admin level API
// call when it has an admin authorization for it. The way this test is
// different from other rbac tests is that it tests granting admin access to a
// user.
func (s *systemtestSuite) TestAdminRoleRequired(c *C) {
	// This also sets up the adToken variable
	s.addUser(c, username)

	runTest(func(ms *MockServer) {

		// login as username, should succeed
		testuserToken := loginAs(c, username, username)

		// try calling an admin api (e.g., update user) using test user token
		// This should fail with forbidden since user doesn't have admin access
		data := `{"first_name":"Temp", "last_name": "User"}`
		endpoint := "/api/v1/ccn_proxy/local_users/" + username
		resp, _ := proxyPatch(c, testuserToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, 403)

		// grant admin access to username
		data = `{"PrincipalName":"` + username + `","local":true,"role":"admin","tenantName":""}`
		authz := s.addAuthorization(c, data, adToken)

		// retry calling the admin api, it should succeed now
		data = `{"first_name":"Temp", "last_name": "User"}`
		respBody := `{"username":"` + username + `","first_name":"Temp","last_name":"User","disable":false}`
		s.updateLocalUser(c, username, data, respBody, testuserToken)

		// delete authorization
		s.deleteAuthorization(c, authz.AuthzUUID, adToken)

		// calling admin api should fail again withouth requiring new token (since cached value
		// of role authz in token isn't used)
		endpoint = "/api/v1/ccn_proxy/local_users/" + username
		resp, _ = proxyPatch(c, testuserToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, 403)
	})
}
