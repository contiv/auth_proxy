/**
 * Created by cshampur on 10/18/16.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import {ServicelbListComponent} from "./servicelblistctrl";
import {ServicelbStatComponent} from "./servicelbstatsctrl";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        ServicelbListComponent,
        ServicelbStatComponent
    ],
    exports: [
        ServicelbListComponent,
        ServicelbStatComponent
    ]
})

export class ServicelbModule {}
