/**
 * BaseCollection class that does just fetch of the objects.
 * @param $http
 * @param $q
 * @param url Used for doing HTTP GET and fetch objects from server
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

/**
 *
 * @param reload Optional. Default is false
 * @returns {*}
 */
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

/**
 *
 * @param key
 * @param reload Optional. Default is false
 * @param keyname
 * @returns {*}
 */
BaseCollection.prototype.getModelByKey = function (key, reload, keyname) {
    var collection = this;
    if (reload === undefined) reload = false;
    if (keyname === undefined) keyname = 'key';

    var deferred = collection.$q.defer();

    function findModel() {
        return _.find(collection.models, function (c) {
            return c[keyname] == key;
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

/**
 *
 * @param model
 * @param reload Optional. Default is false
 * @returns {*}
 */
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
 * @param url Used for doing HTTP GET and fetch objects from server
 * @constructor
 */
function Collection($http, $q, url) {
    BaseCollection.call(this, $http, $q, url);
    this.inspectStats = {};
}

Collection.prototype = Object.create(BaseCollection.prototype);

/**
 *
 * @param model
 * @param url Optional if not passed it is constructed using key and url passed in constructor
 * @returns {*}
 */
Collection.prototype.create = function (model, url) {
    var collection = this;
    var deferred = collection.$q.defer();
    
    if (url === undefined) url = collection.url + model.key + '/';
    collection.$http.post(url, model)
        .then(function successCallback(response) {
            var responseData = collection.extract(response);
            //For rest endpoints that do not return created json object in response
            if ((responseData === undefined) || (responseData === '')) {
                responseData = model;
            }
            //collection.models.push(collection.extract(response));
            collection.models.push(responseData);
            deferred.resolve(collection.extract(response));
        }, function errorCallback(response) {
            deferred.reject(collection.extract(response));
        });
    return deferred.promise;
};

/**
 * This is for netmaster specific endpoints and used by netmaster objects only.
 * TODO: Generalize
 * @param model
 * @param url Optional
 * @returns {*}
 */
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

/**
 * This is for netmaster specific endpoints and used by netmaster objects only.
 * TODO: Generalize
 * @param model
 * @returns {*}
 */
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

/**
 *
 * @param key
 * @param keyname
 * @param url Optional if not passed it is constructed using key and url passed in constructor
 * @returns {*}
 */
Collection.prototype.deleteUsingKey = function (key, keyname, url) {
    var collection = this;
    if (keyname === undefined) keyname = 'key';

    var deferred = collection.$q.defer();
    if (url === undefined) url = collection.url + key + '/';
    collection.$http.delete(url)
        .then(function successCallback(response) {
            _.remove(collection.models, function (n) {
                return n[keyname] == key;
            });
            deferred.resolve(collection.extract(response));
        }, function errorCallback(response) {
            deferred.reject(collection.extract(response));
        });
    return deferred.promise;
};


Collection.prototype.getInspectByKey = function(key, url, refresh){
    var collection = this;
    var deferred = collection.$q.defer();
    if(key in collection.inspectStats && refresh == false){
        deferred.resolve(collection.inspectStats[key]);
    }
    else {
        collection.$http.get(url + key + '/')
            .then(function successCallback(response) {
                    var responseStats = collection.extract(response);
                    collection.inspectStats[key] = responseStats
                    deferred.resolve(responseStats);
                }
                , function errorCallback(error) {
                    deferred.reject(error);
                });
    }
    return deferred.promise;
};