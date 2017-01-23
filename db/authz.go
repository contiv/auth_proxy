package db

import (
	"encoding/json"

	log "github.com/Sirupsen/logrus"

	"github.com/contiv/auth_proxy/common"
	auth_errors "github.com/contiv/auth_proxy/common/errors"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/auth_proxy/state"
)

//
// InsertAuthorization is a convenience function to add a new entry
// to the authz dir
//
func InsertAuthorization(a *types.Authorization) error {
	defer common.Untrace(common.Trace())
	log.Debug("creating authorization:", a)
	return a.Write()
}

//
// GetAuthorization is a convenience function to look up an
// authorization entry by its UUID.
//
func GetAuthorization(UUID string) (types.Authorization, error) {
	defer common.Untrace(common.Trace())

	a := types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return a, err
	}

	a.StateDriver = sd
	err = a.Read(UUID)
	return a, err
}

//
// DeleteAuthorization is a convenience function to remove
// an authz from the authz dir
//
func DeleteAuthorization(ID string) error {
	defer common.Untrace(common.Trace())

	log.Debug("deleting authorization:", ID)

	a := types.Authorization{}
	a.UUID = ID
	sd, err := state.GetStateDriver()
	if err != nil {
		return err
	}
	a.StateDriver = sd
	return a.Clear()
}

//
// ListAuthorizations looks up all authorizations in
// authz dir
//
// Return Values:
//  []types.Authorization: slice containing authorization instances
//  error: Error when reading from KV store
//         nil if operation is successful
//
func ListAuthorizations() (
	[]types.Authorization, error) {
	defer common.Untrace(common.Trace())

	a := &types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}
	(*a).StateDriver = sd

	list := []types.Authorization{}
	allAuthZList, err := a.StateDriver.ReadAllState(types.AuthZDir, a, json.Unmarshal)
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			return list, nil
		}

		log.Error("failed to ReadAllState, err:", err)
		return nil, auth_errors.ErrReadingFromStore
	}

	for _, auth := range allAuthZList {
		tmp, ok := auth.(*types.Authorization)
		if ok {
			list = append(list, *tmp)
		}
	}

	return list, nil
}

//
// ListAuthorizationsByPrincipal looks up all authorizations in
// authz dir for the specific principal (subject).
//
// Parameters:
//  ID: of the principal for whom authorizations need to be returned
//
// Return Values:
//  []types.Authorization: slice containing authorization instances
//  error: Error when reading from KV store
//         nil if operation is successful
//
func ListAuthorizationsByPrincipal(pName string) (
	[]types.Authorization, error) {
	defer common.Untrace(common.Trace())

	a := &types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}
	(*a).StateDriver = sd

	match := []types.Authorization{}

	allAuthZList, err := a.StateDriver.ReadAllState(types.AuthZDir, a, json.Unmarshal)
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			return match, nil
		}

		log.Error("failed to ReadAllState, err:", err)
		return nil, auth_errors.ErrReadingFromStore
	}

	for _, auth := range allAuthZList {
		tmp, ok := auth.(*types.Authorization)
		if ok {
			if tmp.PrincipalName == pName {
				match = append(match, *tmp)

			}
		}
	}

	return match, nil
}

//
// DeleteAuthorizationsByPrincipal deletes all authorizations in
// in the KV store for the specific principal (subject).
//
// Parameters:
//  ID: of the principal whose authorizations need to be removed
//
// Return Values:
//  error: Any errors encountered when reading or deleting
//         from the KV store
//
func DeleteAuthorizationsByPrincipal(pName string) error {
	defer common.Untrace(common.Trace())

	a := &types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return err
	}
	(*a).StateDriver = sd

	allAuthZList, err := a.StateDriver.ReadAllState(types.AuthZDir, a, json.Unmarshal)
	if err == auth_errors.ErrKeyNotFound {
		return nil
	} else if err != nil {
		log.Error("failed to ReadAllState, err:", err)
		return auth_errors.ErrReadingFromStore
	}

	for _, auth := range allAuthZList {
		tmp, ok := auth.(*types.Authorization)
		if ok {
			if tmp.PrincipalName == pName {

				// record UUID so that its key path
				// can be determined
				a.UUID = tmp.UUID
				err = a.Clear()
				if err != nil {
					log.Error("failed to delete authorization, err:", err)
					return err
				}
			}
		}
	}

	return err
}

