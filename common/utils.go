package common

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"runtime"
	"strings"

	log "github.com/Sirupsen/logrus"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
)

// GlobalMap is a map to hold variables(key:value pair) that can be accessed anywhere in auth_proxy
type GlobalMap map[string]string

var global GlobalMap

// IsEmpty checks if the given string is empty or not
// params:
//  str: string that needs to be checked
// return values:
//  true if the string is empty otherwise false
func IsEmpty(str string) bool {
	return len(strings.TrimSpace(str)) == 0
}

// Global returns `GlobalMap` singleton object
func Global() GlobalMap {
	if global == nil {
		global = map[string]string{}
	}

	return global
}

// Set adds a key:value pair in `GlobalMap`
// params:
//  key: string; to be set in map
//  value: string; value for the key
// return values:
//  error: nil on success or relevant error
func (g GlobalMap) Set(key, value string) error {
	if IsEmpty(key) {
		return fmt.Errorf("Cannot set globals: empty key")
	}

	g[key] = value
	return nil
}

// Get retrieves the value of the given key from `GlobalMap`
// params:
//  key: to be fetched from map
// return values:
//  string: g[key] on success
//  error: relevant error if it fails to retrieve the given key's value
func (g GlobalMap) Get(key string) (string, error) {
	val, found := g[key]
	if !found {
		log.Debugf("Failed to fetch key %q from global map", key)
		return "", auth_errors.ErrKeyNotFound
	}

	return val, nil
}

var doTracing = false

//
// Trace emits a debug level log message with info of the caller function.
//
// Returns:
//	name of caller function if no error, "" otherwise.
//
func Trace() string {
	if !doTracing {
		return ""
	}

	pc, _, _, ok := runtime.Caller(1)
	if ok {
		f := runtime.FuncForPC(pc)
		log.Debug("Entering: ", f.Name())
		return f.Name()
	}

	return ""
}

//
// Untrace should be used with Trace function as defer Untrace(Trace()).
//
// Parameters:
//	s: name of function being traced. This is the output from Trace
//	function.
//
// Returns nothing
//
func Untrace(s string) {
	if !doTracing {
		return
	}

	// By taking in the parameter as a result of Trace, we avoid calling in
	// runtime twice.
	log.Debug("Leaving: ", s)
}

// SetDefaultResponseHeaders sets the default response headers.
func SetDefaultResponseHeaders(w http.ResponseWriter) {
	// the charset here is to work around a bug where Chrome does not parse JSON data properly:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=438464
	w.Header().Set("Content-Type", "application/json; charset=utf-8")

	// enable HSTS for six months
	// we don't actually serve a non-HTTPS site, so this header ultimately does nothing
	w.Header().Set("Strict-Transport-Security", "max-age=15768000")
}

// GetNetmasterVersion reaches out to the specified netmaster and retrieves
// the "Version" key from its /version endpoint.
func GetNetmasterVersion(address string) (string, error) {
	url := "http://" + address + "/version"

	resp, err := http.Get(url)
	if err != nil {
		return "", fmt.Errorf("failed to connect to netmaster: %s", err.Error())
	}

	defer resp.Body.Close()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response from netmaster: %s", err.Error())
	}

	// NOTE: why are we defining a custom struct here instead of using the
	//       one from netmaster which is actually used to generate this
	//       endpoint's response, you ask?
	//
	//       it turns out the package which holds/generates the version info
	//       in netmaster actually can't be compiled in stock form:
	//       https://github.com/contiv/netplugin/blob/08c489615e6c898edd1a5a7ef2f2507b4d021fc0/version/version.go
	//
	//       a script is used to complete the package before it's used:
	//       https://github.com/contiv/netplugin/blob/08c489615e6c898edd1a5a7ef2f2507b4d021fc0/version/generate_version#L41-L55
	type netmasterVersionResponse struct {
		Version string `json:"Version"`
	}

	nvr := &netmasterVersionResponse{}

	if err := json.Unmarshal(data, nvr); err != nil {
		log.Debug("Unexpected response from netmaster:", string(data))
		return "", fmt.Errorf("failed to unmarshal response: %s", err.Error())
	}

	return nvr.Version, nil
}
