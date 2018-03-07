/**
 * Created by vjain3 on 11/11/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";
import { ApiService } from "../utils/apiservice";


@Injectable()
export class AppProfilesModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.APP_PROFILES_ENDPOINT, apiService);
    }

    /**
     * Generate key for application profile
     * @param profile
     */
    generateKey(profile) {
        return profile.tenantName + ':' + profile.appProfileName;
    }

}
