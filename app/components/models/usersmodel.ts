/**
 * Created by vjain3 on 11/7/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";
import { ApiService } from "../utils/apiservice";
import * as _ from 'lodash';

@Injectable()
export class UsersModel extends Collection {
    constructor(http:Http, apiService:ApiService) {
        super(http, ContivGlobals.USERS_ENDPOINT, apiService);
    }

    save(model):Promise<any> {
        var collection = this;
        var url = ContivGlobals.USERS_ENDPOINT + '/' +model['username'];
        return this.apiService.patch(url, model).map((res:Response) => res.json()).toPromise()
            .then((result) => {
                _.remove(collection.models, function (n) {
                    return n['username'] == model['username'];
                });
                collection.models.push(result);
                return result;
            });
    }
}