/**
 * Created by cshampur on 10/14/16.
 */

import { Component, OnInit, OnDestroy, Inject, NgZone } from "@angular/core";
import { CRUDHelperService } from "../components/utils/crudhelperservice";
import { ServicelbsModel } from "../components/models/servicelbsmodel";
import { NetworksModel } from "../components/models/networksmodel";
import { Router, ActivatedRoute } from "@angular/router";
import { OrganizationsModel } from "../components/models/organizationsmodel";
var _ = require('lodash');


@Component({
    selector: 'servicelbCreate',
    templateUrl: './servicelbcreate.html'
})

export class ServicelbCreateComponent implements OnInit {
    servicelbCreateCtrl:any;
    servicelb:any;
    networks:any[] = [];
    labelSelectors:any[] = [];
    tenants:any[] = [];

    constructor(private router:Router,
                private activatedRoute:ActivatedRoute,
                private ngZone:NgZone,
                private organizationsModel:OrganizationsModel,
                private servicelbsModel:ServicelbsModel,
                private crudHelperService:CRUDHelperService,
                private networksModel:NetworksModel) {
        this.servicelb = {
            serviceName: '',
            networkName: '',
            ipAddress: '',
            selectors: [],
            ports: [],
            tenantName: '',
            key: ''
        };
        this.servicelbCreateCtrl = this;
    }

    ngOnInit() {
        var component = this;
        component.crudHelperService.startLoader(this);

        function getTenants(reload:boolean) {
            component.organizationsModel.get(reload)
                .then((result) => {
                    component.tenants = result;
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                }, (error) => {
                    component.ngZone.run(() => {
                        component.crudHelperService.stopLoader(component);
                    });
                });
        }

        getTenants(false);
    }

    getNetworks(tenantName:string) {
        var servicelbCreateCtrl = this;
        this.networksModel.get(false)
            .then((result) => {
                servicelbCreateCtrl.networks = _.filter(result, {'tenantName': tenantName});
                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
            }, (error) => {
                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
            });
    }

    createServicelb(formvalid:boolean) {
        var servicelbCreateCtrl = this;
        this.createLabelSelectorStrings();
        if (formvalid) {
            this.crudHelperService.startLoader(this);
            this.servicelb.key = this.servicelb.tenantName + ':' + this.servicelb.serviceName;
            this.servicelbsModel.create(this.servicelb, undefined).then((result) => {
                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
                servicelbCreateCtrl.crudHelperService.showNotification("Service load balancer: Created", result.key.toString());
                this.returnToServicelbs();
            }, (error) => {
                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
                servicelbCreateCtrl.crudHelperService.showServerError("Service load balancer: Create failed", error);
            });
        }
    }

    cancelCreating() {
        this.returnToServicelbs();
    }

    returnToServicelbs() {
        this.router.navigate(['../list'], {relativeTo: this.activatedRoute});
    }

    createLabelSelectorStrings() {
        this.labelSelectors.forEach((labelSelector) => {
            var selectorString = labelSelector.name + '=' + labelSelector.value;
            this.servicelb.selectors.push(selectorString);
        })
    }

    updateTenant(tenantName:string) {
        this.servicelb.tenantName = tenantName;
        this.getNetworks(tenantName);

    }
}


