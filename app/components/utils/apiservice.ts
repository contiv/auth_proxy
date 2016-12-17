/**
 * Created by cshampur on 11/8/16.
 */


import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {Observable} from "rxjs";
import {AuthService} from "./authservice";
@Injectable()

export class ApiService{
    private headers: Headers;
    constructor(private http: Http,
                private authService: AuthService){
    }

    get(url: string): Observable<any>{
        var options = this.prepareHeader('get');
        return this.http.get(url,options);
    }

    put(url:string, body:any): Observable<any>{
        var options = this.prepareHeader('put');
        return this.http.put(url,body,options);
    }

    post(url:string, body:any): Observable<any>{
        var options = this.prepareHeader('post');
        return this.http.post(url,body,options);
    }

    delete(url:string): Observable<any>{
        var options = this.prepareHeader('delete');
        return this.http.delete(url,options);
    }

    patch(url:string, body:any): Observable<any>{
        var options = this.prepareHeader('patch')
        return this.http.patch(url, body, options);
    }

    prepareHeader(method: string): RequestOptions{
        this.headers = new Headers();
        if(method!='get' && method!='delete')
            this.headers.append('Content-Type', 'application/json');
        if (this.authService.authToken.length > 0)
            this.headers.append('X-Auth-Token', this.authService.authToken);
        var options = new RequestOptions({headers: this.headers});
        return options;
    }
}