package ldap

import (
	"crypto/tls"
	"fmt"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/errors"
	"github.com/contiv/ccn_proxy/common/types"
	ldap "github.com/go-ldap/ldap"
)

// This library contains APIs to talk to `Active Directory` using LDAP client
// NOTE: http://lists.freeradius.org/pipermail/freeradius-users/2012-August/062055.html
// Due to the issue mentioned in above link, we wont work with user who is just part of primary group

// Manager provides the implementation of LDAP Manager
// fields:
//   ldap: AD configuration
type Manager struct {
	Config types.ADConfiguration
}

// Authenticate authenticates the given username and password against `AD` using LDAP client
// params:
//  username: username to authenticate
//  password: password of the user
// return values:
//  error: nil on successful authentication otherwise ErrADAccessDenied, ErrADUserNotFound, etc.
func (lm *Manager) Authenticate(username, password string) ([]*types.Principal, error) {
	// list of attributes to be fetched from the matching records
	var attributes = []string{
		"memberof",
	}

	// establish a connection with AD server
	ldapConn, err := lm.connect()
	if err != nil {
		return nil, err
	}

	defer ldapConn.Close()

	// bind AD service account to perform search using the connection established above
	if err := ldapConn.Bind(lm.Config.ServiceAccountDN, lm.Config.ServiceAccountPassword); err != nil {
		log.Errorf("LDAP bind operation failed for AD service account %q: %v", lm.Config.ServiceAccountDN, err)
		return nil, errors.ErrADAccessDenied
	}

	searchRequest := ldap.NewSearchRequest(
		lm.Config.BaseDN,
		ldap.ScopeWholeSubtree, ldap.DerefAlways, 0, 0, false,
		"(&(objectClass=user)(sAMAccountName="+username+"))", // query is targeted for user entity
		attributes,
		nil)

	// search LDAP for the given `username`
	searchRes, err := ldapConn.Search(searchRequest)
	if err != nil {
		log.Errorf("LDAP search operation failed for %q: %v", username, err)
		return nil, errors.ErrADAccessDenied
	} else if len(searchRes.Entries) == 0 { // none matched the search criteria
		log.Errorf("User %q not found in AD server", username)
		return nil, errors.ErrADUserNotFound
	} else if len(searchRes.Entries) > 1 { // > 1 user found with the given search criteria
		log.Errorf("Found %q entries while searching for %q", len(searchRes.Entries), username)
		return nil, errors.ErrADMultipleEntries
	}

	// validate user `password`
	adUsername := searchRes.Entries[0].DN                       // this need not be specified in attribute list; results will always carray DN
	if err := ldapConn.Bind(adUsername, password); err != nil { // bind using the given username and password
		log.Errorf("LDAP bind operation failed for AD user account: %v", err)
		return nil, errors.ErrADAccessDenied
	}

	// get user AD groups
	groups, err := lm.getUserGroups(ldapConn, searchRes.Entries[0].GetAttributeValues("memberOf"))
	if err != nil {
		return nil, err
	}

	// XXX: this code is not complete yet
	// TODO: these groups should be associated with the principals

	log.Debugf("Authorized groups:%#v", groups)

	log.Info("AD authentication successful")
	return nil, nil
}

// getUserGroups performs a nested search on the given first-level user groups to uncover all the groups that the user is part of.
// params:
//  ldapConn: LDAP connection object
//  groups: list of first-level user groups
// return values:
//  on successful search, array of unique groups that user is part-of otherwise any relevant error
func (lm *Manager) getUserGroups(ldapConn *ldap.Conn, groups []string) ([]string, error) {
	if len(groups) == 0 {
		// this happens when the user is just part of the primary group; we wont work on this case!
		// more details here: http://lists.freeradius.org/pipermail/freeradius-users/2012-August/062055.html
		return []string{}, errors.ErrADGroupsNotFound
	}

	var attributes = []string{
		"memberof",
	}

	// below is a similar implemntation of FIFO queue
	processedGroups := make(map[string]bool) // to track processed groups during nested search

	for len(groups) > 0 {
		adGroup := groups[0]
		groups = groups[1:] // chop the processed groups
		if processedGroups[adGroup] {
			continue
		}

		processedGroups[adGroup] = true

		// process active directory group `adGroup`; get group's memberOf set. base object search will always return only a single entry (specified by the DN)
		searchRequest := ldap.NewSearchRequest(
			adGroup, // distinguished name of the group in the base domain
			ldap.ScopeBaseObject, ldap.DerefAlways, 0, 0, false,
			"(objectClass=group)", // search is restricted to `group` as we are not focusing on other entities here
			attributes,
			nil)

		searchRes, err := ldapConn.Search(searchRequest)
		if err != nil {
			log.Errorf("LDAP search operation failed for AD group %q, error %#v", adGroup, err)
			return nil, errors.ErrADAccessDenied
		}

		if len(searchRes.Entries) > 1 { // we should never hit this case!
			return []string{}, errors.ErrADMultipleEntries
		}

		subGroups := searchRes.Entries[0].GetAttributeValues("memberOf") // look for possible subgroups to be further processed
		for _, sGrp := range subGroups {
			if !processedGroups[sGrp] {
				groups = append(groups, sGrp)
			}
		}
	}

	// authorized groups of the user
	result := []string{}
	for group := range processedGroups { // all the entries in this map are valid
		result = append(result, group)
	}

	return result, nil
}

// connect establishes a LDAP connection with the given active directory configuration(receiver)
// return values:
//  on successful connection with AD, returns a LDAP connection object otherwise ErrADConnectionFailed
func (lm *Manager) connect() (*ldap.Conn, error) {
	ldapConn, err := ldap.Dial("tcp", fmt.Sprintf("%s:%d", lm.Config.Server, lm.Config.Port))
	if err != nil {
		log.Errorf("Failed to connect to AD server:%v", err)
		return nil, fmt.Errorf("%v, %v", errors.ErrADConnectionFailed, err)
	}

	// switch to TLS if specified; this needs to have certs in place
	// TODO: yet to be tested
	if lm.Config.StartTLS {
		err = ldapConn.StartTLS(&tls.Config{InsecureSkipVerify: lm.Config.InsecureSkipVerify})
		if err != nil {
			log.Errorf("Failed to initiate TLS with AD server: %v", err)
			return nil, fmt.Errorf("%v, %v", errors.ErrADConnectionFailed, err)
		}
	}

	return ldapConn, nil
}
