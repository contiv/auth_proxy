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
            isolationPolicyCreateCtrl.newPolicy.key =
                isolationPolicyCreateCtrl.newPolicy.tenantName + ':' + isolationPolicyCreateCtrl.newPolicy.policyName;
            PoliciesModel.create(isolationPolicyCreateCtrl.newPolicy).then(function (result) {
                returnToPolicies();
            });
        }

        function resetForm() {
            isolationPolicyCreateCtrl.newPolicy = {
                policytName: '',
                tenantName: 'default'//TODO: Remove hardcoded tenant.
            };
        }

        isolationPolicyCreateCtrl.createPolicy = createPolicy;
        isolationPolicyCreateCtrl.cancelCreating = cancelCreating;

        resetForm();
    }]);
