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
            .state('contiv.menu.applicationgroups.create', {
                url: '/create',
                component: 'applicationgroupcreate'
            })
            .state('contiv.menu.applicationgroups.details', {
                url: '/details/:key',
                component: 'applicationgroupdetails'
            })
            .state('contiv.menu.applicationgroups.edit', {
                url: '/edit/:key',
                component: 'applicationgroupdetails'
            })
            .state('contiv.menu.applicationgroups.list',{
                url: '/list',
                component: 'applicationGrouplist'
            })

    }]);
