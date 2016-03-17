/**
 * Created by vjain3 on 3/14/16.
 */
angular.module('contiv.models', []);
var ContivGlobals = (function () {
    var NETMASTER = '';
    return {
        'NETWORKS_ENDPOINT': NETMASTER + '/api/networks/',
        'POLICIES_ENDPOINT': NETMASTER + '/api/policys/',
        'RULES_ENDPOINT': NETMASTER + '/api/rules/',
        'APPLICATIONGROUPS_ENDPOINT': NETMASTER + '/api/endpointGroups/'
    }
})();
