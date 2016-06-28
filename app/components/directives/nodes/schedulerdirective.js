angular.module("contiv.directives")
    .directive("ctvScheduler", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directives/nodes/scheduler.html',
            scope: {
                extravars: "="
            }
        };
    });