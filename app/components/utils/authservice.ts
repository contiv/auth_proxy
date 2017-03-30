/**
 * Created by cshampur on 11/4/16.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { AuthMatrix } from "./authMatrix";
import { isNull } from "util";
import { ContivGlobals } from "../models/contivglobals";
import { Subject } from "rxjs";

interface User{
    username: string;
    password: string;
}

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    // store the URL so we can redirect after logging in
    redirectUrl: string;
    headers: Headers;
    authTokenPayload: any;
    accessMatrix:any;
    authToken:string;
    username: string;
    public localUser: boolean = true;

    constructor(private http: Http){
        this.isLoggedIn = false;
        this.redirectUrl = '';
        this.accessMatrix = AuthMatrix;
        this.authTokenPayload = {};
        this.authToken='';
    }

    checkAccess(url: string): boolean{
        var searchUrl = url.replace('/m/', '');
        if(searchUrl.indexOf('details') > -1 || searchUrl.indexOf('edit') > -1)
            searchUrl = searchUrl.replace(/\/[^\/]*$/,'');
        if(searchUrl.indexOf('policyTab') > -1)
            searchUrl = searchUrl.replace(/;[^\/]*$/,'');
        var role = this.authTokenPayload['role'];
        if (this.accessMatrix[searchUrl][role]=='y')
            return true;
        else
            return false;
    }

    login(user: User): Observable<any> {
        this.headers = new Headers();
        this.username = user.username;
        this.headers.append('Content-Type', 'application/json');
        var options = new RequestOptions({headers: this.headers});

        /* Use the below code if you are calling netmaster apis through CCN_Proxy */
        return this.http.post(ContivGlobals.LOGIN_ENDPOINT, user, options)
            .map((res) => {
                var s = this.extractToken(res);
                if (s){
                    this.isLoggedIn = true;
                    return true;
                }
                else{
                    this.isLoggedIn = false;
                    return false;
                }
            })
            .catch((error:any) => Observable.throw(error));
    }

    encodeUrlData(body: any) :string{
        var str = Object.keys(body).map(function(key){
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
        }).join('&');
        return str;
    }

    extractToken(res: Response): boolean {
        /* auth_proxy is now sending the token as part of the body */

        var xAuthToken = res.json()['token'];
        if (xAuthToken.length > 0) {
            localStorage.setItem("authToken", xAuthToken);
            localStorage.setItem("lastAccessTime", new Date().getTime().toString());
            localStorage.setItem("username", this.username);
            this.extractBody();
            return true;
        }
        else{
            return false;
        }
    }

    extractBody(): void{
        var token = localStorage.getItem("authToken");
        this.authToken = token;
        var bodyEncoded = token.split('.')[1];
        var bodyString = atob(bodyEncoded);
        this.authTokenPayload = JSON.parse(bodyString);
        if(!isNull(this.authTokenPayload['username'].match(ContivGlobals.LDAPGROUP_REGEX)))
            this.localUser = false;
        this.username = localStorage.getItem("username");
    }

    validateExpiry(): boolean{
        let currentDate: Date = new Date();
        let lastAccessTime: string = localStorage.getItem("lastAccessTime");
        if(isNull(lastAccessTime)){
            return false;
        }
        let durationEloped = (currentDate.getTime() - parseInt(lastAccessTime)) / 60000;
        if((durationEloped >= 0) && (durationEloped < 60)){
            localStorage.setItem("lastAccessTime", currentDate.getTime().toString());
            return true;
        }
        return false;
    }
}