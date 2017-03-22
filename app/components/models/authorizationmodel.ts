/**
 * Created by cshampur on 12/13/16.
 */


import {Injectable} from "@angular/core";
import {ContivGlobals} from "./contivglobals";
import {Http, Response} from "@angular/http";
import {ApiService} from "../utils/apiservice";
import {Collection} from "./collection";
import {Authorization} from "../../settings/authorization/authorizationcreate";
@Injectable()

export class AuthorizationModel extends Collection{
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.AUTHORIZATION_ENDPOINT, apiService);
    }

    delete(authId): Promise<any>{
        var collection = this;
        var url = collection.url + authId + '/';
        return super.deleteUsingKey(authId, 'AuthzUUID', url);
    }

    save(model):Promise<any> {
        var collection = this;
        var url = ContivGlobals.AUTHORIZATION_ENDPOINT + model['AuthzUUID'] + '/';
        return this.apiService.patch(url, model).map((res:Response) => res.json()).toPromise()
            .then((result) => {
                _.remove(collection.models, function (n) {
                    return n['AuthzUUID'] == model['AuthzUUID'];
                });
                collection.models.push(result);
                return result;
            });
    }

    create(model): Promise<any> {
        var collection = this;
        return this.apiService.post(ContivGlobals.AUTHORIZATION_ENDPOINT, model)
            .map((res:Response) => res.json()).toPromise()
            .then((result) => {
                _.remove(collection.models, function(n){
                    return (n['PrincipalName'] == model['PrincipalName'] &&
                            n['TenantName'] == model['TenantName'] &&
                            n['Role'] == model['Role'])
                });
                collection.models.push(result);
                return result;
            });
    }

    get(reload: boolean): Promise<any>{
        var collection = this;
        return super.get(reload).then((res) => {
            return collection.filterResult(res);
        });
    }

    filterResult(result): Array<Authorization>{
        var filterItems: Array<Authorization> = [];
        for(var item of result){
            if((item.Role!=='ops') || (item.TenantName !=='')) {
                filterItems.push(item);
            }
        }
        return filterItems;
    }
}