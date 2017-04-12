import {Injectable, OnInit} from "@angular/core";
import {Response} from "@angular/http";
import {Subscription, Observable, Subject} from "rxjs";
import {AuthService} from "./authservice";
import {ContivGlobals} from "../models/contivglobals";
import {ApiService} from "./apiservice";
import {isUndefined} from "util";

export enum EndpointType {
    Network,
    ApplicationGroup
}

@Injectable()
export class ChartService{
    private refresh: Subscription;
    private networks: any;
    private netInspect: any;
    public graphData: {};
    public source: Subject<any>;
    public stream: Observable<any>;
    constructor(private authService: AuthService,
                private apiService: ApiService){
        this.networks = [];
        this.netInspect = {};
        this.graphData = {0: {}, 1: {}};
        this.source = new Subject<any>();
        this.stream = this.source.asObservable();
    }

    private getInspectData(listEndPoint:string, inspectEndpoint:string, endpointtype:EndpointType){
        this.apiService.get(listEndPoint)
            .map((res: Response) => res.json())
            .subscribe((result1) => {
                for(var x of result1){
                    var key = x['key'];
                    this.apiService.get(inspectEndpoint + key + '/')
                        .map((res: Response) => res.json())
                        .subscribe((result2) => {
                            var inspectkey = result2['Config']['key'];
                            if(!isUndefined(result2['Oper']['numEndpoints'])){
                                this.generateGraphData(inspectkey, result2['Oper']['numEndpoints'], endpointtype);
                            }
                            else{
                                this.generateGraphData(inspectkey, 0, endpointtype);
                            }
                        },(error) => {});
                }
            },(error) => {});
    }

    private generateGraphData(key: string, count: number, type: EndpointType){
        if(isUndefined(this.graphData[type][key])){
            this.graphData[type][key]=[];
            for(var i=0; i<15; i++){
                this.graphData[type][key].push(count)
            }
        }
        else{
            this.graphData[type][key].push(count);
            this.source.next({iKey: key, count: count, type: type});
        }
    }

    /* This method is called by menuctrl.ts after the user logs out of the system */
    public cleanBuffer(){
        this.networks = [];
        this.netInspect = {};
        this.graphData = {0: {}, 1: {}};
        this.refresh.unsubscribe();
    }

    /* This method is called by loginctrl.ts after the user logs into the system */
    public startpolling(){
        if (this.authService.isLoggedIn){
            this.getInspectData(ContivGlobals.NETWORKS_ENDPOINT, ContivGlobals.NETWORKS_INSPECT_ENDPOINT, EndpointType.Network);
            this.getInspectData(ContivGlobals.APPLICATIONGROUPS_ENDPOINT, ContivGlobals.APPLICATIONGROUPS_INSPECT_ENDPOINT, EndpointType.ApplicationGroup);
        }
        this.refresh = Observable.interval(30000).subscribe(() => {
            if (this.authService.isLoggedIn){
                this.getInspectData(ContivGlobals.NETWORKS_ENDPOINT, ContivGlobals.NETWORKS_INSPECT_ENDPOINT, EndpointType.Network);
                this.getInspectData(ContivGlobals.APPLICATIONGROUPS_ENDPOINT, ContivGlobals.APPLICATIONGROUPS_INSPECT_ENDPOINT, EndpointType.ApplicationGroup);
            }
        });
    }
}