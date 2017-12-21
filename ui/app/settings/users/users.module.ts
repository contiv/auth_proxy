/**
 * Created by cshampur on 10/18/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { DirectivesModule } from "../../components/directives/directives.module";
import { UserListComponent } from "./userlist.component";
import { UserCreateComponent } from "./usercreate.component";
import { UserDetailsComponent } from "./userdetails.component";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        UserListComponent,
        UserCreateComponent,
        UserDetailsComponent
    ],
    exports: [
        UserListComponent,
        UserCreateComponent,
        UserDetailsComponent,
        DirectivesModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})

export class UsersModule {}
