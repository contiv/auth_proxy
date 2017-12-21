/**
 * Created by cshampur on 10/18/16.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import {ServicelbListComponent} from "./servicelblistctrl";
import {ServicelbStatComponent} from "./servicelbstatsctrl";
import {ServicelbPortsComponent} from "./servicelbportsdirective";
import {ServicelbCreateComponent} from "./servicelbcreatectrl";
import {ServicelbInfoComponent} from "./servicelbinfoctrl";
import {ServicelbDetailsComponent} from "./servicelbdetailsctrl";
import {RouterModule} from "@angular/router";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule,
        RouterModule
    ],
    declarations: [
        ServicelbListComponent,
        ServicelbStatComponent,
        ServicelbPortsComponent,
        ServicelbCreateComponent,
        ServicelbInfoComponent,
        ServicelbDetailsComponent
    ],
    exports: [
        ServicelbListComponent,
        ServicelbStatComponent,
        ServicelbPortsComponent,
        ServicelbCreateComponent,
        ServicelbInfoComponent,
        ServicelbDetailsComponent
    ]
})

export class ServicelbModule {}
