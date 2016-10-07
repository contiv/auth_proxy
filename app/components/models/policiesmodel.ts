angular.module('contiv.models')
    .factory('PoliciesModel', ['$http', '$q', function ($http, $q) {
        var policiesmodel = new Collection($http, $q, ContivGlobals.POLICIES_ENDPOINT);

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
