package auth

import (
	"github.com/contiv/ccn_proxy/auth/ldap"
	"github.com/contiv/ccn_proxy/auth/local"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/db"
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
//  principals: user principals; []string containing LDAP groups or username based on the authentication type(LDAP/Local)
//  username: local or AD username of the user
// return values:
//    `Token` string on successful creation of JWT otherwise any relevant error from the subsequent function
func generateToken(principals []string, username string) (string, error) {
	log.Debugf("generating token for user %q", username)

	authZ, err := NewTokenWithClaims(principals) // create a new token with default `expiry` claim
	if err != nil {
		return "", err
	}

	// finally, add username to the token
	authZ.AddClaim("username", username)

	return authZ.Stringify()
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
// AddAuthorization stores authorization claim(s) for a specific named
// principal in the KV store. Success of various tenant related operations will
// depend on the named principal's capabilities, determined by the role that is
// associated with the claim.
// TODO: principal and tenant should exist
//
// Parameters:
//  tenantName: tenant name, if specified
//  role: type of role that specifies permissions associated with tenant or global permissions
//  principalName: Name of user for whom the authorization is to be added,
//            Can either be a local user or an LDAP group.
//  isLocal: true if the named principal is a local user, false if ldap group.
//
// Return values:
//  types.Authorization: new authorization that was added
//  error: nil if successful, else
//
func AddAuthorization(tenantName string, role types.RoleType, principalName string,
	isLocal bool) (types.Authorization, error) {

	defer common.Untrace(common.Trace())
	var authz types.Authorization
	var err error

	// Adding authorization is generally a two part operation
	// - Adding tenant claim
	// - Adding/updating role claim. This caches "highest" access role available for principal.

	switch role {
	// Short circuit to just adding/updating role claim since we don't care
	// about tenant specific info for admins
	case types.Admin:
		authz, err = addUpdateRoleAuthorization(role, principalName, isLocal)
	default:
		authz, err = addTenantAuthorization(tenantName, role, principalName, isLocal)
		if err == nil {
			// Ignore role authorization claim
			_, err = addUpdateRoleAuthorization(role, principalName, isLocal)
		}
	}

	// Upstream callers should ignore value of authz if err != nil
	return authz, err
}

// addTenantAuthorization stores authorization claim(s) for a
// specific named principal and a teant. Success of various tenant related
// operations will depend on the named principal's capabilities, determined by
// the role that is associated with the claim.
//
// Parameters:
//  tenantName: tenant name
//  role: type of role that specifies permissions associated with tenant
//  principalName: Name of user for whom the authorization is to be added,
//            Can either be a local user or an LDAP group.
//  isLocal: true if the named principal is a local user, false if ldap group.
//
// Return values:
//    TODO: errors.NonExistentLocalUserError: if a local user doesn't exist
//    TODO: errors.NonExistentLdapGroupError: if ldap group doesn't exist
//    : error from state.InsertAuthorization if adding a tenant authorization
//      fails.
func addTenantAuthorization(tenantName string, role types.RoleType, principalName string,
	isLocal bool) (types.Authorization, error) {

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
		UUID:          uuid.NewV4().String(),
		PrincipalName: principalName,
		Local:         isLocal,
		ClaimKey:      claimStr,
		ClaimValue:    role.String(),
	}

	// insert tenant authorization
	if err := state.InsertAuthorization(&tenantAuthz); err != nil {
		log.Error("failed in adding tenant claim:", err)
		return types.Authorization{}, err
	}

	log.Infof("successfully added tenant authorization %#v", tenantAuthz)
	return tenantAuthz, nil
}

// addUpdaterRoleAuthorization adds/updates authorization claim for a specific
// named principal's role. This claim "caches" the highest privilege role claim
// for the principal. This authorization is used by APIs that only need to
// check for role claim (e.g., admin role claim for global object).  Update is
// only perfomed if role specified is higher privilege than existing role claim
// for the principal.
//
// Parameters:
//  role: type of role that specifies permissions associated with tenant
//  principalName: Name of user for whom the authorization is to be added,
//            Can either be a local user or an LDAP group.
//  isLocal: true if the named principal is a local user, false if ldap group.
//
// Return values:
//    TODO: errors.NonExistentLocalUserError: if a local user doesn't exist
//    TODO: errors.NonExistentLdapGroupError: if ldap group doesn't exist
//    : error from state.InsertAuthorization if adding/updating a role authorization
//      fails.
//    : error from state.ListAuthorizationsByClaimAndPrincipal if listing authorizations
//      fails.
func addUpdateRoleAuthorization(role types.RoleType, principalName string,
	isLocal bool) (types.Authorization, error) {

	authz, err := state.ListAuthorizationsByClaimAndPrincipal(types.RoleClaimKey, principalName)
	if err != nil {
		log.Error("failed in listing role claim for principal ",
			principalName, ", error:", err)
		return types.Authorization{}, err
	}

	l := len(authz)
	switch {
	case l == 0:
		// A role authz doesn't exist, add one
		return addRoleAuthorization(principalName, isLocal, role)

	case l == 1:
		roleAuthz := authz[0]
		grantedRole, err := types.Role(roleAuthz.ClaimValue)
		// Invalid claim in authorizations db
		if err != nil {
			log.Errorf("illegal role in authorization %#v", roleAuthz)
			return types.Authorization{}, err
		}

		// Need to update iff role < grantedRole
		if role < grantedRole {
			roleAuthz.ClaimValue = role.String()
			// Inserting an existing authz updates it
			if err := state.InsertAuthorization(&roleAuthz); err != nil {
				log.Error("failed in updating role claim:", err)
				return types.Authorization{}, err
			}

			log.Info("updated role claim for principal ", principalName,
				", previous:", grantedRole.String(), ", updated:", role.String())
			return roleAuthz, nil
		}

		log.Info("not updating role claim for principal ", principalName,
			", previous:", grantedRole.String(), ", requested:", role.String())
		return roleAuthz, nil

	default:
		// There should only be one role authz claim, so return error
		log.Error("multiple role authorizations found, expected 1, found ", l)
		return types.Authorization{}, ccnerrors.ErrInternal

	}
}

//
// DeleteAuthorization deletes an authorization for a tenant.
// TODO: Also update role claim for principal if needed
//
// Parameters:
//  authUUID: UUID of the tenant authorization object
//
// Return values:
//  error: nil if successful, else
//    types.UnauthorizedError: if caller isn't authorized to make this API
//    call.
//    : error from state.DeleteAuthorization if deleting a authorization
//      fails
//
func DeleteAuthorization(authUUID string) error {

	defer common.Untrace(common.Trace())

	// Return error if authorization doesn't exist
	if _, err := state.GetAuthorization(authUUID); err != nil {
		log.Warn("failed to get authorization, err: ", err)
		return err
	}

	// delete authz from the KV store
	if err := state.DeleteAuthorization(authUUID); err != nil {
		log.Warn("failed to delete tenant authZ")
		return err
	}

	log.Info("successfully deleted authorization ", authUUID)
	return nil
}

//
// GetAuthorization returns a specific authorization
// identified by the authzUUID
//
// Parameters:
//  authzUUID : UUID of the authorization that needs to be returned
//
// Return values:
//  error: nil if successful, else
//    : error from state.GetAuthorization if auth lookup fails
func GetAuthorization(authzUUID string) (
	types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// Return error if authorization doesn't exist
	authz, err := state.GetAuthorization(authzUUID)
	if err != nil {
		log.Warn("failed to get authorization; err:", err)
		return types.Authorization{}, err
	}

	log.Debugf("Get authorization successful: %#v", authz)
	return authz, nil

}

//
// ListAuthorizations returns all authorizations.
//
// Return values:
//  error: nil if successful, else
//    errors.ErrUnauthorized: if caller isn't authorized to make this API
//    call.
//    : error from state.ListAuthorizations if auth lookup fails
//
func ListAuthorizations() ([]types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// read all authorizations
	auths, err := state.ListAuthorizations()
	if err != nil {
		log.Error("failed to list all authorizations, err:", err)
		return nil, err
	}

	return auths, nil
}

//
// addRoleAuthorization stores a role claim for a specific named principal in
// the KV store. This claim represents the highest privilege role available to
// a principal.
//
// Parameters:
//  principalName: Name of user for whom the authorization is to be added,
//            Can either be a local user or an LDAP group.
//  isLocal: true if the named principal is a local user, false if ldap group.
//  role: role that needs to be added as claim value
//
// Return values:
//  types.Authorization: new authorization that was added
//  error: nil if successful, else
//    errors.NonExistentLocalUserError: if a local user doesn't exist
//    errors.NonExistentLdapGroupError: if ldap group doesn't exist
//    : error from db.InsertAuthorization if adding authorization
//      fails.
//
func addRoleAuthorization(principalName string,
	isLocal bool, role types.RoleType) (types.Authorization, error) {

	defer common.Untrace(common.Trace())

	// create an authorization
	sd, err := state.GetStateDriver()
	if err != nil {
		return types.Authorization{}, err
	}
	roleAuthz := types.Authorization{
		CommonState: types.CommonState{
			StateDriver: sd,
			ID:          uuid.NewV4().String(),
		},
		UUID:          uuid.NewV4().String(),
		PrincipalName: principalName,
		Local:         isLocal,
		ClaimKey:      types.RoleClaimKey,
		ClaimValue:    role.String(),
	}

	// insert authorization
	if err := state.InsertAuthorization(&roleAuthz); err != nil {
		log.Errorf("failed in adding role authorization %#v, error:%#v", roleAuthz, err)
		return types.Authorization{}, err
	}

	log.Infof("successfully added role authorization %#v", roleAuthz)
	return roleAuthz, nil
}

// AddDefaultUsers adds pre-defined  users(admin,ops) to the system. Names of
// these users is same as that of role type (admin or ops). Also adds admin role
// authorization for admin user.
func AddDefaultUsers() error {
	for _, userR := range []types.RoleType{types.Admin, types.Ops} {
		log.Infof("Adding local user %q to the system", userR.String())

		localUser := types.LocalUser{
			Username: userR.String(),
			Disable:  false,
			Password: userR.String(),
			// FirstName, LastName = "" for built-in users
		}

		err := db.AddLocalUser(&localUser)
		if err == nil || err == ccnerrors.ErrKeyExists {
			continue
		}

		return err
	}

	// Add admin role claim for admin user.
	addRoleAuthorization(types.Admin.String(), true, types.Admin)

	return nil
}
