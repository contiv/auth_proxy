/**
 * Created by hardik gandhi on 7/8/16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { PoliciesModel } from "../components/models/policiesmodel";
import { RulesModel } from "../components/models/rulesmodel";

@Component({
    selector: 'ctv-isolationpolicy',
    templateUrl: './isolationpolicy.html'
})
export class IsolationPolicySelectionComponent implements OnChanges {
    @Input() mode:string;
    @Input() applicationgroup:any;

    incomingRules:any[] = [];
    outgoingRules:any[] = [];
    isolationPolicies:any[] = [];          // To Get all isolation policies of tenant
    isolationPolicySearchText:string = '';

    constructor(private policiesModel:PoliciesModel,
                private rulesModel:RulesModel) {

    }

    ngOnChanges() {
        var component = this;

        /**
         * Get incoming and outgoing rules for each policy present in applicationgroup
         */
        function getRules() {
            component.applicationgroup.policies.forEach(function (policy) {
                //To display rules of selected policies
                component.rulesModel.getIncomingRules(policy, component.applicationgroup.tenantName)
                    .then(function (rules) {
                        Array.prototype.push.apply(component.incomingRules, rules);
                    });
                component.rulesModel.getOutgoingRules(policy, component.applicationgroup.tenantName)
                    .then(function (rules) {
                        Array.prototype.push.apply(component.outgoingRules, rules);
                    });
            });
        }

        /**
         *  To check 'details' or 'edit' mode (not create mode)
         */
        if (component.mode === 'details' || (component.mode === 'edit' && component.applicationgroup.groupName != "")) {
            component.getIsolationPolicies();
            //Application Groups might not have any policies associated with them so define an empty array
            if (component.applicationgroup.policies === undefined) {
                component.applicationgroup.policies = [];
            }
            getRules();
        }
    }

    /**
     * Get policies for the given tenant.
     */
    getIsolationPolicies() {
        var component = this;
        component.policiesModel.get(false).then(function (result) {
            component.isolationPolicies = _.filter(result, {
                'tenantName': component.applicationgroup.tenantName
            });
        });
    }

    /**
     * Add policy to application group
     */
    addIsolationPolicy(policyName) {
        var component = this;
        var currentPolicyName = policyName;

        if (currentPolicyName !== undefined && _.includes(component.applicationgroup.policies, currentPolicyName) == false) {
            //To display selected policies
            //To be added to application group and saved to the server
            component.applicationgroup.policies
                .push(currentPolicyName);

            //To display rules of selected policies
            component.rulesModel.getIncomingRules(currentPolicyName, component.applicationgroup.tenantName)
                .then(function (rules) {
                    Array.prototype.push.apply(component.incomingRules, rules);
                });
            component.rulesModel.getOutgoingRules(currentPolicyName, component.applicationgroup.tenantName)
                .then(function (rules) {
                    Array.prototype.push.apply(component.outgoingRules, rules);
                });

        }
    };

    /**
     * Remove policy from application group
     */
    removeIsolationPolicy(policyName) {
        _.remove(this.applicationgroup.policies, function (policy) {
            return policy === policyName;
        });
        _.remove(this.incomingRules, function (rule) {
            return rule.policyName === policyName;
        });
        _.remove(this.outgoingRules, function (rule) {
            return rule.policyName === policyName;
        });
    };
}


