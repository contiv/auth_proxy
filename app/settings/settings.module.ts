/**
 * Created by vjain3 on 10/25/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "../components/directives/directives.module";
import { NetworkSettingsComponent } from "./networksettingctrl";
import { SettingsMenuComponent } from "./settingsmenu.component";
import { NodeListComponent } from "./nodes/nodelist.component";
import { NodeCreateComponent } from "./nodes/nodecreate.component";
import { NodeDetailsComponent } from "./nodes/nodedetails.component";
import { NodeInfoComponent } from "./nodes/nodeinfo.component";
import { NodeStatsComponent } from "./nodes/nodestats.component";
import { LdapConfigComponent } from "./ldapconfiguration";

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
        NodeListComponent,
        NodeCreateComponent,
        NodeDetailsComponent,
        NodeInfoComponent,
        NodeStatsComponent,
        LdapConfigComponent
    ],
    exports: [
        SettingsMenuComponent,
        NetworkSettingsComponent,
        NodeListComponent,
        NodeCreateComponent,
        NodeDetailsComponent,
        NodeInfoComponent,
        NodeStatsComponent,
        LdapConfigComponent,
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ]
})
export class SettingsModule {
}