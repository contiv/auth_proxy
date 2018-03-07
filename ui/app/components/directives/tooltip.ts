/**
 * Created by cshampur on 1/13/17.
 */


import {Component, Input, OnInit} from "@angular/core";
@Component({
    selector: "tooltip",
    templateUrl: './tooltip.html',
    styleUrls: ['./tooltip.css']
})

export class TooltipComponent implements OnInit{
    @Input('width') width: number = 400;
    public padding: number = 20;
    ngOnInit(){
        if (this.width <= 200)
            this.padding = 10;
    }
}