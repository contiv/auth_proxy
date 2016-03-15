'use strict';


// Declare app level module which depends on views, and components
angular.module('contivApp', [
        'ui.router',
        'contiv.dashboard',
        'contiv.applicationgroups',
        'contiv.networks',
        'contiv.networkpolicies'
    ])
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
        //abstract state serves as a PLACEHOLDER or NAMESPACE for application states
            .state('contiv', {
                url: '',
                abstract: true
            })
        ;

        $urlRouterProvider.otherwise('/');
    });
