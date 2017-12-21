import { Component, OnInit, OnDestroy, Inject, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { Observable, Subscription } from "rxjs";
import { UsersModel } from "../../components/models/usersmodel";
import {User} from "./usercreate.component";


@Component({
    selector: 'userlist',
    templateUrl: './userlist.html'
})

export class UserListComponent implements OnInit, OnDestroy{

    private refresh: Subscription;
    public users: Array<User>;
    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private usersModel: UsersModel,
                private crudHelperService: CRUDHelperService,
                private ngZone: NgZone) {
        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getUsers(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getUsers(false);
        // update breadcrumbs
        $('.crumb2').html('User Management')
    }

    getUsers(reload: boolean){
        var component = this;
        this.usersModel.get(reload)
            .then(function successCallback(result){
                    component['users'] = result;
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                },
                function errorCallback(result){
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
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
