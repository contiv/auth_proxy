/**
 * Created by hardik gandhi on 6/16/16.
 */


angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.bandwidth.details', {
                url: '/details/:key',
                controller: 'BandwidthPolicyDetailsCtrl as bandwidthPolicyDetailsCtrl',
                templateUrl: 'network_policies/bandwidthpolicydetails.html'
            });
    }])
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.bandwidth.edit', {
                url: '/edit/:key',
                controller: 'BandwidthPolicyDetailsCtrl as bandwidthPolicyDetailsCtrl',
                templateUrl: 'network_policies/bandwidthpolicydetails.html'
            });
    }])
    .controller('BandwidthPolicyDetailsCtrl', [
        '$state',
        '$stateParams',
        'NetprofilesModel',
        'CRUDHelperService',
        function ($state, $stateParams, NetprofilesModel, CRUDHelperService) {
            var bandwidthPolicyDetailsCtrl = this;

            bandwidthPolicyDetailsCtrl.bandwidthProfiles = [];

            /* Get particular Profile for based on key*/
            NetprofilesModel.getModelByKey($stateParams.key)
                .then(function (policy) {
                    bandwidthPolicyDetailsCtrl.policy = policy;
                });
            
            /**
             * To show edit or details screen based on the route
             */
            function setMode() {
                if ($state.is('contiv.menu.networkpolicies.bandwidth.edit')) {
                    bandwidthPolicyDetailsCtrl.mode = 'edit';
                } else {
                    bandwidthPolicyDetailsCtrl.mode = 'details';
                }
            }

            function deletePolicy() {
                CRUDHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
                CRUDHelperService.startLoader(bandwidthPolicyDetailsCtrl);
                NetprofilesModel.deleteUsingKey(bandwidthPolicyDetailsCtrl.policy.key, 'name').then(
                    function successCallback(result) {
                        CRUDHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                        returnToPolicies();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                        CRUDHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
                    });
            }


            function returnToPolicies() {
                $state.go('contiv.menu.networkpolicies.bandwidth.list');
            }

            function returnToPolicyDetails() {
                $state.go('contiv.menu.networkpolicies.bandwidth.details', {'key': bandwidthPolicyDetailsCtrl.policy.key});
            }

            function cancelEditing() {
                returnToPolicyDetails();
            }

            function savePolicy() {
                //form controller is injected by the html template
                //checking if all validations have passed
                if (bandwidthPolicyDetailsCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
                    CRUDHelperService.startLoader(bandwidthPolicyDetailsCtrl);
                    bandwidthPolicyDetailsCtrl.policy.bandwidth = bandwidthPolicyDetailsCtrl.policy.bandwidthNumber + " " + bandwidthPolicyDetailsCtrl.policy.bandwidthUnit;
                    NetprofilesModel.save(bandwidthPolicyDetailsCtrl.policy).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                        returnToPolicyDetails();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                        CRUDHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
                    });
                }

            }

            CRUDHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
            CRUDHelperService.hideServerError(bandwidthPolicyDetailsCtrl);

            setMode();

            bandwidthPolicyDetailsCtrl.deletePolicy = deletePolicy;
            bandwidthPolicyDetailsCtrl.savePolicy = savePolicy;
            bandwidthPolicyDetailsCtrl.cancelEditing = cancelEditing;

        }]);
