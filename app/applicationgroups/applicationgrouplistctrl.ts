/**
 * Created by vjain3 on 3/11/16.
 */
import {Component, OnInit, OnDestroy, Inject} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {ApplicationGroupsModel} from "../components/models/applicationgroupsmodel";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";

@Component({
    selector:'app-group',
    template: require("./applicationgrouplist.html")
})

export class AppGrouplistComponent implements OnInit, OnDestroy{
    public applicationGroupListCtrl: any;
    private appGroupModel: ApplicationGroupsModel;
    private crudHelperService: CRUDHelperService;
    private refresh: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                appGroupModel: ApplicationGroupsModel,
                crudHelperService:CRUDHelperService){
        this.appGroupModel = appGroupModel;
        this.crudHelperService = crudHelperService;
        this.applicationGroupListCtrl = this;
        this['showLoader'] = true;

        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getApplicationGroup(true);
        });
        this.crudHelperService.startLoader(this);
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getApplicationGroup(false);
    }

    getApplicationGroup(reload: boolean){
        var applicationGroupListCtrl = this;
        this.appGroupModel.get(reload)
            .then((result) => {
                applicationGroupListCtrl['groups']=result;
                applicationGroupListCtrl.crudHelperService.stopLoader(applicationGroupListCtrl);
            }, (error) => {
                applicationGroupListCtrl.crudHelperService.stopLoader(applicationGroupListCtrl);
            });
    }

    create(){
        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }

}

