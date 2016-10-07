/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.models')
    .factory('VolumesModel', ['$http', '$q', function ($http, $q) {
        /**
         * VolumesCollection extends from BaseCollection
         * @param $http
         * @param $q
         * @constructor
         */
        function VolumesCollection($http, $q) {
            Collection.call(this, $http, $q, ContivGlobals.VOLUMES_ENDPOINT);
        }

        VolumesCollection.prototype = Object.create(Collection.prototype);

        VolumesCollection.prototype.delete = function (model) {
            var volumescollection = this;
            var deferred = volumescollection.$q.defer();
            var url = ContivGlobals.VOLUMES_DELETE_ENDPOINT;
            //delete endpoint expects volume property in addition to policy. TODO ask to be fixed
            model.volume = model.name;
            var config = {
                data: model
            };
            volumescollection.$http.delete(url, config)
                .then(function successCallback(response) {
                    _.remove(volumescollection.models, function (n) {
                        return (n.name == model.name && n.policy == model.policy);
                    });
                    deferred.resolve(volumescollection.extract(response));
                }, function errorCallback(response) {
                    deferred.reject(volumescollection.extract(response));
                });
            return deferred.promise;
        };

        VolumesCollection.prototype.create = function (model) {
            var collection = this;
            var url = ContivGlobals.VOLUMES_CREATE_ENDPOINT;
            return Collection.prototype.create.call(collection, model, url);
        };

        VolumesCollection.prototype.copy = function (model, snapshot, newVolume) {
            var collection = this;
            var deferred = collection.$q.defer();
            var url = ContivGlobals.VOLUMES_COPYSNAPSHOTS_ENDPOINT;
            var volcopymodel = {
                name: model.name,
                policy: model.policy,
                Options: {
                    target: newVolume,
                    snapshot: snapshot
                }
            };
            collection.$http.post(url, volcopymodel)
                .then(function successCallback(response) {
                    collection.models.push(collection.extract(response));
                    deferred.resolve(collection.extract(response));
                }, function errorCallback(response) {
                    deferred.reject(collection.extract(response));
                });
            return deferred.promise;
        };

        var volumesmodel = new VolumesCollection($http, $q);
        return volumesmodel;
    }]);