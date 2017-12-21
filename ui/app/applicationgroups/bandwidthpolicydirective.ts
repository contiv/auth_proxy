/**
 * Created by hardik gandhi on 6/28/16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { NetprofilesModel } from "../components/models/netprofilesmodel";
import { isUndefined } from "util";

@Component({
    selector: 'ctv-bandwidthpolicy',
    templateUrl: './bandwidthpolicy.html'
})
export class BandwidthPolicySelectionComponent implements OnChanges {
    @Input('mode') mode:string;
    @Input('applicationgroup') applicationgroup:any;

    netProfiles:any[] = [];
    selectedNetprofile:any = {};
    netProfileSearchText:string = '';

    constructor(private netprofilesModel:NetprofilesModel) {
    }

    ngOnChanges() {
        var component = this;
        component.getNetprofiles();
    }

    /**
     * Get profiles for the given tenant.
     */
    getNetprofiles() {
        var component = this;
        component.netprofilesModel.get(false).then(function (result) {
            component.netProfiles = _.filter(result, {
                'tenantName': component.applicationgroup.tenantName
            });
            if ((component.applicationgroup.netProfile !== '') && (!isUndefined(component.applicationgroup['netProfile']))) {
                component.selectedNetprofile = _.find(component.netProfiles, function (policy) {
                    return policy.profileName === component.applicationgroup.netProfile;
                });
            }
        });
    }

    updateApplicationgroup(netprofile) {
        this.selectedNetprofile = netprofile;
        if (this.selectedNetprofile === null) {
            this.applicationgroup.netProfile = '';
        } else {
            this.applicationgroup.netProfile = this.selectedNetprofile.profileName;
        }
    };
}


