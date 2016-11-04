/**
 * Created by vjain3 on 3/9/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

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


    constructor(private activatedRoute: ActivatedRoute,
                private router: Router) {
        this.selectPolicyTab(+activatedRoute.snapshot.params['policyTab']);
    }

    createNetworkPolicy() {
        if (this.isolationPolicySelected) {
            this.router.navigate(['../isolation/create'], { relativeTo: this.activatedRoute });
        }
        if (this.bandwidthPolicySelected) {
            this.router.navigate(['../bandwidth/create'], { relativeTo: this.activatedRoute });
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