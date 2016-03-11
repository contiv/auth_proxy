angular.module('contiv.networkpolicies')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.policies.isolation', {

                url: '/isolation',
                controller: 'IsolationPolicyListCtrl as isolationPolicyListCtrl',
                templateUrl: 'network_policies/isolationpolicylist.html'
            })
        ;
    })
    .controller('IsolationPolicyListCtrl', ['PoliciesModel', function (PoliciesModel) {
        var policiesListCtrl = this;

        PoliciesModel.get()
            .then(function (result) {
                policiesListCtrl.policies = result;
            });
    }]);
