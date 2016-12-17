package auth

import (
	log "github.com/Sirupsen/logrus"
	jwt "github.com/dgrijalva/jwt-go"

	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
)

//
// checkRolePolicy checks the authorization token for a role claim that matches
// the specified role. The policy matches if role to check for is contained in
// role present in the token.
//
// Parameters:
//  (Receiver): authorization token object
//  desired: desired role for which to search a claim
//
// Return values:
//  error: nil if policy check is successful, types.InternalError if claim
//  statement is malformed, types.UnauthorizedError if unauthorized by policy.
//
func (authZ *Token) checkRolePolicy(desired types.RoleType) error {

	// convert desired role name to a claim string
	claimStr, err := GenerateClaimKey(desired)
	if err != nil {
		msg := "malformed claim statement, error:" + err.Error()
		log.Error(msg)
		return ccnerrors.NewError(ccnerrors.Internal, msg)
	}

	claims := authZ.tkn.Claims.(jwt.MapClaims)
	v, ok := claims[claimStr]
	if ok {
		granted, err := types.Role(v.(string))
		if err == nil {
			return checkAccessClaim(granted, desired)
		}
	}

	log.Debug("access denied for claim:", claimStr)
	return ccnerrors.ErrUnauthorized
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
		return ccnerrors.NewError(ccnerrors.Internal, msg)
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
	claims := authZ.tkn.Claims.(jwt.MapClaims)
	if v, ok := claims[claimStr]; ok {

		// If this claim is present, value is the role assigned with
		// the tenant.
		role, err := types.Role(v.(string))
		if err != nil {
			msg := "malformed claim statement, error:" + err.Error()
			log.Error(msg)
			return ccnerrors.NewError(ccnerrors.Internal, msg)
		}

		if checkAccessClaim(role, desiredAccess) == nil {
			// Success
			return nil
		}
		log.Debug("access denied for claim:", claimStr, " with role:", role.String())
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

	log.Debug("access denied for claim:", claimStr)
	return ccnerrors.ErrUnauthorized
}
