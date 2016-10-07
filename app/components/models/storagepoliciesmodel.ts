/**
 * Created by vjain3 on 4/18/16.
 */
angular.module('contiv.models')
    .factory('StoragePoliciesModel', ['$http', '$q', function ($http, $q) {
        /**
         * StoragePoliciesCollection extends from BaseCollection
         * @param $http
         * @param $q
         * @constructor
         */
        function StoragePoliciesCollection($http, $q) {
            Collection.call(this, $http, $q, ContivGlobals.STORAGEPOLICIES_ENDPOINT);
        }

        StoragePoliciesCollection.prototype = Object.create(Collection.prototype);

        StoragePoliciesCollection.prototype.create = function (model) {
            var collection = this;
            var url = collection.url + model.name;
            return Collection.prototype.create.call(collection, model, url);
        };

        StoragePoliciesCollection.prototype.save = function (model) {
            var collection = this;
            var deferred = collection.$q.defer();
            var url = collection.url + model.name;
            collection.$http.post(url, model)
                .then(function successCallback(response) {
                    _.remove(collection.models, function (n) {
                        return n.name == model.name;
                    });
                    collection.models.push(model);
                    deferred.resolve(collection.extract(response));
                }, function errorCallback(response) {
                    deferred.reject(collection.extract(response));
                });
            return deferred.promise;
        };
        var policiesmodel = new StoragePoliciesCollection($http, $q);
        return policiesmodel;
    }]);