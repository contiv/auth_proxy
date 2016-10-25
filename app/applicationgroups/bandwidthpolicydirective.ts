/**
 * Created by hardik gandhi on 6/28/16.
 */
import { Component, Input, OnChanges } from '@angular/core';
import * as _ from 'lodash';
import { NetprofilesModel } from "../components/models/netprofilesmodel";
/*
angular.module("contiv.applicationgroups")
    .directive("ctvBandwidthpolicy", function () {
        return {
            restrict: 'E',
            scope: {
                mode: "=",
                applicationgroup: '='
            },

            controller: [
                '$scope',
                'NetprofilesModel',
                function ($scope,
                          NetprofilesModel) {
                    $scope.netProfiles = [];
                    $scope.selectedNetprofile = {
                        policy: {}
                    };

                    /**
                     * Get profiles for the given tenant.
                     */
                    /*function getNetprofiles() {
                        NetprofilesModel.get().then(function (result) {
                            $scope.netProfiles = _.filter(result, {
                                'tenantName': 'default'        //TODO: Remove hardcoded tenant.
                            });
                            if ($scope.applicationgroup.netProfile !== '') {
                                $scope.selectedNetprofile.policy = _.find($scope.netProfiles, function (policy) {
                                    return policy.profileName === $scope.applicationgroup.netProfile;
                                });
                            }
                        });
                    }

                    /**
                     * Assign profileName to applicationgroup whichever user has given
                     */
                    /*$scope.updateApplicationgroup = function () {
                        if ($scope.selectedNetprofile.policy === null) {
                            $scope.applicationgroup.netProfile = '';
                        } else {
                            $scope.applicationgroup.netProfile = $scope.selectedNetprofile.policy.profileName;
                        }
                    };

                    getNetprofiles();
                }],

            templateUrl: 'applicationgroups/bandwidthpolicy.html'
        }
    });*/
@Component({
    selector: 'ctv-bandwidthpolicy',
    templateUrl: 'applicationgroups/bandwidthpolicy.html'
})
export class BandwidthPolicySelectionComponent implements OnChanges {
    @Input('mode') mode:string;
    @Input('applicationgroup') applicationgroup:any;

    netProfiles:any[] = [];
    selectedNetprofile:any = {};
    netProfileSearchText:string = '';

    constructor(private netprofilesModel:NetprofilesModel) {}

    ngOnChanges() {
        var component = this;
        /**
         * Get profiles for the given tenant.
         */
        function getNetprofiles() {
            component.netprofilesModel.get(false).then(function (result) {
                component.netProfiles = _.filter(result, {
                    'tenantName': 'default'        //TODO: Remove hardcoded tenant.
                });
                if (component.applicationgroup.netProfile !== '') {
                    component.selectedNetprofile = _.find(component.netProfiles, function (policy) {
                        return policy.profileName === component.applicationgroup.netProfile;
                    });
                }
            });
        }
        getNetprofiles();
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


