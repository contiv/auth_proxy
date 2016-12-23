import { Component, OnInit, OnDestroy, Inject, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { Observable, Subscription } from "rxjs";
import { BgpsModel } from "../../components/models/bgpsmodel";


@Component({
    selector: 'nodelist',
    templateUrl: './nodelist.html'
})

export class NodeListComponent implements OnInit, OnDestroy{

    private refresh: Subscription;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private bgpsModel: BgpsModel,
                private crudHelperService: CRUDHelperService,
                private ngZone: NgZone) {
        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getNodes(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getNodes(false);
    }

    getNodes(reload: boolean){
        var component = this;
        this.bgpsModel.get(reload)
            .then(function successCallback(result){
                    component['nodes'] = result;
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