/**
 * Created by vjain3 on 10/25/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "../components/directives/directives.module";
import { NetworkSettingsComponent } from "./networksettingctrl";
import { ClusterSettingsComponent } from "./clustersettingctrl";
import {SettingsMenuComponent} from "./settingsmenu.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        SettingsMenuComponent,
        NetworkSettingsComponent,
        ClusterSettingsComponent
    ],
    exports: [
        SettingsMenuComponent,
        NetworkSettingsComponent,
        ClusterSettingsComponent,
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ]
})
export class SettingsModule {
}