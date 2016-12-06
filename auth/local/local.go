package local

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/usermgmt"
)

// Authenticate authenticates the user against local DB with the given username and password
// params:
//  username: username to authenticate
//  password: password of the user
// return values:
//  []*types.Principal on successful authentication else nil
//  error: nil on successful authentication otherwise ErrLocalAuthenticationFailed
func Authenticate(username, password string) ([]*types.Principal, error) {
	user, err := usermgmt.GetLocalUser(username)
	if err != nil {
		if err == ccnerrors.ErrKeyNotFound {
			return nil, ccnerrors.ErrUserNotFound
		}

		return nil, err
	}

	if user.LocalUser.Disable {
		log.Debugf("Local user %q is disabled", username)
		return nil, ccnerrors.ErrAccessDenied
	}

	if !common.ValidatePassword(user.PasswordSalt, password, user.PasswordHash) {
		log.Debugf("Incorrect password for user %q", username)
		return nil, ccnerrors.ErrAccessDenied
	}

	// TODO:this needs to be integrated with authZ module to fetch more principals based on the user role.
	userPrincipals := []*types.Principal{}
	userPrincipals = append(userPrincipals, &user.Principal)
	return userPrincipals, nil
}
