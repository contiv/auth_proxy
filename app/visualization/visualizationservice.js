angular.module('contiv.visualization')
    .factory('VisualizationService', ['$http', '$q', function ($http, $q) {
        /**
         * Makes a get request with the url and config.
         *
         * @param      {string}  url     The url
         * @param      {Object}  config  The configurations
         * @return     {$Http Promise}   Promise of the request
         */
        function makeGet(url, config) {
            var deferred = $q.defer();
            $http.get(url, config).then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        /**
         * Makes a post request with the url and data
         *
         * @param      {string}  url     The url
         * @param      {JSON}    data    The data
         * @return     {$Http Promise}   Promise of the request
         */
        function makePost(url, data) {
            /**
             * converts the data into x-www-from-urlencoded
             *
             * @param      {JSON}  obj     JSON data object
             * @return     {string}  x-www-form-urlencoded string
             */
            var param = function(obj) {
                var query = '', name, value, fullSubName, subName, subValue, innerObj, i;
                for (name in obj) {
                  value = obj[name];

                    if (value instanceof Array) {
                        for (i=0; i<value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if(value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                   }
                }

                return query.length ? query.substr(0, query.length - 1) : query;
            };

            var deferred = $q.defer();
            $http({
                url:url,
                method:'POST',
                data: data,
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                transformRequest: [function(data) {
                    return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
                  }]
            })
            .then(function successCallback(result) {
                deferred.resolve(result.data);
            }, function errorCallback(result) {
                deferred.reject(result.data);
            });
            return deferred.promise;
        }

        function getGraphData() {
            var url = ContivGlobals.VISUALIZATION_ENDPOINT;
            url += 'influx/query';
            var config = {
                params: {
                    db:"telegraf",
                    q:"SELECT BytesIn, BytesOut, EndpointIP, ProviderIP FROM httpjson_svcstats WHERE time > now() - 1m GROUP BY * LIMIT 1"
                }
            };
            return makeGet(url, config);
        }

        function getStructureData() {
            var url = ContivGlobals.VISUALIZATION_ENDPOINT;
            url += 'services';
            return makeGet(url);
        }

        function buildWhereQuery(points, type) {
            var query = "(";
            query += type + "=";
            query += "'" + points[0] + "' ";
            //starts at 1, so will not run if length is 1
            for (var i = 1; i < points.length; i++) {
                query += 'OR ';
                query += type + "=";
                query += "'" + points[i] + "' ";
            }
            query += ")";
            return query;
        }

        function getEdgeData(sourceList, targetList, time) {
            var url = ContivGlobals.VISUALIZATION_ENDPOINT;
            url += 'influx/query';

            var data = {
                    db : "telegraf",
                    q: "SELECT sum(" + 'BytesOut' + ") from httpjson_svcstats WHERE time > now() - 15s AND "
                         + buildWhereQuery(sourceList, "EndpointIP") +" AND " 
                         + buildWhereQuery(targetList, 'ProviderIP') 
                         + "GROUP BY time(20s) LIMIT 1; SELECT sum(" + 'BytesIn' + ") from httpjson_svcstats WHERE time > now() - 15s AND "
                         + buildWhereQuery(sourceList, 'ProviderIP') +" AND " 
                         + buildWhereQuery(targetList, 'EndpointIP') 
                         + "GROUP BY time(20s) fill(0) LIMIT 1"
                     };
            return makePost(url, data);
        }

        

        function getOldEdgeData(sourceList, targetList) {
            var url = ContivGlobals.VISUALIZATION_ENDPOINT;
            url += 'influx/query';
            var data = {
                    db : "telegraf",
                    q: "SELECT sum(" + 'BytesOut' + ") FROM httpjson_svcstats WHERE time > now() - 1m AND "
                         + buildWhereQuery(sourceList, "EndpointIP") +" AND " 
                         + buildWhereQuery(targetList, "ProviderIP") 
                         + " GROUP BY time(10s) fill(0) LIMIT 6; SELECT sum(" + 'BytesIn' + ") FROM httpjson_svcstats WHERE time > now() - 1m AND "
                         + buildWhereQuery(sourceList, "ProviderIP") +" AND " 
                         + buildWhereQuery(targetList, "EndpointIP") 
                         + " GROUP BY time(10s) fill(0) LIMIT 6"
                     };
            return makePost(url, data);
        }

        return {
            getGraphData: getGraphData,
            getStructureData: getStructureData,
            getEdgeData: getEdgeData,
            getOldEdgeData: getOldEdgeData
        }
    }]);






