angular.module('contiv.organizations')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.organizations.list', {
                url: '/list',
                controller: 'OrganizationsListCtrl as organizationsListCtrl',
                templateUrl: 'organizations/organizationlist.html'
            })
        ;
    }])
    .controller('OrganizationsListCtrl', ['$scope', '$interval', '$filter', 'OrganizationsModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, OrganizationsModel, CRUDHelperService) {
            var organizationsListCtrl = this;

            function getOrganizations(reload) {
                OrganizationsModel.get(reload)
                    .then(function successCallback(result) {
                            CRUDHelperService.stopLoader(organizationsListCtrl);
                            organizationsListCtrl.organizations = $filter('orderBy')(result, 'tenantName');
                        },
                        function errorCallback(result) {
                            CRUDHelperService.stopLoader(organizationsListCtrl);
                        });
            }

            //Load from cache for quick display initially
            getOrganizations(false);

            var promise;
            //Don't do autorefresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getOrganizations(true);
                }, ContivGlobals.REFRESH_INTERVAL);
            }

            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });
        }]);