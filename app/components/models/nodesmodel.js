/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.models')
    .factory('NodesModel', ['$http', '$q', function ($http, $q) {
        var URLS = {
            POST: ContivGlobals.CLUSTER_ENDPOINT,
            PUT: ContivGlobals.CLUSTER_ENDPOINT,
            DELETE: ContivGlobals.CLUSTER_ENDPOINT,
            GET: ContivGlobals.NODES_ENDPOINT
        };

        var nodesmodel = new NodesCollection($http, $q);
        return nodesmodel;
    }]);

function NodesCollection($http, $q) {
    var nodescollection = this,
        models;

    function extract(result) {
        //Convert to array if the returned collection is not an array
        return _.map(result.data, function (value, key) {
            value.key = key;
            return value;
        });
    }

    function cache(result) {
        models = extract(result);
        return models;
    }

    nodescollection.get = function () {
        return (models) ? $q.when(models) : $http.get(ContivGlobals.NODES_ENDPOINT).then(cache);
    };

    nodescollection.getModelByKey = function (key) {
        var deferred = $q.defer();

        function findModel() {
            return _.find(models, function (c) {
                return c.key == key;
            })
        }

        if (models) {
            deferred.resolve(findModel());
        } else {
            collection.get()
                .then(function () {
                    deferred.resolve(findModel());
                });
        }

        return deferred.promise;
    };

}