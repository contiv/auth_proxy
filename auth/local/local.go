package local

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	uuid "github.com/satori/go.uuid"
)

// Authenticate authenticates the user against local DB with the given username and password
// params:
//  username: username to authenticate
//  password: password of the user
// return values:
//  []*types.Principal on successful authentication else nil
//  error: nil on successful authentication otherwise ErrLocalAuthenticationFailed
func Authenticate(username, password string) ([]*types.Principal, error) {
	//TODO: this will be enhanced once we have the backend ready. this is mocked now to help UI team
	if "admin" == username || "ops" == username { // currently supports only `admin` and `ops` users
		userPrincipals := []*types.Principal{}
		role, err := types.Role(username)
		if err != nil {
			return nil, err
		}

		userPrincipals = append(userPrincipals, &types.Principal{UUID: uuid.NewV4().String(), Role: role})
		log.Info("Local authentication successful")
		return userPrincipals, nil
	}

	//FIXME: to return appropriate error messages.e.g. ErrUserDoesnotExists
	return nil, errors.ErrLocalAuthenticationFailed
}
