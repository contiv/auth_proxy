/**
 * Created by vjain3 on 12/13/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";
import { ApiService } from "../utils/apiservice";

@Injectable()
export class ContractGroupsModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.CONTRACTS_ENDPOINT, apiService);
    }

    /**
     * Generate policy key to save policy on server
     * @param policy
     * @returns {string}
     */
    generateKey(contractGroup) {
        return contractGroup.tenantName + ':' + contractGroup.contractsGroupName;
    }

}