import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from 'lodash';
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { AppProfilesModel } from "../components/models/appprofilesmodel";

@Component({
    selector: 'appprofilecreate',
    templateUrl: 'appprofiles/appprofilecreate.html'
})

export class AppProfileCreateComponent {
    newAppProfile:any = {};

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private crudHelperService:CRUDHelperService,
                private appProfilesModel:AppProfilesModel,
                private ngZone:NgZone) {
        var component = this;

        function resetForm() {
            crudHelperService.stopLoader(component);
            crudHelperService.hideServerError(component);
            component.newAppProfile = {
                key: '',
                appProfileName: '',
                endpointGroups: [],
                tenantName: 'default'//TODO: Remove hardcoded tenant.
            };
        }

        resetForm();
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
            this.crudHelperService.hideServerError(this);
            component.newAppProfile.key = this.appProfilesModel.generateKey(this.newAppProfile);
            this.appProfilesModel.create(component.newAppProfile, undefined)
                .then((result) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                        component.crudHelperService.showNotification("Application Profile Created", result.key.toString());
                    });
                    component.returnToAppProfiles();
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError(component, error);
                });
        }
    }

}