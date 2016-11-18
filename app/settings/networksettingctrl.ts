import { Component } from '@angular/core';
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { NetworkService } from "../components/utils/networkservice";
import {ContivGlobals} from "../components/models/contivglobals";
import {NodesService} from "../components/utils/nodesservice";


@Component({
    selector: 'networksetting',
    templateUrl: 'settings/networksettings.html'
})
export class NetworkSettingsComponent {
    public setting: any;
    public extra_vars:  any;
    public networkSettingCtrl: any;

    constructor(private crudHelperService:  CRUDHelperService,
                private networkService: NetworkService,
                private nodesService: NodesService){
        this.setting = {};
        this['showLoader']=true;
        this['showServerError'] = false;
        this['serverErrorMessage'] = '';
        this.extra_vars = {};
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

        nodesService.getSettings(networkSettingCtrl)
            .then((result) => {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            });
        this.networkSettingCtrl = this;
    }

    updateNetworkSettings(settings:any) {
        var networkSettingCtrl = this;
        networkSettingCtrl.crudHelperService.hideServerError(networkSettingCtrl);
        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
        networkSettingCtrl.networkService.updateSettings(networkSettingCtrl.setting).then(function successCallback(result) {
            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            }, function errorCallback(result) {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                networkSettingCtrl.crudHelperService.showServerError(networkSettingCtrl, result._body);
        });
    }

    updateAciSetting(extra_vars:any){
        var networkSettingCtrl = this;
        networkSettingCtrl.crudHelperService.hideServerError(networkSettingCtrl);
        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
        networkSettingCtrl.nodesService.cleanupExtraVars(networkSettingCtrl);
        networkSettingCtrl.nodesService.createExtraVars(networkSettingCtrl);
        networkSettingCtrl.nodesService.updateSettings(extra_vars)
            .then((result) => {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            }, (error) => {
                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                networkSettingCtrl.crudHelperService.showServerError(networkSettingCtrl, error._body);
            })

    }
}