import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import {isUndefined} from "util";
import { ContivGlobals } from "./contivglobals";
import {ApiService} from "../utils/apiservice";

@Injectable()
export class NetworksModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.NETWORKS_ENDPOINT, apiService);
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

    get(reload: boolean):Promise<any>{
        var collection = this;
        if(collection.cudOperationFlag){
            return new Promise(function(resolve, reject){
                resolve(collection.models)
            })
        }
        else{
            return super.get(reload);
        }
    }
}
