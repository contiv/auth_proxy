/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";
import {ServicelbsModel} from "../components/models/servicelbsmodel";
import {Router, ActivatedRoute} from "@angular/router";


@Component({
    selector: 'servicelbList',
    templateUrl: 'service_lbs/servicelblist.html'
})

export class ServicelbListComponent implements OnInit, OnDestroy{
    private servicelbsModel:ServicelbsModel;
    private crudHelperService: CRUDHelperService;
    public servicelbListCtrl: any;
    private refresh: Subscription;

    constructor(private router: Router,
                private route: ActivatedRoute,
                servicelbsModel: ServicelbsModel,
                crudHelperService: CRUDHelperService,
                private ngZone: NgZone){
        this.servicelbsModel = servicelbsModel;
        this.crudHelperService = crudHelperService;
        this.servicelbListCtrl = this;
        this['showLoader']=true;
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getServicelbs(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getServicelbs(false);
    }

    getServicelbs(reload: boolean){
        var servicelbListCtrl = this;
        this.servicelbsModel.get(reload)
            .then(function successCallback(result){
                    servicelbListCtrl['servicelbs'] = result;
                    servicelbListCtrl.ngZone.run(() => {
                        servicelbListCtrl.crudHelperService.stopLoader(servicelbListCtrl);
                    })
                },
                function errorCallback(result){
                    servicelbListCtrl.ngZone.run(() => {
                        servicelbListCtrl.crudHelperService.stopLoader(servicelbListCtrl);
                    })
                })
    }

    create(){
        this.router.navigate(['../create'],{relativeTo: this.route});
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}


