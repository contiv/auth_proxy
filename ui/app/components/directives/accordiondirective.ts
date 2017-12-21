/**
 * Created by cshampur on 7/1/16.
 */
import {Component, Input, ElementRef, OnInit} from "@angular/core";
declare var jQuery:any;

interface Items {
    name: string;
    value: string;
    format: string;
    type: string;
}

@Component({
    selector: 'ctv-accordion',
    templateUrl: './accordion.html'
})
export class CtvAccordionComponent implements OnInit{
    @Input('items') items:Items[];

    constructor(elem: ElementRef){
    }
    ngOnInit(){
        jQuery(".ui.accordion").accordion();
    }
}