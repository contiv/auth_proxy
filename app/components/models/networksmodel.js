angular.module('contiv.models')
    .factory('NetworksModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: ContivGlobals.NETWORKS_ENDPOINT,
            DELETE: ContivGlobals.NETWORKS_ENDPOINT,
            GET: ContivGlobals.NETWORKS_ENDPOINT
        };
        return new Collection($http, $q, URLS);
    }]);
