import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContivGlobals } from "../models/contivglobals";
import { ApiService } from "./apiservice";

@Injectable()
export class NetworkService {

    constructor(private http: Http, private apiService: ApiService) {}

    getSettings(): Promise<any> {
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
        setting.key = "global";
        setting.name = "global";
        return this.apiService.post(ContivGlobals.NETWORK_SETTINGS_ENDPOINT
            + 'global/', setting).map((res: Response) => res.json()).toPromise();
    }

    getAciSettings(): Promise<any> {
        var networkservice = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.ACI_SETTINGS_ENDPOINT;
            networkservice.apiService.get(url).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(result) {
                    if (result.length == 0) {
                        result = [
                            {
                                key: '',
                                enforcePolicies: 'yes',
                                includeCommonTenant: 'no',
                                name: '',
                                nodeBindings: '',
                                pathBindings: '',
                                physicalDomain: ''
                            }
                        ]
                    }
                    resolve(result[0]);
                }, function errorCallback(result) {
                    reject(result);
                });
        });

        return promise;
    }

    updateAciSettings(setting) {
        setting.key = "aciGw";
        setting.name = "aciGw";
        return this.apiService.post(ContivGlobals.ACI_SETTINGS_ENDPOINT
            + 'aciGw/', setting).map((res: Response) => res.json()).toPromise();
    }

    getGlobalInspect(): Promise<any> {
        var networkservice = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.GLOBAL_NETWORK_INSPECT_ENDPOINT + 'global/';
            networkservice.apiService.get(url).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(result) {
                    resolve(result);
                }, function errorCallback(result) {
                    reject(result);
                });
        });

        return promise;
    }
}