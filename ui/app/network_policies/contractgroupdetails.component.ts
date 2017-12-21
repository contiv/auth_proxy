/**
 * Created by vjain3 on 12/13/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ContractGroupsModel } from "../components/models/contractgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { PolicyTab } from "./networkpoliciestabsctrl";

@Component({
    selector: 'contractgroupdetails',
    templateUrl: './contractgroupdetails.html'
})
export class ContractGroupDetailsComponent {
    contractGroup:any = {};

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private contractGroupsModel:ContractGroupsModel,
                private crudHelperService:CRUDHelperService) {
        var component = this;


        /* Get particular Profile for based on key*/
        component.contractGroupsModel.getModelByKey(activatedRoute.snapshot.params['key'],false,undefined)
            .then(function (contractGroup) {
                component.contractGroup = contractGroup;
            });
        component.crudHelperService.stopLoader(component);

    }

    deleteContractGroup() {
        var component = this;
        component.crudHelperService.startLoader(component);
        component.contractGroupsModel.deleteUsingKey(component.contractGroup.key, 'key', undefined).then(
            function successCallback(result) {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showNotification("External contract group: Deleted", result);
                component.returnToContractGroups();
            }, function errorCallback(result) {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showServerError("External contract group: Delete failed", result);
            });
    }


    returnToContractGroups() {
        this.router.navigate(['../../../list', {policyTab: PolicyTab.contractGroup}], { relativeTo: this.activatedRoute });
    }

    returnToContractDetails() {
        this.router.navigate(['../../details', this.contractGroup.key], { relativeTo: this.activatedRoute });
    }

}