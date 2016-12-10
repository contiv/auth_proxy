import { Component } from '@angular/core';
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { NetworkService } from "../components/utils/networkservice";
import { ContivGlobals } from "../components/models/contivglobals";

@Component({
    selector: 'networksetting',
    templateUrl: 'settings/networksettings.html'
})
export class NetworkSettingsComponent {
    setting: any;
    aciSetting: any;

    constructor(private crudHelperService:  CRUDHelperService,
                private networkService: NetworkService){
        this.setting = {};
        this.aciSetting = {};
        this['showLoader']=true;
        this['showServerError'] = false;
        this['serverErrorMessage'] = '';
        var networkSettingCtrl = this;

        function getNetworkSettings() {
            networkSettingCtrl.networkService.getSettings().then(function successCallback(result) {
                networkSettingCtrl.setting = result;
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);

            }, function errorCallback(result) {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            });
        }

        getNetworkSettings();

        networkService.getAciSettings()
            .then((result) => {
                networkSettingCtrl.aciSetting = result;
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            }, (error) => {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            });
    }

    updateNetworkSettings(settings:any) {
        var networkSettingCtrl = this;
        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
        networkSettingCtrl.networkService.updateSettings(settings).then(function successCallback(result) {
            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            networkSettingCtrl.crudHelperService.showNotification("Network settings: Updated", result.key.toString());
            }, function errorCallback(result) {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                networkSettingCtrl.crudHelperService.showServerError("Network settings: Update failed", result);
        });
    }

    updateAciSetting(settings:any){
        var networkSettingCtrl = this;
        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
        networkSettingCtrl.networkService.updateAciSettings(settings)
            .then((result) => {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                networkSettingCtrl.crudHelperService.showNotification("ACI settings: Updated", result.key.toString());
            }, (error) => {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                networkSettingCtrl.crudHelperService.showServerError("ACI settings: Update failed", error);
            })

    }
}