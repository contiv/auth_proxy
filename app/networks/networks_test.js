'use strict';

describe('contiv.networks module', function () {

    var networksData = [
        {
            "key": "default:contiv-net1",
            "encap": "vxlan",
            "gateway": "20.1.2.254",
            "networkName": "contiv-net1",
            "subnet": "20.1.2.0/24",
            "tenantName": "default",
            "link-sets": {},
            "links": {
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        }
    ];

    var groupsData = [
        {
            "key": "default:contiv-net1:prod-web",
            "endpointGroupId": 1,
            "groupName": "prod-web",
            "networkName": "contiv-net1",
            "policies": [
                "proxy-net-policy"
            ],
            "tenantName": "default",
            "link-sets": {
                "Policies": {
                    "default:proxy-net-policy": {
                        "type": "policy",
                        "key": "default:proxy-net-policy"
                    }
                }
            },
            "links": {
                "AppProfile": {},
                "Network": {},
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        },
        {
            "key": "default:contiv-net2:prod-app",
            "endpointGroupId": 2,
            "groupName": "prod-app",
            "networkName": "contiv-net2",
            "policies": [
                "app-net-policy"
            ],
            "tenantName": "default",
            "link-sets": {
                "Policies": {
                    "default:app-net-policy": {
                        "type": "policy",
                        "key": "default:app-net-policy"
                    }
                }
            },
            "links": {
                "AppProfile": {},
                "Network": {},
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        },
        {
            "key": "default:contiv-net2:prod-stor",
            "endpointGroupId": 5,
            "groupName": "prod-stor",
            "networkName": "contiv-net2",
            "policies": [
                "db-net-policy"
            ],
            "tenantName": "default",
            "link-sets": {
                "Policies": {
                    "default:db-net-policy": {
                        "type": "policy",
                        "key": "default:db-net-policy"
                    }
                }
            },
            "links": {
                "AppProfile": {},
                "Network": {},
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        }
    ];

    var networkOperData = {
        "Oper":{
            "allocatedAddressesCount":2,
            "allocatedIPAddresses":"20.1.1.1-20.1.1.6, 20.1.1.254",
            "dnsServerIP":"20.1.1.1",
            "endpoints":[
                {
                    "containerID":"c44e011692b36f3dc0c1b2d7f02f65446aa8c839725f2247eb160f902e662b3b",
                    "homingHost":"cluster-node1",
                    "ipAddress":[
                        "20.1.1.2",
                        ""
                    ],
                    "labels":"map[com.docker.swarm.id:f3d9025b52147907722e154d8d60963375dbe01fe2daf557902ac9eab37170c3]",
                    "macAddress":"02:02:14:01:01:02",
                    "name":"b437653f2b2009c1ebfb6f03546cf650dd6873a31b92326ad390b4a22af3c33c",
                    "network":"contiv-net1.default"
                },
                {
                    "containerID":"dd02a4ae156f3068ba0a66cd875c6b667e3b1aab6a005a61bccef4f186252b03",
                    "homingHost":"cluster-node1",
                    "ipAddress":[
                        "20.1.1.3",
                        ""
                    ],
                    "labels":"map[com.docker.swarm.id:f8cff2b516b2133ed8f6b6cc6fcbc989437b30744572e08dc874e737d0292410]",
                    "macAddress":"02:02:14:01:01:03",
                    "name":"ae20564a67bbb596f84d14d321ccc792b80755b035af56606bd0ccb25cb0c0b2",
                    "network":"contiv-net1.default"
                }],
            "externalPktTag":1,
            "numEndpoints":2,
            "pktTag":1
        }
    };

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.networks'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.NETWORKS_INSPECT_ENDPOINT + networksData[0].key + '/').respond(networkOperData);
        $httpBackend.when('GET', ContivGlobals.NETWORKS_ENDPOINT).respond(networksData);
        $httpBackend.when('GET', ContivGlobals.APPLICATIONGROUPS_ENDPOINT).respond(groupsData);
        $httpBackend.when('DELETE', ContivGlobals.NETWORKS_ENDPOINT + networksData[0].key + '/').respond(networksData[0]);
        $httpBackend.when('POST', ContivGlobals.NETWORKS_ENDPOINT + networksData[0].key + '/').respond(networksData[0]);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('networklist controller', function () {
        var $controller, $interval, $rootScope;
        var networkListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            networkListCtrl = $controller('NetworksListCtrl', { $interval: $interval, $scope: $rootScope });
        }));
        it('should be defined', function () {
            expect(networkListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('NetworksListCtrl should do a GET on /api/networks/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
        });
        it('NetworksListCtrl should have networks array assigned to networks property', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
            expect(Array.isArray(networkListCtrl.networks)).toBeTruthy();
            expect(networkListCtrl.networks.length).toEqual(1);
        });
        it('NetworksListCtrl should do have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
            expect(networkListCtrl.showLoader).toBeFalsy();
        });
    });

    describe('networkdetails controller', function () {
        var $controller, $state, $stateParams, $interval, $rootScope;
        var networkDetailsCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$interval_, _$rootScope_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = networksData[0].key;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            networkDetailsCtrl = $controller('NetworkDetailsCtrl',
                { $state: $state, $stateParams: $stateParams, $interval: $interval, $scope: $rootScope });
        }));

        it('should be defined', function () {
            expect(networkDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });

        it('NetworkDetailsCtrl should do a GET on /api/networks/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
        });

        it('NetworkDetailsCtrl should have network object assigned to network property', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
            expect(networkDetailsCtrl.network).toEqual(networksData[0]);
        });

        it('NetworkDetailsCtrl should do a GET on /api/endpointGroups/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.APPLICATIONGROUPS_ENDPOINT);
            $httpBackend.flush();
        });

        it('NetworkDetailsCtrl should have application groups array assigned to applicationGroups property', function () {
            $httpBackend.expectGET(ContivGlobals.APPLICATIONGROUPS_ENDPOINT);
            $httpBackend.flush();
            expect(networkDetailsCtrl.applicationGroups.length).toEqual(1);
            expect(networkDetailsCtrl.applicationGroups[0]).toEqual(groupsData[0]);
        });

        it('NetworkDetailsCtrl.deleteNetwork() should do a DELETE on /api/networks/ REST API', function () {
            //Call flush to fulfill all the http requests to get network and application groups before calling deleteNetwork()
            $httpBackend.flush();
            networkDetailsCtrl.deleteNetwork();
            $httpBackend.expectDELETE(ContivGlobals.NETWORKS_ENDPOINT + networksData[0].key + '/');
            $httpBackend.flush();
            expect(networkDetailsCtrl.showLoader).toBeFalsy();
        });

        it('NetworksDetailsCtrl should do have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
            expect(networkDetailsCtrl.showLoader).toBeFalsy();
        });
    });

    describe('networkcreate controller', function () {

        var $controller, $state, $stateParams;
        var networkCreateCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = networksData[0].key;
            $controller = _$controller_;
            networkCreateCtrl = $controller('NetworkCreateCtrl');
        }));

        it('should be defined', function () {
            expect(networkCreateCtrl).toBeDefined();
        });

        it('NetworkCreateCtrl should have new network object initialized', function () {
            expect(networkCreateCtrl.newNetwork).toBeDefined();
            expect(networkCreateCtrl.newNetwork.encap).toEqual('vxlan');
            expect(networkCreateCtrl.newNetwork.tenantName).not.toEqual('');
            expect(networkCreateCtrl.newNetwork.networkName).toEqual('');
            expect(networkCreateCtrl.newNetwork.subnet).toEqual('');
            expect(networkCreateCtrl.newNetwork.gateway).toEqual('');
        });

        it('NetworkCreateCtrl.createNetwork() should do a POST on /api/networks/ REST API', function () {
            networkCreateCtrl.form = {'$valid' : true};
            networkCreateCtrl.newNetwork.networkName = 'contiv-net1';
            networkCreateCtrl.newNetwork.subnet = '20.1.2.0/24';
            networkCreateCtrl.newNetwork.gateway = '20.1.2.254';
            networkCreateCtrl.createNetwork();
            $httpBackend.expectPOST(ContivGlobals.NETWORKS_ENDPOINT + networksData[0].key + '/');
            $httpBackend.flush();
            expect(networkCreateCtrl.showLoader).toBeFalsy();
        });

        it('NetworkCreateCtrl.createNetwork() should not do a POST on /api/networks/ REST API for invalid form', function () {
            networkCreateCtrl.form = {'$valid' : false};
            networkCreateCtrl.newNetwork.networkName = 'contiv-net1';
            networkCreateCtrl.newNetwork.subnet = '20.1.2.0/24';
            networkCreateCtrl.newNetwork.gateway = '20.1.2.254';
            networkCreateCtrl.createNetwork();
            $httpBackend.verifyNoOutstandingRequest();
            expect(networkCreateCtrl.showLoader).toBeFalsy();
        });
    });

    describe('networkstats controller', function () {

        var $controller, $state, $stateParams, $interval, $rootScope;
        var networkStatsCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$interval_, _$rootScope_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = networksData[0].key;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            networkStatsCtrl = $controller('NetworkStatsCtrl',
                { $state: $state, $stateParams: $stateParams, $interval: $interval, $scope: $rootScope });
        }));

        it('should be defined', function () {
            expect(networkStatsCtrl).toBeDefined();
            $httpBackend.flush();
        });

        it('NetworkStatsCtrl should do a GET on /netmaster/api/v1/inspect/networks/:key REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NETWORKS_INSPECT_ENDPOINT + networksData[0].key + '/');
            $httpBackend.flush();
        });
        it('buildEndPoints function should construct container list with all the endpoints', function () {
            $httpBackend.flush();
            expect(networkStatsCtrl.endpoints).toBeDefined();
            expect(Array.isArray(networkStatsCtrl.endpoints)).toBeTruthy();
            expect(networkStatsCtrl.endpoints.length).toEqual(networkOperData.Oper.endpoints.length);
        });
        it('buildEndPoints function should construct endpoints object', function () {
            $httpBackend.flush();
            expect(networkStatsCtrl.containerDetails).toBeDefined();
            var len = Object.keys(networkStatsCtrl.containerDetails).length;
            expect(len).toEqual(2);
        });
    });
    
});
