/**
 * Created by vjain3 on 3/10/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PoliciesModel } from "../components/models/policiesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";

@Component({
    selector: 'isolationpolicycreate',
    templateUrl: 'network_policies/isolationpolicycreate.html'
})
export class IsolationPolicyCreateComponent {
    newPolicy;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
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
        this.router.navigate(['../../list', {policyTab: PolicyTab.isolation}], { relativeTo: this.activatedRoute });
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
            isolationPolicyCreateCtrl.policiesModel.create(isolationPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.returnToPolicies();
            }, function errorCallback(result) {
                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.crudHelperService.showServerError(isolationPolicyCreateCtrl, result);
            });
        }
    }
}