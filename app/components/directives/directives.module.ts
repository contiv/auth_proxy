/**
 * Created by vjain3 on 10/17/16.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "./errormessagedirective";
import { CtvTableComponent, CtvThComponent, CtvSearchComponent, CtvTpaginationComponent} from "./tabledirective";
import { FormsModule } from "@angular/forms";
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
@NgModule({
    imports: [
        CommonModule, FormsModule, ChartsModule
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
        NetworkCreateformComponent
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
        NetworkCreateformComponent
    ]
})
export class DirectivesModule {}