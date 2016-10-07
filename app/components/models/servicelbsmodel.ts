/**
 * Created by vjain3 on 5/11/16.
 */
angular.module('contiv.models')
    .factory('ServicelbsModel', ['$http', '$q', function ($http, $q) {
        return new Collection($http, $q, ContivGlobals.SERVICELBS_ENDPOINT);
    }]);
