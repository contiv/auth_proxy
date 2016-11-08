/**
 * Created by vjain3 on 10/6/16.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from "@angular/http";
import { APP_BASE_HREF, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DashboardModule } from "./dashboard/dashboard.module";
import { NetworkPoliciesModule } from "./network_policies/networkpolicies.module";
import { ApplicationGroupsModule } from "./applicationgroups/applicationgroups.module.ts";
import { SettingsModule } from "./settings/settings.module";
import { NetworkModule } from "./networks/network.module";
import { ServicelbModule } from "./service_lbs/servicelb.module";
import { OrganizationModule } from "./organizations/organization.module";
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
import { NodesService } from "./components/utils/nodesservice";
import { MenuModule } from "./menu/menu.module";
import { AppComponent } from "./app.component";
import appRoutes from "./app.routes.ts";
import {LoginModule} from "./login/login.module";
import {AuthService} from "./components/utils/authservice";
import {AuthGuard} from "./components/utils/authguard";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        appRoutes,
        MenuModule,
        DashboardModule,
        NetworkPoliciesModule,
        ApplicationGroupsModule,
        SettingsModule,
        NetworkModule,
        ServicelbModule,
        OrganizationModule,
        LoginModule
    ],
    declarations: [
        AppComponent
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
        NodesService,
        AuthService,
        AuthGuard,
        { provide: APP_BASE_HREF, useValue: '' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule {}
