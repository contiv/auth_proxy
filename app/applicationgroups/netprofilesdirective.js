/**
 * Created by hardik gandhi on 6/28/16.
 */

angular.module("contiv.applicationgroups")
    .controller('NetprofileCtrl',['$scope','NetprofilesModel', function ($scope,NetprofilesModel) {

        var netProfiles = [];
        /**
         * Get profiles for the given tenant.
         */
        function getNetprofiles() {
            NetprofilesModel.get().then(function (result) {
                $scope.netProfiles = _.filter(result, {
                    'tenantName': 'default'        //TODO: Remove hardcoded tenant.
                });
            });
        }
        getNetprofiles();
    }])
    .directive("ctvNetprofiles", function() {
        return {
            restrict: 'E',
            scope: {
                type:"@",
                netprofile:'='
            },

            controller: 'NetprofileCtrl',

            templateUrl: 'applicationgroups/netprofiles.html'
        }
    });



