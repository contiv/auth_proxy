import {Component, OnInit, OnDestroy, Input, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Subscription, Observable} from "rxjs";
import {NetworksModel} from "../components/models/networksmodel";
import {InspectService} from "../components/utils/inspectservice";
import {isUndefined} from "util";
import {ContivGlobals} from "../components/models/contivglobals";

@Component({
    selector: 'network-stat',
    templateUrl: './networkstats.html'
})
export class NetworkStatComponent implements OnInit, OnDestroy{

    public networkStatsCtrl: any;
    @Input('statKey') statKey: string;
    private crudHelperService: CRUDHelperService;
    private refresh: Subscription;
    private networksModel: NetworksModel;
    private inspectSerrvice: InspectService;
    public showLoader: boolean
    networkInspectStats:any; config:any; endpoints:any; filteredendpoints:any; containerDetails:any;
    constructor(networksModel: NetworksModel,
                crudHelperService: CRUDHelperService,
                inspectSerrvice: InspectService,
                private ngZone: NgZone){
        this.crudHelperService = crudHelperService;
        this.networksModel = networksModel;
        this.inspectSerrvice = inspectSerrvice;
        this.statKey = '';
        this.showLoader = true;
        this.refresh = Observable.interval(5000).subscribe(() => {
            if(this.statKey!='')
                this.getNetworkInspect(true);
        });
        this.networkInspectStats= {
                    allocatedAddressesCount: '',
                    allocatedIPAddresses: '',
                    availableIPAddresses: '',
                    dnsServerIP: '',
                    externalPktTag: '',
                    numEndpoints: '',
                    pktTag: '',
                    networkTag: ''
        };
        this.config = {networkName: '',};
        this.endpoints = [];
        this.filteredendpoints = [];
        this.containerDetails= {};
        this.networkStatsCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        if(this.statKey!='')
            this.getNetworkInspect(false);
    }

    getNetworkInspect(reload: boolean){
        var networkStatsCtrl = this;
        this.networksModel.getInspectByKey(this.statKey,
            ContivGlobals.NETWORKS_INSPECT_ENDPOINT, reload)
            .then((result) => {
                    networkStatsCtrl['networkInspectStats'] = result['Oper'];
                    networkStatsCtrl['config'] = result['Config'];
                    if(!isUndefined(result['Oper'].endpoints)){
                        var containerDetails = networkStatsCtrl.inspectSerrvice.buildEndPoints(result['Oper'].endpoints);
                        if(networkStatsCtrl.inspectSerrvice.checkContainerChanged(networkStatsCtrl['containerDetails'],containerDetails)){
                            networkStatsCtrl['endpoints'] = result['Oper'].endpoints;
                            networkStatsCtrl['containerDetails'] = containerDetails;
                        }
                    }
                    else{
                        networkStatsCtrl['endpoints'] = []
                        networkStatsCtrl['containerDetails'] = {};
                    }
                    networkStatsCtrl.ngZone.run(() => {
                        networkStatsCtrl.crudHelperService.stopLoader(networkStatsCtrl);
                    });
                },
                (error) => {
                    networkStatsCtrl.ngZone.run(() => {
                        networkStatsCtrl.crudHelperService.stopLoader(networkStatsCtrl);
                    });
                });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}