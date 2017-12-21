/**
 * Created by vjain3 on 11/21/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Collection} from "./collection";
import { ContivGlobals } from "./contivglobals";
import { ApiService } from "../utils/apiservice";

@Injectable()
export class BgpsModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.BGPS_ENDPOINT, apiService);
    }
}