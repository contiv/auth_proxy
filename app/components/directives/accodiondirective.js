/**
 * Created by cshampur on 7/1/16.
 */
angular.module("contiv.directives")
    .directive("ctvAccordion", function () {
        return {
            restrict: 'E',
            scope: {
                items: '=',
                title: '='
            },
            link:function(scope, element){
                if(typeof element.find('.ui.accordion').accordion == 'function')
                    element.find('.ui.accordion').accordion();
            },
            templateUrl: 'components/directives/accordion.html'
        }
    });