import { Component, Inject, NgZone } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { BgpsModel } from "../../components/models/bgpsmodel";

@Component({
    selector: 'nodedetails',
    templateUrl: 'settings/nodes/nodedetails.html'
})
export class NodeDetailsComponent {
    node:any = {};
    mode:string = 'details';

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

        component.crudHelperService.stopLoader(component);
        component.crudHelperService.hideServerError(component);

        component.bgpsModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
            .then(function successCallBack(node) {
                component.node = node;
            });

        setMode();
    }

    returnToNode() {
        this.router.navigate(['../../list'], {relativeTo: this.activatedRoute});
    }

    returnToNodeDetails() {
        this.router.navigate(['../../details', this.node.key], {relativeTo: this.activatedRoute});
    }

    editNode() {
        this.router.navigate(['../../edit', this.node.key], {relativeTo: this.activatedRoute});
    }

    cancelEditing() {
        this.returnToNodeDetails();
    }

    deleteNode() {
        var component = this;
        component.crudHelperService.hideServerError(component);
        component.crudHelperService.startLoader(component);
        component.bgpsModel.delete(component.node).then(
            function successCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.returnToNode();
            }, function errorCallback(result) {
                component.ngZone.run(() => {
                    component.crudHelperService.stopLoader(component);
                });
                component.crudHelperService.showServerError(component, result);
            });
    }

    saveNode(formvalid:boolean) {
        var component = this;
        if (formvalid) {
            component.crudHelperService.hideServerError(component);
            component.crudHelperService.startLoader(component);

            component.bgpsModel.save(component.node).then(
                function successCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.returnToNodeDetails();
                }, function errorCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError(component, result);
                });
        }
    }
}