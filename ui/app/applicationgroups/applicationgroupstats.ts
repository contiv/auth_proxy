/**
 * Created by cshampur on 11/18/16.
 */

import {Component, NgZone, Input, OnInit, OnDestroy} from "@angular/core";
import {ApplicationGroupsModel} from "../components/models/applicationgroupsmodel";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {InspectService} from "../components/utils/inspectservice";
import {Subscription, Observable} from "rxjs";
import {ContivGlobals} from "../components/models/contivglobals";
import {isUndefined} from "util";
@Component({
    selector: 'applicationgroupstats',
    templateUrl: './applicationgroupstats.html'
})

export class ApplicationGroupStatsComponent implements OnInit, OnDestroy{
    @Input('statkey') statkey: string;
    public applicationInspectStats: any;
    private refresh: Subscription;
    public showLoader: boolean;
    config:any; endpoints:any; filteredendpoints: any; containerDetails: any;
    constructor(private applicationGroupsModel: ApplicationGroupsModel,
                private crudHelperService: CRUDHelperService,
                private inspectService: InspectService,
                private ngZone: NgZone){
        this.statkey = '';
        this.applicationInspectStats = {
            externalPktTag: '',
            numEndpoints: '',
            pktTag: ''
        };
        this.config = {networkName: '', groupName: ''}
        this.endpoints = [];
        this.filteredendpoints = [];
        this.containerDetails= {};
        this.refresh = Observable.interval(5000).subscribe(() => {
            if(this.statkey!='')
                this.getApplicationgroupInspect(true);
        });
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        if(this.statkey!='')
            this.getApplicationgroupInspect(false);
    }

    getApplicationgroupInspect(reload: boolean){
        var applicationStatsCtrl = this;
        this.applicationGroupsModel.getInspectByKey(this.statkey, ContivGlobals.APPLICATIONGROUPS_INSPECT_ENDPOINT, reload)
            .then((result) => {
                applicationStatsCtrl['applicationInspectStats'] = result['Oper'];
                applicationStatsCtrl['config'] = result['Config'];
                if(!isUndefined(result['Oper'].endpoints)){
                    var containerDetails = applicationStatsCtrl.inspectService.buildEndPoints(result['Oper'].endpoints);
                    if(applicationStatsCtrl.inspectService.checkContainerChanged(applicationStatsCtrl['containerDetails'],containerDetails)){
                        applicationStatsCtrl['endpoints'] = result['Oper'].endpoints;
                        applicationStatsCtrl['containerDetails'] = containerDetails;
                    }
                }
                else{
                    applicationStatsCtrl['endpoints'] = [];
                    applicationStatsCtrl['containerDetails'] = {};
                }
                applicationStatsCtrl.ngZone.run(() => {
                    applicationStatsCtrl.crudHelperService.stopLoader(applicationStatsCtrl);
                });
            },
                (error) => {
                    applicationStatsCtrl.ngZone.run(() => {
                        applicationStatsCtrl.crudHelperService.stopLoader(applicationStatsCtrl);
                    });
                });


    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }

}