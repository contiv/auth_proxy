/**
 * Created by cshampur on 10/14/16.
 */
import { Component, Inject, Directive, OnInit, NgZone } from "@angular/core";
import { NetworksModel } from "../components/models/networksmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { Router, ActivatedRoute } from "@angular/router";
import { ContivGlobals } from "../components/models/contivglobals";
import { NotificationType } from "../components/directives/notification";
import { OrganizationsModel } from "../components/models/organizationsmodel";

@Component({
    selector: 'networkcreate',
    templateUrl: './networkcreate.html'
})

export class NetworkCreateComponent {
    networkCreateCtrl: any;
    newNetwork: any;
    tenants: any[] = [];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private networksModel: NetworksModel,
                private crudHelperService: CRUDHelperService){
        this['showLoader']=false;
        this['cidrPattern'] = ContivGlobals.CIDR_REGEX;
        this.newNetwork = {networkName: '', encap: 'vxlan', subnet:'', gateway:'', tenantName: '', key:'', nwType: '', pktTag: null, cfgdTag: ''};
        this.networkCreateCtrl = this;
    }

    returnToNetworks(){
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    cancelCreating(){
        this.returnToNetworks();
    }

    createNetwork(network: any){
        var networkCreateCtrl = this;
        this.newNetwork = network;
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


