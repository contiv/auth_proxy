'use strict';

describe('contiv.organizations module', function () {
    var organizationsData = [
        {
            "key": "org1",
            "tenantName": "org1",
            "link-sets": {}
        }
    ];

    beforeEach(module('ui.router'));
    beforeEach(module('contiv.organizations'));

    var $httpBackend;
    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.ORGANIZATIONS_ENDPOINT).respond(organizationsData);
        $httpBackend.when('DELETE', ContivGlobals.ORGANIZATIONS_ENDPOINT + organizationsData[0].key + '/').respond(organizationsData[0]);
        $httpBackend.when('POST', ContivGlobals.ORGANIZATIONS_ENDPOINT + organizationsData[0].key + '/').respond(organizationsData[0]);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('organizationlist controller', function () {
        var $controller, $interval, $rootScope;
        var organizationListCtrl;
        beforeEach(inject(function (_$interval_, _$rootScope_, _$controller_) {
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            organizationListCtrl = $controller('OrganizationsListCtrl', { $interval: $interval, $scope: $rootScope });
        }));
        it('should be defined', function () {
            expect(organizationListCtrl).toBeDefined();
            $httpBackend.flush();
        });
        it('OrganizationsListCtrl should do a GET on /api/organizations/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.ORGANIZATIONS_ENDPOINT);
            $httpBackend.flush();
        });
        it('OrganizationsListCtrl should have organizations array assigned to organizations property', function () {
            $httpBackend.expectGET(ContivGlobals.ORGANIZATIONS_ENDPOINT);
            $httpBackend.flush();
            expect(Array.isArray(organizationListCtrl.organizations)).toBeTruthy();
            expect(organizationListCtrl.organizations.length).toEqual(1);
        });
        it('OrganizationsListCtrl should do have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.ORGANIZATIONS_ENDPOINT);
            $httpBackend.flush();
            expect(organizationListCtrl.showLoader).toBeFalsy();
        });
    });

    describe('organizationdetails controller', function () {
        var $controller, $state, $stateParams, $interval, $rootScope;
        var organizationDetailsCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$interval_, _$rootScope_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = organizationsData[0].key;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            organizationDetailsCtrl = $controller('OrganizationDetailsCtrl',
                { $state: $state, $stateParams: $stateParams, $interval: $interval, $scope: $rootScope });
        }));

        it('should be defined', function () {
            expect(organizationDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });

        it('OrganizationDetailsCtrl should do a GET on /api/organizations/ REST API', function () {
            $httpBackend.expectGET(ContivGlobals.ORGANIZATIONS_ENDPOINT);
            $httpBackend.flush();
        });

        it('OrganizationDetailsCtrl should have organization object assigned to organization property', function () {
            $httpBackend.expectGET(ContivGlobals.ORGANIZATIONS_ENDPOINT);
            $httpBackend.flush();
            expect(organizationDetailsCtrl.organization).toEqual(organizationsData[0]);
        });

        it('OrganizationDetailsCtrl.deleteOrganization() should do a DELETE on /api/organizations/ REST API', function () {
            //Call flush to fulfill all the http requests to get organization before calling deleteOrganization()
            $httpBackend.flush();
            organizationDetailsCtrl.deleteOrganization();
            $httpBackend.expectDELETE(ContivGlobals.ORGANIZATIONS_ENDPOINT + organizationsData[0].key + '/');
            $httpBackend.flush();
            expect(organizationDetailsCtrl.showLoader).toBeFalsy();
        });

        it('OrganizationDetailsCtrl should do have showLoader property set to false after fetch', function () {
            $httpBackend.expectGET(ContivGlobals.ORGANIZATIONS_ENDPOINT);
            $httpBackend.flush();
            expect(organizationDetailsCtrl.showLoader).toBeFalsy();
        });
    });
    
    describe('organizationcreate controller', function () {
        var $controller, $state, $stateParams;
        var organizationCreateCtrl;
        beforeEach(inject(function (_$state_ ,_$stateParams_, _$controller_) {
            $state = _$state_;
            $state.go = function (stateName) {};
            $stateParams = _$stateParams_;
            $stateParams.key = organizationsData[0].key;
            $controller = _$controller_;
            organizationCreateCtrl = $controller('OrganizationCreateCtrl');
        }));

        it('should be defined', function () {
            expect(organizationCreateCtrl).toBeDefined();
        });

        it('OrganizationCreateCtrl should have new organization object initialized', function () {
            expect(organizationCreateCtrl.newOrganization).toBeDefined();
            expect(organizationCreateCtrl.newOrganization.tenantName).toEqual('');
        });

        it('OrganizationCreateCtrl.createOrganization() should do a POST on /api/organizations/ REST API', function () {
            organizationCreateCtrl.form = {'$valid' : true};
            organizationCreateCtrl.newOrganization.tenantName = 'org1';
            organizationCreateCtrl.createOrganization();
            $httpBackend.expectPOST(ContivGlobals.ORGANIZATIONS_ENDPOINT + organizationsData[0].key + '/');
            $httpBackend.flush();
            expect(organizationCreateCtrl.showLoader).toBeFalsy();
        });

        it('OrganizationCreateCtrl.createOrganization() should not do a POST on /api/organizations/ REST API for invalid form', function () {
            organizationCreateCtrl.form = {'$valid' : false};
            organizationCreateCtrl.newOrganization.tenantName = 'org1';
            organizationCreateCtrl.createOrganization();
            $httpBackend.verifyNoOutstandingRequest();
            expect(organizationCreateCtrl.showLoader).toBeFalsy();
        });
    });


});