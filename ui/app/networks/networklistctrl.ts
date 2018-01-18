/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import {NetworksModel} from "../components/models/networksmodel";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
    selector: 'networkList',
    template: require("./networklist.html")
})



export class NetworkListComponent implements OnInit, OnDestroy{
    private networksModel:NetworksModel;
    private crudHelperService: CRUDHelperService;
    public networkListComp: any;
    private refresh: Subscription;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                networksModel: NetworksModel,
                crudHelperService: CRUDHelperService){
        this.networksModel = networksModel;
        this.crudHelperService = crudHelperService;
        this.networkListComp = this;
        this['showLoader']=true;
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getNetworks(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getNetworks(false);
    }

    getNetworks(reload: boolean){
        var networkListComp = this;
        this.networksModel.get(reload)
            .then(function successCallback(result){
                    networkListComp['networks'] = result;
                    networkListComp.crudHelperService.stopLoader(networkListComp);
                },
                function errorCallback(result){
                    networkListComp.crudHelperService.stopLoader(networkListComp);
                })
    }

    create(){
        this.router.navigate(['../create'], {relativeTo: this.activatedRoute});
    }

    ngOnDestroy(){
     this.refresh.unsubscribe();
    }
}


