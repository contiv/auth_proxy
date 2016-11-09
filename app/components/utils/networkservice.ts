import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContivGlobals } from "../models/contivglobals";
import {ApiService} from "./apiservice";

@Injectable()
export class NetworkService {

    constructor(private http: Http, private apiService: ApiService) {}

    getSettings() {
        var networkservice = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NETWORK_SETTINGS_ENDPOINT;
            networkservice.apiService.get(url).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(result) {
                    resolve(result[0]);
                }, function errorCallback(result) {
                    reject(result);
                });
        });

        return promise;
    }

    updateSettings(setting) {
        return this.apiService.post(ContivGlobals.NETWORK_SETTINGS_ENDPOINT
            + 'global/', setting).map((res: Response) => res.json()).toPromise();
    }

}