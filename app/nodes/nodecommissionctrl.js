/**
 * Created by vjain3 on 3/25/16.
 */
angular.module('contiv.nodes')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.nodes.commission', {
                url: '/commission/:key',
                controller: 'NodeCommissionCtrl as nodeCommissionCtrl',
                templateUrl: 'nodes/nodecommission.html'
            })
            .state('contiv.nodes.discover', {
                url: '/discover',
                controller: 'NodeCommissionCtrl as nodeCommissionCtrl',
                templateUrl: 'nodes/nodecommission.html'
            })
        ;
    })
    .controller('NodeCommissionCtrl', ['$state', '$stateParams', 'NodesModel', function ($state, $stateParams, NodesModel) {
        var nodeCommissionCtrl = this;

        /**
         * To show commission or discover screen based on the route
         */
        function setMode() {
            if ($state.is('contiv.nodes.commission')) {
                nodeCommissionCtrl.mode = 'commission';
            } else {
                nodeCommissionCtrl.mode = 'discover';
            }
        }

        function returnToNodeDetails() {
            $state.go('contiv.nodes.details.info', {'key': $stateParams.key});
        }

        function returnToNodes() {
            $state.go('contiv.nodes');
        }

        function cancelCommissioningNode() {
            returnToNodeDetails();
        }

        function cancelDiscoveringNode() {
            returnToNodes();
        }

        function addAnsibleVariable() {
            nodeCommissionCtrl.ansibleVariables.push(nodeCommissionCtrl.newAnsibleVariable);
            resetNewAnsibleVariable();
        }

        function removeAnsibleVariable(ansibleVariable) {
            _.remove(nodeCommissionCtrl.ansibleVariables, function (item) {
                return item.name == ansibleVariable.name;
            });
        }

        function addEnvVariable() {
            nodeCommissionCtrl.envVariables.push(nodeCommissionCtrl.newEnvVariable);
            resetNewEnvironmentVariable();
        }

        function removeEnvVariable(envVariable) {
            _.remove(nodeCommissionCtrl.envVariables, function (item) {
                return item.name == envVariable.name;
            });
        }

        function createExtraVars() {
            var extraVars = {};
            //TODO Intialize from global settings
            extraVars['control_interface'] = nodeCommissionCtrl.control_interface;
            if (nodeCommissionCtrl.mode == 'commission') {
                extraVars['service_vip'] = nodeCommissionCtrl.service_vip;
                extraVars['scheduler_provider'] = nodeCommissionCtrl.scheduler_provider;
            }

            //Add ansible variables to extraVars
            nodeCommissionCtrl.ansibleVariables.forEach(function (item) {
                extraVars[item.name] = item.value
            });
            //Add environment variables to extraVar
            var envVars = {};
            nodeCommissionCtrl.envVariables.forEach(function (item) {
                envVars[item.name] = item.value;
            });
            extraVars['env'] = envVars;
            return extraVars;
        }

        function commission() {
            if (nodeCommissionCtrl.form.$valid) {
                var extraVars = createExtraVars();
                NodesModel.commission($stateParams.key, extraVars).then(function (result) {
                    returnToNodeDetails();
                });
            }
        }

        function discover() {
            if (nodeCommissionCtrl.form.$valid) {
                var extraVars = createExtraVars();
                NodesModel.discover(nodeCommissionCtrl.service_vip, extraVars);
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

        nodeCommissionCtrl.ansibleVariables = [];
        nodeCommissionCtrl.envVariables = [];

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
