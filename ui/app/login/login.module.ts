/**
 * Created by cshampur on 11/3/16.
 */

import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { LoginComponent } from "./loginctrl";
import { UnauthorizedComponent } from "./unauthorized";
import { LogoutComponent } from "./logoutctrl";
import { DirectivesModule } from "../components/directives/directives.module";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        LoginComponent,
        LogoutComponent,
        UnauthorizedComponent
    ],
    exports: [
        LoginComponent,
        LogoutComponent,
        UnauthorizedComponent,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class LoginModule {}