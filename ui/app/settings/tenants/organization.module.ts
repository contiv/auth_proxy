import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {DirectivesModule} from "../../components/directives/directives.module";
import {OrganizationListComponent} from "./organizationlistctrl";
import {OrganizationCreateComponent} from "./organizationcreatectrl";
import {OrganizationDetailsComponent} from "./organizationdetailsctrl";
/**
 * Created by cshampur on 10/18/16.
 */


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule,
        DirectivesModule
    ],
    declarations: [
        OrganizationListComponent,
        OrganizationCreateComponent,
        OrganizationDetailsComponent
    ],
    exports: [
        OrganizationListComponent,
        OrganizationCreateComponent,
        OrganizationDetailsComponent,
        DirectivesModule,
        FormsModule,
        CommonModule,
        RouterModule
    ]
})
export class OrganizationModule {}
