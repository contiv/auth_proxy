import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";
import {ApiService} from "../utils/apiservice";

@Injectable()
export class OrganizationsModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.ORGANIZATIONS_ENDPOINT, apiService);
    }
}