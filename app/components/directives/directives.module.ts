/**
 * Created by vjain3 on 10/17/16.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "./errormessagedirective";
import { CollapsibleComponent } from "./collapsibledirective";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ErrorMessageComponent,
        CollapsibleComponent
    ],
    exports: [
        ErrorMessageComponent,
        CollapsibleComponent
    ]
})
export class DirectivesModule {}