/**
 * Created by cshampur on 10/29/16.
 */



import {Component, OnInit, OnDestroy} from "@angular/core";
import {FirstRunWizardService} from "./firstrunwizardservice";
declare var jQuery:any;

@Component({
    selector: 'firstrunwizard',
    templateUrl: 'firstrunwizard/firstrunwizard.html',
    styleUrls: ['firstrunwizard/firstrunwizard.css']
})

export class FirstrunWizardComponent implements OnInit, OnDestroy{
    private wizardService: FirstRunWizardService;
    public pageNo: number;
    constructor(wizardService: FirstRunWizardService){
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
}