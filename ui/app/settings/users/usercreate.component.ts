import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { UsersModel } from "../../components/models/usersmodel";
import { OrganizationsModel } from "../../components/models/organizationsmodel";
import {ContivGlobals} from "../../components/models/contivglobals";

export interface User{
    username: string;
    password?: string;
    first_name: string;
    last_name: string;
    disable: false;
}

@Component({
    selector: 'usercreate',
    templateUrl: './usercreate.html'
})

export class UserCreateComponent{
    public newUser: User = {username: '', password: '', first_name: '', last_name: '', disable: false};
    public username_regex = ContivGlobals.USERNAME_REGEX;
    public organizations:any[] = [];

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private crudHelperService: CRUDHelperService,
                private usersModel: UsersModel,
                private ngZone: NgZone){
        var component = this;

        function resetForm() {
            crudHelperService.stopLoader(component);
            component.newUser = {
                username: '',
                password: '',
                first_name: '',
                last_name: '',
                disable: false
            }
        }

        resetForm();
    }

    returnToUsers(){
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }

    cancelCreating(){
        this.returnToUsers();
    }

    createUser(formvalid: boolean){
        var component = this;
        if(formvalid){
            this.crudHelperService.startLoader(this);
            this.usersModel.create(component.newUser,ContivGlobals.USERS_ENDPOINT, 'username')
                .then((result) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showNotification("User: Created",result.username);
                    component.returnToUsers();
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("User: Create failed",error);
                });
        }
    }

}
