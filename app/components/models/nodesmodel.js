/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.models')
    .factory('NodesModel', ['$http', '$q', function ($http, $q) {
        var nodesmodel = new NodesCollection($http, $q);
        return nodesmodel;
    }]);

/**
 * NodesCollection extends from BaseCollection. It overrides extract() and adds commission, decommission, upgrade and
 * discover methods
 * @param $http
 * @param $q
 * @constructor
 */
function NodesCollection($http, $q) {
    BaseCollection.call(this, $http, $q, ContivGlobals.NODES_LIST_ENDPOINT);
}

NodesCollection.prototype = Object.create(BaseCollection.prototype);

NodesCollection.prototype.extract = function (result) {
    //Convert to array if the returned collection is not an array
    return _.map(result.data, function (value, key) {
        value.key = key;
        return value;
    });
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
NodesCollection.prototype.commission = function (key, extraVars) {
    var nodescollection = this;
    var deferred = nodescollection.$q.defer();
    var queryString = 'extra_vars=' + JSON.stringify(extraVars);
    var url = ContivGlobals.NODES_COMMISSION_ENDPOINT + key + '?' + queryString;
    nodescollection.$http.post(url, {}, {
            'headers': {
                'Content-Type': 'application/json'
            }
        })
        .then(function successCallback(response) {
            //Server doesn't return any json in response
            deferred.resolve();
        }, function errorCallback(response) {
            deferred.reject(response);
        });
    return deferred.promise;
};

NodesCollection.prototype.decommission = function (key) {
    var nodescollection = this;
    var deferred = nodescollection.$q.defer();
    var url = ContivGlobals.NODES_DECOMMISSION_ENDPOINT + key;
    nodescollection.$http.post(url, {}, {
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

NodesCollection.prototype.upgrade = function (key) {
    var nodescollection = this;
    var deferred = nodescollection.$q.defer();
    var url = ContivGlobals.NODES_MAINTENANCE_ENDPOINT + key;
    nodescollection.$http.post(url, {}, {
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

/**
 *
 * @param ip
 * @param extraVars JSON object of extra ansible and environment variables to be passed while discovering a node
 * {
     * "env":{"http_proxy":"http://proxy.esl.cisco.com:8080", "https_proxy":"http://proxy.esl.cisco.com:8080"},
     * "control_interface": "eth1", "service_vip": "192.168.2.252", "cluster-name": "contiv", "node-label" : "node1"
     * }
 * @returns {*}
 */
NodesCollection.prototype.discover = function (ip, extraVars) {
    var nodescollection = this;
    var deferred = nodescollection.$q.defer();
    var queryString = 'extra_vars=' + JSON.stringify(extraVars);
    var url = ContivGlobals.NODES_DISCOVER_ENDPOINT + ip + '?' + queryString;
    nodescollection.$http.post(url, {}, {
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