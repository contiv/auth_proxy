package proxy

import (
	"crypto/tls"
	"errors"
	"io/ioutil"
	"net"
	"net/http"
	"net/url"
	"sync"
	"time"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/auth_proxy/common"
	"github.com/gorilla/mux"
)

const (
	// V1Prefix is the API prefix for the v1 API
	V1Prefix = "/api/v1/auth_proxy"

	// LoginPath is the authentication endpoint on the proxy
	LoginPath = V1Prefix + "/login/"

	// HealthCheckPath is the health check endpoint on the proxy
	HealthCheckPath = V1Prefix + "/health/"

	// VersionPath is the version endpoint on the proxy
	VersionPath = V1Prefix + "/version/"

	// uiDirectory is the location in the container where the baked-in UI lives
	// and where an external UI directory can be bindmounted over using -v
	uiDirectory = "/ui"

	// DefaultNetmasterRequestTimeout is the default value for proxy.Config's NetmasterRequestTimeout
	DefaultNetmasterRequestTimeout = 10

	// DefaultClientReadTimeout is the default value for proxy.Config's ClientReadTimeout
	DefaultClientReadTimeout = 5

	// DefaultClientWriteTimeout is the default value for proxy.Config's ClientWriteTimeout
	DefaultClientWriteTimeout = 11 // DefaultNetmasterRequestTimeout + 1
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

	// NetmasterRequestTimeout is how long we allow for the whole request cycle when talking to
	// out upstream netmaster.
	NetmasterRequestTimeout int64

	// ClientReadTimeout is how long we allow for the client to send its request to us.
	// Increase this if you want to support clients on extremely slow/flaky connections.
	ClientReadTimeout int64

	// ClientWriteTimeout is how long we allow for us to send a request to netmaster, get the
	// response, and write it back to the client socket.  This must be longer than the
	// NetmasterRequestTimeout (default is 1 second longer).
	ClientWriteTimeout int64
}

// Server represents a proxy server which can be running.
type Server struct {
	config          *Config        // holds all the configuration for the proxy server
	listener        net.Listener   // the actual HTTPS server
	stopChan        chan bool      // used to shut down the server
	useKeepalives   bool           // controls whether the HTTPS server supports keepalives
	wg              sync.WaitGroup // used to avoid a race condition when shutting down
	netmasterClient *http.Client   // used when talking to the upstream netmaster
}

// Init initializes anything the server requires before it can be used.
func (s *Server) Init() {
	s.stopChan = make(chan bool, 1)
	s.useKeepalives = true // we should only really need to turn these off in testing

	if s.config.NetmasterRequestTimeout <= 0 {
		log.Fatalf("NetmasterRequestTimeout must be > 0 (got: %d)", s.config.NetmasterRequestTimeout)
	}

	if s.config.ClientReadTimeout <= 0 {
		log.Fatalf("ClientReadTimeout must be > 0 (got: %d)", s.config.ClientReadTimeout)
	}

	if s.config.ClientWriteTimeout <= 0 {
		log.Fatalf("ClientWriteTimeout must be > 0 (got: %d)", s.config.ClientWriteTimeout)
	}

	s.netmasterClient = &http.Client{
		Timeout: time.Duration(s.config.NetmasterRequestTimeout) * time.Second,
	}

	if s.config.ClientWriteTimeout <= s.config.NetmasterRequestTimeout {
		log.Fatalf(
			"ClientWriteTimeout (%d) must be > NetmasterRequestTimeout (%d)",
			s.config.ClientWriteTimeout,
			s.config.NetmasterRequestTimeout,
		)
	}

}

