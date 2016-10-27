/**
 * Created by cshampur on 10/14/16.
 */

import {Component, OnInit, OnDestroy, Inject} from "@angular/core";

import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Observable, Subscription} from "rxjs";
import { StateService } from "angular-ui-router/commonjs/ng1";
import {VolumesModel} from "../components/models/volumesmodel";
import {VolumeService} from "./volumeservice";
import {isUndefined} from "util";


@Component({
    selector: 'volumedetails',
    templateUrl: "volumes/volumedetails.html"
})

export class VolumeDetailsComponent implements OnInit, OnDestroy{
    private volumesModel:VolumesModel;
    private volumeService: VolumeService;
    private crudHelperService: CRUDHelperService;
    public volumeDetailsCtrl: any;
    private refresh: Subscription;
    public volume: any;

    constructor(@Inject('$state') private $state: StateService,
                volumesModel: VolumesModel,
                crudHelperService: CRUDHelperService,
                volumeService: VolumeService){
        this.volumesModel = volumesModel;
        this.crudHelperService = crudHelperService;
        this.volumeService = volumeService;
        this['snapshots'] = []
        this['volumeUse'] = {Hostname: '', Reason: ''};
        this.volume = { policy: '',
                        driver: {pool: ''},
                        create: {size: '', filesystem: ''},
                        runtime: {  snapshot:
                                        {frequency: '', keep: ''},
                                    'rate-limit': {'write-iops': '', 'read-iops':'', 'write-bps':'', 'read-bps': ''}},
                        backends: {crud: '', mount: '', snapshot: ''}
        }
        this['showLoader'] = true;
        this['serverErrorMessage'] = '';
        this.refresh=Observable.interval(5000).subscribe(() => {
            this.getVolumesInfo(true);
        })
        this.volumeDetailsCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.startLoader(this);
        this.getVolumesInfo(false);
    }

    getVolumesInfo(reload: boolean){
        var tokens = this.$state.params['key'].toString().split('/');
        var volumeDetailsCtrl = this;
        var model={policy: tokens[0], name: tokens[1]};
        this.volumesModel.getModel(model, reload)
            .then((volume) => {
                volumeDetailsCtrl['volume'] = volume;
                volumeDetailsCtrl.getVolumeUseInfo();
                volumeDetailsCtrl.getVolumeSnapshots();
            });
    }

    getVolumeUseInfo(){
        var volumeDetailsCtrl = this;
        this.volumeService.getVolumeUseInfo(volumeDetailsCtrl.volume)
            .subscribe((result) => {
                if(!isUndefined(result))
                    volumeDetailsCtrl['volumeUse'] = result;
            }, (error) => {
                console.log("Error with volume use Info"+ error);
            });
    }

    getVolumeSnapshots(){
        var volumeDetailsCtrl = this;
        this.volumeService.getVolumeSnapshot(volumeDetailsCtrl.volume)
            .subscribe((result) => {
                if(!isUndefined(result))
                    volumeDetailsCtrl['snapshots'] = result;
                volumeDetailsCtrl.crudHelperService.stopLoader(volumeDetailsCtrl);
            }, (error) => {
                volumeDetailsCtrl.crudHelperService.stopLoader(volumeDetailsCtrl);
            });
    }

    triggerVolumeSnapshot(){
        var volumeDetailsCtrl = this;
        this.volumeDetailsCtrl['snapshotSuccess'] = false;
        this.crudHelperService.hideServerError(this);
        this.crudHelperService.startLoader(this);
        this.volumeService.triggerSnapshot(volumeDetailsCtrl.volume)
            .subscribe((result) => {
                volumeDetailsCtrl.crudHelperService.stopLoader(volumeDetailsCtrl);
                volumeDetailsCtrl['snapshotSuccess'] = true;
            }, (error) => {
                volumeDetailsCtrl.crudHelperService.stopLoader(volumeDetailsCtrl);
                volumeDetailsCtrl.crudHelperService.showServerError(volumeDetailsCtrl, error);
            })
    }

    copysnapshot(snapshot:string, policy:string, volume:string){
        this.$state.go('contiv.menu.volumes.copy', {snapshot: snapshot, policy: policy, volume: volume});
    }

    deleteVolume(){
        var volumeDetailsCtrl = this;
        this.crudHelperService.hideServerError(this);
        this.crudHelperService.startLoader(this);
        this.volumesModel.delete(volumeDetailsCtrl.volume)
            .then((result) => {
                volumeDetailsCtrl.crudHelperService.stopLoader(volumeDetailsCtrl);
                this.returnToVolumes();
            }, (error) => {
                volumeDetailsCtrl.crudHelperService.showServerError(volumeDetailsCtrl,error);
            })
    }

    returnToVolumes(){
        this.$state.go('contiv.menu.volumes.list');
    }

    ngOnDestroy(){
        this.refresh.unsubscribe();
    }
}


