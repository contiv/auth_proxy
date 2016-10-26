angular.module('contiv.settings', ['contiv.models', 'contiv.directives', 'contiv.utils'])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.settings', {
                url: '/global',
                abstract: true,
                template: '<div ui-view class="ui container"/>'
            })
            .state('contiv.menu.settings.details', {
                url: '/settings',
                templateUrl: 'settings/settingsmenu.html'
            })
            .state('contiv.menu.settings.details.logs', {
                url: '/logs',
                controller: '',
                templateUrl: ''
            })
            .state('contiv.menu.settings.details.auth', {
                url: '/auth',
                controller: '',
                templateUrl: ''
            })
            .state('contiv.menu.settings.details.license', {
                url: '/license',
                controller: '',
                templateUrl: ''
            })
            .state('contiv.menu.settings.details.policies', {
                url: '/policies',
                controller: '',
                templateUrl: ''
            })
            .state('contiv.menu.settings.details.networks', {
                url: '/networks',
                component: 'networksetting'
            })
            .state('contiv.menu.settings.details.volumes', {
                url: '/volumes',
                component: 'volumesetting'
            })
    }]);