/**
 * Created by vjain3 on 4/12/16.
 */
'use strict';

describe("contiv.nodes module", function () {
    var nodesData = {
        "cluster-node1-0": {
            "monitoring-state": {
                "label": "cluster-node1",
                "serial-number": "0",
                "management-address": "192.168.2.10"
            },
            "inventory-state": {
                "name": "cluster-node1-0",
                "status": "Unallocated",
                "prev-status": "Incomplete",
                "state": "Discovered",
                "prev-state": "Unknown"
            },
            "configuration-state": {
                "inventory-name": "cluster-node1-0",
                "host-group": "service-master",
                "ssh-address": "192.168.2.10",
                "inventory-vars": {
                    "node_addr": "192.168.2.10",
                    "node_name": "cluster-node1-0"
                }
            }
        },
        "cluster-node2-0": {
            "monitoring-state": {
                "label": "cluster-node2",
                "serial-number": "0",
                "management-address": "192.168.2.11"
            },
            "inventory-state": {
                "name": "cluster-node2-0",
                "status": "Unallocated",
                "prev-status": "Incomplete",
                "state": "Discovered",
                "prev-state": "Unknown"
            },
            "configuration-state": {
                "inventory-name": "cluster-node2-0",
                "host-group": "service-master",
                "ssh-address": "192.168.2.11",
                "inventory-vars": {
                    "node_addr": "192.168.2.11",
                    "node_name": "cluster-node2-0"
                }
            }
        },
        "cluster-node3-0": {
            "monitoring-state": {
                "label": "cluster-node3",
                "serial-number": "0",
                "management-address": "192.168.2.12"
            },
            "inventory-state": {
                "name": "cluster-node3-0",
                "status": "Unallocated",
                "prev-status": "Incomplete",
                "state": "Discovered",
                "prev-state": "Unknown"
            },
            "configuration-state": {
                "inventory-name": "cluster-node3-0",
                "host-group": "service-master",
                "ssh-address": "192.168.2.12",
                "inventory-vars": {
                    "node_addr": "192.168.2.12",
                    "node_name": "cluster-node3-0"
                }
            }
        }
    };

    var ansibleVariables = [
        {'name': 'fooAV1', 'value': 'barAV1'},
        {'name': 'fooAV1', 'value': 'barAV2'},
        {'name': 'fooAV3', 'value': 'barAV3'}
    ];

    var envVariables = [
        {'name': 'fooEnv1', 'value': 'barEnv1'},
        {'name': 'fooEnv1', 'value': 'barEnv2'},
        {'name': 'fooEnv3', 'value': 'barEnv3'}
    ];

    //NodeCommissionCtrl adds env to the end of the ansible variables. Order matters for unit testing. POST does string comparison
    var extraVars = {
        "control_interface": "eth1",
        "service_vip": "192.168.2.252",
        "validate_certs": "false",
        "netplugin_if": "eth2",
        "env": {
            "http_proxy": "http://proxy.esl.cisco.com:8080",
            "https_proxy": "http://proxy.esl.cisco.com:8080"
        }
    };

    beforeEach(module('ui.router'));
    beforeEach(module('contiv.nodes'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.NODES_LIST_ENDPOINT).respond(nodesData);
        $httpBackend.when('POST', ContivGlobals.NODES_COMMISSION_ENDPOINT + "cluster-node1-0?" +
            'extra_vars=' + JSON.stringify(extraVars)).respond();
        $httpBackend.when('POST', ContivGlobals.NODES_DISCOVER_ENDPOINT + "192.168.2.10?" +
            'extra_vars=' + JSON.stringify(extraVars)).respond();
        $httpBackend.when('POST', ContivGlobals.NODES_DECOMMISSION_ENDPOINT + 'cluster-node1-0').respond();
        $httpBackend.when('POST', ContivGlobals.NODES_MAINTENANCE_ENDPOINT + 'cluster-node1-0').respond();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('nodelist controller', function () {
        var $controller, $interval, $rootScope;
        var nodeListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            nodeListCtrl = $controller('NodeListCtrl', { $interval: $interval, $scope: $rootScope });
        }));

        it('should be defined', function () {
            //spec body
            expect(nodeListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('NodeListCtrl should do a GET on /info/nodes REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_LIST_ENDPOINT);
            $httpBackend.flush();
        });
        it('NodeListCtrl should have nodes array assigned to nodes property', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_LIST_ENDPOINT);
            $httpBackend.flush();
            expect(Array.isArray(nodeListCtrl.nodes)).toBeTruthy();
            expect(nodeListCtrl.nodes.length).toEqual(3);
        });
    });

    describe('nodecommission controller', function () {
        var $controller, $state, $stateParams;
        var nodeCommissionCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = 'cluster-node1-0';
            $controller = _$controller_;
            nodeCommissionCtrl = $controller('NodeCommissionCtrl',
                { $state: $state, $stateParams: $stateParams });
        }));

        it('should be defined', function () {
            //spec body
            expect(nodeCommissionCtrl).toBeDefined();
        });
        it('NodeCommissionCtrl.addAnsibleVariable() should cache ansible variable', function () {
            nodeCommissionCtrl.newAnsibleVariable = ansibleVariables[0];
            nodeCommissionCtrl.addAnsibleVariable();
            expect(nodeCommissionCtrl.ansibleVariables.length).toEqual(1);
            expect(nodeCommissionCtrl.ansibleVariables[0].name).toEqual('fooAV1');
            expect(nodeCommissionCtrl.ansibleVariables[0].value).toEqual('barAV1');
            //newAnsibleVariable should be reset
            expect(nodeCommissionCtrl.newAnsibleVariable.name).toEqual('');
            expect(nodeCommissionCtrl.newAnsibleVariable.value).toEqual('');
        });
        it('NodeCommissionCtrl.addAnsibleVariable() called twice with same variable name should only have the latest addition', function () {
            nodeCommissionCtrl.newAnsibleVariable = ansibleVariables[0];
            nodeCommissionCtrl.addAnsibleVariable();
            nodeCommissionCtrl.newAnsibleVariable = ansibleVariables[1];
            nodeCommissionCtrl.addAnsibleVariable();
            expect(nodeCommissionCtrl.ansibleVariables.length).toEqual(1);
            expect(nodeCommissionCtrl.ansibleVariables[0].name).toEqual('fooAV1');
            expect(nodeCommissionCtrl.ansibleVariables[0].value).toEqual('barAV2');
        });
        it('NodeCommissionCtrl.removeAnsibleVariable() should remove the ansible variable from cache', function () {
            nodeCommissionCtrl.newAnsibleVariable = ansibleVariables[0];
            nodeCommissionCtrl.addAnsibleVariable();
            nodeCommissionCtrl.newAnsibleVariable = ansibleVariables[2];
            nodeCommissionCtrl.addAnsibleVariable();
            expect(nodeCommissionCtrl.ansibleVariables.length).toEqual(2);
            nodeCommissionCtrl.removeAnsibleVariable(ansibleVariables[2]);
            expect(nodeCommissionCtrl.ansibleVariables.length).toEqual(1);
            expect(nodeCommissionCtrl.ansibleVariables[0].name).toEqual('fooAV1');
            expect(nodeCommissionCtrl.ansibleVariables[0].value).toEqual('barAV1');
            nodeCommissionCtrl.removeAnsibleVariable(ansibleVariables[0]);
            expect(nodeCommissionCtrl.ansibleVariables.length).toEqual(0);
            nodeCommissionCtrl.removeAnsibleVariable(ansibleVariables[0]);
            expect(nodeCommissionCtrl.ansibleVariables.length).toEqual(0);
        });
        it('NodeCommissionCtrl.addEnvVariable() should cache env variable', function () {
            nodeCommissionCtrl.newEnvVariable = envVariables[0];
            nodeCommissionCtrl.addEnvVariable();
            expect(nodeCommissionCtrl.envVariables.length).toEqual(1);
            expect(nodeCommissionCtrl.envVariables[0].name).toEqual('fooEnv1');
            expect(nodeCommissionCtrl.envVariables[0].value).toEqual('barEnv1');
            //newEnvVariable should be reset
            expect(nodeCommissionCtrl.newEnvVariable.name).toEqual('');
            expect(nodeCommissionCtrl.newEnvVariable.value).toEqual('');
        });
        it('NodeCommissionCtrl.addEnvVariable() called twice with same variable name should only have the latest addition', function () {
            nodeCommissionCtrl.newEnvVariable = envVariables[0];
            nodeCommissionCtrl.addEnvVariable();
            nodeCommissionCtrl.newEnvVariable = envVariables[1];
            nodeCommissionCtrl.addEnvVariable();
            expect(nodeCommissionCtrl.envVariables.length).toEqual(1);
            expect(nodeCommissionCtrl.envVariables[0].name).toEqual('fooEnv1');
            expect(nodeCommissionCtrl.envVariables[0].value).toEqual('barEnv2');
        });
        it('NodeCommissionCtrl.removeEnvVariable() should remove the environment variable from cache', function () {
            nodeCommissionCtrl.newEnvVariable = envVariables[0];
            nodeCommissionCtrl.addEnvVariable();
            nodeCommissionCtrl.newEnvVariable = envVariables[2];
            nodeCommissionCtrl.addEnvVariable();
            expect(nodeCommissionCtrl.envVariables.length).toEqual(2);
            nodeCommissionCtrl.removeEnvVariable(envVariables[2]);
            expect(nodeCommissionCtrl.envVariables.length).toEqual(1);
            expect(nodeCommissionCtrl.envVariables[0].name).toEqual('fooEnv1');
            expect(nodeCommissionCtrl.envVariables[0].value).toEqual('barEnv1');
            nodeCommissionCtrl.removeEnvVariable(envVariables[0]);
            expect(nodeCommissionCtrl.envVariables.length).toEqual(0);
            nodeCommissionCtrl.removeEnvVariable(envVariables[0]);
            expect(nodeCommissionCtrl.envVariables.length).toEqual(0);
        });
        it('NodeCommissionCtrl.commission() should do a POST on /commission/node/ REST API', function () {
            nodeCommissionCtrl.form = {'$valid' : true};
            _.forEach(extraVars, function (value, key) {
                if (key != 'env') {
                    nodeCommissionCtrl.newAnsibleVariable.name = key;
                    nodeCommissionCtrl.newAnsibleVariable.value = value;
                    nodeCommissionCtrl.addAnsibleVariable();
                }
                else {
                    _.forEach(value, function (envVal, envKey) {
                        nodeCommissionCtrl.newEnvVariable.name = envKey;
                        nodeCommissionCtrl.newEnvVariable.value = envVal;
                        nodeCommissionCtrl.addEnvVariable();
                    })
                }
            });
            nodeCommissionCtrl.commission();
            $httpBackend.expectPOST(ContivGlobals.NODES_COMMISSION_ENDPOINT + "cluster-node1-0?" +
                'extra_vars=' + JSON.stringify(extraVars));
            $httpBackend.flush();
        });
        it('NodeCommissionCtrl.discover() should do a POST on /discover/node/ REST API', function () {
            nodeCommissionCtrl.form = {'$valid' : true};
            nodeCommissionCtrl.nodeIPAddr = '192.168.2.10';
            _.forEach(extraVars, function (value, key) {
                if (key != 'env') {
                    nodeCommissionCtrl.newAnsibleVariable.name = key;
                    nodeCommissionCtrl.newAnsibleVariable.value = value;
                    nodeCommissionCtrl.addAnsibleVariable();
                }
                else {
                    _.forEach(value, function (envVal, envKey) {
                        nodeCommissionCtrl.newEnvVariable.name = envKey;
                        nodeCommissionCtrl.newEnvVariable.value = envVal;
                        nodeCommissionCtrl.addEnvVariable();
                    })
                }
            });
            nodeCommissionCtrl.discover();
            $httpBackend.expectPOST(ContivGlobals.NODES_DISCOVER_ENDPOINT + "192.168.2.10?" +
                'extra_vars=' + JSON.stringify(extraVars));
            $httpBackend.flush();
        });
    });

    describe('nodedetails controller', function () {
        var $controller, $state, $stateParams, $interval, $rootScope;
        var nodeDetailsCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$interval_, _$rootScope_, _$controller_) {
            $state = _$state_;
            $stateParams = _$stateParams_;
            $stateParams.key = 'cluster-node1-0';
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            nodeDetailsCtrl = $controller('NodeDetailsCtrl',
                { $state: $state, $stateParams: $stateParams, $interval: $interval, $scope: $rootScope });
            $httpBackend.flush();
        }));

        it('should be defined', function () {
            expect(nodeDetailsCtrl).toBeDefined();
        });
        it('NodeDetailsCtrl should have node object assigned to node property', function () {
            expect(nodeDetailsCtrl.node).toBeDefined();
            expect(nodeDetailsCtrl.node.key).toEqual('cluster-node1-0');
        });
        it('NodeDetailsCtrl.decommission() should do a POST on /decommission/node/', function () {
            nodeDetailsCtrl.decommission();
            $httpBackend.expectPOST(ContivGlobals.NODES_DECOMMISSION_ENDPOINT + $stateParams.key);
            $httpBackend.flush();
            expect(nodeDetailsCtrl.showCommissionButton).toBeFalsy();
            expect(nodeDetailsCtrl.commissionButtonEnabled).toBeFalsy();
            expect(nodeDetailsCtrl.upgradeButtonEnabled).toBeFalsy();
        });
        it('NodeDetailsCtrl.upgrade() should do a POST on /maintenance/node/', function () {
            nodeDetailsCtrl.upgrade();
            $httpBackend.expectPOST(ContivGlobals.NODES_MAINTENANCE_ENDPOINT + $stateParams.key);
            $httpBackend.flush();
            expect(nodeDetailsCtrl.showCommissionButton).toBeFalsy();
            expect(nodeDetailsCtrl.commissionButtonEnabled).toBeFalsy();
            expect(nodeDetailsCtrl.upgradeButtonEnabled).toBeFalsy();
        });
    });
});
