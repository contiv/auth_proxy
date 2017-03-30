/**
 * Created by vjain3 on 3/27/17.
 */
import { Injectable } from '@angular/core';
import { Subject } from "rxjs";
import { Observable } from 'rxjs/Observable';
import { NetworksModel } from "../models/networksmodel";
import { OrganizationsModel } from "../models/organizationsmodel";

@Injectable()
export class FirstRunService {

    private firstrunSubject: Subject<any> =new Subject<any>();
    firstrunObservable: Observable<any> = this.firstrunSubject.asObservable();
    firstRun:boolean = false;

    constructor(private networksModel: NetworksModel,
                private organizationsModel: OrganizationsModel){
    }

    /**
     * Should only be called after the user has been logged in.
     */
    setFirstRun(): Promise<any> {
        return this.checkFirstRun().then(isFirstRun => {
            this.firstRun = isFirstRun;
            this.firstrunSubject.next(this.firstRun);
            return this.firstRun;
        });
    }

    private checkFirstRun(): Promise<any> {
        //if there are any tenants other than default or if there are any networks, we should not run the first run wizard.
        return this.networksModel.get(true)
            .then(networks => {
                if (networks.length) {
                    return false;
                }
                return this.organizationsModel.get(true)
                    .then(orgs => {
                        if ((!orgs.length) || (orgs.length === 1 && orgs[0].tenantName === 'default')) {
                            return true;
                        }
                        return false;
                    });
            });
    }
}