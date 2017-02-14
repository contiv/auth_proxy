/**
 * Created by cshampur on 10/30/16.
 */


import {Component, OnInit, EventEmitter, Output, DoCheck} from "@angular/core";
import {FirstRunWizardService} from "./firstrunwizardservice";
@Component({
    selector: 'firstrunnetworkdefault',
    templateUrl: './firstrunnetworkdefault.html'
})

export class FirstrunNetworkDefaultComponent implements DoCheck{
    private wizardService: FirstRunWizardService;
    public setting: any;
    @Output('updatePage') updatePage: EventEmitter<any>;
    @Output('cancelPage') cancelPage: EventEmitter<any>;
    public showLoader: boolean;

    constructor(wizardService: FirstRunWizardService){
        this.wizardService = wizardService;
        this.setting = this.wizardService.setting;
        this.updatePage = new EventEmitter<any>();
        this.cancelPage = new EventEmitter<any>();
        this.showLoader = this.wizardService.showLoader;
    }

    ngDoCheck(){
        this.showLoader = this.wizardService.showLoader;
        this.setting = this.wizardService.setting;
    }

    updateNetworkSettings(setting: any){
        this.wizardService.skipArray[0] = false;
        this.wizardService.setting = setting;
        this.updatePage.emit(1);
    }

    cancel(){
        this.cancelPage.emit();
    }

    skip(){
        Object.assign(this.wizardService.setting, this.wizardService.defaults['setting']);
        this.wizardService.skipArray[0] = true;
        this.updatePage.emit(1);
    }

}