/**
 * Created by vjain3 on 12/13/16.
 */
import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContractGroupsModel } from "../components/models/contractgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";
import { OrganizationsModel } from "../components/models/organizationsmodel";

@Component({
    selector: 'contractgroupcreate',
    templateUrl: './contractgroupcreate.html'
})
export class ContractGroupCreateComponent implements OnInit {
    newContractGroup:any;
    tenants:any[] = [];
    contractsString:string;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private organizationsModel: OrganizationsModel,
                private contractGroupsModel: ContractGroupsModel,
                private crudHelperService: CRUDHelperService) {
        let component = this;

        function resetForm() {
            crudHelperService.stopLoader(component);
            component.newContractGroup = {
                contractGroupName: '',
                tenantName: '',
                contractsType: '',
                contracts: []
            };
        }

        resetForm();
    }

    ngOnInit() {
        let component = this;
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

    returnToContractGroups() {
        this.router.navigate(['../../list', {policyTab: PolicyTab.contractGroup}], { relativeTo: this.activatedRoute });
    }

    cancelCreating() {
        this.returnToContractGroups();
    }

    parseContracts() {
        var re = /\s*,\s*/; //uses 0 or more spaces followed by , followed by 0 or more spaces as separator
        Array.prototype.push.apply(this.newContractGroup.contracts, this.contractsString.split(re));
    }

    createContractGroup(validform: boolean) {
        let component = this;
        if (validform) {
            component.crudHelperService.startLoader(component);
            component.newContractGroup.key =
                component.contractGroupsModel.generateKey(component.newContractGroup);
            component.parseContracts();
            component.contractGroupsModel.create(component.newContractGroup, undefined).then(function successCallback(result) {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showNotification("External contract group: Created", result.key);
                component.returnToContractGroups();
            }, function errorCallback(result) {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showServerError("External contract group: Create failed", result);
            });
        }
    }
}