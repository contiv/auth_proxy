'use strict';

describe('contiv.networks module', function () {

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.networks'));

    describe('networklist controller', function () {

        var $httpBackend;
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

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/networks/').respond(networkListData);
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
            var networksListCtrl = $controller('NetworksListCtrl');
            expect(networksListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('NetworkListCtrl should do a GET on /api/networks/ REST API', function () {
            $controller('NetworksListCtrl');
            $httpBackend.expectGET('/api/networks/');
            $httpBackend.flush();
        });

    });

    describe('networkdetails controller', function () {

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should be defined', function () {
            var networkDetailsCtrl = $controller('NetworkDetailsCtrl');
            expect(networkDetailsCtrl).toBeDefined();
        });

    });

    describe('networkcreate controller', function () {

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should be defined', function () {
            var networkCreateCtrl = $controller('NetworkCreateCtrl');
            expect(networkCreateCtrl).toBeDefined();
        });

    });
});
