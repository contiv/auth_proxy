/**
 * Created by cshampur on 10/29/16.
 */


import {Injectable} from "@angular/core";
import {NetworkService} from "../components/utils/networkservice";
import {NodesService} from "../components/utils/nodesservice";

@Injectable()
export class FirstRunWizardService{
    public setting: any;
    public extra_vars: any;
    constructor(private networkService: NetworkService,
                private nodesService: NodesService){
        this.setting = {networkInfraType: '', vlans: '', vxlans: '', fwdMode: ''};
        this.extra_vars = {control_interface: '', netplugin_if: '', service_vip: '', scheduler_provider: '', ucp_bootstrap_node_name: '', cluster_name: '',
            contiv_network_mode: '', fwd_mode: '', apic_url: '', apic_username: '', apic_password: '', apic_leaf_nodes: '', apic_phys_domain: '',
            apic_epg_bridge_domain: '', apic_contracts_unrestricted_mode: ''};
    }

    getNetworkSettings(){
        this.networkService.getSettings()
            .then((result) => {
                this.setting = result;
            }
        )
    }

    getAciSettings(){
        /*
        this.nodesService.getSettings(this)
            .then((result) => {
            })
         */
    }

    updateSettings(): Promise<any>{
        this.networkService.updateSettings(this.setting)
            .then((result) => {
            });
        return this.nodesService.updateSettings(this.extra_vars);
    }
}