// ProxyRequest takes a HTTP request we've received, duplicates it, adds a few
// request headers, and sends the duplicated request to netmaster. It returns
// the response + the response's body.
func (s *Server) ProxyRequest(w http.ResponseWriter, req *http.Request) (*http.Response, []byte, error) {
	copy := new(http.Request)
	*copy = *req

	// NOTE: for the initial release, we are only supporting TLS at the auth_proxy.
	//       auth_proxy will be the only ingress point into the cluster, so we can
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

	resp, err := s.netmasterClient.Do(copy)
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

	server := &http.Server{
		Handler:      router,
		ReadTimeout:  time.Duration(s.config.ClientReadTimeout) * time.Second,
		WriteTimeout: time.Duration(s.config.ClientWriteTimeout) * time.Second,
	}

	if !s.useKeepalives {
		server.SetKeepAlivesEnabled(false)
	}

	cert, err := tls.LoadX509KeyPair(s.config.TLSCertificate, s.config.TLSKeyFile)
	if err != nil {
		log.Fatalln("Failed to load TLS key pair:", err)
		return
	}

	tlsConfig := &tls.Config{
		Certificates: []tls.Certificate{cert},
		MinVersion:   tls.VersionTLS11,
	}

	s.listener, err = tls.Listen("tcp", s.config.ListenAddress, tlsConfig)
	if err != nil {
		log.Fatalln("Failed to listen:", err)
		return
	}

	log.Println("Proxying requests to netmaster at", s.config.NetmasterAddress)
	log.Println("Listening for secure HTTPS requests on", s.config.ListenAddress)

	s.wg.Add(1)
	go func() {
		if err := server.Serve(s.listener); err != nil {
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

//
// staticFileServer returns a staticFileHandler which serves the UI and its assets.
// this is necessary so that we can set response headers.
//
func staticFileServer(root http.FileSystem) http.Handler {
	return &staticFileHandler{
		fileServer: http.FileServer(root),
	}
}

type staticFileHandler struct {
	fileServer http.Handler
}

func (sfh *staticFileHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	common.EnableHSTS(w)

	// TODO: here is a good spot to look for asset requests (.js, .css, etc.)
	//       and append .gz and serve a gzipped version instead by rewriting
	//       the requested path.

	sfh.fileServer.ServeHTTP(w, r)
}

func addRoutes(s *Server, router *mux.Router) {

	//
	// Version endpoint
	//
	router.Path(VersionPath).Methods("GET").HandlerFunc(versionHandler(s.config.Version))

	//
	// Health check endpoint
	//
	router.Path(HealthCheckPath).Methods("GET").HandlerFunc(healthCheckHandler(s.config))

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
	// Netmaster endpoints
	//
	addNetmasterRoutes(s, router)

	//
	// UI: static files which are served from the root
	//
	root := "/"
	staticHandler := staticFileServer(http.Dir(uiDirectory))

	router.PathPrefix(root).Handler(http.StripPrefix(root, staticHandler))
}

// addNetmasterRoutes adds all netmaster routes to mux.Router
func addNetmasterRoutes(s *Server, router *mux.Router) {
	router.Path("/api/v1/{resource}/").Methods("GET").HandlerFunc(enforceRBAC(s))
	router.Path("/api/v1/{resource}/{name}/").Methods("GET", "POST", "PUT", "DELETE").HandlerFunc(enforceRBAC(s))
	router.Path("/api/v1/inspect/{resource}/{name}/").Methods("GET").HandlerFunc(enforceRBAC(s))
}

// addUserMgmtRoutes adds user management routes to the mux.Router.
// All user management routes are admin-only.
func addUserMgmtRoutes(router *mux.Router) {
	router.Path(V1Prefix + "/local_users/").Methods("POST").HandlerFunc(adminOnly(addLocalUser))
	router.Path(V1Prefix + "/local_users/{username}/").Methods("DELETE").HandlerFunc(adminOnly(deleteLocalUser))
	router.Path(V1Prefix + "/local_users/{username}/").Methods("PATCH").HandlerFunc(authorizedUserOnly(updateLocalUser))
	router.Path(V1Prefix + "/local_users/{username}/").Methods("GET").HandlerFunc(authorizedUserOnly(getLocalUser))
	router.Path(V1Prefix + "/local_users/").Methods("GET").HandlerFunc(adminOnly(getLocalUsers))
}

// addAuthorizationRoutes adds authorization routes to the mux.Router
// All authorization management routes are admin-only.
func addAuthorizationRoutes(router *mux.Router) {
	router.Path(V1Prefix + "/authorizations/").Methods("POST").HandlerFunc(adminOnly(addAuthorization))
	router.Path(V1Prefix + "/authorizations/{authzUUID}/").Methods("DELETE").HandlerFunc(adminOnly(deleteAuthorization))
	router.Path(V1Prefix + "/authorizations/{authzUUID}/").Methods("GET").HandlerFunc(adminOnly(getAuthorization))
	router.Path(V1Prefix + "/authorizations/").Methods("GET").HandlerFunc(adminOnly(listAuthorizations))
}

// addLdapConfigurationMgmtRoutes adds LDAP configuration management routes to mux.Router.
func addLdapConfigurationMgmtRoutes(router *mux.Router) {
	router.Path(V1Prefix + "/ldap_configuration/").Methods("PUT").HandlerFunc(adminOnly(addLdapConfiguration))
	router.Path(V1Prefix + "/ldap_configuration/").Methods("GET").HandlerFunc(adminOnly(getLdapConfiguration))
	router.Path(V1Prefix + "/ldap_configuration/").Methods("DELETE").HandlerFunc(adminOnly(deleteLdapConfiguration))
	router.Path(V1Prefix + "/ldap_configuration/").Methods("PATCH").HandlerFunc(adminOnly(updateLdapConfiguration))
}
