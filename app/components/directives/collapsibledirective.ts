/**
 * Created by vjain3 on 6/2/16.
 */
import { Component, Input } from "@angular/core";

@Component({
    selector: 'ctv-collapsible',
    templateUrl: 'components/directives/collapsible.html'
})
export class CollapsibleComponent{
    @Input('title') title: string;
    @Input('collapsed') collapsed: boolean;

    constructor(){
        this.title='';
        this.collapsed=true;
    }
}