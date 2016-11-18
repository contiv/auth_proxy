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
import {FirstrunWizardpage1Component} from "./firstrunwizardpage1ctrl";
import {FirstrunNetworkDefaultComponent} from "./firstrunnetworkdefaults";
import {FirstrunACISettingsComponent} from "./firstrunacisettings";
import {FirstrunConfirmComponent} from "./firstrunwizardconfirmpage";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule,
        RouterModule
    ],
    declarations: [
        FirstrunWizardComponent,
        FirstrunWizardpage1Component,
        FirstrunNetworkDefaultComponent,
        FirstrunACISettingsComponent,
        FirstrunConfirmComponent
    ],
    exports: [
        FirstrunWizardComponent,
        FirstrunWizardpage1Component,
        FirstrunNetworkDefaultComponent,
        FirstrunACISettingsComponent,
        FirstrunConfirmComponent
    ],
    providers: [FirstRunWizardService]
})
export class FirstrunWizardModule {}
