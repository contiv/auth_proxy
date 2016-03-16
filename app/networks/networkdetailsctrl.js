angular.module('contiv.networks')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks.details', {
                url: 'networks/:key',
                controller: 'NetworkDetailsCtrl as networkDetailsCtrl',
                templateUrl: 'networks/networkdetails.html'
            });
    })
    .controller('NetworkDetailsCtrl', ['$state', '$stateParams', 'NetworksModel', 'ApplicationGroupsModel', function ($state, $stateParams, NetworksModel, ApplicationGroupsModel) {
        var networkDetailsCtrl = this;

        function returnToNetworks() {
            $state.go('contiv.networks');
        }

        function deleteNetwork() {
            NetworksModel.delete(networkDetailsCtrl.network);
            returnToNetworks();
        }

        /**
         * Get application groups belonging to a network
         */
        function getApplicationGroups() {
            ApplicationGroupsModel.get().then(function (result) {
                networkDetailsCtrl.applicationGroups = _.filter(result, {
                    'networkName' : networkDetailsCtrl.network.networkName
                });
            });
        }

        NetworksModel.getModelByKey($stateParams.key)
            .then(function (network) {
                networkDetailsCtrl.network = network;
                getApplicationGroups();
            });

        networkDetailsCtrl.deleteNetwork = deleteNetwork;
    }]);
