package proxy

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	log "github.com/Sirupsen/logrus"

	"github.com/contiv/ccn_proxy/auth"
	"github.com/contiv/ccn_proxy/common"
	ccnerrors "github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	"github.com/contiv/ccn_proxy/db"
)

// This file contains all the HTTP handler helper functions.

// updateLdapConfigurationInfo helper function for `updateLdapConfigurationHelper`.
// params:
//  ldapConfiguration: configuration to be updated in the data store
//  actual: existing configuration in the data store
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          this could be an error message or JSON response based on the execution flow or nil
func updateLdapConfigurationInfo(ldapConfiguration *types.LdapConfiguration, actual *types.LdapConfiguration) (int, []byte) {
	ldapConfigurationUpdateObj := &types.LdapConfiguration{
		Server:                 actual.Server,
		Port:                   actual.Port,
		BaseDN:                 actual.BaseDN,
		ServiceAccountDN:       actual.ServiceAccountDN,
		ServiceAccountPassword: actual.ServiceAccountPassword,
		StartTLS:               actual.StartTLS,
		InsecureSkipVerify:     actual.InsecureSkipVerify,
	}

	// update `Server`
	if !common.IsEmpty(ldapConfiguration.Server) {
		ldapConfigurationUpdateObj.Server = ldapConfiguration.Server
	}

	// update `Port`; Range checking 0-65535 is not needed as `Port` is of type `uint16`
	if ldapConfiguration.Port > 0 {
		ldapConfigurationUpdateObj.Port = ldapConfiguration.Port
	}

	// update `BaseDN`
	if !common.IsEmpty(ldapConfiguration.BaseDN) {
		ldapConfigurationUpdateObj.BaseDN = ldapConfiguration.BaseDN
	}

	// update `ServiceAccountDN`
	if !common.IsEmpty(ldapConfiguration.ServiceAccountDN) {
		ldapConfigurationUpdateObj.ServiceAccountDN = ldapConfiguration.ServiceAccountDN
	}

	// update `ServiceAccountPassword`
	if !common.IsEmpty(ldapConfiguration.ServiceAccountPassword) {
		ldapConfigurationUpdateObj.ServiceAccountPassword = ldapConfiguration.ServiceAccountPassword
	}

	// update `StartTLS`
	if actual.StartTLS != ldapConfiguration.StartTLS {
		ldapConfigurationUpdateObj.StartTLS = ldapConfiguration.StartTLS
	}

	// update `InsecureSkipVerify`
	if actual.InsecureSkipVerify != ldapConfiguration.InsecureSkipVerify {
		ldapConfigurationUpdateObj.InsecureSkipVerify = ldapConfiguration.InsecureSkipVerify
	}

	err := db.UpdateLdapConfiguration(ldapConfigurationUpdateObj)

	switch err {
	case nil:
		ldapConfigurationUpdateObj.ServiceAccountPassword = ""
		jData, err := json.Marshal(ldapConfigurationUpdateObj)
		if err != nil {
			return http.StatusInternalServerError, []byte(err.Error())
		}

		return http.StatusOK, jData
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	default:
		log.Debugf("Failed to delete LDAP configuration: %#v", err)
		return http.StatusInternalServerError, []byte("Failed to delete LDAP setting from the data store")
	}

}

// updateLdapConfigurationHelper helper function to update LDAP configuration in the data store.
// params:
//  ldapConfiguration: configuration to be updated in the data store
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          this could be an error message or JSON response based on the execution flow or nil
func updateLdapConfigurationHelper(ldapConfiguration *types.LdapConfiguration) (int, []byte) {
	actual, err := db.GetLdapConfiguration()

	switch err {
	case nil:
		return updateLdapConfigurationInfo(ldapConfiguration, actual)
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	default:
		log.Debugf("Failed to retrieve LDAP configuration: %#v", err)
		return http.StatusInternalServerError, []byte("Failed to retrieve LDAP setting from the data store")
	}

}

