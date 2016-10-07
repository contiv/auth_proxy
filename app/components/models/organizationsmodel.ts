angular.module('contiv.models')
    .factory('OrganizationsModel', ['$http', '$q', function ($http, $q) {
        return new Collection($http, $q, ContivGlobals.ORGANIZATIONS_ENDPOINT);
    }]);