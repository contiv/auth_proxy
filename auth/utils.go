package auth

import "strings"

// IsEmpty checks if the given string is empty or not
// params:
//  str: string that needs to be checked
// return values:
//  true if the string is empty otherwise false
func IsEmpty(str string) bool {
	return len(strings.TrimSpace(str)) == 0
}
