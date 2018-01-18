/**
 * Created by cshampur on 7/17/16.
 */
import { Injectable } from '@angular/core';
import {isUndefined} from "util";

@Injectable()
export class InspectService {
    /* This function would build the containerDetails object.
     eg :
     containerDetails={
     ContainerId1 : [{name: "homingHost", value: "cluster-node1", type: "string", format: "none"},
     {name: macAddress, value: "02:02", type:"string", format:"none"}
     ],
     ContainerId2 : [{name: "homingHost", value: "cluster-node1" type: "string", format: "none"},
     {name: macAddress, value: "02:04", type: "string", format: "none"}
     ]
     }
     --Used in displaying the container detail inside an accordion.
     */
    buildEndPoints(endpoints){
        var containerDetails = {};
        for(var i in endpoints ){
            var containerAttributes = [];
            for(var key in endpoints[i]){
                var endpointAttribute = {};
                endpointAttribute['name'] = key;
                endpointAttribute['format'] = 'none';
                endpointAttribute['type'] = 'string';
                switch (key){
                    case "ipAddress" :  endpointAttribute['value'] = endpoints[i][key].filter(function(ipAddress){return ipAddress.length > 0;}).join();
                        break;
                    case "labels" :     endpointAttribute['value'] = endpoints[i][key].replace(/(map\[|\])/gi,'').replace(/(:)/gi, '=').split(' ')
                        .filter(function(v){return v.length > 0});
                        endpointAttribute['format'] = 'label';
                        endpointAttribute['type'] = 'array';
                        break;
                    default :           endpointAttribute['value'] = endpoints[i][key];
                }
                containerAttributes.push(endpointAttribute);
            }
            containerDetails[endpoints[i].containerID] = containerAttributes;
        }
        return containerDetails
    }

    /*  This function checks whether any new containers were added or not
     View is updated only when there is a change in container configuration
     */
    checkContainerChanged(contDetailsA, contDetailsB){
        if(isUndefined(contDetailsA))
            return true;
        else{
            if(Object.keys(contDetailsA).length != Object.keys(contDetailsB).length)
                return true;
            for(var key in contDetailsB){
                if(!(key in contDetailsA))
                    return true;
            }
            return false;
        }
    }
}