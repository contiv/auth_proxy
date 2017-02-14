/**
 * Created by cshampur on 2/10/17.
 */

import {Component, Input, Output, EventEmitter, OnInit, NgZone} from "@angular/core";
import {OrganizationsModel} from "../../models/organizationsmodel";
import {CRUDHelperService} from "../../utils/crudhelperservice";
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
    constructor(private organizationsModel: OrganizationsModel,
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
        if(this.clusterMode === 'kubernetes' && this.firstRunWiz)
            this.newNetwork['networkName'] = 'default-net';
    }

    createNetwork(formvalid: boolean){
        if(formvalid){
            this.createnetwork.emit(this.newNetwork);
        }
    }

}