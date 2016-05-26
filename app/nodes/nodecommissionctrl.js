/**
 * Created by vjain3 on 3/25/16.
 */
angular.module('contiv.nodes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.nodes.commission', {
                url: '/commission/:key',
                controller: 'NodeCommissionCtrl as nodeCommissionCtrl',
                templateUrl: 'nodes/nodecommission.html'
            })
            .state('contiv.menu.nodes.discover', {
                url: '/discover',
                controller: 'NodeCommissionCtrl as nodeCommissionCtrl',
                templateUrl: 'nodes/nodecommission.html'
            })
        ;
    }])
    .controller('NodeCommissionCtrl', [
        '$state', '$stateParams', 'NodesModel', 'CRUDHelperService',
        function ($state, $stateParams, NodesModel, CRUDHelperService) {
            var nodeCommissionCtrl = this;

            /**
             * To show commission or discover screen based on the route
             */
            function setMode() {
                if ($state.is('contiv.menu.nodes.commission')) {
                    nodeCommissionCtrl.mode = 'commission';
                } else {
                    nodeCommissionCtrl.mode = 'discover';
                }
            }

            function returnToNodeDetails() {
                $state.go('contiv.menu.nodes.details.info', {'key': $stateParams.key});
            }

            function returnToNodes() {
                $state.go('contiv.menu.nodes.list');
            }

            function cancelCommissioningNode() {
                returnToNodeDetails();
            }

            function cancelDiscoveringNode() {
                returnToNodes();
            }

            function createExtraVars() {
                //Add ansible variables to extra_vars
                nodeCommissionCtrl.ansibleVariables.forEach(function (item) {
                    nodeCommissionCtrl.extra_vars[item.name] = item.value
                });
                //Add environment variables to extra_vars
                var envVars = {};
                nodeCommissionCtrl.envVariables.forEach(function (item) {
                    envVars[item.name] = item.value;
                });
                nodeCommissionCtrl.extra_vars['env'] = envVars;
                nodeCommissionCtrl.nodeOpsObj.extra_vars = JSON.stringify(nodeCommissionCtrl.extra_vars);
            }

            function commission() {
                if (nodeCommissionCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(nodeCommissionCtrl);
                    CRUDHelperService.startLoader(nodeCommissionCtrl);
                    nodeCommissionCtrl.nodeOpsObj.nodes = [$stateParams.key];
                    cleanupExtraVars();
                    createExtraVars();
                    NodesModel.commission(nodeCommissionCtrl.nodeOpsObj).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(nodeCommissionCtrl);
                        returnToNodeDetails();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(nodeCommissionCtrl);
                        CRUDHelperService.showServerError(nodeCommissionCtrl, result);
                    });
                }
            }

            function discover() {
                if (nodeCommissionCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(nodeCommissionCtrl);
                    CRUDHelperService.startLoader(nodeCommissionCtrl);
                    createIPAddrArray();
                    createExtraVars();
                    NodesModel.discover(nodeCommissionCtrl.nodeOpsObj).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(nodeCommissionCtrl);
                        returnToNodes();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(nodeCommissionCtrl);
                        CRUDHelperService.showServerError(nodeCommissionCtrl, result);
                    });
                }
            }

            /**
             * Cleanup ansible variables for network mode and scheduler. ng-if removes it from the view (DOM) but not from
             * the model.
             */
            function cleanupExtraVars() {
                //Cleanup for network mode
                if (nodeCommissionCtrl.extra_vars['contiv_network_mode'] == 'aci') {
                    delete nodeCommissionCtrl.extra_vars['fwd_mode'];
                } else {
                    delete nodeCommissionCtrl.extra_vars['apic_url'];
                    delete nodeCommissionCtrl.extra_vars['apic_username'];
                    delete nodeCommissionCtrl.extra_vars['apic_password'];
                    delete nodeCommissionCtrl.extra_vars['apic_leaf_nodes'];
                    delete nodeCommissionCtrl.extra_vars['apic_phys_domain'];
                    delete nodeCommissionCtrl.extra_vars['apic_epg_bridge_domain'];
                    delete nodeCommissionCtrl.extra_vars['apic_contracts_unrestricted_mode'];
                }
                //Cleanup for scheduler
                if (nodeCommissionCtrl.extra_vars['scheduler_provider'] == 'native-swarm') {
                    delete nodeCommissionCtrl.extra_vars['ucp_bootstrap_node_name'];
                }
            }

            function createIPAddrArray() {
                nodeCommissionCtrl.nodeOpsObj.addrs = _.words(nodeCommissionCtrl.nodeIPAddr, /[^, ]+/g);
            }

            nodeCommissionCtrl.nodeOpsObj = {};
            nodeCommissionCtrl.extra_vars = {}; //TODO Intialize from global settings
            nodeCommissionCtrl.ansibleVariables = [];
            nodeCommissionCtrl.envVariables = [];
            nodeCommissionCtrl.nodeIPAddr = ''; //IP address of nodes to discover

            nodeCommissionCtrl.cancelCommissioningNode = cancelCommissioningNode;
            nodeCommissionCtrl.commission = commission;
            nodeCommissionCtrl.discover = discover;
            nodeCommissionCtrl.cancelDiscoveringNode = cancelDiscoveringNode;

            setMode();
            CRUDHelperService.stopLoader(nodeCommissionCtrl);
            CRUDHelperService.hideServerError(nodeCommissionCtrl);

        }]);
