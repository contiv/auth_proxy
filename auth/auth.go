package auth

import (
	"github.com/contiv/ccn_proxy/auth/ldap"
	"github.com/contiv/ccn_proxy/auth/local"
	"github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"

	log "github.com/Sirupsen/logrus"
)

// Manager is the implementation of authentication manager
type Manager struct {
	IsADSet bool // this parameter helps to identify where AD authentication can be performed or not
}

// Authenticate authenticates the user against local DB or AD using the given credentials
// it returns a token which carries the role, capabilities, etc.
// params:
//    username: local or AD username of the user
//    password: password of the user
// return values:
//    `Token` string on successful authentication otherwise ErrADConfigNotFound or any relevant error.
func (authMgr *Manager) Authenticate(username, password string) (string, error) {
	localUserPrincipals, err := local.Authenticate(username, password)
	if err != nil { // local authentication failed; so, try LDAP
		if authMgr.IsADSet {
			if cfg := ldap.GetADConfig(); cfg != nil { // get AD configuration
				ldapManager := ldap.Manager{Config: *cfg}
				ldapUserPrincipals, lErr := ldapManager.Authenticate(username, password)
				if lErr != nil {
					return "", lErr
				}

				return authMgr.generateToken(ldapUserPrincipals, username)
			}

			log.Errorf("AD configuration not found")
			return "", errors.ErrADConfigNotFound
		}

		return "", err // error from local authentication
	}

	return authMgr.generateToken(localUserPrincipals, username) // local authentication succeeded!
}

// generateToken generates JWT(JSON Web Token) with the given user principals
// params:
//  principals: user principals
//  username: local or AD username of the user
// return values:
//    `Token` string on successful creation of JWT otherwise any relevant error from the subsequent function
func (authMgr *Manager) generateToken(principals []*types.Principal, username string) (string, error) {
	log.Debugf("Generating token for user %q", username)

	authZ, err := NewTokenWithClaims(principals) // create a new token with default `expiry` claim
	if err != nil {
		return "", err
	}

	// finally, add username to the token
	authZ.AddClaim("username", username)

	return authZ.Stringify()
}
