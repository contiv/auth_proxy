package errors

import (
	"errors"
	"strconv"
)

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

//
// Error codes
//
const (
	None = iota
	NotImplemented

	KeyNotFound
	CommonStateFieldsMissing
	InvalidCall

	StateDriverNotCreated

	KeyExists
	IllegalOperation
	// N.B. Add all new error codes above this line.  All error codes >=
	// LastError are invalid.
	LastError
)

//
// Constant error values
//

// ErrNotImplemented indicates that the function desired is not implemented
var ErrNotImplemented = NewError(NotImplemented, "not implemented")

// ErrKeyNotFound indicates the error condition when a key is  not found in the state
// store (which could be etcd or consul)
var ErrKeyNotFound = NewError(KeyNotFound, "key not found")

// ErrCommonStateFieldsMissing indicates an error condition when the expected fields
// defined by the struct core.CommonState were not found as expected
var ErrCommonStateFieldsMissing = NewError(CommonStateFieldsMissing, "expected fields missing")

// ErrInvalidCall indicates an error condition when an invalid call to a method or
// function is being made
var ErrInvalidCall = NewError(InvalidCall, "invalid method or function call")

// ErrStateDriverNotCreated is used when the state driver is not initialized
var ErrStateDriverNotCreated = NewError(StateDriverNotCreated, "state driver not created")

// ErrKeyExists is used when the key already exists in the data store during insertion
var ErrKeyExists = NewError(KeyExists, "key exists already in data store")

// ErrIllegalOperation is used when the user performs an operation which is not permitted in our system
// e.g. updating/deleting built-in users
var ErrIllegalOperation = NewError(IllegalOperation, "illegal operation")

//
// CCNError describes an error response message used by CCN APIs
//
// Field:
//  code: error code
//  message: Textual description of the error
//
type CCNError struct {
	Code    int
	Message string
}

//
// Error returns a textual representation of a CCNError
//
// Parameters:
//  (Receiver): CCNError to which this function applies
//
// Return values:
//  string: string representation of this CCNError
//
func (ccne *CCNError) Error() string {
	return strconv.Itoa(ccne.Code) + ":" + ccne.Message
}

//
// NewError creates a new CCNError with the supplied parameters
//
// Parameters:
//  code: error code of this CCNError
//  message: string representation of this CCNError
//
// Return values:
//  CCNError: a new CCNError object providing the desired error
//      message and error code
//
func NewError(code int, message string) error {
	return &CCNError{code, message}
}
