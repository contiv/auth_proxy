/**
 * Created by vjain3 on 3/8/16.
 */
angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.isolation.details', {
                url: '/details/:key',
                controller: 'IsolationPolicyDetailsCtrl as isolationPolicyDetailsCtrl',
                templateUrl: 'network_policies/isolationpolicydetails.html'
            });
    }])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.isolation.edit', {
                url: '/edit/:key',
                controller: 'IsolationPolicyDetailsCtrl as isolationPolicyDetailsCtrl',
                templateUrl: 'network_policies/isolationpolicydetails.html'
            });
    }])
    .controller('IsolationPolicyDetailsCtrl', [
        '$state',
        '$stateParams',
        'PoliciesModel',
        'RulesModel',
        'NetworksModel',
        'ApplicationGroupsModel',
        'CRUDHelperService',
        function ($state, $stateParams, PoliciesModel, RulesModel, NetworksModel, ApplicationGroupsModel, CRUDHelperService) {
            var isolationPolicyDetailsCtrl = this;
            isolationPolicyDetailsCtrl.networks = [];
            isolationPolicyDetailsCtrl.applicationGroups = [];
            isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = false;
            isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = false;
            isolationPolicyDetailsCtrl.disableOutgoingApplicationGroupSelection = false;
            isolationPolicyDetailsCtrl.disableIncomingApplicationGroupSelection = false;
            isolationPolicyDetailsCtrl.disableIncomingIPAddressSelection = false;
            isolationPolicyDetailsCtrl.disableOutgoingIPAddressSelection = false;
            isolationPolicyDetailsCtrl.newIncomingSelectedApplicationGroup = '';
            isolationPolicyDetailsCtrl.newOutgoingSelectedApplicationGroup = '';
            isolationPolicyDetailsCtrl.newIncomingSelectedNetwork = '';
            isolationPolicyDetailsCtrl.newOutgoingSelectedNetwork = '';
            isolationPolicyDetailsCtrl.incorrectCIDR = false;
            isolationPolicyDetailsCtrl.validateCIDRFlag = false;


            function returnToPolicies() {
                $state.go('contiv.menu.networkpolicies.list.isolation');
            }

            function returnToPolicyDetails() {
                $state.go('contiv.menu.networkpolicies.isolation.details', {key: isolationPolicyDetailsCtrl.policy.key});
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
                CRUDHelperService.hideServerError(isolationPolicyDetailsCtrl);
                CRUDHelperService.startLoader(isolationPolicyDetailsCtrl);
                PoliciesModel.delete(isolationPolicyDetailsCtrl.policy).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                    returnToPolicies();
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                    CRUDHelperService.showServerError(isolationPolicyDetailsCtrl, result);
                });
            }

            /**
             * To show edit or details screen based on the route
             */
            function setMode() {
                if ($state.is('contiv.menu.networkpolicies.isolation.edit')) {
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
                    fromIpAddress: '',
                    protocol: 'tcp',//to make it default selected option in UI
                    port: 0,
                    direction: 'in',
                    tenantName: 'default',
                    policyName: isolationPolicyDetailsCtrl.policy.policyName
                };
                isolationPolicyDetailsCtrl.newIncomingSelectedApplicationGroup = '';
                isolationPolicyDetailsCtrl.newIncomingSelectedNetwork = '';
                isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = false;
                isolationPolicyDetailsCtrl.disableIncomingApplicationGroupSelection = false;
                isolationPolicyDetailsCtrl.disableIncomingIPAddressSelection = false;
                isolationPolicyDetailsCtrl.incorrectCIDR = false;
                isolationPolicyDetailsCtrl.validateCIDRFlag = false;
            }

            function resetNewOutgoingRule() {
                //Rule object to be created on server
                isolationPolicyDetailsCtrl.newOutgoingRule = {
                    ruleId: '',
                    priority: 1,
                    action: 'allow',//to make it default selected option in UI
                    toEndpointGroup: '',
                    toNetwork: '',
                    toIpAddress: '',
                    protocol: 'tcp',//to make it default selected option in UI
                    port: 0,
                    direction: 'out',
                    tenantName: 'default',
                    policyName: isolationPolicyDetailsCtrl.policy.policyName
                };
                isolationPolicyDetailsCtrl.newOutgoingSelectedApplicationGroup = '';
                isolationPolicyDetailsCtrl.newOutgoingSelectedNetwork = '';
                isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = false;
                isolationPolicyDetailsCtrl.disableOutgoingApplicationGroupSelection = false;
                isolationPolicyDetailsCtrl.disableOutgoingIPAddressSelection = false;
                isolationPolicyDetailsCtrl.incorrectCIDR = false;
                isolationPolicyDetailsCtrl.validateCIDRFlag = false;
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
                    isolationPolicyDetailsCtrl.newOutgoingRule.toNetwork = '';
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
                    isolationPolicyDetailsCtrl.newIncomingRule.fromNetwork = '';
                    isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = true;
                } else {
                    //When 'none' is selected
                    isolationPolicyDetailsCtrl.newIncomingRule.fromEndpointGroup = '';
                    isolationPolicyDetailsCtrl.disableOutgoingApplicationGroupSelection = false;
                    isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = false;
                }

            }

            /**
             * Event handler to disable application group selection box once network is selected while creating a new
             * rule.
             */
            function onChangeOutgoingNetworkSelection() {
                if (isolationPolicyDetailsCtrl.newOutgoingSelectedNetwork!= null) {
                    //If network has been selected
                    isolationPolicyDetailsCtrl.newOutgoingRule.toNetwork =
                        isolationPolicyDetailsCtrl.newOutgoingSelectedNetwork;
                    isolationPolicyDetailsCtrl.newOutgoingRule.ToEndpointGroup = '';
                    isolationPolicyDetailsCtrl.disableOutgoingApplicationGroupSelection = true;
                    isolationPolicyDetailsCtrl.disableOutgoingIPAddressSelection = true;
                } else {
                    isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress = '';
                    isolationPolicyDetailsCtrl.disableOutgoingApplicationGroupSelection = false;
                    isolationPolicyDetailsCtrl.disableOutgoingIPAddressSelection = false;
                }
            }

            /**
             * Event handler to disable application group selection box once network is selected while creating a new
             * rule.
             */
            function onChangeIncomingNetworkSelection() {
                if (isolationPolicyDetailsCtrl.newIncomingSelectedNetwork != null) {
                    //If network has been selected
                    isolationPolicyDetailsCtrl.newIncomingRule.fromNetwork =
                        isolationPolicyDetailsCtrl.newIncomingSelectedNetwork;
                    isolationPolicyDetailsCtrl.newIncomingRule.fromEndpointGroup = '';
                    isolationPolicyDetailsCtrl.disableIncomingApplicationGroupSelection = true;
                    isolationPolicyDetailsCtrl.disableIncomingIPAddressSelection = true;
                } else {
                    isolationPolicyDetailsCtrl.newIncomingRule.fromNetwork = '';
                    isolationPolicyDetailsCtrl.disableIncomingApplicationGroupSelection = false;
                    isolationPolicyDetailsCtrl.disableIncomingIPAddressSelection = false;
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
                if(validateCIDR(isolationPolicyDetailsCtrl.newIncomingRule.fromIpAddress)) {
                    CRUDHelperService.hideServerError(isolationPolicyDetailsCtrl);
                    CRUDHelperService.startLoader(isolationPolicyDetailsCtrl);
                    generateRuleId(isolationPolicyDetailsCtrl.newIncomingRule);
                    isolationPolicyDetailsCtrl.newIncomingRule.key = RulesModel.generateKey(isolationPolicyDetailsCtrl.newIncomingRule);
                    RulesModel.create(isolationPolicyDetailsCtrl.newIncomingRule).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                        isolationPolicyDetailsCtrl.incomingRules.push(result);
                        resetNewIncomingRule();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                        CRUDHelperService.showServerError(isolationPolicyDetailsCtrl, result);
                    });
                }
            }

            function onChangeIncomingIPAddress(){
                if(isolationPolicyDetailsCtrl.newIncomingRule.fromIpAddress == ''){
                    isolationPolicyDetailsCtrl.incorrectCIDR = false;
                    isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = false;
                }else{
                    isolationPolicyDetailsCtrl.disableIncomingNetworkSelection = true;
                }

                if(isolationPolicyDetailsCtrl.validateCIDRFlag &&
                    isolationPolicyDetailsCtrl.incorrectCIDR){
                    validateCIDR(isolationPolicyDetailsCtrl.newIncomingRule.fromIpAddress);
                }
            }
            
            function onChangeOutgoingIPAddress(){
                if(isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress == ''){
                    isolationPolicyDetailsCtrl.incorrectCIDR = false;
                    isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = false;
                }else{
                    isolationPolicyDetailsCtrl.disableOutgoingNetworkSelection = true;
                }

                if(isolationPolicyDetailsCtrl.validateCIDRFlag &&
                    isolationPolicyDetailsCtrl.incorrectCIDR){
                    validateCIDR(isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress);
                }
            }

            function validateCIDR(ipaddress) {
                var cidrPattern = new RegExp(ContivGlobals.CIDR_REGEX);

                if(ipaddress == ''){
                    return true;
                }

                if (cidrPattern.test(ipaddress)) {
                    isolationPolicyDetailsCtrl.incorrectCIDR = false;
                    return true;
                }
                isolationPolicyDetailsCtrl.incorrectCIDR = true;
                isolationPolicyDetailsCtrl.validateCIDRFlag = true;
                return false;
            }

            /**
             * Rule is saved to server
             */
            function addOutgoingRule() {
                if(validateCIDR(isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress)) {
                    CRUDHelperService.hideServerError(isolationPolicyDetailsCtrl);
                    CRUDHelperService.startLoader(isolationPolicyDetailsCtrl);
                    generateRuleId(isolationPolicyDetailsCtrl.newOutgoingRule);
                    isolationPolicyDetailsCtrl.newOutgoingRule.key = RulesModel.generateKey(isolationPolicyDetailsCtrl.newOutgoingRule);
                    RulesModel.create(isolationPolicyDetailsCtrl.newOutgoingRule).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                        isolationPolicyDetailsCtrl.outgoingRules.push(result);
                        resetNewOutgoingRule();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                        CRUDHelperService.showServerError(isolationPolicyDetailsCtrl, result);
                    });
                }
            }

            /**
             * Delete incoming rule from server
             */
            function deleteIncomingRule(key) {
                CRUDHelperService.hideServerError(isolationPolicyDetailsCtrl);
                CRUDHelperService.startLoader(isolationPolicyDetailsCtrl);
                RulesModel.deleteUsingKey(key).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                    _.remove(isolationPolicyDetailsCtrl.incomingRules, function (n) {
                        return n.key == key;
                    });
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                    CRUDHelperService.showServerError(isolationPolicyDetailsCtrl, result);
                });
            }

            /**
             * Delete outgoing rule from server
             */
            function deleteOutgoingRule(key) {
                CRUDHelperService.hideServerError(isolationPolicyDetailsCtrl);
                CRUDHelperService.startLoader(isolationPolicyDetailsCtrl);
                RulesModel.deleteUsingKey(key).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                    _.remove(isolationPolicyDetailsCtrl.outgoingRules, function (n) {
                        return n.key == key;
                    });
                }, function errorCallback(result) {
                    CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
                    CRUDHelperService.showServerError(isolationPolicyDetailsCtrl, result);
                });
            }

            CRUDHelperService.stopLoader(isolationPolicyDetailsCtrl);
            CRUDHelperService.hideServerError(isolationPolicyDetailsCtrl);

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
            isolationPolicyDetailsCtrl.onChangeOutgoingNetworkSelection = onChangeOutgoingNetworkSelection;
            isolationPolicyDetailsCtrl.onChangeIncomingNetworkSelection = onChangeIncomingNetworkSelection;
            isolationPolicyDetailsCtrl.onChangeIncomingIPAddress = onChangeIncomingIPAddress;
            isolationPolicyDetailsCtrl.onChangeOutgoingIPAddress = onChangeOutgoingIPAddress;

            setMode();

        }]);