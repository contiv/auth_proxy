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
    templateUrl: 'firstrunwizard/firstrunwizard.html',
    styleUrls: ['firstrunwizard/firstrunwizard.css']
})

export class FirstrunWizardComponent implements OnInit, OnDestroy{
    public pageNo: number;

    constructor(private wizardService: FirstRunWizardService,
            private activatedRoute: ActivatedRoute,
            private router: Router,
            private authService: AuthService){
        this.wizardService = wizardService;
        this.pageNo = 1;
        wizardService.getNetworkSettings();
        wizardService.getAciSettings();
    }

    ngOnInit(){
    }

    public updatePage(pageno: number){
        this.pageNo = ++pageno;
    }

    ngOnDestroy(){
        jQuery(".ui.fullscreen.modal").remove();
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/logout'],{relativeTo: this.activatedRoute});
    }

    skip() {
        localStorage.setItem('firstRun','skip')
        this.router.navigate(['/m/dashboard'],{relativeTo: this.activatedRoute});
    }

    runwizard() {
        this.router.navigate(['/m/firstrunwizard'],{relativeTo: this.activatedRoute});
    }
}