package db

import (
	"encoding/json"
	"fmt"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/state"
	uuid "github.com/satori/go.uuid"
)

// This file contains all local user management APIs.
// NOTE: Built-in users(admin, ops) cannot be changed/updated. it needs to be consumed in the way its defined in code.

// deleteUserPrincipal helper function to delete user.principal; called from `DeleteLocalUser`.
// params:
// principal: reference of the principal object to be deleted from the data store
//  stateDrv: data store driver object
// return values:
//  error: custom error with error from `ClearState(...)`
func deleteUserPrincipal(principal *types.Principal, stateDrv types.StateDriver) error {
	if err := stateDrv.ClearState(GetPath(RootPrincipals, principal.UUID)); err != nil {
		return fmt.Errorf("Failed to clear principal %#v from store %#v", principal, err)
	}

	return nil
}

// addUserPrincipal helper function to insert user.principal; called from `AddLocalUser`.
// params:
//  principal: reference of the principal object to be inserted into the data store
//  stateDrv: data store driver object
// retutn values:
//  error: any relevant custom errors or as returned by consecutive calls
func addUserPrincipal(principal *types.Principal, stateDrv types.StateDriver) error {
	_, err := stateDrv.Read(GetPath(RootPrincipals, principal.UUID))

	switch err {
	case nil:
		return fmt.Errorf("%s: %q", ccnerrors.ErrKeyExists, principal.UUID)
	case ccnerrors.ErrKeyNotFound:
		val, err := json.Marshal(principal)
		if err != nil {
			return fmt.Errorf("Failed to marshal principal %#v, %#v", principal, err)
		}

		if err := stateDrv.Write(GetPath(RootPrincipals, principal.UUID), val); err != nil {
			return fmt.Errorf("Failed to write local user principal to data store %#v", err)
		}

		return nil
	default:
		return err
	}
}

// getLocalUser helper function that looks up a user entry in `users` using username
// params:
//  username:string; name of the user to be fetched
// return values:
//  *types.InternalLocalUser: reference to the internal representation of the local user object
//  error: as returned by the consecutive calls or any relevant custom errors
func getLocalUser(username string, stateDrv types.StateDriver) (*types.InternalLocalUser, error) {
	rawData, err := stateDrv.Read(GetPath(RootLocalUsers, username))
	if err != nil {
		if err == ccnerrors.ErrKeyNotFound {
			return nil, err
		}

		return nil, fmt.Errorf("Failed to read local user %q data from store: %#v", username, err)
	}

	var localUser types.InternalLocalUser
	if err := json.Unmarshal(rawData, &localUser); err != nil {
		return nil, fmt.Errorf("Failed to unmarshal local user %q info %#v", username, err)
	}

	return &localUser, nil
}

// GetLocalUsers returns all defined local users.
// return values:
//  []types.InternalLocalUser: slice of local users
//  error: as returned by consecutive func calls
func GetLocalUsers() ([]*types.InternalLocalUser, error) {
	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}

	rawData, err := stateDrv.ReadAll(GetPath(RootLocalUsers))
	if err != nil {
		return nil, fmt.Errorf("Couldn't fetch users from data store")
	}

	users := []*types.InternalLocalUser{}
	for _, data := range rawData {
		localUser := &types.InternalLocalUser{}
		if err := json.Unmarshal(data, localUser); err != nil {
			return nil, err
		}
		users = append(users, localUser)
	}

	return users, nil
}

// GetLocalUser looks up a user entry in `users` path.
// params:
//  username:string; name of the user to be fetched
// return values:
//  *types.InternalLocalUser: reference to the internal representation of the local user object
//  error: as returned by getLocalUser(..)
func GetLocalUser(username string) (*types.InternalLocalUser, error) {
	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}

	return getLocalUser(username, stateDrv)
}

