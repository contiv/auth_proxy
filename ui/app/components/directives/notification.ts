/**
 * Created by cshampur on 11/30/16.
 */

import {Component, DoCheck, OnInit} from "@angular/core";
import {CRUDHelperService} from "../utils/crudhelperservice";
import {isUndefined} from "util";
declare var jQuery:any;

export enum NotificationType {
    confirm,
    alert,
    info
}

@Component({
    selector: 'notification',
    templateUrl: './notification.html',
    styleUrls: ['./notification.css']
})

export class NotificationComponent implements DoCheck, OnInit{
    public NotificationType = NotificationType;
    public message: string = '';
    public item: string = '';
    private notifyId: number = 0;
    public notificationType: NotificationType;
    private notifyCounter: number = 0;
    constructor(private crudHelperService: CRUDHelperService){
    }

    ngOnInit(){
        jQuery('.notify').css(
            {   right:30+'px',
                top: ((80/100)*window.innerHeight) + 'px'
            });
        jQuery('.notify').css({visibility: 'hidden'});
        window.onresize = function(){
            jQuery('.notify').css(
                {   right:30+'px',
                    top: ((80/100)*window.innerHeight) + 'px'
                });
        };
        this.notifyId = 0;
    }

    runAnimation(start: boolean){
        var self = this;
        var animation = {
            animation: 'fade up',
            duration: '600ms',
            onStart: function(){
                if(start)
                    self.displayMessage();
            }
        };
        jQuery('.notify').transition(animation);
    }

    displayMessage(){
        this.message = this.crudHelperService.message;
        this.item = this.crudHelperService.item;
        this.notificationType = this.crudHelperService.notificationType;
        if(isUndefined(this.notificationType))
            this.notificationType = NotificationType.confirm;
    }

    /*
        Since notification is part of the Menu component. The ngDoCheck() block runs every time the angular
        checks for changes in the Document tree.
        CrudhelperService is the service using which all child components of menu communicate with the
        notification component.
        this.crudHelperService.displayNotify gets set to true when this.crudHelperService.showNotification is called.
        When its true : -
            a) if there is any earlier notification which is getting displayed then the notifyId would be positive integer.
                In this case I will be closing the current notification by running this.runAnimation(false), The flag is false
                so while closing the notification I dont change the message inside the Notification element.
            b) if there is no earlier notification  I execute runAnimation() with flag true which swaps the message inside the notification element on
                start of the animation.
            c) The notification counter for the first time would be 1. This id is passed to notifyTimer which sets up a setTimeout.
                The setTimeout only hides the notification with matching timerId and notifyId. If there is a new notification
                before the previous setTimeout has closed the previous notification, Then we first close the previous notification and we increment the notifyId
                and create a new timer for closing notification with id 2. Meanwhile after 20 sec if the setTimeout from previous
                notification runs, we dont close the notification since the timer id of the previous notification is 1 but
                the current notifyId is 2.
    */
    ngDoCheck(){
        var self = this;
        if (this.crudHelperService.displayNotify){
            if (this.notifyId !== 0) {
                this.runAnimation(false);
                this.notifyId = 0;
            }

            this.crudHelperService.displayNotify = false;
            this.runAnimation(true);
            var currentnotifyId = ++this.notifyCounter;
            this.notifyId = currentnotifyId;
            var newTimer = new notifyTimer(currentnotifyId);

        }

        function notifyTimer(timerId){
            var timerId = timerId;
            setTimeout(function(){
                if(timerId == self.notifyId){
                    self.runAnimation(false);
                    self.notifyId = 0;
                }
            },15000)
        }
    }

    close() {
        this.runAnimation(false);
        this.notifyId = 0;
    }
}

