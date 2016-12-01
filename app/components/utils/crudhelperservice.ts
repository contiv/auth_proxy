/**
 * Created by vjain3 on 4/29/16.
 */
import { Injectable } from '@angular/core';
declare var jQuery:any;

@Injectable()
export class CRUDHelperService {

    public message:string;
    public item:string;
    public displayNotifi:boolean;

    constructor(){
        this.message = 'Network Created';
        this.item = 'contiv-net1';
    }

    startLoader(controller) {
        controller.showLoader = true;
    }

    stopLoader(controller) {
        controller.showLoader = false;
    }

    showServerError(controller, message) {
        controller.showServerError = true;
        controller.serverErrorMessage = message;
    }

    hideServerError(controller) {
        controller.showServerError = false;
    }

    showNotification(message: string, item: string){
        this.message = message;
        this.item = item;
        this.displayNotifi = true;
    }
}