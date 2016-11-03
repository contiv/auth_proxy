/**
 * Created by cshampur on 10/18/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import Order = jasmine.Order;
import {OrganizationListComponent} from "./organizationlistctrl";
import {OrganizationCreateComponent} from "./organizationcreatectrl";
import {OrganizationDetailComponent} from "./organizationdetailsctrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        OrganizationListComponent,
        OrganizationCreateComponent,
        OrganizationDetailComponent
    ],
    exports: [
        OrganizationListComponent,
        OrganizationCreateComponent,
        OrganizationDetailComponent
    ]
})
export class OrganizationModule {}
