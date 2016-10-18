/**
 * Created by vjain3 on 10/17/16.
 */
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ErrorMessageComponent } from "./errormessagedirective";
@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ErrorMessageComponent
    ],
    exports: [
        ErrorMessageComponent
    ]
})
export class DirectivesModule {}