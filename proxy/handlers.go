package proxy

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"regexp"

	"github.com/contiv/ccn_proxy/auth"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
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
	common.SetJSONContentType(w)

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
		authError(w, http.StatusUnauthorized, "Invalid username/password")
		return
	}

	log.Debugf("Token String %q", tokenStr)

	w.WriteHeader(http.StatusOK)
	writeJSONResponse(w, LoginResponse{Token: tokenStr})
}

// rbacFilter is a function which takes a token and response body and filters
// the response body based on what the user represented by the token is
// allowed to see.
type rbacFilter func(*auth.Token, []byte) []byte

// rbacFilterWrapper returns a HTTP handler function which:
//     1. validates the access token (passed in the X-Auth-Token request header)
//     2. ensures that the user represented by the token is allowed to operate on the resource in question (TODO)
//     3. performs a duplicate of the original request against netmaster
//     4. filters (if necessary) the response from netmaster to what the user should be able to see
func rbacFilterWrapper(s *Server, filter rbacFilter) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {

		common.SetJSONContentType(w)

		//
		// Step 1. validate the access token
		//
		isValid, token := isTokenValid(req.Header.Get("X-Auth-Token"), w)
		if !isValid {
			return
		}

		isSuperuser, err := token.IsSuperuser()
		if err != nil {
			// this should never happen
			// TODO: this returns "Bad token", but the error from IsSuperuser() returns
			//       "Invalid token"... fix this inconsistency
			authError(w, http.StatusBadRequest, "Bad token")
			return
		}

		//
		// Step 2. ensure the user is allowed to operate on the resource
		//

		// if not a superuser, validate that the user can perform the requested operation
		if !isSuperuser {

			//
			// TODO: replace all of this code with a call to an injected rbacAuthorization function
			//

			path := req.URL.Path
			re := regexp.MustCompile("^*/api/v1/(?P<rootObject>[a-zA-Z0-9]+)/(?P<key>[a-zA-Z0-9]+)/$")
			if re.MatchString(path) {
				// TODO: only allow access to /networks for now
				//       this is hardcoded in the absence of a real RBAC database
				if "networks" != re.FindStringSubmatch(path)[1] {
					authError(w, http.StatusUnauthorized, "Insufficient privileges")
					return
				}
			}
		}

		//
		// Step 3. proxy the request to netmaster
		//
		resp, body, err := s.ProxyRequest(w, req)
		if err != nil {
			serverError(w, err)
			return
		}

		//
		// Step 4. filter the response body (if necessary)
		//

		// if the current user is a superuser OR the request to netmaster was not successful,
		// we just send the unfiltered response back. there's no point in filtering error
		// JSON.  we'll consider any 2XX status code a success.
		// otherwise, we filter the result based on what the user is allowed to see using
		// the supplied filter function.
		if isSuperuser || resp.StatusCode/100 != 2 {
			w.Write(body)
		} else {
			w.Write(filter(token, body))
		}
	}
}

// rbacWrapper has the exact same functionality as rbacFilterWrapper but it passes in a null filter
// which does not modify the response body.
func rbacWrapper(s *Server) func(http.ResponseWriter, *http.Request) {
	return rbacFilterWrapper(s, auth.NullFilter)
}

// adminOnly takes a HTTP handler and ensures that the client's token has admin
// privileges before allowing the handler to run its code.
// if the client is not an admin, the request attempt is logged and a 403 is returned.
func adminOnly(handler func(*auth.Token, http.ResponseWriter, *http.Request)) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {

		// retrieve token from request header
		tokenStr, err := getTokenFromHeader(req)
		if err != nil {
			// token cannot be retrieved from header
			httpStatus := http.StatusInternalServerError
			httpResponse := []byte(ccnerrors.ErrUnauthorized.Error())
			processStatusCodes(httpStatus, httpResponse, w)
			return
		}

		// convert token from string to Token type
		token, err := auth.ParseToken(tokenStr)
		if err != nil {
			httpStatus := http.StatusInternalServerError
			httpResponse := []byte(ccnerrors.ErrParsingToken.Error())
			processStatusCodes(httpStatus, httpResponse, w)
			return
		}

		// Check that caller has role=admin claim.
		if err := token.CheckClaims(types.Admin); err != nil {
			// TODO: log the violator's details here
			// TODO: consider having a separate security logger which
			//       goes to a separate file for auditing purposes
			log.Error("unauthorized:unable to find role=admin claim:", err)

			httpStatus := http.StatusForbidden
			httpResponse := []byte("access denied")
			processStatusCodes(httpStatus, httpResponse, w)
		}

		// if there were no errors, call the handler we wrapped
		handler(token, w, req)
	}
}

