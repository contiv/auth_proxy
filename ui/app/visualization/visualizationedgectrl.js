

angular.module('contiv.visualization')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.visualization.edge', {
                url: '/edge/{sourceName, targetName, sourceList, targetList}',
                params: {
                    sourceName: null,
                    targetName: null,
                    sourceList: null,
                    targetList: null
                },
                controller: 'VisualizationEdgeCtrl as visualizationedgeCtrl',
                templateUrl: 'visualization/visualizationedge.html'
            })
        ;
    }])
    .controller('VisualizationEdgeCtrl', ["$scope", "$http", '$state', '$stateParams', 'VisualizationService', '$interval',
        function($scope, $http, $state, $stateParams, VisualizationService, $interval) {
            var sourceName = $stateParams.sourceName;
            var targetName = $stateParams.targetName;
            var sourceList = $stateParams.sourceList;
            var targetList = $stateParams.targetList;

            //If the page is reloaded, these state params are all null,
            //so it will route them back to the visualization tab top view
            if (sourceList == null || targetList == null) {
                $state.go('contiv.menu.visualization.list');
                return;
            }

            var d = new Date();
            var t = d.getSeconds();
            $scope.edgeDataInterval = 
                $interval(function() {
                    VisualizationService.getEdgeData(sourceList, targetList, t.toString())
                        .then(function successCallback(result) {
                            var results = result.results;
                            var data = 0;
                            _.forEach(results, function(r) {
                                if (_.isEmpty(r) === false) {
                                    data += r.series[0].values[0][1];
                                }
                            });
                            $scope.sourceName = sourceName;
                            $scope.targetName = targetName;
                            $scope.edgeData = data;
                            $scope.edgeDataTime = t;
                        }, function errorCallback(result) {
                        });
                    }, 3000);

            //Destroying the interval function on route change
            $scope.$on('$destroy', function () { $interval.cancel($scope.edgeDataInterval); });


            VisualizationService.getOldEdgeData(sourceList, targetList)
                .then(function successCallback(result) {
                    var results = result.results;
                    var edgeData = [];
                    //results, if not empty, are expected to have
                    //6 data entries
                    _.forEach(results, function(r) {
                        if (_.isEmpty(r) === false) {
                            var data = r.series[0].values;
                            if (_.isEmpty(edgeData)) {
                                _.forEach(data, function(d) {
                                    edgeData.push(d[1]);
                                })
                            } else {
                                _.forEach(data, function(d, i) {
                                    edgeData[i] += d[1];
                                })
                            }
                        }
                    });

                    $scope.sourceName = sourceName;
                    $scope.targetName = targetName;
                    $scope.sourceList = sourceList;
                    $scope.targetList = targetList;
                    $scope.oldEdgeData = edgeData;
                }, function errorCallback(result) {
                });
    }]);




