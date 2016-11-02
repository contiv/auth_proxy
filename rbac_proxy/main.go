package main

import (
	"flag"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
)

// TODO: use a version string which will be sent in response headers and can be
//       displayed in --version.  it can be set by:
//       -ldflags '-X main.version=${BUILD_VERSION-devbuild}'
// var version string

func handler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "text/plain")

	copy := new(http.Request)
	*copy = *req

	upstream := &url.URL{
		Scheme: "http",
		Host:   "localhost",
	}

	copy.URL = upstream

	// the RequestURI has to be cleared before sending a new request
	copy.RequestURI = ""

	// TODO: add X-Forwarded-For header
	// TODO: add X-Forwarded-By (rbac_proxy version)

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

	w.Write(data)
}

var disableTLS bool

func main() {
	flag.BoolVar(&disableTLS, "disable-tls", false, "if set, TLS is disabled")
	flag.Parse()

	http.HandleFunc("/", handler)

	var err error

	if disableTLS {
		err = http.ListenAndServe(":8000", nil)
	} else {
		err = http.ListenAndServeTLS(":8000", "cert.pem", "key.pem", nil)
	}

	log.Fatal(err)
}
