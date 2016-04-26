/**
 * Created by vjain3 on 3/8/16.
 */
angular.module('contiv.models')
    .factory('RulesModel', ['$http', '$q', function ($http, $q) {
        var rulesmodel = new Collection($http, $q, ContivGlobals.RULES_ENDPOINT);

        /**
         * Get incoming rules for a given policy and a tenant
         * @param policyName
         * @param tenantName
         * @returns {*|webdriver.promise.Promise}
         */
        rulesmodel.getIncomingRules = function (policyName, tenantName) {
            return rulesmodel.get().then(function (result) {
                return _.filter(result, {
                    'policyName': policyName,
                    'direction': 'in',
                    'tenantName': tenantName
                });

            });
        };

        /**
         * Get outgoing rules for a given policy and a tenant
         * @param policyName
         * @param tenantName
         * @returns {*|webdriver.promise.Promise}
         */
        rulesmodel.getOutgoingRules = function (policyName, tenantName) {
            return rulesmodel.get().then(function (result) {
                return _.filter(result, {
                    'policyName': policyName,
                    'direction': 'out',
                    'tenantName': tenantName
                });

            });
        };

        /**
         * Generate rule key to save rule on server
         * @param rule
         * @returns {string}
         */
        rulesmodel.generateKey = function (rule) {
            return rule.tenantName + ':' + rule.policyName + ':' + rule.ruleId;
        };

        return rulesmodel;
    }]);