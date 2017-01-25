/**
 * Created by cshampur on 10/30/16.
 */


import {Component, OnInit, Output, EventEmitter, Inject} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FirstRunWizardService} from "./firstrunwizardservice";
import {AuthService} from "../components/utils/authservice";
declare var jQuery:any;

@Component({
    selector: 'firstrunwizardconfirmpage',
    templateUrl: './firstrunwizardconfirmpage.html'
})

export class FirstrunConfirmComponent implements OnInit{
    private wizardService: FirstRunWizardService;
    public showLoader: boolean
    @Output('updatePage') updatePage: EventEmitter<any>;
    @Output('cancelPage') cancelPage: EventEmitter<any>;
    constructor(wizardservice: FirstRunWizardService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService){
        this.wizardService = wizardservice;
        this.updatePage = new EventEmitter<any>();
        this.cancelPage = new EventEmitter<any>();
        this.showLoader = false;
    }

    ngOnInit(){
    }

    process(){
        this.updatePage.emit(3);
        // Will be calling the update settings funciton of wizard service,
        // A loader will be shown un til all the updates are completed.
        this.showLoader = true;


        this.wizardService.updateSettings()
            .then((result) => {
                this.loadDashboard();
            }, (error) => {
                this.loadDashboard();
            });
        
        this.loadDashboard();
    }

    loadDashboard(){
        this.showLoader = false;
        jQuery(".ui.fullscreen.modal").modal('hide');
        this.authService.setFirstRun('completed');
        this.router.navigate(['/m/dashboard']);
    }

    goBack(){
        this.updatePage.emit(1);
    }

    cancel(){
        this.cancelPage.emit();
    }
}