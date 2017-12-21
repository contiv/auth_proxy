/**
 * Created by vjain3 on 3/15/16.
 */
import {Component, Inject, OnInit, NgZone} from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";

@Component({
    selector: 'applicationgroupdetails',
    templateUrl: './applicationgroupdetails.html'
})
export class ApplicationGroupDetailsComponent implements OnInit{
    applicationGroup:any = {};
    mode:string = 'details';
    public infoselected: boolean;
    public statskey: string;
    public showLoader: boolean;
    public showServerError: boolean;
    public serverErrorMessage: string;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private ngZone: NgZone,
                private applicationGroupsModel:ApplicationGroupsModel,
                private crudHelperService:CRUDHelperService) {
        var applicationGroupDetailsCtrl = this;

        /**
         * To show edit or details screen based on the route
         */
        function setMode() {
            if (activatedRoute.routeConfig.path.includes('edit')) {
                applicationGroupDetailsCtrl.mode = 'edit';
            } else {
                applicationGroupDetailsCtrl.mode = 'details';
            }
        }

        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);

        applicationGroupDetailsCtrl.applicationGroupsModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
            .then(function (group) {
                applicationGroupDetailsCtrl.applicationGroup = group;
                applicationGroupDetailsCtrl.ngZone.run(() => {
                    applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                });

            }, (error) => {
                applicationGroupDetailsCtrl.ngZone.run(() => {
                    applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                });
            });

        setMode();
        this.applicationGroup = {groupName: '', networkName: ''};
        this.serverErrorMessage = '';
        this.statskey = '';
        this.infoselected = true;
    }

    ngOnInit(){
        this.statskey = this.activatedRoute.snapshot.params['key'];
    }

    returnToApplicationGroup() {
        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
    }

    returnToApplicationGroupDetails() {
        this.router.navigate(['../../details', this.applicationGroup.key], { relativeTo: this.activatedRoute });
    }

    editApplicationGroup() {
        this.router.navigate(['../../edit', this.applicationGroup.key], { relativeTo: this.activatedRoute });
    }

    cancelDetails() {
        this.returnToApplicationGroup();
    }

    deleteApplicationGroup() {
        var applicationGroupDetailsCtrl = this;
        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
        applicationGroupDetailsCtrl.applicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup).then(
            function successCallback(result) {
                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                applicationGroupDetailsCtrl.crudHelperService.showNotification("Application group: Deleted", result.toString());
                applicationGroupDetailsCtrl.returnToApplicationGroup();
            }, function errorCallback(result) {
                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                applicationGroupDetailsCtrl.crudHelperService.showServerError("Application group: Delete failed", result);
            });
    }


}