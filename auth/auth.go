package auth

import (
	"github.com/contiv/ccn_proxy/auth/ldap"
	"github.com/contiv/ccn_proxy/auth/local"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/state"

	log "github.com/Sirupsen/logrus"
	uuid "github.com/satori/go.uuid"
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

	if err == ccnerrors.ErrUserNotFound {
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

//
// getPrincipal determines the principal ID and role for the given
// user identified by their user name (for local users) or their
// LDAP group name (for LDAP users)
//
// Parameters:
//   principalName: name of the user whose principal ID and role is needed
//   isLocal:  true indicates the user is local, false indicates user
//             belongs to an LDAP group
//
// Return values:
//   string: principal UUID
//   string: primary role of the user
//   error:  nil if successful
//
func getPrincipal(principalName string, isLocal bool) (string, string, error) {

	// check local users and LDAP

	// TODO: hardcoding dummy values till this becomes
	// available
	return "2222", "devops", nil
}

//
// checkAccessClaim checks whether the granted role has desired level of access
// which is specified as a role itself.
//
// Parameters:
//  granted: role that is present in claim
//  desired: access that is required, specified as a role
//
// Return values:
//  error: nil if 'granted' role has 'desired' access, otherwise:
//   ccnerrors.ErrUnauthorized: if 'granted' role doesn't have the 'desired' level of access
//   ccnerrors.ErrUnsupportedType: if 'desired' is not a role type
//
func checkAccessClaim(granted types.RoleType, desired interface{}) error {

	switch desired.(type) {
	// A role check
	case types.RoleType:
		desiredRole := desired.(types.RoleType)
		// Role hierarchy implicies that any role that is less or equal
		// in value has the desired level of access.
		if granted <= desiredRole {
			return nil
		}
		log.Error("access denied for granted role:", granted.String(),
			" desired role:", desiredRole.String())
	// TODO: Add a case to explicitly check capability
	default:
		log.Errorf("unsupported type for authorization check, got: %#v, expecting: types.RoleType", desired)
		return ccnerrors.ErrUnsupportedType
	}

	return ccnerrors.ErrUnauthorized
}

//
// AddTenantAuthorization stores authorization claim(s) for a tenant for a
// specific named principal in the KV store. Success of various tenant related
// operations will depend on the named principal's capabilities, determined by
// the role that is associated with the claim.
//
// This API must be called with role=admin authorization claim.
//
// Parameters:
//  tenantName: tenant name
//  principalName: Name of user for whom the authorization is to be added,
//            Can either be a local user or an LDAP group.
//  isLocal: true if the named principal is a local user, false if ldap group.
//
// Return values:
//  types.Authorization: new authorization that was added
//  error: nil if successful, else
//    errors.NonExistentLocalUserError: if a local user doesn't exist
//    errors.NonExistentLdapGroupError: if ldap group doesn't exist
//    : error from state.InsertTenantAuthorization if adding a tenant authorization
//      fails.
//
func AddTenantAuthorization(tokenStr, tenantName, principalName string,
	isLocal bool) (types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// convert token from string to Token type
	token, err := ParseToken(tokenStr)
	if err != nil {
		return types.Authorization{}, ccnerrors.ErrParsingToken
	}

	// Check that caller has role=admin claim.
	if err := token.CheckClaims(types.Admin); err != nil {
		log.Error("unauthorized:unable to find role=admin claim:", err)
		return types.Authorization{}, err
	}

	// use principal name to get principal UUID
	principalID, _, err := getPrincipal(principalName, isLocal)
	if err != nil {
		return types.Authorization{}, err
	}

	// generate claim key
	claimStr, err := GenerateClaimKey(types.Tenant(tenantName))
	if err != nil {
		log.Error("failed in generating claim:", err)
		return types.Authorization{}, err
	}

	// create an authorization
	sd, err := state.GetStateDriver()
	if err != nil {
		return types.Authorization{}, err
	}
	tenantAuthz := types.Authorization{
		CommonState: types.CommonState{
			StateDriver: sd,
			ID:          uuid.NewV4().String(),
		},
		UUID:        uuid.NewV4().String(),
		PrincipalID: principalID,
		ClaimKey:    claimStr,
		ClaimValue:  types.DerivedFromPrincipalRole,
	}

	// insert authorization
	if err := state.InsertAuthorization(&tenantAuthz); err != nil {
		log.Error("failed in adding tenant claim:", err)
		return types.Authorization{}, err
	}

	log.Info("Adding tenant authorization successful")
	return tenantAuthz, nil
}

//
// DeleteTenantAuthorization deletes an authorization for a tenant.
// This API must be called with role=Admin authorization claim.
//
// Parameters:
//  tokenStr: authorization token
//  authUUID: UUID of the tenant authorization object
//
// Return values:
//  error: nil if successful, else
//    types.UnauthorizedError: if caller isn't authorized to make this API
//    call.
//    : error from state.DeleteTenantAuthorization if deleting a tenant authorization
//      fails
//
func DeleteTenantAuthorization(tokenStr, authUUID string) error {

	defer common.Untrace(common.Trace())

	// convert token from string to Token type
	token, err := ParseToken(tokenStr)
	if err != nil {
		return ccnerrors.ErrParsingToken
	}

	// Return error if an authZ token isn't found or if it doesn't contain
	// appropriate claim.
	if err := token.CheckClaims(types.Admin); err != nil {
		log.Error("unauthorized:unable to find role=admin claim:", err)
		return err
	}

	// Return error if authorization doesn't exist
	_, err = state.GetAuthorization(authUUID)
	if err != nil {
		log.Warn("failed to get authorization, err: ", err)
		return err
	}

	// delete authz from the KV store
	if err := state.DeleteAuthorization(authUUID); err != nil {
		log.Warn("failed to delete tenant authZ")
		return err
	}

	log.Info("Deleting tenant authorization successful")
	return nil
}

//
// GetTenantAuthorization returns a specific tenant authorization
// identified by the authzUUID
//
// This API must be called with role=Admin authorization claim.
//
// Parameters:
//  tokenStr: token string
//  authzUUID : UUID of the authorization that needs to be returned
//
// Return values:
//  error: nil if successful, else
//    errors.ErrUnauthorized: if caller isn't authorized to make this API
//    call.
//    errors.ErrIllegalArguments: if auth doesn't match poolID
//    : error from state.GetTenantAuthorization if auth lookup fails
func GetTenantAuthorization(tokenStr, authzUUID string) (
	types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// convert token from string to Token type
	token, err := ParseToken(tokenStr)
	if err != nil {
		return types.Authorization{}, ccnerrors.ErrParsingToken
	}

	// Return error if an authZ token isn't found or if it doesn't contain
	// appropriate claim.
	if err := token.CheckClaims(types.Admin); err != nil {
		log.Error("unauthorized:unable to find role=admin claim:", err)
		return types.Authorization{}, err
	}

	// Return error if authorization doesn't exist
	authz, err := state.GetAuthorization(authzUUID)
	if err != nil {
		log.Warn("failed to get authorization; err:", err)
		return types.Authorization{}, err
	}

	log.Info("Getting tenant authorization successful")
	return authz, nil

}

//
// UpdateTenantAuthorization updates an authorization in the KV store
//
// This API must be called with role=admin authorization claim.
//
// Parameters:
//  tenantName: tenant name
//  principalName: User for whom the authorization is to be updated,
//            Can either be a local user or an LDAP group.
//  isLocal: true if the user is a local user, false if ldap group.
//
// Return values:
//  types.Authorization: updated authorization instance
//  error: nil if successful, else
//    : error from state.DeleteTenantAuthorization if deleting a tenant authorization
//      fails.
//    : error from state.InsertTenantAuthorization if adding a tenant authorization
//      fails.
//
func UpdateTenantAuthorization(tokenStr, authzUUID, tenantName,
	principalName string, isLocal bool) (types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// convert token from string to Token type
	token, err := ParseToken(tokenStr)
	if err != nil {
		return types.Authorization{}, ccnerrors.ErrParsingToken
	}

	// Check that caller has role=admin claim.
	if err := token.CheckClaims(types.Admin); err != nil {
		log.Error("unauthorized:unable to find role=admin claim:", err)
		return types.Authorization{}, err
	}

	// use principal name to get principal UUID
	principalID, _, err := getPrincipal(principalName, isLocal)
	if err != nil {
		return types.Authorization{}, err
	}

	// generate claim key
	claimStr, err := GenerateClaimKey(types.Tenant(tenantName))
	if err != nil {
		log.Error("failed in generating claim:", err)
		return types.Authorization{}, err
	}

	// create an authorization
	sd, err := state.GetStateDriver()
	if err != nil {
		return types.Authorization{}, err
	}
	tenantAuthz := types.Authorization{
		CommonState: types.CommonState{
			StateDriver: sd,
			ID:          uuid.NewV4().String(),
		},
		UUID:        authzUUID,
		PrincipalID: principalID,
		ClaimKey:    claimStr,
		ClaimValue:  types.DerivedFromPrincipalRole,
	}

	// delete authz from the KV store
	if err := state.DeleteAuthorization(authzUUID); err != nil {
		log.Warn("failed to delete tenant authz, err:", err)
		return types.Authorization{}, ccnerrors.ErrUpdateAuthorization
	}

	// insert updated authorization
	if err := state.InsertAuthorization(&tenantAuthz); err != nil {
		log.Error("failed in adding tenant authz, err:", err)
		return types.Authorization{}, ccnerrors.ErrUpdateAuthorization
	}

	log.Info("Updating tenant authorization successful")
	return tenantAuthz, nil
}

//
// ListTenantAuthorizations returns all tenant authorizations.
//
// This API must be called with role=Admin authorization claim.
//
// Parameters:
//  tokenStr: token string
//
// Return values:
//  error: nil if successful, else
//    errors.ErrUnauthorized: if caller isn't authorized to make this API
//    call.
//    : error from state.ListTenantAuthorizations if auth lookup fails
//
func ListTenantAuthorizations(tokenStr string) ([]types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// convert token from string to Token type
	token, err := ParseToken(tokenStr)
	if err != nil {
		return nil, ccnerrors.ErrParsingToken
	}

	// Check that caller has role=admin claim.
	if err := token.CheckClaims(types.Admin); err != nil {
		log.Error("unauthorized:unable to find role=admin claim:", err)
		return nil, err
	}

	// read all authorizations
	tenantAuths, err := state.ListAuthorizations()
	if err != nil {
		log.Error("failed to list all authorizations, err:", err)
		return nil, err
	}

	log.Info("Listing all tenant authorizations successful")
	return tenantAuths, nil
}
