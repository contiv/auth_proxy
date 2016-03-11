angular.module('contiv.models.networks', [])
    .factory('NetworksModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: 'http://localhost:9999/api/networks/',
            DELETE: 'http://localhost:9999/api/networks/',
            GET: 'http://localhost:9999/api/networks/'
        };
        return new Collection($http, $q, URLS);
    }]);
