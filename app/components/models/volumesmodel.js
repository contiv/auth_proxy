/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.models')
    .factory('VolumesModel', ['$http', '$q', function ($http, $q) {
        var volumesmodel = new VolumesCollection($http, $q);
        return volumesmodel;
    }]);

function VolumesCollection($http, $q) {
    var volumescollection = this,
        models;

    function extract(result) {
        return result.data.Volumes;
    }

    function cache(result) {
        models = extract(result);
        return models;
    }

    volumescollection.get = function () {
        return (models) ? $q.when(models) : $http.get(ContivGlobals.VOLUMES_ENDPOINT).then(cache);
    };

    volumescollection.getModelByKey = function (key) {
        var deferred = $q.defer();

        function findModel() {
            return _.find(models, function (c) {
                return c.Name == key;
            })
        }

        if (models) {
            deferred.resolve(findModel());
        } else {
            volumescollection.get()
                .then(function () {
                    deferred.resolve(findModel());
                });
        }

        return deferred.promise;
    };

}