/**
 * Created by vjain3 on 5/18/16.
 */

angular.module('contiv.networkpolicies', ['contiv.models', 'contiv.directives', 'contiv.utils'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies', {
                url: '/networkpolicies',
                abstract: true,
                template: '<div ui-view class="ui container"/>'
            })
            .state('contiv.menu.networkpolicies.isolation', {
                url: '/isolation',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('contiv.menu.networkpolicies.isolation.create', {
                url: '/create',
                component: 'isolationpolicycreate'
            })
            .state('contiv.menu.networkpolicies.isolation.details', {
                url: '/details/:key',
                component: 'isolationpolicydetails'
            })
            .state('contiv.menu.networkpolicies.isolation.edit', {
                url: '/edit/:key',
                component: 'isolationpolicydetails'
            })
            .state('contiv.menu.networkpolicies.bandwidth', {
                url: '/bandwidth',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('contiv.menu.networkpolicies.bandwidth.create', {
                url: '/create',
                component: 'bandwidthpolicycreate'
            })
            .state('contiv.menu.networkpolicies.bandwidth.details', {
                url: '/details/:key',
                component: 'bandwidthpolicydetails'
            })
            .state('contiv.menu.networkpolicies.bandwidth.edit', {
                url: '/edit/:key',
                component: 'bandwidthpolicydetails'
            })
            .state('contiv.menu.networkpolicies.redirection', {
                url: '/redirection',
                abstract: true,
                template: '<ui-view/>'
            })
        ;
    }]);
