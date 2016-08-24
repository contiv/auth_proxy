/**
 * Created by cshampur on 8/9/16.
 */


describe('contiv.volumes module', function(){
    var volumeList = [
        {
            "policy": "policy1",
            "name": "vol1",
            "driver": {
                "pool": "rbd"
            },
            "mount": "",
            "create": {
                "size": "30MB",
                "filesystem": "ext4"
            },
            "runtime": {
                "snapshots": true,
                "snapshot": {
                    "frequency": "30m",
                    "keep": 20
                },
                "rate-limit": {
                    "write-bps": 1000000,
                    "read-bps": 1000000
                }
            },
            "backends": {
                "crud": "ceph",
                "mount": "ceph",
                "snapshot": "ceph"
            }
        }
    ];

    var storagePolicyData = [
        {
            "name":"policy1",
            "create":{
                "size":"10MB",
                "filesystem":"ext4"
            },
            "runtime":{
                "snapshots":true,
                "snapshot":{
                    "frequency":"30m",
                    "keep":20
                },
                "rate-limit":{
                    "write-bps":100000,
                    "read-bps":100000
                }
            },
            "driver":{
                "pool":"rbd"
            },
            "filesystems":{
                "ext4":"mkfs.ext4 -m0 %"
            },
            "backends":{
                "crud":"ceph",
                "mount":"ceph",
                "snapshot":"ceph"
            }
        }
    ];

    var volMount = {
        Hostname: "mon0",
        Reason: "Mount"
    };

    var volSnapshots = ["2016-08-10-13:52:34.989209498-+0000-UTC", "2016-08-10-14:00:00.872667078-+0000-UTC"];

    var policy = "policy1";
    var volume = "vol1";

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.volumes'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.VOLUMES_ENDPOINT).respond(volumeList);
        $httpBackend.when('GET', ContivGlobals.VOLUMES_USES_ENDPOINT + policy + '/' + volume).respond(volMount);
        $httpBackend.when('GET', ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT + policy + '/' + volume).respond(volSnapshots);
        $httpBackend.when('GET', ContivGlobals.STORAGEPOLICIES_ENDPOINT).respond(storagePolicyData);
        $httpBackend.when('DELETE', ContivGlobals.VOLUMES_DELETE_ENDPOINT).respond(200);
        $httpBackend.when('POST', ContivGlobals.VOLUMES_CREATE_ENDPOINT).respond(200);
        $httpBackend.when('POST', ContivGlobals.VOLUMES_COPYSNAPSHOTS_ENDPOINT).respond(200);
        $httpBackend.when('POST', ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT + "take" + '/' + policy + '/' + volume).respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('VolumeListCtrl controller', function(){
        var $controller, $interval, $rootScope, $filter;
        var volumeListCtrl;
        beforeEach(inject(function(_$interval_, _$rootScope_, _$controller_, _$filter_){
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $filter = _$filter_;
            $controller = _$controller_;
            volumeListCtrl = $controller('VolumeListCtrl',
                { $interval: $interval, $scope: $rootScope, $filter:$filter});
        }));

        it('Should be defined', function(){
            expect(volumeListCtrl).toBeDefined();
            $httpBackend.flush();
            expect(volumeListCtrl.showLoader).toBeFalsy();
        });

        it('Should do a get on /volmaster/volumes/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.VOLUMES_ENDPOINT);
            $httpBackend.flush();
            expect(volumeListCtrl.volumes).toBeDefined();
            expect(volumeListCtrl.volumes[0].name).toEqual(volumeList[0].name);
        });
    });
    

    describe('VolumeDetailsCtrl controller', function(){
        var $controller, $interval, $rootScope, $stateParams, $state;
        var volumeDetailsCtrl;
        beforeEach(inject(function(_$interval_, _$rootScope_, _$controller_, _$stateParams_,_$state_){
            $interval = _$interval_;
            $state = _$state_;
            $state.go = function(statename){};
            $stateParams = _$stateParams_;
            $stateParams.key=volumeList[0].policy+'/'+volumeList[0].name;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            volumeDetailsCtrl = $controller('VolumeDetailsCtrl',
                { $interval: $interval, $scope: $rootScope, $stateParams:$stateParams });
        }));

        it('should be defined', function(){
            expect(volumeDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });
        
        it('should do a get on /volmaster/volumes/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.VOLUMES_ENDPOINT);
            $httpBackend.flush();
            expect(volumeDetailsCtrl.volume).toBeDefined();
            expect(volumeDetailsCtrl.volume.name).toEqual(volumeList[0].name);
        });
        
        it('should do a get on /volmaster/uses/mounts/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.VOLUMES_USES_ENDPOINT+policy+'/'+volume);
            $httpBackend.flush();
            expect(volumeDetailsCtrl.volumeUse).toBeDefined();
            expect(volumeDetailsCtrl.volumeUse.Hostname).toEqual(volMount.Hostname);
        });

        it('should do a get on /volmaster/snapshots/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT+policy+'/'+volume);
            $httpBackend.flush();
            expect(volumeDetailsCtrl.snapshots).toBeDefined();
            expect(volumeDetailsCtrl.snapshots.length).toEqual(volSnapshots.length);
        });

        it('should delete the volume when clicked on remove button', function(){
            $httpBackend.flush();
            volumeDetailsCtrl.deleteVolume();
            $httpBackend.expectDELETE(ContivGlobals.VOLUMES_DELETE_ENDPOINT);
            $httpBackend.flush();
        });

        it('should do a POST on /volmaster/snapshots/take/ Rest Api', function(){
            $httpBackend.flush();
            volumeDetailsCtrl.triggerVolumeSnapshot();
            $httpBackend.expectPOST(ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT + "take/" + policy + '/' + volume);
            $httpBackend.flush();
        });
    });


    describe('VolumeCreateCtrl controller', function(){
        var $controller, $interval, $rootScope, $stateParams, $state;
        var volumeCreateCtrl;
        beforeEach(inject(function(_$interval_, _$rootScope_, _$controller_, _$stateParams_,_$state_){
            $interval = _$interval_;
            $state = _$state_;
            $state.go = function(statename){};
            $stateParams = _$stateParams_;
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            volumeCreateCtrl = $controller('VolumeCreateCtrl',
                { $interval: $interval, $scope: $rootScope, $stateParams:$stateParams });
        }));

        it('should get the list of storage policies to use while volume create', function(){
            $httpBackend.expectGET(ContivGlobals.STORAGEPOLICIES_ENDPOINT);
            $httpBackend.flush();
            expect(volumeCreateCtrl.policies).toBeDefined();
        });
        
        it('should do a post on /volmaster/volumes/create/ when creating volume', function(){
            $httpBackend.flush();
            volumeCreateCtrl.form = {};
            volumeCreateCtrl.form.$valid = true;
            volumeCreateCtrl.selectedPolicy = storagePolicyData[0];
            volumeCreateCtrl.createVolume();
            $httpBackend.expectPOST(ContivGlobals.VOLUMES_CREATE_ENDPOINT);
            $httpBackend.flush();
        });

    });

    describe('VolumeSnapshotCopyCtrl controller', function(){
        var $controller, $rootScope, $stateParams, $state;
        var volumeSnapshotCopyCtrl;
        beforeEach(inject(function(_$rootScope_, _$controller_, _$stateParams_,_$state_){
            $state = _$state_;
            $state.go = function(statename){};
            $stateParams = _$stateParams_;
            $stateParams = {"policy": "policy1", "volume": "vol1", "snapshot": "2016-08-11-01:30:00.71887684-+0000-UTC" };
            $rootScope = _$rootScope_;
            $controller = _$controller_;
            volumeSnapshotCopyCtrl = $controller('VolumeSnapshotCopyCtrl',
                {$scope: $rootScope, $stateParams:$stateParams });
        }));
        
        it(' should be defined', function(){
            expect(volumeSnapshotCopyCtrl).toBeDefined(); 
        });
        
        it('should do a post on /volmaster/volumes/copy when clicked on copy', function(){
            volumeSnapshotCopyCtrl.form = {};
            volumeSnapshotCopyCtrl.form.$valid = true;
            volumeSnapshotCopyCtrl.newvolume = 'vol3';
            volumeSnapshotCopyCtrl.copySnapshot();
            $httpBackend.expectPOST(ContivGlobals.VOLUMES_COPYSNAPSHOTS_ENDPOINT);
            $httpBackend.flush();
        });
    });
});