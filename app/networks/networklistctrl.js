angular.module('contiv.networks', ['contiv.models'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks', {
                url: '/networks',
                views: {
                    //target the ui-view named 'networks' in ROOT state (contiv)
                    'networks@': {
                        controller: 'NetworksListCtrl as networksListCtrl',
                        templateUrl: 'networks/networklist.html'
                    }
                }
            })
        ;
    })
    .controller('NetworksListCtrl', ['$scope', '$interval', 'NetworksModel', function ($scope, $interval, NetworksModel) {
        var networksListCtrl = this;

        function getNetworks(reload) {
            NetworksModel.get(reload)
                .then(function (result) {
                    networksListCtrl.networks = result;
                });
        }

        //Load from cache for quick display initially
        getNetworks(false);

        var promise = $interval(function () {
            getNetworks(true);
        }, 5000);

        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }]);
