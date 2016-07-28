angular.module('contiv.organizations')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.organizations.create', {
                url: '/create',
                templateUrl: 'organizations/organizationcreate.html',
                controller: 'OrganizationCreateCtrl as organizationCreateCtrl'
            })
        ;
    }])
    .controller('OrganizationCreateCtrl', ['$state', 'OrganizationsModel', 'CRUDHelperService',
        function ($state, OrganizationsModel, CRUDHelperService) {
            var organizationCreateCtrl = this;

            function returnToOrganizations() {
                $state.go('contiv.menu.organizations.list');
            }

            function cancelCreating() {
                returnToOrganizations();
            }

            function createOrganization() {
                //form controller is injected by the html template
                //checking if all validations have passed
                if (organizationCreateCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(organizationCreateCtrl);
                    CRUDHelperService.startLoader(organizationCreateCtrl);
                    organizationCreateCtrl.newOrganization.key = organizationCreateCtrl.newOrganization.tenantName; 
                    OrganizationsModel.create(organizationCreateCtrl.newOrganization).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(organizationCreateCtrl);
                        returnToOrganizations();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(organizationCreateCtrl);
                        CRUDHelperService.showServerError(organizationCreateCtrl, result);
                    });
                }
            }

            function resetForm() {
                CRUDHelperService.stopLoader(organizationCreateCtrl);
                CRUDHelperService.hideServerError(organizationCreateCtrl);
                organizationCreateCtrl.newOrganization = {
                    tenantName: ''
                };
            }

            organizationCreateCtrl.createOrganization = createOrganization;
            organizationCreateCtrl.cancelCreating = cancelCreating;

            resetForm();
        }]);
