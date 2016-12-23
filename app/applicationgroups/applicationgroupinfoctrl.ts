/**
 * Created by cshampur on 11/18/16.
 */


import {Component, Input, OnInit} from "@angular/core";
@Component({
    selector: 'applicationgroupinfo',
    templateUrl: './applicationgroupinfo.html'
})

export class ApplicationGroupInfoComponent{
    @Input('applicationGroup') applicationGroup: any;
    @Input('mode') mode: string;
    @Input('showLoader') showLoader: boolean;
    constructor(){
        this.applicationGroup= {
            groupName: '',
            networkName: ''
        };
        this.mode = 'details';
    }
}