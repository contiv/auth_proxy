/**
 * BaseCollection class that does just fetch of the objects.
 * @param $http
 * @param $q
 * @param url
 * @constructor
 */
function BaseCollection($http, $q, url) {
    this.models = [];
    this.$http = $http;
    this.$q = $q;
    this.url = url;
}

BaseCollection.prototype.extract = function (result) {
    return result.data;
};

BaseCollection.prototype.get = function (reload) {
    var collection = this;
    if (reload === undefined) reload = false;
    return (!reload && collection.models.length > 0) ?
        collection.$q.when(collection.models) : collection.$http.get(collection.url)
        .then(function (result) {
            collection.models = collection.extract(result);
            return collection.models;
        });
};

BaseCollection.prototype.getModelByKey = function (key, reload) {
    var collection = this;
    if (reload === undefined) reload = false;

    var deferred = collection.$q.defer();

    function findModel() {
        return _.find(collection.models, function (c) {
            return c.key == key;
        })
    }

    if (!reload && collection.models.length > 0) {
        deferred.resolve(findModel());
    } else {
        collection.get(reload)
            .then(function () {
                deferred.resolve(findModel());
            });
    }

    return deferred.promise;
};

BaseCollection.prototype.getModel = function (model, reload) {
    var collection = this;
    if (reload === undefined) reload = false;

    var deferred = collection.$q.defer();

    function findModel() {
        return _.find(collection.models, model)
    }

    if (!reload && collection.models.length > 0) {
        deferred.resolve(findModel());
    } else {
        collection.get(reload)
            .then(function () {
                deferred.resolve(findModel());
            });
    }

    return deferred.promise;
};


/**
 * Extends BaseCollection class to do create, update and delete using POST, PUT and DELETE verbs.
 * @param $http
 * @param $q
 * @param url
 * @constructor
 */
function Collection($http, $q, url) {
    BaseCollection.call(this, $http, $q, url);
}

Collection.prototype = Object.create(BaseCollection.prototype);

Collection.prototype.create = function (model) {
    var collection = this;
    var deferred = collection.$q.defer();
    var url = collection.url + model.key + '/';
    collection.$http.post(url, model)
        .then(function successCallback(response) {
            collection.models.push(collection.extract(response));
            deferred.resolve(collection.extract(response));
        }, function errorCallback(response) {
            deferred.reject(collection.extract(response));
        });
    return deferred.promise;
};

Collection.prototype.save = function (model) {
    var collection = this;
    var deferred = collection.$q.defer();
    var url = collection.url + model.key + '/';
    collection.$http.put(url, model)
        .then(function successCallback(response) {
            _.remove(collection.models, function (n) {
                return n.key == model.key;
            });
            collection.models.push(collection.extract(response));
            deferred.resolve(collection.extract(response));
        }, function errorCallback(response) {
            deferred.reject(collection.extract(response));
        });
    return deferred.promise;
};

Collection.prototype.delete = function (model) {
    var collection = this;
    var deferred = collection.$q.defer();
    var url = collection.url + model.key + '/';
    collection.$http.delete(url)
        .then(function successCallback(response) {
            _.remove(collection.models, function (n) {
                return n.key == model.key;
            });
            deferred.resolve(collection.extract(response));
        }, function errorCallback(response) {
            deferred.reject(collection.extract(response));
        });
    return deferred.promise;
};

Collection.prototype.deleteUsingKey = function (key) {
    var collection = this;
    var deferred = collection.$q.defer();
    var url = collection.url + key + '/';
    collection.$http.delete(url)
        .then(function successCallback(response) {
            _.remove(collection.models, function (n) {
                return n.key == key;
            });
            deferred.resolve(collection.extract(response));
        }, function errorCallback(response) {
            deferred.reject(collection.extract(response));
        });
    return deferred.promise;
};