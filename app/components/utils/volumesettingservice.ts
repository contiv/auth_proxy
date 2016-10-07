angular.module('contiv.utils')
    .factory('VolumeSettingService', ['$http', '$q', function ($http, $q) {

        function getSettings() {
            var deferred = $q.defer();
            var url = ContivGlobals.VOLUMES_GLOBAL_ENDPOINT;
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        function updateSettings(setting) {
            return $http.post(ContivGlobals.VOLUMES_GLOBAL_ENDPOINT, setting);
        }

        return {
            getSettings: getSettings,
            updateSettings: updateSettings
        }
    }]);