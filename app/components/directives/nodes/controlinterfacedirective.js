angular.module("contiv.directives")
    .directive("ctvControlinterface", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directives/nodes/controlinterface.html',
            scope: {
                extravars: "="
            }
        };
    });