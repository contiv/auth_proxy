package types

import (
	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/errors"
)

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
	UUID string
	Role RoleType
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
