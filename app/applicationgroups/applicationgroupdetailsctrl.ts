/**
 * Created by vjain3 on 3/15/16.
 */
import { Component, Inject } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ApplicationGroupsModel } from "../components/models/applicationgroupsmodel";
import { CRUDHelperService } from "../components/utils/crudhelperservice";

@Component({
    selector: 'applicationgroupdetails',
    templateUrl: 'applicationgroups/applicationgroupdetails.html'
})
export class ApplicationGroupDetailsComponent {
    applicationGroup:any = {};
    mode:string = 'details';

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
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

        applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
        applicationGroupDetailsCtrl.crudHelperService.hideServerError(applicationGroupDetailsCtrl);

        applicationGroupDetailsCtrl.applicationGroupsModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
            .then(function (group) {
                applicationGroupDetailsCtrl.applicationGroup = group;
            });

        setMode();
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

    cancelEditing() {
        this.returnToApplicationGroupDetails();
    }

    deleteApplicationGroup() {
        var applicationGroupDetailsCtrl = this;
        applicationGroupDetailsCtrl.crudHelperService.hideServerError(applicationGroupDetailsCtrl);
        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
        applicationGroupDetailsCtrl.applicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup).then(
            function successCallback(result) {
                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                applicationGroupDetailsCtrl.returnToApplicationGroup();
            }, function errorCallback(result) {
                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                applicationGroupDetailsCtrl.crudHelperService.showServerError(applicationGroupDetailsCtrl, result);
            });
    }

    saveApplicationGroup() {
        var applicationGroupDetailsCtrl = this;
        applicationGroupDetailsCtrl.crudHelperService.hideServerError(applicationGroupDetailsCtrl);
        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);

        applicationGroupDetailsCtrl.applicationGroupsModel.save(applicationGroupDetailsCtrl.applicationGroup).then(
            function successCallback(result) {
                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                applicationGroupDetailsCtrl.returnToApplicationGroupDetails();
            }, function errorCallback(result) {
                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
                applicationGroupDetailsCtrl.crudHelperService.showServerError(applicationGroupDetailsCtrl, result);
            });
    }
}