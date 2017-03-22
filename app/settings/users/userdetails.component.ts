import { Component, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { UsersModel } from "../../components/models/usersmodel";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { OrganizationsModel } from "../../components/models/organizationsmodel";
import { User } from "./usercreate.component";
import { ContivGlobals } from "../../components/models/contivglobals";
import { AuthService } from "../../components/utils/authservice";
import { ProfileDisplayType } from "../../components/directives/settings/userprofileedit";

@Component({
    selector: 'userdetails',
    templateUrl: './userdetails.html'
})
export class UserDetailsComponent {
    user:User = {username: '', password: '', first_name: '', last_name: '', disable: false};
    organizations:any[] = [];
    mode:string = 'details';
    isRootAdmin: boolean = false;
    isLoggedInUser: boolean = false;
    public userDetailsCtrl:any = {}
    public username: string = ''
    public ProfileDisplayType = ProfileDisplayType;
    public showLoader: boolean = true;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private usersModel:UsersModel,
                private crudHelperService:CRUDHelperService,
                private authService:AuthService) {
        var component = this;
        this.user = {username: '', first_name: '', last_name: '', disable: false};

        component.username = activatedRoute.snapshot.params['key'];

        if(component.mode == 'details'){
            component.getUserDetails();
        }
    }

    getUserDetails(){
        var component = this;
        component.usersModel.getModelByKey(component.username, false, 'username')
            .then(function (user) {
                component.user = user;
                component.isRootAdmin = (user.username === 'admin');
                component.isLoggedInUser = (component.authService.username === user.username);
                component.crudHelperService.stopLoader(component);
            }, function(error){
                component.crudHelperService.stopLoader(component);
            });
    }

    returnToUser() {
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }

    returnToUserDetails() {
        this.getUserDetails();
        this.mode = 'details';
    }

    editUser() {
        this.mode = 'edit';
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
        var url = ContivGlobals.USERS_ENDPOINT + username + '/';
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
}
