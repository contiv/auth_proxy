angular.module("contiv.directives")
    .directive("ctvNetworkmode", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directives/nodes/networkmode.html',
            scope: {
                extravars: "="
            }
        };
    });