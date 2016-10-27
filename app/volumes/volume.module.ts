/**
 * Created by cshampur on 10/18/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { DirectivesModule } from "../components/directives/directives.module";
import {VolumeListComponent} from "./volumelistctrl";
import {VolumeService} from "./volumeservice";
import {VolumeDetailsComponent} from "./volumedetailsctrl";

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        DirectivesModule
    ],
    declarations: [
        VolumeListComponent,
        VolumeDetailsComponent,
    ],
    exports: [
        VolumeListComponent,
        VolumeDetailsComponent,
    ],
    providers: [VolumeService]
})
export class VolumeModule {}
