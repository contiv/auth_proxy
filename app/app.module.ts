/**
 * Created by vjain3 on 10/6/16.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { NetworkPoliciesModule } from "./network_policies/networkpolicies.module";
import { ApplicationGroupsModule } from "./applicationgroups/applicationgroups.module.ts";
import { SettingsModule } from "./settings/settings.module";
import { NetprofilesModel } from "./components/models/netprofilesmodel";
import { ApplicationGroupsModel } from "./components/models/applicationgroupsmodel";
import { NetworksModel } from "./components/models/networksmodel";
import { OrganizationsModel } from "./components/models/organizationsmodel";
import { PoliciesModel } from "./components/models/policiesmodel";
import { RulesModel } from "./components/models/rulesmodel";
import { ServicelbsModel } from "./components/models/servicelbsmodel";
import { CRUDHelperService } from "./components/utils/crudhelperservice";
import { InspectService } from "./components/utils/inspectservice";
import { NetworkService } from "./components/utils/networkservice";
import { DashboardComponent } from "./dashboard/dashboardctrl";
import { NetworkModule } from "./networks/network.module";
import { ServicelbModule } from "./service_lbs/servicelb.module";
import { OrganizationModule } from "./organizations/organization.module";
import { NodesService } from "./components/utils/nodesservice";
import {LoginComponent} from "./login/loginctrl";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        NetworkPoliciesModule,
        ApplicationGroupsModule,
        SettingsModule,
        NetworkModule,
        ServicelbModule,
        OrganizationModule
    ],
    declarations: [
        DashboardComponent,
        LoginComponent
    ],
    providers: [
        ApplicationGroupsModel,
        NetprofilesModel,
        NetworksModel,
        OrganizationsModel,
        PoliciesModel,
        RulesModel,
        ServicelbsModel,
        CRUDHelperService,
        InspectService,
        NetworkService,
        NodesService
    ]
})
export class AppModule {}
