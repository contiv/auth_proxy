angular.module('contiv.nodes')
    .factory('NodeService', ['$http', '$q', function ($http, $q) {
        function getActiveLogs() {
            var deferred = $q.defer();
            var url = ContivGlobals.NODES_ACTIVE_JOB_ENDPOINT;
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        function getLastLogs() {
            var deferred = $q.defer();
            var url = ContivGlobals.NODES_LAST_JOB_ENDPOINT;
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        return {
            getActiveLogs: getActiveLogs,
            getLastLogs: getLastLogs
        }
    }]);