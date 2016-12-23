/**
 * Created by cshampur on 12/18/16.
 */
import { Component } from "@angular/core";
import { ApiService } from "../../utils/apiservice";
import { ContivGlobals } from "../../models/contivglobals";
import { CRUDHelperService } from "../../utils/crudhelperservice";
import { Observable } from "rxjs";
import isEmpty = require("lodash/isEmpty");

export interface LdapConfig{
    server: string;
    port: number;
    base_dn: string;
    service_account_dn: string;
    service_account_password: string;
    StartTLS: boolean;
    InsecureSkipVerify: boolean;
}

@Component({
    selector: 'ldapsettings',
    templateUrl: './ldapsetting.html'
})

export class LdapSettingsComponent{
    public ldapConfig: LdapConfig = {server: '', port: 0, base_dn: '', service_account_dn: '', service_account_password: '',StartTLS: false, InsecureSkipVerify: false};
    public startLoader: boolean;
    private ldapConfigExists: boolean = true;
    constructor(private apiService: ApiService,
                private crudHelperService: CRUDHelperService){

    }

    ngOnInit(){
        this.getLdapConfig();
    }

    getLdapConfig(){
        var ldapComponent = this;
        this.crudHelperService.startLoader(this);
        this.apiService.get(ContivGlobals.LDAP_ENDPOINT)
            .map(res => res.json())
            .subscribe((result) => {
                if(!isEmpty(result))
                    ldapComponent.ldapConfig = result;
                else
                    ldapComponent.ldapConfigExists = false;
                ldapComponent.crudHelperService.stopLoader(ldapComponent);
            }, (error) => {
                ldapComponent.ldapConfigExists = false;
                ldapComponent.crudHelperService.stopLoader(ldapComponent);
            });
    }

    updateLdapConfig(formValid: boolean){
        var ldapComponeent = this;
        if(formValid){
            this.crudHelperService.startLoader(this);
            this.update().subscribe((result) => {
                ldapComponeent.crudHelperService.stopLoader(ldapComponeent);
                ldapComponeent.crudHelperService.showNotification("LDAP: Configuration Updated", ldapComponeent.ldapConfig.server);
            }, (error) => {
                ldapComponeent.crudHelperService.stopLoader(ldapComponeent);
                ldapComponeent.crudHelperService.showServerError("LDAP: Update Failed", error);
            });
        }
    }

    update(): Observable<any>{
        if(this.ldapConfigExists){
            return this.apiService.patch(ContivGlobals.LDAP_ENDPOINT, this.ldapConfig);
        }
        else{
            return this.apiService.post(ContivGlobals.LDAP_ENDPOINT, this.ldapConfig);
        }
    }
}