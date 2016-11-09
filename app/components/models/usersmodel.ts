/**
 * Created by vjain3 on 11/7/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import { ContivGlobals } from "./contivglobals";
import { ApiService } from "../utils/apiservice";
import * as _ from 'lodash';

@Injectable()
export class UsersModel extends Collection {
    constructor(http:Http, apiService:ApiService) {
        super(http, ContivGlobals.USERS_ENDPOINT, apiService);
    }

    /**
     * Generate key for application group
     * @param group
     */
    generateKey(user) {
        return user.tenantName + ':' + user.username;
    }

    create(model, url):Promise<any> {
        var collection = this;
        var promise = new Promise(function (resolve, reject) {
            collection.models.push(model);
            resolve(model);
        });
        return promise;
    }

    getModelByKey(key, reload, keyname):Promise<any> {
        return super.getModelByKey(key, false, keyname);
    }

    save(model):Promise<any> {
        var collection = this;
        var promise = new Promise(function (resolve, reject) {
            _.remove(collection.models, function (n) {
                return n['key'] == model['key'];
            });
            collection.models.push(model);
            resolve(model);
        });
        return promise;
    }

    delete(model):Promise<any> {
        var collection = this;
        var promise = new Promise(function (resolve, reject) {
            _.remove(collection.models, function (n) {
                return n['key'] == model['key'];
            });
            resolve(model);
        });
        return promise;
    };
}