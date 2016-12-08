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
//  TenantName: Tenant name that the above user will have access to
//  Local: true if the name corresponds to a local user, false if it's an LDAP
//    group.
//
type AddTenantAuthorizationRequest struct {
	PrincipalName string
	TenantName    string
	Local         bool
}

//
// GetAuthorizationReply structure is used for Get*Authorization
// operation.
//
// Fields:
//  PrincipalID: UUID of the subject.
//  ClaimKey: string encoding of the claim's key associated with the authorization
//  ClaimValue: string encoding of the claim's value associated with the
//    authorization
//
type GetAuthorizationReply struct {
	AuthzUUID   string
	PrincipalID string
	ClaimKey    string
	ClaimValue  string
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
