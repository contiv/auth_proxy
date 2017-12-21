        /**
 * Created by cshampur on 10/30/16.
 */
import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { FirstRunWizardService } from "./firstrunwizardservice";
declare var jQuery:any;

@Component({
    selector: 'firstrunacisettings',
    templateUrl: './firstrunacisettings.html'
})
export class FirstrunACISettingsComponent implements OnInit {
    private wizardService:FirstRunWizardService;
    public setting:any;
    public disabled: boolean = false;
    @Output('updatePage') updatePage:EventEmitter<any>;
    @Output('cancelPage') cancelPage:EventEmitter<any>;

    constructor(wizardService:FirstRunWizardService) {
        this.wizardService = wizardService;
        this.setting = this.wizardService.aciSetting;
        this.updatePage = new EventEmitter<any>();
        this.cancelPage = new EventEmitter<any>();
        if(this.wizardService.setting.networkInfraType !== 'aci')
            this.disabled = true;
    }

    ngOnInit() {
        this.setting = this.wizardService.aciSetting;
    }

    updateAciSettings(setting:any) {
        this.wizardService.skipArray[1] = false;
        this.wizardService.aciSetting = setting;
        this.updatePage.emit(2);
    }

    goBack() {
        this.updatePage.emit(0);
    }

    skip() {
        this.wizardService.skipArray[1] = true;
        Object.assign(this.wizardService.aciSetting, this.wizardService.defaults['aciSetting']);
        this.updatePage.emit(2);

    }

    cancel() {
        this.cancelPage.emit();
    }
}