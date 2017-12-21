/**
 * Created by cshampur on 11/6/16.
 */


import {Component, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import { ContivGlobals } from "../components/models/contivglobals";
declare var jQuery:any;
@Component({
    selector: 'logout',
    templateUrl: './logout.html',
    styleUrls: ['./logout.css']
})

export class LogoutComponent implements OnInit, OnDestroy{
    public product_name:string = ContivGlobals.PRODUCT_NAME;
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute){

    }

    ngOnInit(){
        jQuery("body").addClass("logoutbackground");
    }

    ngOnDestroy(){
        jQuery("body").removeClass("logoutbackground");
    }

    login(){
        this.router.navigate(['/login'],{relativeTo:this.activatedRoute});
    }
}