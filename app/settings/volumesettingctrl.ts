import { Component } from '@angular/core';
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { VolumeSettingService } from "../components/utils/volumesettingservice";

@Component({
    selector: 'volumesetting',
    templateUrl: 'settings/volumesettings.html'
})
export class VolumeSettingsComponent {

    setting:any = {};

    constructor(private crudHelperService:CRUDHelperService,
                private volumeSettingService:VolumeSettingService) {
        var volumeSettingCtrl = this;

        function getVolumeSettings() {
            volumeSettingCtrl.volumeSettingService.getSettings().then(function successCallback(result) {
                volumeSettingCtrl.setting = result;
            }, function errorCallback(result) {
            });
        }

        getVolumeSettings();

        volumeSettingCtrl.crudHelperService.stopLoader(volumeSettingCtrl);
        volumeSettingCtrl.crudHelperService.hideServerError(volumeSettingCtrl);
    }

    updateVolumeSettings(validform:boolean) {
        var volumeSettingCtrl = this;
        if (validform) {
            volumeSettingCtrl.crudHelperService.hideServerError(volumeSettingCtrl);
            volumeSettingCtrl.crudHelperService.startLoader(volumeSettingCtrl);
            volumeSettingCtrl.volumeSettingService.updateSettings(volumeSettingCtrl.setting).then(function successCallback(result) {
                volumeSettingCtrl.crudHelperService.stopLoader(volumeSettingCtrl);

            }, function errorCallback(result) {
                volumeSettingCtrl.crudHelperService.stopLoader(volumeSettingCtrl);
                volumeSettingCtrl.crudHelperService.showServerError(volumeSettingCtrl, result);
            });
        }
    }

}