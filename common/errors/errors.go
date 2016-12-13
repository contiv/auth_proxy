package errors

import "strconv"

//
// Error codes
//
const (
	None = iota
	NotImplemented

	KeyNotFound
	CommonStateFieldsMissing
	InvalidCall
	ReadingFromStore

	Unauthorized
	IllegalArguments
	UnsupportedType
	ParsingToken
	Internal
	ParsingRequest
	UnmarshalingBody
	UpdateAuthorization
	PartialFailureToAddAuthz
	PartialFailureToUpdateAuthz
	StateDriverNotCreated
	KeyExists
	IllegalOperation
	AccessDenied

	UserNotFound
	LDAPConfigurationNotFound
	LDAPConnectionFailed
	LDAPAccessDenied
	LDAPGroupsNotFound
	LDAPMultipleEntries
	LocalAuthenticationFailed

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

// ErrAccessDenied is used when the user access is denied
var ErrAccessDenied = NewError(AccessDenied, "Access Denied")

// ErrReadingFromStore indicates an error condition while reading from the KV store
var ErrReadingFromStore = NewError(ReadingFromStore, "error reading from KV store")

// ErrUnauthorized indicates that an authorization doesn't have a claim
var ErrUnauthorized = NewError(Unauthorized, "unauthorized access")

// ErrIllegalArguments indicates that illegal arguments were received for
// an API call
var ErrIllegalArguments = NewError(IllegalArguments, "illegal arguments")

// ErrUnsupportedType indicates that an unsupported object type was used
// in a function or method call, e.g. checkAccessClaim
var ErrUnsupportedType = NewError(UnsupportedType, "Unsupported object type")

// ErrParsingToken indicates an error when trying to parse
// an authorization token
var ErrParsingToken = NewError(ParsingToken, "failed to parse authz token")

// ErrInternal is returned from functions where internal logic runs into inconsistency issues.
var ErrInternal = NewError(Internal, "an internal error has occurred")

// ErrParsingRequest indicates an error parsing the incoming HTTP request
var ErrParsingRequest = NewError(ParsingRequest, "failed to parse HTTP request body")

// ErrUnmarshalingBody indicates an error unmarshalling request body
var ErrUnmarshalingBody = NewError(UnmarshalingBody, "failed to unmarshall request body")

// ErrUpdateAuthorization indicates an error when updating an authorization
var ErrUpdateAuthorization = NewError(UpdateAuthorization, "failed to update authorization")

// ErrPartialFailureToAddAuthz indicates an error when a new authorizatin is being added to CCN
var ErrPartialFailureToAddAuthz = NewError(PartialFailureToAddAuthz, "failed to add authorization")

// ErrPartialFailureToUpdateAuthz indicates an error when an authorization is being update
var ErrPartialFailureToUpdateAuthz = NewError(PartialFailureToUpdateAuthz, "failed to update authorization")

// ErrUserNotFound used when the user is found
var ErrUserNotFound = NewError(UserNotFound, "User not found")

// ErrLDAPConfigurationNotFound used when LDAP/AD configuration is not found from the data store
var ErrLDAPConfigurationNotFound = NewError(LDAPConfigurationNotFound, "LDAP/AD settings not found")

// ErrLDAPConnectionFailed used when connection couldn't be established with `LDAP/Active Directory`
var ErrLDAPConnectionFailed = NewError(LDAPConnectionFailed, "LDAP/AD connection failed")

// ErrLDAPAccessDenied used when LDAP/AD access is denied
var ErrLDAPAccessDenied = NewError(LDAPAccessDenied, "LDAP/AD access denied")

// ErrLDAPGroupsNotFound used when LDAP/AD user is associated with just primary group
var ErrLDAPGroupsNotFound = NewError(LDAPGroupsNotFound, "No groups found, cannot process")

// ErrLDAPMultipleEntries used when LDAP/AD search returns multiple results when 1 is expected
var ErrLDAPMultipleEntries = NewError(LDAPMultipleEntries, "Expected single entry; found multiple entries in AD")

// ErrLocalAuthenticationFailed used when local authentication fails
var ErrLocalAuthenticationFailed = NewError(LocalAuthenticationFailed, "Local authentication failed")

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
