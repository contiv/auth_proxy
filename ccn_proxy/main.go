package main

import (
	"encoding/json"
	"errors"
	"flag"
	"io/ioutil"
	"net/http"
	"net/url"
	"regexp"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/auth"
	"github.com/contiv/ccn_proxy/common"
)

var (
	// flags
	debug            bool   // if set, log level is set to `debug`
	listenAddress    string // address we listen on
	netmasterAddress string // address of the netmaster we proxy to
	stateStore       string // address of the state store used by netmaster
	tlsKeyFile       string // path to TLS key
	tlsCertificate   string // path to TLS certificate

	// globals
	netmasterClient *http.Client // custom client which can skip cert verification

	// ProgramName is used in logging output and the X-Forwarded-By header.
	ProgramName = "CCN Proxy"

	// ProgramVersion is used in logging output and the X-Forwarded-By header.
	// it is overridden at compile time via -ldflags
	ProgramVersion = "unknown"
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

// proxyRequest takes a HTTP request we've received, duplicates it, adds a few
// request headers, and sends the duplicated request to netmaster. It returns
// the response + the response's body.
func proxyRequest(w http.ResponseWriter, req *http.Request) (*http.Response, []byte, error) {
	copy := new(http.Request)
	*copy = *req

	// NOTE: for the initial release, we are only supporting TLS at the ccn_proxy.
	//       ccn_proxy will be the only ingress point into the cluster, so we can
	//       assume any other communication within the cluster is secure.
	copy.URL = &url.URL{
		Scheme: "http",
		Host:   netmasterAddress,
		Path:   req.RequestURI,
	}

	// the RequestURI has to be cleared before sending a new request.
	// the actual URL we will request upstream is set above in "URL"
	copy.RequestURI = ""

	// TODO: copy original request body to the cloned request?
	//       i forget if that's necessary or not in this case...

	// add our custom headers:
	//     X-Forwarded-For is our client's IP
	//     X-Forwarded-By is the version string of this program which did the forwarding
	req.Header.Add("X-Forwarded-For", req.RemoteAddr)
	req.Header.Add("X-Forwarder", ProgramName+" "+ProgramVersion)

	log.Debugf("Proxying request upstream to %s%s", copy.URL.Host, copy.URL.Path)

	resp, err := netmasterClient.Do(copy)
	if err != nil {
		return nil, []byte{}, errors.New("Failed to perform duplicate request: " + err.Error())
	}

	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, []byte{}, errors.New("Failed to read body from response: " + err.Error())
	}

	// copy the response code + headers from netmaster to our response
	w.WriteHeader(resp.StatusCode)

	for name, headers := range resp.Header {
		for _, header := range headers {
			w.Header().Set(name, header)
		}
	}

	return resp, data, nil
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

func processFlags() {
	// TODO: add a flag for LDAP host + port
	flag.StringVar(
		&listenAddress,
		"listen-address",
		":9999",
		"address to listen to HTTP requests on",
	)
	flag.StringVar(
		&netmasterAddress,
		"netmaster-address",
		"localhost:9998",
		"address of the upstream netmaster",
	)
	flag.StringVar(
		&tlsKeyFile,
		"tls-key-file",
		"local.key",
		"path to TLS key",
	)
	flag.StringVar(
		&tlsCertificate,
		"tls-certificate",
		"cert.pem",
		"path to TLS certificate",
	)
	flag.BoolVar(
		&debug,
		"debug",
		false,
		"if set, log level is set to debug",
	)
	flag.StringVar(
		&stateStore,
		"state-store",
		"",
		"address of the state store used by netmaster",
	)
	flag.Parse()
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
func rbacFilterWrapper(filter rbacFilter) func(http.ResponseWriter, *http.Request) {
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
		resp, body, err := proxyRequest(w, req)
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
func rbacWrapper(filter rbacFilter) func(http.ResponseWriter, *http.Request) {
	return rbacFilterWrapper(auth.NullFilter)
}

func main() {

	processFlags()

	if debug {
		log.SetLevel(log.DebugLevel)
	}

	// TODO: support a configurable timeout here for communication with netmaster
	netmasterClient = &http.Client{}

	//
	// Authorization endpoint
	//
	http.HandleFunc("/api/v1/ccn_proxy/login", loginHandler)

	//
	// RBAC-enforced endpoints with optional filtering of results
	//
	filteredRoutes := map[string]rbacFilter{
		"appProfiles":        auth.FilterAppProfiles,
		"Bgps":               auth.FilterBgps,
		"endpointGroups":     auth.FilterEndpointGroups,
		"extContractsGroups": auth.FilterExtContractsGroups,
		"globals":            auth.FilterGlobals,
		"netprofiles":        auth.FilterNetProfiles,
		"networks":           auth.FilterNetworks,
		// NOTE: "policys" is misspelled in netmaster's routes
		"policys":        auth.FilterPolicies,
		"rules":          auth.FilterRules,
		"serviceLBs":     auth.FilterServiceLBs,
		"tenants":        auth.FilterTenants,
		"volumes":        auth.FilterVolumes,
		"volumeProfiles": auth.FilterVolumeProfiles,
	}

	// TODO: add another map (or extend the above map) of "resource" -> "rbacAuthorization" functions.
	//       rbacWrapper() and rbacFilterWrapper() will need to be extended to take an rbacAuthorization
	//       function as an argument which will be used to control access to the resource in question.

	for resource, filterFunc := range filteredRoutes {
		// NOTE: netmaster's "list" routes require a trailing slash...
		http.HandleFunc("/api/v1/"+resource+"/", rbacFilterWrapper(filterFunc))

		// TODO: add other REST endpoints (show, create, delete, update, inspect, etc.)
		_ = rbacWrapper(auth.NullFilter)
	}

	// TODO: add one-off endpoints (e.g., /api/v1/inspect/endpoints/{key}/)

	//
	// HTTPS server startup
	//
	log.Println(ProgramName, ProgramVersion, "starting up...")
	log.Println("Proxying requests to", netmasterAddress)
	log.Println("Listening for secure HTTPS requests on", listenAddress)

	log.Fatalln(http.ListenAndServeTLS(listenAddress, tlsCertificate, tlsKeyFile, nil))
}
