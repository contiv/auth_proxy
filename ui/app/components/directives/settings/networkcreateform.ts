/**
 * Created by cshampur on 2/10/17.
 */

import {Component, Input, Output, EventEmitter, OnInit, NgZone} from "@angular/core";
import {OrganizationsModel} from "../../models/organizationsmodel";
import {CRUDHelperService} from "../../utils/crudhelperservice";
import {NetworksModel} from "../../models/networksmodel";
import {isNull} from "util";
import {ContivGlobals} from "../../models/contivglobals";
import {DisplayType} from "./tenantcreate";
declare var $:any;

@Component({
    selector: 'networkcreateform',
    templateUrl: './networkcreateform.html'
})

export class NetworkCreateformComponent implements OnInit{
    @Input('firstRunWiz') firstRunWiz:boolean;
    @Input('newNetwork') newNetwork: any;
    @Input('clusterMode') clusterMode: string = '';
    @Output('createnetwork') createnetwork: EventEmitter<any>;
    @Output('cancel') cancel:EventEmitter<any>;
    @Output('goback') goback:EventEmitter<any>;
    @Output('skip') skip:EventEmitter<any>;
    public networkCreateCtrl: any;
    public showLoader: boolean = true;
    public tenants: any = [];
    public networkPresent: boolean = false;
    public networkNamePattern = ContivGlobals.NETWORK_NAME_REGEX;
    public DisplayType = DisplayType;
    constructor(private organizationsModel: OrganizationsModel,
                private crudHelperService: CRUDHelperService,
                private ngZone: NgZone){
        this.createnetwork = new EventEmitter<any>();
        this.cancel = new EventEmitter<any>();
        this.goback = new EventEmitter<any>();
        this.skip = new EventEmitter<any>();
        this.networkCreateCtrl = this;
    }

    getTenants(reload: boolean) {
        var component = this;
        component.organizationsModel.get(reload)
            .then((result) => {
                component.tenants = result;
                if(component.clusterMode === 'kubernetes' && component.firstRunWiz)
                    component.newNetwork['networkName'] = 'default-net';
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                })
            }, (error) => {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                })
            });
    }

    ngOnInit(){
        var component = this;
        this.crudHelperService.startLoader(this);
        this.getTenants(false);
    }

    closeTenantCreate() {
        $('#tenant-create-modal').modal('hide');
    }

    showTenantModal() {
        $('#tenant-create-modal').modal('show');
    }

    createNetwork(formvalid: boolean){
        if(formvalid){
            if (isNull(this.newNetwork.pktTag)) {
                delete this.newNetwork.pktTag;
            }
            if (this.newNetwork.cfgdTag === '') {
                delete this.newNetwork.cfgdTag;
            }
            if (this.newNetwork.nwType === '') {
                delete this.newNetwork.nwType;
            }
            this.createnetwork.emit(this.newNetwork);
        }
    }

}