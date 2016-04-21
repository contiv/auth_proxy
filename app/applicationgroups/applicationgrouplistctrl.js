/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.applicationgroups', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.applicationgroups', {
                url: '/applicationgroups',
                views: {
                    'applicationgroups@': {
                        controller: 'ApplicationGroupListCtrl as applicationGroupListCtrl',
                        templateUrl: 'applicationgroups/applicationgrouplist.html'
                    }
                }
            })
        ;
    })
    .controller('ApplicationGroupListCtrl',
        ['$scope', '$interval', 'ApplicationGroupsModel', function ($scope, $interval, ApplicationGroupsModel) {
            var applicationGroupListCtrl = this;

            function getApplicationGroups(reload) {
                ApplicationGroupsModel.get(reload)
                    .then(function (result) {
                        applicationGroupListCtrl.groups = result;
                    });
            }

            //Load from cache for quick display initially
            getApplicationGroups(false);

            var promise = $interval(function () {
                getApplicationGroups(true);
            }, 5000);

            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });
        }]);
