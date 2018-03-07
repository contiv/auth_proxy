/**
 * Created by vjain3 on 3/11/16.
 */
import { Component, OnDestroy, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { PoliciesModel } from "../components/models/policiesmodel";
import { NetworksModel } from "../components/models/networksmodel";
import { ServicelbsModel } from "../components/models/servicelbsmodel";
import { isUndefined } from "util";
import { EndpointType } from "../components/utils/chartservice";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.css']

})
export class DashboardComponent implements OnDestroy {
    public EndpointType = EndpointType;
    nodes: number = 0;
    networks: number = 0;
    groups: number = 0;
    networkList: any;
    applicationGroupList: any;
    networkpolicies: number = 0;
    servicelbs: number = 0;
    private subscription: Subscription;
    endpointType: EndpointType;
    public key: string;
    private setkeyflag: boolean;

    constructor(private networksModel:NetworksModel,
                private applicationGroupsModel:ApplicationGroupsModel,
                private policiesModel:PoliciesModel,
                private servicelbsModel: ServicelbsModel,
                private ngZone:NgZone) {
        var dashboardComponent = this;
        this.networkList = [];
        this.applicationGroupList = [];
        this.endpointType = EndpointType.Network;
        this.key = '';
        this.setkeyflag = true;
        function getDashboardInfo(reload) {
            ngZone.run(() => {
                networksModel.get(reload)
                    .then(function (result) {
                        dashboardComponent.networks = result.length;
                        dashboardComponent.networkList = result;
                    }, (err)=>{});
                applicationGroupsModel.get(reload)
                    .then(function (result) {
                        dashboardComponent.groups = result.length;
                        dashboardComponent.applicationGroupList = result;
                    }, (err)=>{});
                policiesModel.get(reload)
                    .then(function (result) {
                        dashboardComponent.networkpolicies = result.length;
                    }, (err)=>{});
                servicelbsModel.get(reload)
                    .then( function (result) {
                        dashboardComponent.servicelbs = result.length;
                    }, (err)=>{});
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

    switch(endpointType: EndpointType){
        if(endpointType == EndpointType.Network){
            if(this.endpointType !== EndpointType.Network){
                this.setkeyflag = true;
                this.endpointType = EndpointType.Network;
            }
        }
        else {
            if(this.endpointType !== EndpointType.ApplicationGroup){
                this.setkeyflag = true;
                this.endpointType = EndpointType.ApplicationGroup;
            }
        }
    }

    setKey(tempArr: any){
        if(!isUndefined(tempArr)){
            var temp = tempArr;
            if(tempArr.length > 0 && this.setkeyflag){
                Observable.timer(1).subscribe(() => {
                    this.key = temp[0]['key'];
                })
                this.setkeyflag = false;
            }
        }
    }

}