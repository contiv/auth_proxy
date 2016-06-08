/**
 * Created by vjain3 on 6/2/16.
 */
angular.module("contiv.directives")
    .directive("ctvCollapsible", function () {
        return {
            restrict: 'E',
            scope: {
                title: '@',
                collapsed: '@'
            },
            transclude: true,
            link: function (scope) {
                if (scope.collapsed === undefined) scope.collapsed = true;
            },
            templateUrl: 'components/directives/collapsible.html'
        }
    });
