/**
 * Created by cshampur on 2/10/17.
 */

import {Component, Input, Output, EventEmitter, OnInit, NgZone} from "@angular/core";
import {OrganizationsModel} from "../../models/organizationsmodel";
import {CRUDHelperService} from "../../utils/crudhelperservice";
import {NetworksModel} from "../../models/networksmodel";
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
    constructor(private organizationsModel: OrganizationsModel,
                private networksModel: NetworksModel,
                private crudHelperService: CRUDHelperService,
                private ngZone: NgZone){
        this.createnetwork = new EventEmitter<any>();
        this.cancel = new EventEmitter<any>();
        this.goback = new EventEmitter<any>();
        this.skip = new EventEmitter<any>();
        this.networkCreateCtrl = this;

    }

    ngOnInit(){
        var component = this;
        this.crudHelperService.startLoader(this);
        function getTenants(reload: boolean) {
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

        getTenants(false);

    }

    createNetwork(formvalid: boolean){
        if(formvalid){
            this.createnetwork.emit(this.newNetwork);
        }
    }

}