package systemtests

import (
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/proxy"
	. "gopkg.in/check.v1"
)

var (
	builtInUsers = []string{types.Admin.String(), types.Ops.String()}
	newUsers     = []string{"xxx", "yyy", "zzz"}
)

// TestLocalUserEndpoints tests ccn_proxy's local user endpoints
func (s *systemtestSuite) TestLocalUserEndpoints(c *C) {

	runTest(func(p *proxy.Server, ms *MockServer) {
		token := adminToken(c)

		for _, username := range newUsers {
			endpoint := "/api/v1/ccn_proxy/local_users"
			resp, body := proxyGet(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(len(body), Not(Equals), 0)

			// add new local_user to the system
			data := `{"username":"` + username + `","password":"` + username + `", "disable":false}`
			respBody := `{"username":"` + username + `","first_name":"","last_name":"","disable":false}`
			s.addLocalUser(c, data, respBody, token)

			// get `username`
			endpoint = "/api/v1/ccn_proxy/local_users/" + username
			resp, body = proxyGet(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(string(body), DeepEquals, respBody)

			// try login using `username`
			testuserToken := loginAs(c, username, username)
			c.Assert(len(testuserToken), Not(Equals), 0)

			// delete `username`
			resp, body = proxyDelete(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 204)
			c.Assert(len(body), Equals, 0)

			// get `username`
			resp, body = proxyGet(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 404)
			c.Assert(len(body), Equals, 0)
		}

	})
}

// TestLocalUserUpdateEndpoint tests ccn_proxy's local user update endpoint
func (s *systemtestSuite) TestLocalUserUpdateEndpoint(c *C) {
	s.userUpdate(c)
	s.builtInUserUpdate(c)
}

// userUpdateEndpoint tests update on local user
func (s *systemtestSuite) userUpdate(c *C) {

	runTest(func(p *proxy.Server, ms *MockServer) {
		token := adminToken(c)

		for _, username := range newUsers {
			// add new local_user to the system
			data := `{"username":"` + username + `","password":"` + username + `", "disable":false}`
			respBody := `{"username":"` + username + `","first_name":"","last_name":"","disable":false}`
			s.addLocalUser(c, data, respBody, token)

			// try login using `username`
			testuserToken := loginAs(c, username, username)

			// update `testuser` details
			data = `{"first_name":"Temp", "last_name": "User"}`
			respBody = `{"username":"` + username + `","first_name":"Temp","last_name":"User","disable":false}`
			s.updateLocalUser(c, username, data, respBody, token)

			// try login again using `username` after update
			testuserToken = loginAs(c, username, username)
			c.Assert(len(testuserToken), Not(Equals), 0)

			// update `username`'s password
			data = `{"password":"test"}`
			s.updateLocalUser(c, username, data, respBody, token)

			// try login again using old password
			testuserToken, resp, err := login(username, username)
			c.Assert(err, IsNil)
			c.Assert(resp.StatusCode, Equals, 401)
			c.Assert(len(testuserToken), Equals, 0)

			// try login again using new password
			testuserToken = loginAs(c, username, "test")
			c.Assert(len(testuserToken), Not(Equals), 0)
		}
	})
}

// builtInUserUpdate tests built-in user update functionality
func (s *systemtestSuite) builtInUserUpdate(c *C) {

	runTest(func(p *proxy.Server, ms *MockServer) {
		token := adminToken(c)

		for _, username := range builtInUsers {
			// update user details
			data := `{"first_name":"Built-in", "last_name": "User", "disable":false}`
			respBody := `{"username":"` + username + `","first_name":"Built-in","last_name":"User","disable":false}`
			s.updateLocalUser(c, username, data, respBody, token)

			// login
			testuserToken := loginAs(c, username, username)
			c.Assert(len(testuserToken), Not(Equals), 0)

			// update password
			data = `{"password":"test"}`
			s.updateLocalUser(c, username, data, respBody, token)

			// try login again using old password
			testuserToken, resp, err := login(username, username)
			c.Assert(err, IsNil)
			c.Assert(resp.StatusCode, Equals, 401)
			c.Assert(len(testuserToken), Equals, 0)

			// try login again using new password
			testuserToken = loginAs(c, username, "test")
			c.Assert(len(testuserToken), Not(Equals), 0)

			// revert password so that it wont block other tests
			data = `{"password":"` + username + `"}`
			s.updateLocalUser(c, username, data, respBody, token)
		}
	})
}

// TestLocalUserDeleteEndpoint tests ccn_proxy's local user delete endpoint
func (s *systemtestSuite) TestLocalUserDeleteEndpoint(c *C) {

	runTest(func(p *proxy.Server, ms *MockServer) {
		token := adminToken(c)

		// add and delete new users
		for _, username := range newUsers {
			// add new local_user to the system
			data := `{"username":"` + username + `","password":"` + username + `", "disable":false}`
			respBody := `{"username":"` + username + `","first_name":"","last_name":"","disable":false}`
			s.addLocalUser(c, data, respBody, token)

			endpoint := "/api/v1/ccn_proxy/local_users/" + username

			// delete `username`
			resp, body := proxyDelete(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 204)
			c.Assert(len(body), Equals, 0)

			// get `username`
			resp, body = proxyGet(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 404)
			c.Assert(len(body), Equals, 0)
		}

		// delete built-in users
		for _, username := range builtInUsers {
			endpoint := "/api/v1/ccn_proxy/local_users/" + username

			// delete `username`
			resp, body := proxyDelete(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 400)
			c.Assert(len(body), Not(Equals), 0)

			// get `username`
			resp, body = proxyGet(c, token, endpoint)
			c.Assert(resp.StatusCode, Equals, 200)
			c.Assert(len(body), Not(Equals), 0)
		}
	})
}

// addLocalUser helper function for the tests
func (s *systemtestSuite) addLocalUser(c *C, data, expectedRespBody, token string) {
	endpoint := "/api/v1/ccn_proxy/local_users"

	resp, body := proxyPost(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 201)
	c.Assert(string(body), DeepEquals, expectedRespBody)
}

// updateLocalUser helper function for the tests
func (s *systemtestSuite) updateLocalUser(c *C, username, data, expectedRespBody, token string) {
	endpoint := "/api/v1/ccn_proxy/local_users/" + username

	resp, body := proxyPatch(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 200)
	c.Assert(string(body), DeepEquals, expectedRespBody)
}
