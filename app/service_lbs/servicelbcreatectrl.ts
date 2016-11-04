/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {ServicelbsModel} from "../components/models/servicelbsmodel";
import {NetworksModel} from "../components/models/networksmodel";
import {Router, ActivatedRoute} from "@angular/router";
var _  = require('lodash');


@Component({
    selector: 'servicelbCreate',
    templateUrl: 'service_lbs/servicelbcreate.html'
})

export class ServicelbCreateComponent implements OnInit{
    private servicelbsModel:ServicelbsModel;
    private networksModel:NetworksModel
    private crudHelperService: CRUDHelperService;
    public servicelbCreateCtrl: any;
    public servicelb: any;
    public networks: any;
    public labelSelectors: any;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                servicelbsModel: ServicelbsModel,
                crudHelperService: CRUDHelperService,
                networksModel: NetworksModel){
        this.servicelbsModel = servicelbsModel;
        this.networksModel = networksModel;
        this.crudHelperService = crudHelperService;
        this['showLoader']=true;
        this.servicelb = {serviceName: '', networkName: '', ipAddress: '', selectors: [], ports: [], tenantName: 'default', key:''};
        this.networks = [];
        this.labelSelectors = [];
        this.servicelbCreateCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getNetworks(false);
    }

    getNetworks(reload: boolean){
        var servicelbCreateCtrl = this;
        this.networksModel.get(reload)
                          .then((result) => {
                              servicelbCreateCtrl.networks = _.filter(result, {'tenantName': 'default'});
                              servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
                          }, (error) => {
                              servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
                          });
    }

    createServicelb(formvalid: boolean){
        debugger;
        var servicelbCreateCtrl = this;
        this.createLabelSelectorStrings();
        if(formvalid){
            this.crudHelperService.hideServerError(this);
            this.crudHelperService.startLoader(this);
            this.servicelb.key = this.servicelb.tenantName + ':' + this.servicelb.serviceName;
            this.servicelbsModel.create(this.servicelb, undefined).then((result) => {
                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
                this.returnToServicelbs();
            }, (error) => {
                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
                servicelbCreateCtrl.crudHelperService.showServerError(servicelbCreateCtrl, error);
            });
        }
    }

    cancelCreating(){
        this.returnToServicelbs();
    }

    returnToServicelbs(){
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    createLabelSelectorStrings(){
        this.labelSelectors.forEach((labelSelector) => {
            var selectorString = labelSelector.name + '=' + labelSelector.value;
            this.servicelb.selectors.push(selectorString);
        })
    }
}


