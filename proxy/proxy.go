package proxy

import (
	"crypto/tls"
	"errors"
	"io/ioutil"
	"net"
	"net/http"
	"net/url"
	"sync"

	"github.com/contiv/ccn_proxy/auth"

	log "github.com/Sirupsen/logrus"
	"github.com/gorilla/mux"
)

const (
	// LoginPath is the authentication endpoint on the proxy
	LoginPath = "/api/v1/ccn_proxy/login"
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
	config        *Config        // holds all the configuration for the proxy server
	listener      net.Listener   // the actual HTTPS server
	stopChan      chan bool      // used to shut down the server
	useKeepalives bool           // controls whether the HTTPS server supports keepalives
	wg            sync.WaitGroup // used to avoid a race condition when shutting down
}

// Init initializes anything the server requires before it can be used.
func (s *Server) Init() {
	s.stopChan = make(chan bool, 1)
	s.useKeepalives = true // we should only really need to turn these off in testing
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

// DisableKeepalives turns off keepalives for the proxy.  This should only be
// needed for testing because of the tight constraints around start/stopping
// and the problems that hanging connections can cause.
func (s *Server) DisableKeepalives() {
	s.useKeepalives = false
}

// Serve creates a HTTP proxy listener and runs it in a goroutine.
func (s *Server) Serve() {
	router := mux.NewRouter()

	addRoutes(s, router)

	server := &http.Server{Handler: router}

	if !s.useKeepalives {
		server.SetKeepAlivesEnabled(false)
	}

	cert, err := tls.LoadX509KeyPair(s.config.TLSCertificate, s.config.TLSKeyFile)
	if err != nil {
		log.Fatalln("Failed to load TLS key pair:", err)
		return
	}

	tlsConfig := &tls.Config{Certificates: []tls.Certificate{cert}}

	s.listener, err = tls.Listen("tcp", s.config.ListenAddress, tlsConfig)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
		return
	}

	log.Println("Proxying requests to", s.config.NetmasterAddress)
	log.Println("Listening for secure HTTPS requests on", s.config.ListenAddress)

	s.wg.Add(1)
	go func() {
		err := server.Serve(s.listener)
		if err != nil {
			// this will usually be a "use of closed network socket"
			// error when Stop() is called, but log it anyways.
			log.Debug("Error serving: ", err)
		}
		s.wg.Done()
	}()

	log.Debug("Server started, waiting for stop message")
	<-s.stopChan
	log.Debug("Received stop message, shutting down proxy")
	s.listener.Close()
}

// Stop stops a running HTTP proxy listener.
func (s *Server) Stop() {
	s.stopChan <- true

	// wait until the listener has actually been stopped
	s.wg.Wait()
}

func addRoutes(s *Server, router *mux.Router) {
	//
	// Authentication endpoint
	//
	router.Path(LoginPath).Methods("POST").HandlerFunc(loginHandler)

	//
	// User management endpoints
	//
	addUserMgmtRoutes(router)

	// Authorization endpoints
	//
	addAuthorizationRoutes(router)

	//
	// LDAP configuration management endpoints
	//
	addLdapConfigurationMgmtRoutes(router)

	//
	// RBAC-enforced endpoints with optional filtering of results
	//
	filteredRoutes := map[string]rbacFilter{
		"aciGws":             auth.FilterAciGws,
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
		// NOTE: netmaster routes require a trailing slash.
		router.Path("/api/v1/" + resource + "/").Methods("GET").HandlerFunc(rbacFilterWrapper(s, filterFunc))

		// add other REST endpoints (show, create, delete, update, etc.)
		router.Path("/api/v1/"+resource+"/{key}/").Methods("GET", "POST", "PUT", "DELETE").HandlerFunc(rbacWrapper(s))

		// "inspect" routes are basically a namespace rather than being an action on a member of a collection...
		router.Path("/api/v1/inspect/" + resource + "/{key}/").Methods("GET").HandlerFunc(rbacWrapper(s))
	}

	// the endpoint inspect route doesn't actually have a matching model in netmaster
	// "endpoint groups" are a totally separate model/endpoint
	router.Path("/api/v1/inspect/endpoints/{key}/").Methods("GET").HandlerFunc(rbacWrapper(s))
}

// addUserMgmtRoutes adds user management routes to the mux.Router.
// All user management routes are admin-only.
func addUserMgmtRoutes(router *mux.Router) {
	router.Path("/api/v1/ccn_proxy/local_users").Methods("POST").HandlerFunc(adminOnly(addLocalUser))
	router.Path("/api/v1/ccn_proxy/local_users/{username}").Methods("DELETE").HandlerFunc(adminOnly(deleteLocalUser))
	router.Path("/api/v1/ccn_proxy/local_users/{username}").Methods("PATCH").HandlerFunc(adminOnly(updateLocalUser))
	router.Path("/api/v1/ccn_proxy/local_users/{username}").Methods("GET").HandlerFunc(adminOnly(getLocalUser))
	router.Path("/api/v1/ccn_proxy/local_users").Methods("GET").HandlerFunc(adminOnly(getLocalUsers))
}

// addAuthorizationRoutes adds authorization routes to the mux.Router
// All authorization management routes are admin-only.
func addAuthorizationRoutes(router *mux.Router) {
	router.Path("/api/v1/ccn_proxy/authorizations").Methods("POST").HandlerFunc(adminOnly(addAuthorization))
	router.Path("/api/v1/ccn_proxy/authorizations/{authzUUID}").Methods("DELETE").HandlerFunc(adminOnly(deleteAuthorization))
	router.Path("/api/v1/ccn_proxy/authorizations/{authzUUID}").Methods("GET").HandlerFunc(adminOnly(getAuthorization))
	router.Path("/api/v1/ccn_proxy/authorizations").Methods("GET").HandlerFunc(adminOnly(listAuthorizations))
}

// addLdapConfigurationMgmtRoutes adds LDAP configuration management routes to mux.Router.
func addLdapConfigurationMgmtRoutes(router *mux.Router) {
	router.Path("/api/v1/ccn_proxy/ldap_configuration").Methods("POST").HandlerFunc(adminOnly(addLdapConfiguration))
	router.Path("/api/v1/ccn_proxy/ldap_configuration").Methods("GET").HandlerFunc(adminOnly(getLdapConfiguration))
	router.Path("/api/v1/ccn_proxy/ldap_configuration").Methods("DELETE").HandlerFunc(adminOnly(deleteLdapConfiguration))
	router.Path("/api/v1/ccn_proxy/ldap_configuration").Methods("PATCH").HandlerFunc(adminOnly(updateLdapConfiguration))
}
