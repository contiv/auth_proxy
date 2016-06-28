'use strict';

describe('contiv.settings module', function () {
    var clustersettingData = {
            "extra_vars": {
                "contiv_network_mode":"standalone",
                "control_interface":"eth0",
                "env": {
                    "HTTPS_PROXY":"http://proxy.esl.cisco.com:8080/",
                    "HTTP_PROXY":"http://proxy.esl.cisco.com:8080/",
                    "NO_PROXY":"localhost,127.0.0.1,netmaster",
                    "http_proxy":"http://proxy.esl.cisco.com:8080/",
                    "https_proxy":"http://proxy.esl.cisco.com:8080/",
                    "no_proxy":"localhost,127.0.0.1,netmaster"
                },
                "fwd_mode":"bridge",
                "http_proxy":"http://proxy.cisco.com",
                "netplugin_if":"eth1",
                "scheduler_provider":"native-swarm",
                "service_vip":"192.168.2.252"
            }
        };

    beforeEach(module('ui.router'));
    beforeEach(module('contiv.settings'));

    var $httpBackend;
    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.NODES_SETTINGS_GET_ENDPOINT).respond(clustersettingData);
        $httpBackend.when('POST', ContivGlobals.NODES_SETTINGS_SET_ENDPOINT).respond();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('clustersettings controller', function () {
        var $controller, $state, $stateParams;
        var clusterSettingCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $controller = _$controller_;
            clusterSettingCtrl = $controller('ClusterSettingCtrl', { $state: $state, $stateParams: $stateParams });
        }));
        it('should be defined', function () {
            expect(clusterSettingCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ClusterSettingCtrl should do a GET on /info/globals/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_SETTINGS_GET_ENDPOINT);
            $httpBackend.flush();
        });
        it('ClusterSettingCtrl should do have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_SETTINGS_GET_ENDPOINT);
            $httpBackend.flush();
            expect(clusterSettingCtrl.showLoader).toBeFalsy();
        });
        it('ClusterSettingCtrl.updateClusterSettings() should do a POST on /globals/', function () {
            clusterSettingCtrl.form = {'$valid' : true};
            clusterSettingCtrl.updateClusterSettings();
            $httpBackend.expectPOST(ContivGlobals.NODES_SETTINGS_SET_ENDPOINT);
            $httpBackend.flush();
        });
        it('ClusterSettingCtrl.updateClusterSettings() should not do a POST on /globals/ REST API for invalid form', function () {
            clusterSettingCtrl.form = {'$valid' : false};
            clusterSettingCtrl.updateClusterSettings();
            $httpBackend.verifyNoOutstandingRequest();
            $httpBackend.flush();
            expect(clusterSettingCtrl.showLoader).toBeFalsy();
        });
        it('ClusterSettingCtrl should have clustersettingData object assigned to setting property', function () {
            $httpBackend.expectGET(ContivGlobals.NODES_SETTINGS_GET_ENDPOINT);
            $httpBackend.flush();
            expect(clusterSettingCtrl.setting).toEqual(clustersettingData);
        });
    });
});