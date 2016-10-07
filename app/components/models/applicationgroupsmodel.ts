/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.models')
    .factory('ApplicationGroupsModel', ['$http', '$q', function ($http, $q) {
        var groupsmodel = new Collection($http, $q, ContivGlobals.APPLICATIONGROUPS_ENDPOINT);

        /**
         * Generate key for application group
         * @param group
         */
        groupsmodel.generateKey = function (group) {
            return group.tenantName + ':' + group.groupName;
        };

        return groupsmodel;
    }]);