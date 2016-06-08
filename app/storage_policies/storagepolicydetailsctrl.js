/**
 * Created by vjain3 on 5/27/16.
 */
angular.module('contiv.storagepolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.storagepolicies.details', {
                url: '/details/:key',
                controller: 'StoragePolicyDetailsCtrl as storagePolicyDetailsCtrl',
                templateUrl: 'storage_policies/storagepolicydetails.html'
            })
            .state('contiv.menu.storagepolicies.edit', {
                url: '/details/:key',
                controller: 'StoragePolicyDetailsCtrl as storagePolicyDetailsCtrl',
                templateUrl: 'storage_policies/storagepolicydetails.html'
            });
    }])
    .controller('StoragePolicyDetailsCtrl',
        ['$state', '$stateParams', '$scope', '$interval', '$filter', 'StoragePoliciesModel', 'VolumesModel', 'CRUDHelperService',
            function ($state, $stateParams, $scope, $interval, $filter, StoragePoliciesModel, VolumesModel, CRUDHelperService) {
                var storagePolicyDetailsCtrl = this;
                storagePolicyDetailsCtrl.filesystemcmds = [];

                /**
                 * To show edit or details screen based on the route
                 */
                function setMode() {
                    if ($state.is('contiv.menu.storagepolicies.edit')) {
                        storagePolicyDetailsCtrl.mode = 'edit';
                    } else {
                        storagePolicyDetailsCtrl.mode = 'details';
                    }
                }

                function returnToPolicies() {
                    $state.go('contiv.menu.storagepolicies.list');
                }

                function returnToPolicyDetails() {
                    $state.go('contiv.menu.storagepolicies.details', {'key': storagePolicyDetailsCtrl.policy.name});
                }

                function cancelEditing() {
                    returnToPolicyDetails();
                }

                function deletePolicy() {
                    CRUDHelperService.hideServerError(storagePolicyDetailsCtrl);
                    CRUDHelperService.startLoader(storagePolicyDetailsCtrl);
                    StoragePoliciesModel.deleteUsingKey(storagePolicyDetailsCtrl.policy.name, 'name').then(
                        function successCallback(result) {
                            CRUDHelperService.stopLoader(storagePolicyDetailsCtrl);
                            returnToPolicies();
                        }, function errorCallback(result) {
                            CRUDHelperService.stopLoader(storagePolicyDetailsCtrl);
                            CRUDHelperService.showServerError(storagePolicyDetailsCtrl, result);
                        });
                }

                /**
                 * Get volumes belonging to a policy
                 */
                function getVolumes(reload) {
                    VolumesModel.get(reload).then(function (result) {
                        storagePolicyDetailsCtrl.volumes = $filter('orderBy')(_.filter(result, {
                            'policy': storagePolicyDetailsCtrl.policy.name
                        }), 'name');
                    });
                }

                function initializeFilesystemCmdsArray() {
                    angular.forEach(storagePolicyDetailsCtrl.policy.filesystems, function(value, key) {
                        this.push({name: key, value: value});
                    }, storagePolicyDetailsCtrl.filesystemcmds);
                }

                function createFilesystemCmds() {
                    storagePolicyDetailsCtrl.filesystemcmds.forEach(function (item) {
                        storagePolicyDetailsCtrl.policy.filesystems[item.name] = item.value;
                    });
                }

                function savePolicy() {
                    //form controller is injected by the html template
                    //checking if all validations have passed
                    if (storagePolicyDetailsCtrl.form.$valid) {
                        CRUDHelperService.hideServerError(storagePolicyDetailsCtrl);
                        CRUDHelperService.startLoader(storagePolicyDetailsCtrl);
                        createFilesystemCmds();
                        StoragePoliciesModel.save(storagePolicyDetailsCtrl.policy).then(function successCallback(result) {
                            CRUDHelperService.stopLoader(storagePolicyDetailsCtrl);
                            returnToPolicyDetails();
                        }, function errorCallback(result) {
                            CRUDHelperService.stopLoader(storagePolicyDetailsCtrl);
                            CRUDHelperService.showServerError(storagePolicyDetailsCtrl, result);
                        });
                    }

                }
                CRUDHelperService.stopLoader(storagePolicyDetailsCtrl);
                CRUDHelperService.hideServerError(storagePolicyDetailsCtrl);

                StoragePoliciesModel.getModelByKey($stateParams.key, false, 'name')
                    .then(function (policy) {
                        storagePolicyDetailsCtrl.policy = policy;
                        initializeFilesystemCmdsArray();
                        //getVolumes(false);
                    });


                storagePolicyDetailsCtrl.deletePolicy = deletePolicy;
                storagePolicyDetailsCtrl.savePolicy = savePolicy;
                storagePolicyDetailsCtrl.cancelEditing = cancelEditing;

                setMode();

                var promise;
                //Don't do autorefresh if one is already in progress
                if (!angular.isDefined(promise)) {
                    promise = $interval(function () {
                        //getVolumes(true);
                    }, ContivGlobals.REFRESH_INTERVAL);
                }

                //stop polling when user moves away from the page
                $scope.$on('$destroy', function () {
                    $interval.cancel(promise);
                });
            }]);
