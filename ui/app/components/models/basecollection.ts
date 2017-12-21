/**
 * Created by vjain3 on 10/7/16.
 */
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import * as _ from 'lodash';
import { ApiService } from "../utils/apiservice";
import {isArray} from "util";
import {isString} from "util";

/**
 * BaseCollection class that does just fetch of the objects.
 * @param $http
 * @param $q
 * @param url Used for doing HTTP GET and fetch objects from server
 * @constructor
 */
export class BaseCollection {
    models: any;

    constructor(protected http: Http, protected url: string,
                protected apiService: ApiService) {
        this.models = [];
        this.url = url;
    }

    /**
     *
     * @param reload Optional. Default is false
     * @returns {*}
     */
    get(reload):Promise<any> {
        var collection = this;
        if (reload === undefined) reload = false;
        return (!reload && collection.models.length > 0) ?
            new Promise(function (resolve) {
                resolve(collection.models);
            }) : collection.apiService.get(collection.url)
                .map((res: Response) => collection.filterAsyncReq(res)).toPromise()
                .then(function (result) {
                    collection.models = result;
                    return collection.models;
                });
    };

    /**
     * Returns a deep copy of the cached object
     * @param key
     * @param reload Optional. Default is false
     * @param keyname
     * @returns {*}
     */
    getModelByKey(key, reload, keyname):Promise<any> {
        var collection = this;
        if (reload === undefined) reload = false;
        if (keyname === undefined) keyname = 'key';

        var promise = new Promise(function (resolve) {
            if (!reload && collection.models.length > 0) {
                resolve(findModel());
            } else {
                collection.get(reload)
                    .then(function () {
                        resolve(findModel());
                    });
            }
        });

        function findModel() {
            return _.cloneDeep(_.find(collection.models, function (c) {
                return c[keyname] == key;
            }));
        }

        return promise;
    };

    /**
     * Returns a deep copy of the cached object
     * @param model
     * @param reload Optional. Default is false
     * @returns {*}
     */
    getModel(model, reload):Promise<any> {
        var collection = this;
        if (reload === undefined) reload = false;

        var promise = new Promise(function (resolve) {
            if (!reload && collection.models.length > 0) {
                resolve(findModel());
            } else {
                collection.get(reload)
                    .then(function () {
                        resolve(findModel());
                    });
            }
        });

        function findModel() {
            return _.cloneDeep(_.find(collection.models, model));
        }

        return promise;
    };

    clearModel(){
        var collection = this;
        collection.models = [];
    }

    filterAsyncReq(res: Response): any{
        var data = res.json();
        if(this.apiService.authServiceRef.isLoggedIn)
            return data;
        else
            if(isArray(data))
                return [];
            else if(isString(data))
                return '';
            else
                return {};
    }

}