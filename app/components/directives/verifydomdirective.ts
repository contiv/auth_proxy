/**
 * Created by cshampur on 11/7/16.
 */

import {
    Directive, ElementRef, Renderer, Input, OnInit, TemplateRef, ViewContainerRef,
    AfterViewInit
} from "@angular/core";
import {AuthService} from "../utils/authservice";
import {NetworkService} from "../utils/networkservice";


/* This Directive Hides and displays part of the dom based on the input verify string */
@Directive({
    selector: '[verifydom]'
})

export class VerifydomDirective implements AfterViewInit{

    @Input('verifydom') verifydom: string;
    private display: boolean = false;
    constructor(private authService: AuthService,
                private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private networkService: NetworkService){
        this.verifydom = '';
    }

    ngAfterViewInit(){
        this.verify();
    }

    verify(){
        var directive = this;
        this.display = false;
        switch (this.verifydom){
            case 'admin':   if(this.verifydom === this.authService.authTokenPayload['role'])
                                this.display = true;
                            this.render();
                            break;
            case 'aci':     this.networkService.getAciSettings().then(() => {
                                if(directive.networkService.aciMode)
                                    directive.display = true;
                                directive.render();
                            })
        }
    }

    render(){
        if(this.display)
            this.viewContainer.createEmbeddedView(this.templateRef);
        else
            this.viewContainer.clear();
    }

}

