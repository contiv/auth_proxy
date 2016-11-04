import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
import {Router, ActivatedRoute} from "@angular/router";
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
                crudHelperService: CRUDHelperService){
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
        jQuery("body").addClass("login");
    }

    login(){
        this.router.navigate(['/m/dashboard', {username: this.username}]);
    }
}