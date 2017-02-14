/**
 * Created by cshampur on 10/30/16.
 */


import {Component, OnInit, Output, EventEmitter, Inject, AfterViewInit} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {FirstRunWizardService} from "./firstrunwizardservice";
import {AuthService} from "../components/utils/authservice";
import {CRUDHelperService} from "../components/utils/crudhelperservice";

@Component({
    selector: 'firstrunwizardconfirmpage',
    templateUrl: './firstrunwizardconfirmpage.html'
})

export class FirstrunConfirmComponent {
    public showLoader: boolean
    public skipArray: Array<boolean>;
    @Output('updatePage') updatePage: EventEmitter<any>;
    @Output('cancelPage') cancelPage: EventEmitter<any>;
    constructor(private wizardService: FirstRunWizardService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authService: AuthService,
                private crudHelperService: CRUDHelperService){
        this.updatePage = new EventEmitter<any>();
        this.cancelPage = new EventEmitter<any>();
        this.showLoader = false;
        this.skipArray = Array.from(this.wizardService.skipArray);
    }

    process(){
        //this.updatePage.emit(4);
        // Will be calling the update settings funciton of wizard service,
        // A loader will be shown until all the updates are completed.
        var component = this;
        this.crudHelperService.startLoader(this);

        this.wizardService.updateSettings()
            .then((result) => {
                component.crudHelperService.stopLoader(component);
                this.loadDashboard();
            }, (error) => {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showServerError("Contiv setup failed", error);
            });

    }

    loadDashboard(){
        this.showLoader = false;
        this.authService.setFirstRun('completed');
        this.router.navigate(['/m/dashboard']);
    }

    goBack(){
        this.updatePage.emit(2);
    }

    cancel(){
        this.cancelPage.emit();
    }
}