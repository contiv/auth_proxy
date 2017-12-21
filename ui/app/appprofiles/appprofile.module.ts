import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "../components/directives/directives.module";
import { AppProfileListComponent } from "./appprofilelist.component";
import { AppProfileCreateComponent } from "./appprofilecreate.component";
import { AppProfileDetailsComponent } from "./appprofiledetails.component";
import { ApplicationGroupSelectionComponent } from "./appgroupselection.component";
import { PipesModule } from "../components/pipes/pipes.module";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule,
        PipesModule
    ],
    declarations: [
        AppProfileListComponent,
        AppProfileCreateComponent,
        AppProfileDetailsComponent,
        ApplicationGroupSelectionComponent
    ],
    exports: [
        AppProfileListComponent,
        AppProfileCreateComponent,
        AppProfileDetailsComponent,
        ApplicationGroupSelectionComponent,
        DirectivesModule,
        PipesModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})

export class AppProfilesModule {}
