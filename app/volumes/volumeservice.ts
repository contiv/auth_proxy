import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {isUndefined} from "util";

@Injectable()
export class VolumeService {
    private http: Http;
    constructor(http: Http){
        this.http = http;
    }

    getVolumeUseInfo(volume:any): Observable<any>{
        var observable = new Observable((observer) => {
                var url = ContivGlobals.VOLUMES_USES_ENDPOINT + volume['policy'] + '/' +volume['name'];
                this.http.get(url)
                    .map((res:Response) => res.json())
                    .subscribe( (result) => {observer.next(result)},
                                (error) => {observer.error(error)
                    })
        });
        return observable;
    }

    getVolumeSnapshot(volume: any): Observable<any>{
        var url = ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT
                + volume['policy'] + '/' + volume['name'];
        return this.http.get(url)
                   .map((res:Response) => res.json())

    }

    triggerSnapshot(volume:any): Observable<any>{
        var url = ContivGlobals.VOLUMES_SNAPSHOTS_ENDPOINT + "take/" + volume['policy'] + '/' + volume['name'];
        return this.http.post(url,JSON.stringify(''))
                   .map((res) => {if (res.headers.get("content-type").indexOf("text") > -1)
                       return res;
                   else
                       return res.json();
                   });
    }
}

