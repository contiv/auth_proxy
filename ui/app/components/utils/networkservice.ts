import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContivGlobals } from "../models/contivglobals";
import { ApiService } from "./apiservice";
import { Subject, Observable } from "rxjs";

@Injectable()
export class NetworkService {

    public aciMode: boolean = false;
    private aciModeSubject: Subject<any>;
    public aciModeObservable: Observable<any>;
    public clusterMode: string = '';
    private clusterModeSubject: Subject<any> = new Subject<any>();
    public clusterModeObservable: Observable<any> = this.clusterModeSubject.asObservable();
    constructor(private http: Http, private apiService: ApiService) {
        this.aciModeSubject = new Subject<any>();
        this.aciModeObservable = this.aciModeSubject.asObservable();
        var networkservice = this;
        this.getSettings().then((res)=>{},(err)=>{});
        this.getGlobalInspect().then((res) => {
            networkservice.clusterMode = res.Oper.clusterMode;
            networkservice.clusterModeSubject.next(networkservice.clusterMode);
        }, (error) => {});
    }

    getSettings(): Promise<any> {
        var networkservice = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NETWORK_SETTINGS_ENDPOINT;
            networkservice.apiService.get(url).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(result) {
                    if (result[0].networkInfraType === 'aci') {
                        networkservice.aciMode = true;
                    } else {
                        networkservice.aciMode = false;
                    }
                    networkservice.aciModeSubject.next(networkservice.aciMode);
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

    setAciMode(mode: boolean){
        this.aciMode = mode;
        this.aciModeSubject.next(this.aciMode);
    }
}