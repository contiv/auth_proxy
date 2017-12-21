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
    start_tls: boolean;
    insecure_skip_verify: boolean;
    tls_cert_issued_to: string;
}

@Component({
    selector: 'ldapsettings',
    templateUrl: './ldapsetting.html'
})

export class LdapSettingsComponent{
    public ldapConfig: LdapConfig = {server: '', port: 0, base_dn: '', service_account_dn: '', service_account_password: '',start_tls: false, insecure_skip_verify: false, tls_cert_issued_to: ''};
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
        var ldapComponent = this;
        if(formValid){
            if(ldapComponent.ldapConfig.insecure_skip_verify)
                ldapComponent.ldapConfig.tls_cert_issued_to = '';
            if(!ldapComponent.ldapConfig.start_tls)
                ldapComponent.ldapConfig.insecure_skip_verify = false;
            this.crudHelperService.startLoader(this);
            this.update().subscribe((result) => {
                ldapComponent.ldapConfigExists = true;
                ldapComponent.crudHelperService.stopLoader(ldapComponent);
                ldapComponent.crudHelperService.showNotification("LDAP: Configuration Updated", ldapComponent.ldapConfig.server);
            }, (error) => {
                ldapComponent.crudHelperService.stopLoader(ldapComponent);
                ldapComponent.crudHelperService.showServerError("LDAP: Update Failed", error);
            });
        }
    }

    update(): Observable<any>{
        if(this.ldapConfigExists){
            return this.apiService.patch(ContivGlobals.LDAP_ENDPOINT, this.ldapConfig);
        }
        else{
            return this.apiService.put(ContivGlobals.LDAP_ENDPOINT, this.ldapConfig);
        }
    }
}