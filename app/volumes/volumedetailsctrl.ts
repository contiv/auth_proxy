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
        ['$state', '$stateParams', '$scope', '$interval', '$http', 'VolumesModel', 'VolumeService', 'CRUDHelperService',
        function ($state, $stateParams, $scope, $interval, $http, VolumesModel, VolumeService, CRUDHelperService) {
            var volumeDetailsCtrl = this;

            function returnToVolumes() {
                $state.go('contiv.menu.volumes.list');
            }
            function deleteVolume() {
                CRUDHelperService.hideServerError(volumeDetailsCtrl);
                CRUDHelperService.startLoader(volumeDetailsCtrl);
                VolumesModel.delete(volumeDetailsCtrl.volume).then(function (result) {
                    CRUDHelperService.stopLoader(volumeDetailsCtrl);
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
                });
            }

            function triggerVolumeSnapshot(){
                volumeDetailsCtrl.snapshotSuccess=false;
                CRUDHelperService.hideServerError(volumeDetailsCtrl);
                CRUDHelperService.startLoader(volumeDetailsCtrl);
                VolumeService.triggerSnapshot(volumeDetailsCtrl.volume).then(function successCallback(result) {
                    CRUDHelperService.stopLoader(volumeDetailsCtrl);
                    volumeDetailsCtrl.snapshotSuccess=true;
                },  function errorCallback(result){
                    CRUDHelperService.stopLoader(volumeDetailsCtrl);
                    CRUDHelperService.showServerError(volumeDetailsCtrl, result);
                });
            }

            volumeDetailsCtrl.deleteVolume = deleteVolume;
            volumeDetailsCtrl.triggerVolumeSnapshot = triggerVolumeSnapshot;

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