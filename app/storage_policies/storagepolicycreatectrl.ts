/**
 * Created by vjain3 on 6/1/16.
 */
angular.module('contiv.storagepolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.storagepolicies.create', {
                url: '/create',
                templateUrl: 'storage_policies/storagepolicycreate.html',
                controller: 'StoragePolicyCreateCtrl as storagePolicyCreateCtrl'
            })
        ;
    }])
    .controller('StoragePolicyCreateCtrl', ['$state', '$stateParams', 'StoragePoliciesModel', 'CRUDHelperService',
        function ($state, $stateParams, StoragePoliciesModel, CRUDHelperService) {
            var storagePolicyCreateCtrl = this;

            function returnToStoragePolicies() {
                $state.go('contiv.menu.storagepolicies.list');
            }

            function cancelCreating() {
                returnToStoragePolicies();
            }

            function createFilesystemCmds() {
                storagePolicyCreateCtrl.filesystemcmds.forEach(function (item) {
                    storagePolicyCreateCtrl.newStoragePolicy.filesystems[item.name] = item.value;
                });
            }

            function createPolicy() {
                //form controller is injected by the html template
                //checking if all validations have passed
                if (storagePolicyCreateCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(storagePolicyCreateCtrl);
                    CRUDHelperService.startLoader(storagePolicyCreateCtrl);
                    createFilesystemCmds();
                    StoragePoliciesModel.create(storagePolicyCreateCtrl.newStoragePolicy)
                        .then(function successCallback(result) {
                            CRUDHelperService.stopLoader(storagePolicyCreateCtrl);
                            returnToStoragePolicies();
                        }, function errorCallback(result) {
                            CRUDHelperService.stopLoader(storagePolicyCreateCtrl);
                            CRUDHelperService.showServerError(storagePolicyCreateCtrl, result);
                        });
                }

            }

            function resetForm() {
                CRUDHelperService.stopLoader(storagePolicyCreateCtrl);
                CRUDHelperService.hideServerError(storagePolicyCreateCtrl);
                storagePolicyCreateCtrl.newStoragePolicy = {
                    "name": "",
                    "backends": {
                        "crud": "ceph",
                        "mount": "ceph",
                        "snapshot": "ceph"
                    },
                    "unlocked": false,
                    "driver": {
                        "pool": "rbd"
                    },
                    "create": {
                        "size": "0",
                        "filesystem": ""
                    },
                    "runtime": {
                        "snapshots": true,
                        "snapshot": {
                            "frequency": "30m",
                            "keep": 20
                        },
                        "rate-limit": {
                            "write-iops": 0,
                            "read-iops": 0,
                            "write-bps": 0,
                            "read-bps": 0 
                        }
                    },
                    "filesystems": {}
                };
            }

            storagePolicyCreateCtrl.createPolicy = createPolicy;
            storagePolicyCreateCtrl.cancelCreating = cancelCreating;
            storagePolicyCreateCtrl.filesystemcmds = [];

            resetForm();
        }]);
