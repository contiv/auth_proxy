/**
 * Created by cshampur on 10/17/16.
 */


import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
var _ = require('lodash');

interface Item{
    servicePort: string;
    providerPort: string;
    protocol: string;
}

@Component({
    selector:'ctv-servicelbports',
    templateUrl:'./servicelbports.html'
})

export class ServicelbPortsComponent{
    @Input('items') items: string[];
    @Output('itemsChange') itemsChange: EventEmitter<any>;
    public newItem:Item;
    constructor(){
        this.itemsChange = new EventEmitter<any>();
        this.items=[];
        this.newItem = {servicePort: '',  providerPort: '',  protocol: ''};
    }

    public resetItem(): void{
        this.newItem = {servicePort: '',  providerPort: '',  protocol: ''};
    }


    public add(): void{
        function compare(val1, val2){
            return val1 == val2;
        }

        if (this.newItem.servicePort == '' && this.newItem.providerPort == '' && this.newItem.protocol == ''){
            return;
        }
        var newItemStr = this.newItem.servicePort + ':' + this.newItem.providerPort + ':' + this.newItem.protocol;
        _.pullAllWith(this.items, [newItemStr], compare);
        this.items.push(newItemStr);
        this.itemsChange.emit(this.items);
        this.resetItem();
    }

    public remove(passedItem: Item): void{
        _.remove(this.items, function(item){
            return item == passedItem;
        });
    }

}