import {Component, Inject, OnInit, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {OrganizationsModel} from "../components/models/organizationsmodel";
import {StateService} from "angular-ui-router";
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
    constructor(private crudHelperService: CRUDHelperService,
                private organizationsModel: OrganizationsModel,
                @Inject('$state') private $state: StateService,
                private ngZone: NgZone){
        this.newOrganization = {key: '', tenantName: ''};
        this.showServerError = false;
        this.serverErrorMessage = '';
        this.showLoader = false;
        this.organizationCreateCtrl = this;
    }

    returnToOrganizations(){
        this.$state.go('contiv.menu.organizations.list');
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