package systemtests

import (
	"io/ioutil"
	"net/http"

	"github.com/contiv/ccn_proxy/proxy"
	. "gopkg.in/check.v1"
)

// TODO: the usernames and passwords here are currently hardcoded in lieu of
//       having a package/datastore for doing local user management.
//       See Test() in init_test.go for where that would be done.

// TestLogin tests that valid credentials successfully authenticate and that
// invalid credentials result in failed authentication.
func (s *systemtestSuite) TestLogin(c *C) {
	runTest(func(p *proxy.Server, ms *MockServer) {
		//
		// valid credentials
		//
		token, resp, err := login(adminUsername, adminPassword)
		c.Assert(err, IsNil)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(len(token), Not(Equals), 0)

		//
		// invalid credentials
		//
		token, resp, err = login("foo", "bar")
		c.Assert(err, IsNil)
		c.Assert(resp.StatusCode, Equals, 401)
		c.Assert(len(token), Equals, 0)
	})
}

// TestRequestProxying tests that authenticated requests are proxied to the mock
// server and the response is returned properly.
func (s *systemtestSuite) TestRequestProxying(c *C) {
	runTest(func(p *proxy.Server, ms *MockServer) {

		data := `{"foo":"bar"}`
		endpoint := "/api/v1/networks/"

		ms.AddHardcodedResponse(endpoint, []byte(data))

		token := adminToken(c)

		resp, body := proxyGet(c, token, endpoint)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(data, Equals, string(body))

		// check that the Content-Type header was set properly.
		// we need to add a custom charset to work around a Chrome bug:
		// https://bugs.chromium.org/p/chromium/issues/detail?id=438464
		headerFound := false
		for name, headers := range resp.Header {
			if name == "Content-Type" {
				c.Assert(len(headers), Equals, 1)
				c.Assert(headers[0], Equals, "application/json; charset=utf-8")
				headerFound = true
				break
			}
		}

		c.Assert(headerFound, Equals, true)
	})
}

// TestPOSTBody tests that the body of a POST request is received by the mock
// server exactly as we sent it to the proxy.
func (s *systemtestSuite) TestPOSTBody(c *C) {
	runTest(func(p *proxy.Server, ms *MockServer) {

		data := `{"foo":"bar"}`
		endpoint := "/api/v1/networks/foo/"

		// this handler sends the request body back as the response body
		ms.AddHandler(endpoint, func(w http.ResponseWriter, req *http.Request) {
			body, err := ioutil.ReadAll(req.Body)
			c.Assert(err, IsNil)

			w.WriteHeader(http.StatusOK)
			w.Write(body)
		})

		token := adminToken(c)

		_, responseBody := proxyPost(c, token, endpoint, []byte(data))
		c.Assert(string(responseBody), Equals, data)
	})
}
