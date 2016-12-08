package usermgmt

import (
	"sort"
	"testing"

	log "github.com/Sirupsen/logrus"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/test"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/state"
	uuid "github.com/satori/go.uuid"

	. "gopkg.in/check.v1"
)

type usermgmtSuite struct{}

var _ = Suite(&usermgmtSuite{})

var (
	invalidUsers   = []string{"xxx", "yyy", "zzz"}
	newUsers       = []string{"aaa", "bbb", "ccc"}
	builtinUsers   = []string{types.Admin.String(), types.Ops.String()}
	datastore      = ""
	datastorePaths = []string{
		GetPath(RootLocalUsers),
		GetPath(RootPrincipals),
	}
)

// SetUpSuite sets up the environment for tests.
func (s *usermgmtSuite) SetUpSuite(c *C) {
	datastore = test.GetDatastore()
	datastoreAddress := test.GetDatastoreAddress()

	test.CleanupDatastore(datastore, datastorePaths)
	if err := state.InitializeStateDriver(datastoreAddress); err != nil {
		log.Fatalln(err)
	}

	if err := AddDefaultUsers(); err != nil {
		log.Fatalln(err)
	}
}

// TearDownSuite reverts the data store state + any further cleanup required.
func (s *usermgmtSuite) TearDownSuite(c *C) {
	test.CleanupDatastore(datastore, datastorePaths)
}

func TestMgmtSuite(t *testing.T) {
	TestingT(t)
}

// TestGetLocalUser tests `GetLocalUser(...)`
func (s *usermgmtSuite) TestGetLocalUser(c *C) {
	for _, username := range builtinUsers {
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
func (s *usermgmtSuite) TestAddLocalUser(c *C) {
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
// NOTE: this needs to run after `TestAddLocalUser`
func (s *usermgmtSuite) TestDeleteLocalUser(c *C) {
	// delete built-in users
	for _, username := range builtinUsers {
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

	//add the users back again; revert
	s.TestAddLocalUser(c)
}

// TestUpdateLocalUser test `UpdateLocalUser(...)`
// NOTE: this needs to run after `TestAddLocalUser`
func (s *usermgmtSuite) TestUpdateLocalUser(c *C) {
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
// NOTE: this needs to run after `TestAddLocalUser`
func (s *usermgmtSuite) TestGetLocalUsers(c *C) {
	users, err := GetLocalUsers()
	c.Assert(err, IsNil)

	usernames := []string{}
	for _, user := range users {
		usernames = append(usernames, user.LocalUser.Username)
	}

	allUsers := append(newUsers, builtinUsers...)
	sort.Strings(usernames)
	sort.Strings(allUsers)

	c.Assert(usernames, DeepEquals, allUsers)

}
