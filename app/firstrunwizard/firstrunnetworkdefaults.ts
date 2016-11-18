/**
 * Created by cshampur on 10/30/16.
 */


import {Component, OnInit, EventEmitter, Output} from "@angular/core";
import {FirstRunWizardService} from "./firstrunwizardservice";
@Component({
    selector: 'firstrunnetworkdefault',
    templateUrl: 'firstrunwizard/firstrunnetworkdefault.html'
})

export class FirstrunNetworkDefaultComponent implements OnInit{
    private wizardService: FirstRunWizardService;
    public setting: any;
    @Output('updatePage') updatePage: EventEmitter<any>;

    constructor(wizardService: FirstRunWizardService){
        this.wizardService = wizardService;
        this.setting = this.wizardService.setting;
        this.updatePage = new EventEmitter<any>()
    }
    ngOnInit(){
        this.setting = this.wizardService.setting;
    }

    updateNetworkSettings(setting: any){
        this.wizardService.setting = setting;
        this.updatePage.emit(2);
    }

    goBack(){
        this.updatePage.emit(0);
    }
}