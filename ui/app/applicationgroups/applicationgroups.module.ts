/**
 * Created by vjain3 on 10/21/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "../components/directives/directives.module";
import { PipesModule } from "../components/pipes/pipes.module";
import { ApplicationGroupCreateComponent } from "./applicationgroupcreatectrl";
import { ApplicationGroupDetailsComponent } from "./applicationgroupdetailsctrl";
import { IsolationPolicySelectionComponent } from "./isolationpolicydirective";
import { BandwidthPolicySelectionComponent } from "./bandwidthpolicydirective";
import { ContractGroupSelectionComponent } from "./contractgroup.component";
import { AppGrouplistComponent } from "./applicationgrouplistctrl";
import { ApplicationGroupStatsComponent } from "./applicationgroupstats";
import { ApplicationGroupInfoComponent } from "./applicationgroupinfoctrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [
        ApplicationGroupCreateComponent,
        ApplicationGroupDetailsComponent,
        IsolationPolicySelectionComponent,
        BandwidthPolicySelectionComponent,
        ContractGroupSelectionComponent,
        AppGrouplistComponent,
        ApplicationGroupStatsComponent,
        ApplicationGroupInfoComponent
    ],
    exports: [
        AppGrouplistComponent,
        ApplicationGroupCreateComponent,
        ApplicationGroupDetailsComponent,
        IsolationPolicySelectionComponent,
        BandwidthPolicySelectionComponent,
        ContractGroupSelectionComponent,
        ApplicationGroupStatsComponent,
        ApplicationGroupInfoComponent,
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule,
        PipesModule
    ]
})
export class ApplicationGroupsModule {}