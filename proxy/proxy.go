package proxy

import (
	"crypto/tls"
	"errors"
	"io/ioutil"
	"net"
	"net/http"
	"net/url"

	"github.com/contiv/ccn_proxy/auth"

	log "github.com/Sirupsen/logrus"
)

// NewServer returns a new server with the specified config
func NewServer(c *Config) *Server {
	s := &Server{config: c}
	s.Init()
	return s
}

// Config holds all the configuration options for an instance of the proxy server.
type Config struct {
	// Name and Version are used in the X-Forwarded request header
	Name    string
	Version string

	// NetmasterAddress is the address of the netmaster we talk to
	NetmasterAddress string

	// ListenAddress is the interface and port the proxy binds to and listens on
	ListenAddress string

	// TLSCertificate and TLSKeyFile are the cert and key we use to expose the HTTPS server
	TLSCertificate string
	TLSKeyFile     string
}

// Server represents a proxy server which can be running.
type Server struct {
	config   *Config      // holds all the configuration for the proxy server
	stopChan chan bool    // used by Stop() to stop the proxy server
	listener net.Listener // the actual HTTPS server
}

// Init initializes anything the server requires before it can be used.
func (s *Server) Init() {
	s.stopChan = make(chan bool, 1)
}

// ProxyRequest takes a HTTP request we've received, duplicates it, adds a few
// request headers, and sends the duplicated request to netmaster. It returns
// the response + the response's body.
func (s *Server) ProxyRequest(w http.ResponseWriter, req *http.Request) (*http.Response, []byte, error) {
	copy := new(http.Request)
	*copy = *req

	// NOTE: for the initial release, we are only supporting TLS at the ccn_proxy.
	//       ccn_proxy will be the only ingress point into the cluster, so we can
	//       assume any other communication within the cluster is secure.
	copy.URL = &url.URL{
		Scheme: "http",
		Host:   s.config.NetmasterAddress,
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
	req.Header.Add("X-Forwarder", s.config.Name+" "+s.config.Version)

	log.Debugf("Proxying request upstream to %s%s", copy.URL.Host, copy.URL.Path)

	resp, err := http.DefaultClient.Do(copy)
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

// Serve creates a HTTP proxy listener and runs it in a goroutine.
func (s *Server) Serve() {
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
		http.HandleFunc("/api/v1/"+resource+"/", rbacFilterWrapper(s, filterFunc))

		// TODO: add other REST endpoints (show, create, delete, update, inspect, etc.)
		_ = rbacWrapper(s, auth.NullFilter)
	}

	// TODO: add one-off endpoints (e.g., /api/v1/inspect/endpoints/{key}/)

	//
	// HTTPS server startup
	//

	server := &http.Server{}

	cert, err := tls.LoadX509KeyPair(s.config.TLSCertificate, s.config.TLSKeyFile)
	if err != nil {
		log.Fatalln(err)
		return
	}

	tlsConfig := &tls.Config{Certificates: []tls.Certificate{cert}}

	s.listener, err = tls.Listen("tcp", s.config.ListenAddress, tlsConfig)
	if err != nil {
		log.Fatalln(err)
		return
	}

	log.Println("Proxying requests to", s.config.NetmasterAddress)
	log.Println("Listening for secure HTTPS requests on", s.config.ListenAddress)

	go server.Serve(s.listener)

	log.Debug("Server started, waiting for stop message")
	<-s.stopChan
	log.Debug("Received stop message, shutting down proxy")
}

// Stop stops a running HTTP proxy listener.
func (s *Server) Stop() {
	s.stopChan <- true
}
