/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject} from "@angular/core";

import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";
import { StateService } from "angular-ui-router/commonjs/ng1";
import {VolumesModel} from "../components/models/volumesmodel";


@Component({
    selector: 'volumelist',
    templateUrl: "volumes/volumelist.html"
})

export class VolumeListComponent implements OnInit, OnDestroy{
    private volumesModel:VolumesModel;
    private crudHelperService: CRUDHelperService;
    public volumeListCtrl: any;
    private refresh: Subscription;

    constructor(@Inject('$state') private $state: StateService,
                volumesModel: VolumesModel,
                crudHelperService: CRUDHelperService){
        this.volumesModel = volumesModel;
        this.crudHelperService = crudHelperService;
        this.volumeListCtrl = this;
        this['showLoader']=true;
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getVolumes(true);
        })
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getVolumes(false);
    }

    getVolumes(reload: boolean){
        var volumeListCtrl = this;
        this.volumesModel.get(reload)
            .then(function successCallback(result){
                    volumeListCtrl['volumes'] = result;
                    volumeListCtrl.crudHelperService.stopLoader(volumeListCtrl);
                },
                function errorCallback(result){
                    volumeListCtrl.crudHelperService.stopLoader(volumeListCtrl);
                })
    }

    create(){
        this.$state.go('contiv.menu.volumes.create');
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}


