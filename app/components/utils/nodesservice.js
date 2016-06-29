angular.module('contiv.utils')
    .factory('NodesService', ['$http', '$q',
        function ($http, $q) {
            var node_constants = {
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
                CLUSTER_NAME: 'cluster_name'};

            function getSettings(ctrl) {
                var deferred = $q.defer();
                var url = ContivGlobals.NODES_SETTINGS_GET_ENDPOINT;
                $http.get(url).then(function successCallback(result) {
                    deferred.resolve(result.data);
                    ctrl.setting = result.data;
                    var extraVars = ctrl.setting.extra_vars;
                    var sched_provider = extraVars[node_constants.SCHED_PROVIDER];
                    var network_mode = extraVars[node_constants.CONTIV_NET_MODE];

                    if (extraVars[node_constants.CONTROL_INTERFACE]) {
                        ctrl.extra_vars[node_constants.CONTROL_INTERFACE] = 
                            extraVars[node_constants.CONTROL_INTERFACE]; 
                    }
                    if (extraVars[node_constants.DATA_INTERFACE]) {
                        ctrl.extra_vars[node_constants.DATA_INTERFACE] = 
                            extraVars[node_constants.DATA_INTERFACE]; 
                    }
                    if (extraVars[node_constants.VIP_ADDR]) {
                        ctrl.extra_vars[node_constants.VIP_ADDR] = extraVars[node_constants.VIP_ADDR]; 
                    }
                    if (sched_provider) {
                        ctrl.extra_vars[node_constants.SCHED_PROVIDER] = sched_provider;
                        if (sched_provider === 'ucp-swarm') {
                            ctrl.extra_vars[node_constants.UCP_BOOTSTRAP_NODE] = 
                                extraVars[node_constants.UCP_BOOTSTRAP_NODE];
                        }
                    }
                    if (network_mode) {
                        ctrl.extra_vars[node_constants.CONTIV_NET_MODE] = network_mode;
                        if (network_mode === 'standalone') {
                            ctrl.extra_vars[node_constants.FWD_MODE] = extraVars[node_constants.FWD_MODE];
                        }
                        else if (network_mode === 'aci') {
                            ctrl.extra_vars[node_constants.APIC_CONTR_UNRESTRICT_MODE] = 
                                extraVars[node_constants.APIC_CONTR_UNRESTRICT_MODE];
                            ctrl.extra_vars[node_constants.APIC_EPG_BRIDGE_DOMAIN] = 
                                extraVars[node_constants.APIC_EPG_BRIDGE_DOMAIN];
                            ctrl.extra_vars[node_constants.APIC_LEAF_NODES] = 
                                extraVars[node_constants.APIC_LEAF_NODES];
                            ctrl.extra_vars[node_constants.APIC_PASSWORD] = 
                                extraVars[node_constants.APIC_PASSWORD];
                            ctrl.extra_vars[node_constants.APIC_PHYS_DOMAIN] = 
                                extraVars[node_constants.APIC_PHYS_DOMAIN];
                            ctrl.extra_vars[node_constants.APIC_URL] = 
                                extraVars[node_constants.APIC_URL];
                            ctrl.extra_vars[node_constants.APIC_USERNAME] = 
                                extraVars[node_constants.APIC_USERNAME];                        
                        }
                    }
                    if (extraVars[node_constants.CLUSTER_NAME]) {
                        ctrl.extra_vars[node_constants.CLUSTER_NAME] =
                            extraVars[node_constants.CLUSTER_NAME];
                    }
                    createEnvVariables(extraVars[node_constants.ENV], ctrl.envVariables);
                    createAnsibleVariables(extraVars, ctrl.ansibleVariables);
                }, function errorCallback(result) {
                    deferred.reject(result.data);
                });
                return deferred.promise;
            };

            function createEnvVariables(envVars, envVariables) {
                var i;
                for (i in envVars) {
                    envVariables.push({'name': i, 'value': envVars[i]});
                }                
            };

            function createAnsibleVariables(extraVars, ansibleVariables) {
                var setting_filter = [node_constants.APIC_CONTR_UNRESTRICT_MODE,
                    node_constants.APIC_EPG_BRIDGE_DOMAIN, node_constants.APIC_LEAF_NODES, 
                    node_constants.APIC_PASSWORD, node_constants.APIC_PHYS_DOMAIN, 
                    node_constants.APIC_URL, node_constants.APIC_USERNAME, 
                    node_constants.CONTIV_NET_MODE, node_constants.CONTROL_INTERFACE, 
                    node_constants.ENV, node_constants.FWD_MODE, node_constants.DATA_INTERFACE, 
                    node_constants.SCHED_PROVIDER, node_constants.VIP_ADDR, 
                    node_constants.UCP_BOOTSTRAP_NODE, node_constants.CLUSTER_NAME];
                var i;

                for (i in extraVars) {
                    if (setting_filter.indexOf(i) === -1) {
                        ansibleVariables.push({'name': i, 'value': extraVars[i]});
                    }
                }
            };

            function updateSettings(nodeOpsObj) {
                BaseCollection.call(this, $http, $q, ContivGlobals.NODES_SETTINGS_GET_ENDPOINT);
                var settingscollection = this;
                var deferred = settingscollection.$q.defer();
                var url = ContivGlobals.NODES_SETTINGS_SET_ENDPOINT;
                settingscollection.$http.post(url, nodeOpsObj, {
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    })
                    .then(function successCallback(response) {
                        //Server doesn't return any json in response
                        deferred.resolve();
                    }, function errorCallback(response) {
                        deferred.reject(response);
                    });
                return deferred.promise;
            };

            function createExtraVars(ctrl) {
                //Add ansible variables to extra_vars
                ctrl.ansibleVariables.forEach(function (item) {
                    ctrl.extra_vars[item.name] = item.value
                });
                //Add environment variables to extra_vars
                var envVars = {};
                ctrl.envVariables.forEach(function (item) {
                    envVars[item.name] = item.value;
                });
                ctrl.extra_vars[node_constants.ENV] = envVars;
                ctrl.nodeOpsObj.extra_vars = JSON.stringify(ctrl.extra_vars);
            };

            /**
             * Cleanup ansible variables for network mode and scheduler. ng-if removes it from the view (DOM) but not from
             * the model.
             */
            function cleanupExtraVars(ctrl) {
                //Cleanup for network mode
                if (ctrl.extra_vars[node_constants.CONTIV_NET_MODE] == 'aci') {
                    delete ctrl.extra_vars[node_constants.FWD_MODE];
                } else {
                    delete ctrl.extra_vars[node_constants.APIC_URL];
                    delete ctrl.extra_vars[node_constants.APIC_USERNAME];
                    delete ctrl.extra_vars[node_constants.APIC_PASSWORD];
                    delete ctrl.extra_vars[node_constants.APIC_LEAF_NODES];
                    delete ctrl.extra_vars[node_constants.APIC_PHYS_DOMAIN];
                    delete ctrl.extra_vars[node_constants.APIC_EPG_BRIDGE_DOMAIN];
                    delete ctrl.extra_vars[node_constants.APIC_CONTR_UNRESTRICT_MODE];
                }
                //Cleanup for scheduler
                if (ctrl.extra_vars[node_constants.SCHED_PROVIDER] == 'native-swarm') {
                    delete ctrl.extra_vars[node_constants.UCP_BOOTSTRAP_NODE];
                }
            };

        return {
            getSettings: getSettings,
            createEnvVariables: createEnvVariables,
            createAnsibleVariables: createAnsibleVariables,
            updateSettings: updateSettings,
            createExtraVars: createExtraVars,
            cleanupExtraVars: cleanupExtraVars
        }
    }]);