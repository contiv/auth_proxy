angular.module('contiv.organizations', ['contiv.models', 'contiv.directives', 'contiv.utils'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('contiv.menu.organizations', {
            url: '/organizations',
            abstract: true,
            template: '<div ui-view class="ui container"/>'
        })
            .state('contiv.menu.organizations.list', {
                url:'/list',
                component: 'organizationlist'
            })
            .state('contiv.menu.organizations.create', {
                url: '/create',
                component: 'organizationcreate'
            })
            .state('contiv.menu.organizations.details', {
                url: '/details/:key',
                component: 'organizationdetails'
            })
    }]);