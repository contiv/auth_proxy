/**
 * Created by cshampur on 12/13/16.
 */


import {Component, OnInit} from "@angular/core";
import {Subscribable} from "rxjs/Observable";
import {Subscription, Observable} from "rxjs";
import {CRUDHelperService} from "../../components/utils/crudhelperservice";
import {AuthorizationModel} from "../../components/models/authorizationmodel";
import {Router, ActivatedRoute} from "@angular/router";
import {Authorization} from "./authorizationcreate";
@Component({
    selector: 'authorizationlist',
    templateUrl: './authorizationlist.html'
})

export class AuthorizationListComponent implements  OnInit{
    public authorizations: Array<Authorization> = [];
    public filteredauth: any = [];
    public showLoader: boolean = false
    private refresh: Subscription;
    constructor(private crudHelperService: CRUDHelperService,
                private authorizationModel: AuthorizationModel,
                private router: Router,
                private activatedRoute: ActivatedRoute){

        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getAuthorization(true);
        });
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getAuthorization(false);
    }

    getAuthorization(reload){
        var authorizationComp = this;
        this.authorizationModel.get(reload)
            .then((result) => {
                authorizationComp.authorizations = result;
                authorizationComp.crudHelperService.stopLoader(authorizationComp);
            },(error) => {
                authorizationComp.crudHelperService.stopLoader(authorizationComp);
            });
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }

    create(){
        this.router.navigate(['../create'], {relativeTo: this.activatedRoute});
    }
}
