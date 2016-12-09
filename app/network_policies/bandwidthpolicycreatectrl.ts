/*
/**
 * Created by hardik gandhi on 6/14/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";

@Component({
    selector: 'bandwidthpolicycreate',
    templateUrl: 'network_policies/bandwidthpolicycreate.html'
})
export class BandwidthPolicyCreateComponent {
    newPolicy;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private netprofilesModel: NetprofilesModel,
                private crudHelperService: CRUDHelperService){
        var bandwidthPolicyCreateCtrl = this;

        function resetForm() {
            crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
            bandwidthPolicyCreateCtrl.newPolicy = {
                profileName: '',
                tenantName: 'default', //TODO: Remove hardcoded tenant.
                bandwidth: '',
                DSCP: ''
            };
        }
        resetForm();
    }

    returnToPolicies() {
        this.router.navigate(['../../list', {policyTab: PolicyTab.bandwidth}], { relativeTo: this.activatedRoute });
    }

    cancelCreating() {
        this.returnToPolicies();
    }

    createPolicy(validform: boolean) {
        var bandwidthPolicyCreateCtrl = this;
        if (validform) {
            bandwidthPolicyCreateCtrl.crudHelperService.startLoader(bandwidthPolicyCreateCtrl);

            bandwidthPolicyCreateCtrl.newPolicy.key =
                bandwidthPolicyCreateCtrl.netprofilesModel.generateKey(bandwidthPolicyCreateCtrl.newPolicy);

            bandwidthPolicyCreateCtrl.newPolicy.bandwidth = bandwidthPolicyCreateCtrl.newPolicy.bandwidthNumber
                + " "+ bandwidthPolicyCreateCtrl.newPolicy.bandwidthUnit;

            bandwidthPolicyCreateCtrl.netprofilesModel.create(bandwidthPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                bandwidthPolicyCreateCtrl.crudHelperService.showNotification("Bandwidth policy: Created", result.key.toString());
                bandwidthPolicyCreateCtrl.returnToPolicies();
            }, function errorCallback(result) {
                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                bandwidthPolicyCreateCtrl.crudHelperService.showServerError("Bandwidth policy: Create failed", result);
            });
        }
    }
}

