angular.module('contiv.visualization')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.visualization.list', {
                url: '/list',
                controller: 'VisualizationListCtrl as visualizationListCtrl',
                templateUrl: 'visualization/visualizationlist.html'
            })
        ;
    }])
    .controller('VisualizationListCtrl', ["$scope", "$http", 'VisualizationService', '$interval', 
        function($scope, $http, VisualizationService, $interval) {
            //to see the expected format to be returned from these calls,
            //look at app/components/graphobjects/datasource/visualizerdatasource.js
            var successGraphDataCallback = function(result) {
                var nodes = [];
                var links = [];
                var nodeIds = [];
                _.forEach(result.results[0].series, function(series) {
                    var endpoint = series.tags.EndpointIP;
                    var provider = series.tags.ProviderIP;
                    var node;
                    //creating nodes
                    if (_.includes(nodeIds, endpoint) == false) {
                        node = {
                            name: endpoint,
                            id: endpoint,
                            parent: null,
                            ancestors: null
                        };
                        nodes.push(node);
                        nodeIds.push(endpoint);
                    }
                    if (_.includes(nodeIds, provider) == false) {
                        node = {
                            name: provider,
                            id: provider,
                            parent: null,
                            ancestors: null
                        };
                        nodes.push(node);
                        nodeIds.push(provider);
                    }
                    //creating links
                    var linkOut = {
                        source: endpoint,
                        target: provider,
                        weight: series.values[0][2]
                    };
                    links.push(linkOut);
                    var linkIn = {
                        source: provider,
                        target: endpoint,
                        weight: series.values[0][1]
                    };
                    links.push(linkIn);
                });
                $scope.nodes = nodes;
                $scope.links = links;
            };
            //initial call
            VisualizationService.getGraphData().then(successGraphDataCallback, function errorCallback(result) {
                //will fail silently, graph won't be displayed
            });

            $scope.$on('$destroy', function () { $interval.cancel($scope.graphDataInterval); });

            VisualizationService.getStructureData().then(function successCallback(result) {
                //to see the expected form of ancestor_struct and children_struct, 
                //look at app/components/graphobjects/datasource/visualizerdatasource.js
                $scope.ancestors_struct = result.ancestors_struct;
                $scope.children_struct = result.children_struct;
                $scope.labels = result.labels;
                $scope.serviceSelectors = result.serviceSelectors;
            }, function errorCallback(result) {
                //will fail silently, graph won't be displayed
            });
    }]);











