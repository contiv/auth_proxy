/**
 * Created by vjain3 on 10/17/16.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "./errormessagedirective";
import { CtvTableComponent, CtvThComponent, CtvSearchComponent, CtvTpaginationComponent} from "./tabledirective";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CtvAccordionComponent } from "./accordiondirective";
import { CtvCollapsibleComponent } from "./collapsibledirective";
import { CtvNamevalueComponent } from "./namevaluedirective";
import { NetworkSettingComponent } from "./settings/networksettingcomponent";
import { AciSettingComponent } from "./settings/acisettingcomponent";
import { LineGraphComponent } from "./linegraphcomponent";
import { ChartsModule } from "ng2-charts";
import { NotificationComponent } from "./notification";
import { LdapSettingsComponent } from "./settings/ldapsettingcomponent";
import { TooltipComponent } from "./tooltip";
import { UserProfileEditComponent } from "./settings/userprofileedit";
import { VerifydomDirective } from "./verifydomdirective";
import { NetworkCreateformComponent } from "./settings/networkcreateform";
import {OrganizationModule} from "../../settings/tenants/organization.module";
import {TenantCreateComponent} from "./settings/tenantcreate";
@NgModule({
    imports: [
        CommonModule, FormsModule, ChartsModule, ReactiveFormsModule
    ],
    declarations: [
        ErrorMessageComponent,
        CtvTableComponent,
        CtvThComponent,
        CtvSearchComponent,
        CtvTpaginationComponent,
        CtvAccordionComponent,
        CtvCollapsibleComponent,
        CtvNamevalueComponent,
        VerifydomDirective,
        NetworkSettingComponent,
        AciSettingComponent,
        LineGraphComponent,
        NotificationComponent,
        LdapSettingsComponent,
        TooltipComponent,
        UserProfileEditComponent,
        NetworkCreateformComponent,
        TenantCreateComponent
    ],
    exports: [
        ErrorMessageComponent,
        CtvTableComponent,
        CtvThComponent,
        CtvSearchComponent,
        CtvTpaginationComponent,
        CtvAccordionComponent,
        CtvCollapsibleComponent,
        CtvNamevalueComponent,
        VerifydomDirective,
        NetworkSettingComponent,
        AciSettingComponent,
        LineGraphComponent,
        NotificationComponent,
        LdapSettingsComponent,
        TooltipComponent,
        UserProfileEditComponent,
        NetworkCreateformComponent,
        TenantCreateComponent
    ]
})
export class DirectivesModule {}