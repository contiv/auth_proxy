/**
 * Created by cshampur on 12/12/16.
 */





import {Component, OnInit, OnDestroy, Input, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Subscription, Observable} from "rxjs";
import {InspectService} from "../components/utils/inspectservice";
import {ContivGlobals} from "../components/models/contivglobals";
import {isUndefined} from "util";
import {PoliciesModel} from "../components/models/policiesmodel";

@Component({
    selector: 'isolationpolicystats',
    templateUrl: './isolationpolicystats.html'
})

export class IsolationPolicyStatComponent implements OnInit, OnDestroy{
    public isolationPolicyStatsComp: any;
    @Input('statKey') statKey: string;
    private crudHelperService: CRUDHelperService;
    private refresh: Subscription;
    private policiesModel: PoliciesModel;
    private inspectSerrvice: InspectService;
    public showLoader: boolean
    isolationPolicyInspectStats:any; config:any; endpoints:any; filteredendpoints:any; containerDetails:any;
    constructor(policiesModel: PoliciesModel,
                crudHelperService: CRUDHelperService,
                inspectSerrvice: InspectService,
                private ngZone: NgZone){
        this.crudHelperService = crudHelperService;
        this.policiesModel = policiesModel;
        this.inspectSerrvice = inspectSerrvice;
        this.statKey = '';
        this.showLoader = true;
        this.refresh = Observable.interval(5000).subscribe(() => {
            if(this.statKey!='')
                this.getIsolationPolicyInspect(true);
        });
        this.isolationPolicyInspectStats= {
            numEndpoints: '',
        }
        this.config = {policyName: '', tenantName: ''}
        this.endpoints = []
        this.filteredendpoints = []
        this.containerDetails= {}
        this.isolationPolicyStatsComp = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        if(this.statKey!='')
            this.getIsolationPolicyInspect(false);
    }

    getIsolationPolicyInspect(reload: boolean){
        var isolationPolicyStatsComp = this;
        this.policiesModel.getInspectByKey(this.statKey,
            ContivGlobals.POLICIES_INSPECT_ENDPOINT, reload)
            .then((result) => {
                    isolationPolicyStatsComp['isolationPolicyInspectStats'] = result['Oper'];
                    isolationPolicyStatsComp['config'] = result['Config'];
                    if(!isUndefined(result['Oper'].endpoints)){
                        var containerDetails = isolationPolicyStatsComp.inspectSerrvice.buildEndPoints(result['Oper'].endpoints);
                        if(isolationPolicyStatsComp.inspectSerrvice.checkContainerChanged(isolationPolicyStatsComp['containerDetails'],containerDetails)){
                            isolationPolicyStatsComp['endpoints'] = result['Oper'].endpoints;
                            isolationPolicyStatsComp['containerDetails'] = containerDetails;
                        }
                    }
                    else{
                        isolationPolicyStatsComp['endpoints'] = []
                        isolationPolicyStatsComp['containerDetails'] = {};
                    }
                    isolationPolicyStatsComp.ngZone.run(() => {
                        isolationPolicyStatsComp.crudHelperService.stopLoader(isolationPolicyStatsComp);
                    });
                },
                (error) => {
                    isolationPolicyStatsComp.ngZone.run(() => {
                        isolationPolicyStatsComp.crudHelperService.stopLoader(isolationPolicyStatsComp);
                    });
                });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}