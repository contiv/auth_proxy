package auth

import (
	"github.com/contiv/ccn_proxy/auth/ldap"
	"github.com/contiv/ccn_proxy/auth/local"
	"github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"

	log "github.com/Sirupsen/logrus"
)

// Authenticate authenticates the user against local DB or AD using the given credentials
// it returns a token which carries the role, capabilities, etc.
// params:
//    username: local or AD username of the user
//    password: password of the user
// return values:
//    `Token` string on successful authentication otherwise ErrADConfigNotFound or any relevant error.
func Authenticate(username, password string) (string, error) {
	userPrincipals, err := local.Authenticate(username, password)
	if err == nil {
		return generateToken(userPrincipals, username) // local authentication succeeded!
	}

	if err == errors.ErrUserNotFound {
		userPrincipals, err = ldap.Authenticate(username, password)
		if err == nil {
			return generateToken(userPrincipals, username) // ldap authentication succeeded!
		}
	}

	return "", err // error from authentication
}

// generateToken generates JWT(JSON Web Token) with the given user principals
// params:
//  principals: user principals
//  username: local or AD username of the user
// return values:
//    `Token` string on successful creation of JWT otherwise any relevant error from the subsequent function
func generateToken(principals []*types.Principal, username string) (string, error) {
	log.Debugf("Generating token for user %q", username)

	authZ, err := NewTokenWithClaims(principals) // create a new token with default `expiry` claim
	if err != nil {
		return "", err
	}

	// finally, add username to the token
	authZ.AddClaim("username", username)

	return authZ.Stringify()
}
