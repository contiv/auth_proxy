/**
 * Created by vjain3 on 3/10/16.
 */
angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.isolation.create', {
                url: '/create',
                controller: 'IsolationPolicyCreateCtrl as isolationPolicyCreateCtrl',
                templateUrl: 'network_policies/isolationpolicycreate.html'
            })
        ;
    }])
    .controller('IsolationPolicyCreateCtrl', ['$state', 'PoliciesModel', 'CRUDHelperService',
        function ($state, PoliciesModel, CRUDHelperService) {
        var isolationPolicyCreateCtrl = this;

        function returnToPolicies() {
            $state.go('contiv.menu.networkpolicies.isolation.list');
        }

        function cancelCreating() {
            returnToPolicies();
        }

        function createPolicy() {
            if (isolationPolicyCreateCtrl.form.$valid) {
                CRUDHelperService.hideServerError(isolationPolicyCreateCtrl);
                CRUDHelperService.startLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.newPolicy.key =
                    PoliciesModel.generateKey(isolationPolicyCreateCtrl.newPolicy);
                PoliciesModel.create(isolationPolicyCreateCtrl.newPolicy).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyCreateCtrl);
                    returnToPolicies();
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyCreateCtrl);
                    CRUDHelperService.showServerError(isolationPolicyCreateCtrl, result);
                });
            }
        }

        function resetForm() {
            CRUDHelperService.stopLoader(isolationPolicyCreateCtrl);
            CRUDHelperService.hideServerError(isolationPolicyCreateCtrl);
            isolationPolicyCreateCtrl.newPolicy = {
                policyName: '',
                tenantName: 'default'//TODO: Remove hardcoded tenant.
            };
        }

        isolationPolicyCreateCtrl.createPolicy = createPolicy;
        isolationPolicyCreateCtrl.cancelCreating = cancelCreating;

        resetForm();
    }]);
