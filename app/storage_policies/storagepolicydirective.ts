/**
 * Created by vjain3 on 6/2/16.
 */
angular.module("contiv.storagepolicies")
    .directive("ctvStoragepolicybasicsettings", function() {
        return {

        }
    })
    .directive("ctvStoragepolicyfilesystemsettings", function() {
        return {
            restrict: 'E',
            scope: {
                policy: '=',
                filesystemcmds: '='
            },
            link: function(scope) {
                scope.filesystems = ['ext4', 'btrfs'];
            },
            templateUrl: 'storage_policies/filesystemsettings.html'
        }
    })
    .directive("ctvStoragepolicysnapshotsettings", function() {
        return {
            restrict: 'E',
            scope: {
                policy: '='
            },
            templateUrl: 'storage_policies/snapshotsettings.html'
        }
    })
    .directive("ctvStoragepolicyrwopssettings", function() {
        return {
            restrict: 'E',
            scope: {
                policy: '='
            },
            templateUrl: 'storage_policies/rwopssettings.html'
        }
    })
    .directive("ctvStoragepolicybackenddrivers", function() {
        return {
            restrict: 'E',
            scope: {
                policy: '='
            },
            templateUrl: 'storage_policies/backenddrivers.html'
        }
    });
