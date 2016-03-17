/**
 * Created by vjain3 on 3/16/16.
 */
angular.module('contiv.applicationgroups')
    .factory('ApplicationGroupService', ['RulesModel', function (RulesModel) {

        /**
         * Add policy to application group
         * @param applicationGroupCtrl Controller for application group edit or create operation
         */
        function addIsolationPolicy(applicationGroupCtrl) {
            if (_.find(applicationGroupCtrl.selectedPolicies, applicationGroupCtrl.selectedPolicy) === undefined ) {
                //To display selected policies
                applicationGroupCtrl.selectedPolicies.push(applicationGroupCtrl.selectedPolicy);

                //To display rules of selected policies
                RulesModel.getIncomingRules(applicationGroupCtrl.selectedPolicy.policyName, 'default')
                    .then(function (rules) {
                        Array.prototype.push.apply(applicationGroupCtrl.incomingRules, rules);
                    });
                RulesModel.getOutgoingRules(applicationGroupCtrl.selectedPolicy.policyName, 'default')
                    .then(function (rules) {
                        Array.prototype.push.apply(applicationGroupCtrl.outgoingRules, rules);
                    });

                //To be added to application group and saved to the server
                applicationGroupCtrl.applicationGroup.policies
                    .push(applicationGroupCtrl.selectedPolicy.policyName);
            }
        }

        /**
         * Remove policy from application group
         * @param applicationGroupCtrl Controller for application group edit or create operation
         */
        function removeIsolationPolicy(applicationGroupCtrl, policyName) {
            _.remove(applicationGroupCtrl.applicationGroup.policies, function (policy) {
                return policy == policyName;
            });
            _.remove(applicationGroupCtrl.incomingRules, function (rule) {
                return rule.policyName == policyName;
            });
            _.remove(applicationGroupCtrl.outgoingRules, function (rule) {
                return rule.policyName == policyName;
            });
        }

        return {
            addIsolationPolicy: addIsolationPolicy,
            removeIsolationPolicy: removeIsolationPolicy
        }

    }]);