/**
 * Created by vjain3 on 4/18/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Collection } from "./collection";
import * as _ from 'lodash';

@Injectable()
export class StoragePoliciesModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.STORAGEPOLICIES_ENDPOINT);
    }

    create(model) {
        var collection = this;
        var url = collection.url + model.name;
        return super.create(model, url);
    }

    save(model) {
        var collection = this;
        var promise = new Promise(function (resolve, reject) {
            var url = collection.url + model.name;
            collection.http.post(url, model).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    _.remove(collection.models, function (n) {
                        return n.name == model.name;
                    });
                    collection.models.push(model);
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });
        return promise;
    }

}