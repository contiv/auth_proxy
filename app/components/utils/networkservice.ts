import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContivGlobals } from "../models/contivglobals";

@Injectable()
export class NetworkService {

    constructor(private http: Http) {}

    getSettings() {
        var networkservice = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NETWORK_SETTINGS_ENDPOINT;
            networkservice.http.get(url).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(result) {
                    resolve(result[0]);
                }, function errorCallback(result) {
                    reject(result);
                });
        });

        return promise;
    }

    updateSettings(setting) {
        return this.http.post(ContivGlobals.NETWORK_SETTINGS_ENDPOINT
            + 'global/', setting).map((res: Response) => res.json()).toPromise();
    }

}