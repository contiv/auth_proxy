import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
import { AuthService } from "./authservice";
@Injectable()

export class ApiService{
    private headers: Headers;
    public authServiceRef: AuthService;
    constructor(private http: Http,
                private authService: AuthService){
        this.authServiceRef = authService;
    }

    get(url: string): Observable<any>{
        var options = this.prepareHeader('get');
        return this.http.get(url,options)
            .catch((error: any) => {
                this.checkUnauthorized(error);
                return Observable.throw(error);
            });
    }

    put(url:string, body:any): Observable<any>{
        var options = this.prepareHeader('put');
        return this.http.put(url,body,options)
            .catch((error: any) => {
                this.checkUnauthorized(error);
                return Observable.throw(error);
            });
    }

    post(url:string, body:any): Observable<any>{
        var options = this.prepareHeader('post');
        return this.http.post(url,body,options)
            .catch((error: any) => {
                this.checkUnauthorized(error);
                return Observable.throw(error);
            });
    }

    delete(url:string): Observable<any>{
        var options = this.prepareHeader('delete');
        return this.http.delete(url,options)
            .catch((error: any) => {
                this.checkUnauthorized(error);
                return Observable.throw(error);
            });
    }

    patch(url:string, body:any): Observable<any>{
        var options = this.prepareHeader('patch')
        return this.http.patch(url, body, options)
            .catch((error: any) => {
                this.checkUnauthorized(error);
                return Observable.throw(error);
            });
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

    checkUnauthorized(error: any){
        if(this.authService.isLoggedIn){
            if((error.status===401) || (error.status===403))
                this.authService.isLoggedIn = false;
        }
    }
}