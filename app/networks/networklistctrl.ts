class NetworksListCtrl {
    networks: any;

    static $inject = ['$scope', '$interval', 'NetworksModel', 'CRUDHelperService'];

    constructor ($scope, $interval, NetworksModel, CRUDHelperService) {
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
            }, ContivGlobals.REFRESH_INTERVAL);
        }

        //stop polling when user moves away from the page
        $scope.$on('$destroy', function () {
            $interval.cancel(promise);
        });
    }
}

angular.module('contiv.networks')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networks.list', {
                url: '/list',
                component: 'networkList'
                //controller: 'NetworksListCtrl as networksListCtrl',
                //templateUrl: 'networks/networklist.html'
            })
        ;
    }])
    .component('networkList', {
        templateUrl: 'networks/networklist.html',
        controller: NetworksListCtrl,
        controllerAs: 'networksListCtrl'
    });
/*
    .controller('NetworksListCtrl', ['$scope', '$interval', '$filter', 'NetworksModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, NetworksModel, CRUDHelperService) {
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
                }, ContivGlobals.REFRESH_INTERVAL);
            }

            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });
        }]);
*/