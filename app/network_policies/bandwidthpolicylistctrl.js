/**
 * Created by hardik gandhi on 6/14/16.
 */

angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.bandwidth.list', {
                url: '/list',
                controller: 'BandwidthPolicyListCtrl as bandwidthPolicyListCtrl',
                templateUrl: 'network_policies/bandwidthpolicylist.html'
            })
        ;
    }])
    .controller('BandwidthPolicyListCtrl', ['$scope', '$interval', '$filter', 'NetprofilesModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, NetprofilesModel, CRUDHelperService) {
            var policiesListCtrl = this;

            function getPolicies(reload) {
                NetprofilesModel.get(reload)
                    .then(function successCallback(result) {
                        CRUDHelperService.stopLoader(policiesListCtrl);
                        policiesListCtrl.policies = $filter('orderBy')(result, 'profileName');
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(policiesListCtrl);
                    });
            }

            //Load from cache for quick display initially
            getPolicies(true);

            var promise;
            //Don't start auto-refresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getPolicies(true);
                }, ContivGlobals.REFRESH_INTERVAL);
            }
            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });


        }]);
