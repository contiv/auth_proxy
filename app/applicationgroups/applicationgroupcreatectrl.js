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
        'ApplicationGroupService',
        function ($state, ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel, ApplicationGroupService) {
            var applicationGroupCreateCtrl = this;
            applicationGroupCreateCtrl.networks = [];
            applicationGroupCreateCtrl.isolationPolicies = [];
            applicationGroupCreateCtrl.applicationGroup = {};
            applicationGroupCreateCtrl.selectedNetwork = {};
            applicationGroupCreateCtrl.selectedPolicy = {};
            applicationGroupCreateCtrl.selectedPolicies = [];

            //To display incoming and outgoing rules for selected policies
            applicationGroupCreateCtrl.incomingRules = [];
            applicationGroupCreateCtrl.outgoingRules = [];

            applicationGroupCreateCtrl.isolationPoliciesVisible = false;


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
                ApplicationGroupService.addIsolationPolicy(applicationGroupCreateCtrl);
            }

            /**
             * Remove policy from new application group
             */
            function removeIsolationPolicy(policyName) {
                ApplicationGroupService.removeIsolationPolicy(applicationGroupCreateCtrl, policyName);
            }

            function createApplicationGroup() {
                //form controller is injected by the html template
                //checking if all validations have passed
                if (applicationGroupCreateCtrl.form.$valid) {
                    applicationGroupCreateCtrl.applicationGroup.networkName =
                        applicationGroupCreateCtrl.selectedNetwork.networkName;
                    applicationGroupCreateCtrl.applicationGroup.key =
                        ApplicationGroupsModel.generateKey(applicationGroupCreateCtrl.applicationGroup);

                    ApplicationGroupsModel.create(applicationGroupCreateCtrl.applicationGroup).then(function (result) {
                        returnToApplicationGroup();
                    });
                }
            }

            function resetForm() {
                applicationGroupCreateCtrl.applicationGroup = {
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