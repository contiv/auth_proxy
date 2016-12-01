/**
 * Created by hardik gandhi on 6/16/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";

@Component({
    selector: 'bandwidthpolicydetails',
    templateUrl: 'network_policies/bandwidthpolicydetails.html'
})
export class BandwidthPolicyDetailsComponent {
    bandwidthProfiles:any[] = [];
    policy:any = {};
    mode:string = 'details';

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private netprofilesModel:NetprofilesModel,
                private crudHelperService:CRUDHelperService) {
        var bandwidthPolicyDetailsCtrl = this;

        /**
         * To show edit or details screen based on the route
         */
        function setMode() {
            if (activatedRoute.routeConfig.path.includes('edit')) {
                bandwidthPolicyDetailsCtrl.mode = 'edit';
            } else {
                bandwidthPolicyDetailsCtrl.mode = 'details';
            }
        }

        /* Get particular Profile for based on key*/
        bandwidthPolicyDetailsCtrl.netprofilesModel.getModelByKey(activatedRoute.snapshot.params['key'],false,undefined)
            .then(function (policy) {
                bandwidthPolicyDetailsCtrl.policy = policy;
            });
        bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
        bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);

        setMode();
    }

    deletePolicy() {
        var bandwidthPolicyDetailsCtrl = this;
        bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
        bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
        bandwidthPolicyDetailsCtrl.netprofilesModel.deleteUsingKey(bandwidthPolicyDetailsCtrl.policy.key, 'key', undefined).then(
            function successCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.crudHelperService.showNotification("Bandwidth Policy Deleted", result);
                bandwidthPolicyDetailsCtrl.returnToPolicies();
            }, function errorCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.crudHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
            });
    }


    returnToPolicies() {
        this.router.navigate(['../../../list', {policyTab: PolicyTab.bandwidth}], { relativeTo: this.activatedRoute });
    }

    returnToPolicyDetails() {
        this.router.navigate(['../../details', this.policy.key], { relativeTo: this.activatedRoute });
    }

    editPolicy() {
        this.router.navigate(['../../edit', this.policy.key], { relativeTo: this.activatedRoute });
    }

    cancelEditing() {
        this.returnToPolicyDetails();
    }

    savePolicy(validform: boolean) {
        var bandwidthPolicyDetailsCtrl = this;
        if (validform) {
            bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
            bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
            bandwidthPolicyDetailsCtrl.policy.bandwidth = bandwidthPolicyDetailsCtrl.policy.bandwidthNumber + " " + bandwidthPolicyDetailsCtrl.policy.bandwidthUnit;
            bandwidthPolicyDetailsCtrl.netprofilesModel.save(bandwidthPolicyDetailsCtrl.policy).then(function successCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.crudHelperService.showNotification("Bandwidth Policy Updated", result.key.toString());
                bandwidthPolicyDetailsCtrl.returnToPolicyDetails();
            }, function errorCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.crudHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
            });
        }
    }

}
