/**
 * Created by cshampur on 10/19/16.
 */
import {Component, OnInit, OnDestroy, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Subscription, Observable} from "rxjs";
import {NetprofilesModel} from "../components/models/netprofilesmodel";

@Component({
    selector: 'bandwidthpolicylist',
    templateUrl: './bandwidthpolicylist.html'
})

export class BandwidthListComponent implements OnInit, OnDestroy {
    private crudHelperService:CRUDHelperService;
    private refresh:Subscription;
    public bandwidthPolicyListCtrl:any;
    policies:any;

    constructor(private netprofilesModel:NetprofilesModel,
                crudHelperService:CRUDHelperService,
                private ngZone:NgZone) {
        this.crudHelperService = crudHelperService;
        this.bandwidthPolicyListCtrl = this;
        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getPolicies(true);
        })
    }

    ngOnInit() {
        this.crudHelperService.startLoader(this);
        this.getPolicies(false);
    }

    getPolicies(reload:boolean) {
        var bandwidthPolicyListCtrl = this;
        this.netprofilesModel.get(reload)
            .then((result) => {
                    bandwidthPolicyListCtrl['policies'] = result;
                    bandwidthPolicyListCtrl.ngZone.run(() => {
                        bandwidthPolicyListCtrl.crudHelperService.stopLoader(bandwidthPolicyListCtrl);
                    });

                },
                (error) => {
                    bandwidthPolicyListCtrl.ngZone.run(() => {
                        bandwidthPolicyListCtrl.crudHelperService.stopLoader(bandwidthPolicyListCtrl);
                    });
                });
    }

    ngOnDestroy() {
        this.refresh.unsubscribe();
    }
}