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

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.networks'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
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
        });
    });

    describe('networkcreate controller', function () {

        var $controller, $state, $stateParams;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = networksData[0].key;
            $controller = _$controller_;
        }));

        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should be defined', function () {
            var networkCreateCtrl = $controller('NetworkCreateCtrl');
            expect(networkCreateCtrl).toBeDefined();
        });

        it('NetworkCreateCtrl should have new network object initialized', function () {
            var networkCreateCtrl = $controller('NetworkCreateCtrl');
            expect(networkCreateCtrl.newNetwork).toBeDefined();
            expect(networkCreateCtrl.newNetwork.encap).toEqual('vxlan');
            expect(networkCreateCtrl.newNetwork.tenantName).not.toEqual('');
            expect(networkCreateCtrl.newNetwork.networkName).toEqual('');
            expect(networkCreateCtrl.newNetwork.subnet).toEqual('');
            expect(networkCreateCtrl.newNetwork.gateway).toEqual('');
        });

        it('NetworkCreateCtrl.createNetwork() should do a POST on /api/networks/ REST API', function () {
            var networkCreateCtrl = $controller('NetworkCreateCtrl');
            networkCreateCtrl.form = {'$valid' : true};
            networkCreateCtrl.newNetwork.networkName = 'contiv-net1';
            networkCreateCtrl.newNetwork.subnet = '20.1.2.0/24';
            networkCreateCtrl.newNetwork.gateway = '20.1.2.254';
            networkCreateCtrl.createNetwork();
            $httpBackend.expectPOST(ContivGlobals.NETWORKS_ENDPOINT + networksData[0].key + '/');
            $httpBackend.flush();
        });

        it('NetworkCreateCtrl.createNetwork() should not do a POST on /api/networks/ REST API for invalid form', function () {
            var networkCreateCtrl = $controller('NetworkCreateCtrl');
            networkCreateCtrl.form = {'$valid' : false};
            networkCreateCtrl.newNetwork.networkName = 'contiv-net1';
            networkCreateCtrl.newNetwork.subnet = '20.1.2.0/24';
            networkCreateCtrl.newNetwork.gateway = '20.1.2.254';
            networkCreateCtrl.createNetwork();
            $httpBackend.verifyNoOutstandingRequest();
        });
    });
});
