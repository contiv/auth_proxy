angular.module('contiv.networks')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks.details', {
                url: 'networks/:key',
                controller: 'NetworkDetailsCtrl as networkDetailsCtrl',
                templateUrl: 'networks/networkdetails.html'
            });
    })
    .controller('NetworkDetailsCtrl', ['$state', '$stateParams', 'NetworksModel', function ($state, $stateParams, NetworksModel) {
        var networkDetailsCtrl = this;

        function returnToNetworks() {
            $state.go('contiv.networks');
        }

        function deleteNetwork() {
            NetworksModel.delete(networkDetailsCtrl.network);
            returnToNetworks();
        }

        NetworksModel.getModelByKey($stateParams.key)
            .then(function (network) {
                networkDetailsCtrl.network = network;
            });

        networkDetailsCtrl.deleteNetwork = deleteNetwork;
    }]);
