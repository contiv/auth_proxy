angular.module('contiv.networks')
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks.details', {
                url: 'networks/:key',
                controller: 'NetworkDetailsCtrl as networkDetailsCtrl',
                templateUrl: 'networks/networkdetails.html'
            });
    })
    .controller('NetworkDetailsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', 'NetworksModel', 'ApplicationGroupsModel',
            function ($state, $stateParams, $scope, $interval, NetworksModel, ApplicationGroupsModel) {
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
        function getApplicationGroups(reload) {
            ApplicationGroupsModel.get(reload).then(function (result) {
                networkDetailsCtrl.applicationGroups = _.filter(result, {
                    'networkName' : networkDetailsCtrl.network.networkName
                });
            });
        }

        NetworksModel.getModelByKey($stateParams.key)
            .then(function (network) {
                networkDetailsCtrl.network = network;
                getApplicationGroups(false);
            });

        networkDetailsCtrl.deleteNetwork = deleteNetwork;

        var promise = $interval(function () {
            getApplicationGroups(true);
        }, 5000);

        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }]);
