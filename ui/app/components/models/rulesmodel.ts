/**
 * Created by vjain3 on 3/8/16.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Collection } from "./collection";
import * as _ from 'lodash';
import { ContivGlobals } from "./contivglobals";
import {ApiService} from "../utils/apiservice";

@Injectable()
export class RulesModel extends Collection {
    constructor(http: Http, apiService: ApiService) {
        super(http, ContivGlobals.RULES_ENDPOINT, apiService);
    }

    /**
     * Get incoming rules for a given policy and a tenant
     * @param policyName
     * @param tenantName
     * @returns {*|webdriver.promise.Promise}
     */
    getIncomingRules(policyName, tenantName) {
        var rulesmodel = this;
        return rulesmodel.get(false).then(function (result) {
            return _.filter(result, {
                'policyName': policyName,
                'direction': 'in',
                'tenantName': tenantName
            });

        });
    }

    /**
     * Get outgoing rules for a given policy and a tenant
     * @param policyName
     * @param tenantName
     * @returns {*|webdriver.promise.Promise}
     */
    getOutgoingRules(policyName, tenantName) {
        var rulesmodel = this;
        return rulesmodel.get(false).then(function (result) {
            return _.filter(result, {
                'policyName': policyName,
                'direction': 'out',
                'tenantName': tenantName
            });

        });
    }

    /**
     * Generate rule key to save rule on server
     * @param rule
     * @returns {string}
     */
    generateKey(rule) {
        return rule.tenantName + ':' + rule.policyName + ':' + rule.ruleId;
    }
}