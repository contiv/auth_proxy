angular.module('contiv.nodes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.nodes.discover', {
                url: '/discover',
                controller: 'NodeDiscoverCtrl as nodeDiscoverCtrl',
                templateUrl: 'nodes/nodediscover.html'
            })
        ;
    }])
    .controller('NodeDiscoverCtrl', [
        '$state', '$stateParams', 'NodesModel', 'CRUDHelperService', 'NodesService',
        function ($state, $stateParams, NodesModel, CRUDHelperService, NodesService) {
            var nodeDiscoverCtrl = this;

            function returnToNodes() {
                $state.go('contiv.menu.nodes.list');
            }

            function cancelDiscoveringNode() {
                returnToNodes();
            }

            function discover() {
                if (nodeDiscoverCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(nodeDiscoverCtrl);
                    CRUDHelperService.startLoader(nodeDiscoverCtrl);
                    createIPAddrArray();
                    NodesService.createExtraVars(nodeDiscoverCtrl);
                    NodesModel.discover(nodeDiscoverCtrl.nodeOpsObj).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(nodeDiscoverCtrl);
                        returnToNodes();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(nodeDiscoverCtrl);
                        CRUDHelperService.showServerError(nodeDiscoverCtrl, result);
                    });
                }
            }

            function createIPAddrArray() {
                nodeDiscoverCtrl.nodeOpsObj.addrs = _.words(nodeDiscoverCtrl.nodeIPAddr, /[^, ]+/g);
            }

            nodeDiscoverCtrl.nodeOpsObj = {};
            nodeDiscoverCtrl.extra_vars = {}; //TODO Intialize from global settings
            nodeDiscoverCtrl.ansibleVariables = [];
            nodeDiscoverCtrl.envVariables = [];
            nodeDiscoverCtrl.nodeIPAddr = ''; //IP address of nodes to discover

            NodesService.getSettings(nodeDiscoverCtrl);

            nodeDiscoverCtrl.discover = discover;
            nodeDiscoverCtrl.cancelDiscoveringNode = cancelDiscoveringNode;

            CRUDHelperService.stopLoader(nodeDiscoverCtrl);
            CRUDHelperService.hideServerError(nodeDiscoverCtrl);
        }]);
