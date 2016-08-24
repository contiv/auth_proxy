/**
 * Created by cshampur on 8/5/16.
 */


describe('contiv.storagepolicies module', function(){
   var volumeData = [
       {
           "policy":"policy1",
           "name":"vol2",
           "driver":{
               "pool":"rbd"
           },
           "mount":"",
           "create":{
               "size":"50MB",
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
           "backends":{
               "crud":"ceph",
               "mount":"ceph",
               "snapshot":"ceph"
           }
       },
       {
           "policy": "policy1",
           "name": "vol3",
           "driver": {
               "pool": "rbd"
           },
           "mount": "",
           "create": {
               "size": "50MB",
               "filesystem": "ext4"
           },
           "runtime": {
               "snapshots": true,
               "snapshot": {
                   "frequency": "30m",
                   "keep": 20
               },
               "rate-limit": {
                   "write-bps": 100000,
                   "read-bps": 100000
               }
           },
           "backends": {
               "crud": "ceph",
               "mount": "ceph",
               "snapshot": "ceph"
           }
       },
       {
           "policy":"policy8",
           "name":"vol3",
           "driver":{
               "pool":"rbd"
           },
           "mount":"",
           "create":{
               "size":"50MB",
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
           "backends":{
               "crud":"ceph",
               "mount":"ceph",
               "snapshot":"ceph"
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

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.storagepolicies'));

    var $httpBackend;

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.VOLUMES_ENDPOINT).respond(volumeData);
        $httpBackend.when('GET', ContivGlobals.STORAGEPOLICIES_ENDPOINT).respond(storagePolicyData);
        $httpBackend.when('POST', ContivGlobals.STORAGEPOLICIES_ENDPOINT + storagePolicyData[0].name).respond(200);
        $httpBackend.when('DELETE', ContivGlobals.STORAGEPOLICIES_ENDPOINT + storagePolicyData[0].name + '/').respond(200);
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    describe('storagepolicylist controller', function(){
        var $controller, $interval, $rootScope, $filter;
        var storagePolicyListCtrl;
        beforeEach(inject(function(_$interval_, _$rootScope_, _$controller_, _$filter_){
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $filter = _$filter_;
            $controller = _$controller_;
            storagePolicyListCtrl = $controller('StoragePolicyListCtrl',
                { $interval: $interval, $scope: $rootScope, $filter:$filter});
        }));

        it('Should be defined', function(){
            expect(storagePolicyListCtrl).toBeDefined();
            $httpBackend.flush();
            expect(storagePolicyListCtrl.showLoader).toBeFalsy();
        });

        it('Should do a get on /volmaster/policies/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.STORAGEPOLICIES_ENDPOINT);
            $httpBackend.flush();
            expect(storagePolicyListCtrl.policies).toBeDefined();
            expect(storagePolicyListCtrl.policies[0].name).toEqual(storagePolicyData[0].name);
        });
    });


    describe('storagepolicydetails controller', function(){
        var $controller, $interval, $rootScope, $state, $stateParams, $filter;
        var storagePolicyDetailsCtrl;
        beforeEach(inject(function(_$interval_, _$rootScope_, _$controller_, _$filter_, _$state_, _$stateParams_){
            $state = _$state_;
            $state.go = function(name){};
            $stateParams = _$stateParams_;
            $stateParams.key = storagePolicyData[0].name;
            $interval = _$interval_;
            $rootScope = _$rootScope_;
            $filter = _$filter_;
            $controller = _$controller_;
            storagePolicyDetailsCtrl = $controller('StoragePolicyDetailsCtrl',
                { $state: $state, $stateParams: $stateParams, $interval: $interval, $scope: $rootScope, $filter:$filter});
        }));

        it('Should be defined', function(){
            expect(storagePolicyDetailsCtrl).toBeDefined();
            $httpBackend.flush();
        });

        it('Should do a get on /volmaster/policies/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.STORAGEPOLICIES_ENDPOINT);
            $httpBackend.flush();
            expect(storagePolicyDetailsCtrl.policy).toBeDefined();
            expect(storagePolicyDetailsCtrl.policy.name).toEqual(storagePolicyData[0].name);
        });

        it('Should do a get on /volmaster/volumes/ Rest API', function(){
            $httpBackend.expectGET(ContivGlobals.VOLUMES_ENDPOINT);
            $httpBackend.flush();
            var filteredVolumeslength =  volumeData.filter(function(item,index){
                return (item.policy == storagePolicyData[0].name);
            }).length;
            expect(storagePolicyDetailsCtrl.volumes.length).toEqual(filteredVolumeslength);
        });

        it('filesystemcmds must be defined', function(){
            $httpBackend.flush();
            expect(storagePolicyDetailsCtrl.filesystemcmds).toBeDefined();
            angular.forEach(storagePolicyDetailsCtrl.filesystemcmds, function(data,index){
            expect(Object.keys(storagePolicyData[0].filesystems)).toContain(data.name);
            });
        });

        it('Should do a post when policy is edited and saved', function (){
            $httpBackend.flush();
            storagePolicyDetailsCtrl.form = {};
            storagePolicyDetailsCtrl.form.$valid = true;
            storagePolicyDetailsCtrl.savePolicy();
            $httpBackend.expectPOST(ContivGlobals.STORAGEPOLICIES_ENDPOINT + $stateParams.key);
            $httpBackend.flush();
        });

        it('Should do a delete on the policy when clicked on remove button', function () {
            $httpBackend.flush();
            storagePolicyDetailsCtrl.deletePolicy();
            $httpBackend.expectDELETE(ContivGlobals.STORAGEPOLICIES_ENDPOINT + $stateParams.key + '/');
            $httpBackend.flush();
        });

    });

    describe('storagepolicycreate controller', function(){
        var $controller, $rootScope, $stateParams, $state;
        var storagePolicyCreateCtrl;

        beforeEach(inject(function(_$controller_, _$rootScope_, _$stateParams_, _$state_){
            $state = _$state_;
            $state.go = function(name){};
            $controller = _$controller_;
            $rootScope = _$rootScope_;
            $stateParams = _$stateParams_;
            $stateParams.key = storagePolicyData[0].name;
            storagePolicyCreateCtrl = $controller('StoragePolicyCreateCtrl',
                {scope : $rootScope});
        }));
        
        it('Should be defined', function(){
            expect(storagePolicyCreateCtrl).toBeDefined();
        });
        
        it('Should do a post when clicked on createPolicy', function(){
            storagePolicyCreateCtrl.form = {};
            storagePolicyCreateCtrl.form.$valid = true;
            storagePolicyCreateCtrl.newStoragePolicy = storagePolicyData[0];
            storagePolicyCreateCtrl.createPolicy();
            $httpBackend.expectPOST(ContivGlobals.STORAGEPOLICIES_ENDPOINT + $stateParams.key);
            $httpBackend.flush();
        });
        
    });

});