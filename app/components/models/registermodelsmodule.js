/**
 * Created by vjain3 on 3/14/16.
 */
angular.module('contiv.models', []);
var ContivGlobals = (function () {
    var NETMASTER = '';
    var CLUSTER = 'http://contiv150.insieme.local:9876';
    var VOLMASTER = 'http://contiv150.insieme.local:9005';
    return {
        //REST Endpoints
        'NETWORKS_ENDPOINT': NETMASTER + '/api/networks/',
        'POLICIES_ENDPOINT': NETMASTER + '/api/policys/',
        'RULES_ENDPOINT': NETMASTER + '/api/rules/',
        'APPLICATIONGROUPS_ENDPOINT': NETMASTER + '/api/endpointGroups/',
        'VOLUMES_ENDPOINT': VOLMASTER + '/list',
        'NODES_ENDPOINT': CLUSTER + '/info/nodes',

        //RegEx for validation
        'CIDR_REGEX' : '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$'
    }
})();
