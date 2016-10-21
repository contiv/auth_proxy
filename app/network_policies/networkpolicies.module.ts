/**
 * Created by vjain3 on 10/14/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import { IsolationPolicyCreateComponent } from "./isolationpolicycreatectrl";
import { IsolationPolicyDetailsComponent } from "./isolationpolicydetailsctrl";
import { BandwidthPolicyCreateComponent } from "./bandwidthpolicycreatectrl";
import { BandwidthPolicyDetailsComponent } from "./bandwidthpolicydetailsctrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        IsolationPolicyCreateComponent,
        IsolationPolicyDetailsComponent,
        BandwidthPolicyCreateComponent,
        BandwidthPolicyDetailsComponent
    ],
    exports: [
        IsolationPolicyCreateComponent,
        IsolationPolicyDetailsComponent,
        BandwidthPolicyCreateComponent,
        BandwidthPolicyDetailsComponent,
        FormsModule,
        CommonModule,
        DirectivesModule
    ]
})
export class NetworkPoliciesModule {}
