package proxy

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/contiv/auth_proxy/auth"
	"github.com/contiv/auth_proxy/common"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/contivmodel/client"
	"github.com/gorilla/mux"

	log "github.com/Sirupsen/logrus"
)

// rbacFilter is a function which takes a token and response body and filters
// the response body based on what the user represented by the token is
// allowed to see.
type rbacFilter func(*auth.Token, []byte) []byte

// rbacData struct that holds the filter and contivmodel object reference for
// each of the netmaster resource.
type rbacData struct {
	filter rbacFilter
	newObj func() interface{}
}

var (
	// rbacDetails map containing the details of all netmaster resources
	rbacDetails = map[string]rbacData{
		"appProfiles": {
			filter: auth.FilterAppProfiles,
			newObj: func() interface{} { return &client.AppProfile{} },
		},
		"endpointGroups": {
			filter: auth.FilterEndpointGroups,
			newObj: func() interface{} { return &client.EndpointGroup{} },
		},
		"extContractsGroups": {
			filter: auth.FilterExtContractsGroups,
			newObj: func() interface{} { return &client.ExtContractsGroup{} },
		},
		"netprofiles": {
			filter: auth.FilterNetProfiles,
			newObj: func() interface{} { return &client.Netprofile{} },
		},
		"networks": {
			filter: auth.FilterNetworks,
			newObj: func() interface{} { return &client.Network{} },
		},
		// NOTE: "policys" is misspelled in netmaster's routes
		"policys": {
			filter: auth.FilterPolicies,
			newObj: func() interface{} { return &client.Policy{} },
		},
		"rules": {
			filter: auth.FilterRules,
			newObj: func() interface{} { return &client.Rule{} },
		},
		"serviceLBs": {
			filter: auth.FilterServiceLBs,
			newObj: func() interface{} { return &client.ServiceLB{} },
		},
	}
)

// enforceRBAC interprets the incoming `netmaster` request and
// proxy only the requests that the user is authorized to perform,
// other requests are dropped with `Unauthorized` status.
// NOTE:
//    1. RBAC on list operations (/api/v1/networks, /api/v1/tenants/, etc..)
//       is enforced by filtereing the results from netmaster based on user authorization.
//    2. Certain netmaster endpoints(aciGws, Bgps, globals) can only be acessed by admins
//       and their responses are never filtered.
//    3. Since our RBAC system works only at the tenant level, each incoming request (GET, POST, etc.)
//       needs to mapped to a tenant name to enfore access control. More details below.
//       POST: tenant name is obtained from the payload
//       GET, PUT, DELETE: tenant name is obtained by querying (http.GET) netmaster for the named resource
//    4. Responses of superuser's request is never filtered (auth.NullFilter)
func enforceRBAC(s *Server) func(http.ResponseWriter, *http.Request) {
	return func(w http.ResponseWriter, req *http.Request) {
		vars := mux.Vars(req)

		common.SetJSONContentType(w)

		isValid, token := isTokenValid(req.Header.Get("X-Auth-Token"), w)
		if !isValid {
			return
		}

		if token.IsSuperuser() {
			proxyRequest(s, req, w, token, auth.NullFilter)
			return
		}

		resource := vars["resource"]
		switch resource {
		// admin-only netmaster resources
		case "aciGws", "Bgps", "globals":
			authError(w, http.StatusForbidden, "Insufficient privileges")
		case "tenants":
			if req.Method == "GET" {
				rbacUsingTenant(s, req, w, token, vars)
				return
			}

			authError(w, http.StatusForbidden, "Insufficient privileges")
		default:
			rbacUsingTenant(s, req, w, token, vars)
		}

	}
}

// rbacUsingTenant enforces RBAC using tenant authorizations;
// User can access only tenants that he/she is authorized to.
// params:
//  s:      proxy server object
//  req:    http request object
//  w:      http response writer
//  token:  user token; carries the embebbed authZs of the user
//  vars:   path components of the requested endpoint
// NOTE:
//    1. Only `list` (can be accessed by anyone but the response is limited) responses are filtered,
//       others do not require filtering as those requests are proxied only after authorization.
//    2. If the rName(resource name) is empty, then the request is considered as `list` request. (/networks/, /tenants/, etc.)
//       otherwise the requests (GET, POST, etc. on one of the resource's member. e.g /networks/n1) are proxied after authZ.
func rbacUsingTenant(s *Server, req *http.Request, w http.ResponseWriter, token *auth.Token, vars map[string]string) {
	resource := vars["resource"]
	rName := vars["name"]

	switch resource {
	case "appProfiles", "endpointGroups", "extContractsGroups", "netprofiles", "networks", "policys", "rules", "serviceLBs":
		if common.IsEmpty(rName) {
			proxyRequest(s, req, w, token, rbacDetails[resource].filter)
			return
		}

		if authorized(s, req, w, token, resource, rName, rbacDetails[resource].newObj()) {
			proxyRequest(s, req, w, token, auth.NullFilter)
		}
	case "endpoints":
		// XXX: This is one of the inspect endpoints; different than normal inspect on the object.
		//      /api/v1/inspect/endpoints/{epg_name} -> returns the list of containers attached to this EPG
		if common.IsEmpty(rName) {
			// there is no such endpoint as /api/v1/inspect/endpoints/ -> 404
			proxyRequest(s, req, w, token, auth.NullFilter)
			return
		}

		epg := &client.EndpointGroup{}
		if authorized(s, req, w, token, resource, rName, epg) {
			proxyRequest(s, req, w, token, auth.NullFilter)
		}
	case "tenants":
		if common.IsEmpty(rName) {
			proxyRequest(s, req, w, token, auth.FilterTenants)
			return
		}

		if checkClaims(w, token, types.Tenant(rName)) {
			proxyRequest(s, req, w, token, auth.NullFilter)
		}
	default:
		authError(w, http.StatusForbidden, "Insufficient privileges")
	}

}

