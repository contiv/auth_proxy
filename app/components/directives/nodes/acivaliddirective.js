angular.module("contiv.directives")
    .directive("ctvAcivalid", function () {
        return {
            restrict: 'E',
            templateUrl: 'components/directives/nodes/acivalid.html',
            scope: {
                form: "="
            }
        };
    });