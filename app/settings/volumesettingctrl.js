angular.module('contiv.settings')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.settings.details.volumes', {
                url: '/volumes',
                controller: 'VolumeSettingCtrl as volumeSettingCtrl',
                templateUrl: '/settings/volumesettings.html'
            })
        ;
    }])
    .controller('VolumeSettingCtrl', ['CRUDHelperService', 'VolumeSettingService',
        function (CRUDHelperService, VolumeSettingService) {
            var volumeSettingCtrl = this;

            function updateVolumeSettings() {
                if (volumeSettingCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(volumeSettingCtrl);
                    CRUDHelperService.startLoader(volumeSettingCtrl);
                    VolumeSettingService.updateSettings(volumeSettingCtrl.setting).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(volumeSettingCtrl);

                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(volumeSettingCtrl);
                        CRUDHelperService.showServerError(volumeSettingCtrl, result);
                    });
                }
            }

            function getVolumeSettings() {
                VolumeSettingService.getSettings().then(function successCallback(result) {
                    volumeSettingCtrl.setting = result;
                }, function errorCallback(result) {
                });
            }
            getVolumeSettings();
            volumeSettingCtrl.updateVolumeSettings = updateVolumeSettings;

            CRUDHelperService.stopLoader(volumeSettingCtrl);
            CRUDHelperService.hideServerError(volumeSettingCtrl);
        }]);