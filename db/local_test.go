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

	. "gopkg.in/check.v1"
)

type dbSuite struct{}

var _ = Suite(&dbSuite{})

var (
	newUsers = []types.LocalUser{
		{
			Username:  "aaa",
			FirstName: "Temp",
			LastName:  "User",
			Disable:   true,
		},
		{
			Username:  "bbb",
			FirstName: "Temp",
			LastName:  "User",
			Disable:   true,
		},
		{
			Username:  "ccc",
			FirstName: "Temp",
			LastName:  "User",
			Disable:   true,
		},
	}

	invalidUsers   = []string{"xxx", "yyy", "zzz"}
	builtInUsers   = []string{types.Admin.String(), types.Ops.String()}
	datastore      = ""
	datastorePaths = []string{
		GetPath(RootLocalUsers),
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
		user := &types.LocalUser{
			Username: username,
			Disable:  false,
			Password: username,
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

		c.Assert(user.Username, Equals, username)
		c.Assert(user.Password, Equals, "")
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
	for _, user := range newUsers {
		err := AddLocalUser(&user)
		c.Assert(err, IsNil)

		// add existing usernames and check for error
		err = AddLocalUser(&user)
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
	for _, user := range newUsers {
		err := DeleteLocalUser(user.Username)
		c.Assert(err, IsNil)

		// delete the same user again
		err = DeleteLocalUser(user.Username)
		c.Assert(err, Equals, ccnerrors.ErrKeyNotFound)
	}
}

// TestUpdateLocalUser test `UpdateLocalUser(...)`
func (s *dbSuite) TestUpdateLocalUser(c *C) {
	s.TestAddLocalUser(c)

	for _, user := range newUsers {
		uUser, err := GetLocalUser(user.Username)
		c.Assert(err, IsNil)

		// change the username and update
		newObj := &types.LocalUser{
			Username:     user.Username,
			PasswordHash: uUser.PasswordHash,
			Disable:      uUser.Disable,
			FirstName:    uUser.FirstName + "_u",
			LastName:     uUser.LastName + "_u",
		}

		err = UpdateLocalUser(user.Username, newObj)
		c.Assert(err, IsNil)
		newObj.PasswordHash = uUser.PasswordHash

		// search the data store for new username
		newUser, err := GetLocalUser(user.Username)
		c.Assert(err, IsNil)
		c.Assert(newUser, DeepEquals, newObj)
	}

	// revert the changes
	for _, user := range newUsers {
		uUser, err := GetLocalUser(user.Username)
		c.Assert(err, IsNil)

		// change the username and update
		newObj := &types.LocalUser{
			Username:     uUser.Username, // same as user.Username
			PasswordHash: uUser.PasswordHash,
			Disable:      uUser.Disable,
			FirstName:    user.FirstName,
			LastName:     user.LastName,
		}
		err = UpdateLocalUser(user.Username, newObj)
		c.Assert(err, IsNil)
		newObj.PasswordHash = uUser.PasswordHash

		newUser, err := GetLocalUser(user.Username)
		c.Assert(err, IsNil)
		c.Assert(newUser, DeepEquals, newObj)
	}
}

// TestGetLocalUsers tests `GetLocalUsers(...)`
func (s *dbSuite) TestGetLocalUsers(c *C) {
	users, err := GetLocalUsers()
	c.Assert(err, IsNil)
	c.Assert(users, DeepEquals, []*types.LocalUser{})

	s.TestAddLocalUser(c)
	s.addBuiltInUsers(c)

	users, err = GetLocalUsers()
	c.Assert(err, IsNil)

	usernames := []string{}
	for _, user := range users {
		usernames = append(usernames, user.Username)
	}

	newUserNames := []string{}
	for _, user := range newUsers {
		newUserNames = append(newUserNames, user.Username)
	}

	allUsers := append(newUserNames, builtInUsers...)
	sort.Strings(usernames)
	sort.Strings(allUsers)

	c.Assert(usernames, DeepEquals, allUsers)

}

func (s *dbSuite) TestUpdateBuiltInUsers(c *C) {
	s.addBuiltInUsers(c)

	// update all the details except `password`
	for _, username := range builtInUsers {
		user, err := GetLocalUser(username)
		c.Assert(err, IsNil)

		uUser := &types.LocalUser{
			Username:     user.Username,
			Disable:      true,
			FirstName:    "BuiltIn",
			LastName:     "User",
			PasswordHash: user.PasswordHash,
		}

		err = UpdateLocalUser(username, uUser)
		c.Assert(err, IsNil)
		uUser.PasswordHash = user.PasswordHash

		obtainedUser, err := GetLocalUser(username)
		c.Assert(err, IsNil)
		c.Assert(obtainedUser, DeepEquals, uUser)
	}

	// update password and check hash
	for _, username := range builtInUsers {
		user, err := GetLocalUser(username)
		c.Assert(err, IsNil)

		uUser := &types.LocalUser{
			Username: user.Username,
			Password: user.Username + "_U",
		}

		err = UpdateLocalUser(username, uUser)
		c.Assert(err, IsNil)

		obtainedUser, err := GetLocalUser(username)
		c.Assert(err, IsNil)
		c.Assert(string(obtainedUser.PasswordHash), Not(Equals), string(user.PasswordHash))

		// all other attributes got default value
		c.Assert(obtainedUser.LastName, Equals, "")
		c.Assert(obtainedUser.FirstName, Equals, "")
		c.Assert(obtainedUser.Disable, Equals, false)
	}

}
