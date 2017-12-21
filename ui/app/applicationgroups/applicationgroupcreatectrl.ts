/**
 * Created by vjain3 on 3/11/16.
 */
import { Component, Inject, ViewChild, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { NetworksModel } from "../components/models/networksmodel";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { OrganizationsModel } from "../components/models/organizationsmodel";
import { NetworkService } from "../components/utils/networkservice";
import { ContractGroupSelectionComponent } from "./contractgroup.component";
import { IsolationPolicySelectionComponent } from "./isolationpolicydirective";
import { BandwidthPolicySelectionComponent } from "./bandwidthpolicydirective";

@Component({
    selector: 'applicationgroupcreate',
    templateUrl: './applicationgroupcreate.html'
})
export class ApplicationGroupCreateComponent {
    networks:any[] = [];
    tenants:any[] = [];
    applicationGroup:any = {};

    @ViewChild(BandwidthPolicySelectionComponent) bandwidthPolicyComponent: BandwidthPolicySelectionComponent;
    @ViewChild(IsolationPolicySelectionComponent) isolationPolicyComponent: IsolationPolicySelectionComponent;
    @ViewChild(ContractGroupSelectionComponent) contractGroupComponent: ContractGroupSelectionComponent;

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private ngZone:NgZone,
                private organizationsModel:OrganizationsModel,
                private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private crudHelperService:CRUDHelperService,
                private networkService:NetworkService) {

        var applicationGroupCreateCtrl = this;


        function resetForm() {
            crudHelperService.stopLoader(applicationGroupCreateCtrl);
            applicationGroupCreateCtrl.applicationGroup = {
                groupName: '',          // For Group Name
                networkName: '',        // For Network Name
                policies: [],           // For Isolation policies
                netProfile: '',         // For Bandwidth policy Name
                extContractsGrps: [],   // For External contract groups
                tenantName: '',
                cfgdTag: ''
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
            if (applicationGroupCreateCtrl.applicationGroup.cfgdTag === '') {
                delete applicationGroupCreateCtrl.applicationGroup.cfgdTag;
            }
            /**
             * applicationGroup consist of Group Name, Network Name, Isolation Policies, Bandwidth Policy, cfgdtag
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
        },(err) => {});
    }

    updateTenant(tenantName:string) {
        var component = this;
        component.applicationGroup.tenantName = tenantName;
        component.getNetworks(tenantName);
        component.isolationPolicyComponent.getIsolationPolicies();
        component.bandwidthPolicyComponent.getNetprofiles();
        //contractGroupComponent might be undefined if ACI is not configured
        if ((component.contractGroupComponent !== undefined) && (component.contractGroupComponent !== null)) {
            component.contractGroupComponent.getContractGroups();
        }
    }
}