package proxy

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"

	"github.com/contiv/auth_proxy/auth"
	"github.com/contiv/auth_proxy/common"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/gorilla/mux"

	log "github.com/Sirupsen/logrus"
)

// authError logs a message and changes the HTTP status code as requested.
func authError(w http.ResponseWriter, statusCode int, msg string) {
	log.Println(msg)
	w.WriteHeader(statusCode)
	writeJSONResponse(w, errorResponse{Error: msg})
}

// serverError logs a message + error and changes the HTTP status code to 500.
func serverError(w http.ResponseWriter, err error) {
	log.Errorln(err.Error())
	w.WriteHeader(http.StatusInternalServerError)
	writeJSONResponse(w, errorResponse{Error: err.Error()})
}

// loginHandler handles the login request and returns auth token with user capabilities
// it can return various HTTP status codes:
//     200 (authorization succeeded)
//     400 (username and/or password were not provided)
//     401 (authorization failed)
//     500 (something broke)
func loginHandler(w http.ResponseWriter, req *http.Request) {
	common.SetDefaultResponseHeaders(w)

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	lReq := &loginReq{}
	if err := json.Unmarshal(body, lReq); err != nil {
		serverError(w, errors.New("Failed to unmarshal credentials from request body: "+err.Error()))
		return
	}

	if common.IsEmpty(lReq.Username) || common.IsEmpty(lReq.Password) {
		authError(w, http.StatusBadRequest, "Username and password must be provided")
		return
	}

	// authenticate the user using `username` and `password`
	tokenStr, err := auth.Authenticate(lReq.Username, lReq.Password)
	if err != nil {
		log.Error("failed to authenticate user, err:", err)
		authError(w, http.StatusUnauthorized, "Invalid username/password")
		return
	}

	log.Debugf("Token String %q", tokenStr)

	w.WriteHeader(http.StatusOK)
	writeJSONResponse(w, LoginResponse{Token: tokenStr})
}

const (
	// StatusHealthy is used to indicate a healthy response
	StatusHealthy = "healthy"

	// StatusUnhealthy is used to indicate an unhealthy response
	StatusUnhealthy = "unhealthy"
)

// NetmasterHealthCheckResponse represents our netmaster's health and version info.
type NetmasterHealthCheckResponse struct {
	Status string `json:"status"`

	// if netmaster is up and working, there's no "reason" for it to be unhealthy
	Reason string `json:"reason,omitempty"`

	// if we can't reach netmaster, we won't have a version
	Version string `json:"version,omitempty"`
}

// MarkHealthy marks netmaster as being healthy and running the specified version
func (nhcr *NetmasterHealthCheckResponse) MarkHealthy(version string) {
	nhcr.Status = StatusHealthy
	nhcr.Version = version
}

// MarkUnhealthy marks netmaster as being unhealthy
func (nhcr *NetmasterHealthCheckResponse) MarkUnhealthy(reason string) {
	nhcr.Status = StatusUnhealthy
	nhcr.Reason = reason
}

// HealthCheckResponse represents a response from the /health endpoint.
// It contains our health status + the health status of our netmaster
type HealthCheckResponse struct {
	NetmasterHealth *NetmasterHealthCheckResponse `json:"netmaster"`
	Status          string                        `json:"status"`
	Version         string                        `json:"version"`
}

// MarkUnhealthy marks the proxy as being unhealthy
func (hcr *HealthCheckResponse) MarkUnhealthy() {
	hcr.Status = StatusUnhealthy
}

// healthCheckHandler handles /health requests
func healthCheckHandler(config *Config) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		common.SetDefaultResponseHeaders(w)

		hcr := &HealthCheckResponse{
			Status:  StatusHealthy, // default to being healthy
			Version: config.Version,
		}

		nhcr := &NetmasterHealthCheckResponse{}

		//
		// check our netmaster's /version endpoint
		//
		if version, err := common.GetNetmasterVersion(config.NetmasterAddress); err != nil {
			nhcr.MarkUnhealthy(err.Error())

			// if netmaster is unhealthy, so are we
			hcr.MarkUnhealthy()
		} else {
			nhcr.MarkHealthy(version)
		}

		hcr.NetmasterHealth = nhcr

		//
		// prepare the response
		//
		data, err := json.Marshal(hcr)
		if err != nil {
			serverError(w, errors.New("failed to marshal health check response: "+err.Error()))
			return
		}

		w.Write(data)
	}
}

