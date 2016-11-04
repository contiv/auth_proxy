/**
 * Created by vjain3 on 11/3/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboardctrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class DashboardModule {}
