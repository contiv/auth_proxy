package db

import (
	"os/exec"
	"sort"
	"testing"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/test"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/state"
	uuid "github.com/satori/go.uuid"

	. "gopkg.in/check.v1"
)

type dbSuite struct{}

var _ = Suite(&dbSuite{})

var (
	invalidUsers   = []string{"xxx", "yyy", "zzz"}
	newUsers       = []string{"aaa", "bbb", "ccc"}
	builtInUsers   = []string{types.Admin.String(), types.Ops.String()}
	datastore      = ""
	datastorePaths = []string{
		GetPath(RootLocalUsers),
		GetPath(RootPrincipals),
		GetPath(RootLdapConfiguration),
	}
)

func (s *dbSuite) SetUpTest(c *C) {
	test.CleanupDatastore(datastore, datastorePaths)
}

// SetUpSuite sets up the environment for tests.
func (s *dbSuite) SetUpSuite(c *C) {
	datastore = test.GetDatastore()
	datastoreAddress := test.GetDatastoreAddress()

	log.Info("As part of the data store cleanup, the following paths will be deleted.")
	for _, path := range datastorePaths {
		log.Infof("%q", path)
	}

	if err := state.InitializeStateDriver(datastoreAddress); err != nil {
		log.Fatalln(err)
	}

	// set `tls_key_file` in Globals
	exec.Command("/bin/sh", "-c", "make generate-certificate")
	common.Global().Set("tls_key_file", "../local_certs/local.key")
}

// TearDownSuite reverts the data store state + any further cleanup required.
func (s *dbSuite) TearDownSuite(c *C) {
	test.CleanupDatastore(datastore, datastorePaths)
}

func TestMgmtSuite(t *testing.T) {
	TestingT(t)
}

// addBuiltInUsers adds built-in users to the data store.
func (s *dbSuite) addBuiltInUsers(c *C) {
	for _, username := range builtInUsers {
		roleType, rErr := types.Role(username)
		c.Assert(rErr, IsNil)

		principalID := uuid.NewV4().String()
		user := &types.InternalLocalUser{
			LocalUser: types.LocalUser{
				Username: username,
				Disable:  false,
			},
			Principal: types.Principal{
				UUID: principalID,
				Role: roleType,
			},
			PrincipalID: principalID,
		}

		err := AddLocalUser(user)
		c.Assert(err, IsNil)
	}
}

// TestGetLocalUser tests `GetLocalUser(...)`
func (s *dbSuite) TestGetLocalUser(c *C) {
	s.addBuiltInUsers(c)

	for _, username := range builtInUsers {
		user, err := GetLocalUser(username)
		c.Assert(err, IsNil)

		c.Assert(user.LocalUser.Username, Equals, username)

		roleType, rErr := types.Role(username)
		c.Assert(rErr, IsNil)

		c.Assert(user.Principal.Role, Equals, roleType)
	}

	// invalid users
	for _, username := range invalidUsers {
		user, err := GetLocalUser(username)
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)
		c.Assert(user, IsNil)
	}

}

// TestAddLocalUser tests `AddLocalUser(...)`
func (s *dbSuite) TestAddLocalUser(c *C) {
	// add new users
	for _, username := range newUsers {
		principalID := uuid.NewV4().String()
		user := &types.InternalLocalUser{
			LocalUser: types.LocalUser{
				Username: username,
				Disable:  false,
			},
			Principal: types.Principal{
				UUID: principalID,
				Role: types.Ops,
			},
			PrincipalID: principalID,
		}

		err := AddLocalUser(user)
		c.Assert(err, IsNil)

		// add existing usernames and check for error
		err = AddLocalUser(user)
		c.Assert(err, Equals, ccnerrors.ErrKeyExists)
	}

}

// TestDeleteLocalUser tests `DeleteLocalUser(...)`
func (s *dbSuite) TestDeleteLocalUser(c *C) {
	s.addBuiltInUsers(c)
	s.TestAddLocalUser(c)

	// delete built-in users
	for _, username := range builtInUsers {
		err := DeleteLocalUser(username)
		c.Assert(err, Equals, ccnerrors.ErrIllegalOperation)
	}

	// delete the added new users
	for _, username := range newUsers {
		err := DeleteLocalUser(username)
		c.Assert(err, IsNil)

		// delete the same user again
		err = DeleteLocalUser(username)
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)
	}
}

// TestUpdateLocalUser test `UpdateLocalUser(...)`
func (s *dbSuite) TestUpdateLocalUser(c *C) {
	s.TestAddLocalUser(c)

	for _, username := range newUsers {
		user, err := GetLocalUser(username)
		c.Assert(err, IsNil)

		// change the username and update
		user.LocalUser.Username = username + "_u"
		err = UpdateLocalUser(username, user)
		c.Assert(err, IsNil)

		// search the data store for old username
		oldUser, err := GetLocalUser(username)
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)
		c.Assert(oldUser, IsNil)

		// search the data store for new username
		newUser, err := GetLocalUser(username + "_u")
		c.Assert(err, IsNil)
		c.Assert(newUser, DeepEquals, user)
	}

	// revert the changes
	for _, username := range newUsers {
		updateTo := username
		username = username + "_u"

		user, err := GetLocalUser(username)
		c.Assert(err, IsNil)

		// change the username and update
		user.LocalUser.Username = updateTo
		err = UpdateLocalUser(username, user)
		c.Assert(err, IsNil)

		// search the data store for old username
		oldUser, err := GetLocalUser(username)
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)
		c.Assert(oldUser, IsNil)

		newUser, err := GetLocalUser(updateTo)
		c.Assert(err, IsNil)
		c.Assert(newUser, DeepEquals, user)
	}
}

// TestGetLocalUsers tests `GetLocalUsers(...)`
func (s *dbSuite) TestGetLocalUsers(c *C) {
	s.TestAddLocalUser(c)
	s.addBuiltInUsers(c)

	users, err := GetLocalUsers()
	c.Assert(err, IsNil)

	usernames := []string{}
	for _, user := range users {
		usernames = append(usernames, user.LocalUser.Username)
	}

	allUsers := append(newUsers, builtInUsers...)
	sort.Strings(usernames)
	sort.Strings(allUsers)

	c.Assert(usernames, DeepEquals, allUsers)

}
