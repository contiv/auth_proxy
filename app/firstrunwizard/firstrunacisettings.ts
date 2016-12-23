/**
 * Created by cshampur on 10/30/16.
 */
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FirstRunWizardService } from "./firstrunwizardservice";

@Component({
    selector: 'firstrunacisettings',
    templateUrl: './firstrunacisettings.html'
})
export class FirstrunACISettingsComponent implements OnInit {
    private wizardService:FirstRunWizardService;
    public setting:any;
    @Output('updatePage') updatePage:EventEmitter<any>;
    @Output('cancelPage') cancelPage:EventEmitter<any>;

    constructor(wizardService:FirstRunWizardService) {
        this.wizardService = wizardService;
        this.setting = this.wizardService.aciSetting;
        this.updatePage = new EventEmitter<any>();
        this.cancelPage = new EventEmitter<any>();
    }

    ngOnInit() {
        this.setting = this.wizardService.aciSetting;
    }

    updateAciSettings(setting:any) {
        this.wizardService.aciSetting = setting;
        this.updatePage.emit(2);
    }

    goBack() {
        this.updatePage.emit(0);
    }

    skip() {
        this.updatePage.emit(2);
    }

    cancel() {
        this.cancelPage.emit();
    }
}