import { Component, OnInit, OnDestroy, Inject, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { Observable, Subscription } from "rxjs";
import { AppProfilesModel } from "../components/models/appprofilesmodel";


@Component({
    selector: 'appprofilelist',
    templateUrl: './appprofilelist.html'
})

export class AppProfileListComponent implements OnInit, OnDestroy{

    private refresh: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private appProfilesModel: AppProfilesModel,
                private crudHelperService: CRUDHelperService,
                private ngZone: NgZone) {
        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getAppProfiles(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getAppProfiles(false);
    }

    getAppProfiles(reload: boolean){
        var component = this;
        this.appProfilesModel.get(reload)
            .then(function successCallback(result){
                    component['appProfiles'] = result;
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