package ldap

import "github.com/contiv/ccn_proxy/common/types"

// This contains all the LDAP utility functions(PUTs and GETs from distributed store, etc.)

// GetADConfig returns LDAP configuration
func GetADConfig() *types.ADConfiguration {
	// FIXME: These details needs to be fetched from etcd/consul; to test this you need to have AD running and reachable.
	cfg := &types.ADConfiguration{
		Server:                 "localhost", //"10.193.231.158",
		Port:                   4563,
		BaseDN:                 "DC=ccn,DC=example,DC=com",
		ServiceAccountDN:       "CN=Service Account,CN=Users,DC=ccn,DC=example,DC=com", //"cn=admin,dc=example,dc=org",
		ServiceAccountPassword: "C1ntainer$",
		StartTLS:               false,
		InsecureSkipVerify:     true,
	}

	return cfg
}

// SetADConfig inserts the AD configuration to our data store
func SetADConfig(config *types.ADConfiguration) error {
	//TODO
	return nil
}

// UpdateADConfig updates the AD configuration that's already recorded
func UpdateADConfig(config *types.ADConfiguration) error {
	//TODO
	return nil
}
