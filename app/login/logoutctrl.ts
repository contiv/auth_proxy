/**
 * Created by cshampur on 11/6/16.
 */


import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
declare var jQuery:any;
@Component({
    selector: 'logout',
    templateUrl: 'login/logout.html',
    styleUrls: ['login/logout.css']
})

export class LogoutComponent implements OnInit{
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute){
    }

    ngOnInit(){
        jQuery("body").addClass("background");
    }

    login(){
        this.router.navigate(['/login'],{relativeTo:this.activatedRoute});
    }
}