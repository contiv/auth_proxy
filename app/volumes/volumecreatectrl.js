/**
 * Created by vjain3 on 6/3/16.
 */
angular.module('contiv.volumes')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.volumes.create', {
                url: '/create',
                templateUrl: 'volumes/volumecreate.html',
                controller: 'VolumeCreateCtrl as volumeCreateCtrl'
            })
        ;
    }])
    .controller('VolumeCreateCtrl', ['$state', '$stateParams', 'VolumesModel', 'StoragePoliciesModel', 'CRUDHelperService',
        function ($state, $stateParams, VolumesModel, StoragePoliciesModel, CRUDHelperService) {
            var volumeCreateCtrl = this;
            volumeCreateCtrl.filesystems = ['ext4', 'btrfs'];

            function returnToVolumesModel() {
                $state.go('contiv.menu.volumes.list');
            }

            function cancelCreating() {
                returnToVolumesModel();
            }

            /**
             * Get storage policies.
             */
            function getStoragePolicies() {
                StoragePoliciesModel.get().then(function (result) {
                    volumeCreateCtrl.policies = result;
                });
            }

            function applyPolicySettings() {
                volumeCreateCtrl.newVolume.policy = volumeCreateCtrl.selectedPolicy.name;
                volumeCreateCtrl.newVolume.backends = volumeCreateCtrl.selectedPolicy.backends;
                volumeCreateCtrl.newVolume.driver = volumeCreateCtrl.selectedPolicy.driver;
                volumeCreateCtrl.newVolume.create = volumeCreateCtrl.selectedPolicy.create;
                volumeCreateCtrl.newVolume.runtime = volumeCreateCtrl.selectedPolicy.runtime;
            }

            function createVolume() {
                //form controller is injected by the html template
                //checking if all validations have passed
                if (volumeCreateCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(volumeCreateCtrl);
                    CRUDHelperService.startLoader(volumeCreateCtrl);
                    applyPolicySettings();
                    VolumesModel.create(volumeCreateCtrl.newVolume).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(volumeCreateCtrl);
                        returnToVolumesModel();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(volumeCreateCtrl);
                        CRUDHelperService.showServerError(volumeCreateCtrl, result);
                    });
                }

            }

            function resetForm() {
                CRUDHelperService.stopLoader(volumeCreateCtrl);
                CRUDHelperService.hideServerError(volumeCreateCtrl);
                volumeCreateCtrl.newVolume = {
                    "name": "",
                    "backends": {},
                    "driver": {},
                    "create": {},
                    "runtime": {}
                };
            }

            volumeCreateCtrl.createVolume = createVolume;
            volumeCreateCtrl.cancelCreating = cancelCreating;

            getStoragePolicies();

            resetForm();
        }]);
