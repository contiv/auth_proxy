import { Component, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersModel } from "../../components/models/usersmodel";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { OrganizationsModel } from "../../components/models/organizationsmodel";

@Component({
    selector: 'userdetails',
    templateUrl: 'settings/users/userdetails.html'
})
export class UserDetailsComponent {
    user:any = {};
    organizations:any[] = [];
    mode:string = 'details';

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private usersModel:UsersModel,
                private organizationsModel: OrganizationsModel,
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

        /**
         * Get organizations.
         */
        function getOrganizations() {
            organizationsModel.get(false).then(function (result) {
                component.organizations = result;
            });
        }

        component.crudHelperService.stopLoader(component);
        component.crudHelperService.hideServerError(component);

        component.usersModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
            .then(function (user) {
                component.user = user;
            });

        getOrganizations();
        setMode();
    }

    returnToUser() {
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }

    returnToUserDetails() {
        this.router.navigate(['../../details', this.user.key], { relativeTo: this.activatedRoute });
    }

    editUser() {
        this.router.navigate(['../../edit', this.user.key], { relativeTo: this.activatedRoute });
    }

    cancelEditing() {
        this.returnToUserDetails();
    }

    deleteUser() {
        var component = this;
        component.crudHelperService.hideServerError(component);
        component.crudHelperService.startLoader(component);
        component.usersModel.delete(component.user).then(
            function successCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.returnToUser();
            }, function errorCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showServerError(component, result);
            });
    }

    saveUser(formvalid: boolean) {
        var component = this;
        if (formvalid) {
            component.crudHelperService.hideServerError(component);
            component.crudHelperService.startLoader(component);

            component.usersModel.save(component.user).then(
                function successCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.returnToUserDetails();
                }, function errorCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError(component, result);
                });
        }
    }
}