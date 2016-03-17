angular.module('contiv.models')
    .factory('PoliciesModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: ContivGlobals.POLICIES_ENDPOINT,
            DELETE: ContivGlobals.POLICIES_ENDPOINT,
            GET: ContivGlobals.POLICIES_ENDPOINT
        };
        var policiesmodel = new Collection($http, $q, URLS);

        /**
         * Generate policy key to save policy on server
         * @param policy
         * @returns {string}
         */
        policiesmodel.generateKey = function (policy) {
            return policy.tenantName + ':' + policy.policyName;
        };

        return policiesmodel;
    }]);
