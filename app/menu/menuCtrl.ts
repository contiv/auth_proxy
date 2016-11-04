/**
 * Created by vjain3 on 5/19/16.
 */
import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
declare var jQuery:any;

@Component({
    selector: 'menu',
    templateUrl: 'menu/menu.html'
})
export class MenuComponent implements OnInit{
    username: string;
    constructor(activatedRoute: ActivatedRoute, private router: Router) {
        this.username = activatedRoute.snapshot.params['username'];
    }

    ngOnInit(){
        jQuery("body").removeClass("login");
    }

    logout() {
        this.router.navigate(['/login']);
    }
}