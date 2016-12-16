package db

import (
	"path"

	"github.com/contiv/ccn_proxy/common/types"
)

// This file contains all DS constants

// various data store paths.
var (
	RootLocalUsers        = "local_users"
	RootLdapConfiguration = "ldap_configuration"
)

// GetPath joins the given list of strings using path separator with `root` data store path.
func GetPath(strs ...string) string {
	str := types.CCNProxyDir
	for _, s := range strs {
		str = path.Join(str, s)
	}

	return str
}
