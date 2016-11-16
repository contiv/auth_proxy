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
var _ = require('lodash');


@Component({
    selector: 'networkdetails',
    templateUrl: "networks/networkdetails.html"
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
        this.statskey=''
        this['showLoader'] = true;
        this['showServerError'] = false;
        this['serverErrorMessage'] = '';
        this.network = {networkName: '', encap: '', subnet: '', gateway: ''};
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getApplicationGroups(true);
        });
        this.networkDetailsCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.statskey = this.route.snapshot.params['key'];
        this.getNetworksModel(false);
    }

    getApplicationGroups(reload: boolean){
        var networkDetailsCtrl = this;
        if(!isUndefined(networkDetailsCtrl['network'])){
            this.applicationGroupsModel.get(reload)
                .then(function successCallback(result){
                        networkDetailsCtrl['applicationGroups'] = _.filter(result, {'networkName': networkDetailsCtrl['network'].networkName})
                        networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    },
                    function errorCallback(result){
                        networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    });
        }
    }

    getNetworksModel(reload: boolean){
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
        this.crudHelperService.hideServerError(networkDetailsCtrl);
        this.crudHelperService.startLoader(networkDetailsCtrl);
        if (!isUndefined(networkDetailsCtrl['network'])){
            this.networksModel.delete(networkDetailsCtrl['network'])
                .then((result) => {
                    networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    networkDetailsCtrl.returnToNetworks();
                }, (error) => {
                    networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
                    networkDetailsCtrl.crudHelperService.showServerError(networkDetailsCtrl, error);
                })
        }

    }

    returnToNetworks(){
        this.router.navigate(['../../list'], {relativeTo: this.route});
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}

