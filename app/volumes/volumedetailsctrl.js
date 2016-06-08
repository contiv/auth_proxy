/**
 * Created by vjain3 on 4/15/16.
 */
angular.module('contiv.volumes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.volumes.details', {
                url: '/details/:key',
                controller: 'VolumeDetailsCtrl as volumeDetailsCtrl',
                templateUrl: 'volumes/volumedetails.html'
            });
    }])
    .controller('VolumeDetailsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', '$http', 'VolumesModel', 'VolumeService',
        function ($state, $stateParams, $scope, $interval, $http, VolumesModel, VolumeService) {
            var volumeDetailsCtrl = this;

            function returnToVolumes() {
                $state.go('contiv.menu.volumes.list');
            }
            function deleteVolume() {
                VolumesModel.delete(volumeDetailsCtrl.volume).then(function (result) {
                    returnToVolumes();
                });
            }

            function getVolumeInfo(reload) {
                var tokens = $stateParams.key.split('/');
                var model ={};
                model.policy = tokens[0];
                model.name = tokens[1];
                VolumesModel.getModel(model, reload)
                    .then(function (volume) {
                        volumeDetailsCtrl.volume = volume;
                        getVolumeUseInfo();
                        getVolumeSnapshots();
                    });
            }

            function getVolumeUseInfo() {
                VolumeService.getVolumeUseInfo(volumeDetailsCtrl.volume).then(function successCallback(result) {
                    volumeDetailsCtrl.volumeUse = result;
                }, function errorCallback(result) {
                    //Returns error if volume is not mounted by any container
                });
            }

            function getVolumeSnapshots() {
                VolumeService.getVolumeSnapshots(volumeDetailsCtrl.volume).then(function successCallback(result) {
                    volumeDetailsCtrl.snapshots = result;
                }, function errorCallback(result) {
                })
            }

            function copySnapshot(snapshot, newVolume) {
                VolumesModel.copy(model, snapshot, newVolume)
                    .then(function successCallback(result) {

                    }, function errorCallback(result) {

                    })
            }

            volumeDetailsCtrl.deleteVolume = deleteVolume;
            volumeDetailsCtrl.copySnapshot = copySnapshot;

            //Load from cache for quick display initially
            getVolumeInfo(false);

            var promise;
            //Don't do auto-refresh if one is already in progress
            if (!angular.isDefined(promise)) {
                promise = $interval(function () {
                    getVolumeInfo(true);
                }, ContivGlobals.REFRESH_INTERVAL);
            }
            //stop polling when user moves away from the page
            $scope.$on('$destroy', function () {
                $interval.cancel(promise);
            });

        }]);