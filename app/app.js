'use strict';


// Declare app level module which depends on views, and components
angular.module('contivApp', [
        'ui.router',
        'contiv.login',
        'contiv.menu',
        'contiv.dashboard',
        'contiv.applicationgroups',
        'contiv.networks',
        'contiv.networkpolicies',
        'contiv.storagepolicies',
        'contiv.servicelbs',
        'contiv.volumes',
        'contiv.nodes',
        'contiv.organizations',
        'contiv.settings',
        'contiv.visualization'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
            .state('contiv', {
                url: '',
                abstract: true,
                template: '<div ui-view class="ui fluid container"/>'
            });
        $urlRouterProvider.otherwise('/');
    }]);
