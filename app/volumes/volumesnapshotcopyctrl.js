/**
 * Created by cshampur on 8/9/16.
 */
angular.module('contiv.volumes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.volumes.copy', {
                url: '/copy/',
                params: {snapshot:null, policy:null, volume:null},
                controller: 'VolumeSnapshotCopyCtrl as volumeSnapshotCopyCtrl',
                templateUrl: 'volumes/volumesnapshotcopy.html'
            });
    }])
    .controller('VolumeSnapshotCopyCtrl',
        ['$state', '$stateParams', '$scope', '$interval', '$http', 'VolumesModel', 'CRUDHelperService',
            function ($state, $stateParams, $scope, $interval, $http, VolumesModel, CRUDHelperService) {
                var volumeSnapshotCopyCtrl = this;

                function cancelCopy() {
                    $state.go('contiv.menu.volumes.details', {key:$stateParams.policy+'/'+$stateParams.volume});
                }

                function goToNewVolume() {
                    $state.go('contiv.menu.volumes.details', {key:$stateParams.policy+'/'+volumeSnapshotCopyCtrl.newvolume});
                }

                function copySnapshot() {
                    if(volumeSnapshotCopyCtrl.form.$valid){
                        CRUDHelperService.hideServerError(volumeSnapshotCopyCtrl);
                        CRUDHelperService.startLoader(volumeSnapshotCopyCtrl);
                        var model ={};
                        model.policy = $stateParams.policy;
                        model.name = $stateParams.volume;
                        VolumesModel.copy(model, $stateParams.snapshot, volumeSnapshotCopyCtrl.newvolume)
                            .then(function successCallback(result) {
                                CRUDHelperService.stopLoader(volumeSnapshotCopyCtrl);
                                goToNewVolume();
                            }, function errorCallback(result) {
                                CRUDHelperService.stopLoader(volumeSnapshotCopyCtrl);
                                CRUDHelperService.showServerError(volumeSnapshotCopyCtrl, result);
                            });
                    }
                }

                volumeSnapshotCopyCtrl.policy = $stateParams.policy;
                volumeSnapshotCopyCtrl.volume = $stateParams.volume;
                volumeSnapshotCopyCtrl.snapshot = $stateParams.snapshot;
                volumeSnapshotCopyCtrl.copySnapshot = copySnapshot;
                volumeSnapshotCopyCtrl.cancelCopy = cancelCopy;
            }]);