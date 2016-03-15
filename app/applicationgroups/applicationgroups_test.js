'use strict';

describe('contiv.applicationgroups module', function () {

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.models'));
    beforeEach(module('contiv.applicationgroups'));

    var groupListData = [
        {
            "key": "default:contiv-net3:prod_web",
            "endpointGroupId": 2,
            "groupName": "prod_web",
            "networkName": "contiv-net3",
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
                "Network": {},
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        }
    ];

    var policyListData = [
        {
            "key": "default:middleware_net_policy",
            "policyName": "middleware_net_policy",
            "tenantName": "default",
            "link-sets": {},
            "links": {
                "Tenant": {
                    "type": "tenant",
                    "key": "default"
                }
            }
        },
        {
            "key": "default:db_net_policy",
            "policyName": "db_net_policy",
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

    var ruleListData = [
        {
            "key": "default:middleware-net-policy:1",
            "action": "allow",
            "direction": "out",
            "policyName": "middleware-net-policy",
            "priority": 1,
            "protocol": "tcp",
            "ruleId": "1",
            "tenantName": "default",
            "link-sets": {
                "Policies": {
                    "default:middleware-net-policy": {
                        "type": "policy",
                        "key": "default:middleware-net-policy"
                    }
                }
            }
        },
        {
            "key": "default:proxy-net-policy:1",
            "action": "allow",
            "direction": "in",
            "policyName": "proxy-net-policy",
            "port": 443,
            "priority": 1,
            "protocol": "tcp",
            "ruleId": "1",
            "tenantName": "default",
            "link-sets": {
                "Policies": {
                    "default:proxy-net-policy": {
                        "type": "policy",
                        "key": "default:proxy-net-policy"
                    }
                }
            }
        },
        {
            "key": "default:proxy-net-policy:2",
            "action": "allow",
            "direction": "in",
            "policyName": "proxy-net-policy",
            "port": 80,
            "priority": 1,
            "protocol": "tcp",
            "ruleId": "2",
            "tenantName": "default",
            "link-sets": {
                "Policies": {
                    "default:proxy-net-policy": {
                        "type": "policy",
                        "key": "default:proxy-net-policy"
                    }
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

    describe('applicationgroupslistctrl', function () {

        var $httpBackend;

        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/endpointGroups/').respond(groupListData);
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
            var groupListCtrl = $controller('ApplicationGroupListCtrl');
            expect(groupListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ApplicationGroupListCtrl should do a GET on /api/endpointGroups/ REST API', function () {
            $controller('ApplicationGroupListCtrl');
            $httpBackend.expectGET('/api/endpointGroups/');
            $httpBackend.flush();
        });

    });

    describe('applicationgroupscreatectrl', function () {

        var $httpBackend, ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel;

        beforeEach(inject(
            function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', '/api/networks/').respond(networkListData);
                $httpBackend.when('GET', '/api/policys/').respond(policyListData);
                $httpBackend.when('GET', '/api/rules/').respond(ruleListData);
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
            var groupCreateCtrl = $controller(
                'ApplicationGroupCreateCtrl', ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel);
            expect(groupCreateCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ApplicationGroupCreateCtrl should do a GET on /api/networks/ REST API', function () {
            $controller('ApplicationGroupCreateCtrl', ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel);
            $httpBackend.expectGET('/api/networks/');
            $httpBackend.flush();
        });
        it('ApplicationGroupCreateCtrl should do a GET on /api/policys/ REST API', function () {
            $controller('ApplicationGroupCreateCtrl', ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel);
            $httpBackend.expectGET('/api/policys/');
            $httpBackend.flush();
        });
        it('ApplicationGroupCreateCtrl.addIsolationPolicy() should do a GET on /api/rules/ REST API', function () {
            var groupCreateCtrl = $controller(
                'ApplicationGroupCreateCtrl', ApplicationGroupsModel, NetworksModel, PoliciesModel, RulesModel);
            groupCreateCtrl.selectedPolicy = policyListData[0];
            groupCreateCtrl.addIsolationPolicy();
            $httpBackend.expectGET('/api/rules/');
            $httpBackend.flush();
        });
    });

});