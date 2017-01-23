package auth

import (
	"encoding/json"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/auth_proxy/common/types"
	"github.com/contiv/contivmodel/client"
)

// NullFilter is a filter which just returns what is passed in.
// It's used by RBAC endpoints which do not require response filtering.
func NullFilter(t *Token, body []byte) []byte {
	return body
}

// FilterAppProfiles filters the response from GET /api/v1/appProfiles/
func FilterAppProfiles(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	appProfiles := []client.AppProfile{}
	if err = json.Unmarshal(body, &appProfiles); err != nil {
		log.Errorf("Failed to unmarshal app. profiles %s: %#v", body, err)
		return result
	}

	filteredAppProfiles := []client.AppProfile{}

	for _, ap := range appProfiles {
		if err = t.CheckClaims(types.Tenant(ap.TenantName), types.Ops); err == nil {
			filteredAppProfiles = append(filteredAppProfiles, ap)
		}
	}

	result, err = json.Marshal(filteredAppProfiles)
	if err != nil {
		log.Errorf("Failed to marshal filtered app. profiles %#v: %#v", filteredAppProfiles, err)
	}

	return result
}

// FilterEndpointGroups filters the response from GET /api/v1/endpointGroups/
func FilterEndpointGroups(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	endpointGroups := []client.EndpointGroup{}
	if err = json.Unmarshal(body, &endpointGroups); err != nil {
		log.Errorf("Failed to unmarshal endpoint groups %s: %#v", body, err)
		return result
	}

	filteredEndpointGroups := []client.EndpointGroup{}

	for _, epg := range endpointGroups {
		if err = t.CheckClaims(types.Tenant(epg.TenantName), types.Ops); err == nil {
			filteredEndpointGroups = append(filteredEndpointGroups, epg)
		}
	}

	result, err = json.Marshal(filteredEndpointGroups)
	if err != nil {
		log.Errorf("Failed to marshal filtered endpoint groups %#v: %#v", filteredEndpointGroups, err)
	}

	return result
}

// FilterExtContractsGroups filters the response from GET /api/v1/extContractsGroups/
func FilterExtContractsGroups(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	contractGroups := []client.ExtContractsGroup{}
	if err = json.Unmarshal(body, &contractGroups); err != nil {
		log.Errorf("Failed to unmarshal ext. contracts group %s: %#v", body, err)
		return result
	}

	filteredContractGroups := []client.ExtContractsGroup{}

	for _, cg := range filteredContractGroups {
		if err = t.CheckClaims(types.Tenant(cg.TenantName), types.Ops); err == nil {
			filteredContractGroups = append(filteredContractGroups, cg)
		}
	}

	result, err = json.Marshal(filteredContractGroups)
	if err != nil {
		log.Errorf("Failed to marshal filtered ext. contracts group %#v: %#v", filteredContractGroups, err)
	}

	return result
}

// FilterNetProfiles filters the response from GET /api/v1/netprofiles/
func FilterNetProfiles(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	netprofiles := []client.Netprofile{}
	if err = json.Unmarshal(body, &netprofiles); err != nil {
		log.Errorf("Failed to unmarshal net. profiles %s: %#v", body, err)
		return result
	}

	filteredNetprofiles := []client.Netprofile{}

	for _, np := range netprofiles {
		if err = t.CheckClaims(types.Tenant(np.TenantName), types.Ops); err == nil {
			filteredNetprofiles = append(filteredNetprofiles, np)
		}
	}

	result, err = json.Marshal(filteredNetprofiles)
	if err != nil {
		log.Errorf("Failed to marshal filtered net. profiles %#v: %#v", filteredNetprofiles, err)
		return result
	}

	return result
}

// FilterNetworks filters the response from GET /api/v1/networks/
func FilterNetworks(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	networks := []client.Network{}
	if err = json.Unmarshal(body, &networks); err != nil {
		log.Errorf("Failed to unmarshal networks %s: %#v", body, err)
		return result
	}

	filteredNetworks := []client.Network{}

	for _, network := range networks {
		if err = t.CheckClaims(types.Tenant(network.TenantName), types.Ops); err == nil {
			filteredNetworks = append(filteredNetworks, network)
		}
	}

	result, err = json.Marshal(filteredNetworks)
	if err != nil {
		log.Errorf("Failed to marshal filtered networks %#v: %#v", filteredNetworks, err)
	}

	return result
}

// FilterPolicies filters the response from GET /api/v1/policys/ (sic)
func FilterPolicies(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	policies := []client.Policy{}
	if err = json.Unmarshal(body, &policies); err != nil {
		log.Errorf("Failed to unmarshal policies %s: %#v", body, err)
		return result
	}

	filteredPolicies := []client.Policy{}

	for _, p := range policies {
		if err = t.CheckClaims(types.Tenant(p.TenantName), types.Ops); err == nil {
			filteredPolicies = append(filteredPolicies, p)
		}
	}

	result, err = json.Marshal(filteredPolicies)
	if err != nil {
		log.Errorf("Failed to marshal filtered policies %#v: %#v", filteredPolicies, err)
		return result
	}

	return result
}

// FilterRules filters the response from GET /api/v1/rules/
func FilterRules(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	rules := []client.Rule{}
	if err = json.Unmarshal(body, &rules); err != nil {
		log.Errorf("Failed to unmarshal rules %s: %#v", body, err)
		return result
	}

	filteredRules := []client.Rule{}

	for _, r := range rules {
		if err = t.CheckClaims(types.Tenant(r.TenantName), types.Ops); err == nil {
			filteredRules = append(filteredRules, r)
		}
	}

	result, err = json.Marshal(filteredRules)
	if err != nil {
		log.Errorf("Failed to marshal filtered rules %#v: %#v", filteredRules, err)
		return result
	}

	return result
}

// FilterServiceLBs filters the response from GET /api/v1/serviceLBs/
func FilterServiceLBs(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	serviceLBs := []client.ServiceLB{}
	if err = json.Unmarshal(body, &serviceLBs); err != nil {
		log.Errorf("Failed to unmarshal serviceLBs %s: %#v", body, err)
		return result
	}

	filteredServiceLBs := []client.ServiceLB{}

	for _, slb := range serviceLBs {
		if err = t.CheckClaims(types.Tenant(slb.TenantName), types.Ops); err == nil {
			filteredServiceLBs = append(filteredServiceLBs, slb)
		}
	}

	result, err = json.Marshal(filteredServiceLBs)
	if err != nil {
		log.Errorf("Failed to marshal filtered serviceLBs %#v: %#v", filteredServiceLBs, err)
		return result
	}

	return result
}

// FilterTenants filters the response from GET /api/v1/tenants/
func FilterTenants(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	tenants := []client.Tenant{}
	if err = json.Unmarshal(body, &tenants); err != nil {
		log.Errorf("Failed to unmarshal tenants %s: %#v", body, err)
		return result
	}

	filteredTenants := []client.Tenant{}

	for _, tenant := range tenants {
		if err = t.CheckClaims(types.Tenant(tenant.TenantName), types.Ops); err == nil {
			filteredTenants = append(filteredTenants, tenant)
		}
	}

	result, err = json.Marshal(filteredTenants)
	if err != nil {
		log.Errorf("Failed to marshal filtered tenants %#v: %#v", filteredTenants, err)
		return result
	}

	return result
}
