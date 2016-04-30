/**
 * Created by vjain3 on 4/28/16.
 */
angular.module("contiv.directives", [])
    .directive("ctvError", function () {
        return {
            restrict: 'E',
            scope: {
                header: '@',
                error: '='
            },
            link: function (scope, element, attr) {
                element.find('i').on('click', function() {
                    element.addClass('ng-hide');
                })
            },
            templateUrl: 'components/directives/errormessage.html'
        }
    });
