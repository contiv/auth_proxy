/**
 * Created by vjain3 on 3/11/16.
 */
import { Component, OnDestroy } from '@angular/core';
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
    observable: Observable<any>;
    subscription: Subscription;

    constructor(private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private policiesModel:PoliciesModel) {
        var dashboardComponent = this;

        function getDashboardInfo(reload) {
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
        }

        //Load from cache for quick display initially
        getDashboardInfo(false);

        dashboardComponent.observable = Observable.create(function subscribe(observer) {
            var id = setInterval(() => {
                observer.next();
            }, 5000);
            return function unsubscribe() {
                clearInterval(id);
            }
        });
        dashboardComponent.subscription = dashboardComponent.observable.subscribe(() => {
            getDashboardInfo(true);
        });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}