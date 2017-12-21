/*
/**
 * Created by hardik gandhi on 6/14/16.
 */
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";
import { OrganizationsModel } from "../components/models/organizationsmodel";

@Component({
    selector: 'bandwidthpolicycreate',
    templateUrl: './bandwidthpolicycreate.html'
})
export class BandwidthPolicyCreateComponent implements OnInit {
    newPolicy:any;
    tenants:any[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private organizationsModel: OrganizationsModel,
                private netprofilesModel: NetprofilesModel,
                private crudHelperService: CRUDHelperService){
        var bandwidthPolicyCreateCtrl = this;

        function resetForm() {
            crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
            bandwidthPolicyCreateCtrl.newPolicy = {
                profileName: '',
                tenantName: '',
                bandwidth: '',
                bandwidthUnit: 'mbps',
                DSCP: 0,
                burst: 0
            };
        }
        resetForm();
    }

    ngOnInit() {
        var component = this;
        component.crudHelperService.startLoader(component);

        function getTenants(reload: boolean) {
            component.organizationsModel.get(reload)
                .then((result) => {
                    component.tenants = result;
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                });
        }

        getTenants(false);
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

            if (bandwidthPolicyCreateCtrl.newPolicy.DSCP == null) {//DSCP is null or undefined
                bandwidthPolicyCreateCtrl.newPolicy.DSCP = 0;
            }
            if (bandwidthPolicyCreateCtrl.newPolicy.burst == null) {//burst is null or undefined
                bandwidthPolicyCreateCtrl.newPolicy.burst = 0;
            }
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

