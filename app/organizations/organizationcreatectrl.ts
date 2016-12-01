import {Component, Inject, OnInit, NgZone} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {OrganizationsModel} from "../components/models/organizationsmodel";

@Component({
    selector: 'organizationcreate',
    templateUrl: 'organizations/organizationcreate.html'
})

export class OrganizationCreateComponent{
    public organizationCreateCtrl: any;
    public newOrganization: any;
    public showLoader: boolean;
    public showServerError: boolean;
    public serverErrorMessage: string;
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private crudHelperService: CRUDHelperService,
                private organizationsModel: OrganizationsModel,
                private ngZone: NgZone){
        this.newOrganization = {key: '', tenantName: ''};
        this.showServerError = false;
        this.serverErrorMessage = '';
        this.showLoader = false;
        this.organizationCreateCtrl = this;
    }

    returnToOrganizations(){
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }

    cancelCreating(){
        this.returnToOrganizations();
    }

    createOrganization(formvalid: boolean){
        var organizationCreateCtrl = this;
        if(formvalid){
            this.crudHelperService.startLoader(this);
            this.crudHelperService.hideServerError(this);
            organizationCreateCtrl.newOrganization.key = organizationCreateCtrl.newOrganization.tenantName;
            this.organizationsModel.create(organizationCreateCtrl.newOrganization,undefined)
                .then((result) => {
                    organizationCreateCtrl.ngZone.run(() => {
                        organizationCreateCtrl.crudHelperService.stopLoader(organizationCreateCtrl);
                        organizationCreateCtrl.crudHelperService.showNotification("Organization Created", result.key);
                    });
                    organizationCreateCtrl.returnToOrganizations();
                }, (error) => {
                    organizationCreateCtrl.ngZone.run(() => {
                        organizationCreateCtrl.crudHelperService.stopLoader(organizationCreateCtrl);
                    });
                    organizationCreateCtrl.crudHelperService.showServerError(organizationCreateCtrl,error);
                });
        }
    }

}