/**
 * Created by vjain3 on 5/13/16.
 */
'use strict';

describe('contiv.servicelbs module', function () {

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.servicelbs'));

    var servicelbListData = [
        {
            key: "default:web",
            serviceName: 'web',
            selectors: ['io.contiv1=web','io.contiv2=proxy','io.contiv3=front-end','io.contiv4=ui','io.contiv5=ux'],
            ports: ['80:8080:tcp'],
            networkName: 'contiv-net1',
            ipAddress: '20.1.1.24',
            tenantName: "default",
            "link-sets": {},
            links: {
                "Network": {},
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        },
        {
            key: "default:app",
            serviceName: 'app',
            selectors: ['io.contiv1=app','io.contiv2=middleware'],
            ports: ['80:8080:tcp'],
            networkName: 'contiv-net1',
            ipAddress: '20.1.1.24',
            tenantName: "default",
            "link-sets": {
            },
            links: {
                Network: {},
                Tenant: {
                    type: "tenant",
                    key: "default"
                }
            }
        }
    ];

    var networkListData = [
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

    var servicelbOperData = {
        "Oper":{
            "numProviders":3,
            "providers":[
                {
                    "containerID":"62e6dfd7b5de1b0faf8c8c1c12f87862b6f7f6daa4f55e3bfcc6a5171c67637c",
                    "homingHost":"cluster-node1",
                    "ipAddress":[
                        "20.1.1.3",
                        ""
                    ],
                    "labels":"map[app:web com.docker.swarm.id:359cfcc54ee996864ed1e31d4313297aa7b726e0f8244694d63282679dfcf6ba]",
                    "macAddress":"02:02:14:01:01:03",
                    "name":"182d045f309960e4e83d5f65cf7dbdb63aaa37e9c4642e2086e5989511ef9afa",
                    "network":"contiv-net1.default",
                    "serviceName":"serviceLb1"
                },
                {
                    "containerID":"e1d8ae7112564b4029f218cb9fa239359937e77a3bfaf259a4be788b889b1369",
                    "homingHost":"cluster-node1",
                    "ipAddress":[
                        "20.1.1.4",
                        ""
                    ],
                    "labels":"map[app:web com.docker.swarm.id:5460ddf75d46c10f8a91b7f52ab2b4aa397c43c41c376773b98f44c7fc18d878]",
                    "macAddress":"02:02:14:01:01:04",
                    "name":"957c34540c5d9515698547d62263a080b0b8c0ca5d586cdd6c6d983f4a837231",
                    "network":"contiv-net1.default",
                    "serviceName":"serviceLb1"
                },
                {
                    "containerID":"fbc5e16d9a2c1211d80c36e3e8c4bf7243f1478586941c6a50db2fe226174d4e",
                    "homingHost":"cluster-node1",
                    "ipAddress":[
                        "20.1.1.5",
                        ""
                    ],
                    "labels":"map[app:web com.docker.swarm.id:4555870c6d4af62b63ece84001271129cd437ee2abb72cf94c244f9a739e7827 env:prod]",
                    "macAddress":"02:02:14:01:01:05",
                    "name":"b31de2e1be08e6b741210f8028ed442393b49bd2bfbf81c7085cab10454cead0",
                    "network":"contiv-net1.default",
                    "serviceName":"serviceLb1"
                }
            ],
            "serviceVip":"20.1.1.2"
        }
    }


    describe('servicelbslistctrl', function () {
        var $httpBackend;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', ContivGlobals.SERVICELBS_ENDPOINT).respond(servicelbListData);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        var $controller, $interval, $rootScope;
        var servicelbListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            servicelbListCtrl = $controller('ServicelbListCtrl', { $interval: $interval, $scope: $rootScope });
        }));
        it('should be defined', function () {
            //spec body
            expect(servicelbListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ServicelbListCtrl should do a GET on /api/serviceLBs/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
        });
        it('ServicelbListCtrl should have servicelbs array assigned to servicelbs property', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
            expect(Array.isArray(servicelbListCtrl.servicelbs)).toBeTruthy();
            expect(servicelbListCtrl.servicelbs.length).toEqual(2);
        });
        it('ServicelbListCtrl should have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
            expect(servicelbListCtrl.showLoader).toBeFalsy();
        });
    });

    describe('servicelbscreatectrl', function () {

        var $httpBackend;

        beforeEach(inject(
            function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', ContivGlobals.NETWORKS_ENDPOINT).respond(networkListData);;
            }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));
        it('should be defined', function () {
            //spec body
            var servicelbCreateCtrl = $controller(
                'ServicelbCreateCtrl');
            expect(servicelbCreateCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ServicelbCreateCtrl should do a GET on /api/networks/ REST API', function () {
            $controller('ServicelbCreateCtrl');
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
        });

    });

    describe('servicelbsdetailsctrl', function () {

        var $httpBackend, $state, $stateParams, $controller;
        var servicelbDetailsCtrl;

        beforeEach(inject(function (_$httpBackend_, _$state_, _$stateParams_, _$controller_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', ContivGlobals.SERVICELBS_ENDPOINT).respond(servicelbListData);
            $httpBackend.when('PUT', ContivGlobals.SERVICELBS_ENDPOINT + servicelbListData[0].key + '/').respond(servicelbListData[0]);
            $httpBackend.when('DELETE', ContivGlobals.SERVICELBS_ENDPOINT + servicelbListData[0].key + '/').respond(servicelbListData[0]);
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = servicelbListData[0].key;
            $controller = _$controller_;
            servicelbDetailsCtrl = $controller('ServicelbDetailsCtrl');
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });


        it('should be defined', function () {
            //spec body
            expect(servicelbDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ServicelbDetailsCtrl should do a GET on /api/serviceLBs/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
        });
        it('ServicelbDetailsCtrl.saveServicelb() should do a PUT on /api/serviceLBs/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
            servicelbDetailsCtrl.saveServicelb();
            $httpBackend.expectPUT(ContivGlobals.SERVICELBS_ENDPOINT+ servicelbListData[0].key + '/');
            $httpBackend.flush();
            expect(servicelbDetailsCtrl.showLoader).toBeFalsy();
        });
        it('ServicelbDetailsCtrl.deleteServicelb() should do a DELETE on /api/serviceLBs/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
            servicelbDetailsCtrl.deleteServicelb();
            $httpBackend.expectDELETE(ContivGlobals.SERVICELBS_ENDPOINT + servicelbListData[0].key + '/');
            $httpBackend.flush();
            expect(servicelbDetailsCtrl.showLoader).toBeFalsy();
        });
        it('ServicelbDetailsCtrl should have servicelb object assigned to servicelb property', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
            expect(servicelbDetailsCtrl.servicelb).toEqual(servicelbListData[0]);
        });
        it('ServicelbDetailsCtrl should have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_ENDPOINT);
            $httpBackend.flush();
            expect(servicelbDetailsCtrl.showLoader).toBeFalsy();
        });
    });

    describe('ServicelbStatsCtrl', function () {

        var $controller, $state, $stateParams, $interval, $rootScope, $httpBackend;
        var servicelbStatsCtrl;
        
        
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$rootScope_, _$interval_, _$controller_, _$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', ContivGlobals.SERVICELBS_INSPECT_ENDPOINT+servicelbListData[0].key+'/').respond(servicelbOperData);
            $state = _$state_;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $stateParams = _$stateParams_;
            $stateParams.key = servicelbListData[0].key;
            $controller = _$controller_;
            servicelbStatsCtrl = $controller('ServicelbStatsCtrl',{ $state: $state, $stateParams: $stateParams, $scope: $rootScope, $interval: $interval});
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should be defined', function () {
            expect(servicelbStatsCtrl).toBeDefined();
            $httpBackend.flush();

        });
        it('servicelbStatsCtrl should do a GET on /api/v1/inspect/serviceLBs/default:serviceLb1/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.SERVICELBS_INSPECT_ENDPOINT+servicelbListData[0].key+'/');
            $httpBackend.flush();
        });
        it('servicelbStatsCtrl should construct providers object', function () {
            $httpBackend.flush();
            expect(servicelbStatsCtrl.providers).toBeDefined();
            expect(Array.isArray(servicelbStatsCtrl.providers)).toBeTruthy();
            expect(servicelbStatsCtrl.providers.length).toEqual(servicelbOperData.Oper.providers.length);
        });
        it('servicelbStatsCtrl should construct providerDetails object', function () {
            $httpBackend.flush();
            expect(servicelbStatsCtrl.providerDetails).toBeDefined();
            var len = Object.keys(servicelbStatsCtrl.providerDetails).length;
            expect(len).toEqual(3);
        });
    });
});
