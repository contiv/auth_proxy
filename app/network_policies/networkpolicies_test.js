/**
 * Created by vjain3 on 3/10/16.
 */
'use strict';

describe('contiv.networkpolicies module', function () {

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.networkpolicies'));

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

    describe('isolationpolicylistctrl', function () {

        var $httpBackend;


        beforeEach(inject(function (_$httpBackend_) {
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', ContivGlobals.POLICIES_ENDPOINT).respond(policyListData);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

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

    });

    describe('isolationpolicydetailsctrl', function () {

        var $controller;
        beforeEach(inject(function (_$controller_) {
            $controller = _$controller_;
        }));

        it('should be defined', function () {
            var isolationPolicyDetailsCtrl = $controller('IsolationPolicyDetailsCtrl');
            expect(isolationPolicyDetailsCtrl).toBeDefined();
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
