/**
 * Created by cshampur on 11/18/16.
 */
import { Component, Input, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";

@Component({
    selector: 'applicationgroupinfo',
    templateUrl: './applicationgroupinfo.html'
})

export class ApplicationGroupInfoComponent{

    @Input('applicationGroup') applicationGroup: any;
    @Input('mode') mode: string;
    @Input('showLoader') showLoader: boolean;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private applicationGroupsModel:ApplicationGroupsModel,
                private crudHelperService:CRUDHelperService){
        this.applicationGroup= {
            groupName: '',
            networkName: ''
        };
        this.mode = 'details';
    }

    returnToApplicationGroupDetails() {
        this.router.navigate(['../../details', this.applicationGroup.key], { relativeTo: this.activatedRoute });
    }

    cancelEditing() {
        this.returnToApplicationGroupDetails();
    }

    saveApplicationGroup() {
        var component = this;
        component.crudHelperService.startLoader(component);

        component.applicationGroupsModel.save(component.applicationGroup).then(
            function successCallback(result) {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showNotification("Application group: Updated", result.key.toString());
                component.returnToApplicationGroupDetails();
            }, function errorCallback(result) {
                component.crudHelperService.stopLoader(component);
                component.crudHelperService.showServerError("Application group: Update failed", result);

            });
    }
}