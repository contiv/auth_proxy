/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.models')
    .factory('ApplicationGroupsModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: ContivGlobals.APPLICATIONGROUPS_ENDPOINT,
            PUT: ContivGlobals.APPLICATIONGROUPS_ENDPOINT,
            DELETE: ContivGlobals.APPLICATIONGROUPS_ENDPOINT,
            GET: ContivGlobals.APPLICATIONGROUPS_ENDPOINT
        };

        var groupsmodel = new Collection($http, $q, URLS);

        /**
         * Generate key for application group
         * @param group
         */
        groupsmodel.generateKey = function (group) {
            return group.tenantName + ':' + group.networkName + ':' + group.groupName;
        };

        return groupsmodel;
    }]);