import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { OrganizationsModel } from "../../components/models/organizationsmodel";

@Component({
    selector: 'organizationdetails',
    templateUrl: './organizationdetails.html'
})


export class OrganizationDetailsComponent implements OnInit{
    public showLoader: boolean;
    public organizationDetailsCtrl: any;
    public organization: any;
    public showServerError: boolean;
    public serverErrorMessage: string;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private crudHelperService: CRUDHelperService,
                private organizationsModel: OrganizationsModel,
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
        this.organizationsModel.getModelByKey(this.activatedRoute.snapshot.params['key'], false, 'key')
            .then((result) => {
                organizationDetailsCtrl.organization = result;
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
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }

    close() { this.returnToOrganization() }

    deleteOrganization(){
        var organizationDetailsCtrl = this;
        this.showLoader = true;
        this.organizationsModel.delete(this.organization)
            .then((result) => {
                organizationDetailsCtrl.showLoader = false;
                organizationDetailsCtrl.crudHelperService.showNotification("Tenant: Deleted", result);
                organizationDetailsCtrl.returnToOrganization();
            }, (error) => {
                organizationDetailsCtrl.showLoader = false;
                organizationDetailsCtrl.crudHelperService.showServerError("Tenant: Delete failed", error);
            });
    }
}
