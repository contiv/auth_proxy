package common

import (
	"net/http"
	"strings"
)

// IsEmpty checks if the given string is empty or not
// params:
//  str: string that needs to be checked
// return values:
//  true if the string is empty otherwise false
func IsEmpty(str string) bool {
	return len(strings.TrimSpace(str)) == 0
}

// SetJSONContentType sets the Content-Type header to JSON.
func SetJSONContentType(w http.ResponseWriter) {
	// the charset here is to work around a bug where Chrome does not parse JSON data properly:
	// https://bugs.chromium.org/p/chromium/issues/detail?id=438464
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
}
