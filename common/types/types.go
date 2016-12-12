package types

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/errors"
)

const (
	// TenantClaimKey is a prefix added to Claim keys in the
	// authorization or token object to represent tenants
	TenantClaimKey = "tenant:"
)

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
		log.Debugf("Unsupported role %q", roleStr)
		return Invalid, errors.ErrUnsupportedType
	}

}

// LocalUser information
//
// Fields:
//  UserName: of the user. Read only field. Must be unique.
//  Password: of the user. Not stored anywhere. Used only for updates.
//  Disable: if authorizations for this local user is disabled.
//  PasswordHash: of the password string.
//
type LocalUser struct {
	Username     string `json:"username"`
	Password     string `json:"password,omitempty"`
	Disable      bool   `json:"disable"`
	PasswordHash []byte `json:"password_hash,omitempty"`
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
