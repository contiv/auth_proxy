import {Component, Inject, OnInit, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {OrganizationsModel} from "../components/models/organizationsmodel";
import {StateService} from "angular-ui-router";
@Component({
    selector: 'organizationdetails',
    templateUrl: 'organizations/organizationdetails.html'
})


export class OrganizationDetailComponent implements OnInit{
    public showLoader: boolean;
    public organizationDetailsCtrl: any;
    public organization: any;
    public showServerError: boolean;
    public serverErrorMessage: string;

    constructor(private crudHelperService: CRUDHelperService,
                private organizationsModel: OrganizationsModel,
                @Inject('$state') private $state: StateService,
                private ngZone: NgZone){
        this.showServerError = false;
        this.serverErrorMessage = '';
        this.showLoader = false;
        this.organization = {tenantName: ''};
        this.organizationDetailsCtrl = this;

    }

    ngOnInit(){
        this.showLoader = true;
        var organizationDetailsCtrl = this;
        this.organizationsModel.getModelByKey(this.$state.params['key'], false, 'key')
            .then((result) => {
                organizationDetailsCtrl.organization = result
                organizationDetailsCtrl.ngZone.run(() => {
                    organizationDetailsCtrl.showLoader = false;
                });
            }, (error) => {
                organizationDetailsCtrl.ngZone.run(() => {
                    organizationDetailsCtrl.showLoader = false;
                });
            });
    }

    returnToOrganization(){
        this.$state.go('contiv.menu.organizations.list');
    }

    deleteOrganization(){
        var organizationDetailsCtrl = this
        this.crudHelperService.hideServerError(this);
        this.showLoader = true;
        this.organizationsModel.delete(this.organization)
            .then((result) => {
                organizationDetailsCtrl.showLoader = false;
                organizationDetailsCtrl.returnToOrganization();
            }, (error) => {
                organizationDetailsCtrl.showLoader = false;
                organizationDetailsCtrl.crudHelperService.showServerError(organizationDetailsCtrl, error);
            });
    }
}