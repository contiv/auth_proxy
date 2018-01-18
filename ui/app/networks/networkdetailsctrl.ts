/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";
import {ApplicationGroupsModel} from "../components/models/applicationgroupsmodel";
import {NetworksModel} from "../components/models/networksmodel";
import {isUndefined} from "util";
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationType} from "../components/directives/notification";
var _ = require('lodash');
declare var jQuery:any;

@Component({
    selector: 'networkdetails',
    templateUrl: "./networkdetails.html"
})

export class NetworkdetailsComponent implements OnInit, OnDestroy{
    private applicationGroupsModel:ApplicationGroupsModel;
    private networksModel: NetworksModel;
    private crudHelperService: CRUDHelperService;
    public networkDetailsCtrl: any;
    private refresh: Subscription;
    public network: any;
    public infoselected: boolean;
    public statskey: string;

    constructor(private route: ActivatedRoute,
                private router: Router,
                applicationGroupsModel: ApplicationGroupsModel,
                networksModel: NetworksModel,
                crudHelperService: CRUDHelperService){

        this.applicationGroupsModel = applicationGroupsModel;
        this.networksModel = networksModel;
        this.crudHelperService = crudHelperService;
        this.infoselected = true;
        this.statskey='';
        this['showLoader'] = true;
        this.network = {networkName: '', encap: '', subnet: '', gateway: ''};
        this.refresh=Observable.interval(5000).subscribe(() => {
            if(this['showloader']!=true)
                this.getApplicationGroups(true);
        });
        this.networkDetailsCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.statskey = this.route.snapshot.params['key'];
        this.getNetwork(false);
    }

    getApplicationGroups(reload: boolean){
        var networkDetailsCtrl = this;
        if(!isUndefined(networkDetailsCtrl['network'])){
            this.applicationGroupsModel.get(reload)
                .then(function successCallback(result){
                        networkDetailsCtrl['applicationGroups'] = _.filter(result, {
                            'networkName': networkDetailsCtrl['network'].networkName,
                            'tenantName': networkDetailsCtrl['network'].tenantName
                        });
                        networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    },
                    function errorCallback(result){
                        networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    });
        }
    }

    getNetwork(reload: boolean){
        var networkDetailsCtrl = this;
        this.networksModel.getModelByKey(this.route.snapshot.params['key'], reload, 'key')
            .then((result) => {
                networkDetailsCtrl['network'] = result;
                networkDetailsCtrl.getApplicationGroups(false);
            }, (error) => {
                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
            })
    }

    deleteNetwork(){
        var networkDetailsCtrl = this;
        this.crudHelperService.startLoader(networkDetailsCtrl);
        if (!isUndefined(networkDetailsCtrl['network'])){
            this.networksModel.delete(networkDetailsCtrl['network'])
                .then((result) => {
                    networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    networkDetailsCtrl.crudHelperService.showNotification("Network: Deleted", result.toString());
                    networkDetailsCtrl.returnToNetworks();
                }, (error) => {
                    networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    networkDetailsCtrl.crudHelperService.showServerError("Network: Delete failed", error);
                })
        }
        setTimeout(() => {
            if(networkDetailsCtrl['showLoader']==true){
                networkDetailsCtrl.crudHelperService.showNotification("Network: Delete task submitted", networkDetailsCtrl.network.key, NotificationType.info);
                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
            }
        },2000);
    }

    returnToNetworks(){
        this.router.navigate(['../../list'], {relativeTo: this.route});
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}

