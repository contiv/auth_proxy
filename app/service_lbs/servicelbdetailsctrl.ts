/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject, ViewChild, AfterViewInit} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import { StateService } from "angular-ui-router/commonjs/ng1";
import {ServicelbsModel} from "../components/models/servicelbsmodel";
import {ServicelbInfoComponent} from "./servicelbinfoctrl";
import {ServicelbStatComponent} from "./servicelbstatsctrl";
var _ = require('lodash');


@Component({
    selector: 'servicelbDetails',
    templateUrl: "service_lbs/servicelbdetails.html"
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


    constructor(@Inject('$state') private $state: StateService
                ){
        this.infoselected = true;
        this.statskey=''
        this.mode = 'details';
        this.serviceName='';
        this.servicelbDetailsCtrl = this;
    }

    ngOnInit(){
        this.statskey = this.$state.params['key'];

    }

    returnToServicelbs() {
        this.$state.go('contiv.menu.servicelbs.list');
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

