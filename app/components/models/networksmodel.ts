angular.module('contiv.models')
    .factory('NetworksModel', ['$http', '$q', function ($http, $q) {
        return new Collection($http, $q, ContivGlobals.NETWORKS_ENDPOINT);
    }]);
