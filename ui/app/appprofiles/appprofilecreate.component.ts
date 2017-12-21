import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from 'lodash';
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { AppProfilesModel } from "../components/models/appprofilesmodel";
import { OrganizationsModel } from "../components/models/organizationsmodel";

@Component({
    selector: 'appprofilecreate',
    templateUrl: './appprofilecreate.html'
})

export class AppProfileCreateComponent implements OnInit {
    newAppProfile:any = {};
    tenants:any[] = [];

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private ngZone:NgZone,
                private organizationsModel:OrganizationsModel,
                private crudHelperService:CRUDHelperService,
                private appProfilesModel:AppProfilesModel) {
        var component = this;

        function resetForm() {
            crudHelperService.stopLoader(component);
            component.newAppProfile = {
                key: '',
                appProfileName: '',
                endpointGroups: [],
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

    returnToAppProfiles() {
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    cancelCreating() {
        this.returnToAppProfiles();
    }

    createAppProfile(formvalid:boolean) {
        var component = this;
        if (formvalid) {
            this.crudHelperService.startLoader(this);
            component.newAppProfile.key = this.appProfilesModel.generateKey(this.newAppProfile);
            this.appProfilesModel.create(component.newAppProfile, undefined)
                .then((result) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                        component.crudHelperService.showNotification("Application profile: Created", result.key.toString());
                    });
                    component.returnToAppProfiles();
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("Application profile: Create failed", error);
                });
        }
    }

    updateTenant(tenantName:string, appGroupSelComponent: any) {
        this.newAppProfile.tenantName = tenantName;
        appGroupSelComponent.getApplicationGroups();
    }
}