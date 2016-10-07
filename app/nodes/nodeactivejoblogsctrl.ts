angular.module('contiv.nodes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.nodes.activelog', {
                url: '/activelog',
                controller: 'NodeActiveJobLogsCtrl as nodeActiveJobLogsCtrl',
                template: '<ctv-logs title="Active Job" log="nodeActiveJobLogsCtrl.activeLogs"></ctv-logs>'
            })
        ;
    }])
    .controller('NodeActiveJobLogsCtrl', ['$scope', '$interval', 'LogService',
        function ($scope, $interval, LogService) {
        var nodeActiveJobLogsCtrl = this;

        function getActiveLogs() {
            LogService.getActiveLogs().then(function successCallback(result) {
                nodeActiveJobLogsCtrl.activeLogs = result;
            }, function errorCallback(result) {
                //Once the job finishes, endpoint returns 500 error. So reset the activeLogs
                nodeActiveJobLogsCtrl.activeLogs = {
                    desc: 'There is currently no active job. Check Last Job for a job that recently finished.'
                };
            });
        }
        getActiveLogs();

        var promise;
        //Don't do auto-refresh if one is already in progress
        if (!angular.isDefined(promise)) {
            promise = $interval(function () {
                getActiveLogs();
            }, ContivGlobals.REFRESH_INTERVAL);
        }
        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }]);