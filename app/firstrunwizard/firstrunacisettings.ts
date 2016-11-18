/**
 * Created by cshampur on 10/30/16.
 */


import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {FirstRunWizardService} from "./firstrunwizardservice";
@Component({
    selector: 'firstrunacisettings',
    templateUrl: 'firstrunwizard/firstrunacisettings.html'
})

export class FirstrunACISettingsComponent implements OnInit{
    private wizardService: FirstRunWizardService;
    public extra_vars: any;
    @Output('updatePage') updatePage: EventEmitter<any>;

    constructor(wizardService: FirstRunWizardService){
        this.wizardService = wizardService;
        this.extra_vars = this.wizardService.extra_vars;
        this.updatePage = new EventEmitter<any>()
    }
    ngOnInit(){
        this.extra_vars = this.wizardService.extra_vars;
    }

    updateAciSettings(extra_vars: any){
        this.wizardService.extra_vars = extra_vars;
        this.updatePage.emit(3);
    }

    goBack(){
        this.updatePage.emit(1);
    }
}