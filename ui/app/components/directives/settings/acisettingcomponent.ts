import {Component, Output, EventEmitter, Input, AfterViewInit} from "@angular/core";
declare var jQuery:any;
@Component({
    selector: 'acisettingcomp',
    templateUrl: './acisetting.html'
})
export class AciSettingComponent implements AfterViewInit{

    @Input('firstRunWiz') firstRunWiz:boolean;
    @Output('updateAciDef') updateAciDef:EventEmitter<any>;
    @Input('setting') setting:any;
    @Output('cancel') cancel:EventEmitter<any>;
    @Output('skip') skip:EventEmitter<any>;
    @Output('goback') goback:EventEmitter<any>;
    @Input('disabled') disabled: boolean;

    constructor() {
        this.updateAciDef = new EventEmitter<any>();
        this.cancel = new EventEmitter<any>();
        this.skip = new EventEmitter<any>();
        this.goback = new EventEmitter<any>();
    }

    updateAciSetting(formvalid:boolean) {
        if (formvalid) {
            this.updateAciDef.emit(this.setting);
        }
    }

    ngAfterViewInit(){
        if(this.disabled){
            jQuery('.ui.dimmer.aci').dimmer({
                opacity: 0.8,
                closable: false
            }).dimmer('show');
        }
    }
}