// User management handler functions
// These actions can only be performed by administrators.
// They are protected at the router by the adminOnly() function above.

// addLocalUser adds a new local user to the system.
// it can return various HTTP status codes:
//    201 (user added to the system)
//    400 (user exists in the system already/invalid role)
//    500 (internal server error)
func addLocalUser(token *auth.Token, w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	userCreateReq := &localUserCreateRequest{}
	if err := json.Unmarshal(body, userCreateReq); err != nil {
		serverError(w, errors.New("Failed to unmarshal user info. from request body: "+err.Error()))
		return
	}

	statusCode, resp := addLocalUserHelper(userCreateReq)
	processStatusCodes(statusCode, resp, w)
}

// deleteLocalUser deletes the given user from the system.
// it can return various HTTP status codes:
//    200 (user deleted from the system)
//    404 (username not found)
//    400 (cannot delete  built-in users)
//    500 (internal server error)
func deleteLocalUser(token *auth.Token, w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	statusCode, resp := deleteLocalUserHelper(vars["username"])
	processStatusCodes(statusCode, resp, w)
}

// updateLocalUser updates the existing user with the given details.
// it can return various HTTP status codes:
//    204 (update was successful)
//    400 (invalid role/cannot update built-in user)
//    404 (user not found)
//    500 (internal server error)
func updateLocalUser(token *auth.Token, w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	userUpdateReq := &localUserCreateRequest{}
	if err := json.Unmarshal(body, userUpdateReq); err != nil {
		serverError(w, errors.New("Failed to unmarshal user info. from request body: "+err.Error()))
		return
	}

	statusCode, resp := updateLocalUserHelper(vars["username"], userUpdateReq)
	processStatusCodes(statusCode, resp, w)
}

// getLocalUsers returns all the local users available in the system
// it can return various HTTP status codes:
//    200 (fetch was successful)
//    500 (internal server error)
func getLocalUsers(token *auth.Token, w http.ResponseWriter, req *http.Request) {
	statusCode, resp := getLocalUsersHelper()
	processStatusCodes(statusCode, resp, w)
}

// getLocalUser returns the details for the given username
// it can return various HTTP status codes:
//  200 (fetch was successful)
//  404 (bad request; user not found)
//  500 (internal server error)
func getLocalUser(token *auth.Token, w http.ResponseWriter, req *http.Request) {
	vars := mux.Vars(req)

	statusCode, resp := getLocalUserHelper(vars["username"])
	processStatusCodes(statusCode, resp, w)
}

// Authorization handler functions
// These actions can only be performed by administrators.
// They are protected at the router by the adminOnly() function above.

//
// addTenantAuthorization adds a tenant authorization
// Returns these HTTP status codes:
//    201 (authz added)
//    500 (internal server error)
//
func addTenantAuthorization(token *auth.Token, w http.ResponseWriter, req *http.Request) {
	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// parse request body
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Error("failed to parse request body, err:", err)
		serverError(w, ccnerrors.ErrParsingRequest)
		return
	}

	// unmarshal request body
	addAuthzReq := &AddTenantAuthorizationRequest{}
	if err := json.Unmarshal(body, addAuthzReq); err != nil {
		log.Error("failed to unmarshal request body, err:", err)
		serverError(w, ccnerrors.ErrUnmarshalingBody)
		return
	}

	// input validation
	if common.IsEmpty(addAuthzReq.TenantName) ||
		common.IsEmpty(addAuthzReq.PrincipalName) {

		httpStatus = http.StatusBadRequest
		httpResponse = []byte("tenant name or principal name is missing")

		processStatusCodes(httpStatus, httpResponse, w)
		return
	}

	// invoke helper to add authz
	authz, err := auth.AddTenantAuthorization(token,
		addAuthzReq.TenantName, addAuthzReq.PrincipalName, addAuthzReq.Local)
	switch err {
	case nil:

		jsonAuthz, err := json.Marshal(authz)
		if err != nil {

			log.Error("failed to marshal authorization, err:", err)
			httpStatus = http.StatusInternalServerError
			httpResponse = []byte(ccnerrors.ErrPartialFailureToAddAuthz.Error())

			// @TODO clean up created authorization
			err = auth.DeleteTenantAuthorization(token, authz.UUID)
			if err != nil {
				log.Error("Failed to delete authz after partially failed ",
					" authz creation, Manual cleanup from KV store needed!")
			}
			processStatusCodes(httpStatus, httpResponse, w)
			return
		}
		httpStatus = http.StatusCreated
		httpResponse = jsonAuthz
	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(ccnerrors.ErrUnauthorized.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)
}

