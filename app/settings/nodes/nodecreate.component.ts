import { Component, Inject, OnInit, NgZone } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import * as _ from 'lodash';
import { CRUDHelperService } from "../../components/utils/crudhelperservice";
import { BgpsModel } from "../../components/models/bgpsmodel";


@Component({
    selector: 'nodecreate',
    templateUrl: './nodecreate.html'
})

export class NodeCreateComponent {
    newNode:any = {};


    constructor(private activatedRoute:ActivatedRoute,
                private router:Router,
                private crudHelperService:CRUDHelperService,
                private bgpsModel:BgpsModel,
                private ngZone:NgZone) {
        var component = this;

        function resetForm() {
            crudHelperService.stopLoader(component);
            component.newNode = {
                "key": "",
                "hostname": "",
                "routerip": "",
                "as": "0",
                "neighbor": "",
                "neighbor-as": "0"
            };
        }

        resetForm();
    }

    returnToNodes() {
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    cancelCreating() {
        this.returnToNodes();
    }

    createNode(formvalid:boolean) {
        var component = this;
        if (formvalid) {
            this.crudHelperService.startLoader(this);
            component.newNode.key = component.newNode.hostname;
            this.bgpsModel.create(component.newNode, undefined)
                .then((result) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                        component.crudHelperService.showNotification("Node: Created", result.key.toString());
                    });
                    component.returnToNodes();
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                    component.crudHelperService.showServerError("Node: Create failed", error);
                });
        }
    }

}