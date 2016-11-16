/**
 * Created by vjain3 on 11/11/16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";


@Component({
    selector: 'ctv-appgroupselection',
    templateUrl: 'appprofiles/appgroupselection.html'
})
export class ApplicationGroupSelectionComponent implements OnChanges {
    @Input() mode:string;
    @Input() appProfile:any;

    applicationGroups:any[] = [];          // To Get all application groups of tenant
    applicationGroupSearchText:string = '';

    selectedApplicationGroups:any[] = [];

    constructor(private applicationGroupsModel:ApplicationGroupsModel) {}

    ngOnChanges() {
        var component = this;

        /**
         * Get application groups.
         */
        function getApplicationGroups() {
            //Refresh application groups as its links would be updated when a new application profile is created.
            component.applicationGroupsModel.get(true).then(function (result) {
                component.selectedApplicationGroups = _.filter(result, function(group) {
                    return _.includes(component.appProfile.endpointGroups, group['groupName']);
                });
                //No two application profiles can share the same application groups
                component.applicationGroups = _.filter(result, function(group) {
                    return ((_.isEmpty(group['links'].AppProfile))
                    || (group['links'].AppProfile.key === component.appProfile.key));
                });
            });
        }

        getApplicationGroups();

    }

    /**
     * Add group to app profile
     */
    addApplicationGroup(groupName: string) {
        var component = this;
        var currentGroupName = groupName;

        if (currentGroupName !== undefined && !_.includes(component.appProfile.endpointGroups, currentGroupName)) {
            let key = 'default:' + currentGroupName;
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
    removeApplicationGroup(groupName: string) {
        _.remove(this.selectedApplicationGroups, function (group) {
            return group['groupName'] === groupName;
        });
        this.selectedApplicationGroups = this.selectedApplicationGroups.slice();
        _.remove(this.appProfile.endpointGroups, function (group) {
            return group === groupName;
        });
    };
}