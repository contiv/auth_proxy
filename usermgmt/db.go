package usermgmt

import "path"

// This file contains all DS constants + functions related to local user management.

// various data store paths.
var (
	root           = "/ccn_proxy"
	RootLocalUsers = "local_users"
	RootPrincipals = "principals"
)

// GetPath joins the given list of strings using path separator with `root` data store path.
func GetPath(strs ...string) string {
	str := root
	for _, s := range strs {
		str = path.Join(str, s)
	}

	return str
}
