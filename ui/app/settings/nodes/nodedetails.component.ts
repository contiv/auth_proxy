import { Component, Inject, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { BgpsModel } from "../../components/models/bgpsmodel";

@Component({
    selector: 'nodedetails',
    templateUrl: './nodedetails.html'
})
export class NodeDetailsComponent implements OnInit {
    node:any = {};
    mode:string = 'details';

    infoselected: boolean;
    statskey: string;

    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private ngZone:NgZone,
                private bgpsModel:BgpsModel,
                private crudHelperService:CRUDHelperService) {
        var component = this;

        /**
         * To show edit or details screen based on the route
         */
        function setMode() {
            if (activatedRoute.routeConfig.path.includes('edit')) {
                component.mode = 'edit';
            } else {
                component.mode = 'details';
            }
        }

        setMode();
        this.statskey = this.activatedRoute.snapshot.params['key'];
        this.infoselected = true;
    }

    ngOnInit() {
        var component = this;
        component.crudHelperService.stopLoader(component);

        component.bgpsModel.getModelByKey(component.activatedRoute.snapshot.params['key'], false, 'key')
            .then(function successCallBack(node) {
                component.node = node;
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
            }, (error) => {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
            });
    }

    returnToNode() {
        this.router.navigate(['../../list'], {relativeTo: this.activatedRoute});
    }

    returnToNodeDetails() {
        this.router.navigate(['../../details', this.node.key], {relativeTo: this.activatedRoute});
    }

    cancelDetails() {
        this.returnToNode();
    }

    cancelEditing() {
        this.returnToNodeDetails();
    }

    editNode() {
        this.router.navigate(['../../edit', this.node.key], {relativeTo: this.activatedRoute});
    }


    deleteNode() {
        var component = this;
        component.crudHelperService.startLoader(component);
        component.bgpsModel.delete(component.node).then(
            function successCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showNotification("Node: Deleted", result);
                component.returnToNode();
            }, function errorCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showServerError("Node: Delete failed", result);
            });
    }
}
