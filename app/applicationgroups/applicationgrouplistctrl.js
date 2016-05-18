/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.applicationgroups')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.applicationgroups.list', {
                url: '/list',
                controller: 'ApplicationGroupListCtrl as applicationGroupListCtrl',
                templateUrl: 'applicationgroups/applicationgrouplist.html'
            })
        ;
    }])
    .controller('ApplicationGroupListCtrl',
        ['$scope', '$interval', '$filter', 'ApplicationGroupsModel', 'CRUDHelperService',
            function ($scope, $interval, $filter, ApplicationGroupsModel, CRUDHelperService) {
                var applicationGroupListCtrl = this;

                function getApplicationGroups(reload) {
                    ApplicationGroupsModel.get(reload)
                        .then(function successCallback(result) {
                            CRUDHelperService.stopLoader(applicationGroupListCtrl);
                            applicationGroupListCtrl.groups = $filter('orderBy')(result, 'groupName');
                        }, function errorCallback(result) {
                            CRUDHelperService.stopLoader(applicationGroupListCtrl);
                        });
                }

                //Load from cache for quick display initially
                getApplicationGroups(false);

                var promise;
                //Don't start auto-refresh if one is already in progress
                if (!angular.isDefined(promise)) {
                    promise = $interval(function () {
                        getApplicationGroups(true);
                    }, 5000);
                }
                //stop polling when user moves away from the page
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });
            }]);
