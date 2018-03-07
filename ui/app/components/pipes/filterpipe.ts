/**
 * Created by vjain3 on 10/21/16.
 */
import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items:any[], searchText:string): any[]{
        var selectedItems = [];
        if(searchText.length === 0){
            return items;
        }
        for(var item of items){
            var str='';
            for(var key in item){
                str+=JSON.stringify(item[key]);
            }
            if (str.search(searchText) > -1){
                selectedItems.push(item);
            }
        }
        return selectedItems;
    }
}