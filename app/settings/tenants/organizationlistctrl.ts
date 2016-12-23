/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject, NgZone} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {CRUDHelperService} from "../../components/utils/crudhelperservice";
import {OrganizationsModel} from "../../components/models/organizationsmodel";


@Component({
    selector: 'organizationlist',
    templateUrl: './organizationlist.html'
})

export class OrganizationListComponent implements OnInit, OnDestroy{
    private organizationsModel:OrganizationsModel;
    private crudHelperService: CRUDHelperService;
    public organizationsListCtrl: any;
    private refresh: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                organizationsModel: OrganizationsModel,
                crudHelperService: CRUDHelperService,
                private ngZone: NgZone){
        this.organizationsModel = organizationsModel;
        this.crudHelperService = crudHelperService;
        this.organizationsListCtrl = this;
        this['showLoader']=true;
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getOrganizations(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getOrganizations(false);
    }

    getOrganizations(reload: boolean){
        var organizationsListCtrl = this;
        this.organizationsModel.get(reload)
            .then(function successCallback(result){
                    organizationsListCtrl['organizations'] = result;
                    organizationsListCtrl.ngZone.run(() => {
                        organizationsListCtrl.crudHelperService.stopLoader(organizationsListCtrl);
                    });
                },
                function errorCallback(result){
                    organizationsListCtrl.ngZone.run(() => {
                        organizationsListCtrl.crudHelperService.stopLoader(organizationsListCtrl);
                    });
                });
    }

    create(){
        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}