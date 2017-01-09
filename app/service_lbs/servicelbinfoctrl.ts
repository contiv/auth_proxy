/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, Input, Inject, EventEmitter, Output, AfterViewChecked, NgZone} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {ServicelbsModel} from "../components/models/servicelbsmodel";
import {Router, ActivatedRoute} from "@angular/router";
var _ = require('lodash');


@Component({
    selector: 'servicelb-info',
    templateUrl: "./servicelbinfo.html"
})

export class  ServicelbInfoComponent implements OnInit{
    @Input('mode') mode: string;
    @Output('modeChange') modeChange: EventEmitter<any>;
    @Output('serviceName') serviceName: EventEmitter<any>;
    private servicelbsModel: ServicelbsModel;
    private crudHelperService: CRUDHelperService;
    public servicelbInfoCtrl: any;
    public infoselected: boolean;
    public statskey: string;
    public servicelb: any;
    public labelSelectors: any;
    public showLoader: boolean;
    private ngZone: NgZone;

    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                servicelbsModel: ServicelbsModel,
                crudHelperService: CRUDHelperService,
                ngZone: NgZone){
        this.servicelbsModel = servicelbsModel;
        this.crudHelperService = crudHelperService;
        this.infoselected = true;
        this.statskey='';
        this.showLoader = true;
        this.mode = 'details';
        this.servicelb = {serviceName: '', networkName: '', ipAddress: '', selectors: [], ports: [], tenantName: 'default', key:''};
        this.labelSelectors =[];
        this.modeChange = new EventEmitter<any>();
        this.serviceName = new EventEmitter<any>();
        this.ngZone = ngZone;
        this.servicelbInfoCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.statskey = this.activatedRoute.snapshot.params['key'];
        this.getServicelbs(false);
    }

    returnToServicelbDetails() {
        this.mode = "details";
        this.modeChange.emit(this.mode);
    }

    returnToServicelbs(){
        this.router.navigate(['../../list'], {relativeTo: this.activatedRoute});
    }

    getServicelbs(reload: boolean){
        var servicelbInfoCtrl = this;
        this.servicelbsModel.getModelByKey(this.statskey, false, 'key')
            .then((result) => {
                    servicelbInfoCtrl['servicelb'] = result;
                    servicelbInfoCtrl.createEditViewLabels();
                    servicelbInfoCtrl.serviceName.emit(servicelbInfoCtrl.servicelb.serviceName);
                    servicelbInfoCtrl.ngZone.run(() => {
                        servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
                    });
                },
                (error) => {
                    servicelbInfoCtrl.ngZone.run(() => {
                        servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
                    });
                })
    }

    createEditViewLabels(){
        this.servicelb.selectors.forEach((item) => {
            var selector = {
                name: item.split('=')[0],
                value: item.split('=')[1]
            }
            this.labelSelectors.push(selector);
        });
    }

    createLabelSelectorStrings(){
        var servicelbInfoCtrl = this;
        this.servicelb.selectors = [];
        this.labelSelectors.forEach((selector) => {
            var selectorString = selector.name+"="+selector.value;
            this.servicelb.selectors.push(selectorString);
        });
    }

    saveServicelb(){
        this.crudHelperService.startLoader(this);
        var existingLabelsView = this.servicelb.selectors.slice();
        this.createLabelSelectorStrings();
        var servicelbInfoCtrl = this;
        this.servicelbsModel.save(this.servicelb)
            .then((result) => {
                servicelbInfoCtrl.ngZone.run(() => {
                    servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
                    servicelbInfoCtrl.crudHelperService.showNotification("Service load balancer: Updated", result.key.toString());
                });
                servicelbInfoCtrl.returnToServicelbDetails();
            },(error) => {
                servicelbInfoCtrl.servicelb.selectors = existingLabelsView;
                servicelbInfoCtrl.ngZone.run(() => {
                    servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
                    servicelbInfoCtrl.crudHelperService.showServerError("Service load balancer: Update failed", error);
                });
            });
    }

    deleteServicelb() {
        this.crudHelperService.startLoader(this);
        var servicelbInfoCtrl = this;
        this.servicelbsModel.delete(this.servicelb)
            .then((result) => {
                    servicelbInfoCtrl.ngZone.run(() => {
                        servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
                        servicelbInfoCtrl.crudHelperService.showNotification("Service load balancer: Deleted", result.toString());
                    });
                    servicelbInfoCtrl.returnToServicelbs();
                },
                (error) => {
                    servicelbInfoCtrl.ngZone.run(() => {
                        servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
                        servicelbInfoCtrl.crudHelperService.showNotification("Service load balancer: Delete failed", error);
                    });
                }
            );
    }

    cancelEditing(){
        this.returnToServicelbDetails();
    }
}