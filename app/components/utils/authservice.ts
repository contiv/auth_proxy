/**
 * Created by cshampur on 11/4/16.
 */

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import {AuthMatrix} from "./authMatrix";
import {isNull} from "util";

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
    firstRun:boolean;

    constructor(private http: Http){
        this.isLoggedIn = false;
        this.redirectUrl = '';
        this.accessMatrix = AuthMatrix;
        this.authTokenPayload = {};
        this.authToken='';
        this.firstRun = false;
    }

    checkAccess(url: string): boolean{
        var searchUrl = url.replace('/m/', '');
        if(searchUrl.indexOf('details') > -1 || searchUrl.indexOf('edit') > -1)
            searchUrl = searchUrl.replace(/\/[^\/]*$/,'');
        if(searchUrl.indexOf('policyTab') > -1)
            searchUrl = searchUrl.replace(/;[^\/]*$/,'')
        var role = this.authTokenPayload['role'];
        if (this.accessMatrix[searchUrl][role]=='y')
            return true;
        else
            return false;
    }

    login(user: User): Observable<any> {
        var data = this.encodeUrlData(user);
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({headers: this.headers});

        // This is just a mock
        return new Observable((observer) => {
            if (user.username != "devops" && user.username != "admin")
                observer.next(false);
            else{
                var res = '';

                if (user.username == "devops" && user.password == "devops")
                    var res = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBTExfQ0xVU1RFUlNfQVVUSCI6dHJ1ZSwiZXhwIjoxNDk4NjQ3NjIxLCJyb2xlIjoiRGV2T3BzIn0=.WXE_VtvyE_pg8paoVDwVIavZNHB-LmBLGJgY4REgvYk";

                if (user.username == "admin" && user.password == "admin")
                    var res = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBTExfQ0xVU1RFUlNfQVVUSCI6dHJ1ZSwiZXhwIjoxNDk4NjQ3NjIxLCJyb2xlIjoiU3lzQWRtaW4ifQ==.WXE_VtvyE_pg8paoVDwVIavZNHB-LmBLGJgY4REgvYk";

                if (res == ''){
                    observer.next(false);
                }
                else{
                    this.isLoggedIn = true;
                    localStorage.setItem("authToken", res);
                    localStorage.setItem("loginTime", new Date().toLocaleString());
                    localStorage.setItem("lastAccessTime", new Date().toLocaleString());
                    this.extractBody();
                    observer.next(true);
                }
            }



        });

        // This Code will be active after CCN Proxy is live...

        /*
        return this.http.post("/1/system/login", data, options)
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
            */
    }

    logout(): void {
        this.cleanuplocalstorage();
    }

    cleanuplocalstorage(): void{
        localStorage.removeItem("authToken");
        localStorage.removeItem("loginTime");
        localStorage.removeItem("lastAccessTime");
        this.isLoggedIn = false;
    }

    encodeUrlData(body: any) :string{
        var str = Object.keys(body).map(function(key){
            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
        }).join('&');
        return str;
    }

    extractToken(res: Response): boolean {
        var xAuthToken = res.headers.get("x-auth-token");
        if (xAuthToken.length > 0) {
            localStorage.setItem("authToken", xAuthToken);
            localStorage.setItem("loginTime", new Date().toLocaleString());
            localStorage.setItem("lastAccessTime", new Date().toLocaleString());
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
        if(isNull(localStorage.getItem('firstRun')))
            this.firstRun = true;
        else
            this.firstRun = false;
    }

    validateExpiry(): boolean{
        var lastAcessTime: any;
        var currentDate = new Date();
        lastAcessTime = localStorage.getItem("lastAccessTime");
        if(isNull(lastAcessTime)){
            return false;
        }
        lastAcessTime = new Date(lastAcessTime);
        var durationEloped = (currentDate.getTime() - lastAcessTime.getTime()) / 60000;
        if((durationEloped > 0) && (durationEloped < 10)){
            if(currentDate.getTime() > (this.authTokenPayload['exp'] * 1000))
                return false;
            localStorage.setItem("lastAccessTime", currentDate.toLocaleString());
            return true;
        }
        return false;
    }
}