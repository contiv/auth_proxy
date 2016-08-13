angular.module('contiv.nodes')
    .factory('BgpService', ['$http', '$q', function ($http, $q) {

        function getBgp(ctrl) {
            var deferred = $q.defer();
            var url = ContivGlobals.BGPS_ENDPOINT + ctrl.key + '/';
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
                ctrl.neighbor = result.data;
                ctrl.neighbors.push({'name': ctrl.neighbor['neighbor'], 'value': ctrl.neighbor['neighbor-as']});
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        function updateBgp(ctrl) {
            var url = ContivGlobals.BGPS_ENDPOINT + ctrl.key + '/';
            return $http.post(url, ctrl.neighbor);
        };

        function getBgpInspect(key) {
            var deferred = $q.defer();
            var url = ContivGlobals.BGPS_INSPECT_ENDPOINT + key + '/';
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }
        return {
            getBgp: getBgp,
            updateBgp: updateBgp,
            getBgpInspect: getBgpInspect
        }
    }]);