// deleteLdapConfigurationHelper helper function to delete LDAP configuration from the data store.
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          this could be an error message or JSON response based on the execution flow or nil
func deleteLdapConfigurationHelper() (int, []byte) {
	err := db.DeleteLdapConfiguration()

	switch err {
	case nil:
		return http.StatusNoContent, nil
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	default:
		log.Debugf("Failed to delete LDAP configuration: %#v", err)
		return http.StatusInternalServerError, []byte("Failed to delete LDAP configuration from the data store")
	}

}

// getLdapConfigurationHelper helper function to retrieve LDAP configuration from the data store.
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          this could be an error message or JSON response based on the execution flow or nil
func getLdapConfigurationHelper() (int, []byte) {
	ldapConfiguration, err := db.GetLdapConfiguration()

	switch err {
	case nil:
		// return the configuration with no password
		ldapConfiguration.ServiceAccountPassword = ""
		jData, err := json.Marshal(ldapConfiguration)
		if err != nil {
			return http.StatusInternalServerError, []byte(err.Error())
		}

		return http.StatusOK, jData
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	default:
		log.Debugf("Failed to retrieve LDAP configuration: %#v", err)
		return http.StatusInternalServerError, []byte("Failed to retrieve LDAP configuration from the data store")
	}

}

// addLdapConfigurationHelper helper function to add given ldap configuration to the data store.
// params:
//  ldapConfiguration: configuration to be added to the data store
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          this could be an error message or JSON response based on the execution flow
func addLdapConfigurationHelper(ldapConfiguration *types.LdapConfiguration) (int, []byte) {
	if common.IsEmpty(ldapConfiguration.Server) || (ldapConfiguration.Port == 0 || ldapConfiguration.Port > 65535) {
		return http.StatusBadRequest, []byte("Invalid Server/Port details")
	}

	if common.IsEmpty(ldapConfiguration.ServiceAccountDN) || common.IsEmpty(ldapConfiguration.ServiceAccountPassword) {
		return http.StatusBadRequest, []byte("Empty service account DN/Password")
	}

	if common.IsEmpty(ldapConfiguration.BaseDN) {
		return http.StatusBadRequest, []byte("Empty base DN")
	}

	err := db.AddLdapConfiguration(ldapConfiguration)

	switch err {
	case nil:
		// return same object with no password
		ldapConfiguration.ServiceAccountPassword = ""
		jData, err := json.Marshal(ldapConfiguration)
		if err != nil {
			return http.StatusInternalServerError, []byte(err.Error())
		}

		return http.StatusCreated, jData
	case ccnerrors.ErrKeyExists:
		return http.StatusBadRequest, []byte("LDAP setttings exists already. Request `update` if some config needs change")
	default:
		log.Debugf("Failed to add LDAP configuration: %#v", err)
		return http.StatusInternalServerError, []byte("Failed to add LDAP configuration to the system")
	}

}

// getLocalUserHelper helper function to get the details of given username.
// params:
//  username: of the user to fetch details from the data store
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          on successful fetch from data store, it contains `types.LocalUser` object
func getLocalUserHelper(username string) (int, []byte) {
	user, err := db.GetLocalUser(username)

	switch err {
	case nil:
		user.Password = ""
		user.PasswordHash = []byte{}

		jData, err := json.Marshal(user)
		if err != nil {
			return http.StatusInternalServerError, []byte(err.Error())
		}

		return http.StatusOK, jData
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	default:
		return http.StatusInternalServerError, []byte(err.Error())
	}

}

// getLocalUsersHelper helper function to get the list of local users.
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
//          on successful fetch from data store, it contains the list of localuser objects
func getLocalUsersHelper() (int, []byte) {
	users, err := db.GetLocalUsers()
	if err != nil {
		return http.StatusInternalServerError, []byte(err.Error())
	}

	localUsers := []types.LocalUser{}
	for _, user := range users {
		lu := types.LocalUser{
			Username: user.Username,
			Disable:  user.Disable,
		}

		localUsers = append(localUsers, lu)
	}

	jData, err := json.Marshal(localUsers)
	if err != nil {
		log.Debug("Failed to marshal %#v: %#v", jData, err)
		return http.StatusInternalServerError, []byte(fmt.Sprintf("Failed to fetch local users"))
	}

	return http.StatusOK, jData
}

