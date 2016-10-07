/**
 * Created by vjain3 on 3/9/16.
 */
angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.list', {
                url: '/list',
                abstract: true,
                controller: 'NetworkPoliciesTabsCtrl as networkPoliciesTabsCtrl',
                templateUrl: 'network_policies/networkpoliciestabs.html'
            })
            .state('contiv.menu.networkpolicies.list.redirection', {
                url: '/redirection',
                template: ''
            })
        ;
    }])
    .controller('NetworkPoliciesTabsCtrl', ['$state',function ($state) {
        var networkPoliciesTabsCtrl = this;
        
        function createNetworkPolicy() {
            if($state.$current.includes['contiv.menu.networkpolicies.list.isolation']){
                $state.go('contiv.menu.networkpolicies.isolation.create');
            }
            if($state.$current.includes['contiv.menu.networkpolicies.list.bandwidth']) {
                $state.go('contiv.menu.networkpolicies.bandwidth.create');
            }
        }

        networkPoliciesTabsCtrl.createNetworkPolicy = createNetworkPolicy;
    }]);
