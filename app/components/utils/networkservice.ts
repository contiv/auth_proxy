angular.module('contiv.utils')
    .factory('NetworkService', ['$http', '$q', function ($http, $q) {

        function getSettings() {
            var deferred = $q.defer();
            var url = ContivGlobals.NETWORK_SETTINGS_ENDPOINT;
            $http.get(url).then(function successCallback(result) {
                deferred.resolve(result.data[0]);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        function updateSettings(setting) {
            return $http.post(ContivGlobals.NETWORK_SETTINGS_ENDPOINT 
                + 'global/', setting);
        };

        return {
            getSettings: getSettings,
            updateSettings: updateSettings
        }
    }]);