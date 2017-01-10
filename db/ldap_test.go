package db

import (
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	. "gopkg.in/check.v1"
)

var (
	// few dummy LDAP configuration
	newLdapConfiguration = []types.LdapConfiguration{
		{
			Server:                 "10.9.89.7",
			Port:                   456,
			BaseDN:                 "DC=ccn,DC=example,DC=com",
			ServiceAccountDN:       "CN=Service Account,CN=Users,DC=ccn,DC=example,DC=com",
			ServiceAccountPassword: "xyz",
		},
		{
			Server:                 "10.99.89.7",
			Port:                   46,
			BaseDN:                 "DC=ccn,DC=example,DC=com",
			ServiceAccountDN:       "CN=xxx,CN=Users,DC=ccn,DC=example,DC=com",
			ServiceAccountPassword: "xxx",
		},
		{
			Server:                 "10.9.89.79",
			Port:                   4556,
			BaseDN:                 "DC=ccn,DC=example,DC=com",
			ServiceAccountDN:       "CN=yyy,CN=Users,DC=ccn,DC=example,DC=com",
			ServiceAccountPassword: "yyy",
		},
	}
)

// TestAddLdapConfiguration tests `AddLdapConfiguration`
func (s *dbSuite) TestAddLdapConfiguration(c *C) {
	for _, configuration := range newLdapConfiguration {
		oldPwd := configuration.ServiceAccountPassword
		err := AddLdapConfiguration(&configuration)
		c.Assert(err, IsNil)
		configuration.ServiceAccountPassword = oldPwd

		err = AddLdapConfiguration(&configuration)
		c.Assert(err, Equals, ccnerrors.ErrKeyExists)

		obtained, err := GetLdapConfiguration()
		c.Assert(err, IsNil)

		obtained.ServiceAccountPassword, err = common.Decrypt(obtained.ServiceAccountPassword)
		c.Assert(err, IsNil)
		c.Assert(obtained, DeepEquals, &configuration)

		err = DeleteLdapConfiguration()
		c.Assert(err, IsNil)
	}
}

// TestDeleteLdapConfiguration tests `DeleteLdapConfiguration`
func (s *dbSuite) TestDeleteLdapConfiguration(c *C) {
	for _, configuration := range newLdapConfiguration {
		err := AddLdapConfiguration(&configuration)
		c.Assert(err, IsNil)

		err = DeleteLdapConfiguration()
		c.Assert(err, IsNil)
	}
}

// TestUpdateLdapConfiguration tests `UpdateLdapConfiguration`
func (s *dbSuite) TestUpdateLdapConfiguration(c *C) {
	err := UpdateLdapConfiguration(nil)
	c.Assert(err, NotNil)

	for _, configuration := range newLdapConfiguration {
		err = UpdateLdapConfiguration(&configuration)
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)

		oldPwd := configuration.ServiceAccountPassword
		err = AddLdapConfiguration(&configuration)
		c.Assert(err, IsNil)
		configuration.ServiceAccountPassword = oldPwd

		obtained, err := GetLdapConfiguration()
		c.Assert(err, IsNil)

		obtained.ServiceAccountPassword, err = common.Decrypt(obtained.ServiceAccountPassword)
		c.Assert(err, IsNil)
		c.Assert(obtained, DeepEquals, &configuration)

		// update the configuration
		configuration.BaseDN = "10.10.10.10"
		configuration.ServiceAccountDN = "temp"
		configuration.ServiceAccountPassword = "temp"

		err = UpdateLdapConfiguration(&configuration)
		c.Assert(err, IsNil)
		configuration.ServiceAccountPassword = "temp"

		obtained, err = GetLdapConfiguration()
		c.Assert(err, IsNil)

		obtained.ServiceAccountPassword, err = common.Decrypt(obtained.ServiceAccountPassword)
		c.Assert(err, IsNil)
		c.Assert(obtained, DeepEquals, &configuration)

		err = DeleteLdapConfiguration()
		c.Assert(err, IsNil)
	}
}

// TestGetLdapConfiguration test `GetLdapConfiguration`
func (s *dbSuite) TestGetLdapConfiguration(c *C) {
	for _, configuration := range newLdapConfiguration {
		oldPwd := configuration.ServiceAccountPassword
		err := AddLdapConfiguration(&configuration)
		c.Assert(err, IsNil)
		configuration.ServiceAccountPassword = oldPwd

		obtained, err := GetLdapConfiguration()
		c.Assert(err, IsNil)

		obtained.ServiceAccountPassword, err = common.Decrypt(obtained.ServiceAccountPassword)
		c.Assert(err, IsNil)
		c.Assert(obtained, DeepEquals, &configuration)

		err = DeleteLdapConfiguration()
		c.Assert(err, IsNil)

		obtained, err = GetLdapConfiguration()
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)
		c.Assert(obtained, IsNil)
	}
}
