angular.module('contiv.networks')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networks.details', {
                url: '/details/:key',
                controller: 'NetworkDetailsCtrl as networkDetailsCtrl',
                templateUrl: 'networks/networkdetails.html'
            });
    }])
    .controller('NetworkDetailsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', '$filter', 'NetworksModel', 'ApplicationGroupsModel', 'CRUDHelperService',
            function ($state, $stateParams, $scope, $interval, $filter, NetworksModel, ApplicationGroupsModel, CRUDHelperService) {
                var networkDetailsCtrl = this;

                function returnToNetworks() {
                    $state.go('contiv.menu.networks.list');
                }

                function deleteNetwork() {
                    CRUDHelperService.hideServerError(networkDetailsCtrl);
                    CRUDHelperService.startLoader(networkDetailsCtrl);
                    NetworksModel.delete(networkDetailsCtrl.network).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(networkDetailsCtrl);
                        returnToNetworks();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(networkDetailsCtrl);
                        CRUDHelperService.showServerError(networkDetailsCtrl, result);
                    });
                }

                /**
                 * Get application groups belonging to a network
                 */
                function getApplicationGroups(reload) {
                    ApplicationGroupsModel.get(reload).then(function (result) {
                        networkDetailsCtrl.applicationGroups = $filter('orderBy')(_.filter(result, {
                            'networkName': networkDetailsCtrl.network.networkName
                        }), 'groupName');
                    });
                }

                CRUDHelperService.stopLoader(networkDetailsCtrl);
                CRUDHelperService.hideServerError(networkDetailsCtrl);

                NetworksModel.getModelByKey($stateParams.key)
                    .then(function (network) {
                        networkDetailsCtrl.network = network;
                        getApplicationGroups(false);
                    });

                networkDetailsCtrl.deleteNetwork = deleteNetwork;

                var promise;
                //Don't do autorefresh if one is already in progress
                if (!angular.isDefined(promise)) {
                    promise = $interval(function () {
                        getApplicationGroups(true);
                    }, ContivGlobals.REFRESH_INTERVAL);
                }

                //stop polling when user moves away from the page
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });
            }]);