// VersionResponse represents a response from the /version endpoint
type VersionResponse struct {
	Version string `json:"version"`
}

// versionHandler handles /version requests and returns the proxy version
func versionHandler(version string) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		common.SetDefaultResponseHeaders(w)

		vr := &VersionResponse{Version: version}

		data, err := json.Marshal(vr)
		if err != nil {
			serverError(w, errors.New("failed to marshal version response: "+err.Error()))
			return
		}

		w.Write(data)
	}
}

// authorizedUserOnly takes a HTTP handler and ensures that the client's token has
// enough privileges before handling the request.
// if the client is not an admin or the user himself, the request attempt is logged and a 403 is returned.
func authorizedUserOnly(handler func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {

		if token, valid := validateToken(w, req); valid {
			vars := mux.Vars(req)
			// Check that caller has admin privileges or the caller is user himself

			// NOTE: We only support updates to local user. Updates to LDAP user can be done through AD.
			// There is a possibility that the same username can exists in both local and LDAP systems.
			// In such case, it's possible that one user(LDAP) can update/attempt to update the details of the other(local).
			// To avoid such scenarios, LDAP users are represented by AD domain name (as username), this distinguishes local users from LDAP users.
			if token.IsSuperuser() || vars["username"] == token.GetClaim(auth.UsernameClaimKey) {
				handler(w, req)
				return
			}

			log.Error("unauthorized: caller doesn't have enough privileges")

			httpStatus := http.StatusForbidden
			httpResponse := []byte("access denied")
			processStatusCodes(httpStatus, httpResponse, w)
		}
	}
}

