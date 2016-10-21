/**
 * Created by hardik gandhi on 6/16/16.
 */
import { Component, Inject } from '@angular/core';
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { StateService, StateParams } from "angular-ui-router/commonjs/ng1";
/*
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
            /*NetprofilesModel.getModelByKey($stateParams.key)
                .then(function (policy) {
                    bandwidthPolicyDetailsCtrl.policy = policy;
                });

            /**
             * To show edit or details screen based on the route
             */
            /*function setMode() {
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
                $state.go('contiv.menu.networkpolicies.list.bandwidth');
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

        }]);*/
@Component({
    selector: 'bandwidthpolicydetails',
    templateUrl: 'network_policies/bandwidthpolicydetails.html'
})
export class BandwidthPolicyDetailsComponent {
    bandwidthProfiles:any[] = [];
    policy:any = {};
    mode:string = 'details';

    constructor(@Inject('$state') private $state:StateService,
                @Inject('$stateParams') private $stateParams:StateParams,
                private netprofilesModel:NetprofilesModel,
                private crudHelperService:CRUDHelperService) {
        var bandwidthPolicyDetailsCtrl = this;

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

        /* Get particular Profile for based on key*/
        bandwidthPolicyDetailsCtrl.netprofilesModel.getModelByKey($stateParams.key)
            .then(function (policy) {
                bandwidthPolicyDetailsCtrl.policy = policy;
            });
        bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
        bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);

        setMode();
    }

    deletePolicy() {
        var bandwidthPolicyDetailsCtrl = this;
        bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
        bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
        bandwidthPolicyDetailsCtrl.netprofilesModel.deleteUsingKey(bandwidthPolicyDetailsCtrl.policy.key, 'name').then(
            function successCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.returnToPolicies();
            }, function errorCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.crudHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
            });
    }


    returnToPolicies() {
        this.$state.go('contiv.menu.networkpolicies.list.bandwidth');
    }

    returnToPolicyDetails() {
        this.$state.go('contiv.menu.networkpolicies.bandwidth.details', {'key': this.policy.key});
    }

    editPolicy() {
        this.$state.go('contiv.menu.networkpolicies.bandwidth.edit', {key:this.policy.key});
    }

    cancelEditing() {
        this.returnToPolicyDetails();
    }

    savePolicy(validform: boolean) {
        var bandwidthPolicyDetailsCtrl = this;
        if (validform) {
            bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
            bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
            bandwidthPolicyDetailsCtrl.policy.bandwidth = bandwidthPolicyDetailsCtrl.policy.bandwidthNumber + " " + bandwidthPolicyDetailsCtrl.policy.bandwidthUnit;
            bandwidthPolicyDetailsCtrl.netprofilesModel.save(bandwidthPolicyDetailsCtrl.policy).then(function successCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.returnToPolicyDetails();
            }, function errorCallback(result) {
                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
                bandwidthPolicyDetailsCtrl.crudHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
            });
        }
    }

}
