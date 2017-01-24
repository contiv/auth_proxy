/**
 * Created by vjain3 on 5/19/16.
 */
import {Component, Inject, ViewEncapsulation, OnInit, OnChanges, DoCheck, AfterViewInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../components/utils/authservice";
import { ContivGlobals } from "../components/models/contivglobals";
import { ChartService } from "../components/utils/chartservice";
import { ProfileDisplayType } from "../components/directives/settings/userprofileedit";
import { NetworksModel } from "../components/models/networksmodel";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { AppProfilesModel } from "../components/models/appprofilesmodel";
import { AuthorizationModel } from "../components/models/authorizationmodel";
import { BgpsModel } from "../components/models/bgpsmodel";
import { ContractGroupsModel } from "../components/models/contractgroupsmodel";
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { OrganizationsModel } from "../components/models/organizationsmodel";
import { PoliciesModel } from "../components/models/policiesmodel";
import { RulesModel } from "../components/models/rulesmodel";
import { ServicelbsModel } from "../components/models/servicelbsmodel";
import { UsersModel } from "../components/models/usersmodel";
declare var jQuery:any;

@Component({
    selector: 'menu',
    templateUrl: './menu.html',
    styleUrls: ['./menu.css']
})

export class MenuComponent implements AfterViewInit{
    public username: string;
    public product_name:string = ContivGlobals.PRODUCT_NAME;
    public firstRun: boolean;
    public ProfileDisplayType = ProfileDisplayType;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthService,
                private chartService: ChartService,
                private networksModel: NetworksModel,
                private applicationgroupsModel: ApplicationGroupsModel,
                private appprofilesModel: AppProfilesModel,
                private authorizationModel: AuthorizationModel,
                private bgpsModel: BgpsModel,
                private contractgroupsModel: ContractGroupsModel,
                private netprofilesModel: NetprofilesModel,
                private organizationsmodel: OrganizationsModel,
                private policiesModel: PoliciesModel,
                private rulesModel: RulesModel,
                private servicelbsModel: ServicelbsModel,
                private usersModel: UsersModel) {
        this.username = authService.authTokenPayload['username'];
        this.firstRun = this.authService.firstRun;
    }

    ngAfterViewInit(){
        jQuery('.ui.dropdown').dropdown({action: 'hide', duration: 100});
    }

    logout() {
        var component = this;
        component['timerId'] =  window.setInterval(() => {
           if(jQuery('.ui.dropdown').dropdown('is hidden')){
               clearInterval(component['timerId']);
               component.authService.logout();
               component.chartService.cleanBuffer();
               component.networksModel.clearModel();
               component.applicationgroupsModel.clearModel();
               component.appprofilesModel.clearModel();
               component.authorizationModel.clearModel();
               component.bgpsModel.clearModel();
               component.contractgroupsModel.clearModel();
               component.netprofilesModel.clearModel();
               component.organizationsmodel.clearModel();
               component.policiesModel.clearModel();
               component.rulesModel.clearModel();
               component.servicelbsModel.clearModel();
               component.usersModel.clearModel();
               component.router.navigate(['/logout'],{relativeTo: this.activatedRoute});
           }
        },10)
    }

    closeProfile(){
        jQuery('#user-profile-modal').modal('hide');
    }
}