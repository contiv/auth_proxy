/**
 * Created by hardik gandhi on 6/16/16.
 */
import { Component, Inject } from '@angular/core';
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { StateService, StateParams } from "angular-ui-router/commonjs/ng1";
import { PolicyTab } from "./networkpoliciestabsctrl";

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
        this.$state.go('contiv.menu.networkpolicies.list', {policyTab: PolicyTab.bandwidth});
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
