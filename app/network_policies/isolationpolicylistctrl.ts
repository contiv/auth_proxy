/**
 * Created by cshampur on 10/19/16.
 */
import {Component, OnInit, OnDestroy, NgZone} from "@angular/core";
import {PoliciesModel} from "../components/models/policiesmodel";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Subscription, Observable} from "rxjs";
@Component({
    selector: 'isolationpolicylist',
    templateUrl: './isolationpolicylist.html'
})

export class IsolationListComponent implements OnInit, OnDestroy {
    private policiesModel:PoliciesModel;
    private crudHelperService:CRUDHelperService;
    public isolationPolicyListCtrl:any;
    private refresh:Subscription;

    constructor(policiesModel:PoliciesModel,
                crudHelperService:CRUDHelperService,
                private ngZone:NgZone) {
        this.crudHelperService = crudHelperService;
        this.policiesModel = policiesModel;
        this.isolationPolicyListCtrl = this;
        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getPolicies(true);
        })
    }

    ngOnInit() {
        this.crudHelperService.startLoader(this);
        this.getPolicies(false);
    }

    getPolicies(reload:boolean) {
        var isolationPolicyListCtrl = this;
        this.policiesModel.get(reload)
            .then((result) => {
                    isolationPolicyListCtrl['policies'] = result;
                    isolationPolicyListCtrl.ngZone.run(() => {
                        isolationPolicyListCtrl.crudHelperService.stopLoader(isolationPolicyListCtrl);
                    });

                },
                (error) => {
                    isolationPolicyListCtrl.ngZone.run(() => {
                        isolationPolicyListCtrl.crudHelperService.stopLoader(isolationPolicyListCtrl);
                    });
                });
    }

    ngOnDestroy() {
        this.refresh.unsubscribe();
    }
}