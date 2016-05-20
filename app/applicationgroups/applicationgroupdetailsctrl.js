/**
 * Created by vjain3 on 3/15/16.
 */
angular.module('contiv.applicationgroups')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.applicationgroups.details', {
                url: '/details/:key',
                controller: 'ApplicationGroupDetailsCtrl as applicationGroupDetailsCtrl',
                templateUrl: 'applicationgroups/applicationgroupdetails.html'
            })
            .state('contiv.menu.applicationgroups.edit', {
                url: '/edit/:key',
                controller: 'ApplicationGroupDetailsCtrl as applicationGroupDetailsCtrl',
                templateUrl: 'applicationgroups/applicationgroupdetails.html'
            })
        ;
    }])
    .controller('ApplicationGroupDetailsCtrl', [
        '$state',
        '$stateParams',
        'ApplicationGroupsModel',
        'PoliciesModel',
        'RulesModel',
        'ApplicationGroupService',
        'CRUDHelperService',
        function ($state,
                  $stateParams,
                  ApplicationGroupsModel,
                  PoliciesModel,
                  RulesModel,
                  ApplicationGroupService,
                  CRUDHelperService) {
            var applicationGroupDetailsCtrl = this;
            applicationGroupDetailsCtrl.isolationPolicies = [];
            applicationGroupDetailsCtrl.applicationGroup = {};
            applicationGroupDetailsCtrl.selectedNetwork = {};
            applicationGroupDetailsCtrl.selectedPolicy = {};
            applicationGroupDetailsCtrl.selectedPolicies = [];

            //To display incoming and outgoing rules for selected policies
            applicationGroupDetailsCtrl.incomingRules = [];
            applicationGroupDetailsCtrl.outgoingRules = [];


            applicationGroupDetailsCtrl.isolationPoliciesVisible = false;

            /**
             * To show edit or details screen based on the route
             */
            function setMode() {
                if ($state.is('contiv.menu.applicationgroups.edit')) {
                    applicationGroupDetailsCtrl.mode = 'edit';
                } else {
                    applicationGroupDetailsCtrl.mode = 'details';
                }
            }

            function returnToApplicationGroup() {
                $state.go('contiv.menu.applicationgroups.list');
            }

            function returnToApplicationGroupDetails() {
                $state.go('contiv.menu.applicationgroups.details', {'key': applicationGroupDetailsCtrl.applicationGroup.key});
            }

            function cancelEditing() {
                returnToApplicationGroupDetails();
            }

            function getRules() {
                applicationGroupDetailsCtrl.applicationGroup.policies.forEach(function (policy) {
                    //To display rules of selected policies
                    RulesModel.getIncomingRules(policy, 'default')
                        .then(function (rules) {
                            Array.prototype.push.apply(applicationGroupDetailsCtrl.incomingRules, rules);
                        });
                    RulesModel.getOutgoingRules(policy, 'default')
                        .then(function (rules) {
                            Array.prototype.push.apply(applicationGroupDetailsCtrl.outgoingRules, rules);
                        });
                });

            }

            function deleteApplicationGroup() {
                CRUDHelperService.hideServerError(applicationGroupDetailsCtrl);
                CRUDHelperService.startLoader(applicationGroupDetailsCtrl);
                ApplicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup).then(
                    function successCallback(result) {
                        CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                        returnToApplicationGroup();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                        CRUDHelperService.showServerError(applicationGroupDetailsCtrl, result);
                    });
            }

            /**
             * Get policies for the given tenant.
             */
            function getIsolationPolicies() {
                PoliciesModel.get().then(function (result) {
                    applicationGroupDetailsCtrl.isolationPolicies = _.filter(result, {
                        'tenantName': 'default'//TODO: Remove hardcoded tenant.
                    })
                });
            }

            /**
             * Add policy to application group
             */
            function addIsolationPolicy() {
                ApplicationGroupService.addIsolationPolicy(applicationGroupDetailsCtrl);
            }

            /**
             * Remove policy from application group
             */
            function removeIsolationPolicy(policyName) {
                ApplicationGroupService.removeIsolationPolicy(applicationGroupDetailsCtrl, policyName);
            }

            function saveApplicationGroup() {
                CRUDHelperService.hideServerError(applicationGroupDetailsCtrl);
                CRUDHelperService.startLoader(applicationGroupDetailsCtrl);
                ApplicationGroupsModel.save(applicationGroupDetailsCtrl.applicationGroup).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                    returnToApplicationGroupDetails();
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
                    CRUDHelperService.showServerError(applicationGroupDetailsCtrl, result);
                });
            }

            CRUDHelperService.stopLoader(applicationGroupDetailsCtrl);
            CRUDHelperService.hideServerError(applicationGroupDetailsCtrl);

            ApplicationGroupsModel.getModelByKey($stateParams.key)
                .then(function (group) {
                    applicationGroupDetailsCtrl.applicationGroup = group;
                    //Application Groups might not have any policies associated with them so define an empty array
                    if (applicationGroupDetailsCtrl.applicationGroup.policies === undefined) {
                        applicationGroupDetailsCtrl.applicationGroup.policies = [];
                    }
                    getRules();
                });

            getIsolationPolicies();

            applicationGroupDetailsCtrl.saveApplicationGroup = saveApplicationGroup;
            applicationGroupDetailsCtrl.cancelEditing = cancelEditing;
            applicationGroupDetailsCtrl.addIsolationPolicy = addIsolationPolicy;
            applicationGroupDetailsCtrl.removeIsolationPolicy = removeIsolationPolicy;
            applicationGroupDetailsCtrl.deleteApplicationGroup = deleteApplicationGroup;

            setMode();

        }]);