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
        ;
    }])
    .controller('NodeCommissionCtrl', [
        '$state', '$stateParams', 'NodesModel', 'CRUDHelperService', 'NodesService',
        function ($state, $stateParams, NodesModel, CRUDHelperService, NodesService) {
            var nodeCommissionCtrl = this;

            function returnToNodeDetails() {
                $state.go('contiv.menu.nodes.details.info', {'key': $stateParams.key});
            }

            function cancelCommissioningNode() {
                returnToNodeDetails();
            }

            function commission() {
                if (nodeCommissionCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(nodeCommissionCtrl);
                    CRUDHelperService.startLoader(nodeCommissionCtrl);
                    nodeCommissionCtrl.nodeOpsObj.nodes = [$stateParams.key];
                    NodesService.cleanupExtraVars(nodeCommissionCtrl);
                    NodesService.createExtraVars(nodeCommissionCtrl);
                    NodesModel.commission(nodeCommissionCtrl.nodeOpsObj).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(nodeCommissionCtrl);
                        returnToNodeDetails();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(nodeCommissionCtrl);
                        CRUDHelperService.showServerError(nodeCommissionCtrl, result);
                    });
                }
            }

            nodeCommissionCtrl.nodeOpsObj = {};
            nodeCommissionCtrl.extra_vars = {}; //TODO Intialize from global settings
            nodeCommissionCtrl.ansibleVariables = [];
            nodeCommissionCtrl.envVariables = [];

            NodesService.getSettings(nodeCommissionCtrl);

            nodeCommissionCtrl.cancelCommissioningNode = cancelCommissioningNode;
            nodeCommissionCtrl.commission = commission;

            CRUDHelperService.stopLoader(nodeCommissionCtrl);
            CRUDHelperService.hideServerError(nodeCommissionCtrl);
        }]);
