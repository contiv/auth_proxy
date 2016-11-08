import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Router, ActivatedRoute} from "@angular/router";
import {AuthService} from "../components/utils/authservice";
declare var jQuery:any;

@Component({
    selector: 'login',
    templateUrl: 'login/login.html',
    styles: [require('./login.css')]
})

export class LoginComponent implements OnInit{
    public showLoader: boolean;
    public showServerError: boolean;
    public serverErrorMessage: string;
    private crudHelperService: CRUDHelperService;
    public loginCtrl: any;
    public username: string;
    public password: string;
    constructor(private router: Router,
                private activatedRoute: ActivatedRoute,
                crudHelperService: CRUDHelperService,
                private authService: AuthService){
        this.showLoader = true;
        this.showServerError = false;
        this.serverErrorMessage = '';
        this.crudHelperService = crudHelperService;
        this.username = '';
        this.password = '';
        this.loginCtrl = this;
    }

    ngOnInit(){
        this.crudHelperService.stopLoader(this);
        this.crudHelperService.hideServerError(this);
        jQuery("body").addClass("background");
    }

    login(){
        this.crudHelperService.startLoader(this);
        this.authService.login({username: this.username, password: this.password})
            .subscribe((result) => {
                if(result){
                    this.crudHelperService.stopLoader(this);
                    if (this.authService.redirectUrl.length > 0) {
                        var redirectUrl = this.authService.redirectUrl;
                        this.authService.redirectUrl = '';
                        this.router.navigate([redirectUrl]);
                    }
                    else{
                        this.router.navigate(['/m/dashboard']);
                    }
                }
                else{
                    this.crudHelperService.stopLoader(this);
                    jQuery('#login-failed').modal('show');
                }
            }, (error) => {
                this.crudHelperService.stopLoader(this);
                jQuery('#login-failed').modal('show');
            });
    }
}