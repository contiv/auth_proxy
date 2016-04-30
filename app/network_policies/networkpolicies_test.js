/**
 * Created by vjain3 on 3/10/16.
 */
'use strict';

describe('contiv.networkpolicies module', function () {

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.networkpolicies'));

    var policiesData = [
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

    var rulesData = [
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
    var $httpBackend;


    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.POLICIES_ENDPOINT).respond(policiesData);
        $httpBackend.when('GET', ContivGlobals.NETWORKS_ENDPOINT).respond(networksData);
        $httpBackend.when('GET', ContivGlobals.APPLICATIONGROUPS_ENDPOINT).respond(groupsData);
        $httpBackend.when('GET', ContivGlobals.RULES_ENDPOINT).respond(rulesData);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('isolationpolicylistctrl', function () {

        var $controller, $interval, $rootScope;
        var policyListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            policyListCtrl = $controller('IsolationPolicyListCtrl', { $interval: $interval, $scope: $rootScope });
        }));
        it('should be defined', function () {
            //spec body
            expect(policyListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('IsolationPolicyListCtrl should do a GET on /api/policys/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.POLICIES_ENDPOINT);
            $httpBackend.flush();
        });
        it('IsolationPolicyListCtrl should have policy array assigned to policies property', function () {
            $httpBackend.expectGET(ContivGlobals.POLICIES_ENDPOINT);
            $httpBackend.flush();
            expect(Array.isArray(policyListCtrl.policies)).toBeTruthy();
            expect(policyListCtrl.policies.length).toEqual(2);
        });
        it('IsolationPolicyListCtrl should have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.POLICIES_ENDPOINT);
            $httpBackend.flush();
            expect(policyListCtrl.showLoader).toBeFalsy();
        });

    });

    describe('isolationpolicydetailsctrl', function () {

        var $controller, $state, $stateParams;
        var isolationPolicyDetailsCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = policiesData[0].key;
            $controller = _$controller_;
            isolationPolicyDetailsCtrl = $controller('IsolationPolicyDetailsCtrl',
                { $state: $state, $stateParams: $stateParams });
        }));

        it('should be defined', function () {
            expect(isolationPolicyDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });

        it('IsolationPolicyDetailsCtrl should have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.POLICIES_ENDPOINT);
            $httpBackend.flush();
            expect(isolationPolicyDetailsCtrl.showLoader).toBeFalsy();
        });
    });

    describe('isolationpolicycreatectrl', function () {

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should be defined', function () {
            var isolationPolicyCreateCtrl = $controller('IsolationPolicyCreateCtrl');
            expect(isolationPolicyCreateCtrl).toBeDefined();
        });

    });
});
