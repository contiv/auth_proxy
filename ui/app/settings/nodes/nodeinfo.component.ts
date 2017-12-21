/**
 * Created by vjain3 on 12/7/16.
 */
import { Component, Input, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { BgpsModel } from "../../components/models/bgpsmodel";

@Component({
    selector: 'nodeinfo',
    templateUrl: './nodeinfo.html'
})
export class NodeInfoComponent implements OnInit {
    @Input('mode') mode: string;
    node:any = {};

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

    returnToNodeDetails() {
        this.router.navigate(['../../details', this.node.key], {relativeTo: this.activatedRoute});
    }

    cancelEditing() {
        this.returnToNodeDetails();
    }

    saveNode(formvalid:boolean) {
        var component = this;
        if (formvalid) {
            component.crudHelperService.startLoader(component);

            component.bgpsModel.save(component.node).then(
                function successCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showNotification("Node: Bgp config updated", result.key.toString());
                    component.returnToNodeDetails();
                }, function errorCallback(result) {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("Node: Bgp config update failed", result);
                    component.crudHelperService.showServerError(component, result);
                });
        }
    }
}
