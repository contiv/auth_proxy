angular.module('contiv.nodes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.nodes.lastlog', {
                url: '/lastlog',
                controller: 'NodeLastJobLogsCtrl as nodeLastJobLogsCtrl',
                template: '<ctv-logs title="Last Job" log="nodeLastJobLogsCtrl.lastLogs"></ctv-logs>'
            })
        ;
    }])
    .controller('NodeLastJobLogsCtrl', ['$scope', '$interval', 'LogService',
        function ($scope, $interval, LogService) {
        var nodeLastJobLogsCtrl = this;

        function getLastLogs() {
            LogService.getLastLogs().then(function successCallback(result) {
                nodeLastJobLogsCtrl.lastLogs = result;
            }, function errorCallback(result) {
            });
        }
        getLastLogs();

        var promise;
        //Don't do auto-refresh if one is already in progress
        if (!angular.isDefined(promise)) {
            promise = $interval(function () {
                getLastLogs();
            }, ContivGlobals.REFRESH_INTERVAL);
        }
        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }]);