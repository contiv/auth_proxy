/*
/**
 * Created by hardik gandhi on 6/14/16.
 */
import { Component, Inject } from '@angular/core';
import { StateService } from "angular-ui-router/commonjs/ng1";
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
/*
angular.module('contiv.networkpolicies')
    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider
            .state('contiv.menu.networkpolicies.bandwidth.create', {
                url: '/create',
                controller: 'BandwidthPolicyCreateCtrl as bandwidthPolicyCreateCtrl',
                templateUrl: 'network_policies/bandwidthpolicycreate.html'
            })
        ;
    }])
    .controller('BandwidthPolicyCreateCtrl', ['$state', '$stateParams','NetprofilesModel', 'CRUDHelperService',
        function ($state, $stateParams, NetprofilesModel, CRUDHelperService) {
            var bandwidthPolicyCreateCtrl = this;

            function returnToPolicies() {
                $state.go('contiv.menu.networkpolicies.list.bandwidth');
            }

            function cancelCreating() {
                returnToPolicies();
            }

            function createPolicy() {
                if (bandwidthPolicyCreateCtrl.form.$valid) {
                    CRUDHelperService.hideServerError(bandwidthPolicyCreateCtrl);
                    CRUDHelperService.startLoader(bandwidthPolicyCreateCtrl);

                    bandwidthPolicyCreateCtrl.newPolicy.key =
                        NetprofilesModel.generateKey(bandwidthPolicyCreateCtrl.newPolicy);
                    
                    bandwidthPolicyCreateCtrl.newPolicy.bandwidth = bandwidthPolicyCreateCtrl.newPolicy.bandwidthNumber
                        + " "+ bandwidthPolicyCreateCtrl.newPolicy.bandwidthUnit;
                    
                    NetprofilesModel.create(bandwidthPolicyCreateCtrl.newPolicy).then(function successCallback(result) {
                        CRUDHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                        returnToPolicies();
                    }, function errorCallback(result) {
                        CRUDHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                        CRUDHelperService.showServerError(bandwidthPolicyCreateCtrl, result);
                    });
                }
            }

            function resetForm() {
                CRUDHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                CRUDHelperService.hideServerError(bandwidthPolicyCreateCtrl);
                bandwidthPolicyCreateCtrl.newPolicy = {
                    profileName: '',
                    tenantName: 'default', //TODO: Remove hardcoded tenant.
                    bandwidth: '',
                    DSCP: ''
                };
            }

            bandwidthPolicyCreateCtrl.createPolicy = createPolicy;
            bandwidthPolicyCreateCtrl.cancelCreating = cancelCreating;

            resetForm();
        }]);*/
@Component({
    selector: 'bandwidthpolicycreate',
    templateUrl: 'network_policies/bandwidthpolicycreate.html'
})
export class BandwidthPolicyCreateComponent {
    newPolicy;

    constructor(@Inject('$state') private $state: StateService,
                private netprofilesModel: NetprofilesModel,
                private crudHelperService: CRUDHelperService){
        var bandwidthPolicyCreateCtrl = this;

        function resetForm() {
            crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
            crudHelperService.hideServerError(bandwidthPolicyCreateCtrl);
            bandwidthPolicyCreateCtrl.newPolicy = {
                profileName: '',
                tenantName: 'default', //TODO: Remove hardcoded tenant.
                bandwidth: '',
                DSCP: ''
            };
        }
        resetForm();
    }

    returnToPolicies() {
        this.$state.go('contiv.menu.networkpolicies.list.bandwidth');
    }

    cancelCreating() {
        this.returnToPolicies();
    }

    createPolicy(validform: boolean) {
        var bandwidthPolicyCreateCtrl = this;
        if (validform) {
            bandwidthPolicyCreateCtrl.crudHelperService.hideServerError(bandwidthPolicyCreateCtrl);
            bandwidthPolicyCreateCtrl.crudHelperService.startLoader(bandwidthPolicyCreateCtrl);

            bandwidthPolicyCreateCtrl.newPolicy.key =
                bandwidthPolicyCreateCtrl.netprofilesModel.generateKey(bandwidthPolicyCreateCtrl.newPolicy);

            bandwidthPolicyCreateCtrl.newPolicy.bandwidth = bandwidthPolicyCreateCtrl.newPolicy.bandwidthNumber
                + " "+ bandwidthPolicyCreateCtrl.newPolicy.bandwidthUnit;

            bandwidthPolicyCreateCtrl.netprofilesModel.create(bandwidthPolicyCreateCtrl.newPolicy).then(function successCallback(result) {
                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                this.returnToPolicies();
            }, function errorCallback(result) {
                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
                bandwidthPolicyCreateCtrl.crudHelperService.showServerError(bandwidthPolicyCreateCtrl, result);
            });
        }
    }
}

