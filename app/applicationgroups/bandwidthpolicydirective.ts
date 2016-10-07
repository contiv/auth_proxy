/**
 * Created by hardik gandhi on 6/28/16.
 */

angular.module("contiv.applicationgroups")
    .directive("ctvBandwidthpolicy", function() {
        return {
            restrict: 'E',
            scope: {
                mode:"=",
                applicationgroup:'='
            },

            controller: [
                '$scope',
                'NetprofilesModel',
                function ($scope,
                          NetprofilesModel) {
                    $scope.netProfiles = [];
                    $scope.selectedNetprofile = {
                        policy:{}
                    };

                    /**
                     * Get profiles for the given tenant.
                     */
                    function getNetprofiles() {
                        NetprofilesModel.get().then(function (result) {
                            $scope.netProfiles = _.filter(result, {
                                'tenantName': 'default'        //TODO: Remove hardcoded tenant.
                            });
                            if($scope.applicationgroup.netProfile !== ''){
                                $scope.selectedNetprofile.policy = _.find($scope.netProfiles,function(policy){
                                    return policy.profileName === $scope.applicationgroup.netProfile;
                                });
                            }
                        });
                    }

                    /**
                     * Assign profileName to applicationgroup whichever user has given 
                     */
                    $scope.updateApplicationgroup = function(){
                        if($scope.selectedNetprofile.policy === null) {
                            $scope.applicationgroup.netProfile = '';
                        }else{
                            $scope.applicationgroup.netProfile = $scope.selectedNetprofile.policy.profileName;
                        }
                    };
             
                    getNetprofiles();
            }],

            templateUrl: 'applicationgroups/bandwidthpolicy.html'
        }
    });



