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

export class NetworkCreateComponent implements OnInit {
    networkCreateCtrl: any;
    newNetwork: any;
    tenants: any[] = [];

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                private ngZone: NgZone,
                private networksModel: NetworksModel,
                private organizationsModel: OrganizationsModel,
                private crudHelperService: CRUDHelperService){
        this['showLoader']=false;
        this['cidrPattern'] = ContivGlobals.CIDR_REGEX;
        this.newNetwork = {networkName: '', encap: 'vxlan', subnet:'', gateway:'', tenantName: '', key:''};
        this.networkCreateCtrl = this;
    }

    ngOnInit() {
        var component = this;
        component.crudHelperService.startLoader(component);

        function getTenants(reload: boolean) {
            component.organizationsModel.get(reload)
                .then((result) => {
                    component.tenants = result;
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                });
        }

        getTenants(false);
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


