/**
 * Created by vjain3 on 3/8/16.
 */
import { Component, Inject } from '@angular/core';
import { PoliciesModel } from "../components/models/policiesmodel";
import { RulesModel } from "../components/models/rulesmodel";
import { NetworksModel } from "../components/models/networksmodel";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { StateService, StateParams } from "angular-ui-router/commonjs/ng1";

@Component({
    selector: 'isolationpolicydetails',
    templateUrl: 'network_policies/isolationpolicydetails.html'
})
export class IsolationPolicyDetailsComponent {
    policy:any = {};
    incomingRules:any[] = [];
    outgoingRules:any[] = [];
    mode:string = 'details';
    newIncomingRule:any = {};
    newOutgoingRule:any = {};
    networks:any[] = [];
    applicationGroups:any[] = [];
    disableOutgoingNetworkSelection:boolean = false;
    disableIncomingNetworkSelection:boolean = false;
    disableOutgoingApplicationGroupSelection:boolean = false;
    disableIncomingApplicationGroupSelection:boolean = false;
    disableIncomingIPAddressSelection:boolean = false;
    disableOutgoingIPAddressSelection:boolean = false;
    newIncomingSelectedApplicationGroup:string = '';
    newOutgoingSelectedApplicationGroup:string = '';
    newIncomingSelectedNetwork:string = '';
    newOutgoingSelectedNetwork:string = '';
    incorrectCIDR:boolean = false;
    validateCIDRFlag:boolean = false;