// updateLocalUserInfo helper function for updateLocalUserHelper.
// params:
//  username: of the user to be updated
//  updateReq: to be updated in the data store
//  actual: existing user details fetched from the data store for user `username`
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
func updateLocalUserInfo(username string, updateReq *types.LocalUser, actual *types.LocalUser) (int, []byte) {
	updatedUserObj := &types.LocalUser{
		// username == actual.Username
		Username:     actual.Username,
		Disable:      actual.Disable,
		PasswordHash: actual.PasswordHash,
		// `Password` will be empty
	}

	// Update `disable`
	if actual.Disable != updateReq.Disable {
		updatedUserObj.Disable = updateReq.Disable
	}

	// Update `password`
	if !common.IsEmpty(updateReq.Password) {
		updatedUserObj.Password = updateReq.Password
	}

	err := db.UpdateLocalUser(username, updatedUserObj)
	switch err {
	case nil:
		updatedUserObj.Password = ""
		updatedUserObj.PasswordHash = []byte{}

		jData, err := json.Marshal(updatedUserObj)
		if err != nil {
			return http.StatusInternalServerError, []byte(err.Error())
		}

		return http.StatusOK, jData
	case ccnerrors.ErrKeyNotFound: // from DeleteLocalUser()
		return http.StatusNotFound, nil
	case ccnerrors.ErrIllegalOperation:
		return http.StatusBadRequest, []byte(fmt.Sprintf("Cannot update built-in user %q", username))
	default:
		return http.StatusInternalServerError, []byte(err.Error())
	}

}

// updateLocalUserHelper helper function to update the existing user details in the data store.
// params:
// username: of the user to be updated
// userUpdateReq: *localUserCreateRequest contains the fields to be updated
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
func updateLocalUserHelper(username string, userUpdateReq *types.LocalUser) (int, []byte) {
	if common.IsEmpty(username) {
		return http.StatusBadRequest, []byte("Empty username")
	}

	localUser, err := db.GetLocalUser(username)
	switch err {
	case nil:
		return updateLocalUserInfo(username, userUpdateReq, localUser)
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	default:
		return http.StatusInternalServerError, []byte(err.Error())
	}

}

// deleteLocalUserHelper helper function to delete given user from the data store.
// params:
//  username: of the user to be deleted from store
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
func deleteLocalUserHelper(username string) (int, []byte) {
	if common.IsEmpty(username) {
		return http.StatusBadRequest, []byte("Empty username")
	}

	err := db.DeleteLocalUser(username)
	switch err {
	case nil:
		return http.StatusNoContent, nil
	case ccnerrors.ErrKeyNotFound:
		return http.StatusNotFound, nil
	case ccnerrors.ErrIllegalOperation:
		return http.StatusBadRequest, []byte(fmt.Sprintf("Cannot delete built-in user %q", username))
	default:
		return http.StatusInternalServerError, []byte(err.Error())
	}
}

// addLocalUserHelper helper function to add given user to the data store.
// params:
//  userCreateReq: *types.LocalUser request object; to be added to the store
// return values:
//  int: http status code
//  []byte: http response message; this goes along with status code
func addLocalUserHelper(userCreateReq *types.LocalUser) (int, []byte) {
	if common.IsEmpty(userCreateReq.Username) || common.IsEmpty(userCreateReq.Password) {
		return http.StatusBadRequest, []byte("Username/Password is empty")
	}

	err := db.AddLocalUser(userCreateReq)
	switch err {
	case nil:
		userCreateReq.Password = ""
		userCreateReq.PasswordHash = []byte{}

		jData, err := json.Marshal(userCreateReq)
		if err != nil {
			log.Debugf("Failed to marshal %#v: %#v", userCreateReq, err)
			return http.StatusInternalServerError, []byte(fmt.Sprintf("Failed to add local user %q to the system", userCreateReq.Username))
		}

		return http.StatusCreated, jData
	case ccnerrors.ErrKeyExists:
		return http.StatusBadRequest, []byte(fmt.Sprintf("User %q exists already", userCreateReq.Username))
	default:
		log.Debugf("Failed to add local user %#v: %#v", userCreateReq, err)
		return http.StatusInternalServerError, []byte(fmt.Sprintf("Failed to add local user %q to the system", userCreateReq.Username))
	}

}

