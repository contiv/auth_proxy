/**
 * Created by vjain3 on 3/8/16.
 */
angular.module('contiv.models.rules', [])
    .factory('RulesModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: '/api/rules/',
            DELETE: '/api/rules/',
            GET: '/api/rules/'
        };
        return new Collection($http, $q, URLS);
    }]);