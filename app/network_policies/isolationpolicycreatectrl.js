/**
 * Created by vjain3 on 3/10/16.
 */
angular.module('contiv.networkpolicies')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.policies.isolation.create', {
                url: '/create',
                controller: 'IsolationPolicyCreateCtrl as isolationPolicyCreateCtrl',
                templateUrl: 'network_policies/isolationpolicycreate.html'
            })
        ;
    })
    .controller('IsolationPolicyCreateCtrl', ['$state', 'PoliciesModel', function ($state, PoliciesModel) {
        var isolationPolicyCreateCtrl = this;

        function returnToPolicies() {
            $state.go('contiv.policies.isolation');
        }

        function cancelCreating() {
            returnToPolicies();
        }

        function createPolicy() {
            if (isolationPolicyCreateCtrl.form.$valid) {
                isolationPolicyCreateCtrl.newPolicy.key =
                    PoliciesModel.generateKey(isolationPolicyCreateCtrl.newPolicy);
                PoliciesModel.create(isolationPolicyCreateCtrl.newPolicy).then(function (result) {
                    returnToPolicies();
                });
            }
        }

        function resetForm() {
            isolationPolicyCreateCtrl.newPolicy = {
                policyName: '',
                tenantName: 'default'//TODO: Remove hardcoded tenant.
            };
        }

        isolationPolicyCreateCtrl.createPolicy = createPolicy;
        isolationPolicyCreateCtrl.cancelCreating = cancelCreating;

        resetForm();
    }]);
