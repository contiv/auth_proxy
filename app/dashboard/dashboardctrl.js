/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.dashboard', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.dashboard', {
                url: '/',
                controller: 'DashboardCtrl as dashboardCtrl',
                templateUrl: 'dashboard/dashboard.html'
            });
    })
    .controller('DashboardCtrl',
        [
            '$scope',
            '$interval',
            'NodesModel',
            'NetworksModel',
            'VolumesModel',
            'ApplicationGroupsModel',
            'PoliciesModel',
            'StoragePoliciesModel',
            function ($scope,
                      $interval,
                      NodesModel,
                      NetworksModel,
                      VolumesModel,
                      ApplicationGroupsModel,
                      PoliciesModel,
                      StoragePoliciesModel) {
                var dashboardCtrl = this;

                function getDashboardInfo(reload) {
                    NodesModel.get(reload)
                        .then(function (result) {
                            dashboardCtrl.nodes = result.length;
                        });
                    NetworksModel.get(reload)
                        .then(function (result) {
                            dashboardCtrl.networks = result.length;
                        });
                    VolumesModel.get(reload)
                        .then(function (result) {
                            dashboardCtrl.volumes = result.length;
                        });
                    ApplicationGroupsModel.get(reload)
                        .then(function (result) {
                            dashboardCtrl.groups = result.length;
                        });
                    PoliciesModel.get(reload)
                        .then(function (result) {
                            dashboardCtrl.networkpolicies = result.length;
                        });
                    StoragePoliciesModel.get(reload)
                        .then(function (result) {
                            dashboardCtrl.storagepolicies = result.length;
                        });
                }

                //Will display 0 if there is error fetching data
                dashboardCtrl.nodes = 0;
                dashboardCtrl.networks = 0;
                dashboardCtrl.volumes = 0;
                dashboardCtrl.groups = 0;
                dashboardCtrl.networkpolicies = 0;
                dashboardCtrl.storagepolicies = 0;

                //Load from cache for quick display initially
                getDashboardInfo(false);

                var promise = $interval(function () {
                    getDashboardInfo(true);
                }, 5000);

                //stop polling when user moves away from the page
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });
            }]);
