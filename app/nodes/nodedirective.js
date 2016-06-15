/**
 * Created by vjain3 on 6/14/16.
 */
angular.module("contiv.nodes")
    .directive("ctvNodestatus", function() {
        return {
            restrict: 'E',
            scope: {
                node: '='
            },
            templateUrl: 'nodes/nodestatus.html'
        }
    })
    .directive("ctvNodestate", function() {
        return {
            restrict: 'E',
            scope: {
                node: '='
            },
            templateUrl: 'nodes/nodestate.html'
        }
    });