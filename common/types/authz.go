package types

import (
	"encoding/json"

	log "github.com/Sirupsen/logrus"

	"github.com/contiv/auth_proxy/common"
)

// Consts that will be used across different packages
const (

	// AuthProxyDir is the directory in the KV store
	// where directories and keys used by
	// auth proxy will be stored
	AuthProxyDir = "auth_proxy"

	// AuthZDir is the directory under which all
	// types.Authorizations state will be saved
	// in the KV store
	AuthZDir = AuthProxyDir + "/" + "authorizations"
)

// DatastoreDirectories is a list of all the directories in the datastore that
// our code assumes exist.  These will be automatically created whenever a
// state driver is initialized.
var DatastoreDirectories = []string{
	AuthZDir,
	AuthProxyDir + "/local_users",
	AuthProxyDir + "/principals",
}

//
// Authorization represents the dynamic policy that defines mapping of
// principals and their access claims to entities with certain capabilities.
//
// Principals are also called subjects. Entities are also called
// objects. Objects and the capabilities defined on them are termed as
// a claim's key and value.
//
//
//                              Capabilities
//                             (claim's value)
//        Principals    ------------------------->  Entities
//        (subjects)                              (objects or the claim's key)
//
//
// This is a many-to-many association - one principal will have access to many
// claims (e.g., for different tenants), and one claim (e.g., for a specific
// tenant) might be associated with many principals.
//
// All subject-object mappings must be unique - hence the primary key is a
// combination of the principal and claims' keys.
//
// Fields:
//  CommonState: Embedded common state struct (which will be part of all structs that implement
//               types.State)
//  UUID: unique ID for an authorization.
//  PrincipalName: Unique name of the subject; it could be a username or LDAP group name.
//  Local:    Bool indicating whether the principal is a local user. False indicates
//            that the principal is an LDAP group
//  ClaimKey: string encoding of the claim's key associated with the authorization
//  ClaimValue: string encoding of the claim's value associated with the
//    authorization
//
type Authorization struct {
	CommonState
	UUID          string `json:"uuid"`
	PrincipalName string `json:"principalName"`
	Local         bool   `json:"local"`
	ClaimKey      string `json:"claimKey"`
	ClaimValue    string `json:"claimValue"`
}

//
// "Schema" of how authorizations will be stored in the KV store
//
//
//  /[AuthZDir]/{AuthZID:[AuthZState]}
//
//       Key: Authorization UUID or AuthZID
//       Value: Authorization instance
//
//  e.g.
//  /authproxy/authorizations/{11111111: {
// 	                                   CommonState
//                                         UUID: "11111111"
//                                         PrincipalName: "test"
//                                         ClaimKey: "tenant:t1"
//                                         ClaimValue: "devops"
//                                      }
//                            }
//
//  /authproxy/authorizations/{22222222: {
// 	                                   CommonState
//                                         UUID: "22222222"
//                                         PrincipalName: "OU=auth,DC=auth,DC=example,DC=com"
//                                         ClaimKey: "tenant:t2"
//                                         ClaimValue: "devops"
//                                      }
//                            }
//
// For each authz instance, the claim key indicates the tenants (or
// other objects) that the authorization allows access to. The claim
// value indicates the type of capability or access that is allowed
// on the object in the claim-key. This capability can also be specified
// as a "role".
//

//
// BelongsToBuiltInAdmin determines if the authz belongs to the built-in local
// admin user.
//
func (a *Authorization) BelongsToBuiltInAdmin() bool {
	return a.Local && Admin.String() == a.PrincipalName
}

//
// Write adds an authz instance to the authz dir in the KV store
//
// Parameters:
//  (Receiver): authorization object on which operation is occurring
//
// Return Values:
//  error: Error received from StateDriver
//         nil if operation is successful
//
func (a *Authorization) Write() error {

	defer common.Untrace(common.Trace())

	// write the authz state
	key := AuthZDir + "/" + a.UUID
	return a.StateDriver.WriteState(key, a, json.Marshal)
}

//
// Clear removes an authz instance from the authz dir in the KV store
//
// Parameters:
//  (Receiver): authorization object on which operation is occurring
//  ID: of the authorization object
//
// Return Values:
//  error: Any error from the state driver
//         Nil if successful
//
func (a *Authorization) Clear() error {

	defer common.Untrace(common.Trace())
	log.Debug("deleting authorization:", a.UUID)
	key := AuthZDir + "/" + a.UUID
	return a.StateDriver.ClearState(key)
}

//
// Read looks up an authorization entry in the authz dir
//
// Parameters:
//  (Receiver): authorization object on which operation is occurring
//  UUID: of the authZ that needs to be read
//
// Return Values:
//  error: Any error from the state driver
//         Nil if successful
//
func (a *Authorization) Read(UUID string) error {

	defer common.Untrace(common.Trace())
	key := AuthZDir + "/" + UUID
	return a.StateDriver.ReadState(key, a, json.Unmarshal)
}

//
// ReadAll returns all authorizations in the authz dir
//
// Return Values:
//  []State: List of authorization states
//  error: Any error when reading from the KV store
//         nil if operation is successful
//
func (a *Authorization) ReadAll() ([]State, error) {

	defer common.Untrace(common.Trace())
	key := AuthZDir
	return a.StateDriver.ReadAllState(key, a, json.Unmarshal)
}

/*
//
// CapabilityType represents a capability that captures an operation
// specific authorization. These capabilities are associated with roles
// that are assigned to security principals.  Capabiliites themselves
// are not stored in an authorized token, but are derived from the role.
// A capability check is carried out by APIs to see if caller principal
// has a role that grants this capability.
//
type CapabilityType int

// TODO: Make these bitmasks
const (

	// Tenant specific capabilities
	capCreateTenant = iota
	capCreateTenant
	capUpdateTenant
	capDeleteTenant

	// Network specific capabilties
	capCreateNetwork
	capReadNetwork
	capUpdateNetwork
	capDeleteTenant

	// Define all capabilities before this
	capLast
)

func (typ CapabilityType) String() string {
	s := ""
	switch typ {
	case capCreateTenant:
		s += "capCreateTenant"
	case capReadTenant:
		s += "capReadTenant"
	case capUpdateTenant:
		s += "capUpdateTenant"
	case capDeleteTenant:
		s += "capDeleteTenant"

	case capCreateNetwork:
		s += "capCreateNetwork"
	case capReadNetwork:
		s += "capReadNetwork"
	case capUpdateNetwork:
		s += "capUpdateNetwork"
	case capDeleteNetwork:
		s += "capDeleteNetwork"
	}

	return s
}
*/
