/**
 * Created by vjain3 on 5/19/16.
 */
import {Component, Inject, ViewEncapsulation, OnInit, OnChanges, DoCheck} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import {AuthService} from "../components/utils/authservice";
declare var jQuery:any;

@Component({
    selector: 'menu',
    templateUrl: 'menu/menu.html'
})
export class MenuComponent implements DoCheck{
    username: string;
    public firstRun: boolean;
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private authService: AuthService) {
        this.username = authService.authTokenPayload['role'];
    }

    ngOnInit(){
        jQuery("body").removeClass("background");
        this.firstRun = this.authService.firstRun;
    }

    ngDoCheck(){
        this.firstRun = this.authService.firstRun;
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/logout'],{relativeTo: this.activatedRoute});
    }
}