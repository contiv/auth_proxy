package db

import (
	"path"

	"github.com/contiv/auth_proxy/common/types"
)

// This file contains all DS constants

// various data store paths.
var (
	RootLocalUsers        = "local_users"
	RootLdapConfiguration = "ldap_configuration"
	RootTokenSigningKey   = "token_signing_key"
)

// GetPath joins the given list of strings using path separator with `root` data store path.
func GetPath(strs ...string) string {
	str := types.AuthProxyDir
	for _, s := range strs {
		str = path.Join(str, s)
	}

	return str
}
