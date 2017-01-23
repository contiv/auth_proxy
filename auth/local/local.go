package local

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/auth_proxy/common"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/db"
)

// Authenticate authenticates the user against local DB with the given username and password
// params:
//  username: username to authenticate
//  password: password of the user
// return values:
//  []string containing the `PrincipalName`(username) on successful authentication else nil
//  error: nil on successful authentication otherwise ErrLocalAuthenticationFailed
func Authenticate(username, password string) ([]string, error) {
	user, err := db.GetLocalUser(username)
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			return nil, auth_errors.ErrUserNotFound
		}

		return nil, err
	}

	if user.Disable {
		log.Debugf("Local user %q is disabled", username)
		return nil, auth_errors.ErrAccessDenied
	}

	if !common.ValidatePassword(password, user.PasswordHash) {
		log.Debugf("Incorrect password for user %q", username)
		return nil, auth_errors.ErrAccessDenied
	}

	// user.Username is the PrincipalName for localuser
	return []string{user.Username}, nil
}
