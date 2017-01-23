package db

import (
	"encoding/json"
	"fmt"

	"github.com/contiv/auth_proxy/common"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/auth_proxy/state"
)

// getLdapConfiguration helper function to retrieve LDAP configuration from the data store.
// It also decrypts the encrypted password obtained from store.
// params:
//  stateDrv: data store driver object
//  *types.LdapConfiguration: reference to LDAP configuration object
//  error: nil on successful fetch otherwise anything as returned
//         by consecutive calls or any relevant custom error
func getLdapConfiguration(stateDrv types.StateDriver) (*types.LdapConfiguration, error) {
	rawData, err := stateDrv.Read(GetPath(RootLdapConfiguration))
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			return nil, err
		}

		return nil, fmt.Errorf("Failed to read ldap setting from data store: %#v", err)
	}

	ldapConfiguration := &types.LdapConfiguration{}
	if err := json.Unmarshal(rawData, &ldapConfiguration); err != nil {
		return nil, fmt.Errorf("Failed to unmarshal ldap setting %#v: %#v", rawData, err)
	}

	return ldapConfiguration, nil
}

// UpdateLdapConfiguration updates the existing LDAP configuration with the new configuration given.
// params:
//  ldapConfiguration: representation of the LDAP configuration to be updated to data store
// return values:
//  error: nil on successful update, otherwise anything as returned
//         by the consecutive function calls or any relevant custom error
func UpdateLdapConfiguration(ldapConfiguration *types.LdapConfiguration) error {
	err := DeleteLdapConfiguration()
	switch err {
	case nil:
		return AddLdapConfiguration(ldapConfiguration)
	case auth_errors.ErrKeyNotFound:
		return err
	default:
		return fmt.Errorf("Failed to delete LDAP configuration from data store : %#v", err)
	}

}

// GetLdapConfiguration retrieves LDAP configuration from the data store.
// return values:
//  *types.LdapConfiguration: reference to the LDAP configuration fetched from data store
//  error: as returned by `state.GetStateDriver/getLdapConfiguration`
func GetLdapConfiguration() (*types.LdapConfiguration, error) {
	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}

	return getLdapConfiguration(stateDrv)
}

// DeleteLdapConfiguration deletes LDAP configuration from the data store.
// return values:
//  error: nil on successful deletion of `/auth_proxy/ldap_configuration`
//         otherwise any error as returned by consecutive function calls or relevant custom error
func DeleteLdapConfiguration() error {
	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return err
	}

	if _, err := getLdapConfiguration(stateDrv); err != nil {
		return err
	}

	if err := stateDrv.Clear(GetPath(RootLdapConfiguration)); err != nil {
		return fmt.Errorf("Failed to clear LDAP setting from data store: %#v", err)
	}

	return nil
}

// AddLdapConfiguration adds the given LDAP configuration to the data store (/auth_proxy/ldap_configuration).
// params:
//  ldapConfiguration: representation of the LDAP configuration to be added to data store
// return values:
//  error: nil on successful insertion of `ldapConfiguration` into the store
//         otherwise auth_errors.ErrKeyExists or any relevant custom error
func AddLdapConfiguration(ldapConfiguration *types.LdapConfiguration) error {
	stateDrv, err := state.GetStateDriver()
	if err != nil {
		return err
	}

	_, err = getLdapConfiguration(stateDrv)
	switch err {
	case nil:
		return auth_errors.ErrKeyExists
	case auth_errors.ErrKeyNotFound:
		ldapConfiguration.ServiceAccountPassword, err = common.Encrypt(ldapConfiguration.ServiceAccountPassword)
		if err != nil {
			return fmt.Errorf("Failed to encrypt LDAP service account password: %#v", err)
		}

		val, err := json.Marshal(ldapConfiguration)
		if err != nil {
			return fmt.Errorf("Failed to marshal LDAP configuration %#v, %#v", ldapConfiguration, err)
		}

		if err := stateDrv.Write(GetPath(RootLdapConfiguration), val); err != nil {
			return fmt.Errorf("Failed to write LDAP setting to data store: %#v", err)
		}

		return nil
	default:
		return err
	}

}
