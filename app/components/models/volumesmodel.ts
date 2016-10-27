/**
 * Created by vjain3 on 3/22/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Collection } from "./collection";
import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import {isUndefined} from "util";

@Injectable()
export class VolumesModel extends Collection {
    constructor(http: Http) {
        super(http, ContivGlobals.VOLUMES_ENDPOINT);
    }

    delete(model) {
        var volumescollection = this;
        var promise = new Promise(function (resolve, reject) {
            var url = ContivGlobals.VOLUMES_DELETE_ENDPOINT;
            //delete endpoint expects volume property in addition to policy. TODO ask to be fixed
            model.volume = model.name;
            var config = {
                data: model
            };
            volumescollection.http.delete(url, config).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    _.remove(volumescollection.models, function (n) {
                        return (n.name == model.name && n.policy == model.policy);
                    });
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });

        return promise;
    }

    create(model) {
        var url = ContivGlobals.VOLUMES_CREATE_ENDPOINT;
        return super.create(model, url);
    }

    copy(model, snapshot, newVolume) {
        var collection = this;
        var promise = new Promise(function (resolve, reject) {
            var url = ContivGlobals.VOLUMES_COPYSNAPSHOTS_ENDPOINT;
            var volcopymodel = {
                name: model.name,
                policy: model.policy,
                Options: {
                    target: newVolume,
                    snapshot: snapshot
                }
            };
            collection.http.post(url, volcopymodel).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    collection.models.push(response);
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });

        return promise;
    }

    /*
    getModel(model:any, reload:boolean): Promise<any>{
        return super.getModel(model, reload).then((result) => {
            if (isUndefined(result)){
                var volume =
                return volume;
            }
        })
    }
    */

}