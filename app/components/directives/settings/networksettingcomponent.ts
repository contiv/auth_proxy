/**
 * Created by cshampur on 11/14/16.
 */

import {Component, Input, Output, EventEmitter} from "@angular/core";
import {ContivGlobals} from "../../models/contivglobals";
import any = jasmine.any;

@Component({
    selector: 'networksettingcomp',
    templateUrl: './networksetting.html'
})

export class NetworkSettingComponent {
    @Input('firstRunWiz') firstRunWiz:boolean;
    @Input('setting') setting:any;
    @Output('updateNetDef') updateNetDef: EventEmitter<any>;
    @Output('cancel') cancel: EventEmitter<any>;
    @Output('skip') skip: EventEmitter<any>;
    vlanPattern:string = ContivGlobals.VLAN_REGEX;
    vxlanPattern:string = ContivGlobals.VXLAN_REGEX;
    pvtSubnetPattern:string  = ContivGlobals.PVTSUBNET_REGEX;

    constructor(){
        this.updateNetDef = new EventEmitter<any>();
        this.cancel = new EventEmitter<any>();
        this.skip = new EventEmitter<any>();
        this.firstRunWiz = false;
        this.setting = {networkInfraType: '', vlans: '', vxlans: '', fwdMode: '', arpMode: '', pvtSubnet: ''};
    }

    updateNetworkSettings(formvalid: boolean){
        if(formvalid){
            this.updateNetDef.emit(this.setting);
        }
    }


}