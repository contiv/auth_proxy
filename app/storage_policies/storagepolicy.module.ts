/**
 * Created by cshampur on 10/18/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import {StoragepolicyListComponent} from "./storagepolicylistctrl";


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        StoragepolicyListComponent
    ],
    exports: [
        StoragepolicyListComponent
    ]
})
export class StoragepolicyModule {}
