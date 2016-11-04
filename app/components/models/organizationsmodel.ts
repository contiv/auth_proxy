import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";

@Injectable()
export class OrganizationsModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.ORGANIZATIONS_ENDPOINT);
    }
}