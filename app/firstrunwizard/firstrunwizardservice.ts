/**
 * Created by cshampur on 10/29/16.
 */


import { Injectable } from "@angular/core";
import { NetworkService } from "../components/utils/networkservice";

@Injectable()
export class FirstRunWizardService {
    public setting:any;
    public aciSetting:any;

    constructor(private networkService:NetworkService) {
        this.setting = {networkInfraType: '', vlans: '', vxlans: '', fwdMode: ''};
        this.aciSetting = {
            key: '',
            enforcePolicies: 'yes',
            includeCommonTenant: 'no',
            name: '',
            nodeBindings: '',
            pathBindings: '',
            physicalDomain: ''
        };
    }

    getNetworkSettings() {
        this.networkService.getSettings()
            .then((result) => {
                    this.setting = result;
                }
            )
    }

    getAciSettings() {
        this.networkService.getAciSettings()
            .then((result) => {
                this.aciSetting = result
            })
    }

    updateSettings():Promise<any> {
        this.networkService.updateSettings(this.setting)
            .then((result) => {
            });
        return this.networkService.updateAciSettings(this.aciSetting);
    }
}