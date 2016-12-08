package common

import (
	"net/http"
	"runtime"
	"strings"

	log "github.com/Sirupsen/logrus"
)

// IsEmpty checks if the given string is empty or not
// params:
//  str: string that needs to be checked
// return values:
//  true if the string is empty otherwise false
func IsEmpty(str string) bool {
	return len(strings.TrimSpace(str)) == 0
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

// SetJSONContentType sets the Content-Type header to JSON.
func SetJSONContentType(w http.ResponseWriter) {
	// the charset here is to work around a bug where Chrome does not parse JSON data properly:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=438464
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
}
