/**
 * Created by vjain3 on 12/7/16.
 */
import { Component, NgZone, Input, OnInit, OnDestroy } from "@angular/core";
import { Subscription, Observable } from "rxjs";
import { ContivGlobals } from "../../components/models/contivglobals";
import { BgpsModel } from "../../components/models/bgpsmodel";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";

@Component({
    selector: 'nodestats',
    templateUrl: './nodestats.html'
})
export class NodeStatsComponent implements OnInit, OnDestroy {
    @Input('statkey') statkey:string;
    inspect:any;
    routes:any;
    filteredroutes:any;
    showLoader:boolean;
    private refresh:Subscription;

    constructor(private bgpsModel:BgpsModel,
                private crudHelperService:CRUDHelperService,
                private ngZone:NgZone) {
        this.statkey = '';
        this.inspect = {
            Config: {
                neighbor: ''
            },
            Oper: {
                adminStatus: '',
                neighborStatus: '',
                numRoutes: ''
            }
        };
        this.routes = [];
        this.filteredroutes = [];

        this.refresh = Observable.interval(5000).subscribe(() => {
            if (this.statkey != '')
                this.getBgpInspect(true);
        });
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        if(this.statkey != '')
            this.getBgpInspect(false);
    }

    ngOnDestroy() {
        this.refresh.unsubscribe();
    }

    getBgpInspect(reload:boolean) {
        var component = this;
        this.bgpsModel.getInspectByKey(this.statkey, ContivGlobals.BGPS_INSPECT_ENDPOINT, reload)
            .then(function successCallback(result) {
                component.inspect = result;
                component.routes = result['Oper'].routes;
                component.filteredroutes = result['Oper'].routes;

                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
            }, function errorCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
            });
    }
}
