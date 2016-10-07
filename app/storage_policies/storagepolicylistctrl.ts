/**
 * Created by vjain3 on 4/18/16.
 */
angular.module('contiv.storagepolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.storagepolicies.list', {
                url: '/list',
                controller: 'StoragePolicyListCtrl as storagePolicyListCtrl',
                templateUrl: 'storage_policies/storagepolicylist.html'
            })
        ;
    }])
    .controller('StoragePolicyListCtrl', ['$scope', '$interval', '$filter', 'StoragePoliciesModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, StoragePoliciesModel, CRUDHelperService) {
            var storagePolicyListCtrl = this;

            function getPolicies(reload) {
                StoragePoliciesModel.get(reload)
                    .then(function successCallback(result) {
                        CRUDHelperService.stopLoader(storagePolicyListCtrl);
                        storagePolicyListCtrl.policies = result;
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(storagePolicyListCtrl);
                    });
            }

            //Load from cache for quick display initially
            getPolicies(false);

            var promise;
            //Don't do auto-refresh if one is already in progress
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