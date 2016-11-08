/**
 * Created by cshampur on 11/7/16.
 */

import {Directive, ElementRef, Renderer, Input, OnInit, TemplateRef, ViewContainerRef} from "@angular/core";
import {AuthService} from "../utils/authservice";

@Directive({
    selector: '[auth]'
})

export class AuthDirective implements OnInit{

    @Input('auth') auth: string;
    constructor(private authService: AuthService,
                private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef){
        this.auth = '';
    }

    ngOnInit(){
        if (this.auth == this.authService.authTokenPayload['role']){
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else{
            this.viewContainer.clear();
        }
    }
}

