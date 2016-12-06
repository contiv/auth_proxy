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
