angular.module('contiv.organizations')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.organizations.details', {
                url: '/details/:key',
                controller: 'OrganizationDetailsCtrl as organizationDetailsCtrl',
                templateUrl: 'organizations/organizationdetails.html'
            });
    }])
    .controller('OrganizationDetailsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', '$filter', 'OrganizationsModel', 'CRUDHelperService',
            function ($state, $stateParams, $scope, $interval, $filter, OrganizationsModel, CRUDHelperService) {
                var organizationDetailsCtrl = this;

                function returnToOrganizations() {
                    $state.go('contiv.menu.organizations.list');
                }

                function deleteOrganization() {
                    CRUDHelperService.hideServerError(organizationDetailsCtrl);
                    CRUDHelperService.startLoader(organizationDetailsCtrl);
                    OrganizationsModel.delete(organizationDetailsCtrl.organization).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(organizationDetailsCtrl);
                        returnToOrganizations();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(organizationDetailsCtrl);
                        CRUDHelperService.showServerError(organizationDetailsCtrl, result);
                    });
                }

                CRUDHelperService.stopLoader(organizationDetailsCtrl);
                CRUDHelperService.hideServerError(organizationDetailsCtrl);

                OrganizationsModel.getModelByKey($stateParams.key)
                    .then(function (organization) {
                        organizationDetailsCtrl.organization = organization;
                    });

                organizationDetailsCtrl.deleteOrganization = deleteOrganization;
            }]);