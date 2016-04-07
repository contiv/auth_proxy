/**
 * Created by vjain3 on 3/9/16.
 */
angular.module('contiv.networkpolicies', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.policies', {
                url: '/networkpolicies',
                views: {
                    //target the ui-view named 'policies' in ROOT state (contiv)
                    'policies@': {
                        controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                        templateUrl: 'network_policies/networkpoliciestabs.html'
                    }
                }
            })
            .state('contiv.policies.prioritization', {
                url: '/prioritization',
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/prioritizationpolicylist.html'
            })
            .state('contiv.policies.bandwidth', {
                url: '/bandwidth',
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/bandwidthpolicylist.html'
            })
            .state('contiv.policies.redirection', {
                url: '/redirection',
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/redirectionpolicylist.html'
            })
        ;
    })
    .controller('NetworkPoliciesTabsCtrl', ['$state', function ($state) {
    }]);
