package auth

// NullFilter is a filter which just returns what is passed in.
// It's used by RBAC endpoints which do not require response filtering.
func NullFilter(t *Token, body []byte) []byte {
	return body
}

// TODO: unmarshal JSON into the same struct used by netmaster
// TODO: filter out records the current user can't see
// TODO: marshal struct back into JSON and return it

// FilterAppProfiles filters the response from GET /api/v1/appProfiles
func FilterAppProfiles(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterBgps filters the response from GET /api/v1/Bgps
func FilterBgps(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterEndpointGroups filters the response from GET /api/v1/endpointGroups
func FilterEndpointGroups(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterExtContractsGroups filters the response from GET /api/v1/extContractsGroups
func FilterExtContractsGroups(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterGlobals filters the response from GET /api/v1/globals
func FilterGlobals(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterNetProfiles filters the response from GET /api/v1/netprofiles
func FilterNetProfiles(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterNetworks filters the response from GET /api/v1/networks
func FilterNetworks(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterPolicies filters the response from GET /api/v1/policys (sic)
func FilterPolicies(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterRules filters the response from GET /api/v1/rules
func FilterRules(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterServiceLBs filters the response from GET /api/v1/serviceLBs
func FilterServiceLBs(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterTenants filters the response from GET /api/v1/tenants
func FilterTenants(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterVolumes filters the response from GET /api/v1/volumes
func FilterVolumes(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}

// FilterVolumeProfiles filters the response from GET /api/v1/volumeProfiles
func FilterVolumeProfiles(t *Token, body []byte) []byte {
	return []byte(`{"TODO":"implement this"}`)
}
