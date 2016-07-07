/**
 * Created by vjain3 on 3/9/16.
 */
angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies', {
                url: '/networkpolicies',
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/networkpoliciestabs.html'
            })
            .state('contiv.menu.networkpolicies.isolation', {
                url: '/isolation',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('contiv.menu.networkpolicies.prioritization', {
                url: '/prioritization',
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/prioritizationpolicylist.html'
            })
            .state('contiv.menu.networkpolicies.bandwidth', {
                url: '/bandwidth',
                abstract: true,
                template: '<ui-view/>'
            })
            .state('contiv.menu.networkpolicies.redirection', {
                url: '/redirection',
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/redirectionpolicylist.html'
            })
        ;
    }])
    .controller('NetworkPoliciesTabsCtrl', ['$state', function ($state) {
    }]);
