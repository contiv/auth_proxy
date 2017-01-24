/**
 * Created by vjain3 on 11/2/16.
 * 12/21/16: updating API paths for ccn_proxy [catw]
 */
export const ContivGlobals = {
    //REST endpoints for NETMASTER
    'NETWORKS_ENDPOINT':                     '/api/v1/networks/',
    'NETWORKS_INSPECT_ENDPOINT':             '/api/v1/inspect/networks/',
    'SERVICELBS_INSPECT_ENDPOINT':           '/api/v1/inspect/serviceLBs/',
    'POLICIES_ENDPOINT':                     '/api/v1/policys/',
    'POLICIES_INSPECT_ENDPOINT':             '/api/v1/inspect/policys/',
    'RULES_ENDPOINT':                        '/api/v1/rules/',
    'APPLICATIONGROUPS_ENDPOINT':            '/api/v1/endpointGroups/',
    'APPLICATIONGROUPS_INSPECT_ENDPOINT':    '/api/v1/inspect/endpointGroups/',
    'SERVICELBS_ENDPOINT':                   '/api/v1/serviceLBs/',
    'ORGANIZATIONS_ENDPOINT':                '/api/v1/tenants/',
    'NETWORK_SETTINGS_ENDPOINT':             '/api/v1/globals/',
    'GLOBAL_NETWORK_INSPECT_ENDPOINT':       '/api/v1/inspect/globals/',
    'ACI_SETTINGS_ENDPOINT':                 '/api/v1/aciGws/',
    'NETPROFILES_ENDPOINT':                  '/api/v1/netprofiles/',
    'BGPS_ENDPOINT':                         '/api/v1/Bgps/',
    'BGPS_INSPECT_ENDPOINT':                 '/api/v1/inspect/Bgps/',
    'APP_PROFILES_ENDPOINT':                 '/api/v1/appProfiles/',
    'CONTRACTS_ENDPOINT':                    '/api/v1/extContractsGroups/',
    'VISUALIZATION_ENDPOINT':                '/visualization/',

    //REST endpoints for VOLMASTER
    'VOLUMES_ENDPOINT': '/volmaster/volumes/',
    'VOLUMES_CREATE_ENDPOINT': '/volmaster/volumes/create/',
    'VOLUMES_DELETE_ENDPOINT': '/volmaster/volumes/remove/',
    'VOLUMES_COPYSNAPSHOTS_ENDPOINT': '/volmaster/volumes/copy',
    'VOLUMES_USES_ENDPOINT': '/volmaster/uses/mounts/',
    'VOLUMES_SNAPSHOTS_ENDPOINT': '/volmaster/snapshots/',
    'STORAGEPOLICIES_ENDPOINT': '/volmaster/policies/',
    'VOLUMES_GLOBAL_ENDPOINT': '/volmaster/global/',

    //REST endpoints for CLUSTER
    'NODES_LIST_ENDPOINT': '/info/nodes',
    'NODES_DISCOVER_ENDPOINT': '/discover/nodes',
    'NODES_COMMISSION_ENDPOINT': '/commission/nodes',
    'NODES_DECOMMISSION_ENDPOINT': '/decommission/nodes',
    'NODES_MAINTENANCE_ENDPOINT': '/maintenance/nodes',
    'NODES_LAST_JOB_ENDPOINT': '/info/job/last',
    'NODES_ACTIVE_JOB_ENDPOINT': '/info/job/active',
    'NODES_SETTINGS_SET_ENDPOINT': '/globals',
    'NODES_SETTINGS_GET_ENDPOINT': '/info/globals',

    //REST endpoint for Login
    'LOGIN_ENDPOINT':            '/api/v1/ccn_proxy/login',

    //REST endpoints for USER
    'USERS_ENDPOINT':            '/api/v1/ccn_proxy/local_users',
    'LDAP_ENDPOINT':             '/api/v1/ccn_proxy/ldap_configuration',
    'AUTHORIZATION_ENDPOINT':    '/api/v1/ccn_proxy/authorizations',

    //Refresh interval in milliseconds
    'REFRESH_INTERVAL': 5000,

    //RegEx for validation
    'CIDR_REGEX' : '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$',
    'VLAN_REGEX' : '^([0-9]{1,4}?-[0-9]{1,4}?)$',

    'VXLAN_REGEX' : '^([0-9]{1,8}?-[0-9]{1,8}?)$',
    'NUMBER_REGEX' : '^[0-9]*$',

    // System strings
    'PRODUCT_NAME': 'Container Networking',
    'PRODUCT_VERSION': 'TP_1.0.0'
};
