/**
 * Created by vjain3 on 4/12/16.
 */
'use strict';

describe("contiv.nodes module", function () {
    var nodesData = {
        "cluster-node1-0": {
            "monitoring_state": {
                "label": "cluster-node1",
                "serial_number": "0",
                "management_address": "192.168.2.10"
            },
            "inventory_state": {
                "name": "cluster-node1-0",
                "status": "Unallocated",
                "prev_status": "Incomplete",
                "state": "Discovered",
                "prev_state": "Unknown"
            },
            "configuration_state": {
                "inventory_name": "cluster-node1-0",
                "host_group": "service-master",
                "ssh_address": "192.168.2.10",
                "inventory_vars": {
                    "node_addr": "192.168.2.10",
                    "node_name": "cluster-node1-0"
                }
            }
        },
        "cluster-node2-0": {
            "monitoring_state": {
                "label": "cluster-node2",
                "serial_number": "0",
                "management_address": "192.168.2.11"
            },
            "inventory_state": {
                "name": "cluster-node2-0",
                "status": "Unallocated",
                "prev_status": "Incomplete",
                "state": "Discovered",
                "prev_state": "Unknown"
            },
            "configuration_state": {
                "inventory_name": "cluster-node2-0",
                "host_group": "service-master",
                "ssh_address": "192.168.2.11",
                "inventory_vars": {
                    "node_addr": "192.168.2.11",
                    "node_name": "cluster-node2-0"
                }
            }
        },
        "cluster-node3-0": {
            "monitoring_state": {
                "label": "cluster-node3",
                "serial_number": "0",
                "management_address": "192.168.2.12"
            },
            "inventory_state": {
                "name": "cluster-node3-0",
                "status": "Unallocated",
                "prev_status": "Incomplete",
                "state": "Discovered",
                "prev_state": "Unknown"
            },
            "configuration_state": {
                "inventory_name": "cluster-node3-0",
                "host_group": "service-master",
                "ssh_address": "192.168.2.12",
                "inventory_vars": {
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

    var global = {
        "extra_vars": {
            "contiv_network_mode":"standalone",
            "control_interface":"eth0",
            "env": {},
            "fwd_mode":"bridge",
            "http_proxy":"http://proxy.cisco.com",
            "netplugin_if":"eth2",
            "scheduler_provider":"native-swarm",
            "service_vip":"192.168.2.252"
        }
    };

    beforeEach(module('ui.router'));
    beforeEach(module('contiv.nodes'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.NODES_LIST_ENDPOINT).respond(nodesData);
        $httpBackend.when('POST', ContivGlobals.NODES_COMMISSION_ENDPOINT).respond();
        $httpBackend.when('POST', ContivGlobals.NODES_DISCOVER_ENDPOINT).respond();
        $httpBackend.when('POST', ContivGlobals.NODES_DECOMMISSION_ENDPOINT).respond();
        $httpBackend.when('POST', ContivGlobals.NODES_MAINTENANCE_ENDPOINT).respond();
        $httpBackend.when('GET', ContivGlobals.NODES_ACTIVE_JOB_ENDPOINT).respond();
        $httpBackend.when('GET', ContivGlobals.NODES_LAST_JOB_ENDPOINT).respond();
        $httpBackend.when('GET', ContivGlobals.NODES_SETTINGS_GET_ENDPOINT).respond(global);
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

    describe('nodeActiveJobLogsCtrl controller', function () {
        var $controller, $interval, $rootScope;
        var nodeActiveJobLogsCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            nodeActiveJobLogsCtrl = $controller('NodeActiveJobLogsCtrl', { $interval: $interval, $scope: $rootScope });
        }));

        it('should be defined', function () {
            //spec body
            expect(nodeActiveJobLogsCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('NodeActiveJobLogsCtrl should do a GET on /info/job/active REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_ACTIVE_JOB_ENDPOINT);
            $httpBackend.flush();
        });
    });

    describe('nodeLastJobLogsCtrl controller', function () {
        var $controller, $interval, $rootScope;
        var nodeLastJobLogsCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            nodeLastJobLogsCtrl = $controller('NodeLastJobLogsCtrl', { $interval: $interval, $scope: $rootScope });
        }));

        it('should be defined', function () {
            //spec body
            expect(nodeLastJobLogsCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('NodeLastJobLogsCtrl should do a GET on /info/job/last REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_LAST_JOB_ENDPOINT);
            $httpBackend.flush();
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
            $httpBackend.flush();
        });
        it('NodeCommissionCtrl.commission() should do a POST on /commission/node/ REST API', function () {
            nodeCommissionCtrl.form = {'$valid' : true};
            nodeCommissionCtrl.ansibleVariables = ansibleVariables;
            nodeCommissionCtrl.envVariables = envVariables;
            nodeCommissionCtrl.nodeOpsObj.host_group = 'service-master';
            nodeCommissionCtrl.commission();
            $httpBackend.expectPOST(ContivGlobals.NODES_COMMISSION_ENDPOINT);
            $httpBackend.flush();
        });
        it('NodeCommissionCtrl.commission() should not do a POST on /commission/node/ REST API for invalid form', function () {
            nodeCommissionCtrl.form = {'$valid' : false};
            nodeCommissionCtrl.commission();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.flush();
            expect(nodeCommissionCtrl.showLoader).toBeFalsy();
        });
    });

    describe('nodediscover controller', function () {
        var $controller, $state, $stateParams;
        var nodeDiscoverCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = 'cluster-node1-0';
            $controller = _$controller_;
            nodeDiscoverCtrl = $controller('NodeDiscoverCtrl',
                { $state: $state, $stateParams: $stateParams });
        }));

        it('should be defined', function () {
            //spec body
            expect(nodeDiscoverCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('NodeDiscoverCtrl.discover() should do a POST on /discover/node/ REST API', function () {
            nodeDiscoverCtrl.form = {'$valid' : true};
            nodeDiscoverCtrl.nodeIPAddr = '192.168.2.10';
            nodeDiscoverCtrl.ansibleVariables = ansibleVariables;
            nodeDiscoverCtrl.envVariables = envVariables;
            nodeDiscoverCtrl.discover();
            $httpBackend.expectPOST(ContivGlobals.NODES_DISCOVER_ENDPOINT);
            $httpBackend.flush();
        });
        it('NodeDiscoverCtrl.discover() should not do a POST on /discover/node/ REST API for invalid form', function () {
            nodeDiscoverCtrl.form = {'$valid' : false};
            nodeDiscoverCtrl.discover();
            $httpBackend.verifyNoOutstandingRequest();
            expect(nodeDiscoverCtrl.showLoader).toBeFalsy();
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
            $httpBackend.expectPOST(ContivGlobals.NODES_DECOMMISSION_ENDPOINT);
            $httpBackend.flush();
            expect(nodeDetailsCtrl.showCommissionButton).toBeFalsy();
            expect(nodeDetailsCtrl.commissionButtonEnabled).toBeFalsy();
            expect(nodeDetailsCtrl.upgradeButtonEnabled).toBeFalsy();
        });
        it('NodeDetailsCtrl.upgrade() should do a POST on /maintenance/node/', function () {
            nodeDetailsCtrl.upgrade();
            $httpBackend.expectPOST(ContivGlobals.NODES_MAINTENANCE_ENDPOINT);
            $httpBackend.flush();
            expect(nodeDetailsCtrl.showCommissionButton).toBeFalsy();
            expect(nodeDetailsCtrl.commissionButtonEnabled).toBeFalsy();
            expect(nodeDetailsCtrl.upgradeButtonEnabled).toBeFalsy();
        });
    });
});
