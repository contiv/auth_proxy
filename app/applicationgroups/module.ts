/**
 * Created by vjain3 on 5/18/16.
 */
angular.module('contiv.applicationgroups', ['contiv.models', 'contiv.directives', 'contiv.utils'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.applicationgroups', {
                url: '/applicationgroups',
                abstract: true,
                template: '<div ui-view class="ui container"/>'
            })
    }]);
