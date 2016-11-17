package errors

import "errors"

var (
	// ErrADConnectionFailed used when connection couldn't be established with `Active Directory`
	ErrADConnectionFailed = errors.New("AD connection failed")

	// ErrADConfigNotFound used when AD configuration is not found from DB or config file or ?
	ErrADConfigNotFound = errors.New("AD configuration not found")

	// ErrADAccessDenied used when AD access is denied
	ErrADAccessDenied = errors.New("AD access denied")

	// ErrADGroupsNotFound used when AD user is associated with just primary group
	ErrADGroupsNotFound = errors.New("No groups found, cannot process")

	// ErrADMultipleEntries used when AD search returns multiple results when 1 is expected
	ErrADMultipleEntries = errors.New("Expected single entry; found multiple entries in AD")

	// ErrLocalAuthenticationFailed used when local authentication fails
	ErrLocalAuthenticationFailed = errors.New("Local authentication failed")

	// ErrIllegalArgument used whenever an unexpected parameter/argument is encountered
	ErrIllegalArgument = errors.New("Illegal argument")

	// ErrUserNotFound used when the user is found
	ErrUserNotFound = errors.New("User not found")
)
