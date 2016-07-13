angular.module("contiv.nodes")
    .directive("ctvLogs", function () {
        return {
            restrict: 'E',
            templateUrl: 'nodes/logs.html',
            scope: {
                log: "=",
                title: "@"
            }
        };
    });