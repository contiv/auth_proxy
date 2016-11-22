package proxy

import (
	"encoding/json"
	"errors"
	"io/ioutil"
	"net/http"
	"regexp"

	"github.com/contiv/ccn_proxy/auth"
	"github.com/contiv/ccn_proxy/common"

	log "github.com/Sirupsen/logrus"
)

// authError logs a message and changes the HTTP status code as requested.
func authError(w http.ResponseWriter, statusCode int, msg string) {
	log.Println(msg)
	w.WriteHeader(statusCode)
	w.Write([]byte(msg))
}

// serverError logs a message + error and changes the HTTP status code to 500.
func serverError(w http.ResponseWriter, err error) {
	log.Errorln(err.Error())
	w.WriteHeader(http.StatusInternalServerError)
	w.Write([]byte(err.Error()))
}

// loginHandler handles the login request and returns auth token with user capabilities
// it can return various HTTP status codes:
//     200 (authorization succeeded)
//     400 (username and/or password were not provided)
//     401 (authorization failed)
//     500 (something broke)
func loginHandler(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, errors.New("Failed to read body from request: "+err.Error()))
		return
	}

	// this is to maintain uniformity in UI. Right now, all the requests are sent as JSON
	type loginReq struct {
		Username string `json:"username"`
		Password string `json:"password"`
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

	// TODO: return token in JSON body: https://github.com/contiv/ccn_proxy/issues/11

	w.Header().Set("X-Auth-Token", tokenStr)
	w.WriteHeader(http.StatusOK)
	log.Debugf("Token String %q", tokenStr)
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

		//
		// Step 1. validate the access token
		//

		// NOTE: our current implementation focuses on just two local users admin(superuser) and ops(only network operations).
		// this is mainly to provide some basic difference between two users
		// this needs to be fine-grained once we have the backend and capabilities defined
		tokenStr := req.Header.Get("X-Auth-Token")
		if common.IsEmpty(tokenStr) {
			authError(w, http.StatusUnauthorized, "Empty auth token")
			return
		}

		token, err := auth.ParseToken(tokenStr)
		if err != nil {
			authError(w, http.StatusBadRequest, "Bad token")
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
			re := regexp.MustCompile("^*/api/v1/(?P<rootObject>[a-zA-Z0-9]+)/(?P<key>[a-zA-Z0-9]+)$")
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
func rbacWrapper(s *Server, filter rbacFilter) func(http.ResponseWriter, *http.Request) {
	return rbacFilterWrapper(s, auth.NullFilter)
}
