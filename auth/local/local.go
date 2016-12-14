package local

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/db"
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
		if err == ccnerrors.ErrKeyNotFound {
			return nil, ccnerrors.ErrUserNotFound
		}

		return nil, err
	}

	if user.Disable {
		log.Debugf("Local user %q is disabled", username)
		return nil, ccnerrors.ErrAccessDenied
	}

	if !common.ValidatePassword(password, user.PasswordHash) {
		log.Debugf("Incorrect password for user %q", username)
		return nil, ccnerrors.ErrAccessDenied
	}

	// local user's JWT will only contain the `username` + default claims (exp, role, etc.. )
	// user.Username is the PrincipalName for localuser
	return []string{user.Username}, nil
}
