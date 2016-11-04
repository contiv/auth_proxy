/**
 * Created by cshampur on 11/3/16.
 */


import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {LoginComponent} from "./loginctrl";
@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule
    ],
    declarations: [
        LoginComponent
    ],
    exports: [
        LoginComponent,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class LoginModule {}