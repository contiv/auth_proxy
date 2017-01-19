/**
 * Created by cshampur on 12/13/16.
 */


import {Component, OnInit} from "@angular/core";
import {AuthorizationModel} from "../../components/models/authorizationmodel";
import {CRUDHelperService} from "../../components/utils/crudhelperservice";
import {Router, ActivatedRoute} from "@angular/router";
import {OrganizationsModel} from "../../components/models/organizationsmodel";
import {Authorization} from "./authorizationcreate";
@Component({
    selector: 'authorizationdetails',
    templateUrl: './authorizationdetails.html'
})

export class AuthorizationDetailsComponent implements OnInit{
    authorization: Authorization = {AuthzUUID: '', PrincipalName: '', Local: false, Role: '', TenantName: ''};
    mode: string = 'details';
    showLoader: boolean = false;
    tenants: any = [];
    isRootAdmin: boolean = false;
    constructor(private authorizationModel: AuthorizationModel,
                private crudHelperService: CRUDHelperService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private organizationModel: OrganizationsModel){

        var authdetailsComp = this;

        function setMode(){
            if(activatedRoute.routeConfig.path.includes('edit')){
                authdetailsComp.mode = 'edit';
            }
            else{
                authdetailsComp.mode = 'details';
            }
        }

        setMode();
    }

    ngOnInit(){
        this.getAuthorizationDetail();
    }

    private getAuthorizationDetail(){
        var authdetailsComp = this;
        this.crudHelperService.startLoader(this);
        this.authorizationModel.getModelByKey(this.activatedRoute.snapshot.params['key'], false, 'AuthzUUID')
            .then((result) => {
                authdetailsComp.authorization = result;
                authdetailsComp.isRootAdmin = (result.PrincipalName === 'admin' && result.Role === 'admin');
                authdetailsComp.getOrganization();
            }, (error) => {
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
            });
    }

    getOrganization(){
        var authdetailsComp = this;
        this.organizationModel.get(false)
            .then((result) => {
                authdetailsComp.tenants = result;
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
            }, (error) => {
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
            });
    }

    returnToList(){
        this.router.navigate(['../../list'], {relativeTo: this.activatedRoute});
    }

    editAuthorization() {
        this.router.navigate(['../../edit', this.authorization.AuthzUUID], { relativeTo: this.activatedRoute });
    }

    returntoAuthDetails() {
        this.router.navigate(['../../details', this.authorization.AuthzUUID], { relativeTo: this.activatedRoute });
    }

    cancelEditing() {
        this.returntoAuthDetails();
    }

    saveAuthorization(){
        var authdetailsComp = this;
        authdetailsComp.crudHelperService.startLoader(authdetailsComp);
        this.authorizationModel.save(this.authorization)
            .then((result) => {
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
                authdetailsComp.crudHelperService.showNotification("Authorization: Updated", result['PrincipalName'] + '::' + result['TenantName'] + '::' + result['Role']);
                authdetailsComp.returntoAuthDetails();
            });
    }

    deleteAuthorization(){
        var authdetailsComp = this;
        authdetailsComp.crudHelperService.startLoader(authdetailsComp);
        this.authorizationModel.delete(authdetailsComp.authorization['AuthzUUID'])
            .then((result) => {
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
                authdetailsComp.crudHelperService.showNotification("Authorization: Deleted", result);
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
                authdetailsComp.returnToList();
            }, (error) => {
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
                authdetailsComp.crudHelperService.showServerError("Authorization: Delete failed", error);
                authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
                authdetailsComp.returnToList();
            });
    }
}