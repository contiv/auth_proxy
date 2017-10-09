import {Component} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {DisplayType} from "../../components/directives/settings/tenantcreate";

@Component({
    selector: 'organizationcreate',
    templateUrl: './organizationcreate.html'
})

export class OrganizationCreateComponent{
    public showLoader: boolean;
    public showServerError: boolean;
    public serverErrorMessage: string;
    public DisplayType = DisplayType;
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router){
        this.showServerError = false;
        this.serverErrorMessage = '';
        this.showLoader = false;
    }

    returnToOrganizations(){
        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
    }

    cancelCreating(){
        this.returnToOrganizations();
    }

}