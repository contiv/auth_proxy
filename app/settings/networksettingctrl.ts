import { Component } from '@angular/core';
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { NetworkService } from "../components/utils/networkservice";
import {ContivGlobals} from "../components/models/contivglobals";


@Component({
    selector: 'networksetting',
    templateUrl: 'settings/networksettings.html'
})
export class NetworkSettingsComponent {
    setting:any = {};
    vlanPattern:string = ContivGlobals.VLAN_REGEX;
    vxlanPattern:string = ContivGlobals.VXLAN_REGEX;

    constructor(private crudHelperService:CRUDHelperService,
                private networkService:NetworkService) {
        var networkSettingCtrl = this;

        function getNetworkSettings() {
            networkSettingCtrl.networkService.getSettings().then(function successCallback(result) {
                networkSettingCtrl.setting = result;
            }, function errorCallback(result) {
            });
        }

        getNetworkSettings();

        networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
        networkSettingCtrl.crudHelperService.hideServerError(networkSettingCtrl);
    }

    updateNetworkSettings(validform:boolean) {
        var networkSettingCtrl = this;
        if (validform) {
            networkSettingCtrl.crudHelperService.hideServerError(networkSettingCtrl);
            networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
            networkSettingCtrl.networkService.updateSettings(networkSettingCtrl.setting).then(function successCallback(result) {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);

            }, function errorCallback(result) {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                networkSettingCtrl.crudHelperService.showServerError(networkSettingCtrl, result._body);
            });
        }
    }
}