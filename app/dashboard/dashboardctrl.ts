/**
 * Created by vjain3 on 3/11/16.
 */
import {Component, OnDestroy, NgZone} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { PoliciesModel } from "../components/models/policiesmodel";
import { NetworksModel } from "../components/models/networksmodel";

@Component({
    selector: 'dashboard',
    templateUrl: 'dashboard/dashboard.html'

})
export class DashboardComponent implements OnDestroy {
    nodes: number = 0;
    networks: number = 0;
    volumes: number = 0;
    groups: number = 0;
    networkpolicies: number = 0;
    storagepolicies: number = 0;
    subscription: Subscription;

    constructor(private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private policiesModel:PoliciesModel,
                private ngZone:NgZone) {
        var dashboardComponent = this;

        function getDashboardInfo(reload) {
            ngZone.run(() => {
                networksModel.get(reload)
                    .then(function (result) {
                        dashboardComponent.networks = result.length;
                    });
                applicationGroupsModel.get(reload)
                    .then(function (result) {
                        dashboardComponent.groups = result.length;
                    });
                policiesModel.get(reload)
                    .then(function (result) {
                        dashboardComponent.networkpolicies = result.length;
                    });
            })
        }

        //Load from cache for quick display initially
        getDashboardInfo(false);

        this.subscription = Observable.interval(5000).subscribe(() => {
            getDashboardInfo(true);
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}