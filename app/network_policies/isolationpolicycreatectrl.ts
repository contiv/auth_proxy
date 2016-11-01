/**
 * Created by vjain3 on 3/10/16.
 */
import { Component, Inject } from '@angular/core';
import { PoliciesModel } from "../components/models/policiesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { StateService } from "angular-ui-router/commonjs/ng1";
import { PolicyTab } from "./networkpoliciestabsctrl";

@Component({
    selector: 'isolationpolicycreate',
    templateUrl: 'network_policies/isolationpolicycreate.html'
})
export class IsolationPolicyCreateComponent {
    newPolicy;

    constructor(@Inject('$state') private $state: StateService,
                private policiesModel: PoliciesModel,
                private crudHelperService: CRUDHelperService) {
        var isolationPolicyCreateCtrl = this;
        function resetForm() {
            crudHelperService.stopLoader(isolationPolicyCreateCtrl);
            crudHelperService.hideServerError(isolationPolicyCreateCtrl);
            isolationPolicyCreateCtrl.newPolicy = {
                policyName: '',
                tenantName: 'default'//TODO: Remove hardcoded tenant.
            };
        }

        resetForm();
    }

    returnToPolicies() {
        this.$state.go('contiv.menu.networkpolicies.list', {policyTab: PolicyTab.isolation});
    }

    cancelCreating() {
        this.returnToPolicies();
    }

    createPolicy(validform: boolean) {
        var isolationPolicyCreateCtrl = this;
        if (validform) {
            isolationPolicyCreateCtrl.crudHelperService.hideServerError(isolationPolicyCreateCtrl);
            isolationPolicyCreateCtrl.crudHelperService.startLoader(isolationPolicyCreateCtrl);
            isolationPolicyCreateCtrl.newPolicy.key =
                isolationPolicyCreateCtrl.policiesModel.generateKey(isolationPolicyCreateCtrl.newPolicy);
            isolationPolicyCreateCtrl.policiesModel.create(isolationPolicyCreateCtrl.newPolicy).then(function successCallback(result) {
                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.returnToPolicies();
            }, function errorCallback(result) {
                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.crudHelperService.showServerError(isolationPolicyCreateCtrl, result);
            });
        }
    }
}