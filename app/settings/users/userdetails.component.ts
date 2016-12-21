import { Component, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersModel } from "../../components/models/usersmodel";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { OrganizationsModel } from "../../components/models/organizationsmodel";
import { User } from "./usercreate.component";
import { ContivGlobals } from "../../components/models/contivglobals";

@Component({
    selector: 'userdetails',
    templateUrl: 'settings/users/userdetails.html'
})
export class UserDetailsComponent {
    user:User = {username: '', password: '', first_name: '', last_name: '', disable: false};
    organizations:any[] = [];
    mode:string = 'details';
    public userDetailsCtrl:any = {}

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private usersModel:UsersModel,
                private crudHelperService:CRUDHelperService) {

        this.userDetailsCtrl = this;
        var component = this;
        this.user = {username: '', first_name: '', last_name: '', disable: false};

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

        component.usersModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'username')
            .then(function (user) {
                component.user = user;
            });

        setMode();
    }

    returnToUser() {
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }

    returnToUserDetails() {
        this.router.navigate(['../../details', this.user.username], { relativeTo: this.activatedRoute });
    }

    editUser() {
        this.router.navigate(['../../edit', this.user.username], { relativeTo: this.activatedRoute });
    }

    cancelEditing() {
        this.returnToUserDetails();
    }

    cancelDetails() {
        this.returnToUser();
    }

    deleteUser() {
        var component = this;
        component.crudHelperService.startLoader(component);
        var username = component.user['username'];
        var url = ContivGlobals.USERS_ENDPOINT + '/' + username
        component.usersModel.deleteUsingKey(username, 'username', url).then(
            function successCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showNotification("User: Deleted", result);
                component.returnToUser();
            }, function errorCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showServerError("User: Delete failed", result);
            });
    }

    saveUser(formvalid: boolean) {
        var component = this;
        if (formvalid) {
            component.crudHelperService.startLoader(component);

            component.usersModel.save(component.user).then(
                function successCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showNotification("User: Updated", result.username.toString());
                    component.returnToUserDetails();
                }, function errorCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("User: Update failed", result);
                });
        }
    }
}
