/**
 * Created by cshampur on 11/6/16.
 */


import {Component, OnInit} from "@angular/core";
declare var jQuery:any;
@Component({
    selector: 'unauthorized',
    templateUrl: 'login/unauthorized.html'

})

export class UnauthorizedComponent implements OnInit{
    ngOnInit(){
        jQuery("body").addClass("background");
    }
}