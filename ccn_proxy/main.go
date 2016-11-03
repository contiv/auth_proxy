package main

import (
	"flag"
	"io/ioutil"
	"net/http"
	"net/url"

	log "github.com/Sirupsen/logrus"
)

const (
	// this name is used in logging output and the X-Forwarded-By header
	// which is sent to netmaster.
	name = "ccn_proxy"
)

var (
	// flags
	disableTLS       bool
	listenAddress    string
	netmasterAddress string

	// globals
	upstream *url.URL

	// this string is included in the X-Forwarded-By header.
	// for releases, it is overridden at compile time.
	version = "devbuild"
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
// custom request headers, and sends the request to the upstream netmaster. It
// copies the response body and response headers and writes them to our client.
func proxyRequest(w http.ResponseWriter, req *http.Request) {
	copy := new(http.Request)
	*copy = *req

	copy.URL = upstream

	// the RequestURI has to be cleared before sending a new request
	copy.RequestURI = ""

	// TODO: copy original request body to the cloned request?
	//       i forget if that's necessary or not in this case...

	// add our custom headers
	req.Header.Add("X-Forwarded-For", req.RemoteAddr)
	req.Header.Add("X-Forwarder", name+" "+version)

	resp, err := http.DefaultClient.Do(copy)
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

	// copy all the response headers into our response
	for k, headers := range resp.Header {
		for _, header := range headers {
			w.Header().Set(k, header)
		}
	}

	w.Write(data)
}

// handler runs the LDAP lookup and authorization code before proxying the
// request to the upstream netmaster.
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

func main() {
	// TODO: add a flag for LDAP host + port
	flag.BoolVar(&disableTLS, "disable-tls", false, "if set, TLS is disabled")
	flag.StringVar(&listenAddress, "listen-address", ":9998", "address to listen to HTTP requests on")
	flag.StringVar(&netmasterAddress, "netmaster-address", "localhost:9999", "address of the upstream netmaster")
	flag.Parse()

	upstream = &url.URL{
		Scheme: "http", // TODO: support HTTPS-enabled netmasters?
		Host:   netmasterAddress,
	}

	http.HandleFunc("/", handler)

	log.Printf("%s %s starting up", name, version)
	log.Println("Proxying requests to", netmasterAddress)

	if disableTLS {
		log.Println("Listening on for insecure HTTP requests on", listenAddress)
		log.Fatalln(http.ListenAndServe(listenAddress, nil))
	} else {
		log.Println("Listening for secure HTTPS requests on", listenAddress)
		// TODO: get the cert/key from somewhere else (envvar, flag, Vault, etc.)
		log.Fatalln(http.ListenAndServeTLS(listenAddress, "cert.pem", "key.pem", nil))
	}
}
