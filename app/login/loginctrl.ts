import {Component, Inject, OnInit, ViewEncapsulation} from "@angular/core";
import {StateService} from "angular-ui-router";
import {CRUDHelperService} from "../components/utils/crudhelperservice";
@Component({
    selector: 'login',
    templateUrl: 'login/login.html',
    styles: [require('./login.css')],
    encapsulation: ViewEncapsulation.None
})

export class LoginComponent implements OnInit{
    public showLoader: boolean;
    public showServerError: boolean;
    public serverErrorMessage: string;
    private crudHelperService: CRUDHelperService;
    public loginCtrl: any;
    public username: string;
    public password: string;
    constructor(@Inject('$state') private $state: StateService,
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
    }

    login(){
        this.$state.go('contiv.menu.dashboard', {username: this.username});
    }
}