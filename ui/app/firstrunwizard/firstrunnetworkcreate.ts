/**
 * Created by cshampur on 2/12/17.
 */



import {Component, EventEmitter, Output} from "@angular/core";
import {FirstRunWizardService} from "./firstrunwizardservice";
@Component({
    selector: 'firstrunnetworkcreate',
    templateUrl: './firstrunnetworkcreate.html'
})

export class FirstrunNetworkCreateComponent{
    @Output('updatePage') updatePage:EventEmitter<any>;
    @Output('cancelPage') cancelPage:EventEmitter<any>;
    public clusterMode: string = '';
    public newNetwork: any;
    public networkPresent: boolean;
    constructor(private wizardService: FirstRunWizardService){
        this.updatePage = new EventEmitter<any>();
        this.cancelPage = new EventEmitter<any>();
        this.clusterMode = this.wizardService.clusterMode;
        this.newNetwork = this.wizardService.newNetwork
    }

    createNetwork(network: any){
        this.wizardService.skipArray[2] = false;
        this.wizardService.newNetwork = network;
        this.updatePage.emit(3);
    }

    goBack(){
        this.updatePage.emit(1);
    }

    skip(){
        this.wizardService.skipArray[2] = true;
        this.updatePage.emit(3)
    }

    cancel(){
        this.cancelPage.emit();
    }
}