// authorized helper function that checks whether the given token has privileges to perform the requested action
// params:
//  s:            proxy server object
//  req:          http request object
//  w:            http response writer
//  token:        user token; carries the embebbed authZs of the user
//  resource:     resource obtained from the http endpoint. e.g. networks, tenants, etc.
//  rName:        name/ID of the resource obtained from the http endpoint. e.g. n1, t1, etc.
//  resourceObj:  interface representing *client.Networks, *client.Tenants based on the named resource
// return values:
//  bool: true if the user is authorized, otherwise false
//  errors are written using http response writer
func authorized(s *Server, req *http.Request, w http.ResponseWriter, token *auth.Token,
	resource, rName string, resourceObj interface{}) bool {
	if data := getResourceDetails(req, w, getNetmasterEndpoint(s, resource, rName), rName); data != nil {
		if err := json.Unmarshal(data, resourceObj); err != nil {
			log.Debugf("Failed to unmarshal %#v: %#v", data, resourceObj)
			serverError(w, fmt.Errorf("Failed to process request"))
			return false
		}

		tenantName := ""
		switch resourceObj.(type) {
		case *client.AppProfile:
			tenantName = resourceObj.(*client.AppProfile).TenantName
		case *client.EndpointGroup:
			tenantName = resourceObj.(*client.EndpointGroup).TenantName
		case *client.ExtContractsGroup:
			tenantName = resourceObj.(*client.ExtContractsGroup).TenantName
		case *client.Netprofile:
			tenantName = resourceObj.(*client.Netprofile).TenantName
		case *client.Network:
			tenantName = resourceObj.(*client.Network).TenantName
		case *client.Policy:
			tenantName = resourceObj.(*client.Policy).TenantName
		case *client.Rule:
			tenantName = resourceObj.(*client.Rule).TenantName
		case *client.ServiceLB:
			tenantName = resourceObj.(*client.ServiceLB).TenantName
		}

		return checkClaims(w, token, types.Tenant(tenantName))
	}

	return false
}

// getResourceDetails retrieves the details of the named resource
// either from request (POST) or from response (by making a GET request to netmaster on the named resource)
// If the GET request (made to obtain resource (network, endpointGroup, etc.) details) fails,
// then the same response and status code is returned back.
// params:
//  req:          http request object
//  w:            http response writer
//  endpoint:     to make GET request; constructed using the resource and its name
//  rName:        name of the resource obtained from mux vars
// return values:
//  []byte: byte array of the requested/posted object (network, endpointGroup, appProfile, etc.) containing the tenant name
//  errors are written using http response writer
func getResourceDetails(req *http.Request, w http.ResponseWriter, endpoint, rName string) []byte {
	if req.Method == "POST" {
		defer req.Body.Close()

		data, err := ioutil.ReadAll(req.Body)
		if err != nil {
			log.Debugf("Failed to read POST request body %q: %#v", rName, err)
			serverError(w, fmt.Errorf("Failed to process request"))
			return nil
		}

		// XXX: re-write the read data back to http request
		req.Body = ioutil.NopCloser(bytes.NewReader(data))

		return data
	}

	resp, err := http.Get(endpoint)
	defer resp.Body.Close()

	if err != nil {
		log.Debugf("Failed to read GET resource %q: %#v", rName, err)
		serverError(w, fmt.Errorf("Failed to process request"))
		return nil
	}

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Debugf("Failed to read GET response body %q: %#v", rName, err)
		serverError(w, fmt.Errorf("Failed to process request"))
		return nil
	}

	if resp.StatusCode != http.StatusOK {
		// GET failed; return the same response back
		w.WriteHeader(resp.StatusCode)
		w.Write(data)
		return nil
	}

	return data
}

// checkClaims checks given tentant claims on the token
// params:
//  w:          http response writer
//  token:      containing claims
//  tenantName: of the requested resource
// return values:
//  bool: true if the user is authorized on given tenant, otherwise false
//  errors are written using response writer
func checkClaims(w http.ResponseWriter, token *auth.Token, tenant types.Tenant) bool {
	log.Debugf("Tenant name of the requested resource %q, checking authZ...", tenant)
	if err := token.CheckClaims(tenant, types.Ops); err != nil {
		authError(w, http.StatusForbidden, "Insufficient privileges")
		return false
	}

	log.Debugf("User authorized to perform requested action")
	return true
}

// proxyRequest wrapper around s.ProxyRequest + applies filter on the response
// params:
//  s:      proxy server object
//  req:    http request object
//  w:      http response writer
//  token:  user token
//  filter: to be applied on the response
func proxyRequest(s *Server, req *http.Request, w http.ResponseWriter, token *auth.Token, filter rbacFilter) {
	resp, body, err := s.ProxyRequest(w, req)
	if err != nil {
		serverError(w, err)
		return
	}

	if resp.StatusCode/100 != 2 {
		w.Write(body)
		return
	}

	w.Write(filter(token, body))
}

// getNetmasterEndpoint isolates the messy string construction
func getNetmasterEndpoint(s *Server, resource, rName string) string {
	return "http://" + s.config.NetmasterAddress + "/api/v1/" + resource + "/" + rName + "/"
}
