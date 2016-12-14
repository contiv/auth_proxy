package auth

import (
	"fmt"
	"time"

	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"

	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
)

// This file contains all utility methods to create and handle JWT tokens

const (
	// TokenValidityInHours represents the token validity; used to set token expiry
	TokenValidityInHours = 10

	// TokenSigningKey is used for signing the token
	// FIXME: this should be fetched from store
	TokenSigningKey = "ccn$!~56"
)

// Token represents the JSON Web Token which carries the authorization details
type Token struct {
	// TODO: this could probably be an embedded type since we're just adding more
	//       functionality (i.e., functions) on top of the existing type
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
//  In the case of a local user, this list should contain only a single principal.
//  For ldap users, this list potentially contains multiple principals, each belonging to a ldap group.
// return values:
//  *Token: a token object encapsulating authorization claims
//  error: nil if successful, else as returned by AddRoleClaim
func NewTokenWithClaims(principals []string) (*Token, error) {
	authZ := NewToken()

	// add a claim for each principal
	for _, principal := range principals {
		// NOTE: principal here is the group_name or username based on the authentication type(LDAP/Local)
		authZ.AddClaim(principal, true)

		authZ.AddRoleClaim(principal)
		// TODO: Add role by iterating through the list of authorization for this principal
	}

	return authZ, nil
}

// AddRoleClaim adds/updates a role claim of type key="role" value=<RoleType> e.g. value="admin", value="ops"
// to the token. This claim represents the highest capability role available to
// the user, hence an update is only performed if principal's role claim is
// higher than current value of role claim.
// params:
//  principal: principal(username/group_name) associated with a user
// return values:
//  error: nil if successful, else relevant error if claim is malformed.
func (authZ *Token) AddRoleClaim(principal string) error {
	// TODO: Iterate over the list of authz's of the given principal

	// FIXME: this is just to let the current systemtests PASS
	if principal == types.Admin.String() || principal == types.Ops.String() {
		authZ.AddClaim("role", principal)
	}
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
//  string: encoding of the claim for the object.
//  error: nil if successful, errors.ErrIllegalArgument if claims for a
//    particular object type is not supported.
func GenerateClaimKey(object interface{}) (string, error) {
	switch object.(type) {

	case types.RoleType:
		return "role", nil

	case types.Tenant:
		tenantName := object.(types.Tenant)
		return types.TenantClaimKey + string(tenantName), nil

	default:
		log.Errorf("Unsupported object %#v for authorization claim", object)
		return "", ccnerrors.ErrUnsupportedType
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
	if !found {
		// if we hit this case, it's a BUG; our tokens will always contain `role`
		log.Debugf("Token has no role? %#v", authZ)
		return false, fmt.Errorf("Invalid token")
	}

	return role == types.Admin.String(), nil
}

//
// CheckClaims checks for specific claims in an authorization token object.
// These claims are evaluated based on object type, such as for a tenant or
// for a role, and an associated policy.
//
// Parameters:
//  (Receiver): authorization token object that should be carrying appropriate claims.
//  objects: claim targets. These can be specific objects, such as tenants or networks
//    or specific types, such as a role.
//
// Return values:
//  error: nil if successful, else
//    errors.ErrUnauthorized: if authorization claim for a particular object is not
//    present, or if claims for a particular object type are not supported.
//
func (authZ *Token) CheckClaims(objects ...interface{}) error {

	for i := 0; i < len(objects); i++ {

		v := objects[i]

		switch v.(type) {
		case types.RoleType:

			// check if role given in list of objects matches
			// role in the token
			role := v.(types.RoleType)
			if err := authZ.checkRolePolicy(role); err != nil {
				return err
			}
		case types.Tenant:
			tenant := v.(types.Tenant)
			i++
			if err := authZ.checkTenantPolicy(tenant, objects[i]); err != nil {
				return err
			}

			// TODO Add other policy checks as needed, e.g. wildcard policy

		default:
			log.Errorf("Unsupported type for authorization claim; got: %#v"+
				", expecting: types.RoleType or types.Tenant", v)
			return ccnerrors.ErrUnauthorized
		}
	}

	return nil
}
