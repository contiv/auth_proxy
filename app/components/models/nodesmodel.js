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
        return (models) ? $q.when(models) : $http.get(ContivGlobals.NODES_LIST_ENDPOINT).then(cache);
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
            nodescollection.get()
                .then(function () {
                    deferred.resolve(findModel());
                });
        }

        return deferred.promise;
    };

    /**
     *
     * @param key
     * @param extraVars JSON object of extra ansible and environment variables to be passed while commissioning a node
     * {
     * "env":{"http_proxy":"http://proxy.esl.cisco.com:8080", "https_proxy":"http://proxy.esl.cisco.com:8080"},
     * "control_interface": "eth1", "service_vip": "192.168.2.252", "validate_certs": "false", "netplugin_if" : "eth2"
     * }
     * @returns {*}
     */
    nodescollection.commission = function (key, extraVars) {
        var deferred = $q.defer();
        var queryString = encodeURIComponent('extra_vars=' + JSON.stringify(extraVars));
        var url = ContivGlobals.NODES_COMMISSION_ENDPOINT + key + '?' + queryString;
        $http.post(url, {}, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            })
            .then(function successCallback(response) {
                deferred.resolve();
            }, function errorCallback(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    nodescollection.decommission = function (key) {
        var deferred = $q.defer();
        var url = ContivGlobals.NODES_DECOMMISSION_ENDPOINT + key;
        $http.post(url, {}, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            })
            .then(function successCallback(response) {
                deferred.resolve();
            }, function errorCallback(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    };

    nodescollection.upgrade = function (key) {
        var deferred = $q.defer();
        var url = ContivGlobals.NODES_MAINTENANCE_ENDPOINT + key;
        $http.post(url, {}, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            })
            .then(function successCallback(response) {
                deferred.resolve();
            }, function errorCallback(response) {
                deferred.reject(response);
            });
        return deferred.promise;
    }
}