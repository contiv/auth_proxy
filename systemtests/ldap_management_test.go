package systemtests

import (
	"net/http"

	"github.com/contiv/auth_proxy/proxy"
	. "gopkg.in/check.v1"
)

var endpoint = proxy.V1Prefix + "/ldap_configuration" + "/"

// addLdapConfiguration helper function for the tests
func (s *systemtestSuite) addLdapConfiguration(c *C, token, data string) {
	resp, _ := proxyPut(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 201)
}

// deleteLdapConfiguration helper function for the tests
func (s *systemtestSuite) deleteLdapConfiguration(c *C, token string) {
	resp, body := proxyDelete(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 204)
	c.Assert(body, DeepEquals, []byte{})
}

// getLdapConfiguration helper function for the tests
func (s *systemtestSuite) getLdapConfiguration(c *C, token string) []byte {
	resp, body := proxyGet(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 200)

	return body
}

// updateLdapConfiguration helper function for the tests
func (s *systemtestSuite) updateLdapConfiguration(c *C, token, data string) {
	resp, _ := proxyPatch(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 200)
}

// NOTE: LDAP operations are admin only

// TestLdapAddEndpoint tests LDAP add endpoint
func (s *systemtestSuite) TestLdapAddEndpoint(c *C) {
	// this also sets adToken
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		userToken := loginAs(c, username, username)

		// test with corrupted json data
		ldapConfig := s.getRunningLdapConfig(false)
		data := ldapConfig + "xxx"
		resp, body := proxyPut(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusInternalServerError)
		c.Assert(string(body), Matches, ".*Failed to unmarshal LDAP info.*")

		// Add ldap config using user token; non-admins cannot access ldap endpoints
		resp, body = proxyPut(c, userToken, endpoint, []byte(ldapConfig))
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)
		c.Assert(string(body), Matches, ".*access denied.*")

		// invalid port
		data = `{"server":"localhost", "port":0}`
		resp, body = proxyPut(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*Invalid.*Port details.*")

		// empty server name/ip
		data = `{"server":"", "port":123}`
		resp, body = proxyPut(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*Invalid.*Port details.*")

		// empty DN
		data = `{"server":"localhost", "port":4563, "service_account_dn":""}`
		resp, body = proxyPut(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*Empty service account DN/Password.*")

		// empty password
		data = `{"server":"localhost", "port":4563, "service_account_dn":"xxx","service_account_password":""}`
		resp, body = proxyPut(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*Empty service account DN/Password.*")

		// empty base DN
		data = `{"server":"localhost", "port":4563, "service_account_dn":"xxx","service_account_password":"xxx"}`
		resp, body = proxyPut(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*Empty base DN.*")

		// add ldap config using admin token
		s.addLdapConfiguration(c, adToken, ldapConfig)

		// add the same config again
		resp, body = proxyPut(c, adToken, endpoint, []byte(ldapConfig))
		c.Assert(resp.StatusCode, Equals, http.StatusBadRequest)
		c.Assert(string(body), Matches, ".*LDAP setttings exists already.*")

		// upgrade `username` to admin and try adding the config
		data = `{"PrincipalName":"` + username + `","local":true,"role":"admin","tenantName":""}`
		authz := s.addAuthorization(c, data, adToken)

		s.deleteLdapConfiguration(c, adToken)

		// `username` is now admin; try with user token
		s.addLdapConfiguration(c, userToken, ldapConfig)

		s.deleteLdapConfiguration(c, userToken)

		s.deleteAuthorization(c, authz.AuthzUUID, userToken)

	})
}

// TestLdapDeleteEndpoint tests LDAP delete endpoint
func (s *systemtestSuite) TestLdapDeleteEndpoint(c *C) {
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		userToken := loginAs(c, username, username)
		ldapConfig := s.getRunningLdapConfig(false)

		// add ldap config using admin token
		s.addLdapConfiguration(c, adToken, ldapConfig)

		// non-admins cannot delete
		resp, body := proxyDelete(c, userToken, endpoint)
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)
		c.Assert(string(body), Matches, ".*access denied.*")

		s.deleteLdapConfiguration(c, adToken)
	})
}

// TestLdapUpdateEndpoint tests LDAP update endpoint; this also tests GET
func (s *systemtestSuite) TestLdapUpdateEndpoint(c *C) {
	s.addUser(c, username)

	runTest(func(ms *MockServer) {
		userToken := loginAs(c, username, username)
		ldapConfig := s.getRunningLdapConfig(false)

		// add ldap config using admin token
		s.addLdapConfiguration(c, adToken, ldapConfig)

		// this also tests GET
		data := `{"server":"` + ldapServer + `","port":5678,"base_dn":"DC=contiv,DC=ad,DC=local","service_account_dn":"CN=Service Account,CN=Users,DC=contiv,DC=ad,DC=local","start_tls":false,"insecure_skip_verify":false,"tls_cert_issued_to":""}`
		c.Assert(string(s.getLdapConfiguration(c, adToken)), DeepEquals, data)

		// update the existing ldap config
		data = `{"server":"` + ldapServer + `", "port":45631, "base_dn":"DC=contiv,DC=local", 
              "service_account_dn":"CN=Service Account,CN=Users,DC=contiv,DC=local", "service_account_password": "xxx", 
              "start_tls":false}`
		s.updateLdapConfiguration(c, adToken, data)

		data = `{"server":"` + ldapServer + `","port":45631,"base_dn":"DC=contiv,DC=local","service_account_dn":"CN=Service Account,CN=Users,DC=contiv,DC=local","start_tls":false,"insecure_skip_verify":false,"tls_cert_issued_to":""}`
		c.Assert(string(s.getLdapConfiguration(c, adToken)), DeepEquals, data)

		// non-admins cannot access this endpoint
		resp, body := proxyPatch(c, userToken, endpoint, []byte{})
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)
		c.Assert(string(body), Matches, ".*access denied.*")

		resp, body = proxyGet(c, userToken, endpoint)
		c.Assert(resp.StatusCode, Equals, http.StatusForbidden)
		c.Assert(string(body), Matches, ".*access denied.*")

		// update using admin token
		data = `{"start_tls":true}`
		resp, body = proxyPatch(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, 400)
		c.Assert(string(body), Matches, ".*InsecureSkipVerify or TLSCertIssuedTo must be provided.*")

		data = `{"server":"contiv.ad.local", "start_tls":true}`
		s.updateLdapConfiguration(c, adToken, data)
		c.Assert(string(s.getLdapConfiguration(c, adToken)), Matches, ".*\"tls_cert_issued_to\":\"contiv.ad.local\".*")

		data = `{"start_tls":false}`
		resp, _ = proxyPatch(c, adToken, endpoint, []byte(data))
		c.Assert(resp.StatusCode, Equals, 200)

		s.deleteLdapConfiguration(c, adToken)
	})
}
