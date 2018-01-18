/**
 * Created by vjain3 on 10/21/16.
 */
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { FilterPipe } from "./filterpipe";


@NgModule({
    imports: [
        FormsModule,
        CommonModule
    ],
    declarations: [
        FilterPipe
    ],
    exports: [
        FilterPipe,
        FormsModule,
        CommonModule
    ]
})
export class PipesModule {}
3