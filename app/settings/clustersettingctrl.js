angular.module('contiv.settings')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.settings.details.cluster', {
                url: '/cluster',
                controller: 'ClusterSettingCtrl as clusterSettingCtrl',
                templateUrl: 'settings/clustersettings.html'
            })
        ;
    }])
    .controller('ClusterSettingCtrl', ['$stateParams', 'CRUDHelperService', 'NodesService',
        function ($stateParams, CRUDHelperService, NodesService) {
            var clusterSettingCtrl = this;

            function updateClusterSettings() {
                if (clusterSettingCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(clusterSettingCtrl);
                    CRUDHelperService.startLoader(clusterSettingCtrl);
                    clusterSettingCtrl.nodeOpsObj.nodes = [$stateParams.key];
                    NodesService.cleanupExtraVars(clusterSettingCtrl);
                    NodesService.createExtraVars(clusterSettingCtrl);
                    NodesService.updateSettings(clusterSettingCtrl.nodeOpsObj).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(clusterSettingCtrl);
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(clusterSettingCtrl);
                        CRUDHelperService.showServerError(clusterSettingCtrl, result);
                    });
                }
            }

            clusterSettingCtrl.nodeOpsObj = {};
            clusterSettingCtrl.extra_vars = {}; //TODO Intialize from global settings
            clusterSettingCtrl.ansibleVariables = [];
            clusterSettingCtrl.envVariables = [];

            NodesService.getSettings(clusterSettingCtrl);

            clusterSettingCtrl.updateClusterSettings = updateClusterSettings;

            CRUDHelperService.stopLoader(clusterSettingCtrl);
            CRUDHelperService.hideServerError(clusterSettingCtrl);
        }]);
