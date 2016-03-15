angular.module('contiv.models')
    .factory('PoliciesModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: '/api/policys/',
            DELETE: '/api/policys/',
            GET: '/api/policys/'
        };
        return new Collection($http, $q, URLS);
    }]);
