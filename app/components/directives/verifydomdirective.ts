/**
 * Created by cshampur on 11/7/16.
 */

import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../utils/authservice";
import { NetworkService } from "../utils/networkservice";


/* This Directive Hides and displays part of the dom based on the input verify string */
@Directive({
    selector: '[verifydom]'
})

export class VerifydomDirective{

    private display: boolean = false;
    constructor(private authService: AuthService,
                private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef,
                private networkService: NetworkService){
        this.verifydom = '';

    }

    @Input() set verifydom(type: string){
        var directive = this;

        directive.display = false;
        switch (type){
            case 'admin':   if(type === directive.authService.authTokenPayload['role'])
                                directive.display = true;
                            directive.render();
                            break;
            case 'aci':     if(directive.networkService.aciMode)
                                directive.display = true;
                            directive.render();
                            directive.networkService.aciModeObservable.subscribe((res) => {
                                directive.display = res;
                                directive.render();
                            });
        }
    }

    render(){
        this.viewContainer.clear();
        if(this.display){
            this.viewContainer.createEmbeddedView(this.templateRef);
        }
    }

}