// UpdateLocalUser updates an existing entry in /ccn_proxy/users/local/<username>.
// params:
//  username: string; of the user that requires update
//  user: internal representation of the user (contains both user details + principal) object to be updated in the data store
// return values:
//  error: as returned by AddLocalUser, DeleteLocalUser
func UpdateLocalUser(username string, user *types.InternalLocalUser) error {
	err := DeleteLocalUser(username)
	switch err {
	case nil:
		return AddLocalUser(user)
	case ccnerrors.ErrKeyNotFound, ccnerrors.ErrIllegalOperation:
		return err
	default:
		// this should never be leaked to the user
		log.Debugf("Failed to delete user %q as part of update process %#v", username, err)
		return fmt.Errorf("Couldn't update user information: %q", username)
	}
}

// DeleteLocalUser removes a local user and its corresponding principal.
// Built-in admin and ops local users cannot be deleted.
// params:
//  username: string; user to be removed from the system
// return values:
//  error: ccnerrors.ErrIllegalOperation or any relevant error from the consecutive func calls
func DeleteLocalUser(username string) error {
	if username == types.Admin.String() || username == types.Ops.String() {
		// built-in users cannot be deleted
		return ccnerrors.ErrIllegalOperation
	}

	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return err
	}

	user, err := getLocalUser(username, stateDrv)
	if err != nil {
		return err
	}

	if err := deleteUserPrincipal(&user.Principal, stateDrv); err != nil {
		return err
	}

	if err := stateDrv.ClearState(GetPath(RootLocalUsers, username)); err != nil {
		//cleanup; there is always a principal associated with user (1-1 mapping)
		addUserPrincipal(&user.Principal, stateDrv)
		return fmt.Errorf("Failed to clear %q from store %#v", username, err)
	}

	return nil
}

// AddLocalUser adds a new user entry to /ccn_proxy/users/local/. It also adds a
// corresponding principal in /ccn_proxy/users/principal/.
// params:
//  user: internal representation of the user (contains both user details + principal) object to be added to data store
// return Values:
//  error: ccnerrors.ErrKeyExists if the user already exists or any relevant error from state driver
func AddLocalUser(user *types.InternalLocalUser) error {
	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return err
	}

	key := GetPath(RootLocalUsers, user.LocalUser.Username)

	_, err = stateDrv.Read(key)
	switch err {
	case nil:
		return ccnerrors.ErrKeyExists
	case ccnerrors.ErrKeyNotFound:
		if err := addUserPrincipal(&user.Principal, stateDrv); err != nil {
			return err
		}

		val, err := json.Marshal(user)
		if err != nil {
			return fmt.Errorf("Failed to marshal user %#v, %#v", user, err)
		}

		if err := stateDrv.Write(key, val); err != nil {
			// cleanup; to ensure user.principal is not left behind in the data store
			deleteUserPrincipal(&user.Principal, stateDrv)
			return fmt.Errorf("Failed to write local user info. to data store %#v", err)
		}

		return nil
	default:
		return err
	}
}

// AddDefaultUsers adds pre-defined  users(admin,ops) to the system.
// Default users cannot be changed(update/delete) anytime.
func AddDefaultUsers() error {
	for _, userR := range []types.RoleType{types.Admin, types.Ops} {
		// principalID is the unique ID for each user
		principalID := uuid.NewV4().String()

		localUser := types.InternalLocalUser{
			LocalUser: types.LocalUser{
				Username: userR.String(),
				// default user accounts are `enabled` always; it cannot be disabled
				Disable: false,
			},
			Principal: types.Principal{
				UUID: principalID,
				Role: userR,
			},
			PrincipalID: principalID,
		}

		var err error

		// use the role name for the default password (e.g., "admin" user password is "admin")
		localUser.PasswordHash, err = common.GenPasswordHash(userR.String())
		if err != nil {
			return err
		}

		if err := AddLocalUser(&localUser); err != nil {
			return err
		}

		log.Printf("Added local user '%s'", localUser.Username)
	}

	return nil
}
