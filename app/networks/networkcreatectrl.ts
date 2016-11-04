/**
 * Created by cshampur on 10/14/16.
 */

import {Component, Inject, Directive} from "@angular/core";
import {NetworksModel} from "../components/models/networksmodel";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Router, ActivatedRoute} from "@angular/router";
import {ContivGlobals} from "../components/models/contivglobals";

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
        this['showServerError'] = false;
        this['serverErrorMessage'] = '';
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
        debugger;
        var networkCreateCtrl = this;
        if(formvalid){
            this.crudHelperService.hideServerError(this);
            this.crudHelperService.startLoader(this);
            this.newNetwork.key = this.newNetwork.tenantName + ':' + this.newNetwork.networkName;
            this.networksModel.create(this.newNetwork,undefined)
                              .then((result) => {
                                  networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
                                  networkCreateCtrl.returnToNetworks();
                              }, (error) => {
                                  networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
                                  networkCreateCtrl.crudHelperService.showServerError(networkCreateCtrl, error);
                              });
        }
    }

}


