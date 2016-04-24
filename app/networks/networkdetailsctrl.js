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
        ['$state', '$stateParams', '$scope', '$interval', 'NetworksModel', 'ApplicationGroupsModel',
            function ($state, $stateParams, $scope, $interval, NetworksModel, ApplicationGroupsModel) {
                var networkDetailsCtrl = this;

                function returnToNetworks() {
                    $state.go('contiv.networks.list');
                }

                function deleteNetwork() {
                    NetworksModel.delete(networkDetailsCtrl.network).then(function (result) {
                        returnToNetworks();
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
