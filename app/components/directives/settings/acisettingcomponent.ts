import { Component, Output, EventEmitter, Input } from "@angular/core";

@Component({
    selector: 'acisettingcomp',
    templateUrl: './acisetting.html'
})
export class AciSettingComponent {

    @Input('firstRunWiz') firstRunWiz:boolean;
    @Output('updateAciDef') updateAciDef:EventEmitter<any>;
    @Input('setting') setting:any;
    @Output('cancel') cancel:EventEmitter<any>;
    @Output('skip') skip:EventEmitter<any>;
    @Output('goback') goback:EventEmitter<any>;

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
}