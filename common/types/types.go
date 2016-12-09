package types

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/errors"
)

// DerivedFromPrincipalRole is a constant that is used to indicate
// that the capability or access level (i.e. ClaimValue) to an
// object (specified in ClaimKey, e.g: "tenant: TenantA") is based
// on the principal's role. A principal's role is defined in
// each Principal's object:
//          e.g. Principal {UUID: "xxxx", Role: "admin|ops"}
const DerivedFromPrincipalRole string = "DerivedFromPrincipalRole"

// ADConfiguration entry
//
// Fields:
//  Server: FQDN or IP address of AD server
//  Port: listening port of AD server
//  BaseDN: Distinguished name for base entity. E.g.,
//    dc=ccn, dc=example, dc=com. All searches be scoped to this BaseDN
//  ServiceAccountDN: service account details. Requires full DN. Our system
//    will use this account to communicate with AD. Hence this
//    account must have appropriate privileges, specifically for lookup
//  ServiceAccountPassword: password of the service account
//  StartTLS: if set, connection with AD will be established using TLS
//  InsecureSkipVerify: if set, skips insecurity verification
//
type ADConfiguration struct {
	Server                 string
	Port                   uint16
	BaseDN                 string
	ServiceAccountDN       string
	ServiceAccountPassword string `sql:"size:4096"`
	StartTLS               bool
	InsecureSkipVerify     bool
}

// RoleType each role type is associated with a group and set of capabilities
type RoleType uint

// Set of pre-defined roles here
const (
	Admin   RoleType = iota // can perform any operation
	Ops                     // restricted to only assigned tenants
	Invalid                 // Invalid role, this needs to be the last role
)

// Tenant is a type to represent the name of the tenant in CCN
type Tenant string

//
// Principal represents a 'user' to 'role' association. A 'user' can have many
// 'roles', and thus can have multiple principals representing it during a
// 'session'. This set is also known as the active role set (ARS).
//
// A CCN local user is a simplified version of this association, where the
// mapping is 1:1 - i.e., a CCN local user can have only one pre-defined role.
//
// A CCN ldap group (representing a LDAP group in some active directory forest)
// also has a 1:1 mapping with a principal. However, since a 'user' can be part
// of multiple ldap groups, the ARS will be determined at the time
// authentication is carried out, and may comprise of multiple principals.
//
// Fields:
//  UUID: unique identifier of the principal
//  Role: Role associated with a principal
//
type Principal struct {
	UUID string   `json:"uuid"`
	Role RoleType `json:"roletype"`
}

// String returns the string representation of `RoleType`
func (role RoleType) String() string {
	switch role {
	case Ops:
		return "ops"
	case Admin:
		return "admin"
	default:
		log.Debug("Illegal role type")
		return ""
	}
}

// Role returns the `RoleType` of given string
func Role(roleStr string) (RoleType, error) {
	switch roleStr {
	case Admin.String():
		return Admin, nil
	case Ops.String():
		return Ops, nil
	default:
		log.Debug("Illegal role")
		return Invalid, errors.ErrIllegalArgument
	}

}

// LocalUser information
//
// Fields:
//  UserName: of the user. Read only field. Must be unique.
//  Password: of the user. Not stored anywhere. Used only for updates.
//  Disable: if authorizations for this local user is disabled.
//
type LocalUser struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Disable  bool   `json:"disable"`
}

// InternalLocalUser information
//
// Fields:
//  UserName: inherited from LocalUser
//  Password: inherited from LocalUser. Not stored anywhere. Used to update password hash.
//  Disble: inherited from LocalUser.
//  Principal: associated principal object.
//  PrincipalID: For each local user, there should be a principal created in the system.
//  PasswordHash: of the password string.
//
type InternalLocalUser struct {
	LocalUser
	Principal    Principal
	PrincipalID  string `json:"principal_id"`
	PasswordHash []byte `json:"password_hash"`
}

// LdapConfiguration represents the LDAP/AD configuration.
// All the connection to LDAP/AD is established using this details.
//
// Fields:
//  Server: FQDN or IP address of LDAP/AD server
//  Port: listening port of LDAP/AD server
//  BaseDN: Distinguished name for base entity.
//          E.g., ou=eng,dc=ccn,dc=com. All search queries will be scope to this BaseDN.
//  ServiceAccountDN: DN of the service account. ccn_proxy will use this
//                    account to communicate with LDAP/AD. Hence this account
//                    must have appropriate privileges, specifically for lookup.
//  ServiceAccountPassword: of the service account
type LdapConfiguration struct {
	Server                 string `json:"server"`
	Port                   uint16 `json:"port"`
	BaseDN                 string `json:"base_dn"`
	ServiceAccountDN       string `json:"service_account_dn"`
	ServiceAccountPassword string `json:"service_account_password,omitempty"`
	StartTLS               bool   `json:"start_tls"`
	InsecureSkipVerify     bool   `json:"insecure_skip_verify"`
}

//
// KVStoreConfig encapsulates config data that determines KV store
// details specific to a running instance of CCN_proxy
//
// Fields:
//   StoreURL: URL of the distributed key-value store
//             that will be shared by CCN proxy and CCN
//
type KVStoreConfig struct {
	StoreURL string `json:"kvstore-url"`
}

//
// WatchState encapsulates changes in the state stored in the KV store
// and constitutes both the current and previous state
//
// Fields:
//   Curr: current state for a key in the KV store
//   Prec: previous state for a key in the KV store
//
type WatchState struct {
	Curr State
	Prev State
}

//
// CommonState defines the fields common to all types.State
// implementations. This struct will be embedded as an anonymous
// field in all structs that implement types.State
//
// Fields:
//   StateDriver: etcd or consul statedriver
//   ID:          identifier for the state
//
type CommonState struct {
	StateDriver StateDriver `json:"-"`
	ID          string      `json:"id"`
}
