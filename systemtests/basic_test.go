package systemtests

import (
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/contiv/ccn_proxy/proxy"

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
			`"StartTLS":false,` +
			`"InsecureSkipVerify":true}`

		s.addLdapConfiguration(c, adToken, ldapConfig)

		// try logging using `service` account
		loginAs(c, "saccount", ldapPassword)

		// try logging using `temp` account; this fails as the user is only associated with primary group
		// more details can be found here: auth/ldap/ldap.go
		token, resp, err := login("temp", ldapPassword)
		c.Assert(token, Equals, "")
		c.Assert(resp.StatusCode, Equals, 401)
		c.Assert(err, IsNil)

		// tyy logging using `admin` account
		loginAs(c, "Administrator", ldapAdminPassword)

		s.deleteLdapConfiguration(c, adToken)
	})
}

// TestVersion tests that /version endpoint responds with something sane.
func (s *systemtestSuite) TestVersion(c *C) {
	runTest(func(ms *MockServer) {
		resp, data := proxyGet(c, noToken, "/version")
		c.Assert(resp.StatusCode, Equals, 200)

		vr := &proxy.VersionResponse{}
		err := json.Unmarshal(data, vr)
		c.Assert(err, IsNil)
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
