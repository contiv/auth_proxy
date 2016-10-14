/**
 * Created by hardik gandhi on 6/15/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";

@Injectable()
export class NetprofilesModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.NETPROFILES_ENDPOINT);
    }

    /**
     * Generate policy key to save policy on server
     * @param policy
     * @returns {string}
     */
   generateKey(policy) {
        return policy.tenantName + ':' + policy.profileName;
    }
}