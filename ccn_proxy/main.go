package main

import (
	"crypto/tls"
	"flag"
	"io/ioutil"
	"net/http"
	"net/url"

	log "github.com/Sirupsen/logrus"
)

var (
	// flags
	listenAddress             string // address we listen on
	netmasterAddress          string // address of the netmaster we proxy to
	skipNetmasterVerification bool   // if set, skip verification of netmaster's certificate
	tlsKeyFile                string // path to TLS key
	tlsCertificate            string // path to TLS certificate

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

// handler runs the LDAP lookup and authorization code before proxying the
// request to netmaster.
// it can return various HTTP status codes:
//     500 (something breaks)
//     401 (authorization fails)
//     any code that netmaster itself can return
func handler(w http.ResponseWriter, req *http.Request) {
	/*
		authn, err := doLDAPLookup()
		if err != nil {
			serverError(w, "LDAP lookup failed", err)
			return
		}

		if !authn {
			authError(w, "LDAP authentication failed")
			return
		}

		authz, err := doAuthorization()
		if err != nil {
			serverError(w, "Authorization failed", err)
		}

		if !authz {
			authError(w, "user is not authorized")
			return
		}
	*/

	proxyRequest(w, req)
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
	flag.Parse()
}

func main() {

	processFlags()

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

	http.HandleFunc("/", handler)

	// TODO: add RBAC-related endpoints here

	log.Println(ProgramName, ProgramVersion, "starting up...")
	log.Println("Proxying requests to", netmasterAddress)
	log.Println("Listening for secure HTTPS requests on", listenAddress)

	if skipNetmasterVerification {
		log.Warn("Skipping netmaster TLS verification when proxying requests was requested (--skip-netmaster-verification)")
	}

	log.Fatalln(http.ListenAndServeTLS(listenAddress, tlsCertificate, tlsKeyFile, nil))
}
