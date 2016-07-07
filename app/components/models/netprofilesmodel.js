/**
 * Created by hardik gandhi on 6/15/16.
 */

angular.module('contiv.models')
    .factory('NetprofilesModel', ['$http', '$q', function ($http, $q) {
        var netprofilesModel = new Collection($http, $q, ContivGlobals.NETPROFILES_ENDPOINT);

        /**
         * Generate policy key to save policy on server
         * @param policy
         * @returns {string}
         */
        netprofilesModel.generateKey = function (policy) {
            return policy.tenantName + ':' + policy.profileName;
        };

        return netprofilesModel;
    }]);
