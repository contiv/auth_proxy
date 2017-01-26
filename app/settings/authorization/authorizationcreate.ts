/**
 * Created by cshampur on 12/13/16.
 */
import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { UsersModel } from "../../components/models/usersmodel";
import { OrganizationsModel } from "../../components/models/organizationsmodel";
import { AuthorizationModel } from "../../components/models/authorizationmodel";


export interface Authorization{
    AuthzUUID?: string
    PrincipalName: string;
    Local: boolean;
    Role: string;
    TenantName: string;
}

@Component({
    selector: 'authorizationcreate',
    templateUrl: './authorizationcreate.html'
})

export class AuthorizationCreateComponent implements OnInit{
    authorization: Authorization = { PrincipalName: '', Local: false , Role: '', TenantName: '' };
    tenants: any = [];
    users: any = [];
    usertype: string = ''
    showLoader: boolean = false;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private crudHelperService: CRUDHelperService,
                private authorizationModel: AuthorizationModel,
                private organizationsModel: OrganizationsModel,
                private usersModel: UsersModel){
        this.usertype = 'local'

    }

    ngOnInit(){
        this.getOrganization();
    }

    getOrganization(){
        var authCreateComp = this;
        this.crudHelperService.startLoader(this);
        this.organizationsModel.get(false)
            .then((result) => {
                authCreateComp.tenants = result;
                authCreateComp.getUsers();
            }, (error) => {
                authCreateComp.crudHelperService.stopLoader(authCreateComp);
            })
    }

    getUsers(){
        var authCreateComp = this;
        this.usersModel.get(false)
            .then((result) => {
                authCreateComp.users = result;
                authCreateComp.crudHelperService.stopLoader(authCreateComp)
            }, (error) => {
                authCreateComp.crudHelperService.stopLoader(authCreateComp)
        });
    }



    returnToAuthList(){
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }

    cancelCreating(){
        this.returnToAuthList();
    }

    changeAuthType() {
        if (this.usertype==='local') {
            this.authorization.Local = true
        } else {
            this.authorization.Local = false
        }
    }

    checkRole(){
        if(this.authorization.Role === 'admin')
            this.authorization.TenantName = '';
    }

    createAuthorization(formvalid: boolean){
        var authCreateComp = this;
        if(formvalid){
            this.crudHelperService.startLoader(this);
            this.changeAuthType();
            this.authorizationModel.create(this.authorization)
                .then((result) => {
                    authCreateComp.crudHelperService.stopLoader(authCreateComp);
                    authCreateComp.crudHelperService.showNotification("Authorization: Created",
                        result['PrincipalName'] + '::' + result['TenantName'] + '::' + result['Role']);
                    authCreateComp.returnToAuthList();
                }, (error) => {
                    authCreateComp.crudHelperService.stopLoader(authCreateComp);
                    authCreateComp.crudHelperService.showServerError("Authorization: Create failed", error);
                })
        }
    }

}
