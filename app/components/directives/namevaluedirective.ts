/**
 * Created by cshampur on 10/17/16.
 */


import {Component, Input, Output, EventEmitter, OnInit} from "@angular/core";
var _ = require('lodash');

export interface Item{
    name: string;
    value: string;
}

@Component({
    selector:'ctv-namevalue',
    templateUrl:'./namevalue.html'
})

export class CtvNamevalueComponent{
    @Input('items') items: Item[];
    @Input('nameheader') nameheader: string;
    @Input('options') options:string[];
    @Input('valueheader') valueheader: string;
    @Output('itemsChange') itemsChange: EventEmitter<any>;
    @Input('type') type: string;
    public newItem:Item;
    constructor(){
        this.itemsChange = new EventEmitter<any>();
        this.items=[];
        this.nameheader = 'Name';
        this.valueheader = 'Value';
        this.type = 'text';
        this.newItem = {name: '', value: ''};
        this.options=[];
    }

    public resetItem(): void{
        this.newItem = {name:'',value:''};
    }


    public add(): void{
        function compare(val1, val2){
            return val1.name == val2.name;
        }

        if (this.newItem.name == '' && this.newItem.value == ''){
            return;
        }

        _.pullAllWith(this.items, [this.newItem], compare);

        this.items.push(this.newItem);
        this.itemsChange.emit(this.items);
        this.resetItem();
    }

    public remove(passedItem: Item): void{
        _.remove(this.items, function(item){
            return item.name == passedItem.name;
        });
    }

}