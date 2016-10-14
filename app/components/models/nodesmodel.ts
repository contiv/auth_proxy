/**
 * Created by vjain3 on 3/22/16.
 */
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { BaseCollection } from "./basecollection";
import 'rxjs/add/operator/map';

@Injectable()
export class NodesModel extends BaseCollection {
    constructor(http: Http) {
        super(http, ContivGlobals.NODES_LIST_ENDPOINT);
    }

    extract(result) {
        //Convert to array if the returned collection is not an array
        return _.map(result.data, function (value, key) {
            value.key = key;
            return value;
        });
    }


    /**
     *
     * @param key
     * @param extraVars JSON object of extra ansible and environment variables to be passed while commissioning a node
     * {
             * "env":{"http_proxy":"http://proxy.esl.cisco.com:8080", "https_proxy":"http://proxy.esl.cisco.com:8080"},
             * "control_interface": "eth1", "service_vip": "192.168.2.252", "validate_certs": "false", "netplugin_if" : "eth2"
             * }
     * @returns {*}
     */
    commission(nodeOpsObj) {
        var nodescollection = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NODES_COMMISSION_ENDPOINT;
            let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options = new RequestOptions({ headers: headers }); // Create a request option
            nodescollection.http.post(url, nodeOpsObj, options).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    //Server doesn't return any json in response
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });
        return promise;
    }

    decommission(nodeOpsObj) {
        var nodescollection = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NODES_DECOMMISSION_ENDPOINT;
            let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options = new RequestOptions({ headers: headers }); // Create a request option
            nodescollection.http.post(url, nodeOpsObj, options).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });
        return promise;
    }

    upgrade(nodeOpsObj) {
        var nodescollection = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NODES_MAINTENANCE_ENDPOINT;
            let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options = new RequestOptions({ headers: headers }); // Create a request option
            nodescollection.http.post(url, nodeOpsObj, options).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });
        return promise;
    }

    /**
     *
     * @param ip
     * @param extraVars JSON object of extra ansible and environment variables to be passed while discovering a node
     * {
             * "env":{"http_proxy":"http://proxy.esl.cisco.com:8080", "https_proxy":"http://proxy.esl.cisco.com:8080"},
             * "control_interface": "eth1", "service_vip": "192.168.2.252", "cluster-name": "contiv", "node-label" : "node1"
             * }
     * @returns {*}
     */
    discover(nodeOpsObj) {
        var nodescollection = this;
        let promise = new Promise(function (resolve, reject) {
            let url = ContivGlobals.NODES_DISCOVER_ENDPOINT;
            let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
            let options = new RequestOptions({ headers: headers }); // Create a request option
            nodescollection.http.post(url, nodeOpsObj, options).map((res: Response) => res.json()).toPromise()
                .then(function successCallback(response) {
                    resolve(response);
                }, function errorCallback(response) {
                    reject(response);
                });
        });
        return promise;
    }
}