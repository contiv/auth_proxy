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
    .controller('NodeListCtrl', ['$scope', '$interval', '$filter', 'NodesModel', 'CRUDHelperService', 'LogService',
        function ($scope, $interval, $filter, NodesModel, CRUDHelperService, LogService) {
        var nodeListCtrl = this;

        function getNodes(reload) {
            NodesModel.get(reload)
                .then(function successCallback(result) {
                    CRUDHelperService.stopLoader(nodeListCtrl);
                    nodeListCtrl.nodes = $filter('orderBy')(result, 'key');
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(nodeListCtrl);
                });
                getActiveLogs();
                getLastLogs();
        }

        function getActiveLogs() {
            LogService.getActiveLogs().then(function successCallback(result) {
                nodeListCtrl.activeLogs = result;
            }, function errorCallback(result) {
                //Once the job finishes, endpoint returns 500 error. So reset the activeLogs
                nodeListCtrl.activeLogs = {
                    desc: 'There is currently no active job. Check Last Job for a job that recently finished.'
                };
            });
        }

        function getLastLogs() {
            LogService.getLastLogs().then(function successCallback(result) {
                nodeListCtrl.lastLogs = result;
            }, function errorCallback(result) {
            });
        }

        nodeListCtrl.getActiveLogs = getActiveLogs;
        nodeListCtrl.getLastLogs = getLastLogs;

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