//
// ListAuthorizationsByClaim looks up all authorizations in the
// authz dir that contains a claim key
//
// Parameters:
//  claim: claim string (object) for which authorizations are being searched.
//
// Return Values:
//  []types.Authorization: slice containing authorizations
//  error: Any error encountered when reading from the KV store
//         nil if operation is successful
//
func ListAuthorizationsByClaim(claim string) (
	[]types.Authorization, error) {

	defer common.Untrace(common.Trace())

	a := &types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}
	(*a).StateDriver = sd

	match := []types.Authorization{}

	allAuthZList, err := a.StateDriver.ReadAllState(types.AuthZDir, a, json.Unmarshal)
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			return match, nil
		}

		log.Error("failed to ReadAllState, err:", err)
		return nil, auth_errors.ErrReadingFromStore
	}

	for _, auth := range allAuthZList {
		tmp, ok := auth.(*types.Authorization)
		if ok {
			if tmp.ClaimKey == claim {
				match = append(match, *tmp)
			}
		}
	}
	return match, nil
}

//
// DeleteAuthorizationsByClaim deletes all authorizations in the
// authz dir in the KV store that contain the chosen claim
//
// Parameters:
//  claim: claim string (object) for which authorizations are being searched.
//
// Return Values:
//  error: Errors encountered when reading and deleting from the authz dir
//         nil if operation is successful
//
func DeleteAuthorizationsByClaim(claim string) error {

	defer common.Untrace(common.Trace())

	a := &types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return err
	}
	(*a).StateDriver = sd

	allAuthZList, err := a.StateDriver.ReadAllState(types.AuthZDir, a, json.Unmarshal)
	if err != nil {
		log.Error("failed to ReadAllState, err:", err)
		return auth_errors.ErrReadingFromStore
	}

	for _, auth := range allAuthZList {
		tmp, ok := auth.(*types.Authorization)
		if ok {
			if tmp.ClaimKey == claim {
				// record UUID so that its key path
				// can be determined
				a.UUID = tmp.UUID
				err = a.Clear()
				if err != nil {
					log.Error("failed to delete authorization, err:", err)
					return err
				}
			}
		}
	}
	return err
}

//
// ListAuthorizationsByClaimAndPrincipal looks up all authorizations in
// the KV store for a specific claim and principal
//
// Parameters:
//  claim: claim string for which authorizations are being searched.
//  ID: of the principal for whom authorizations need to be returned
//
// Return Values:
//  []types.Authorization: slice containing authorizations.
//  error: Any error encountered when reading from the KV store
//         nil if operation is successful
//
func ListAuthorizationsByClaimAndPrincipal(claim string, principal string) (
	[]types.Authorization, error) {

	defer common.Untrace(common.Trace())

	a := &types.Authorization{}
	sd, err := state.GetStateDriver()
	if err != nil {
		return nil, err
	}
	(*a).StateDriver = sd

	match := []types.Authorization{}

	allAuthZList, err := a.StateDriver.ReadAllState(types.AuthZDir, a, json.Unmarshal)
	if err != nil {
		if err == auth_errors.ErrKeyNotFound {
			return match, nil
		}

		log.Error("failed to ReadAllState, err:", err)
		return nil, auth_errors.ErrReadingFromStore
	}

	for _, auth := range allAuthZList {
		tmp, ok := auth.(*types.Authorization)
		if ok {
			if (tmp.ClaimKey == claim) && (tmp.PrincipalName == principal) {
				match = append(match, *tmp)
			}
		}
	}

	return match, nil
}