// adminOnly takes a HTTP handler and ensures that the client's token has admin
// privileges before allowing the handler to run its code.
// if the client is not an admin, the request attempt is logged and a 403 is returned.
// handlers that are called can assume superuser privileges.
func adminOnly(handler func(http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {

		if token, valid := validateToken(w, req); valid {
			// Check that caller has admin privileges
			if !token.IsSuperuser() {
				// TODO: log the violator's details here
				// TODO: consider having a separate security logger which
				//       goes to a separate file for auditing purposes
				log.Error("unauthorized: caller doesn't have admin privileges")

				httpStatus := http.StatusForbidden
				httpResponse := []byte("access denied")
				processStatusCodes(httpStatus, httpResponse, w)
				return
			}

			// if there were no errors, call the handler we wrapped
			handler(w, req)
		}
	}
}

// User management handler functions
// These actions can only be performed by administrators.
// They are protected at the router by the adminOnly() function above.

// addLocalUser adds a new local user to the system.
// it can return various HTTP status codes:
//    201 (Created; user added to the system)
//    400 (BadRequest; user exists in the system already/invalid role)
//    500 (internal server error)
func addLocalUser(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	userCreateReq := &types.LocalUser{}
	if err := json.Unmarshal(body, userCreateReq); err != nil {
		serverError(w, errors.New("Failed to unmarshal user info. from request body: "+err.Error()))
		return
	}

	statusCode, resp := addLocalUserHelper(userCreateReq)
	processStatusCodes(statusCode, resp, w)
}

// deleteLocalUser deletes the given user from the system.
// it can return various HTTP status codes:
//    200 (OK; user deleted from the system)
//    404 (NotFound; username not found)
//    400 (BadRequest; cannot delete  built-in users)
//    500 (internal server error)
func deleteLocalUser(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	statusCode, resp := deleteLocalUserHelper(vars["username"])
	processStatusCodes(statusCode, resp, w)
}

// updateLocalUser updates the existing user with the given details.
// it can return various HTTP status codes:
//    204 (NoContent; update was successful)
//    404 (NotFound; user not found)
//    500 (internal server error)
func updateLocalUser(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	userUpdateReq := &types.LocalUser{}
	if err := json.Unmarshal(body, userUpdateReq); err != nil {
		serverError(w, errors.New("Failed to unmarshal user info. from request body: "+err.Error()))
		return
	}

	statusCode, resp := updateLocalUserHelper(vars["username"], userUpdateReq)
	processStatusCodes(statusCode, resp, w)
}

// getLocalUsers returns all the local users available in the system
// it can return various HTTP status codes:
//    200 (OK; fetch was successful)
//    500 (internal server error)
func getLocalUsers(w http.ResponseWriter, req *http.Request) {
	statusCode, resp := getLocalUsersHelper()
	processStatusCodes(statusCode, resp, w)
}

// getLocalUser returns the details for the given username
// it can return various HTTP status codes:
//  200 (OK; fetch was successful)
//  404 (NotFound; bad request; user not found)
//  500 (internal server error)
func getLocalUser(w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	statusCode, resp := getLocalUserHelper(vars["username"])
	processStatusCodes(statusCode, resp, w)
}

// Authorization handler functions
// These actions can only be performed by administrators.
// They are protected at the router by the adminOnly() function above.

//
// addAuthorization adds an authorization
// Returns these HTTP status codes:
//    201 (authz added)
//    400 (attempted to add authorization to built-in local admin user)
//    500 (internal server error)
//
func addAuthorization(w http.ResponseWriter, req *http.Request) {
	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// parse request body
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Warn("failed to parse request body for adding authorization, err:", err)
		serverError(w, auth_errors.ErrParsingRequest)
		return
	}

	// unmarshal request body
	addAuthzReq := &AddAuthorizationRequest{}
	if err := json.Unmarshal(body, addAuthzReq); err != nil {
		log.Warn("failed to unmarshal authorization, err:", err)
		serverError(w, auth_errors.ErrUnmarshalingBody)
		return
	}

	// input validation
	if common.IsEmpty(addAuthzReq.PrincipalName) {
		log.Warnf("principal name missing from authorization: %#v", addAuthzReq)

		httpStatus = http.StatusBadRequest
		httpResponse = []byte("principal name is missing")

		processStatusCodes(httpStatus, httpResponse, w)
		return
	}

	role, err := types.Role(addAuthzReq.Role)
	if err != nil {
		log.Warnf("illegal role specified in authorization: %#v", addAuthzReq)

		httpStatus = http.StatusBadRequest
		httpResponse = []byte("illegal role specified")

		processStatusCodes(httpStatus, httpResponse, w)
		return
	}

	// If role specific is ops, a tenant name must be specified
	if role == types.Ops && common.IsEmpty(addAuthzReq.TenantName) {
		log.Warnf("ops role without specifying tenant in authorization: %#v", addAuthzReq)

		httpStatus = http.StatusBadRequest
		httpResponse = []byte("ops role requires a tenant to be specified")

		processStatusCodes(httpStatus, httpResponse, w)
		return
	}

	// invoke helper to add authz
	authz, err := auth.AddAuthorization(addAuthzReq.TenantName,
		role, addAuthzReq.PrincipalName, addAuthzReq.Local)
	switch err {
	case nil:

		getAuthzReply := convertAuthz(authz)

		// convert authorization reply to JSON
		jsonAuthz, err := json.Marshal(getAuthzReply)
		if err != nil {

			log.Error("failed to marshal authorization, err:", err)
			httpStatus = http.StatusInternalServerError
			httpResponse = []byte(auth_errors.ErrPartialFailureToAddAuthz.Error())

			// clean up created authorization
			err = auth.DeleteAuthorization(authz.UUID)
			if err != nil {
				log.Error("Failed to delete authz after partially failed ",
					" authz creation, Manual cleanup from KV store needed!")
			}
			processStatusCodes(httpStatus, httpResponse, w)
			return
		}
		httpStatus = http.StatusCreated
		httpResponse = jsonAuthz
	case auth_errors.ErrIllegalOperation:
		httpStatus = http.StatusBadRequest
		httpResponse = []byte(err.Error())
	default:

		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(auth_errors.ErrUnauthorized.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)
}

// deleteAuthorization deletes an authorization
func deleteAuthorization(w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// retrieve authz UUID from URL
	vars := mux.Vars(req)
	authzUUID := vars["authzUUID"]

	// invoke helper to delete authz
	err := auth.DeleteAuthorization(authzUUID)
	switch err {
	case nil:
		httpStatus = http.StatusNoContent
		httpResponse = nil
	case auth_errors.ErrKeyNotFound:
		httpStatus = http.StatusNotFound
		httpResponse = nil
	case auth_errors.ErrIllegalOperation:
		httpStatus = http.StatusBadRequest
		httpResponse = []byte(err.Error())
	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(err.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)

}

// getAuthorization returns the specified authorization
func getAuthorization(w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// retrieve authz UUID from URL
	vars := mux.Vars(req)
	authzUUID := vars["authzUUID"]

	// invoke helper to get authz
	authz, err := auth.GetAuthorization(authzUUID)
	switch err {
	case nil:
		httpStatus = http.StatusOK

		getAuthzReply := convertAuthz(authz)

		// convert authorization reply to JSON
		jsonAuthzReply, err := json.Marshal(getAuthzReply)
		if err != nil {
			httpStatus = http.StatusInternalServerError
			httpResponse = []byte(err.Error())
			break
		}
		httpResponse = jsonAuthzReply
	case auth_errors.ErrKeyNotFound:
		httpStatus = http.StatusNotFound
		httpResponse = nil
	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(err.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)

}

// listAuthorization lists all authorizations
func listAuthorizations(w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// invoke helper to get authz
	authzList, err := auth.ListAuthorizations()
	switch err {
	case nil:
		httpStatus = http.StatusOK

		// convert authorizations to authorization reply msgs
		authzReplyList := []GetAuthorizationReply{}
		for _, authz := range authzList {
			authzReply := convertAuthz(authz)
			authzReplyList = append(authzReplyList, authzReply)
		}

		// convert authorization reply list to JSON
		jsonAuthzReplyList, err := json.Marshal(authzReplyList)
		if err != nil {
			httpStatus = http.StatusInternalServerError
			httpResponse = []byte(err.Error())
			break
		}
		httpResponse = jsonAuthzReplyList

	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(err.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)
}

// LDAP configuration management handler functions
// NOTE: for now, these actions should be performed only by `admin` roles

// addLdapConfiguration adds LDAP configuration to the system.
// it can return various HTTP codes:
//    201 (Created; configuration added to the system)
//    404 (BadRequest; configuration exists in the system already)
//    500 (internal server error)
func addLdapConfiguration(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	ls := &types.LdapConfiguration{}
	if err := json.Unmarshal(body, ls); err != nil {
		serverError(w, errors.New("Failed to unmarshal LDAP info. from request body: "+err.Error()))
		return
	}

	statusCode, resp := addLdapConfigurationHelper(ls)
	processStatusCodes(statusCode, resp, w)

}

// getLdapConfiguration retrieves LDAP configuration from the system.
// it can return various HTTP codes:
//    200 (OK; fetch was successful)
//    404 (NotFound, configuration not found)
//    500 (internal server error)
func getLdapConfiguration(w http.ResponseWriter, req *http.Request) {
	statusCode, resp := getLdapConfigurationHelper()
	processStatusCodes(statusCode, resp, w)

}

// deleteLdapConfiguration deletes the existing LDAP configuration in the system.
// it can return various HTTP codes:
//    204 (NoContent; configuration deleted from the system)
//    404 (NotFound; configuration not found)
//    500 (internal server error)
func deleteLdapConfiguration(w http.ResponseWriter, req *http.Request) {
	statusCode, resp := deleteLdapConfigurationHelper()
	processStatusCodes(statusCode, resp, w)

}

// updateLdapConfiguration updates the existing LDAP configuration in the system.
// it can return various HTTP codes:
//    200 (OK; configuration updated)
//    404 (NotFound, configuration not found)
//    500 (internal server error)
func updateLdapConfiguration(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	ls := &types.LdapConfiguration{}
	if err := json.Unmarshal(body, ls); err != nil {
		serverError(w, errors.New("Failed to unmarshal user info. from request body: "+err.Error()))
		return
	}

	statusCode, resp := updateLdapConfigurationHelper(ls)
	processStatusCodes(statusCode, resp, w)

}
