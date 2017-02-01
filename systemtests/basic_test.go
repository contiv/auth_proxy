package systemtests

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/contiv/auth_proxy/common"
	"github.com/contiv/auth_proxy/proxy"

	. "gopkg.in/check.v1"
)

const (
	// XXX: Yuva's dev server
	ldapServer        = "10.193.231.158"
	ldapPassword      = "C1ntainer$"
	ldapAdminPassword = "C1ntainer$!"

	// use this when testing unauthenticated endpoints instead of ""
	noToken = ""
)

// TODO: the usernames and passwords here are currently hardcoded in lieu of
//       having a package/datastore for doing local user management.
//       See Test() in init_test.go for where that would be done.

// TestLogin tests that valid credentials successfully authenticate and that
// invalid credentials result in failed authentication.
func (s *systemtestSuite) TestLogin(c *C) {
	runTest(func(ms *MockServer) {
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

	// test LDAP user login
	runTest(func(ms *MockServer) {
		adToken := adminToken(c)

		// add LDAP configuration
		ldapConfig := `{"server":"` + ldapServer + `",` +
			`"port":5678,` +
			`"base_dn":"DC=ccn,DC=example,DC=com",` +
			`"service_account_dn":"CN=Service Account,CN=Users,DC=ccn,DC=example,DC=com",` +
			`"service_account_password":"` + ldapPassword + `",` +
			`"start_tls":false,` +
			`"insecure_skip_verify":true}`

		s.addLdapConfiguration(c, adToken, ldapConfig)

		// try logging in using `service` account
		loginAs(c, "saccount", ldapPassword)

		// try logging in using `temp` account; this fails as the user is only associated with primary group
		// more details can be found here: auth/ldap/ldap.go
		token, resp, err := login("temp", ldapPassword)
		c.Assert(token, Equals, "")
		c.Assert(resp.StatusCode, Equals, 401)
		c.Assert(err, IsNil)

		// try logging in using `admin` account
		loginAs(c, "Administrator", ldapAdminPassword)

		s.deleteLdapConfiguration(c, adToken)
	})
}

// TestVersion tests that /version endpoint responds with something sane.
func (s *systemtestSuite) TestVersion(c *C) {
	runTest(func(ms *MockServer) {
		resp, data := proxyGet(c, noToken, proxy.VersionPath)
		c.Assert(resp.StatusCode, Equals, 200)

		vr := &proxy.VersionResponse{}
		err := json.Unmarshal(data, vr)
		c.Assert(err, IsNil)
	})
}

// TestHealthCheck tests that /health endpoint responds properly.
func (s *systemtestSuite) TestHealthCheck(c *C) {
	runTest(func(ms *MockServer) {

		testFunc := func() *proxy.HealthCheckResponse {
			resp, data := proxyGet(c, noToken, proxy.HealthCheckPath)
			c.Assert(resp.StatusCode, Equals, 200)

			hcr := &proxy.HealthCheckResponse{}
			err := json.Unmarshal(data, hcr)
			c.Assert(err, IsNil)

			return hcr
		}

		//
		// first check: with no configured /version endpoint on the mockserver,
		//              the netmaster should be marked unhealthy.
		//
		hcr := testFunc()

		c.Assert(hcr.Status, Equals, proxy.StatusUnhealthy)
		c.Assert(hcr.NetmasterHealth.Status, Equals, proxy.StatusUnhealthy)

		//
		// second check: we add a /version to mockserver and should get back
		//               a healthy response.
		//
		versionResponse := `{"GitCommit":"x","Version":"y","BuildTime":"z"}`
		ms.AddHardcodedResponse("/version", []byte(versionResponse))

		hcr = testFunc()

		c.Assert(hcr.Status, Equals, proxy.StatusHealthy)
		c.Assert(hcr.NetmasterHealth.Status, Equals, proxy.StatusHealthy)
		c.Assert(hcr.NetmasterHealth.Version, Equals, "y")
	})
}

// TestRequestProxying tests that authenticated requests are proxied to the mock
// server and the response is returned properly.
func (s *systemtestSuite) TestRequestProxying(c *C) {
	runTest(func(ms *MockServer) {

		data := `{"foo":"bar"}`
		endpoint := "/api/v1/networks/"

		ms.AddHardcodedResponse(endpoint, []byte(data))

		token := adminToken(c)

		resp, body := proxyGet(c, token, endpoint)
		c.Assert(resp.StatusCode, Equals, 200)
		c.Assert(data, Equals, string(body))

		// make sure that the expected headers are present

		contentTypeHeaderFound := false
		hstsHeaderFound := false

		for name, headers := range resp.Header {
			switch name {
			case "Content-Type":
				c.Assert(len(headers), Equals, 1)
				c.Assert(headers[0], Equals, "application/json; charset=utf-8")
				contentTypeHeaderFound = true
			case "Strict-Transport-Security":
				c.Assert(len(headers), Equals, 1)
				c.Assert(headers[0], Equals, common.HSTSValue)
				hstsHeaderFound = true
			}
		}

		c.Assert(contentTypeHeaderFound, Equals, true)
		c.Assert(hstsHeaderFound, Equals, true)
	})
}

// TestUIResponseHeaders tests that the UI is sending back the expected headers.
// TODO: test that assets are gzipped properly
func (s *systemtestSuite) TestUIResponseHeaders(c *C) {
	runTest(func(ms *MockServer) {
		resp, _ := proxyGet(c, noToken, "/")
		c.Assert(resp.StatusCode, Equals, 200)

		hstsHeaderFound := false

		for name, headers := range resp.Header {
			switch name {
			case "Strict-Transport-Security":
				c.Assert(len(headers), Equals, 1)
				c.Assert(headers[0], Equals, common.HSTSValue)
				hstsHeaderFound = true
			}
		}

		c.Assert(hstsHeaderFound, Equals, true)
	})
}

// TestPOSTBody tests that the body of a POST request is received by the mock
// server exactly as we sent it to the proxy.
func (s *systemtestSuite) TestPOSTBody(c *C) {
	runTest(func(ms *MockServer) {

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
