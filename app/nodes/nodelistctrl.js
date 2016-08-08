/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.nodes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.nodes.list', {
                url: '/list',
                controller: 'NodeListCtrl as nodeListCtrl',
                templateUrl: 'nodes/nodelist.html'
            })
        ;
    }])
    .controller('NodeListCtrl', ['$scope', '$interval', '$filter', 'NodesModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, NodesModel, CRUDHelperService) {
        var nodeListCtrl = this;

        function getNodes(reload) {
            NodesModel.get(reload)
                .then(function successCallback(result) {
                    CRUDHelperService.stopLoader(nodeListCtrl);
                    nodeListCtrl.nodes = result;
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(nodeListCtrl);
                });
        }

        //Load from cache for quick display initially
        getNodes(false);

        var promise;
        //Don't do auto-refresh if one is already in progress
        if (!angular.isDefined(promise)) {
            promise = $interval(function () {
                getNodes(true);
            }, ContivGlobals.REFRESH_INTERVAL);
        }
        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }]);