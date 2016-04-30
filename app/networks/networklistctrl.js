angular.module('contiv.networks', ['contiv.models', 'contiv.directives', 'contiv.utils'])
    .config(function ($stateProvider) {
        $stateProvider
            .state('contiv.networks.list', {
                url: '/list',
                controller: 'NetworksListCtrl as networksListCtrl',
                templateUrl: 'networks/networklist.html'
            })
        ;
    })
    .controller('NetworksListCtrl', ['$scope', '$interval', 'NetworksModel', 'CRUDHelperService',
        function ($scope, $interval, NetworksModel, CRUDHelperService) {
            var networksListCtrl = this;

            function getNetworks(reload) {
                NetworksModel.get(reload)
                    .then(function successCallback(result) {
                            CRUDHelperService.stopLoader(networksListCtrl);
                            networksListCtrl.networks = result;
                        },
                        function errorCallback(result) {
                            CRUDHelperService.stopLoader(networksListCtrl);
                        });
            }

            //Load from cache for quick display initially
            getNetworks(false);

            var promise;
            //Don't do autorefresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getNetworks(true);
                }, 5000);
            }

            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });
        }]);
