/**
 * Created by cshampur on 10/30/16.
 */


import {Component, Output, EventEmitter} from "@angular/core";
@Component({
    selector: 'firstrunwizardpage1',
    templateUrl: 'firstrunwizard/firstrunwizardpage1.html'
})

export class FirstrunWizardpage1Component{
    @Output('updatePage') updatePage: EventEmitter<any>;
    constructor(){
        this.updatePage = new EventEmitter<any>();
    }

    process(){
        this.updatePage.emit(1);
    }

}