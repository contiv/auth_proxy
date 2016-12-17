/**
 * Created by cshampur on 12/13/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "../../components/directives/directives.module";
import { AuthorizationListComponent } from "./authorizationlist";
import { AuthorizationDetailsComponent } from "./authorizationdetails";
import { AuthorizationCreateComponent } from "./authorizationcreate";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        AuthorizationListComponent,
        AuthorizationDetailsComponent,
        AuthorizationCreateComponent
    ],
    exports: [
        AuthorizationListComponent,
        AuthorizationDetailsComponent,
        AuthorizationCreateComponent,
        DirectivesModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})

export class AuthorizationModule {}