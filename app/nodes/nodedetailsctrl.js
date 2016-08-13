/**
 * Created by vjain3 on 3/25/16.
 */
angular.module('contiv.nodes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.nodes.details', {
                url: '/details/:key',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodedetails.html'
            })
            .state('contiv.menu.nodes.details.info', {
                url: '/info',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodeinfo.html'
            })
            .state('contiv.menu.nodes.details.stats', {
                url: '/stats',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodestats.html'
            })
            .state('contiv.menu.nodes.details.logs', {
                url: '/logs',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodelogs.html'
            })
            .state('contiv.menu.nodes.details.edit', {
                url: '/edit',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodeinfo.html'
            });

    }])
    .controller('NodeDetailsCtrl', ['$state', '$stateParams', '$scope', '$interval', 'NodesModel', 'BgpService',
        function ($state, $stateParams, $scope, $interval, NodesModel, BgpService) {
            var nodeDetailsCtrl = this;
            nodeDetailsCtrl.numberpattern = ContivGlobals.NUMBER_REGEX;

            function decommission() {
                var nodeOpsObj = {
                  nodes: [$stateParams.key]
                };
                NodesModel.decommission(nodeOpsObj).then(function (result) {
                    //Disable all buttons initially. Poll will assign values appropriately.
                    nodeDetailsCtrl.showCommissionButton = false;
                    nodeDetailsCtrl.commissionButtonEnabled = false;
                    nodeDetailsCtrl.upgradeButtonEnabled = false;
                });
            }

            function upgrade() {
                var nodeOpsObj = {
                    nodes: [$stateParams.key]
                };
                NodesModel.upgrade(nodeOpsObj).then(function (result) {
                    //Disable all buttons initially. Poll will assign values appropriately.
                    nodeDetailsCtrl.showCommissionButton = false;
                    nodeDetailsCtrl.commissionButtonEnabled = false;
                    nodeDetailsCtrl.upgradeButtonEnabled = false;
                });
            }

            /**
             * Display buttons based on status of node
             */
            function setButtonDisplay() {
                switch (nodeDetailsCtrl.node['inventory_state'].status) {
                    case 'Unallocated':
                        nodeDetailsCtrl.showCommissionButton = true;
                        nodeDetailsCtrl.commissionButtonEnabled = true;
                        nodeDetailsCtrl.upgradeButtonEnabled = false;
                        break;
                    case 'Decommissioned':
                        nodeDetailsCtrl.showCommissionButton = true;
                        nodeDetailsCtrl.commissionButtonEnabled = true;
                        nodeDetailsCtrl.upgradeButtonEnabled = false;
                        break;
                    case 'Provisioning':
                        nodeDetailsCtrl.showCommissionButton = true;
                        nodeDetailsCtrl.commissionButtonEnabled = false;
                        nodeDetailsCtrl.upgradeButtonEnabled = false;
                        break;
                    case 'Allocated':
                        nodeDetailsCtrl.showCommissionButton = false;
                        nodeDetailsCtrl.commissionButtonEnabled = true;
                        nodeDetailsCtrl.upgradeButtonEnabled = true;
                        break;
                    case 'Cancelled':
                        nodeDetailsCtrl.showCommissionButton = false;
                        nodeDetailsCtrl.commissionButtonEnabled = false;
                        nodeDetailsCtrl.upgradeButtonEnabled = false;
                        break;
                    case 'Maintenance':
                        nodeDetailsCtrl.showCommissionButton = true;
                        nodeDetailsCtrl.commissionButtonEnabled = false;
                        nodeDetailsCtrl.upgradeButtonEnabled = false;
                        break;
                    default://Cluster should not be in this state
                        nodeDetailsCtrl.showCommissionButton = true;
                        nodeDetailsCtrl.commissionButtonEnabled = false;
                        nodeDetailsCtrl.upgradeButtonEnabled = false;
                        break;
                }
            }

            function getNodeInfo(reload) {
                NodesModel.getModelByKey($stateParams.key, reload)
                    .then(function (node) {
                        nodeDetailsCtrl.node = node;
                        setButtonDisplay();
                    });
            }

            function setMode() {
                if ($state.is('contiv.menu.nodes.details.edit')) {
                    nodeDetailsCtrl.mode = 'edit';
                } else {
                    nodeDetailsCtrl.mode = 'details';
                }
            }

            function returnToInfo() {
                $state.go('contiv.menu.nodes.details.info');
            }

            function updateBgpInfo() {
                if (nodeDetailsCtrl.form.$valid) {
                    nodeDetailsCtrl.neighbor.key = $stateParams.key;

                    // backend only supports adding one neighbor currently
                    nodeDetailsCtrl.neighbors.forEach(function (item) {
                        nodeDetailsCtrl.neighbor['neighbor'] = item.name;
                        nodeDetailsCtrl.neighbor['neighbor-as'] = item.value;
                    });

                    BgpService.updateBgp(nodeDetailsCtrl).then(function successCallback(result) {
                        nodeDetailsCtrl.neighbor = result.config.data;
                        returnToInfo();

                    }, function errorCallback(result) {
                    });
                }
            }

            function getBgpInfo() {
                BgpService.getBgp(nodeDetailsCtrl).then(function successCallback(result) {
                    nodeDetailsCtrl.neighbor = result;
                }, function errorCallback(result) {
                });
            }

            function getBgpInspect() {
                BgpService.getBgpInspect($stateParams.key).then(function successCallback(result) {
                    nodeDetailsCtrl.inspect = result;
                    nodeDetailsCtrl.routes = result.Oper.routes;
                    nodeDetailsCtrl.filteredroutes = result.Oper.routes;
                }, function errorCallback(result) {
                });
            }

            nodeDetailsCtrl.decommission = decommission;
            nodeDetailsCtrl.upgrade = upgrade;

            nodeDetailsCtrl.setMode = setMode;
            nodeDetailsCtrl.updateBgpInfo = updateBgpInfo;
            nodeDetailsCtrl.returnToInfo = returnToInfo;
            nodeDetailsCtrl.neighbors = [];
            nodeDetailsCtrl.neighbor = {};
            nodeDetailsCtrl.key = $stateParams.key;
            getBgpInfo();
            getBgpInspect();
            setMode();

            //Load from cache for quick display initially
            getNodeInfo(false);

            var promise;
            //Don't do auto-refresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getNodeInfo(true);
                }, 5000);
            }
            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });

        }]);