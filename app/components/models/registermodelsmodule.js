/**
 * Created by vjain3 on 3/14/16.
 */
angular.module('contiv.models', []);
var ContivGlobals = (function () {
    var NETMASTER = '';
    var CLUSTER = '';
    var VOLMASTER = '';
    return {
        //REST endpoints for NETMASTER
        'NETWORKS_ENDPOINT': NETMASTER + '/api/networks/',
        'POLICIES_ENDPOINT': NETMASTER + '/api/policys/',
        'RULES_ENDPOINT': NETMASTER + '/api/rules/',
        'APPLICATIONGROUPS_ENDPOINT': NETMASTER + '/api/endpointGroups/',

        //REST endpoints for VOLMASTER
        'VOLUMES_ENDPOINT': VOLMASTER + '/list',
        'VOLUMES_DELETE_ENDPOINT': VOLMASTER + '/remove/',
        'STORAGEPOLICIES_ENDPOINT': VOLMASTER + '/policy',

        //REST endpoints for CLUSTER
        'NODES_LIST_ENDPOINT': CLUSTER + '/info/nodes',
        'NODES_DISCOVER_ENDPOINT': CLUSTER + '/discover/node/',
        'NODES_COMMISSION_ENDPOINT': CLUSTER + '/commission/node/',
        'NODES_DECOMMISSION_ENDPOINT': CLUSTER + '/decommission/node/',
        'NODES_MAINTENANCE_ENDPOINT': CLUSTER + '/maintenance/node/',

        //Refresh interval in milliseconds
        'REFRESH_INTERVAL': 5000,

        //RegEx for validation
        'CIDR_REGEX' : '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$'
    }
})();
