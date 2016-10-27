/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject} from "@angular/core";

import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";
import { StateService } from "angular-ui-router/commonjs/ng1";
import {StoragePoliciesModel} from "../components/models/storagepoliciesmodel";



@Component({
    selector: 'storagepolicylist',
    templateUrl: 'storage_policies/storagepolicylist.html'
})

export class StoragepolicyListComponent implements OnInit, OnDestroy{
    private storagePoliciesModel:StoragePoliciesModel;
    private crudHelperService: CRUDHelperService;
    public storagePolicyListCtrl: any;
    private refresh: Subscription;

    constructor(@Inject('$state') private $state: StateService,
                storagePoliciesModel: StoragePoliciesModel,
                crudHelperService: CRUDHelperService){
        this.storagePoliciesModel = storagePoliciesModel;
        this.crudHelperService = crudHelperService;
        this.storagePolicyListCtrl = this;
        this['showLoader']=true;
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getPolicies(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getPolicies(false);
    }

    getPolicies(reload: boolean){
        var storagePolicyListCtrl = this;
        this.storagePoliciesModel.get(reload)
            .then(function successCallback(result){
                    storagePolicyListCtrl['policies'] = result;
                    storagePolicyListCtrl.crudHelperService.stopLoader(storagePolicyListCtrl);
                },
                function errorCallback(result){
                    storagePolicyListCtrl.crudHelperService.stopLoader(storagePolicyListCtrl);
                })
    }

    create(){
        this.$state.go('contiv.menu.storagepolicies.create');
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}


