/**
 * Created by cshampur on 11/4/16.
 */
import { Injectable }       from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild} from '@angular/router';
import {AuthService} from "./authservice";
import {AuthMatrix} from "./authMatrix";
import {isNull} from "util";

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    accessMatrix:any;
    unguardedUrls: string[];

    constructor(private authService: AuthService, private router: Router) {
        this.accessMatrix = AuthMatrix;
        this.unguardedUrls = ['/unauthorized', '/login', '/logout'];
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;
        if (this.unguardedUrls.indexOf(url) > -1)
            return true;
        return this.checkLogin(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {

        if (this.authService.isLoggedIn) {
            if (this.checkAccess(url))
                if (this.authService.validateExpiry())
                    return true;
                else{
                    this.loadLogin(url);
                    return false;
                }
            else{
                this.router.navigate(['/unauthorized']);
                return false;
            }

        }
        // Validate Token Expiration
        if (!isNull(localStorage.getItem("authToken"))){
            this.authService.extractBody();
            if(this.authService.validateExpiry()){
                this.authService.isLoggedIn = true;
                if(this.checkAccess(url))
                    return true;
                else{
                    this.router.navigate(['/unauthorized']);
                }
            }
        }

        this.loadLogin(url);
        return false;
    }

    loadLogin(url: string): void{
        // Clean the local storage
        this.authService.cleanuplocalstorage();
        // Store the attempted URL for redirecting
        this.authService.redirectUrl = url;
        // Navigate to the login page
        this.router.navigate(['/login']);
    }

    checkAccess(url:string): boolean{
        return this.authService.checkAccess(url);
    }



}
