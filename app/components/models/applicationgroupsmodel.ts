/**
 * Created by vjain3 on 3/11/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";

@Injectable()
export class ApplicationGroupsModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.APPLICATIONGROUPS_ENDPOINT);
    }

    /**
     * Generate key for application group
     * @param group
     */
    generateKey(group) {
        return group.tenantName + ':' + group.groupName;
    }
}