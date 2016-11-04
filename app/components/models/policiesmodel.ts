import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";

@Injectable()
export class PoliciesModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.POLICIES_ENDPOINT);
    }

    /**
     * Generate policy key to save policy on server
     * @param policy
     * @returns {string}
     */
    generateKey(policy) {
        return policy.tenantName + ':' + policy.policyName;
    }
}