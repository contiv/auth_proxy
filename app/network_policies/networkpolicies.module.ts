/**
 * Created by vjain3 on 10/14/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import { IsolationPolicyCreateComponent } from "./isolationpolicycreatectrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        IsolationPolicyCreateComponent
    ],
    exports: [
        IsolationPolicyCreateComponent,
        FormsModule,
        CommonModule,
        DirectivesModule
    ]
})
export class NetworkPoliciesModule {}
