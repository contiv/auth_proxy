/**
 * Created by cshampur on 6/23/16.
 */
angular.module('contiv.networks')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networks.details.stats', {
                url: '/stats',
                controller: 'NetworkStatsCtrl as networkStatsCtrl',
                templateUrl: 'networks/networkstats.html'
            })
        ;
    }])
    .controller('NetworkStatsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', '$filter', 'NetworksModel',
            function ($state, $stateParams, $scope, $interval, $filter, NetworksModel) {

                var networkStatsCtrl = this;

                /* Gets the Network Operational state from the server */
                function getNetworkInspect(refresh){
                    NetworksModel.getInspectByKey($stateParams.key, ContivGlobals.NETWORKS_INSPECT_ENDPOINT, refresh)
                        .then(function (result) {
                            networkStatsCtrl.networkInspectStats = result.Oper;
                            var endpoints = $filter('orderBy')(result.Oper.endpoints, 'name');
                            buildEndPoints(endpoints);
                        });
                }

                getNetworkInspect(false);

                /* This function would build the containerDetails object.
                eg :
                 networkStatsCtrl.containerDetails={
                                                    ContainerName1 : [{name: "homingHost", value: "cluster-node1", type: "string", format: "none"},
                                                                      {name: macAddress, value: "02:02", type:"string", format:"none"}
                                                                     ],
                                                    ContainerName2 : [{name: "homingHost", value: "cluster-node1" type: "string", format: "none"},
                                                                      {name: macAddress, value: "02:04", type: "string", format: "none"}
                                                                     ]
                                                   }
                 --Used in displaying the container detail inside an accordion.
                 */
                function buildEndPoints(endpoints){
                    var containerDetails = {};
                    for(var i in endpoints ){
                        var containerAttributes = [];
                        for(var key in endpoints[i]){
                            var endpointAttribute = {};
                            endpointAttribute.name = key;
                            endpointAttribute.format = 'none';
                            endpointAttribute.type = 'string';
                            switch (key){
                                case "ipAddress" :  endpointAttribute.value = endpoints[i][key].filter(function(ipAddress){return ipAddress.length > 0;}).join();
                                                    break;
                                case "labels" :     endpointAttribute.value = endpoints[i][key].replace(/(map\[|\])/gi,'').replace(/(:)/gi, '=').split(' ')
                                                                              .filter(function(v){return v.length > 0});
                                                    endpointAttribute.format = 'label';
                                                    endpointAttribute.type = 'array';
                                                    break;
                                default :           endpointAttribute.value = endpoints[i][key];
                            }
                            containerAttributes.push(endpointAttribute);
                        }
                        containerDetails[endpoints[i].name] = containerAttributes;
                    }

                    if(checkContainerChanged(networkStatsCtrl.containerDetails,containerDetails)){
                            networkStatsCtrl.endpoints = endpoints;
                            networkStatsCtrl.containerDetails = containerDetails;
                    }
                }

                /*  This function checks whether any new containers were added or not
                    View is updated only when there is a change in container configuration
                */
                function checkContainerChanged(contDetailsA, contDetailsB){
                    if(contDetailsA == undefined)
                        return true;
                    else{
                        if(contDetailsA != undefined && contDetailsB != undefined){
                            if(Object.keys(contDetailsA).length != Object.keys(contDetailsB).length)
                                return true;
                            for(var key in contDetailsB){
                                if(!key in contDetailsA)
                                    return true;
                            }
                            return false;
                        }
                    }

                }

                var promise;
                //Don't do autorefresh if one is already in progress
                if (!angular.isDefined(promise)) {
                    promise = $interval(function () {
                        getNetworkInspect(true);
                    }, ContivGlobals.REFRESH_INTERVAL);
                }

                //stop polling when user moves away from the page
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });
            }]);