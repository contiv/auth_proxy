/**
 * Created by vjain3 on 12/14/16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { ContractGroupsModel } from "../components/models/contractgroupsmodel";

@Component({
    selector: 'ctv-contractgroup',
    templateUrl: './contractgroup.html'
})
export class ContractGroupSelectionComponent implements OnChanges {
    @Input() mode:string;
    @Input() applicationgroup:any;

    selectedContractGroups:any[] = [];  // To Store contract groups selected by user to display
    contractGroups:any[] = [];          // To Get all contract groups of tenant
    contractGroupSearchText:string = '';

    constructor(private contractGroupsModel:ContractGroupsModel) {

    }

    ngOnChanges() {
        let component = this;

        /**
         * Get contract group objects for each contract group present in applicationgroup
         */
        function getSelectedContractGroups() {
            component.applicationgroup.extContractsGrps.forEach(function (contractGroup) {
                //To display details of selected contract groups
                let key = component.applicationgroup.tenantName + ':' + contractGroup;
                component.contractGroupsModel.getModelByKey(key, false, undefined)
                    .then(function (group) {
                        component.selectedContractGroups.push(group);
                    });
            });
        }

        /**
         *  To check 'details' or 'edit' mode (not create mode)
         */
        if (component.mode === 'details' || (component.mode === 'edit' && component.applicationgroup.groupName != "")) {
            component.getContractGroups();
            //Application Groups might not have any contract groups associated with them so define an empty array
            if (component.applicationgroup.extContractsGrps === undefined) {
                component.applicationgroup.extContractsGrps = [];
            }
            getSelectedContractGroups();
        }
    }

    /**
     * Get contract groups for the given tenant.
     */
    getContractGroups() {
        let component = this;
        component.contractGroupsModel.get(false).then(function (result) {
            component.contractGroups = _.filter(result, {
                'tenantName': component.applicationgroup.tenantName
            });
        });
    }

    /**
     * Add contract group to application group
     */
    addContractGroup(contractGroupName) {
        let component = this;

        if (contractGroupName !== undefined && _.includes(component.selectedContractGroups, contractGroupName) == false) {
            //To display selected contract groups
            let key = component.applicationgroup.tenantName + ':' + contractGroupName;
            component.contractGroupsModel.getModelByKey(key, false, undefined)
                .then(function (group) {
                    component.selectedContractGroups.push(group);
                });

            //To be added to application group and saved to the server
            component.applicationgroup.extContractsGrps
                .push(contractGroupName);
        }
    };

    /**
     * Remove contract group from application group
     */
    removeContractGroup(contractGroupName) {
        _.remove(this.selectedContractGroups, function (group) {
            return group.contractsGroupName === contractGroupName;
        });
        _.remove(this.applicationgroup.extContractsGrps, function (group) {
            return group === contractGroupName;
        });

    };
}