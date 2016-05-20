/**
 * Created by vjain3 on 5/11/16.
 */
angular.module('contiv.servicelbs')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.servicelbs.list', {
                url: '/list',
                controller: 'ServicelbListCtrl as servicelbListCtrl',
                templateUrl: 'service_lbs/servicelblist.html'
            })
        ;
    }])
    .controller('ServicelbListCtrl', ['$scope', '$interval', '$filter', 'ServicelbsModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, ServicelbsModel, CRUDHelperService) {
            var servicelbListCtrl = this;

            function getServicelbs(reload) {
                ServicelbsModel.get(reload)
                    .then(function successCallback(result) {
                            CRUDHelperService.stopLoader(servicelbListCtrl);
                            servicelbListCtrl.servicelbs = $filter('orderBy')(result, 'serviceName');
                        },
                        function errorCallback(result) {
                            CRUDHelperService.stopLoader(servicelbListCtrl);
                        });
            }

            //Load from cache for quick display initially
            getServicelbs(false);

            var promise;
            //Don't do autorefresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getServicelbs(true);
                }, ContivGlobals.REFRESH_INTERVAL);
            }

            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });
        }]);
