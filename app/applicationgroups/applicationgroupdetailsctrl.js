/**
 * Created by vjain3 on 3/15/16.
 */
angular.module('contiv.applicationgroups')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.applicationgroups.details', {
                url: '/details/:key',
                controller: 'ApplicationGroupDetailsCtrl as applicationGroupDetailsCtrl',
                templateUrl: 'applicationgroups/applicationgroupdetails.html'
            })
        ;
    })
    .controller('ApplicationGroupDetailsCtrl', [
        '$state',
        '$stateParams',
        'ApplicationGroupsModel',
        'RulesModel',
        function ($state, $stateParams, ApplicationGroupsModel, RulesModel) {
            var applicationGroupDetailsCtrl = this;
            applicationGroupDetailsCtrl.isolationPoliciesVisible = false;

            function returnToApplicationGroup() {
                $state.go('contiv.applicationgroups');
            }

            function getRules() {
                //Application Groups might not have any policies associated with them
                if (applicationGroupDetailsCtrl.applicationGroup.policies !== undefined) {
                    applicationGroupDetailsCtrl.applicationGroup.policies.forEach(function (policy) {
                        //To display rules of selected policies
                        RulesModel.getIncomingRules(policy, 'default')
                            .then(function (rules) {
                                applicationGroupDetailsCtrl.incomingRules = rules;
                            });
                        RulesModel.getOutgoingRules(policy, 'default')
                            .then(function (rules) {
                                applicationGroupDetailsCtrl.outgoingRules = rules;
                            });
                    });
                }
            }

            function deleteApplicationGroup() {
                ApplicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup);
                returnToApplicationGroup();
            }

            ApplicationGroupsModel.getModelByKey($stateParams.key)
                .then(function (group) {
                    applicationGroupDetailsCtrl.applicationGroup = group;
                    getRules();
                });

            applicationGroupDetailsCtrl.deleteApplicationGroup = deleteApplicationGroup;

        }]);