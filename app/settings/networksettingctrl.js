angular.module('contiv.settings')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.settings.details.networks', {
                url: '/networks',
                controller: 'NetworkSettingCtrl as networkSettingCtrl',
                templateUrl: 'settings/networksettings.html'
            })
        ;
    }])
    .controller('NetworkSettingCtrl', ['CRUDHelperService', 'NetworkService',
        function (CRUDHelperService, NetworkService) {
            var networkSettingCtrl = this;
            networkSettingCtrl.vlanPattern = ContivGlobals.VLAN_REGEX;
            networkSettingCtrl.vxlanPattern = ContivGlobals.VXLAN_REGEX;

            function updateNetworkSettings() {
                if (networkSettingCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(networkSettingCtrl);
                    CRUDHelperService.startLoader(networkSettingCtrl);
                    NetworkService.updateSettings(networkSettingCtrl.setting).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(networkSettingCtrl);

                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(networkSettingCtrl);
                        CRUDHelperService.showServerError(networkSettingCtrl, result);
                    });
                }
            }

            function getNetworkSettings() {
                NetworkService.getSettings().then(function successCallback(result) {
                    networkSettingCtrl.setting = result;
                }, function errorCallback(result) {
                });
            }
            getNetworkSettings();
            networkSettingCtrl.updateNetworkSettings = updateNetworkSettings;

            CRUDHelperService.stopLoader(networkSettingCtrl);
            CRUDHelperService.hideServerError(networkSettingCtrl);
        }]);