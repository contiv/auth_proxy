/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject, ViewChild, AfterViewInit} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {ServicelbsModel} from "../components/models/servicelbsmodel";
import {ServicelbInfoComponent} from "./servicelbinfoctrl";
import {ServicelbStatComponent} from "./servicelbstatsctrl";
import {Router, ActivatedRoute} from "@angular/router";
var _ = require('lodash');


@Component({
    selector: 'servicelbDetails',
    templateUrl: "./servicelbdetails.html"
})

export class ServicelbDetailsComponent implements OnInit{
    public infoselected: boolean
    public statskey: string;
    public mode: string;
    public servicelbDetailsCtrl: any;
    public serviceName:any;

    @ViewChild(ServicelbInfoComponent)
    public servielbInfo: ServicelbInfoComponent;

    @ViewChild(ServicelbStatComponent)
    public servielbStat: ServicelbInfoComponent;


    constructor(private router: Router,
                private activatedRoute: ActivatedRoute
                ){
        this.infoselected = true;
        this.statskey='';
        this.mode = 'details';
        this.serviceName='';
        this.servicelbDetailsCtrl = this;
    }

    ngOnInit(){
        this.statskey = this.activatedRoute.snapshot.params['key'];

    }

    returnToServicelbs() {
        this.router.navigate(['../../list'], {relativeTo: this.activatedRoute});
    }
    
    cancelDetails() {
        this.returnToServicelbs()
    }

    cancelEditing() {
        this.returnToServicelbs()
    }

    loadDetails() {
        this.mode = "details";
    }

    loadEdit() {
        this.mode = "edit";
    }

    deleteServicelb(){
        this.servielbInfo.deleteServicelb();
    }
}

