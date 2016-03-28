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
        ;
    })
    .controller('NodeCommissionCtrl', ['$state', '$stateParams', 'NodesModel', function ($state, $stateParams, NodesModel) {
        var nodeCommissionCtrl = this;

        function returnToNodeDetails() {
            $state.go('contiv.nodes.details.info', {'key': $stateParams.key});
        }

        function cancelCommissioningNode() {
            returnToNodeDetails();
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

        function commission() {
            var extraVars = {};
            //TODO Intialize from global settings
            extraVars['control_interface'] = nodeCommissionCtrl.control_interface;
            extraVars['service_vip'] = nodeCommissionCtrl.service_vip;
            extraVars['scheduler_provider'] = nodeCommissionCtrl.scheduler_provider;

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

            NodesModel.commission($stateParams.key, extraVars).then(function (result) {
                returnToNodeDetails();
            });
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

        resetNewAnsibleVariable();
        resetNewEnvironmentVariable();

    }]);
