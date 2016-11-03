package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

const (
	name = "rbac_proxy"
)

var (
	// flags
	disableTLS bool

	// globals
	upstream *url.URL

	// TODO: use a version string which will be sent in response headers and can be
	//       displayed in --version.  it can be set by:
	//       -ldflags '-X main.version=${BUILD_VERSION-devbuild}'
	version = "devbuild"
)

func proxyRequest(w http.ResponseWriter, req *http.Request) {

	copy := new(http.Request)
	*copy = *req

	copy.URL = upstream

	// the RequestURI has to be cleared before sending a new request
	copy.RequestURI = ""

	// add our custom headers
	req.Header.Add("X-Forwarded-For", "w.x.y.z") // TODO: get real ip
	req.Header.Add("X-Forwarder", name+" "+version)

	resp, err := http.DefaultClient.Do(copy)
	if err != nil {
		fmt.Println("Request failed:", err)
		// TODO: log an error and return a 500 here
		panic("request failed")
	}

	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("Failed to read body:", err)
		// TODO: log an error and return a 500
		panic("request failed")
	}

	// copy all the response headers into our response
	for k, headers := range resp.Header {
		for _, header := range headers {
			w.Header().Set(k, header)
		}
	}

	w.Write(data)
}

func handler(w http.ResponseWriter, req *http.Request) {
	/*
		authn, err := doLDAPLookup()
		if err != nil {
			fmt.Println("LDAP lookup failed:", err)
			// TODO: log an error and return a 500
			panic("LDAP lookup failed")
		}

		if !authn {
			fmt.Println("LDAP authentication failed")
			// TODO: log it and return a 401
			panic("LDAP authentication failed")
		}

		authz, err := doAuthorization()
		if err != nil {
			fmt.Println("authorization failed:", err)
			// TODO: log an error and return a 500
			panic("authorization failed")
		}

		if !authz {
			fmt.Println("user is not authorized")
			// TODO: log it and return a 401
			panic("user is not authorized")
		}
	*/
	proxyRequest(w, req)
}

func main() {
	// TODO: add a flag for LDAP host + port
	flag.BoolVar(&disableTLS, "disable-tls", false, "if set, TLS is disabled")
	flag.Parse()

	// TODO: set this from envvars or command line flags
	upstream = &url.URL{
		Scheme: "http",
		Host:   "localhost",
	}

	http.HandleFunc("/", handler)

	var err error

	if disableTLS {
		err = http.ListenAndServe(":8000", nil)
	} else {
		// TODO: get the cert/key from somewhere else (envvar, flag, Vault, etc.)
		err = http.ListenAndServeTLS(":8000", "cert.pem", "key.pem", nil)
	}

	log.Fatal(err)
}
