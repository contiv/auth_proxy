/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.nodes', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.nodes.list', {
                url: '/list',
                controller: 'NodeListCtrl as nodeListCtrl',
                templateUrl: 'nodes/nodelist.html'
            })
        ;
    })
    .controller('NodeListCtrl', ['$scope', '$interval', 'NodesModel', function ($scope, $interval, NodesModel) {
        var nodeListCtrl = this;

        function getNodes(reload) {
            NodesModel.get(reload)
                .then(function (result) {
                    nodeListCtrl.nodes = result;
                });
        }

        //Load from cache for quick display initially
        getNodes(false);

        var promise;
        //Don't do auto-refresh if one is already in progress
        if (!angular.isDefined(promise)) {
            promise = $interval(function () {
                getNodes(true);
            }, 5000);
        }
        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });

    }]);