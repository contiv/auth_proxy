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

// localUserCreateRequest represents localuser create object.
type localUserCreateRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Disable  bool   `json:"disable"`
	Role     string `json:"role"`
}

//
// AddTenantAuthorizationRequest message is sent for AddTenantAuthorization
// operation.
//
// Fields:
//  PrincipalName: name of the user for whom an authorization needs to be added. This
//    can be a local user or an LDAP group
//  Local: true if the name corresponds to a local user, false if it's an LDAP
//    group.
//  Role:  Level of access to the tenant specified by TenantName
//  TenantName: Tenant name that the above user will have access to
//
type AddTenantAuthorizationRequest struct {
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

// localUser is the return type of `getLocalUsers`
type localUser struct {
	Username string `json:"username"`
	Role     string `json:"role"`
	Disable  bool   `json:"disable"`
}
