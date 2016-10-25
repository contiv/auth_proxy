/**
 * Created by vjain3 on 3/11/16.
 */
/**
 * Created by vjain3 on 3/10/16.
 */
import { Component, Inject } from '@angular/core';
import { StateService } from "angular-ui-router/commonjs/ng1";
import { NetworksModel } from "../components/models/networksmodel";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";

@Component({
    selector: 'applicationgroupcreate',
    templateUrl: 'applicationgroups/applicationgroupcreate.html'
})
export class ApplicationGroupCreateComponent {
    networks:any[] = [];
    applicationGroup:any = {};
    selectedNetwork:string = '';

    constructor(@Inject('$state') private $state:StateService,
                private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private crudHelperService:CRUDHelperService) {

        var applicationGroupCreateCtrl = this;
        /**
         * Get networks for the given tenant.
         */
        function getNetworks() {
            networksModel.get(false).then(function (result) {
                applicationGroupCreateCtrl.networks = _.filter(result, {
                    'tenantName': 'default'//TODO: Remove hardcoded tenant.
                });
            });
        }

        function resetForm() {
            crudHelperService.stopLoader(applicationGroupCreateCtrl);
            crudHelperService.hideServerError(applicationGroupCreateCtrl);
            applicationGroupCreateCtrl.applicationGroup = {
                groupName: '',          // For Group Name
                networkName: '',        // For Network Name
                policies: [],           // For Isolation policies
                netProfile: '',         // For Bandwidth policy Name
                tenantName: 'default'//TODO: Remove hardcoded tenant.
            };
        }

        getNetworks();
        resetForm();
    }

    returnToApplicationGroup() {
        this.$state.go('contiv.menu.applicationgroups.list');
    }

    cancelCreating() {
        this.returnToApplicationGroup();
    }

    createApplicationGroup(validform: boolean) {
        var applicationGroupCreateCtrl = this;
        if (validform) {
            applicationGroupCreateCtrl.crudHelperService.hideServerError(applicationGroupCreateCtrl);
            applicationGroupCreateCtrl.crudHelperService.startLoader(applicationGroupCreateCtrl);
            applicationGroupCreateCtrl.applicationGroup.networkName =
                applicationGroupCreateCtrl.selectedNetwork;

            applicationGroupCreateCtrl.applicationGroup.key =
                applicationGroupCreateCtrl.applicationGroupsModel.generateKey(applicationGroupCreateCtrl.applicationGroup);

            /**
             * applicationGroup consist of Group Name, Network Name, Isolation Policies, Bandwidth Policy
             */

            applicationGroupCreateCtrl.applicationGroupsModel.create(applicationGroupCreateCtrl.applicationGroup).then(
                function successCallback(result) {
                    applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
                    applicationGroupCreateCtrl.returnToApplicationGroup();
                }, function errorCallback(result) {
                    applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
                    applicationGroupCreateCtrl.crudHelperService.showServerError(applicationGroupCreateCtrl, result);
                });
        }
    }

    updateNetwork(networkName) {
        this.selectedNetwork = networkName;
    }
}