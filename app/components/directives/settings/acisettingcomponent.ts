import {Component, Output, EventEmitter, Input} from "@angular/core";
@Component({
    selector: 'acisettingcomp',
    templateUrl: 'components/directives/settings/acisetting.html'
})

export class AciSettingComponent{

    @Input('firstRunWiz') firstRunWiz:boolean;
    @Output('updateAciDef') updateAciDef: EventEmitter<any>;
    @Input('extra_vars') extra_vars: any;
    @Output('backTriggered') backTriggered: EventEmitter<any>;
    constructor(){
        this.extra_vars = {control_interface: '', netplugin_if: '', service_vip: '', scheduler_provider: '', ucp_bootstrap_node_name: '', cluster_name: '',
            contiv_network_mode: '', fwd_mode: '', apic_url: '', apic_username: '', apic_password: '', apic_leaf_nodes: '', apic_phys_domain: '',
            apic_epg_bridge_domain: '', apic_contracts_unrestricted_mode: ''};
        this.updateAciDef = new EventEmitter<any>();
        this.backTriggered = new EventEmitter<any>();
    }

    updateAciSetting(formvalid: boolean){
        if(formvalid){
            this.updateAciDef.emit(this.extra_vars);
        }
    }
}