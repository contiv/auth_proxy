package auth

import (
	"fmt"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	jwt "github.com/dgrijalva/jwt-go"
)

// This file contains all utility methods to create and handle JWT tokens

const (
	// TokenValidityInHours represents the token validity; used to set token expiry
	TokenValidityInHours = 1

	// TokenSigningKey is used for signing the token
	// FIXME: this should be fetched from store
	TokenSigningKey = "ccn$!~56"
)

// Token represents the JSON Web Token which carries the authorization details
type Token struct {
	tkn *jwt.Token
}

// NewToken creates a new authorization token, sets expiry and returns token pointer
// return values:
//  *Token: reference to authorization token object
func NewToken() *Token {
	authZ := &Token{}

	authZ.tkn = jwt.New(jwt.SigningMethodHS256)

	// provide any reserved claims here
	authZ.AddClaim("exp", time.Now().Add(time.Hour*TokenValidityInHours).Unix()) // expiration time
	authZ.AddClaim("iss", "ccn_proxy")                                           // issuer

	return authZ
}

// NewTokenWithClaims is a utility method that creates a new token with the list of principals.
// params:
//  principals: a list of security principals for a user.
//  In case of local user, this list should contain only a single principal.
//  For ldap users, this list contains potentially multiple principals, each belonging to a ldap group.
// return values:
//  *Token: a token object encapsulating authorization claims
//  error: nil if successful, else as returned by AddRoleClaim
func NewTokenWithClaims(principals []*types.Principal) (*Token, error) {
	authZ := NewToken()

	for _, principal := range principals { // add a claim for each principal
		if err := authZ.AddRoleClaim(principal); err != nil {
			return nil, err
		}
	}

	return authZ, nil
}

// AddRoleClaim adds/updates a role claim of type key="role" value=<RoleType> e.g. value="admin", value="ops"
// to the token. This claim represents the highest capability role available to
// the user, hence an update is only performed if principal's role claim is
// higher than current value of role claim.
// params:
//  principal: security principal associated with a user
// return values:
//  error: nil if successful, else relevant error if claim is malformed.
func (authZ *Token) AddRoleClaim(principal *types.Principal) error {
	roleKey, err := GenerateClaimKey(principal.Role)
	if err != nil {
		return err
	}

	val, found := authZ.tkn.Claims.(jwt.MapClaims)[roleKey] // this type casting is required due to jwt library changes
	if found {
		role, err := types.Role(val.(string))
		if err != nil {
			return err
		}

		// principal's role is strictly more privileged than what is stored, update the token
		if principal.Role < role { // highest role - Admin(0)
			authZ.AddClaim(roleKey, principal.Role.String()) // overrides the `roleKey` with new value
			return nil
		}
	}

	// if the role is not part of claims, update the claim set with `Role`
	authZ.AddClaim(roleKey, principal.Role.String())
	return nil

}

// AddClaim adds a claim to an existing authorization token object. A claim is
// a key value pair, where key is a string which encodes the object, such as a
// role, tenant, etc. Since Add is called on a map, it also serves to update the claim.
// Value is generic which may mean different things based on different objects.
// params:
//  (Receiver): authorization token object to which more claims need to be added.
//  key: claim key string which corresponds to a claim for specific object or a predicate.
//  value: generic value associated with claim's key.
func (authZ *Token) AddClaim(key string, value interface{}) {
	authZ.tkn.Claims.(jwt.MapClaims)[key] = value
}

// Stringify returns an encoded string representation of the authorization token.
// params:
//  (Receiver): authorization token object that should be carrying appropriate claims.
// return values:
//  string: string representation of the token, if successful, "" otherwise
//  error: nil on success otherwise as returned by SignedString if underlying JWT object
//   cannot be encoded and signed appropriately.
func (authZ *Token) Stringify() (string, error) {
	// Retrieve signed string encoded representation of underlying JWT token object.
	log.Debugf("Claims %#v", authZ.tkn.Claims.(jwt.MapClaims))
	tokenString, err := authZ.tkn.SignedString([]byte(TokenSigningKey))
	if err != nil {
		log.Errorf("Failed to sign token %#v", err)
		return "", err
	}

	return tokenString, nil
}

// GenerateClaimKey is a helper method that creates a string encoding of a
// claim for an object that our policies care about, e.g role, tenant. This key is
// usually generated when an authorization is added for an object.
// The value to store with this key is based on the object type itself, and is provided to
// the AddClaim method.
// params:
//  object: a generic object for which a key needs to be encoded.
// return values:
//  string: encoding of the the claim for the object.
//  error: nil if successful, errors.ErrIllegalArgument if claims for a
//    particular object type is not supported.
func GenerateClaimKey(object interface{}) (string, error) {
	switch object.(type) {
	case types.RoleType:
		return "role", nil
	default:
		log.Errorf("Unsupported object %#v for authorization claim", object)
		return "", errors.ErrIllegalArgument
	}
}

// ParseToken parses a string representation of a token into Token object.
// params:
//  tokenStr: string encoding of a JWT object.
// return values:
//  Token: an authorization token object.
//  error: nil if successful, else relevant error if token is expired, couldn't be validated, or
//      any other error that happened during token parsing.
func ParseToken(tokenStr string) (*Token, error) {
	// parse and validate the token
	token, err := jwt.Parse(tokenStr, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}
		return []byte(TokenSigningKey), nil
	})

	switch err.(type) {
	case nil: // no error
		if !token.Valid { // expired
			log.Warn("Invalid token")
			return nil, fmt.Errorf("Invalid token: %#v", err)
		}

		return &Token{tkn: token}, nil

	case *jwt.ValidationError: // something was wrong during the validation
		log.Errorf("Error validating access token %#v", err)
		return nil, fmt.Errorf("Error validating access token %#v", err)

	default: // something else went wrong
		log.Errorf("Error parsing access token %#v", err)
		return nil, fmt.Errorf("Error parsing access token %#v", err)
	}
}

// IsSuperuser checks if the token belongs to a superuser (i.e. `admin` in our system)
// params:
//  (Receiver): authorization token object which carries all appropriate claims
// return values:
//  true if the token belongs to superuser else false
//  error: invalid token
func (authZ *Token) IsSuperuser() (bool, error) {
	role, found := authZ.tkn.Claims.(jwt.MapClaims)["role"]
	if !found { // if hit this case, its a BUG; our tokens will always contain `role`
		return false, fmt.Errorf("Invalid token")
	}

	return role == types.Admin.String(), nil
}
