/**
 * Created by vjain3 on 11/1/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { MenuComponent } from "./menuCtrl";
import { DirectivesModule } from "../components/directives/directives.module";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        MenuComponent
    ],
    exports: [
        MenuComponent,
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ]
})
export class MenuModule {}