// isTokenValid checks if the given token string is valid(correctness, expiry, etc.) and writes
// the respective http response based on the validation.
// params:
//  tokenStr: token string obtained from the http request
//  w: http response writer
// return values:
//  bool: boolean representing the token validatity
//  *auth.Token: token object parsed from the tokenStr
func isTokenValid(tokenStr string, w http.ResponseWriter) (bool, *auth.Token) {
	if common.IsEmpty(tokenStr) {
		authError(w, http.StatusUnauthorized, "Empty auth token")
		return false, nil
	}

	// NOTE: our current implementation focuses on just two local users admin(superuser) and ops(only network operations).
	// this is mainly to provide some basic difference between two users
	// this needs to be fine-grained once we have the backend and capabilities defined

	token, err := auth.ParseToken(tokenStr)
	if err != nil {
		authError(w, http.StatusBadRequest, "Bad token")
		return false, nil
	}

	// TODO: Check if the user is still active (~disable/~delete)
	return true, token
}

//
// processStatusCodes processes the given statusCode and
// writes the respective http response using the given writer.
// params:
//  statusCode: integer representing the http status code
//  resp: response to be written along with statusCode
//  w: http response writer
//
func processStatusCodes(statusCode int, resp []byte, w http.ResponseWriter) {
	common.SetJSONContentType(w)
	switch statusCode {
	case http.StatusCreated, http.StatusOK:
		w.WriteHeader(statusCode)
		w.Write(resp)
	case http.StatusNotFound, http.StatusNoContent:
		w.WriteHeader(statusCode)
	default: //InternalServerError, BadRequest, etc..
		respStr := string(resp)
		log.Println(respStr)
		w.WriteHeader(statusCode)
		writeJSONResponse(w, errorResponse{Error: respStr})
	}
}

//
// getTokenFromHeader retrieves the token from an HTTP request
// header
//
// Parameters:
//   req: HTTP request from whose header the authz token needs to be
//        retrieved
//
// Return values:
//   string: token as a string
//   err:    ccnerrors.ErrParsingToken
//           nil if token is retrieved successfully
//
func getTokenFromHeader(req *http.Request) (string, error) {

	defer common.Untrace(common.Trace())
	var err error
	tokenStr := req.Header.Get("X-Auth-Token")
	if common.IsEmpty(tokenStr) {
		err = ccnerrors.ErrParsingToken
	}
	return tokenStr, err
}

// writeJSONResponse writes the given data in JSON format.
func writeJSONResponse(w http.ResponseWriter, data interface{}) {
	jData, err := json.Marshal(data)
	if err != nil {
		log.Fatalln(err)
		return
	}

	w.Write(jData)
}

//
// convertAuthz converts the Authorization object into reply struct
// for Add tenant authorization and Get tenant authorization API
// calls
//
// Parameter:
//   authz: Authorization object
//
// Return values:
//   GetAuthorizationReply: Reply struct for add and get tenant
//                          authorization APIs
//
func convertAuthz(authz types.Authorization) GetAuthorizationReply {
	getAuthzReply := GetAuthorizationReply{
		AuthzUUID:     authz.UUID,
		PrincipalName: authz.PrincipalName,
		TenantName:    strings.TrimPrefix(authz.ClaimKey, types.TenantClaimKey),
		Local:         authz.Local,
		Role:          authz.ClaimValue,
	}
	return getAuthzReply
}
