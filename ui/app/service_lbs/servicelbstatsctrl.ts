import {Component, Inject, OnInit, OnDestroy, Input, AfterViewChecked, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Subscription, Observable} from "rxjs";
declare var jQuery:any;
import {InspectService} from "../components/utils/inspectservice";
import {isUndefined} from "util";
import {ServicelbsModel} from "../components/models/servicelbsmodel";
import {ContivGlobals} from "../components/models/contivglobals";

@Component({
    selector: 'servicelb-stat',
    templateUrl: './servicelbstats.html'
})
export class ServicelbStatComponent implements OnInit, OnDestroy{

    @Input('statkey') statkey: string;
    public servicelbStatsCtrl: any;
    private crudHelperService: CRUDHelperService;
    private refresh: Subscription;
    private servicelbsModel: ServicelbsModel;
    private inspectSerrvice: InspectService;
    public showLoader: boolean;
    private ngZone: NgZone;
    servicelbInspectStats:any; config:any; providers:any; filteredproviders:any; providerDetails:any;
    constructor(servicelbsModel: ServicelbsModel,
                crudHelperService: CRUDHelperService,
                inspectSerrvice: InspectService,
                ngZone: NgZone){
        this.crudHelperService = crudHelperService;
        this.servicelbsModel = servicelbsModel;
        this.inspectSerrvice = inspectSerrvice;
        this.showLoader = true;
        this.refresh = Observable.interval(5000).subscribe(() => {
            if(this.statkey!='')
                this.getServicelbInspect(true);
        })
        this.servicelbInspectStats= {
            allocatedAddressesCount: '',
            allocatedIPAddresses: '',
            dnsServerIP: '',
            externalPktTag: '',
            numEndpoints: '',
            pktTag: ''
        }
        this.config = {serviceName: '',}
        this.providers = []
        this.filteredproviders = []
        this.providerDetails= {}
        this.ngZone = ngZone
        this.servicelbStatsCtrl = this;
        this.statkey = '';
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        if(this.statkey!='')
            this.getServicelbInspect(false);
    }

    getServicelbInspect(reload: boolean){
        var servicelbStatsCtrl = this;
        this.servicelbsModel.getInspectByKey(this.statkey,
            ContivGlobals.SERVICELBS_INSPECT_ENDPOINT, reload)
            .then((result) => {
                    servicelbStatsCtrl['servicelbInspectStats'] = result['Oper'];
                    servicelbStatsCtrl['config'] = result['Config'];
                    if(!isUndefined(result['Oper'].providers)){
                        var providerDetails = servicelbStatsCtrl.inspectSerrvice.buildEndPoints(result['Oper'].providers);
                        if(servicelbStatsCtrl.inspectSerrvice.checkContainerChanged(servicelbStatsCtrl['providerDetails'],providerDetails)){
                            servicelbStatsCtrl['providers'] = result['Oper'].providers;
                            servicelbStatsCtrl['providerDetails'] = providerDetails;
                        }
                    }
                    else{
                        servicelbStatsCtrl['providers'] = []
                        servicelbStatsCtrl['providerDetails'] = {};
                    }
                    servicelbStatsCtrl.ngZone.run(() => {
                        servicelbStatsCtrl.crudHelperService.stopLoader(servicelbStatsCtrl);
                    });
                },
                (error) => {
                    servicelbStatsCtrl.ngZone.run(() => {
                        servicelbStatsCtrl.crudHelperService.stopLoader(servicelbStatsCtrl);
                    });
                });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}