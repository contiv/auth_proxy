/**
 * Created by vjain3 on 2/19/16.
 */
angular.module('contiv.networks')
/* Temporary Config to get around CORS issue during POST. */
    .config(function ($httpProvider) {
        $httpProvider.defaults.headers.common = {};
        $httpProvider.defaults.headers.post = {};
        $httpProvider.defaults.headers.put = {};
        $httpProvider.defaults.headers.patch = {};
    })
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks.create', {
                url: '/networks/create',
                //target the un-named 'ui-view' in PARENT states template
                templateUrl: 'networks/networkcreate.html',
                controller: 'NetworkCreateCtrl as networkCreateCtrl'
            })
        ;
    })
    .controller('NetworkCreateCtrl', ['$state', '$stateParams', 'NetworksModel', function ($state, $stateParams, NetworksModel) {
        var networkCreateCtrl = this;

        function returnToNetworks() {
            $state.go('contiv.networks');
        }

        function cancelCreating() {
            returnToNetworks();
        }

        function createNetwork() {
            networkCreateCtrl.newNetwork.key =
                networkCreateCtrl.newNetwork.tenantName + ':' + networkCreateCtrl.newNetwork.networkName;
            NetworksModel.create(networkCreateCtrl.newNetwork).then(function (result) {
                returnToNetworks();
            });

        }

        function resetForm() {
            networkCreateCtrl.newNetwork = {
                networkName: '',
                encap: '',
                subnet: '',
                gateway: '',
                tenantName: 'default'//TODO: Remove hardcoded tenant.
                //groups: []
            };
        }

        networkCreateCtrl.createNetwork = createNetwork;
        networkCreateCtrl.cancelCreating = cancelCreating;

        resetForm();
    }]);
