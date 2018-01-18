/**
 * Created by cshampur on 10/25/16.
 */

import {Component, Input} from "@angular/core";
@Component({
    selector: 'network-info',
    templateUrl: './networkinfo.html'
})

export class NetworkInfoComponent {
    @Input('networkDetailsCtrl') networkDetailsCtrl: any;
    constructor(){
        this.networkDetailsCtrl = { network:
        {networkName: '', encap: '', subnet: '', gateway: ''},
            showLoader: false,
            applicationGroups: []
        };
    }
}