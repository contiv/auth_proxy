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
            $httpBackend.when('GET', ContivGlobals.APPLICATIONGROUPS_ENDPOINT).respond(groupListData);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        var $controller, $interval, $rootScope;
        var groupListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            groupListCtrl = $controller('ApplicationGroupListCtrl', { $interval: $interval, $scope: $rootScope });
        }));
        it('should be defined', function () {
            //spec body
            expect(groupListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ApplicationGroupListCtrl should do a GET on /api/endpointGroups/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.APPLICATIONGROUPS_ENDPOINT);
            $httpBackend.flush();
        });

    });

    describe('applicationgroupscreatectrl', function () {

        var $httpBackend;

        beforeEach(inject(
            function (_$httpBackend_) {
                $httpBackend = _$httpBackend_;
                $httpBackend.when('GET', ContivGlobals.NETWORKS_ENDPOINT).respond(networkListData);
                $httpBackend.when('GET', ContivGlobals.POLICIES_ENDPOINT).respond(policyListData);
                $httpBackend.when('GET', ContivGlobals.RULES_ENDPOINT).respond(ruleListData);
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
                'ApplicationGroupCreateCtrl');
            expect(groupCreateCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ApplicationGroupCreateCtrl should do a GET on /api/networks/ REST API', function () {
            $controller('ApplicationGroupCreateCtrl');
            $httpBackend.expectGET(ContivGlobals.NETWORKS_ENDPOINT);
            $httpBackend.flush();
        });
        it('ApplicationGroupCreateCtrl should do a GET on /api/policys/ REST API', function () {
            $controller('ApplicationGroupCreateCtrl');
            $httpBackend.expectGET(ContivGlobals.POLICIES_ENDPOINT);
            $httpBackend.flush();
        });
        it('ApplicationGroupCreateCtrl.addIsolationPolicy() should do a GET on /api/rules/ REST API', function () {
            var groupCreateCtrl = $controller(
                'ApplicationGroupCreateCtrl');
            groupCreateCtrl.selectedPolicy = policyListData[0];
            groupCreateCtrl.addIsolationPolicy();
            $httpBackend.expectGET(ContivGlobals.RULES_ENDPOINT);
            $httpBackend.flush();
        });
    });

    describe('applicationgroupsdetailsctrl', function () {

        var $httpBackend, $state, $stateParams;

        beforeEach(inject(function (_$httpBackend_, _$state_, _$stateParams_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', ContivGlobals.APPLICATIONGROUPS_ENDPOINT).respond(groupListData);
            $httpBackend.when('GET', ContivGlobals.POLICIES_ENDPOINT).respond(policyListData);
            $httpBackend.when('GET', ContivGlobals.RULES_ENDPOINT).respond(ruleListData);
            $httpBackend.when('PUT', ContivGlobals.APPLICATIONGROUPS_ENDPOINT + groupListData[0].key + '/').respond(groupListData[0]);
            $httpBackend.when('DELETE', ContivGlobals.APPLICATIONGROUPS_ENDPOINT + groupListData[0].key + '/').respond(groupListData[0]);
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = groupListData[0].key;
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
            var groupDetailsCtrl = $controller('ApplicationGroupDetailsCtrl');
            expect(groupDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('ApplicationGroupDetailsCtrl should do a GET on /api/endpointGroups/ REST API', function () {
            $controller('ApplicationGroupDetailsCtrl');
            $httpBackend.expectGET(ContivGlobals.APPLICATIONGROUPS_ENDPOINT);
            $httpBackend.flush();
        });
        it('ApplicationGroupDetailsCtrl should do a GET on /api/policys/ REST API', function () {
            $controller('ApplicationGroupDetailsCtrl');
            $httpBackend.expectGET(ContivGlobals.POLICIES_ENDPOINT);
            $httpBackend.flush();
        });
        it('ApplicationGroupDetailsCtrl should do a GET on /api/rules/ REST API', function () {
            $controller('ApplicationGroupDetailsCtrl');
            $httpBackend.expectGET(ContivGlobals.RULES_ENDPOINT);
            $httpBackend.flush();
        });
        it('ApplicationGroupDetailsCtrl.saveApplicationGroup() should do a PUT on /api/endpointGroups/ REST API', function () {
            var groupDetailsCtrl = $controller('ApplicationGroupDetailsCtrl');
            groupDetailsCtrl.applicationGroup = groupListData[0];
            groupDetailsCtrl.saveApplicationGroup();
            $httpBackend.expectPUT(ContivGlobals.APPLICATIONGROUPS_ENDPOINT+ groupListData[0].key + '/');
            $httpBackend.flush();
        });
        it('ApplicationGroupDetailsCtrl.deleteApplicationGroup() should do a DELETE on /api/endpointGroups/ REST API', function () {
            var groupDetailsCtrl = $controller('ApplicationGroupDetailsCtrl');
            groupDetailsCtrl.applicationGroup = groupListData[0];
            groupDetailsCtrl.deleteApplicationGroup();
            $httpBackend.expectDELETE(ContivGlobals.APPLICATIONGROUPS_ENDPOINT + groupListData[0].key + '/');
            $httpBackend.flush();
        });
    });
});