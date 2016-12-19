package proxy

// This file contains the list of structs used in the HTTP handlers.

// this is to maintain uniformity in UI. Right now, all the requests are sent as JSON
type loginReq struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// LoginResponse holds the token returned upon successful login.
type LoginResponse struct {
	Token string `json:"token"`
}

//
// AddAuthorizationRequest message is sent for AddAuthorization
// operation.
//
// Fields:
//  PrincipalName: name of a security principal for whom an authorization needs to be added. This
//    can be a local user or an LDAP group
//  Local: true if the name corresponds to a local user, false if it's an LDAP
//    group.
//  Role:  Level of access granted to principal
//  TenantName: Tenant name that the above principal will have access to. Based on role type, this may not be set. For example, a tenant name is ignored if role is admin.
//
type AddAuthorizationRequest struct {
	PrincipalName string `json:"principalName"`
	Local         bool   `json:"local"`
	Role          string `json:"role"`
	TenantName    string `json:"tenantName"`
}

//
// GetAuthorizationReply structure is used for Get*Authorization
// operation.
//
// Fields:
//  AuthzUUID: An unique identifier for each authorization
//  PrincipalName: name of the user for whom an authorization needs to be added. This
//    can be a local user or an LDAP group
//  Local: true if the name corresponds to a local user, false if it's an LDAP
//    group.
//  Role:  Level of access to the tenant specified by TenantName
//  TenantName: Tenant name that the above user will have access to
//
type GetAuthorizationReply struct {
	AuthzUUID     string
	PrincipalName string
	Local         bool
	Role          string
	TenantName    string
}

//
// ListAuthorizationsReply message is received from List*Authorizations
// operation.
//
// Fields:
//  AuthList: slice of GetAuthorizationReply structures
//  Error: error encountered during operation, if any
//
type ListAuthorizationsReply struct {
	AuthList []GetAuthorizationReply
}

// errorResponse represent error response; used to write error messages to http response.
type errorResponse struct {
	Error string `json:"error"`
}
