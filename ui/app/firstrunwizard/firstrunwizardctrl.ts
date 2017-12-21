/**
 * Created by cshampur on 10/29/16.
 */

import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from "../components/utils/authservice";
import { FirstRunWizardService } from "./firstrunwizardservice";
declare var jQuery:any;

@Component({
    selector: 'firstrunwizard',
    templateUrl: './firstrunwizard.html',
    styleUrls: ['./firstrunwizard.css']
})

export class FirstrunWizardComponent implements OnInit{
    public pageNo: number;
    public welcomeActive: boolean;

    constructor(private wizardService: FirstRunWizardService,
            private activatedRoute: ActivatedRoute,
            private router: Router,
            private authService: AuthService){
        this.pageNo = 1;
        this.welcomeActive = true;
        wizardService.getNetworkSettings();
        wizardService.getAciSettings();
        wizardService.getGlobalInspect();
    }

    ngOnInit(){
    }

    public updatePage(pageno: number){
        this.pageNo = ++pageno;
    }

    logout() {
        this.authService.isLoggedIn = false;
    }

    skip() {
        this.router.navigate(['/m/dashboard'],{relativeTo: this.activatedRoute});
    }

    runwizard() {
        this.welcomeActive = false;
    }
}