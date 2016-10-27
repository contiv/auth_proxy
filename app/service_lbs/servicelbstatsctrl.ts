import {Component, Inject, OnInit, OnDestroy} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Subscription, Observable} from "rxjs";

import { StateService } from "angular-ui-router/commonjs/ng1";
import {InspectService} from "../components/utils/inspectservice";
import {isUndefined} from "util";
import {ServicelbsModel} from "../components/models/servicelbsmodel";

@Component({
    selector: 'servicelbstat',
    templateUrl: 'service_lbs/servicelbstats.html'
})
export class ServicelbStatComponent implements OnInit, OnDestroy{

    public servicelbStatsCtrl: any;
    private crudHelperService: CRUDHelperService;
    private refresh: Subscription;
    private servicelbsModel: ServicelbsModel;
    private inspectSerrvice: InspectService;
    servicelbInspectStats:any; config:any; providers:any; filteredproviders:any; providerDetails:any;
    constructor(servicelbsModel: ServicelbsModel,
                @Inject('$state') private $state: StateService,
                crudHelperService: CRUDHelperService,
                inspectSerrvice: InspectService){
        this.crudHelperService = crudHelperService;
        this.servicelbsModel = servicelbsModel;
        this.inspectSerrvice = inspectSerrvice;
        this['showloader'] = true;
        this.refresh = Observable.interval(5000).subscribe(() => {
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
        this.servicelbStatsCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getServicelbInspect(false);
    }

    getServicelbInspect(reload: boolean){
        var servicelbStatsCtrl = this;
        this.servicelbsModel.getInspectByKey(this.$state.params['key'],
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
                    servicelbStatsCtrl.crudHelperService.stopLoader(servicelbStatsCtrl);
                },
                (error) => {
                    servicelbStatsCtrl.crudHelperService.stopLoader(servicelbStatsCtrl);
                });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}