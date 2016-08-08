/**
 * Created by vjain3 on 3/22/16.
 */
angular.module('contiv.volumes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.volumes.list', {
                url: '/list',
                controller: 'VolumeListCtrl as volumeListCtrl',
                templateUrl: 'volumes/volumelist.html'
            })
        ;
    }])
    .controller('VolumeListCtrl', ['$scope', '$interval', '$filter', 'VolumesModel', 'CRUDHelperService',
        function ($scope, $interval, $filter, VolumesModel, CRUDHelperService) {
            var volumeListCtrl = this;

            function getVolumes(reload) {
                VolumesModel.get(reload)
                    .then(function successCallback(result) {
                        CRUDHelperService.stopLoader(volumeListCtrl);
                        volumeListCtrl.volumes = result;
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(volumeListCtrl);
                    });
            }

            //Load from cache for quick display initially
            getVolumes(false);

            var promise;
            //Don't do auto-refresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getVolumes(true);
                }, ContivGlobals.REFRESH_INTERVAL);
            }
            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });
        }]);
