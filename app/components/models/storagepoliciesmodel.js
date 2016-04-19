/**
 * Created by vjain3 on 4/18/16.
 */
angular.module('contiv.models')
    .factory('StoragePoliciesModel', ['$http', '$q', function ($http, $q) {
        var policiesmodel = new StoragePoliciesCollection($http, $q);
        return policiesmodel;
    }]);

function StoragePoliciesCollection($http, $q) {
    var policiescollection = this,
        models;

    function extract(result) {
        return result.data;
    }

    function cache(result) {
        models = extract(result);
        return models;
    }

    policiescollection.get = function (reload) {
        if (reload === undefined) reload = false;
        return (!reload && models) ? $q.when(models) : $http.get(ContivGlobals.STORAGEPOLICIES_ENDPOINT).then(cache);
    };

    policiescollection.getModelByKey = function (key, reload) {
        if (reload === undefined) reload = false;

        var deferred = $q.defer();

        function findModel() {
            return _.find(models, function (c) {
                return (c.name == key.name);
            })
        }

        if (!reload && models) {
            deferred.resolve(findModel());
        } else {
            policiescollection.get()
                .then(function () {
                    deferred.resolve(findModel());
                });
        }

        return deferred.promise;
    };
}