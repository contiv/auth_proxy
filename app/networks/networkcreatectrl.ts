/**
 * Created by cshampur on 10/14/16.
 */

import {Component, Inject, Directive} from "@angular/core";
import {NetworksModel} from "../components/models/networksmodel";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Router, ActivatedRoute} from "@angular/router";
import {ContivGlobals} from "../components/models/contivglobals";
import {NotificationType} from "../components/directives/notification";

@Component({
    selector: 'networkcreate',
    templateUrl: 'networks/networkcreate.html'
})

export class NetworkCreateComponent{
    private networksModel:NetworksModel;
    private crudHelperService: CRUDHelperService;
    public networkCreateCtrl: any;
    public newNetwork: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                networksModel: NetworksModel,
                crudHelperService: CRUDHelperService){
        this.networksModel = networksModel;
        this.crudHelperService = crudHelperService;
        this['showLoader']=false;
        this['cidrPattern'] = ContivGlobals.CIDR_REGEX;
        this.newNetwork = {networkName: '', encap: 'vxlan', subnet:'', gateway:'', tenantName: 'default', key:''};
        this.networkCreateCtrl = this;
    }

    returnToNetworks(){
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    cancelCreating(){
        this.returnToNetworks();
    }

    createNetwork(formvalid: any){
        var networkCreateCtrl = this;
        if(formvalid){
            networkCreateCtrl.crudHelperService.startLoader(networkCreateCtrl);
            this.newNetwork.key = this.newNetwork.tenantName + ':' + this.newNetwork.networkName;
            this.networksModel.create(this.newNetwork,undefined)
                              .then((result) => {
                                  networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
                                  networkCreateCtrl.crudHelperService.showNotification("Network: Created", result.key.toString());
                                  networkCreateCtrl.returnToNetworks();
                              }, (error) => {
                                  networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
                                  networkCreateCtrl.crudHelperService.showServerError("Network: Create failed", error);
                              });

            setTimeout(() => {
                if(networkCreateCtrl['showLoader']==true){
                    networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
                    networkCreateCtrl.crudHelperService.showNotification("Network: Create task submitted", networkCreateCtrl.newNetwork.key, NotificationType.info);
                    networkCreateCtrl.returnToNetworks();
                }
            },2000)
        }
    }

}