    constructor(@Inject('$state') private $state:StateService,
                @Inject('$stateParams') private $stateParams:StateParams,
                private policiesModel:PoliciesModel,
                private rulesModel:RulesModel,
                private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private crudHelperService:CRUDHelperService) {
        var isolationPolicyDetailsCtrl = this;

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


        /**
         * Get network names for the given tenant.
         */
        function getNetworks() {
            isolationPolicyDetailsCtrl.networksModel.get(false).then(function (result) {
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
            isolationPolicyDetailsCtrl.applicationGroupsModel.get()
                .then(function (result) {
                    //_.filter() returns a new array
                    isolationPolicyDetailsCtrl.applicationGroups = _.filter(result, {
                        'tenantName': 'default'//TODO: Remove hardcoded tenant.
                    });
                });
        }

        isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);

        isolationPolicyDetailsCtrl.policiesModel.getModelByKey($stateParams.key)
            .then(function (policy) {
                isolationPolicyDetailsCtrl.policy = policy;
                isolationPolicyDetailsCtrl.rulesModel.getIncomingRules(policy.policyName, 'default').then(function (result) {
                    isolationPolicyDetailsCtrl.incomingRules = result;
                    isolationPolicyDetailsCtrl.resetNewIncomingRule();
                });
                isolationPolicyDetailsCtrl.rulesModel.getOutgoingRules(policy.policyName, 'default').then(function (result) {
                    isolationPolicyDetailsCtrl.outgoingRules = result;
                    isolationPolicyDetailsCtrl.resetNewOutgoingRule();
                });
            });

        getNetworks();
        getApplicationGroups();
        setMode();
    }

    returnToPolicies() {
        this.$state.go('contiv.menu.networkpolicies.list.isolation');
    }

    returnToPolicyDetails() {
        this.$state.go('contiv.menu.networkpolicies.isolation.details', {key: this.policy.key});
    }

    editPolicy() {
        this.$state.go('contiv.menu.networkpolicies.isolation.edit', {key:this.policy.key});
    }

    cancelEditing() {
        this.returnToPolicyDetails();
    }

    /**
     * Go back to policy details after done editing
     */
    doneEditing() {
        this.returnToPolicyDetails();
    }

    deletePolicy() {
        var isolationPolicyDetailsCtrl = this;
        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.policiesModel.delete(isolationPolicyDetailsCtrl.policy).then(function successCallback(result) {
            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.returnToPolicies();
        }, function errorCallback(result) {
            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
        });
    }

    validateCIDR(ipaddress) {
        var cidrPattern = new RegExp(ContivGlobals.CIDR_REGEX);

        if (ipaddress == '') {
            return true;
        }

        if (cidrPattern.test(ipaddress)) {
            this.incorrectCIDR = false;
            return true;
        }
        this.incorrectCIDR = true;
        this.validateCIDRFlag = true;
        return false;
    }

    resetNewIncomingRule() {
        //Rule object to be created on server
        this.newIncomingRule = {
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
            policyName: this.policy.policyName
        };
        this.newIncomingSelectedApplicationGroup = '';
        this.newIncomingSelectedNetwork = '';
        this.disableIncomingNetworkSelection = false;
        this.disableIncomingApplicationGroupSelection = false;
        this.disableIncomingIPAddressSelection = false;
        this.incorrectCIDR = false;
        this.validateCIDRFlag = false;
    }

    resetNewOutgoingRule() {
        //Rule object to be created on server
        this.newOutgoingRule = {
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
            policyName: this.policy.policyName
        };
        this.newOutgoingSelectedApplicationGroup = '';
        this.newOutgoingSelectedNetwork = '';
        this.disableOutgoingNetworkSelection = false;
        this.disableOutgoingApplicationGroupSelection = false;
        this.disableOutgoingIPAddressSelection = false;
        this.incorrectCIDR = false;
        this.validateCIDRFlag = false;
    }

    /**
     * Event handler to disable network selection box once application group is selected while creating a new
     * rule.
     */
    onChangeOutgoingApplicationGroupSelection(group: string) {
        if (group) {
            //If application group has been selected
            this.newOutgoingRule.toEndpointGroup = group;
            this.newOutgoingRule.toNetwork = '';
            this.disableOutgoingNetworkSelection = true;
        } else {
            //When 'none' is selected
            this.newOutgoingRule.toEndpointGroup = '';
            this.disableOutgoingNetworkSelection = false;
        }
    }

    /**
     * Event handler to disable network selection box once application group is selected while creating a new
     * rule.
     */
    onChangeIncomingApplicationGroupSelection(group: string) {
        if (group) {
            //If application group has been selected
            this.newIncomingRule.fromEndpointGroup = group;
            this.newIncomingRule.fromNetwork = '';
            this.disableIncomingNetworkSelection = true;
        } else {
            //When 'none' is selected
            this.newIncomingRule.fromEndpointGroup = '';
            this.disableOutgoingApplicationGroupSelection = false;
            this.disableIncomingNetworkSelection = false;
        }

    }

    /**
     * Event handler to disable application group selection box once network is selected while creating a new
     * rule.
     */
    onChangeOutgoingNetworkSelection(network: string) {
        if (network) {
            //If network has been selected
            this.newOutgoingRule.toNetwork = network;
            this.newOutgoingRule.ToEndpointGroup = '';
            this.disableOutgoingApplicationGroupSelection = true;
            this.disableOutgoingIPAddressSelection = true;
        } else {
            this.newOutgoingRule.toIpAddress = '';
            this.disableOutgoingApplicationGroupSelection = false;
            this.disableOutgoingIPAddressSelection = false;
        }
    }

    /**
     * Event handler to disable application group selection box once network is selected while creating a new
     * rule.
     */
    onChangeIncomingNetworkSelection(network: string) {
        if (network) {
            //If network has been selected
            this.newIncomingRule.fromNetwork = network;
            this.newIncomingRule.fromEndpointGroup = '';
            this.disableIncomingApplicationGroupSelection = true;
            this.disableIncomingIPAddressSelection = true;
        } else {
            this.newIncomingRule.fromNetwork = '';
            this.disableIncomingApplicationGroupSelection = false;
            this.disableIncomingIPAddressSelection = false;
        }
    }

    onChangeIncomingIPAddress() {
        if (this.newIncomingRule.fromIpAddress == '') {
            this.incorrectCIDR = false;
            this.disableIncomingNetworkSelection = false;
        } else {
            this.disableIncomingNetworkSelection = true;
        }

        if (this.validateCIDRFlag &&
            this.incorrectCIDR) {
            this.validateCIDR(this.newIncomingRule.fromIpAddress);
        }
    }

    onChangeOutgoingIPAddress() {
        if (this.newOutgoingRule.toIpAddress == '') {
            this.incorrectCIDR = false;
            this.disableOutgoingNetworkSelection = false;
        } else {
            this.disableOutgoingNetworkSelection = true;
        }

        if (this.validateCIDRFlag &&
            this.incorrectCIDR) {
            this.validateCIDR(this.newOutgoingRule.toIpAddress);
        }
    }

    /**
     * Generates rule id
     * TODO Make it cryptographically stronger once we have multiple users updating same policy
     */
    generateRuleId(rule) {
        rule.ruleId =
            (this.incomingRules.length + this.outgoingRules.length + 1).toString() + '-' +
            Date.now().toString();
    }

    /**
     * Rule is saved to server
     */
    addIncomingRule() {
        var isolationPolicyDetailsCtrl = this;
        if (isolationPolicyDetailsCtrl.validateCIDR(isolationPolicyDetailsCtrl.newIncomingRule.fromIpAddress)) {
            isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.generateRuleId(isolationPolicyDetailsCtrl.newIncomingRule);
            isolationPolicyDetailsCtrl.newIncomingRule.key = isolationPolicyDetailsCtrl.rulesModel.generateKey(isolationPolicyDetailsCtrl.newIncomingRule);
            isolationPolicyDetailsCtrl.rulesModel.create(isolationPolicyDetailsCtrl.newIncomingRule).then(function successCallback(result) {
                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
                isolationPolicyDetailsCtrl.incomingRules.push(result);
                isolationPolicyDetailsCtrl.resetNewIncomingRule();
            }, function errorCallback(result) {
                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
                isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
            });
        }
    }

    /**
     * Rule is saved to server
     */
    addOutgoingRule() {
        var isolationPolicyDetailsCtrl = this;
        if (isolationPolicyDetailsCtrl.validateCIDR(isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress)) {
            isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.generateRuleId(isolationPolicyDetailsCtrl.newOutgoingRule);
            isolationPolicyDetailsCtrl.newOutgoingRule.key = isolationPolicyDetailsCtrl.rulesModel.generateKey(isolationPolicyDetailsCtrl.newOutgoingRule);
            isolationPolicyDetailsCtrl.rulesModel.create(isolationPolicyDetailsCtrl.newOutgoingRule).then(function successCallback(result) {
                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
                isolationPolicyDetailsCtrl.outgoingRules.push(result);
                isolationPolicyDetailsCtrl.resetNewOutgoingRule();
            }, function errorCallback(result) {
                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
                isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
            });
        }
    }

    /**
     * Delete incoming rule from server
     */
    deleteIncomingRule(key) {
        var isolationPolicyDetailsCtrl = this;
        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.rulesModel.deleteUsingKey(key).then(function successCallback(result) {
            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
            _.remove(isolationPolicyDetailsCtrl.incomingRules, function (n) {
                return n.key == key;
            });
        }, function errorCallback(result) {
            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
        });
    }

    /**
     * Delete outgoing rule from server
     */
    deleteOutgoingRule(key) {
        var isolationPolicyDetailsCtrl = this;
        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
        isolationPolicyDetailsCtrl.rulesModel.deleteUsingKey(key).then(function successCallback(result) {
            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
            _.remove(isolationPolicyDetailsCtrl.outgoingRules, function (n) {
                return n.key == key;
            });
        }, function errorCallback(result) {
            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
            isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
        });
    }
}