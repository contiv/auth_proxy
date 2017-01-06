package systemtests

import (
	"net"
	"net/http"
	"sync"

	"github.com/contiv/ccn_proxy/common"

	log "github.com/Sirupsen/logrus"
)

// NewMockServer returns a configured, initialized, and running MockServer which
// can have routes added even though it's already running. Call Stop() to stop it.
func NewMockServer() *MockServer {
	ms := &MockServer{}
	ms.Init()
	go ms.Serve()

	return ms
}

// MockServer is a server which we can program to behave like netmaster for
// testing purposes.
type MockServer struct {
	listener net.Listener   // the actual HTTPS listener
	mux      *http.ServeMux // a custom ServeMux we can add routes onto later
	stopChan chan bool      // used to shut down the server
	wg       sync.WaitGroup // used to avoid a race condition when shutting down
}

// Init just sets up the stop channel and our custom ServeMux
func (ms *MockServer) Init() {
	ms.stopChan = make(chan bool, 1)
	ms.mux = http.NewServeMux()
}

// AddHardcodedResponse registers a HTTP handler func for `path' that returns `body'.
func (ms *MockServer) AddHardcodedResponse(path string, body []byte) {
	ms.mux.HandleFunc(path, func(w http.ResponseWriter, req *http.Request) {
		common.SetJSONContentType(w)
		w.Header().Set("Content-Type", "application/json")
		w.Write(body)
	})
}

// AddHandler allows adding a custom route handler to our custom ServeMux
func (ms *MockServer) AddHandler(path string, f func(http.ResponseWriter, *http.Request)) {
	ms.mux.HandleFunc(path, f)
}

// Serve starts the mock server using the custom ServeMux we set up.
func (ms *MockServer) Serve() {
	var err error

	ms.listener, err = net.Listen("tcp", "0.0.0.0:9999")
	if err != nil {
		log.Fatal("net.Listen: ", err)
		return
	}

	server := &http.Server{Handler: ms.mux}

	// because of the tight time constraints around starting/stopping the
	// mock server when running tests and the fact that lingering client
	// connections can cause the server not to shut down in a timely
	// manner, we will just disable keepalives entirely here.
	server.SetKeepAlivesEnabled(false)

	ms.wg.Add(1)
	go func() {
		server.Serve(ms.listener)
		ms.wg.Done()
	}()

	<-ms.stopChan

	ms.listener.Close()
}

// Stop stops the mock server.
func (ms *MockServer) Stop() {
	ms.stopChan <- true

	// wait until the listener has actually been stopped
	ms.wg.Wait()
}
