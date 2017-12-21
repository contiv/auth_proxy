'use strict';

describe('contiv.utils module', function () {
    var clustersettingData = {
            "extra_vars": {
                'contiv_network_mode':"standalone",
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
    beforeEach(module('contiv.utils'));
    beforeEach(module('contiv.settings'));

    var $httpBackend;
    var NodesService;
    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.NODES_SETTINGS_GET_ENDPOINT).respond(clustersettingData);
        $httpBackend.when('POST', ContivGlobals.NODES_SETTINGS_SET_ENDPOINT).respond();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe("NodesService", function () {
        var $controller, $state, $stateParams;
        var ctrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_, $injector) {
            $state = _$state_;
            $stateParams = _$stateParams_;
            $controller = _$controller_;
            ctrl = $controller('ClusterSettingCtrl', { $state: $state, $stateParams: $stateParams });

            NodesService = $injector.get('NodesService');
            $httpBackend = $injector.get('$httpBackend');
        }));
        it('should be defined', function () {
            expect(NodesService).toBeDefined();
            $httpBackend.flush();
        });
        it('NodesService.getSettings() should do a GET on /info/globals', function () {
            NodesService.getSettings(ctrl).then(function(response) {
                expect(response).toEqual(clustersettingData);
            });
            $httpBackend.expectGET(ContivGlobals.NODES_SETTINGS_GET_ENDPOINT);
            $httpBackend.flush();
        });
        it('NodesService.updateSettings() should do GET on /info/globals and a POST on /globals', function () {
            NodesService.updateSettings(ctrl.nodeOpsObj);
            $httpBackend.expectGET(ContivGlobals.NODES_SETTINGS_GET_ENDPOINT);
            $httpBackend.expectPOST(ContivGlobals.NODES_SETTINGS_SET_ENDPOINT);
            $httpBackend.flush();
        });
        it('NodesService.createExtraVars() should create extra_vars', function () {
            expect(ctrl.extra_vars['env']).toBeUndefined();
            NodesService.createExtraVars(ctrl);
            expect(ctrl.extra_vars['env']).toBeDefined();
            $httpBackend.flush();
        });
        it('NodesService.cleanupExtraVars() should clean up extra_vars in standalone mode', function () {
            ctrl.extra_vars['contiv_network_mode'] = 'standalone';
            ctrl.extra_vars['fwd_mode'] = 'Bridge';
            ctrl.extra_vars['apic_url'] = 'url';
            expect(ctrl.extra_vars['apic_url']).toEqual('url');
            NodesService.cleanupExtraVars(ctrl);
            expect(ctrl.extra_vars['apic_url']).toBeUndefined();
            expect(ctrl.extra_vars['fwd_mode']).toEqual('Bridge');
            $httpBackend.flush();
        });
        it('NodesService.cleanupExtraVars() should clean up extra_vars in aci mode', function () {
            ctrl.extra_vars['contiv_network_mode'] = 'aci';
            ctrl.extra_vars['fwd_mode'] = 'Bridge';
            ctrl.extra_vars['apic_url'] = 'url';
            expect(ctrl.extra_vars['fwd_mode']).toEqual('Bridge');
            NodesService.cleanupExtraVars(ctrl);
            expect(ctrl.extra_vars['fwd_mode']).toBeUndefined();
            expect(ctrl.extra_vars['apic_url']).toEqual('url');
            $httpBackend.flush();
        });
        it('NodesService.createEnvVariables() should create environment variables', function () {
            ctrl.extra_vars['env'] = [];
            expect(ctrl.extra_vars['env'].length).toEqual(0);
            NodesService.createEnvVariables(clustersettingData.extra_vars['env'], ctrl.extra_vars['env']);
            expect(ctrl.extra_vars['env'].length).toEqual(6);
            $httpBackend.flush();
        });
        it('NodesService.createAnsibleVariables() should create ansible variables', function () {
            ctrl.ansibleVariables = [];
            expect(ctrl.ansibleVariables.length).toEqual(0);
            NodesService.createAnsibleVariables(clustersettingData.extra_vars, ctrl.ansibleVariables);
            expect(ctrl.ansibleVariables.length).toEqual(1);
            $httpBackend.flush();
        });
    });   
});