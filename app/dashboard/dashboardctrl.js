/**
 * Created by vjain3 on 3/11/16.
 */
angular.module('contiv.dashboard', [])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.dashboard', {
                url: '/',
                views: {
                    //target the ui-view named 'networks' in ROOT state (contiv)
                    'dashboard@': {
                        controller: 'DashboardCtrl as dashboardCtrl',
                        templateUrl: 'dashboard/dashboard.html'
                    }
                }

            });
    })
    .controller('DashboardCtrl', function () {
    });
