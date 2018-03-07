/**
 * Created by vjain3 on 11/11/16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";


@Component({
    selector: 'ctv-appgroupselection',
    templateUrl: './appgroupselection.html'
})
export class ApplicationGroupSelectionComponent implements OnChanges {
    @Input() mode:string;
    @Input() appProfile:any;

    applicationGroups:any[] = [];          // To Get all application groups of tenant
    applicationGroupSearchText:string = '';

    selectedApplicationGroups:any[] = [];

    constructor(private applicationGroupsModel:ApplicationGroupsModel) {
    }

    ngOnChanges() {
        var component = this;

        component.getApplicationGroups();

        /**
         *  To check 'details' or 'edit' mode (not create mode)
         */
        if (component.mode === 'details' || (component.mode === 'edit' && component.appProfile.appProfileName != "")) {
            //Application Profiles might not have any groups associated with them so define an empty array
            if (component.appProfile.endpointGroups === undefined) {
                component.appProfile.endpointGroups = [];
            }
        }
    }

    /**
     * Get application groups.
     */
    getApplicationGroups() {
        var component = this;
        //Refresh application groups as its links would be updated when a new application profile is created.
        component.applicationGroupsModel.get(true).then(function (result) {
            component.selectedApplicationGroups = _.filter(result, function (group) {
                return _.includes(component.appProfile.endpointGroups, group['groupName']);
            });
            //No two application profiles can share the same application groups
            component.applicationGroups = _.filter(result, function (group) {
                return (((_.isEmpty(group['links'].AppProfile)) || (group['links'].AppProfile.key === component.appProfile.key))
                && (group['tenantName'] === component.appProfile.tenantName));
            });
        });
    }

    /**
     * Add group to app profile
     */
    addApplicationGroup(groupName:string) {
        var component = this;
        var currentGroupName = groupName;

        if (currentGroupName !== undefined && !_.includes(component.appProfile.endpointGroups, currentGroupName)) {
            let key = component.appProfile.tenantName + ':' + currentGroupName;
            component.applicationGroupsModel.getModelByKey(key, false, undefined).then(function (group) {
                component.selectedApplicationGroups.push(group);
                component.selectedApplicationGroups = component.selectedApplicationGroups.slice();
            });
            //To be added to application group and saved to the server
            component.appProfile.endpointGroups.push(currentGroupName);
        }
    };

    /**
     * Remove group from app profile
     */
    removeApplicationGroup(groupName:string) {
        _.remove(this.selectedApplicationGroups, function (group) {
            return group['groupName'] === groupName;
        });
        this.selectedApplicationGroups = this.selectedApplicationGroups.slice();
        _.remove(this.appProfile.endpointGroups, function (group) {
            return group === groupName;
        });
    };
}