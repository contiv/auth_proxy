/**
 * Created by vjain3 on 3/10/16.
 */
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { PoliciesModel } from "../components/models/policiesmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";
import { OrganizationsModel } from "../components/models/organizationsmodel";

@Component({
    selector: 'isolationpolicycreate',
    templateUrl: './isolationpolicycreate.html'
})

export class IsolationPolicyCreateComponent implements OnInit {
    newPolicy:any;
    tenants:any[] = [];
    policyMode:string = 'isolation'

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private organizationsModel: OrganizationsModel,
                private policiesModel: PoliciesModel,
                private crudHelperService: CRUDHelperService) {

        var component = this;

        function setMode() {
            if (activatedRoute.routeConfig.path.includes('isolation')) {
                component.policyMode = 'isolation';
            } else {
                component.policyMode = 'bandwidth';
            }
        }

        function resetForm() {
            crudHelperService.stopLoader(component);
            component.newPolicy = {
                policyName: '',
                tenantName: ''
            };
        }

        setMode();

        resetForm();
    }

    ngOnInit() {
        var component = this;
        component.crudHelperService.startLoader(component);

        function getTenants(reload: boolean) {
            component.organizationsModel.get(reload)
                .then((result) => {
                    component.tenants = result;
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                });
        }

        getTenants(false);
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
            isolationPolicyCreateCtrl.crudHelperService.startLoader(isolationPolicyCreateCtrl);
            isolationPolicyCreateCtrl.newPolicy.key =
                isolationPolicyCreateCtrl.policiesModel.generateKey(isolationPolicyCreateCtrl.newPolicy);
            isolationPolicyCreateCtrl.policiesModel.create(isolationPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.crudHelperService.showNotification("Isolation policy: Created", result.key);
                isolationPolicyCreateCtrl.returnToPolicies();
            }, function errorCallback(result) {
                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
                isolationPolicyCreateCtrl.crudHelperService.showServerError("Isolation policy: Create failed", result);
            });
        }
    }
}
