/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.nodes', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.nodes', {
                url: '/nodes',
                views: {
                    'nodes@': {
                        controller: 'NodeListCtrl as nodeListCtrl',
                        templateUrl: 'nodes/nodelist.html'
                    }
                }
            })
        ;
    })
    .controller('NodeListCtrl', ['NodesModel', function (NodesModel) {
        var nodeListCtrl = this;
        NodesModel.get()
            .then(function (result) {
                nodeListCtrl.nodes = result;
            });
    }]);
