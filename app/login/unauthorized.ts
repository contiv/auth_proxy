/**
 * Created by cshampur on 11/6/16.
 */


import {Component, OnInit, OnDestroy} from "@angular/core";
declare var jQuery:any;
@Component({
    selector: 'unauthorized',
    templateUrl: './unauthorized.html'

})

export class UnauthorizedComponent implements OnInit, OnDestroy{
    ngOnInit(){
        jQuery("body").addClass("logoutbackground");
    }

    ngOnDestroy(){
        jQuery("body").removeClass("logoutbackground");
    }
}