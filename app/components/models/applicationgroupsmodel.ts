/**
 * Created by vjain3 on 3/11/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import {Observable} from "rxjs";
import { ContivGlobals } from "./contivglobals";
import {ApiService} from "../utils/apiservice";


@Injectable()
export class ApplicationGroupsModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.APPLICATIONGROUPS_ENDPOINT,apiService);
    }

    /**
     * Generate key for application group
     * @param group
     */
    generateKey(group) {
        return group.tenantName + ':' + group.groupName;
    }

    public get(reload:boolean): Promise<any>{
        return super.get(reload)
                    .then((result) => {
                        //add logic for result processing
                        var items = [];
                        for (let item of result){
                            if (typeof item.policies === 'undefined')
                                item['policies']=[];
                            if (typeof item.networkName === 'undefined')
                                item['networkName']='';
                            items.push(item);
                        }
                        return items;
                    });
        }

}