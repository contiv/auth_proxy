package main

import (
	"crypto/tls"
	"encoding/json"
	"flag"
	"io/ioutil"
	"net/http"
	"net/url"
	"regexp"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/auth"
)

var (
	// flags
	listenAddress             string // address we listen on
	netmasterAddress          string // address of the netmaster we proxy to
	skipNetmasterVerification bool   // if set, skip verification of netmaster's certificate
	tlsKeyFile                string // path to TLS key
	tlsCertificate            string // path to TLS certificate
	debug                     bool   // if set, log level is set to `debug`

	// globals
	netmasterClient *http.Client // custom client which can skip cert verification
	upstream        *url.URL     // URL object constructed from netmasterAddress

	// ProgramName is used in logging output and the X-Forwarded-By header.
	ProgramName = "CCN Proxy"

	// ProgramVersion is used in logging output and the X-Forwarded-By header.
	// it is overridden at compile time via -ldflags
	ProgramVersion = "unknown"
)

/*
// authError logs a message and changes the HTTP status code to 401.
func authError(w http.ResponseWriter, msg string) {
	log.Println(msg)
	w.WriteHeader(http.StatusUnauthorized)
}
*/

// serverError logs a message + error and changes the HTTP status code to 500.
func serverError(w http.ResponseWriter, msg string, err error) {
	log.Errorln(msg, err)
	w.WriteHeader(http.StatusInternalServerError)
}

// proxyRequest takes a HTTP request we've received, duplicates it, adds a few
// custom request headers, and sends the request to the netmaster. It copies
// the status code, response body, and response headers onto the response we
// send to our client.
func proxyRequest(w http.ResponseWriter, req *http.Request) {
	copy := new(http.Request)
	*copy = *req

	copy.URL = upstream

	// the RequestURI has to be cleared before sending a new request
	copy.RequestURI = ""

	// TODO: copy original request body to the cloned request?
	//       i forget if that's necessary or not in this case...

	// add our custom headers:
	//     X-Forwarded-For is our client's IP
	//     X-Forwarded-By is the version string of this program which did the forwarding
	req.Header.Add("X-Forwarded-For", req.RemoteAddr)
	req.Header.Add("X-Forwarder", ProgramName+" "+ProgramVersion)

	resp, err := netmasterClient.Do(copy)
	if err != nil {
		serverError(w, "Failed to perform duplicate request", err)
		return
	}

	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		serverError(w, "Failed to read body from response", err)
		return
	}

	// set our status code to the status code we got from netmaster
	w.WriteHeader(resp.StatusCode)

	// use all of netmaster's response headers as our response headers
	for name, headers := range resp.Header {
		for _, header := range headers {
			w.Header().Set(name, header)
		}
	}

	w.Write(data)
}

// loginHandler handles the login request and returns auth token with user capabilities
// it can return various HTTP status codes:
//     500 (something breaks)
//     401 (authorization fails)
//     any code that netmaster itself can return
func loginHandler(w http.ResponseWriter, req *http.Request) {
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		serverError(w, "Failed to read body from request", err)
		return
	}

	// this is to maintain uniformity in UI. Right now, all the requests are sent as JSON
	type loginReq struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	lReq := &loginReq{}
	if err := json.Unmarshal(body, lReq); err != nil {
		serverError(w, "Failed to read body from request", err)
		return
	}

	if auth.IsEmpty(lReq.Username) || auth.IsEmpty(lReq.Password) {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Username and Password must be provided"))
		return
	}

	// authenticate the user using `username` and `password`
	authM := auth.Manager{IsADSet: false} //FIXME: this needs to be configured through command line args or through some utility function
	tokenStr, err := authM.Authenticate(lReq.Username, lReq.Password)
	if err != nil {
		w.WriteHeader(http.StatusUnauthorized)
		w.Write([]byte("Invalid username and password"))
		return
	}

	w.WriteHeader(http.StatusOK)
	w.Header().Set("X-Auth-Token", tokenStr)
	log.Debugf("Token String %q", tokenStr)
	return
}

// handler handles the incoming request and proxies the request to netmaster only if the user has required previleges
// on successful authorization, it proxies the request to netmaster
// otherwise returns appropriate HTTP status code based on the error
func handler(w http.ResponseWriter, req *http.Request) {
	//NOTE: our current implementation focusses on just 2 local users admin(superuser), ops(only network operations).
	// this is mainly to provide some basic difference between 2 users
	// this needs to be enhanced to fine grained level once we have the backend and capabilities defined
	tokenStr := req.Header.Get("X-Auth-Token")
	if !auth.IsEmpty(tokenStr) {
		if authT, err := auth.ParseToken(tokenStr); err == nil {
			if isSuperuser, _ := authT.IsSuperuser(); isSuperuser {
				log.Debugf("Token belongs to a super user; can perform any operation")
				proxyRequest(w, req)
				return
			}

			// FIXME: this needs to be changed once we have the real backend ready
			// check `user` capabilities
			path := req.URL.Path
			re := regexp.MustCompile("^*/api/v1/(?P<rootObject>[a-zA-Z0-9]+)/(?P<key>[a-zA-Z0-9]+)$")
			if re.MatchString(path) {
				if "networks" == re.FindStringSubmatch(path)[1] {
					proxyRequest(w, req)
					return
				}
			} // else; user is not allowed to perform global operations
		}
	}

	w.WriteHeader(http.StatusUnauthorized)
	return
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
	flag.BoolVar(
		&skipNetmasterVerification,
		"skip-netmaster-verification",
		false,
		"if set, skip verification of netmaster's certificate",
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
	flag.Parse()
}

func main() {

	processFlags()

	if debug {
		log.SetLevel(log.DebugLevel)
	}

	// TODO: support a configurable timeout here for communication with netmaster
	netmasterClient = &http.Client{
		Transport: &http.Transport{
			TLSClientConfig: &tls.Config{InsecureSkipVerify: skipNetmasterVerification},
		},
	}

	upstream = &url.URL{
		Scheme: "https", // we only support HTTPS netmasters
		Host:   netmasterAddress,
	}

	http.HandleFunc("/api/v1/ccn_proxy/login", loginHandler)
	http.HandleFunc("/api/v1/", handler) // any request coming to this path should be authorized

	// TODO: add RBAC-related endpoints here

	log.Println(ProgramName, ProgramVersion, "starting up...")
	log.Println("Proxying requests to", netmasterAddress)
	log.Println("Listening for secure HTTPS requests on", listenAddress)

	if skipNetmasterVerification {
		log.Warn("Skipping netmaster TLS verification when proxying requests was requested (--skip-netmaster-verification)")
	}

	log.Fatalln(http.ListenAndServeTLS(listenAddress, tlsCertificate, tlsKeyFile, nil))
}
