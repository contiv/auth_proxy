package systemtests

import (
	"bytes"
	"crypto/tls"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"testing"
	"time"

	"github.com/contiv/ccn_proxy/proxy"

	. "gopkg.in/check.v1"

	log "github.com/Sirupsen/logrus"
)

const (
	adminUsername = "admin"
	adminPassword = "admin"

	opsUsername = "ops"
	opsPassword = "ops"
)

func Test(t *testing.T) {

	// TODO: once we support a datastore to hold local users, add default
	//       local users for admin and ops for testing purposes.  The users
	//       added here will exist across all of the tests that run.
	//       We should create admin and ops users using the constants above.

	TestingT(t)
}

type systemtestSuite struct{}

var _ = Suite(&systemtestSuite{})

// ===== TEST PROXY SERVER ======================================================

const proxyHost = "localhost:50000"
const netmasterHost = "localhost:60000"

// NewTestProxy returns a running proxy server
func NewTestProxy() *proxy.Server {
	p := proxy.NewServer(&proxy.Config{
		Name:    "CCN Proxy",
		Version: "systemtests",

		// NOTE: instead of hardcoding the two ports here, we could just
		//       randomly bind to ports until we find two available ones.
		//       we can cross that bridge if it's worth it.
		NetmasterAddress: netmasterHost,
		ListenAddress:    proxyHost,

		// cert and key path are relative to /systemtests and since
		// `generate-certificates` is a make dependency, we can assume they exist
		TLSCertificate: "../local_certs/cert.pem",
		TLSKeyFile:     "../local_certs/local.key",
	})
	p.DisableKeepalives()
	go p.Serve()

	return p
}

// ===== MISC FUNCTIONS =========================================================

// runTest is a convenience function which encapsulates the logic of creating an
// instance of proxy.Server and setting its upstream to an instance of MockServer.
// running each test inside of a runTest() call guarantees that no routes or
// shenanigans from any previous tests are present.
func runTest(f func(*proxy.Server, *MockServer)) {
	p := NewTestProxy()
	ms := NewMockServer()

	// TODO: there is a race condition here regarding the goroutines where
	//       http.Serve() is eventually called on the http.Server objects
	//       created by NewTestProxy() and NewMockServer() above. Serve()
	//       does not provide any notification mechanism for when it's ready
	//       and it blocks when called, so there will be a very short window
	//       between us starting the proxy and mock servers and them actually
	//       being available to handle requests.
	//
	//       This ONLY affects the testing case and does not matter for the
	//       proxy server in general.
	//
	//       We could send HTTP requests in a loop until one succeeds on
	//       each server or something, but this is an acceptable stopgap
	//       for now.
	time.Sleep(25 * time.Millisecond)

	f(p, ms)

	ms.Stop()
	p.Stop()

	time.Sleep(25 * time.Millisecond)
}

// login returns the user's token or returns an error if authentication fails.
func login(username, password string) (string, *http.Response, error) {
	type loginBody struct {
		Username string `json:"username"`
		Password string `json:"password"`
	}

	lb := loginBody{
		Username: username,
		Password: password,
	}

	loginBytes, err := json.Marshal(&lb)
	if err != nil {
		return "", nil, err
	}

	resp, data, err := insecurePostJSONBody("", proxy.LoginPath, loginBytes)
	if err != nil {
		return "", resp, err
	}

	lr := proxy.LoginResponse{}
	err = json.Unmarshal(data, &lr)
	if err != nil {
		return "", resp, err
	}

	return lr.Token, resp, nil
}

// loginAs has the same functionality as login() but asserts rather than
// returning any errors.  You can use this to login when *not* testing login
// functionality if the adminToken() and opsToken() functions aren't more useful.
func loginAs(c *C, username, password string) string {
	token, resp, err := login(username, password)
	c.Assert(err, IsNil)
	c.Assert(resp.StatusCode, Equals, 200)
	c.Assert(len(token), Not(Equals), 0)

	return token
}

// adminToken logs in as the default admin user and returns a token or asserts.
func adminToken(c *C) string {
	return loginAs(c, adminUsername, adminPassword)
}

// opsToken logs in as the default ops user and returns a token or asserts.
func opsToken(c *C) string {
	return loginAs(c, opsUsername, opsPassword)
}

var insecureTestClient *http.Client

// insecureClient returns an insecure HTTPS client for talking to the proxy
// during testing.  this function is memoized and only incurs overhead on the
// first call.
func insecureClient() *http.Client {
	if nil == insecureTestClient {
		insecureTestClient = &http.Client{
			Transport: &http.Transport{
				TLSClientConfig: &tls.Config{InsecureSkipVerify: true},
			},
		}
	}

	return insecureTestClient
}

// proxyGet is a convenience function which sends an insecure HTTPS GET
// request to the proxy.
func proxyGet(c *C, token, path string) (*http.Response, []byte) {
	url := "https://" + proxyHost + path

	log.Info("GET to ", url)

	req, err := http.NewRequest("GET", url, nil)
	c.Assert(err, IsNil)

	if len(token) > 0 {
		log.Println("Setting X-Auth-token to:", token)
		req.Header.Set("X-Auth-Token", token)
	}

	resp, err := insecureClient().Do(req)
	c.Assert(err, IsNil)
	c.Assert(resp.StatusCode, Equals, 200)

	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	c.Assert(err, IsNil)

	return resp, data
}

// proxyPost is a convenience function which sends an insecure HTTPS POST
// request with the specified body to the proxy.
func proxyPost(c *C, token, path string, body []byte) (*http.Response, []byte) {
	resp, body, err := insecurePostJSONBody(token, path, body)
	c.Assert(err, IsNil)
	c.Assert(resp.StatusCode/100, Equals, 2) // 2xx is okay

	return resp, body
}

// insecurePostBody sends an insecure HTTPS POST request with the specified
// JSON payload as the body.
func insecurePostJSONBody(token, path string, body []byte) (*http.Response, []byte, error) {
	url := "https://" + proxyHost + path

	log.Info("POST to ", url)

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(body))
	if err != nil {
		log.Debugf("POST request creation failed: %s", err)
		return nil, nil, err
	}

	req.Header.Set("Content-Type", "application/json")

	if len(token) > 0 {
		log.Println("Setting X-Auth-token")
		req.Header.Set("X-Auth-Token", token)
	}

	resp, err := insecureClient().Do(req)
	if err != nil {
		log.Debugf("POST request failed: %s", err)
		return nil, nil, err
	}

	defer resp.Body.Close()
	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Debugf("Failed to read response body: %s", err)
		return nil, nil, err
	}

	return resp, data, nil
}
