import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ContivGlobals } from "../models/contivglobals";

@Injectable()
export class NodesService {
    constructor(private http: Http) {}
    public static get node_constants(): any {
        return {
            APIC_CONTR_UNRESTRICT_MODE: 'apic_contracts_unrestricted_mode',
            APIC_EPG_BRIDGE_DOMAIN: 'apic_epg_bridge_domain',
            APIC_LEAF_NODES: 'apic_leaf_nodes',
            APIC_PASSWORD: 'apic_password',
            APIC_PHYS_DOMAIN: 'apic_phys_domain',
            APIC_URL: 'apic_url',
            APIC_USERNAME: 'apic_username',
            CONTIV_NET_MODE: 'contiv_network_mode',
            CONTROL_INTERFACE: 'control_interface',
            ENV: 'env',
            FWD_MODE: 'fwd_mode',
            DATA_INTERFACE: 'netplugin_if',
            SCHED_PROVIDER: 'scheduler_provider',
            VIP_ADDR: 'service_vip',
            UCP_BOOTSTRAP_NODE: 'ucp_bootstrap_node_name',
            CLUSTER_NAME: 'cluster_name'
        };
    }

    getSettings(ctrl) {
        var nodeservice = this;
        let promise = new Promise(function (resolve, reject) {
            var url = ContivGlobals.NODES_SETTINGS_GET_ENDPOINT;
            nodeservice.http.get(url).map((res: Response) => res.json()).toPromise().then(function successCallback(result) {
                resolve(result);
                ctrl.setting = result;
                var extraVars = ctrl.setting.extra_vars;
                var sched_provider = extraVars[NodesService.node_constants.SCHED_PROVIDER];
                var network_mode = extraVars[NodesService.node_constants.CONTIV_NET_MODE];

                if (extraVars[NodesService.node_constants.CONTROL_INTERFACE]) {
                    ctrl.extra_vars[NodesService.node_constants.CONTROL_INTERFACE] =
                        extraVars[NodesService.node_constants.CONTROL_INTERFACE];
                }
                if (extraVars[NodesService.node_constants.DATA_INTERFACE]) {
                    ctrl.extra_vars[NodesService.node_constants.DATA_INTERFACE] =
                        extraVars[NodesService.node_constants.DATA_INTERFACE];
                }
                if (extraVars[NodesService.node_constants.VIP_ADDR]) {
                    ctrl.extra_vars[NodesService.node_constants.VIP_ADDR] = extraVars[NodesService.node_constants.VIP_ADDR];
                }
                if (sched_provider) {
                    ctrl.extra_vars[NodesService.node_constants.SCHED_PROVIDER] = sched_provider;
                    if (sched_provider === 'ucp-swarm') {
                        ctrl.extra_vars[NodesService.node_constants.UCP_BOOTSTRAP_NODE] =
                            extraVars[NodesService.node_constants.UCP_BOOTSTRAP_NODE];
                    }
                }
                if (network_mode) {
                    ctrl.extra_vars[NodesService.node_constants.CONTIV_NET_MODE] = network_mode;
                    if (network_mode === 'standalone') {
                        ctrl.extra_vars[NodesService.node_constants.FWD_MODE] = extraVars[NodesService.node_constants.FWD_MODE];
                    }
                    else if (network_mode === 'aci') {
                        ctrl.extra_vars[NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE] =
                            extraVars[NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE];
                        ctrl.extra_vars[NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN] =
                            extraVars[NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN];
                        ctrl.extra_vars[NodesService.node_constants.APIC_LEAF_NODES] =
                            extraVars[NodesService.node_constants.APIC_LEAF_NODES];
                        ctrl.extra_vars[NodesService.node_constants.APIC_PASSWORD] =
                            extraVars[NodesService.node_constants.APIC_PASSWORD];
                        ctrl.extra_vars[NodesService.node_constants.APIC_PHYS_DOMAIN] =
                            extraVars[NodesService.node_constants.APIC_PHYS_DOMAIN];
                        ctrl.extra_vars[NodesService.node_constants.APIC_URL] =
                            extraVars[NodesService.node_constants.APIC_URL];
                        ctrl.extra_vars[NodesService.node_constants.APIC_USERNAME] =
                            extraVars[NodesService.node_constants.APIC_USERNAME];
                    }
                }
                if (extraVars[NodesService.node_constants.CLUSTER_NAME]) {
                    ctrl.extra_vars[NodesService.node_constants.CLUSTER_NAME] =
                        extraVars[NodesService.node_constants.CLUSTER_NAME];
                }
                nodeservice.createEnvVariables(extraVars[NodesService.node_constants.ENV], ctrl.envVariables);
                nodeservice.createAnsibleVariables(extraVars, ctrl.ansibleVariables);
            }, function errorCallback(result) {
                reject(result);
            });
        });

        return promise;
    }

