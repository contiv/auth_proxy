import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";
import {ApiService} from "../utils/apiservice";
import {isUndefined} from "util";

@Injectable()
export class PoliciesModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.POLICIES_ENDPOINT, apiService);
    }

    /**
     * Generate policy key to save policy on server
     * @param policy
     * @returns {string}
     */
    generateKey(policy) {
        return policy.tenantName + ':' + policy.policyName;
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