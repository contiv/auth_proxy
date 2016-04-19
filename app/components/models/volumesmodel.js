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
        return result.data;
    }

    function cache(result) {
        models = extract(result);
        return models;
    }

    volumescollection.get = function (reload) {
        if (reload === undefined) reload = false;
        return (!reload && models) ? $q.when(models) : $http.get(ContivGlobals.VOLUMES_ENDPOINT).then(cache);
    };

    volumescollection.getModelByKey = function (key, reload) {
        if (reload === undefined) reload = false;

        var deferred = $q.defer();

        function findModel() {
            return _.find(models, function (c) {
                var tokens = key.split('/');
                return (c.name == tokens[1] && c.policy == tokens[0]);
            })
        }

        if (!reload && models) {
            deferred.resolve(findModel());
        } else {
            volumescollection.get(reload)
                .then(function () {
                    deferred.resolve(findModel());
                });
        }

        return deferred.promise;
    };

    volumescollection.delete = function (model) {
        var url = ContivGlobals.VOLUMES_DELETE_ENDPOINT + model.policy + '/' + model.name;
        $http.post(url, model)
            .then(function successCallback(response) {
                _.remove(models, function (n) {
                    return (n.name == model.name && n.policy == model.name);
                });
            }, function errorCallback(response) {

            });
    }
}