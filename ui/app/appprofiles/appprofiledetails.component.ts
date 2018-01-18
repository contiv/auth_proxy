import { Component, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AppProfilesModel } from "../components/models/appprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";

@Component({
    selector: 'appprofiledetails',
    templateUrl: './appprofiledetails.html'
})
export class AppProfileDetailsComponent {
    appProfile:any = {};
    mode:string = 'details';

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private appProfilesModel:AppProfilesModel,
                private crudHelperService:CRUDHelperService) {
        var component = this;

        /**
         * To show edit or details screen based on the route
         */
        function setMode() {
            if (activatedRoute.routeConfig.path.includes('edit')) {
                component.mode = 'edit';
            } else {
                component.mode = 'details';
            }
        }

        component.crudHelperService.stopLoader(component);

        component.appProfilesModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
            .then(function (appProfile) {
                component.appProfile = appProfile;
            });

        setMode();
    }

    returnToAppProfile() {
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }

    returnToAppProfileDetails() {
        this.router.navigate(['../../details', this.appProfile.key], { relativeTo: this.activatedRoute });
    }

    editAppProfile() {
        this.router.navigate(['../../edit', this.appProfile.key], { relativeTo: this.activatedRoute });
    }

    cancelEditing() {
        this.returnToAppProfileDetails();
    }

    deleteAppProfile() {
        var component = this;
        component.crudHelperService.startLoader(component);
        component.appProfilesModel.delete(component.appProfile).then(
            function successCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                    component.crudHelperService.showNotification("Application profile: Deleted", result);
                });
                component.returnToAppProfile();
            }, function errorCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showServerError("Application profile: Delete failed", result);
            });
    }

    saveAppProfile(formvalid: boolean) {
        var component = this;
        if (formvalid) {
            component.crudHelperService.startLoader(component);

            component.appProfilesModel.save(component.appProfile).then(
                function successCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                        component.crudHelperService.showNotification("Application profile: Updated", result.key.toString());
                    });
                    component.returnToAppProfileDetails();
                }, function errorCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("Application profile: Update failed", result);
                });
        }
    }
}