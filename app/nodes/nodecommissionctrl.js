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
    .controller('NodeCommissionCtrl', ['$state', '$stateParams', 'NodesModel', function ($state, $stateParams, NodesModel) {
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

        /**
         * Compare if two variables (ansible or environment) have same name
         * @param val1
         * @param val2
         * @returns {boolean}
         */
        function compareVariable(val1, val2) {
            return val1.name == val2.name;
        }

        function addAnsibleVariable() {
            //Removes existing variable with the same name first if it exists.
            _.pullAllWith(nodeCommissionCtrl.ansibleVariables, [nodeCommissionCtrl.newAnsibleVariable], compareVariable);
            nodeCommissionCtrl.ansibleVariables.push(nodeCommissionCtrl.newAnsibleVariable);
            resetNewAnsibleVariable();
        }

        function removeAnsibleVariable(ansibleVariable) {
            _.remove(nodeCommissionCtrl.ansibleVariables, function (item) {
                return item.name == ansibleVariable.name;
            });
        }

        function addEnvVariable() {
            //Removes existing variable with the same name first if it exists.
            _.pullAllWith(nodeCommissionCtrl.envVariables, [nodeCommissionCtrl.newEnvVariable], compareVariable);
            nodeCommissionCtrl.envVariables.push(nodeCommissionCtrl.newEnvVariable);
            resetNewEnvironmentVariable();
        }

        function removeEnvVariable(envVariable) {
            _.remove(nodeCommissionCtrl.envVariables, function (item) {
                return item.name == envVariable.name;
            });
        }

        function createExtraVars() {
            //Add ansible variables to extraVars
            nodeCommissionCtrl.ansibleVariables.forEach(function (item) {
                nodeCommissionCtrl.extraVars[item.name] = item.value
            });
            //Add environment variables to extraVars
            var envVars = {};
            nodeCommissionCtrl.envVariables.forEach(function (item) {
                envVars[item.name] = item.value;
            });
            nodeCommissionCtrl.extraVars['env'] = envVars;
        }

        function commission() {
            if (nodeCommissionCtrl.form.$valid) {
                cleanupExtraVars();
                createExtraVars();
                NodesModel.commission($stateParams.key, nodeCommissionCtrl.extraVars).then(function (result) {
                    returnToNodeDetails();
                });
            }
        }

        function discover() {
            if (nodeCommissionCtrl.form.$valid) {
                createExtraVars();
                NodesModel.discover(nodeCommissionCtrl.nodeIPAddr, nodeCommissionCtrl.extraVars).then(function (result) {
                    returnToNodes();
                });
            }
        }

        function resetNewAnsibleVariable() {
            nodeCommissionCtrl.newAnsibleVariable = {
                'name': '',
                'value': ''
            };
        }

        function resetNewEnvironmentVariable() {
            nodeCommissionCtrl.newEnvVariable = {
                'name': '',
                'value': ''
            };
        }

        /**
         * Cleanup ansible variables for network mode and scheduler. ng-if removes it from the view (DOM) but not from
         * the model.
         */
        function cleanupExtraVars() {
            //Cleanup for network mode
            if (nodeCommissionCtrl.extraVars['contiv_network_mode'] == 'aci') {
                delete nodeCommissionCtrl.extraVars['fwd_mode'];
            } else {
                delete nodeCommissionCtrl.extraVars['apic_url'];
                delete nodeCommissionCtrl.extraVars['apic_username'];
                delete nodeCommissionCtrl.extraVars['apic_password'];
                delete nodeCommissionCtrl.extraVars['apic_leaf_nodes'];
                delete nodeCommissionCtrl.extraVars['apic_phys_domain'];
                delete nodeCommissionCtrl.extraVars['apic_epg_bridge_domain'];
                delete nodeCommissionCtrl.extraVars['apic_contracts_unrestricted_mode'];
            }
            //Cleanup for scheduler
            if (nodeCommissionCtrl.extraVars['scheduler_provider'] == 'native-swarm') {
                delete nodeCommissionCtrl.extraVars['ucp_bootstrap_node_name'];
            }
        }

        nodeCommissionCtrl.extraVars = {}; //TODO Intialize from global settings
        nodeCommissionCtrl.ansibleVariables = [];
        nodeCommissionCtrl.envVariables = [];
        nodeCommissionCtrl.nodeIPAddr=''; //IP address of node to discover

        nodeCommissionCtrl.addAnsibleVariable = addAnsibleVariable;
        nodeCommissionCtrl.removeAnsibleVariable = removeAnsibleVariable;
        nodeCommissionCtrl.addEnvVariable = addEnvVariable;
        nodeCommissionCtrl.removeEnvVariable = removeEnvVariable;
        nodeCommissionCtrl.cancelCommissioningNode = cancelCommissioningNode;
        nodeCommissionCtrl.commission = commission;
        nodeCommissionCtrl.discover = discover;
        nodeCommissionCtrl.cancelDiscoveringNode = cancelDiscoveringNode;

        setMode();
        resetNewAnsibleVariable();
        resetNewEnvironmentVariable();

    }]);
