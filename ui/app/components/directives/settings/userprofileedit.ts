/**
 * Created by cshampur on 1/19/17.
 */
import { Component, Inject, NgZone, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "../../../settings/users/usercreate.component";
import { UsersModel } from "../../models/usersmodel";
import { CRUDHelperService } from "../../utils/crudhelperservice";
import { ContivGlobals } from "../../models/contivglobals";

export enum ProfileDisplayType{
    modal,
    component
}

@Component({
    selector: 'userprofileedit',
    templateUrl: './userprofileedit.html'
})
export class UserProfileEditComponent implements OnInit {
    public ProfileDisplayType = ProfileDisplayType;
    user:User = {username: '', password: '', first_name: '', last_name: '', disable: false};
    public showLoader: boolean = true;
    @Input('username') username: string = '';
    @Input('displayType') displayType: ProfileDisplayType = ProfileDisplayType.component;
    @Output('close') close: EventEmitter<any>;

    constructor(private ngZone: NgZone,
                private usersModel:UsersModel,
                private crudHelperService:CRUDHelperService) {

        var component = this;
        this.user = {username: '', first_name: '', last_name: '', disable: false};
        this.close = new EventEmitter<any>();
    }

    ngOnInit(){
        var component = this;
        var url = ContivGlobals.USERS_ENDPOINT + this.username + '/';
        this.usersModel.getModelByKey(this.username, false, 'username', url)
            .then((user) => {
                component.user = user;
                component.crudHelperService.stopLoader(component);
            }, (error) => {
                component.crudHelperService.stopLoader(component);
            });
    }

    closeEdit(){
        this.close.emit();
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
                    component.closeEdit();
                }, function errorCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("User: Update failed", result);
                });
        }
    }
}
