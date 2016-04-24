/**
 * Created by vjain3 on 3/8/16.
 */
angular.module('contiv.networkpolicies')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networkpolicies.isolation.details', {
                url: '/details/:key',
                controller: 'IsolationPolicyDetailsCtrl as isolationPolicyDetailsCtrl',
                templateUrl: 'network_policies/isolationpolicydetails.html'
            });
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networkpolicies.isolation.edit', {
                url: '/edit/:key',
                controller: 'IsolationPolicyDetailsCtrl as isolationPolicyDetailsCtrl',
                templateUrl: 'network_policies/isolationpolicydetails.html'
            });
    })
    .controller('IsolationPolicyDetailsCtrl', [
        '$state',
        '$stateParams',
        'PoliciesModel',
        'RulesModel',
        'NetworksModel',
        'ApplicationGroupsModel',
        function ($state, $stateParams, PoliciesModel, RulesModel, NetworksModel, ApplicationGroupsModel) {
            var isolationPolicyDetailsCtrl = this;
            isolationPolicyDetailsCtrl.networks = [];
            isolationPolicyDetailsCtrl.applicationGroups = [];
            isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = false;
            isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = false;
            isolationPolicyDetailsCtrl.newIncomingSelectedApplicationGroup = '';
            isolationPolicyDetailsCtrl.newOutgoingSelectedApplicationGroup = '';

            function returnToPolicies() {
                $state.go('contiv.networkpolicies.isolation.list');
            }

            function returnToPolicyDetails() {
                $state.go('contiv.networkpolicies.isolation.details', {key: isolationPolicyDetailsCtrl.policy.key});
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
                PoliciesModel.delete(isolationPolicyDetailsCtrl.policy).then(function (result) {
                    returnToPolicies();
                });
            }

            /**
             * To show edit or details screen based on the route
             */
            function setMode() {
                if ($state.is('contiv.networkpolicies.isolation.edit')) {
                    isolationPolicyDetailsCtrl.mode = 'edit';
                } else {
                    isolationPolicyDetailsCtrl.mode = 'details';
                }
            }

            function resetNewIncomingRule() {
                //Rule object to be created on server
                isolationPolicyDetailsCtrl.newIncomingRule = {
                    ruleId: '',
                    priority: 1,
                    action: 'allow',//to make it default selected option in UI
                    fromEndpointGroup: '',
                    fromNetwork: '',
                    fromIPAddress: '',
                    protocol: 'tcp',//to make it default selected option in UI
                    port: '',
                    direction: 'in',
                    tenantName: 'default',
                    policyName: isolationPolicyDetailsCtrl.policy.policyName
                }

            }

            function resetNewOutgoingRule() {
                //Rule object to be created on server
                isolationPolicyDetailsCtrl.newOutgoingRule = {
                    ruleId: '',
                    priority: 1,
                    action: 'allow',//to make it default selected option in UI
                    toEndpointGroup: '',
                    toNetwork: '',
                    toIPAddress: '',
                    protocol: 'tcp',//to make it default selected option in UI
                    port: '',
                    direction: 'out',
                    tenantName: 'default',
                    policyName: isolationPolicyDetailsCtrl.policy.policyName
                }

            }

            /**
             * Get network names for the given tenant.
             */
            function getNetworks() {
                NetworksModel.get().then(function (result) {
                    //_.filter() returns a new array
                    isolationPolicyDetailsCtrl.networks = _.filter(result, {
                        'tenantName': 'default'//TODO: Remove hardcoded tenant.
                    });
                });
            }

            /**
             * Get application group names for the given tenant.
             */
            function getApplicationGroups() {
                ApplicationGroupsModel.get()
                    .then(function (result) {
                        //_.filter() returns a new array
                        isolationPolicyDetailsCtrl.applicationGroups = _.filter(result, {
                            'tenantName': 'default'//TODO: Remove hardcoded tenant.
                        });
                    });
            }

            /**
             * Event handler to disable network selection box once application group is selected while creating a new
             * rule.
             */
            function onChangeOutgoingApplicationGroupSelection() {
                if (isolationPolicyDetailsCtrl.newOutgoingSelectedApplicationGroup != null) {
                    //If application group has been selected
                    isolationPolicyDetailsCtrl.newOutgoingRule.toEndpointGroup =
                        isolationPolicyDetailsCtrl.newOutgoingSelectedApplicationGroup.groupName;
                    isolationPolicyDetailsCtrl.newOutgoingRule.toNetwork =
                        isolationPolicyDetailsCtrl.newOutgoingSelectedApplicationGroup.networkName;
                    isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = true;
                } else {
                    //When 'none' is selected
                    isolationPolicyDetailsCtrl.newOutgoingRule.toEndpointGroup = '';
                    isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = false;
                }
            }

            /**
             * Event handler to disable network selection box once application group is selected while creating a new
             * rule.
             */
            function onChangeIncomingApplicationGroupSelection() {
                if (isolationPolicyDetailsCtrl.newIncomingSelectedApplicationGroup != null) {
                    //If application group has been selected
                    isolationPolicyDetailsCtrl.newIncomingRule.fromEndpointGroup =
                        isolationPolicyDetailsCtrl.newIncomingSelectedApplicationGroup.groupName;
                    isolationPolicyDetailsCtrl.newIncomingRule.fromNetwork =
                        isolationPolicyDetailsCtrl.newIncomingSelectedApplicationGroup.networkName;
                    isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = true;
                } else {
                    //When 'none' is selected
                    isolationPolicyDetailsCtrl.newIncomingRule.fromEndpointGroup = '';
                    isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = false;
                }

            }

            /**
             * Generates rule id
             * TODO Make it cryptographically stronger once we have multiple users updating same policy
             */
            function generateRuleId(rule) {
                rule.ruleId =
                    (isolationPolicyDetailsCtrl.incomingRules.length + isolationPolicyDetailsCtrl.outgoingRules.length + 1).toString() + '-' +
                    Date.now().toString();
            }

            /**
             * Rule is saved to server
             */
            function addIncomingRule() {
                generateRuleId(isolationPolicyDetailsCtrl.newIncomingRule);
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
                generateRuleId(isolationPolicyDetailsCtrl.newOutgoingRule);
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

            getNetworks();
            getApplicationGroups();
            isolationPolicyDetailsCtrl.deletePolicy = deletePolicy;
            isolationPolicyDetailsCtrl.deleteIncomingRule = deleteIncomingRule;
            isolationPolicyDetailsCtrl.deleteOutgoingRule = deleteOutgoingRule;
            isolationPolicyDetailsCtrl.addIncomingRule = addIncomingRule;
            isolationPolicyDetailsCtrl.addOutgoingRule = addOutgoingRule;
            isolationPolicyDetailsCtrl.doneEditing = doneEditing;
            isolationPolicyDetailsCtrl.cancelEditing = cancelEditing;
            //Event Handlers
            isolationPolicyDetailsCtrl.onChangeOutgoingApplicationGroupSelection = onChangeOutgoingApplicationGroupSelection;
            isolationPolicyDetailsCtrl.onChangeIncomingApplicationGroupSelection = onChangeIncomingApplicationGroupSelection;

            setMode();

        }]);