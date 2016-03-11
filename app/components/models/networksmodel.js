angular.module('contiv.models.networks', [])
    .factory('NetworksModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: '/api/networks/',
            DELETE: '/api/networks/',
            GET: '/api/networks/'
        };
        return new Collection($http, $q, URLS);
    }]);
