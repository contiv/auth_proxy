package systemtests

import (
	"github.com/contiv/auth_proxy/proxy"
	. "gopkg.in/check.v1"
)

// TODO: add system tests to test LDAP management CRUD operations

// addLdapConfiguration helper function for the tests
func (s *systemtestSuite) addLdapConfiguration(c *C, token, data string) {
	endpoint := proxy.V1Prefix + "/ldap_configuration"

	resp, _ := proxyPost(c, token, endpoint, []byte(data))
	c.Assert(resp.StatusCode, Equals, 201)
}

// deleteLdapConfiguration helper function for the tests
func (s *systemtestSuite) deleteLdapConfiguration(c *C, token string) {
	endpoint := proxy.V1Prefix + "/ldap_configuration"

	resp, body := proxyDelete(c, token, endpoint)
	c.Assert(resp.StatusCode, Equals, 204)
	c.Assert(body, DeepEquals, []byte{})
}
