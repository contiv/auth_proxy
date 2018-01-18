/**
 * Created by cshampur on 10/18/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import {NetworkListComponent} from "./networklistctrl";
import {NetworkStatComponent} from "./networkstatsctrl";
import {NetworkdetailsComponent} from "./networkdetailsctrl";
import {NetworkInfoComponent} from "./networkinfoctrl";
import {NetworkCreateComponent} from "./networkcreatectrl";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule,
        RouterModule
    ],
    declarations: [
        NetworkListComponent,
        NetworkStatComponent,
        NetworkInfoComponent,
        NetworkdetailsComponent,
        NetworkCreateComponent
    ],
    exports: [
        NetworkListComponent,
        NetworkStatComponent,
        NetworkInfoComponent,
        NetworkdetailsComponent,
        NetworkCreateComponent
    ]
})
export class NetworkModule {}
