package auth

import (
	"strings"

	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"

	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/auth_proxy/db"
)

// getPrincipals returns the stored principals info from the token.
//
// Return values:
//  []string: slice of strings representing principals
//  error: nil if successful, else
//    : cnnerrors.Internal if principals claim is not present in token
func (authZ *Token) getPrincipals() ([]string, error) {
	v, found := authZ.tkn.Claims.(jwt.MapClaims)[principalsClaimKey]
	if !found {
		msg := "Illegal token, no principals claim present"
		log.Warn(msg)
		return nil, auth_errors.NewError(auth_errors.Internal, msg)
	}

	principalsStr, ok := v.(string)
	if !ok {
		msg := "Illegal token, no principals present"
		log.Warn(msg)
		return nil, auth_errors.NewError(auth_errors.Internal, msg)
	}

	// Deserialize principals as a slice
	principals := strings.Split(principalsStr, ";")
	return principals, nil
}

//
// checkRolePolicy checks the authorization db for a role claim that matches
// the specified role.
//
// Parameters:
//  (Receiver): authorization token object
//  desired: desired role for which to search a claim
//
// Return values:
//  error: nil if policy check is successful, types.InternalError if token
//  is malformed, types.UnauthorizedError if unauthorized by policy.
//
func (authZ *Token) checkRolePolicy(desired types.RoleType) error {

	// Gather role authorizations for principals claim present in token and
	// look for desired role. We don't cache authorizations in token
	// itself, rather we rely on lookups in authorization database.
	//
	// NOTE: Once we move to an external authz provider model, we will
	// potentially have to modify this workflow to return tokens that
	// include exact desired claims. For an example, see docker registry
	// oauth integration.
	//
	principals, err := authZ.getPrincipals()
	if err != nil {
		return err
	}

	for _, p := range principals {

		// Get role claim for the principal
		authz, err := db.ListAuthorizationsByClaimAndPrincipal(types.RoleClaimKey, p)
		// If not found, ignore error and move on to next principal
		if err != nil || len(authz) == 0 {
			log.Debug("no role claim found for principal ", p)
			continue
		}

		granted, err := types.Role(authz[0].ClaimValue)
		if err != nil {
			log.Debug("malformed authorization, error:", err)
			continue
		}

		err = checkAccessClaim(granted, desired)
		switch err {
		case nil:
			// check succeeded, return success
			return nil
		default:
			// check failed, continue with next principal
			log.Debug("role claim check failed for principal ", p,
				", desired ", desired.String(), ", granted ", granted.String(), ", continuing ...")
			continue
		}
	}

	log.Debug("access denied for claim role:", desired.String())
	return auth_errors.ErrUnauthorized
}

//
// checkTenantPolicy checks the authorization token for an explicit claim that
// allows access to a tenant
// TODO  add wildcard access to all tenants.
//
// Parameters:
//  (Receiver): authorization token object
//  tenant: tenant object for which to check policy
//  desiredAccess: a role/capability that specifies desired level of access.
//
// Return values:
//  error: nil if policy check is successful, types.InternalError if claim
//  statements are malformed, types.UnauthorizedError if unauthorized by policy.
//
func (authZ *Token) checkTenantPolicy(tenant types.Tenant, desiredAccess interface{}) error {

	// convert the tenant object to a claim string
	claimStr, err := GenerateClaimKey(tenant)
	if err != nil {
		msg := "malformed claim statement, error:" + err.Error()
		log.Error(msg)
		return auth_errors.NewError(auth_errors.Internal, msg)
	}

	// Gather tenant authorizations for principals claim present in token
	// and look for authorizations for given tenant with desiredAccess. We
	// don't cache authorizations in token itself, rather we rely on
	// lookups in authorization database.
	//
	// NOTE: Once we move to an external authz provider model, we will
	// potentially have to modify this workflow to return tokens that
	// include exact desired claims. For an example, see docker registry
	// oauth integration.
	//
	principals, err := authZ.getPrincipals()
	if err != nil {
		return err
	}

	for _, p := range principals {
		// Get tenant claim for the principal
		authz, err := db.ListAuthorizationsByClaimAndPrincipal(claimStr, p)
		// If not found, ignore error and move on to next principal
		if err != nil || len(authz) == 0 {
			log.Debug("no tenant claim found for principal ", p)
			continue
		}

		// If this claim is present, value is the role assigned with
		// the tenant.
		role, err := types.Role(authz[0].ClaimValue)
		if err != nil {
			msg := "malformed claim statement, error:" + err.Error()
			log.Error(msg)
			// continue processing
			continue
		}

		if checkAccessClaim(role, desiredAccess) == nil {
			// Success
			return nil
		}

	}

	// @TODO: Add wildcard claims
	/*
		// If we are here, then an explicit claim check didn't succeed. Look
		// for a wildcard claim.
		claimStr, err = GenerateClaimKey(types.ALL_CLUSTERS_AUTH)
		if err != nil {
			msg := "malformed claim statement, error:" + err.Error()
			log.Error(msg)
			return types.NewError(types.Internal, msg)
		}

		if v, ok := authZ.t.Claims[claimStr]; ok && v.(bool) == true {
			return nil
		}
	*/

	// If no principal found that can satisfy the claim, return error
	log.Debug("access denied for claim:", claimStr)
	return auth_errors.ErrUnauthorized
}
