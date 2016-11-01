/**
 * Created by vjain3 on 3/9/16.
 */
import { Component, Inject } from '@angular/core';
import { StateService, StateParams } from "angular-ui-router/commonjs/ng1";

export enum PolicyTab {
    isolation,
    bandwidth
}

@Component({
    selector: 'networkpoliciestabs',
    templateUrl: 'network_policies/networkpoliciestabs.html'
})
export class NetworkPoliciesTabsComponent {
    isolationPolicySelected:boolean = true;
    bandwidthPolicySelected:boolean = false;
    policyTab = PolicyTab;


    constructor(@Inject('$state') private $state:StateService,
                @Inject('$stateParams') private $stateParams:StateParams) {
        this.selectPolicyTab($stateParams['policyTab']);
    }

    createNetworkPolicy() {
        if (this.isolationPolicySelected) {
            this.$state.go('contiv.menu.networkpolicies.isolation.create');
        }
        if (this.bandwidthPolicySelected) {
            this.$state.go('contiv.menu.networkpolicies.bandwidth.create');
        }
    }

    selectPolicyTab(tab:PolicyTab) {
        switch (tab) {
            case PolicyTab.isolation:
                this.isolationPolicySelected = true;
                this.bandwidthPolicySelected = false;
                break;
            case PolicyTab.bandwidth:
                this.isolationPolicySelected = false;
                this.bandwidthPolicySelected = true;
                break;
            default:
                this.isolationPolicySelected = true;
                this.bandwidthPolicySelected = false;
                break;
        }
    }
}