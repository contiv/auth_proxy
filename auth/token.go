package auth

import (
	"fmt"
	"strings"
	"time"

	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"

	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/auth_proxy/db"
)

// This file contains all utility methods to create and handle JWT tokens

const (
	// TokenValidityInHours represents the token validity; used to set token expiry
	TokenValidityInHours = 10

	// TokenSigningKey is used for signing the token
	// FIXME: this should be fetched from store
	TokenSigningKey = "ccn$!~56"

	// This claim is only added to the token, and is not part of authorization db
	principalsClaimKey = "principals"
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
	authZ.AddClaim("iss", "auth_proxy")                                          // issuer

	return authZ
}

// NewTokenWithClaims is a utility method that creates a new token with the list of principals.
// params:
//  principals: a list of security principals for a user.
//  In the case of a local user, this list should contain only a single principal.
//  For ldap users, this list potentially contains multiple principals, each belonging to a ldap group.
// return values:
//  *Token: a token object encapsulating authorization claims
//  error: nil if successful, else as returned by sub-routines.
func NewTokenWithClaims(principals []string) (*Token, error) {
	authZ := NewToken()

	// Add principals to token as a claim. Also update the highest role
	// claim based on prinipals' authorizations.

	if err := authZ.AddPrincipalsClaim(principals); err != nil {
		return nil, err
	}

	for _, principal := range principals {
		authZ.AddRoleClaim(principal)
	}

	return authZ, nil
}

// AddPrincipalsClaim adds a role claim of type
// key="principals" to the token.
//
// Value of this claim is used to find authorization claims of associated principals at runtime.
// If this list changes (e.g., if user's ldap group membership changes), user needs to re-authenticate
// to get updated access.
//
// params:
//  principals: security principals associated with a user
// return values:
//  error: nil if successful, else relevant error if claim is malformed.
func (authZ *Token) AddPrincipalsClaim(principals []string) error {
	// Serialize principals slice as a single string
	authZ.AddClaim(principalsClaimKey, strings.Join(principals, ","))
	return nil
}

// AddRoleClaim adds/updates a role claim of type key="role" value=<RoleType>
// e.g. value="admin", value="ops" to the token. This claim represents the
// highest capability role available to the user, hence an update is only
// performed if principal's role claim is higher than current value of role
// claim.
//
// This claim is currently only useful for UI to offer differentiation in terms
// of look and feel based on the type of operations a user can perform. RBAC
// implementation at API level doesn't look at the role claim in Token - rather
// it pulls the current state from state store based on principals. This makes
// authorization changes almost instantaneous, at an increased cost of round
// trip communication with state store.
//
// params:
//  principal: a security principal associated with a user
// return values:
//  error: nil if successful, else relevant error if claim is malformed.
func (authZ *Token) AddRoleClaim(principal string) error {

	authz, err := db.ListAuthorizationsByClaimAndPrincipal(types.RoleClaimKey, principal)
	if err != nil {
		return err
	}

	l := len(authz)
	switch {
	// If no authorizations are found, this user has not been authorized to
	// access any resources yet. Return success without adding the claim.
	case l == 0:
		return nil

	default:
		grantedRole, err := types.Role(authz[0].ClaimValue)
		// Invalid claim in authorizations db, skip over
		if err != nil {
			return nil
		}

		// Check if token already has a role claim.
		v, ok := authZ.tkn.Claims.(jwt.MapClaims)[types.RoleClaimKey]
		// Role claim available, update only if grantedRole has more
		// privileges than role already available
		if ok {
			availableRole, err := types.Role(v.(string))
			if err == nil {
				// Higher privilege role available, update
				if availableRole > grantedRole {
					authZ.AddClaim(types.RoleClaimKey, grantedRole.String())
				}
			} else {
				msg := "malformed token, error:" + err.Error()
				log.Error(msg)
				return auth_errors.NewError(auth_errors.Internal, msg)
			}
		} else {
			// No role claim available, add
			// Add key="role" value=<string representation of role
			// as obtained from stored authorization>
			authZ.AddClaim(types.RoleClaimKey, grantedRole.String())
		}
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
//  error: nil if successful, errors.ErrUnsupportedType if claims for a
//    particular object type is not supported.
func GenerateClaimKey(object interface{}) (string, error) {
	switch object.(type) {

	case types.RoleType:
		return types.RoleClaimKey, nil

	case types.Tenant:
		tenantName := object.(types.Tenant)
		return types.TenantClaimKey + string(tenantName), nil

	default:
		log.Errorf("Unsupported object %#v for authorization claim", object)
		return "", auth_errors.ErrUnsupportedType
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

// IsSuperuser checks if the token belongs to a superuser (i.e. `admin` in our
// system). It queries the authorization database to obtain this information.
// params:
// (Receiver): authorization token object which carries all principals
//  associated with the user.
// return values:
//  true if the token belongs to superuser else false
func (authZ *Token) IsSuperuser() bool {
	v, found := authZ.tkn.Claims.(jwt.MapClaims)[principalsClaimKey]
	if !found {
		log.Warn("Illegal token, no principals claim present")
		return false
	}

	principalsStr, ok := v.(string)
	if !ok {
		log.Error("Illegal token, no principals present")
		return false
	}

	// Deserialize principals as a slice
	principals := strings.Split(principalsStr, ",")

	for _, p := range principals {
		// Get role claim for the principal
		authz, err := db.ListAuthorizationsByClaimAndPrincipal(types.RoleClaimKey, p)
		// If not found, ignore error and move on to next principal
		if err != nil || len(authz) == 0 {
			log.Debug("no admin claim found for principal ", p)
			continue
		}

		// If not a valid role, ignore error and move on to next principal
		r, err := types.Role(authz[0].ClaimValue)
		if err != nil {
			log.Error("invalid role claim found for principal ", p)
			continue
		}

		// If any principal has admin role, user overall has admin privileges.
		if r == types.Admin {
			log.Debug("admin role claim found for principal ", p)
			return true
		}
	}

	// No principal has admin role claim
	log.Debug("no principals with admin claim present")
	return false
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
			return auth_errors.ErrUnauthorized
		}
	}

	return nil
}
