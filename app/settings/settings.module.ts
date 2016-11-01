/**
 * Created by vjain3 on 10/25/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import { NetworkSettingsComponent } from "./networksettingctrl";
import { VolumeSettingsComponent } from "./volumesettingctrl";
import {ClusterSettingsComponent} from "./clustersettingctrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        NetworkSettingsComponent,
        VolumeSettingsComponent,
        ClusterSettingsComponent
    ],
    exports: [
        NetworkSettingsComponent,
        VolumeSettingsComponent,
        ClusterSettingsComponent,
        FormsModule,
        CommonModule,
        DirectivesModule,
    ]
})
export class SettingsModule {
}