// deleteTenantAuthorization deletes a tenant authorization
func deleteTenantAuthorization(token *auth.Token, w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// retrieve authz UUID from URL
	vars := mux.Vars(req)
	authzUUID := vars["authzUUID"]

	// invoke helper to delete authz
	err := auth.DeleteTenantAuthorization(token, authzUUID)
	switch err {
	case nil:
		httpStatus = http.StatusNoContent
		httpResponse = nil
	case ccnerrors.ErrKeyNotFound:
		httpStatus = http.StatusNotFound
		httpResponse = nil
	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(err.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)

}

// getTenantAuthorization returns the specified tenant authorization
func getTenantAuthorization(token *auth.Token, w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// retrieve authz UUID from URL
	vars := mux.Vars(req)
	authzUUID := vars["authzUUID"]

	// invoke helper to get authz
	authz, err := auth.GetTenantAuthorization(token, authzUUID)
	switch err {
	case nil:
		httpStatus = http.StatusOK

		getAuthzReply := GetAuthorizationReply{
			AuthzUUID:   authz.UUID,
			PrincipalID: authz.PrincipalID,
			ClaimKey:    authz.ClaimKey,
			ClaimValue:  authz.ClaimValue,
		}

		// convert authorization reply to JSON
		jsonAuthzReply, err := json.Marshal(getAuthzReply)
		if err != nil {
			httpStatus = http.StatusInternalServerError
			httpResponse = []byte(err.Error())
			break
		}
		httpResponse = jsonAuthzReply
	case ccnerrors.ErrKeyNotFound:
		httpStatus = http.StatusNotFound
		httpResponse = nil
	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(err.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)

}

// updateTenantAuthorization updates the specified tenant authorization
func updateTenantAuthorization(token *auth.Token, w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// parse request body
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Error("failed to parse request body, err:", err)
		serverError(w, ccnerrors.ErrParsingRequest)
		return
	}

	// unmarshal request body
	updateAuthzReq := &AddTenantAuthorizationRequest{}
	if err := json.Unmarshal(body, updateAuthzReq); err != nil {
		log.Error("failed to unmarshal request body, err:", err)
		serverError(w, ccnerrors.ErrUnmarshalingBody)
		return
	}

	// input validation
	if common.IsEmpty(updateAuthzReq.TenantName) ||
		common.IsEmpty(updateAuthzReq.PrincipalName) {

		httpStatus = http.StatusBadRequest
		httpResponse = []byte("tenant name or principal name is missing")

		processStatusCodes(httpStatus, httpResponse, w)
		return
	}

	// retrieve authz UUID from URL
	vars := mux.Vars(req)
	authzUUID := vars["authzUUID"]

	// invoke helper to get authz
	authz, err := auth.UpdateTenantAuthorization(token,
		authzUUID, updateAuthzReq.TenantName,
		updateAuthzReq.PrincipalName, updateAuthzReq.Local)
	switch err {

	case nil:
		jsonAuthz, err := json.Marshal(authz)
		if err != nil {

			log.Error("failed to marshal authorization, err:", err)
			httpStatus = http.StatusInternalServerError
			httpResponse = []byte(ccnerrors.ErrPartialFailureToUpdateAuthz.Error())

			log.Error("Partially failed authz update; Manual cleanup from KV store needed!")
			processStatusCodes(httpStatus, httpResponse, w)
			return
		}
		httpStatus = http.StatusOK
		httpResponse = jsonAuthz
	default:
		httpStatus = http.StatusInternalServerError
		httpResponse = []byte(err.Error())
	}

	// process status codes
	processStatusCodes(httpStatus, httpResponse, w)

}

// listTenantAuthorization lists all tenant authorizations
func listTenantAuthorizations(token *auth.Token, w http.ResponseWriter, req *http.Request) {

	defer common.Untrace(common.Trace())

	var httpStatus int
	var httpResponse []byte

	// invoke helper to get authz
	authzList, err := auth.ListTenantAuthorizations(token)
	switch err {
	case nil:
		httpStatus = http.StatusOK

		// convert authorizations to authorization reply msgs
		var authzReplyList []GetAuthorizationReply
		for _, authz := range authzList {
			authzReply := GetAuthorizationReply{
				AuthzUUID:   authz.UUID,
				PrincipalID: authz.PrincipalID,
				ClaimKey:    authz.ClaimKey,
				ClaimValue:  authz.ClaimValue,
			}
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
