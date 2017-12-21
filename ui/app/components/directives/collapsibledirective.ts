/**
 * Created by vjain3 on 6/2/16.
 */

import {Component, Input} from "@angular/core";

@Component({
    selector:'ctv-collapsible',
    templateUrl: './collapsible.html'
})

export class CtvCollapsibleComponent{
    @Input('title') title: string;
    @Input('collapsed') collapsed: boolean;

    constructor() {
        this.title='';
        this.collapsed=true;
    }
}