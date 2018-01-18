'use strict';

describe('contiv.utils module', function () {
    var networksettingData = [
        {
            "key": "global",
            "name": "global",
            "networkInfraType": "default",
            "vlans": "1-4093",
            "vxlans": "1-10000"
        }
    ];

    beforeEach(module('ui.router'));
    beforeEach(module('contiv.utils'));
    beforeEach(module('contiv.settings'));

    var $httpBackend;
    var NetworkService;
    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.NETWORK_SETTINGS_ENDPOINT).respond(networksettingData);
        $httpBackend.when('POST', ContivGlobals.NETWORK_SETTINGS_ENDPOINT + networksettingData[0].key + '/').respond();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("NetworkService", function () {
        var $controller;
        var ctrl;
        beforeEach(inject(function ( _$controller_, $injector) {
            $controller = _$controller_;
            ctrl = $controller('NetworkSettingCtrl', { });

            NetworkService = $injector.get('NetworkService');
            $httpBackend = $injector.get('$httpBackend');
        }));
        it('should be defined', function () {
            expect(NetworkService).toBeDefined();
            $httpBackend.flush();
        });
        it('NetworkService.getSettings() should do a GET on /netmaster/api/v1/globals/', function () {
            NetworkService.getSettings(ctrl).then(function(response) {
                expect(response).toEqual(networksettingData[0]);
            });
            $httpBackend.expectGET(ContivGlobals.NETWORK_SETTINGS_ENDPOINT);
            $httpBackend.flush();
        });
        it('NetworkService.updateSettings() should do a POST on /netmaster/api/v1/globals/global/', function () {
            ctrl.key = networksettingData[0].key;
            NetworkService.updateSettings(ctrl);
            $httpBackend.expectPOST(ContivGlobals.NETWORK_SETTINGS_ENDPOINT + networksettingData[0].key + '/');
            $httpBackend.flush();
        });
    });   
});
