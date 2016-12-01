/**
 * Created by cshampur on 11/30/16.
 */

import {Component, DoCheck, OnInit} from "@angular/core";
import {CRUDHelperService} from "../utils/crudhelperservice";
declare var jQuery:any;

@Component({
    selector: 'notification',
    templateUrl: 'components/directives/notification.html',
    styleUrls: ['components/directives/notification.css']
})

export class NotificationComponent implements DoCheck, OnInit{
    public message: string = '';
    public item: string = '';
    private state: string = 'not-trigerred';
    constructor(private crudHelperService: CRUDHelperService){
    }

    ngOnInit(){
        jQuery('.notifi').css(
            {   right:0+'px',
                top: ((8/100)*window.innerHeight) + 'px'
            });
        jQuery('.notifi').css({visibility: 'hidden'});
        window.onresize = function(){
            jQuery('.notifi').css(
                {   right:0+'px',
                    top: ((8/100)*window.innerHeight) + 'px'
                });
        }
    }

    ngDoCheck(){
        if (this.crudHelperService.displayNotifi){
            this.message = this.crudHelperService.message;
            this.item = this.crudHelperService.item;
            this.crudHelperService.displayNotifi = false;
            var self = this;
            if (this.state !== 'not-trigerred' && this.state !== 'closed') {
                jQuery('.notifi').transition('slide left');
            }
            jQuery('.notifi').transition('slide left');
            this.state = 'running';

            setTimeout(function () {
                if(self.state==='running'){
                    jQuery('.notifi').transition('slide left');
                    self.state = 'closed';
                }
            }, 10000);

        }
    }

    close(){
        jQuery('.notifi').transition('slide left');
        this.state = 'closed';
    }
}