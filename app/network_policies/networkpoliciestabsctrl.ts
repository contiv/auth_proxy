/**
 * Created by vjain3 on 3/9/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

export enum PolicyTab {
    isolation,
    bandwidth,
    contractGroup
}

@Component({
    selector: 'networkpoliciestabs',
    templateUrl: './networkpoliciestabs.html'
})
export class NetworkPoliciesTabsComponent {
    isolationPolicySelected:boolean = true;
    bandwidthPolicySelected:boolean = false;
    contractGroupSelected:boolean = false;

    policyTab = PolicyTab;
    policyMode:string = 'isolation';


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
        if (this.contractGroupSelected) {
            this.router.navigate(['../contractgroup/create'], { relativeTo: this.activatedRoute });
        }
    }

    selectPolicyTab(tab:PolicyTab) {
        switch (tab) {
            case PolicyTab.isolation:
                this.isolationPolicySelected = true;
                this.bandwidthPolicySelected = false;
                this.contractGroupSelected = false;
                this.policyMode = 'isolation';
                break;
            case PolicyTab.bandwidth:
                this.isolationPolicySelected = false;
                this.bandwidthPolicySelected = true;
                this.contractGroupSelected = false;
                this.policyMode = 'bandwidth';
                break;
            case PolicyTab.contractGroup:
                this.isolationPolicySelected = false;
                this.bandwidthPolicySelected = false;
                this.contractGroupSelected = true;
                this.policyMode = 'contractgroup';
                break;
            default:
                this.isolationPolicySelected = true;
                this.bandwidthPolicySelected = false;
                this.contractGroupSelected = false;
                this.policyMode = 'isolation';
                break;
        }
    }
}
