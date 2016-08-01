/**
 * Created by cshampur on 7/17/16.
 */
angular.module("contiv.utils")
    .factory("InspectService", function(){

        /* This function would build the containerDetails object.
         eg :
         containerDetails={
         ContainerName1 : [{name: "homingHost", value: "cluster-node1", type: "string", format: "none"},
         {name: macAddress, value: "02:02", type:"string", format:"none"}
         ],
         ContainerName2 : [{name: "homingHost", value: "cluster-node1" type: "string", format: "none"},
         {name: macAddress, value: "02:04", type: "string", format: "none"}
         ]
         }
         --Used in displaying the container detail inside an accordion.
         */
        function buildEndPoints(endpoints){
            var containerDetails = {};
            for(var i in endpoints ){
                var containerAttributes = [];
                for(var key in endpoints[i]){
                    var endpointAttribute = {};
                    endpointAttribute.name = key;
                    endpointAttribute.format = 'none';
                    endpointAttribute.type = 'string';
                    switch (key){
                        case "ipAddress" :  endpointAttribute.value = endpoints[i][key].filter(function(ipAddress){return ipAddress.length > 0;}).join();
                            break;
                        case "labels" :     endpointAttribute.value = endpoints[i][key].replace(/(map\[|\])/gi,'').replace(/(:)/gi, '=').split(' ')
                            .filter(function(v){return v.length > 0});
                            endpointAttribute.format = 'label';
                            endpointAttribute.type = 'array';
                            break;
                        default :           endpointAttribute.value = endpoints[i][key];
                    }
                    containerAttributes.push(endpointAttribute);
                }
                containerDetails[endpoints[i].name] = containerAttributes;
            }
            return containerDetails
        }
        
        /*  This function checks whether any new containers were added or not
         View is updated only when there is a change in container configuration
         */
        function checkContainerChanged(contDetailsA, contDetailsB){
            if(contDetailsA == undefined)
                return true;
            else{
                if(contDetailsA != undefined && contDetailsB != undefined){
                    if(Object.keys(contDetailsA).length != Object.keys(contDetailsB).length)
                        return true;
                    for(var key in contDetailsB){
                        if(!key in contDetailsA)
                            return true;
                    }
                    return false;
                }
            }

        }
        
        return {
            buildEndPoints : buildEndPoints,
            checkContainerChanged : checkContainerChanged
        }
    });
