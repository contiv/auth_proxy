/**
 * Created by vjain3 on 3/10/16.
 */
'use strict';

describe('contiv.networkpolicies module', function () {

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

    var netprofileData = [
        {
            "DSCP": 10,
            "bandwidth": "10 gbps",
            "key": "default:pr1",
            "link-sets": {
                "EndpointGroups": {
                    "default:g1": {
                        "key": "default:g1",
                        "type": "endpointGroup"
                    }
                }
            },
            "links": {
                "Tenant": {
                    "key": "default",
                    "type": "tenant"
                }
            },
            "profileName": "pr1",
            "tenantName": "default"
        },
        {
            "DSCP": 34,
            "bandwidth": "34 gbps",
            "key": "default:pr2",
            "link-sets": {
                "EndpointGroups": {
                    "default:g2": {
                        "key": "default:g2",
                        "type": "endpointGroup"
                    },
                    "default:g3": {
                        "key": "default:g3",
                        "type": "endpointGroup"
                    }
                }
            },
            "links": {
                "Tenant": {
                    "key": "default",
                    "type": "tenant"
                }
            },
            "profileName": "pr2",
            "tenantName": "default"
        },
        {
            "DSCP": 3,
            "bandwidth": "20 mbps",
            "key": "default:p3",
            "link-sets": {
                "EndpointGroups": {
                    "default:g4": {
                        "key": "default:g4",
                        "type": "endpointGroup"
                    }
                }
            },
            "links": {
                "Tenant": {
                    "key": "default",
                    "type": "tenant"
                }
            },
            "profileName": "p3",
            "tenantName": "default"
        }
    ];

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.networkpolicies'));

    beforeEach(module('contiv.test.directives'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.POLICIES_ENDPOINT).respond(policiesData);
        $httpBackend.when('GET', ContivGlobals.NETWORKS_ENDPOINT).respond(networksData);
        $httpBackend.when('GET', ContivGlobals.APPLICATIONGROUPS_ENDPOINT).respond(groupsData);
        $httpBackend.when('GET', ContivGlobals.RULES_ENDPOINT).respond(rulesData);

        $httpBackend.when('GET', ContivGlobals.NETPROFILES_ENDPOINT).respond(netprofileData);
        $httpBackend.when('DELETE', ContivGlobals.NETPROFILES_ENDPOINT + netprofileData[0].key + '/').respond(netprofileData[0]);
        $httpBackend.when('POST', ContivGlobals.NETPROFILES_ENDPOINT + netprofileData[0].key + '/').respond(netprofileData[0]);
        $httpBackend.when('PUT', ContivGlobals.NETPROFILES_ENDPOINT + netprofileData[0].key + '/').respond(netprofileData[0]);
    }));


    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('bandwidthpolicylistctrl', function () {

        var $controller, $interval, $rootScope;
        var policyListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            policyListCtrl = $controller('BandwidthPolicyListCtrl', { $interval: $interval, $scope: $rootScope });
        }));
        it('should be defined', function () {
            //spec body
            expect(policyListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('BandwidthPolicyListCtrl should do a GET on /api/v1/netprofiles/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.NETPROFILES_ENDPOINT);
            $httpBackend.flush();
        });
        it('BandwidthPolicyListCtrl should have policy array assigned to policies property', function () {
            $httpBackend.expectGET(ContivGlobals.NETPROFILES_ENDPOINT);
            $httpBackend.flush();
            expect(Array.isArray(policyListCtrl.policies)).toBeTruthy();
            expect(policyListCtrl.policies.length).toEqual(3);
        });
        it('BandwidthPolicyListCtrl should have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.NETPROFILES_ENDPOINT);
            $httpBackend.flush();
            expect(policyListCtrl.showLoader).toBeFalsy();
        });

    });


    describe('bandwidthpolicydetailsctrl', function () {

        var $controller, $state, $stateParams;
        var bandwidthPolicyDetailsCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = netprofileData[0].key;
            $controller = _$controller_;
            bandwidthPolicyDetailsCtrl = $controller('BandwidthPolicyDetailsCtrl',
                { $state: $state, $stateParams: $stateParams });
        }));

        it('should be defined', function () {
            expect(bandwidthPolicyDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });

        it('BandwidthPolicyDetailsCtrl should have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.NETPROFILES_ENDPOINT);
            $httpBackend.flush();
            expect(bandwidthPolicyDetailsCtrl.showLoader).toBeFalsy();
        });

        it('BandwidthPolicyDetailsCtrl.deletePolicy() should do a DELETE on /api/v1/netprofiles/ REST API', function () {
            //Call flush to fulfill all the http requests to get netprofile policys before calling deleteNetwork()
            $httpBackend.flush();
            bandwidthPolicyDetailsCtrl.deletePolicy();
            $httpBackend.expectDELETE(ContivGlobals.NETPROFILES_ENDPOINT + netprofileData[0].key + '/');
            $httpBackend.flush();
            expect(bandwidthPolicyDetailsCtrl.showLoader).toBeFalsy();
        });

        it('BandwidthPolicyDetailsCtrl.savePolicy() should do a PUT on /api/v1/netprofiles/ REST API', function() {
            $httpBackend.flush();
            bandwidthPolicyDetailsCtrl.form = {'$valid' : true};
            bandwidthPolicyDetailsCtrl.policy.bandwidthNumber = '10';
            bandwidthPolicyDetailsCtrl.policy.bandwidthUnit = 'gbps';
            bandwidthPolicyDetailsCtrl.policy.DSCP = 10;
            bandwidthPolicyDetailsCtrl.savePolicy();
            $httpBackend.expectPUT(ContivGlobals.NETPROFILES_ENDPOINT + netprofileData[0].key + '/');
            $httpBackend.flush();
            expect(bandwidthPolicyDetailsCtrl.showLoader).toBeFalsy();
        });

    });

    describe('bandwidthpolicycreatectrl', function () {

        var $controller,$state,$stateParams;
        var bandwidthPolicyCreateCtrl;
        beforeEach(inject(function (_$state_,_$stateParams_, _$controller_) {
            $controller = _$controller_;
            $state = _$state_;
            $stateParams = _$stateParams_;
            
            $state.go = function (stateName) {};
            $stateParams.key = netprofileData[0].key;
            bandwidthPolicyCreateCtrl = $controller('BandwidthPolicyCreateCtrl',
                { $state: $state});
        }));

        it('should be defined', function () {
            var bandwidthPolicyCreateCtrl = $controller('BandwidthPolicyCreateCtrl');
            expect(bandwidthPolicyCreateCtrl).toBeDefined();
        });


        it('BandwidthPolicyCreateCtrl.createPolicy should do a POST on /api/v1/netprofiles/ REST API', function () {
            bandwidthPolicyCreateCtrl.form = {'$valid' : true};
            bandwidthPolicyCreateCtrl.newPolicy.profileName = 'pr1';
            bandwidthPolicyCreateCtrl.bandwidthNumber = '10';
            bandwidthPolicyCreateCtrl.bandwidthUnit = 'gbps'
            bandwidthPolicyCreateCtrl.newPolicy.DSCP = 10;
            bandwidthPolicyCreateCtrl.createPolicy();
            $httpBackend.expectPOST(ContivGlobals.NETPROFILES_ENDPOINT + netprofileData[0].key + '/');
            $httpBackend.flush();
            expect(bandwidthPolicyCreateCtrl.showLoader).toBeFalsy();
        });

        it('BandwidthPolicyCreateCtrl.createPolicy should not do a POST on /api/v1/netprofiles/ REST API', function () {
            bandwidthPolicyCreateCtrl.form = {'$valid' : false};
            bandwidthPolicyCreateCtrl.newPolicy.profileName = 'pr1';
            bandwidthPolicyCreateCtrl.bandwidthNumber = '10';
            bandwidthPolicyCreateCtrl.bandwidthUnit = 'gbps'
            bandwidthPolicyCreateCtrl.newPolicy.DSCP = 10;
            bandwidthPolicyCreateCtrl.createPolicy();
            $httpBackend.verifyNoOutstandingRequest();
            expect(bandwidthPolicyCreateCtrl.showLoader).toBeFalsy();
        });
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
    

    describe('bandwidth directive', function () {
        var element;
        var $rootScope,$compile;

        var policy = netprofileData[0];
        var mode_var = "create";
        
        beforeEach(inject(function(_$compile_,_$rootScope_){
            // The injector unwraps the underscores (_) from around the parameter names when matching
            $rootScope = _$rootScope_;
            $compile = _$compile_;

        }));
        beforeEach(inject(function() {
            // Compile a piece of HTML containing the directive

            element = $compile("<ctv-bandwidth mode=mode_var bandwidth-policy=policy></ctv-bandwidth>")($rootScope);
            $rootScope.policy=policy;
            $rootScope.mode = mode_var;
            // fire all the watches, so the scope expression will be evaluated
            $rootScope.$digest();
        }));
        it('Replaces the element with the appropriate content', function () {
            expect(element.html()).toContain("<div ng-switch=\"mode\">");
            
        });
    });
});
