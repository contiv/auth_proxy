angular.module('contiv.models.policies', [])
    .factory('PoliciesModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: 'http://localhost:9999/api/policys/',
            DELETE: 'http://localhost:9999/api/policys/',
            GET: 'http://localhost:9999/api/policys/'
        };
        return new Collection($http, $q, URLS);
    }]);
