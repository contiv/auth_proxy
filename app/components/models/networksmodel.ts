import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import {isUndefined} from "util";
import { ContivGlobals } from "./contivglobals";

@Injectable()
export class NetworksModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.NETWORKS_ENDPOINT);
    }

    getInspectByKey(key:string, url: string, reload: boolean): Promise<any>{
        return super.getInspectByKey(key,url,reload)
            .then((result) => {
                if(!isUndefined(result['Oper'].endpoints)){
                    var processedEndpoints = [];
                    var endpoints = result['Oper'].endpoints;
                    for(var i=0; i<endpoints.length; i++){
                        if(isUndefined(endpoints[i].containerID)){
                            endpoints[i]['containerID'] = endpoints[i]['endpointID'];
                            endpoints[i]['containerName'] = endpoints[i]['endpointID'].toString().substr(0,6);
                        }
                    }
                    result['Oper'].endpoints = endpoints;
                }
                return result;
            });
    }
}
