import {Component, OnInit} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {NodesService} from "../components/utils/nodesservice";

@Component({
    selector:'clustersettings',
    templateUrl: 'settings/clustersettings.html'
})

export class ClusterSettingsComponent implements OnInit{
    private nodesService: NodesService;
    private crudHelperService: CRUDHelperService;
    public showLoader: boolean;
    public extra_vars: any;
    public ansibleVariables: any;
    public envVariables: any;
    public showServerError: boolean;
    public serverErrorMessage: string;
    public clusterSettingCtrl: any;
    public nodeOpsObj: any;

    constructor(crudHelperService: CRUDHelperService,
    nodesService: NodesService){
        this.nodesService = nodesService;
        this.crudHelperService = crudHelperService;
        this.showLoader = true;
        this.extra_vars = {control_interface: '', netplugin_if: '', service_vip: '', scheduler_provider: '', ucp_bootstrap_node_name: '', cluster_name: '',
            contiv_network_mode: '', fwd_mode: '', apic_url: '', apic_username: '', apic_password: '', apic_leaf_nodes: '', apic_phys_domain: '',
            apic_epg_bridge_domain: '', apic_contracts_unrestricted_mode: ''};
        this.ansibleVariables = [];
        this.envVariables = [];
        this.showServerError = false;
        this.serverErrorMessage = '';
        this.nodeOpsObj = {nodes:[]};
        this.clusterSettingCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        var clusterSettingCtrl = this;
        this.nodesService.getSettings(clusterSettingCtrl)
            .then((result) => {
                clusterSettingCtrl.crudHelperService.stopLoader(clusterSettingCtrl);
                clusterSettingCtrl.crudHelperService.hideServerError(clusterSettingCtrl);
            }, (error) => {
                clusterSettingCtrl.crudHelperService.stopLoader(clusterSettingCtrl);
                clusterSettingCtrl.crudHelperService.hideServerError(clusterSettingCtrl);
            })
    }

    updateClusterSettings(formvalid: boolean){
        var clusterSettingCtrl = this;
        if (formvalid) {
            this.crudHelperService.hideServerError(this);
            this.crudHelperService.startLoader(this);
            this.nodesService.cleanupExtraVars(this);
            this.nodesService.createExtraVars(this);
            this.nodesService.updateSettings(this.nodeOpsObj)
                .then((result) => {
                    clusterSettingCtrl.crudHelperService.stopLoader(clusterSettingCtrl);
                },
                    (error) => {
                        clusterSettingCtrl.crudHelperService.stopLoader(clusterSettingCtrl);
                        clusterSettingCtrl.crudHelperService.showServerError(clusterSettingCtrl, error);
                    })
        }
    }
}