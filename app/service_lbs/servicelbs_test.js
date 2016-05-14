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
});
