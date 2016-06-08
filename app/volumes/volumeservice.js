/**
 * Created by vjain3 on 6/5/16.
 */
angular.module('contiv.volumes')
    .factory('VolumeService', ['$http', '$q', function ($http, $q) {
        function getVolumeUseInfo(volume) {
            var deferred = $q.defer();
            var url = ContivGlobals.VOLUMES_USES_ENDPOINT
                + volume.policy
                + '/' + volume.name;
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                //Returns error if volume is not mounted by any container
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        function getVolumeSnapshots(volume) {
            var deferred = $q.defer();
            var url = ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT
                + volume.policy
                + '/' + volume.name;
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        return {
            getVolumeUseInfo: getVolumeUseInfo,
            getVolumeSnapshots: getVolumeSnapshots
        }
    }]);