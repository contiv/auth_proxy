/**
 * Created by vjain3 on 3/25/16.
 */
angular.module('contiv.nodes')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.nodes.details', {
                url: '/details/:key',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodedetails.html'
            })
            .state('contiv.nodes.details.info', {
                url: '/info',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodeinfo.html'
            })
            .state('contiv.nodes.details.stats', {
                url: '/stats',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodestats.html'
            })
            .state('contiv.nodes.details.logs', {
                url: '/logs',
                controller: 'NodeDetailsCtrl as nodeDetailsCtrl',
                templateUrl: 'nodes/nodelogs.html'
            })
        ;
    })
    .controller('NodeDetailsCtrl', ['$state', '$stateParams', 'NodesModel', function ($state, $stateParams, NodesModel) {
        var nodeDetailsCtrl = this;

        function decommissionNode() {
            NodesModel.decommission($stateParams.key).then(function (result) {
                nodeDetailsCtrl.commissioned = false;
            });
        }

        function upgradeNode() {
            NodesModel.upgrade($stateParams.key).then(function (result) {
            });
        }
        //TODO Initialize this from node information
        nodeDetailsCtrl.commissioned = false;

        NodesModel.getModelByKey($stateParams.key)
            .then(function (node) {
                nodeDetailsCtrl.node = node;
            });

        nodeDetailsCtrl.decommissionNode = decommissionNode;
        nodeDetailsCtrl.upgradeNode = upgradeNode;
    }]);