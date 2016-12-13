/**
 * Created by vjain3 on 3/11/16.
 */
import { Component, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NetworksModel } from "../components/models/networksmodel";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { OrganizationsModel } from "../components/models/organizationsmodel";

@Component({
    selector: 'applicationgroupcreate',
    templateUrl: 'applicationgroups/applicationgroupcreate.html'
})
export class ApplicationGroupCreateComponent {
    networks:any[] = [];
    tenants:any[] = [];
    applicationGroup:any = {};

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private ngZone:NgZone,
                private organizationsModel:OrganizationsModel,
                private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private crudHelperService:CRUDHelperService) {

        var applicationGroupCreateCtrl = this;


        function resetForm() {
            crudHelperService.stopLoader(applicationGroupCreateCtrl);
            applicationGroupCreateCtrl.applicationGroup = {
                groupName: '',          // For Group Name
                networkName: '',        // For Network Name
                policies: [],           // For Isolation policies
                netProfile: '',         // For Bandwidth policy Name
                tenantName: ''
            };
        }

        resetForm();
    }

    ngOnInit() {
        var component = this;
        component.crudHelperService.startLoader(component);

        function getTenants(reload:boolean) {
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

    returnToApplicationGroup() {
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    cancelCreating() {
        this.returnToApplicationGroup();
    }

    createApplicationGroup(validform:boolean) {
        var applicationGroupCreateCtrl = this;
        if (validform) {
            applicationGroupCreateCtrl.crudHelperService.startLoader(applicationGroupCreateCtrl);

            applicationGroupCreateCtrl.applicationGroup.key =
                applicationGroupCreateCtrl.applicationGroupsModel.generateKey(applicationGroupCreateCtrl.applicationGroup);

            /**
             * applicationGroup consist of Group Name, Network Name, Isolation Policies, Bandwidth Policy
             */

            applicationGroupCreateCtrl.applicationGroupsModel.create(applicationGroupCreateCtrl.applicationGroup, undefined).then(
                function successCallback(result) {
                    applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
                    applicationGroupCreateCtrl.crudHelperService.showNotification("Application group: Created", result.key.toString());
                    applicationGroupCreateCtrl.returnToApplicationGroup();
                }, function errorCallback(result) {
                    applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
                    applicationGroupCreateCtrl.crudHelperService.showServerError("Application group: Create failed", result);
                });
        }
    }

    /**
     * Get networks for the given tenant.
     */
    getNetworks(tenantName:string) {
        var component = this;
        component.networksModel.get(false).then(function (result) {
            component.networks = _.filter(result, {
                'tenantName': tenantName
            });
        });
    }

    updateTenant(tenantName:string, isolationPolicyComponent: any, bandwidthPolicyComponent: any) {
        this.applicationGroup.tenantName = tenantName;
        this.getNetworks(tenantName);
        isolationPolicyComponent.getIsolationPolicies();
        bandwidthPolicyComponent.getNetprofiles();
    }
}