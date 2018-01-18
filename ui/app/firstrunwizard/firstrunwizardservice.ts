/**
 * Created by cshampur on 10/29/16.
 */


import { Injectable } from "@angular/core";
import { NetworkService } from "../components/utils/networkservice";
import { NetworksModel } from "../components/models/networksmodel";

@Injectable()
export class FirstRunWizardService {
    public setting:any;
    public aciSetting:any;
    public newNetwork: any;
    public globalInspect:any = {};
    public clusterMode:string = '';
    public skipArray: Array<boolean> = [false, false, false];
    public defaults: any = {};
    public showLoader: boolean = true;

    constructor(private networkService:NetworkService,
                private networksModel: NetworksModel) {
        this.initialize();
    }

    initialize(){
        this.setting = {
            networkInfraType: '',
            vlans: '',
            vxlans: '',
            fwdMode: '',
            arpMode: ''
        };
        this.aciSetting = {
            key: '',
            enforcePolicies: 'no',
            includeCommonTenant: 'no',
            name: '',
            nodeBindings: '',
            pathBindings: '',
            physicalDomain: ''
        };
        this.newNetwork = {
            networkName: '',
            encap: 'vxlan',
            subnet: '',
            gateway: '',
            tenantName: '',
            key: '',
            nwType: '',
            pktTag: null,
            cfgdTag: ''
        }
    }

    getNetworkSettings() {
        var wizardservice = this;
        this.showLoader = true;
        this.networkService.getSettings()
            .then((result) => {
                wizardservice.showLoader = false;
                wizardservice.setting = result;
                wizardservice.defaults['setting'] = Object.assign({}, wizardservice.setting);
                }, (error) => {}
            )
    }

    getAciSettings() {
        var wizardservice = this;
        this.networkService.getAciSettings()
            .then((result) => {
                wizardservice.aciSetting = result
                wizardservice.defaults['aciSetting'] = Object.assign({}, wizardservice.aciSetting);
            },(error) => {})
    }

    getGlobalInspect(){
        var wizardservice = this;
        this.networkService.getGlobalInspect()
            .then((result) => {
                wizardservice.globalInspect = result['Oper'];
                wizardservice.clusterMode = wizardservice.globalInspect['clusterMode'];
            }, (error) => {})
    }

    updateSettings():Promise<any> {
        var wizardservice = this;

        if(wizardservice.setting.networkInfraType === 'aci')
            wizardservice.networkService.setAciMode(true);
        else
            wizardservice.networkService.setAciMode(false);

        var p1 = new Promise((resolve, reject) => {
            if(wizardservice.skipArray[0] == true)
                resolve("skip")
            else
                resolve(wizardservice.networkService.updateSettings(wizardservice.setting));
        });

        return p1.then((res) => {
            if(wizardservice.skipArray[1] == true)
                return "skip";
            else
                return wizardservice.networkService.updateAciSettings(wizardservice.aciSetting);
        }).then((res) => {
            if(wizardservice.skipArray[2] == true)
                return "skip";
            else{
                wizardservice.newNetwork.key = wizardservice.newNetwork.tenantName + ':' + wizardservice.newNetwork.networkName;
                return wizardservice.networksModel.create(wizardservice.newNetwork, undefined)
            }
        });
    }
}