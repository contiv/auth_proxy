package auth

import (
	"encoding/json"

	log "github.com/Sirupsen/logrus"
	"github.com/contiv/ccn_proxy/common/types"
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
		log.Errorf("Failed to unmarshal app profile list %#v: %#v", appProfiles, err)
		return result
	}

	filteredAppProfiles := []client.AppProfile{}

	for _, ap := range appProfiles {
		if err = t.CheckClaims(ap.TenantName, types.Ops); err == nil {
			filteredAppProfiles = append(filteredAppProfiles, ap)
		}
	}

	result, err = json.Marshal(filteredAppProfiles)
	if err != nil {
		log.Errorf("Failed to marshal app profile list %#v: %#v", filteredAppProfiles, err)
	}

	return result
}

// FilterEndpointGroups filters the response from GET /api/v1/endpointGroups
func FilterEndpointGroups(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	endpointGroups := []client.EndpointGroup{}
	if err = json.Unmarshal(body, &endpointGroups); err != nil {
		log.Errorf("Failed to unmarshal endpoint group list %#v: %#v", endpointGroups, err)
		return result
	}

	filteredEndpointGroups := []client.EndpointGroup{}

	for _, epg := range endpointGroups {
		if err = t.CheckClaims(epg.TenantName, types.Ops); err == nil {
			filteredEndpointGroups = append(filteredEndpointGroups, epg)
		}
	}

	result, err = json.Marshal(filteredEndpointGroups)
	if err != nil {
		log.Errorf("Failed to marshal endpoint group list %#v: %#v", filteredEndpointGroups, err)
	}

	return result
}

// FilterExtContractsGroups filters the response from GET /api/v1/extContractsGroups
func FilterExtContractsGroups(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	contractGroups := []client.ExtContractsGroup{}
	if err = json.Unmarshal(body, &contractGroups); err != nil {
		log.Errorf("Failed to unmarshal contract group list %#v: %#v", contractGroups, err)
		return result
	}

	filteredContractGroups := []client.ExtContractsGroup{}

	for _, cg := range filteredContractGroups {
		if err = t.CheckClaims(cg.TenantName, types.Ops); err == nil {
			filteredContractGroups = append(filteredContractGroups, cg)
		}
	}

	result, err = json.Marshal(filteredContractGroups)
	if err != nil {
		log.Errorf("Failed to marshal contract group list %#v: %#v", filteredContractGroups, err)
	}

	return result
}

// FilterNetProfiles filters the response from GET /api/v1/netprofiles/
func FilterNetProfiles(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	netprofiles := []client.Netprofile{}
	if err = json.Unmarshal(body, &netprofiles); err != nil {
		log.Errorf("Failed to unmarshal netprofile list %#v: %#v", netprofiles, err)
		return result
	}

	filteredNetprofiles := []client.Netprofile{}

	for _, np := range netprofiles {
		if err = t.CheckClaims(np.TenantName, types.Ops); err == nil {
			filteredNetprofiles = append(filteredNetprofiles, np)
		}
	}

	result, err = json.Marshal(filteredNetprofiles)
	if err != nil {
		log.Errorf("Failed to marshal netprofile list %#v: %#v", filteredNetprofiles, err)
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
		log.Errorf("Failed to unmarshal network list %#v: %#v", networks, err)
		return result
	}

	filteredNetworks := []client.Network{}

	for _, network := range networks {
		if err = t.CheckClaims(network.TenantName, types.Ops); err == nil {
			filteredNetworks = append(filteredNetworks, network)
		}
	}

	result, err = json.Marshal(filteredNetworks)
	if err != nil {
		log.Errorf("Failed to marshal network list %#v: %#v", filteredNetworks, err)
	}

	return result
}

// FilterPolicies filters the response from GET /api/v1/policys (sic)
func FilterPolicies(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	policies := []client.Policy{}
	if err = json.Unmarshal(body, &policies); err != nil {
		log.Errorf("Failed to unmarshal policy list %#v: %#v", policies, err)
		return result
	}

	filteredPolicies := []client.Policy{}

	for _, p := range policies {
		if err = t.CheckClaims(p.TenantName, types.Ops); err == nil {
			filteredPolicies = append(filteredPolicies, p)
		}
	}

	result, err = json.Marshal(filteredPolicies)
	if err != nil {
		log.Errorf("Failed to marshal policy list %#v: %#v", filteredPolicies, err)
		return result
	}

	return result
}

// FilterRules filters the response from GET /api/v1/rules
func FilterRules(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	rules := []client.Rule{}
	if err = json.Unmarshal(body, &rules); err != nil {
		log.Errorf("Failed to unmarshal rule list %#v: %#v", rules, err)
		return result
	}

	filteredRules := []client.Rule{}

	for _, r := range rules {
		if err = t.CheckClaims(r.TenantName, types.Ops); err == nil {
			filteredRules = append(filteredRules, r)
		}
	}

	result, err = json.Marshal(filteredRules)
	if err != nil {
		log.Errorf("Failed to marshal rule list %#v: %#v", filteredRules, err)
		return result
	}

	return result
}

// FilterServiceLBs filters the response from GET /api/v1/serviceLBs
func FilterServiceLBs(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	serviceLBs := []client.ServiceLB{}
	if err = json.Unmarshal(body, &serviceLBs); err != nil {
		log.Errorf("Failed to unmarshal serviceLB list %#v: %#v", serviceLBs, err)
		return result
	}

	filteredServiceLBs := []client.ServiceLB{}

	for _, slb := range serviceLBs {
		if err = t.CheckClaims(slb.TenantName, types.Ops); err == nil {
			filteredServiceLBs = append(filteredServiceLBs, slb)
		}
	}

	result, err = json.Marshal(filteredServiceLBs)
	if err != nil {
		log.Errorf("Failed to marshal serviceLB list %#v: %#v", filteredServiceLBs, err)
		return result
	}

	return result
}

// FilterTenants filters the response from GET /api/v1/tenants
func FilterTenants(t *Token, body []byte) []byte {
	result := []byte{}
	var err error

	tenants := []client.Tenant{}
	if err = json.Unmarshal(body, &tenants); err != nil {
		log.Errorf("Failed to unmarshal tenant list %#v: %#v", tenants, err)
		return result
	}

	filteredTenants := []client.Tenant{}

	for _, tenant := range tenants {
		if err = t.CheckClaims(tenant.TenantName, types.Ops); err == nil {
			filteredTenants = append(filteredTenants, tenant)
		}
	}

	result, err = json.Marshal(filteredTenants)
	if err != nil {
		log.Errorf("Failed to marshal tenant list %#v: %#v", filteredTenants, err)
		return result
	}

	return result
}