    createEnvVariables(envVars, envVariables) {
        var i;
        for (i in envVars) {
            envVariables.push({'name': i, 'value': envVars[i]});
        }
    }

    createAnsibleVariables(extraVars, ansibleVariables) {
        var setting_filter = [NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE,
            NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN, NodesService.node_constants.APIC_LEAF_NODES,
            NodesService.node_constants.APIC_PASSWORD, NodesService.node_constants.APIC_PHYS_DOMAIN,
            NodesService.node_constants.APIC_URL, NodesService.node_constants.APIC_USERNAME,
            NodesService.node_constants.CONTIV_NET_MODE, NodesService.node_constants.CONTROL_INTERFACE,
            NodesService.node_constants.ENV, NodesService.node_constants.FWD_MODE, NodesService.node_constants.DATA_INTERFACE,
            NodesService.node_constants.SCHED_PROVIDER, NodesService.node_constants.VIP_ADDR,
            NodesService.node_constants.UCP_BOOTSTRAP_NODE, NodesService.node_constants.CLUSTER_NAME];
        var i;

        for (i in extraVars) {
            if (setting_filter.indexOf(i) === -1) {
                ansibleVariables.push({'name': i, 'value': extraVars[i]});
            }
        }
    };

    updateSettings(nodeOpsObj) {
        let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
        let options = new RequestOptions({ headers: headers }); // Create a request option
        return this.http.post(ContivGlobals.NODES_SETTINGS_SET_ENDPOINT, nodeOpsObj, options)
            .map((res: Response) => res.json()).toPromise();
    };

    createExtraVars(ctrl) {
        //Add ansible variables to extra_vars
        ctrl.ansibleVariables.forEach(function (item) {
            ctrl.extra_vars[item.name] = item.value
        });
        //Add environment variables to extra_vars
        var envVars = {};
        ctrl.envVariables.forEach(function (item) {
            envVars[item.name] = item.value;
        });
        ctrl.extra_vars[NodesService.node_constants.ENV] = envVars;
        ctrl.nodeOpsObj.extra_vars = JSON.stringify(ctrl.extra_vars);
    };

    /**
     * Cleanup ansible variables for network mode and scheduler. ng-if removes it from the view (DOM) but not from
     * the model.
     */
    cleanupExtraVars(ctrl) {
        //Cleanup for network mode
        if (ctrl.extra_vars[NodesService.node_constants.CONTIV_NET_MODE] == 'aci') {
            delete ctrl.extra_vars[NodesService.node_constants.FWD_MODE];
        } else {
            delete ctrl.extra_vars[NodesService.node_constants.APIC_URL];
            delete ctrl.extra_vars[NodesService.node_constants.APIC_USERNAME];
            delete ctrl.extra_vars[NodesService.node_constants.APIC_PASSWORD];
            delete ctrl.extra_vars[NodesService.node_constants.APIC_LEAF_NODES];
            delete ctrl.extra_vars[NodesService.node_constants.APIC_PHYS_DOMAIN];
            delete ctrl.extra_vars[NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN];
            delete ctrl.extra_vars[NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE];
        }
        //Cleanup for scheduler
        if (ctrl.extra_vars[NodesService.node_constants.SCHED_PROVIDER] == 'native-swarm') {
            delete ctrl.extra_vars[NodesService.node_constants.UCP_BOOTSTRAP_NODE];
        }
    };

}