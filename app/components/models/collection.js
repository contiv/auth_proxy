function Collection($http, $q, URLS) {
    var collection = this,
        models,
        currentModel;

    function extract(result) {
        return result.data;
    }

    function cache(result) {
        models = extract(result);
        return models;
    }

    collection.get = function (reload) {
        if (reload === undefined) reload = false;
        return (!reload && models) ? $q.when(models) : $http.get(URLS.GET).then(cache);
    };

    collection.setCurrentModel = function (model) {
        return collection.getModelByKey(model).then(function (model) {
            currentModel = model;
        })
    };

    collection.getCurrentModel = function () {
        return currentModel;
    };

    collection.getCurrentModelKey = function () {
        return currentModel ? currentModel.key : '';
    };

    collection.getModelByKey = function (key, reload) {
        if (reload === undefined) reload = false;

        var deferred = $q.defer();

        function findModel() {
            return _.find(models, function (c) {
                return c.key == key;
            })
        }

        if (!reload && models) {
            deferred.resolve(findModel());
        } else {
            collection.get(reload)
                .then(function () {
                    deferred.resolve(findModel());
                });
        }

        return deferred.promise;
    };

    collection.create = function (model) {
        var deferred = $q.defer();
        var url = URLS.POST + model.key + '/';
        $http.post(url, model)
            .then(function successCallback(response) {
                models = models || [];
                models.push(extract(response));
                deferred.resolve(extract(response));
            }, function errorCallback(response) {
                deferred.reject(extract(response));
            });
        return deferred.promise;
    };

    collection.save = function (model) {
        var deferred = $q.defer();
        var url = URLS.PUT + model.key + '/';
        $http.put(url, model)
            .then(function successCallback(response) {
                models = models || [];
                _.remove(models, function (n) {
                    return n.key == model.key;
                });
                models.push(extract(response));
                deferred.resolve(extract(response));
            }, function errorCallback(response) {
                deferred.reject(extract(response));
            });
        return deferred.promise;
    };

    collection.delete = function (model) {
        var url = URLS.DELETE + model.key + '/';
        $http.delete(url)
            .then(function successCallback(response) {
                _.remove(models, function (n) {
                    return n.key == model.key;
                });
            }, function errorCallback(response) {

            });
    };

    collection.deleteUsingKey = function (key) {
        var deferred = $q.defer();
        var url = URLS.DELETE + key + '/';
        $http.delete(url)
            .then(function successCallback(response) {
                _.remove(models, function (n) {
                    return n.key == key;
                });
                deferred.resolve(extract(response));
            }, function errorCallback(response) {
                deferred.reject(extract(response));
            });
        return deferred.promise;
    }
}
