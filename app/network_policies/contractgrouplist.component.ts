/**
 * Created by vjain3 on 12/13/16.
 */
import { Component, OnInit, OnDestroy, NgZone } from "@angular/core";
import { ContractGroupsModel } from "../components/models/contractgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { Subscription, Observable } from "rxjs";

@Component({
    selector: 'contractgrouplist',
    templateUrl: './contractgrouplist.html'
})
export class ContractGroupListComponent implements OnInit, OnDestroy {
    private refresh:Subscription;
    private contractGroups:any[];

    constructor(private contractGroupsModel:ContractGroupsModel,
                private crudHelperService:CRUDHelperService,
                private ngZone:NgZone) {
        this.refresh = Observable.interval(5000).subscribe(() => {
            this.getContractGroups(true);
        })
    }

    ngOnInit() {
        this.crudHelperService.startLoader(this);
        this.getContractGroups(false);
    }

    getContractGroups(reload:boolean) {
        let component = this;
        this.contractGroupsModel.get(reload)
            .then((result) => {
                    component.contractGroups = result;
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });

                },
                (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                });
    }

    ngOnDestroy() {
        this.refresh.unsubscribe();
    }
}