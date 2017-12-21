/**
 * Created by vjain3 on 4/28/16.
 */
import { Component, Input, OnChanges } from "@angular/core";

@Component({
    selector: 'ctv-error',
    templateUrl: './errormessage.html'
})
export class ErrorMessageComponent implements OnChanges {

    @Input() header: string;
    @Input() error: string;

    private showError: boolean;

    constructor() {
        this.showError = true;
    }

    ngOnChanges() {
        this.showError = true;
    }

    close() {
        this.showError = false;
    }
}