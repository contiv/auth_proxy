/**
 * Created by cshampur on 7/18/16.
 */
'use strict';

describe('contiv.utils module', function () {
    var endpoints = [
        {
            "containerID": "62e6dfd7b5de1b0faf8c8c1c12f87862b6f7f6daa4f55e3bfcc6a5171c67637c",
            "homingHost": "cluster-node1",
            "ipAddress": [
                "20.1.1.3",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:359cfcc54ee996864ed1e31d4313297aa7b726e0f8244694d63282679dfcf6ba]",
            "macAddress": "02:02:14:01:01:03",
            "name": "182d045f309960e4e83d5f65cf7dbdb63aaa37e9c4642e2086e5989511ef9afa",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        },
        {
            "containerID": "e1d8ae7112564b4029f218cb9fa239359937e77a3bfaf259a4be788b889b1369",
            "homingHost": "cluster-node1",
            "ipAddress": [
                "20.1.1.4",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:5460ddf75d46c10f8a91b7f52ab2b4aa397c43c41c376773b98f44c7fc18d878]",
            "macAddress": "02:02:14:01:01:04",
            "name": "957c34540c5d9515698547d62263a080b0b8c0ca5d586cdd6c6d983f4a837231",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        },
        {
            "containerID": "fbc5e16d9a2c1211d80c36e3e8c4bf7243f1478586941c6a50db2fe226174d4e",
            "homingHost": "cluster-node1",
            "ipAddress": [
                "20.1.1.5",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:4555870c6d4af62b63ece84001271129cd437ee2abb72cf94c244f9a739e7827 env:prod]",
            "macAddress": "02:02:14:01:01:05",
            "name": "b31de2e1be08e6b741210f8028ed442393b49bd2bfbf81c7085cab10454cead0",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        }
    ];

    var newEndpointA = [
        {
            "containerID": "62e6dfd7b5de1b0faf8c8c1c12f87862b6f7f6daa4f55e3bfcc6a5171c67637c",
            "homingHost": "cluster-node1",
            "ipAddress":[
                "20.1.1.3",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:359cfcc54ee996864ed1e31d4313297aa7b726e0f8244694d63282679dfcf6ba]",
            "macAddress": "02:02:14:01:01:03",
            "name": "182d045f309960e4e83d5f65cf7dbdb63aaa37e9c4642e2086e5989511ef9afa",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        },
        {
            "containerID": "e1d8ae7112564b4029f218cb9fa239359937e77a3bfaf259a4be788b889b1369",
            "homingHost": "cluster-node1",
            "ipAddress":[
                "20.1.1.4",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:5460ddf75d46c10f8a91b7f52ab2b4aa397c43c41c376773b98f44c7fc18d878]",
            "macAddress": "02:02:14:01:01:04",
            "name": "957c34540c5d9515698547d62263a080b0b8c0ca5d586cdd6c6d983f4a837231",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        }
    ];

    var newEndpointB = [
        {
            "containerID": "61e6dfd7b5de1b0faf8c8c1c12f87862b6f7f6daa4f55e3bfcc6a5171c67637c",
            "homingHost": "cluster-node1",
            "ipAddress": [
                "20.1.1.3",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:359cfcc54ee996864ed1e31d4313297aa7b726e0f8244694d63282679dfcf6ba]",
            "macAddress": "02:02:14:01:01:03",
            "name": "182d045f309960e4e83d5f65cf7dbdb63aaa37e9c4642e2086e5989511ef9afa",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        },
        {
            "containerID": "e1d8ae7112564b4029f218cb9fa239359937e77a3bfaf259a4be788b889b1369",
            "homingHost": "cluster-node1",
            "ipAddress": [
                "20.1.1.4",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:5460ddf75d46c10f8a91b7f52ab2b4aa397c43c41c376773b98f44c7fc18d878]",
            "macAddress": "02:02:14:01:01:04",
            "name": "957c34540c5d9515698547d62263a080b0b8c0ca5d586cdd6c6d983f4a837231",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        },
        {
            "containerID": "fbc5e16d9a2c1211d80c36e3e8c4bf7243f1478586941c6a50db2fe226174d4e",
            "homingHost": "cluster-node1",
            "ipAddress": [
                "20.1.1.5",
                ""
            ],
            "labels": "map[app:web com.docker.swarm.id:4555870c6d4af62b63ece84001271129cd437ee2abb72cf94c244f9a739e7827 env:prod]",
            "macAddress": "02:02:14:01:01:05",
            "name": "b31de2e1be08e6b741210f8028ed442393b49bd2bfbf81c7085cab10454cead0",
            "network": "contiv-net1.default",
            "serviceName": "serviceLb1"
        }
    ];

    beforeEach(module('ui.router'));
    beforeEach(module('contiv.utils'));

    var InspectService;

    describe("InspectService", function () {
        beforeEach(inject(function ($injector) {
            InspectService = $injector.get('InspectService');
        }));
        it('should be defined', function () {
            expect(InspectService).toBeDefined();
        });
        it('buildEndPoints function should convert container details into an array of name value pairs', function () {
            var containerDetails = InspectService.buildEndPoints(endpoints);
            expect(Object.keys(containerDetails).length).toEqual(endpoints.length);
        });
        it('labels inside endpoints should be an array and IP Address should be a string',function(){
            var containerDetails = InspectService.buildEndPoints(endpoints);
            var endpointAttrArray = containerDetails[endpoints[0].name]
            for (var i in endpointAttrArray){
                if(endpointAttrArray[i].name == 'labels')
                    expect(Array.isArray((endpointAttrArray[i].value))).toBeTruthy();
                if(endpointAttrArray[i].name == "ipAddress")
                    expect(typeof endpointAttrArray[i].value == "string").toBeTruthy();
            }
        });
        it ('checkContainerChanged function correctly evaluates changes in container configurations', function(){
            var contDetailsA = InspectService.buildEndPoints(endpoints);
            var contDetailsB = InspectService.buildEndPoints(newEndpointA);
            var contDetailsC = InspectService.buildEndPoints(newEndpointB);
            expect(InspectService.checkContainerChanged(contDetailsA,contDetailsB)).toBeTruthy();
            expect(InspectService.checkContainerChanged(contDetailsA,contDetailsA)).toBeFalsy();
            expect(InspectService.checkContainerChanged(contDetailsA,contDetailsC)).toBeTruthy();
        });
    });
});
