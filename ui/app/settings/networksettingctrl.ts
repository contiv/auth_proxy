import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from "rxjs";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { NetworkService } from "../components/utils/networkservice";
import { ContivGlobals } from "../components/models/contivglobals";

@Component({
    selector: 'networksetting',
    templateUrl: './networksettings.html'
})
export class NetworkSettingsComponent implements OnDestroy {
    private refresh: Subscription;
    setting: any;
    aciSetting: any;
    globalInspectStats:any;

    constructor(private crudHelperService:  CRUDHelperService,
                private networkService: NetworkService){
        this.setting = {};
        this.aciSetting = {};
        this.globalInspectStats = {};
        this['showLoader']=true;
        this['showServerError'] = false;
        this['serverErrorMessage'] = '';
        var networkSettingCtrl = this;

        function getNetworkSettings() {
            networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
            networkSettingCtrl.networkService.getSettings().then(function successCallback(result) {
                networkSettingCtrl.setting = result;
                getAciSettings();
            },  function errorCallback(result) {
                getAciSettings();
            });
        }

        getNetworkSettings();

        function getAciSettings(){
                networkService.getAciSettings()
                .then((result) => {
                    networkSettingCtrl.aciSetting = result;
                    networkSettingCtrl.getGlobalInspect(false);
                }, (error) => {
                    networkSettingCtrl.getGlobalInspect(false);
                });
        }

        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getGlobalInspect(true);
        });
    }

    updateNetworkSettings(settings:any) {
        var networkSettingCtrl = this;
        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
        networkSettingCtrl.networkService.updateSettings(settings).then(function successCallback(result) {
            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            if(result['networkInfraType'] === 'aci')
                networkSettingCtrl.networkService.setAciMode(true);
            else
                networkSettingCtrl.networkService.setAciMode(false);
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

    getGlobalInspect(reload: boolean){
        var networkSettingCtrl = this;
        networkSettingCtrl.networkService.getGlobalInspect()
            .then((result) => {
                    networkSettingCtrl['globalInspectStats'] = result['Oper'];
                    if(!reload)
                        networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
                }, (error) => {
                if(!reload)
                    networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
            });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}