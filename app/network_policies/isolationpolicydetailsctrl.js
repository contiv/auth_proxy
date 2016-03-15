/**
 * Created by vjain3 on 3/8/16.
 */
angular.module('contiv.networkpolicies')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.policies.isolation.details', {
                url: '/details/:key',
                controller: 'IsolationPolicyDetailsCtrl as isolationPolicyDetailsCtrl',
                templateUrl: 'network_policies/isolationpolicydetails.html'
            });
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.policies.isolation.edit', {
                url: '/edit/:key',
                controller: 'IsolationPolicyDetailsCtrl as isolationPolicyDetailsCtrl',
                templateUrl: 'network_policies/isolationpolicydetails.html'
            });
    })
    .controller('IsolationPolicyDetailsCtrl', ['$state', '$stateParams', 'PoliciesModel', 'RulesModel', function ($state, $stateParams, PoliciesModel, RulesModel) {
        var isolationPolicyDetailsCtrl = this;
        isolationPolicyDetailsCtrl.addedRules = [];

        function returnToPolicies() {
            $state.go('contiv.policies.isolation');
        }

        function returnToPolicyDetails() {
            $state.go('contiv.policies.isolation.details', {key: isolationPolicyDetailsCtrl.policy.key});
        }

        function cancelEditing() {
            returnToPolicyDetails();
        }

        /**
         * Go back to policy details after done editing
         */
        function doneEditing() {
            returnToPolicyDetails();
        }

        function deletePolicy() {
            PoliciesModel.delete(isolationPolicyDetailsCtrl.policy);
            returnToPolicies();
        }

        /**
         * To show edit or details screen based on the route
         */
        function setMode() {
            if ($state.is('contiv.policies.isolation.edit')) {
                isolationPolicyDetailsCtrl.mode = 'edit';
            } else {
                isolationPolicyDetailsCtrl.mode = 'details';
            }
        }

        function resetNewIncomingRule() {
            isolationPolicyDetailsCtrl.newIncomingRule = {
                ruleId: '',
                priority: '',
                action: '',
                fromGroup: '',
                fromNetwork: '',
                fromIPAddress: '',
                protocol: '',
                port: '',
                direction: 'in',
                tenantName: 'default',
                policyName: isolationPolicyDetailsCtrl.policy.policyName

            }

        }

        function resetNewOutgoingRule() {
            isolationPolicyDetailsCtrl.newOutgoingRule = {
                ruleId: '',
                priority: '',
                action: '',
                toGroup: '',
                toNetwork: '',
                toIPAddress: '',
                protocol: '',
                port: '',
                direction: 'out',
                tenantName: 'default',
                policyName: isolationPolicyDetailsCtrl.policy.policyName
            }

        }

        /**
         * Rule is saved to server
         */
        function addIncomingRule() {
            isolationPolicyDetailsCtrl.newIncomingRule.key = RulesModel.generateKey(isolationPolicyDetailsCtrl.newIncomingRule);
            RulesModel.create(isolationPolicyDetailsCtrl.newIncomingRule).then(function (result) {
                isolationPolicyDetailsCtrl.incomingRules.push(result);
                resetNewIncomingRule();
            });
        }

        /**
         * Rule is saved to server
         */
        function addOutgoingRule() {
            isolationPolicyDetailsCtrl.newOutgoingRule.key = RulesModel.generateKey(isolationPolicyDetailsCtrl.newOutgoingRule);
            RulesModel.create(isolationPolicyDetailsCtrl.newOutgoingRule).then(function (result) {
                isolationPolicyDetailsCtrl.outgoingRules.push(result);
                resetNewOutgoingRule();
            });
        }

        /**
         * Delete incoming rule from server
         */
        function deleteIncomingRule(key) {
            RulesModel.deleteUsingKey(key).then(function (result) {
                _.remove(isolationPolicyDetailsCtrl.incomingRules, function (n) {
                    return n.key == key;
                });
            });
        }

        /**
         * Delete outgoing rule from server
         */
        function deleteOutgoingRule(key) {
            RulesModel.deleteUsingKey(key).then(function (result) {
                _.remove(isolationPolicyDetailsCtrl.outgoingRules, function (n) {
                    return n.key == key;
                });
            });
        }

        PoliciesModel.getModelByKey($stateParams.key)
            .then(function (policy) {
                isolationPolicyDetailsCtrl.policy = policy;
                RulesModel.getIncomingRules(policy.policyName, 'default').then(function (result) {
                    isolationPolicyDetailsCtrl.incomingRules = result;
                    resetNewIncomingRule();
                });
                RulesModel.getOutgoingRules(policy.policyName, 'default').then(function (result) {
                    isolationPolicyDetailsCtrl.outgoingRules = result;
                    resetNewOutgoingRule();
                });
            });

        isolationPolicyDetailsCtrl.deletePolicy = deletePolicy;
        isolationPolicyDetailsCtrl.deleteIncomingRule = deleteIncomingRule;
        isolationPolicyDetailsCtrl.deleteOutgoingRule = deleteOutgoingRule;
        isolationPolicyDetailsCtrl.addIncomingRule = addIncomingRule;
        isolationPolicyDetailsCtrl.addOutgoingRule = addOutgoingRule;
        isolationPolicyDetailsCtrl.doneEditing = doneEditing;
        isolationPolicyDetailsCtrl.cancelEditing = cancelEditing;

        setMode();

    }]);