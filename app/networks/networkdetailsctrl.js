angular.module('contiv.networks')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks.details', {
                url: '/details/:key',
                controller: 'NetworkDetailsCtrl as networkDetailsCtrl',
                templateUrl: 'networks/networkdetails.html'
            });
    })
    .controller('NetworkDetailsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', 'NetworksModel', 'ApplicationGroupsModel', 'CRUDHelperService',
            function ($state, $stateParams, $scope, $interval, NetworksModel, ApplicationGroupsModel, CRUDHelperService) {
                var networkDetailsCtrl = this;

                function returnToNetworks() {
                    $state.go('contiv.networks.list');
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
                        networkDetailsCtrl.applicationGroups = _.filter(result, {
                            'networkName': networkDetailsCtrl.network.networkName
                        });
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
                    }, 5000);
                }

                //stop polling when user moves away from the page
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });
            }]);
