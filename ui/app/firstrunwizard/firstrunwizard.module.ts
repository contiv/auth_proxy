/**
 * Created by cshampur on 10/29/16.
 */

/**
 * Created by cshampur on 10/18/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import {RouterModule} from "@angular/router";
import {FirstRunWizardService} from "./firstrunwizardservice";
import {FirstrunWizardComponent} from "./firstrunwizardctrl";
import {FirstrunNetworkDefaultComponent} from "./firstrunnetworkdefaults";
import {FirstrunACISettingsComponent} from "./firstrunacisettings";
import {FirstrunConfirmComponent} from "./firstrunwizardconfirmpage";
import {FirstrunNetworkCreateComponent} from "./firstrunnetworkcreate";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule,
        RouterModule
    ],
    declarations: [
        FirstrunWizardComponent,
        FirstrunNetworkDefaultComponent,
        FirstrunACISettingsComponent,
        FirstrunConfirmComponent,
        FirstrunNetworkCreateComponent
    ],
    exports: [
        FirstrunWizardComponent,
        FirstrunNetworkDefaultComponent,
        FirstrunACISettingsComponent,
        FirstrunConfirmComponent,
        FirstrunNetworkCreateComponent
    ],
    providers: [FirstRunWizardService]
})
export class FirstrunWizardModule {}
