/**
 * Created by cshampur on 1/13/17.
 */


import {Component, Input} from "@angular/core";
@Component({
    selector: "tooltip",
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.css']
})

export class TooltipComponent {
    @Input('data') data: string = '';
}