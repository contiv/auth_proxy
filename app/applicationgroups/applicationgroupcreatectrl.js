/**
 * Created by vjain3 on 3/11/16.
 */
/**
 * Created by vjain3 on 3/10/16.
 */
angular.module('contiv.applicationgroups')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.applicationgroups.create', {
                url: '/create',
                controller: 'ApplicationGroupCreateCtrl as applicationGroupCreateCtrl',
                templateUrl: 'applicationgroups/applicationgroupcreate.html'
            })
        ;
    })
    .controller('ApplicationGroupCreateCtrl', [
        '$state',
        'ApplicationGroupsModel',
        'NetworksModel',
        'PoliciesModel',
        'RulesModel',
        function ($state, ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel) {
            var applicationGroupCreateCtrl = this;
            applicationGroupCreateCtrl.networks = [];
            applicationGroupCreateCtrl.isolationPolicies = [];
            applicationGroupCreateCtrl.newApplicationGroup = {};
            applicationGroupCreateCtrl.selectedNetwork = {};
            applicationGroupCreateCtrl.selectedPolicy = {};
            applicationGroupCreateCtrl.selectedPolicies = [];

            //To display incoming and outgoing rules for selected policies
            applicationGroupCreateCtrl.incomingRules = [];
            applicationGroupCreateCtrl.outgoingRules = [];

            function returnToApplicationGroup() {
                $state.go('contiv.applicationgroups');
            }

            function cancelCreating() {
                returnToApplicationGroup();
            }

            /**
             * Get networks for the given tenant.
             */
            function getNetworks() {
                NetworksModel.get().then(function (result) {
                    applicationGroupCreateCtrl.networks = _.filter(result, {
                        'tenantName': 'default'//TODO: Remove hardcoded tenant.
                    })
                });
            }

            /**
             * Get policies for the given tenant.
             */
            function getIsolationPolicies() {
                PoliciesModel.get().then(function (result) {
                    applicationGroupCreateCtrl.isolationPolicies = _.filter(result, {
                        'tenantName': 'default'//TODO: Remove hardcoded tenant.
                    })
                });
            }

            /**
             * Add policy to new application group
             */
            function addIsolationPolicy() {
                if (_.find(applicationGroupCreateCtrl.selectedPolicies, applicationGroupCreateCtrl.selectedPolicy) === undefined ) {
                    //To display selected policies
                    applicationGroupCreateCtrl.selectedPolicies.push(applicationGroupCreateCtrl.selectedPolicy);

                    //To display rules of selected policies
                    RulesModel.getIncomingRules(applicationGroupCreateCtrl.selectedPolicy.policyName, 'default')
                        .then(function (rules) {
                            Array.prototype.push.apply(applicationGroupCreateCtrl.incomingRules, rules);
                        });
                    RulesModel.getOutgoingRules(applicationGroupCreateCtrl.selectedPolicy.policyName, 'default')
                        .then(function (rules) {
                            Array.prototype.push.apply(applicationGroupCreateCtrl.outgoingRules, rules);
                        });

                    //To be added to application group and saved to the server
                    applicationGroupCreateCtrl.newApplicationGroup.policies
                        .push(applicationGroupCreateCtrl.selectedPolicy.policyName);
                }
            }

            /**
             * Remove policy from new application group
             */
            function removeIsolationPolicy(policyName) {
                _.remove(applicationGroupCreateCtrl.newApplicationGroup.policies, function (policy) {
                    return policy == policyName;
                });
                _.remove(applicationGroupCreateCtrl.incomingRules, function (rule) {
                    return rule.policyName == policyName;
                });
                _.remove(applicationGroupCreateCtrl.outgoingRules, function (rule) {
                    return rule.policyName == policyName;
                });
            }

            function createApplicationGroup() {
                applicationGroupCreateCtrl.newApplicationGroup.networkName =
                    applicationGroupCreateCtrl.selectedNetwork.networkName;
                applicationGroupCreateCtrl.newApplicationGroup.key =
                    ApplicationGroupsModel.generateKey(applicationGroupCreateCtrl.newApplicationGroup);

                ApplicationGroupsModel.create(applicationGroupCreateCtrl.newApplicationGroup).then(function (result) {
                    returnToApplicationGroup();
                });
            }

            function resetForm() {
                applicationGroupCreateCtrl.newApplicationGroup = {
                    groupName: '',
                    networkName: '',
                    policies: [],
                    tenantName: 'default'//TODO: Remove hardcoded tenant.
                };
            }

            getNetworks();
            getIsolationPolicies();

            applicationGroupCreateCtrl.createApplicationGroup = createApplicationGroup;
            applicationGroupCreateCtrl.cancelCreating = cancelCreating;
            applicationGroupCreateCtrl.addIsolationPolicy = addIsolationPolicy;
            applicationGroupCreateCtrl.removeIsolationPolicy = removeIsolationPolicy;

            resetForm();
        }]);