webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by vjain3 on 10/6/16.
	 */
	var platform_browser_dynamic_1 = __webpack_require__(114);
	var app_module_1 = __webpack_require__(263);
	platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
	

/***/ },

/***/ 9:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 4/29/16.
	 */
	var core_1 = __webpack_require__(2);
	var CRUDHelperService = (function () {
	    function CRUDHelperService() {
	    }
	    CRUDHelperService.prototype.startLoader = function (controller) {
	        controller.showLoader = true;
	    };
	    CRUDHelperService.prototype.stopLoader = function (controller) {
	        controller.showLoader = false;
	    };
	    CRUDHelperService.prototype.showServerError = function (controller, message) {
	        controller.showServerError = true;
	        controller.serverErrorMessage = message;
	    };
	    CRUDHelperService.prototype.hideServerError = function (controller) {
	        controller.showServerError = false;
	    };
	    CRUDHelperService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], CRUDHelperService);
	    return CRUDHelperService;
	}());
	exports.CRUDHelperService = CRUDHelperService;
	

/***/ },

/***/ 15:
/***/ function(module, exports) {

	"use strict";
	/**
	 * Created by vjain3 on 11/2/16.
	 */
	exports.ContivGlobals = {
	    //REST endpoints for NETMASTER
	    'NETWORKS_ENDPOINT': '/netmaster/api/v1/networks/',
	    'NETWORKS_INSPECT_ENDPOINT': '/netmaster/api/v1/inspect/networks/',
	    'SERVICELBS_INSPECT_ENDPOINT': '/netmaster/api/v1/inspect/serviceLBs/',
	    'POLICIES_ENDPOINT': '/netmaster/api/v1/policys/',
	    'RULES_ENDPOINT': '/netmaster/api/v1/rules/',
	    'APPLICATIONGROUPS_ENDPOINT': '/netmaster/api/v1/endpointGroups/',
	    'APPLICATIONGROUPS_INSPECT_ENDPOINT': 'netmaster/api/v1/inspect/endpointGroups/',
	    'SERVICELBS_ENDPOINT': '/netmaster/api/v1/serviceLBs/',
	    'ORGANIZATIONS_ENDPOINT': '/netmaster/api/v1/tenants/',
	    'NETWORK_SETTINGS_ENDPOINT': '/netmaster/api/v1/globals/',
	    'NETPROFILES_ENDPOINT': '/netmaster/api/v1/netprofiles/',
	    'BGPS_ENDPOINT': '/netmaster/api/v1/Bgps/',
	    'BGPS_INSPECT_ENDPOINT': '/netmaster/api/v1/inspect/Bgps/',
	    'APP_PROFILES_ENDPOINT': '/netmaster/api/v1/appProfiles/',
	    'VISUALIZATION_ENDPOINT': '/visualization/',
	    //REST endpoints for VOLMASTER
	    'VOLUMES_ENDPOINT': '/volmaster/volumes/',
	    'VOLUMES_CREATE_ENDPOINT': '/volmaster/volumes/create/',
	    'VOLUMES_DELETE_ENDPOINT': '/volmaster/volumes/remove/',
	    'VOLUMES_COPYSNAPSHOTS_ENDPOINT': '/volmaster/volumes/copy',
	    'VOLUMES_USES_ENDPOINT': '/volmaster/uses/mounts/',
	    'VOLUMES_SNAPSHOTS_ENDPOINT': '/volmaster/snapshots/',
	    'STORAGEPOLICIES_ENDPOINT': '/volmaster/policies/',
	    'VOLUMES_GLOBAL_ENDPOINT': '/volmaster/global/',
	    //REST endpoints for CLUSTER
	    'NODES_LIST_ENDPOINT': '/info/nodes',
	    'NODES_DISCOVER_ENDPOINT': '/discover/nodes',
	    'NODES_COMMISSION_ENDPOINT': '/commission/nodes',
	    'NODES_DECOMMISSION_ENDPOINT': '/decommission/nodes',
	    'NODES_MAINTENANCE_ENDPOINT': '/maintenance/nodes',
	    'NODES_LAST_JOB_ENDPOINT': '/info/job/last',
	    'NODES_ACTIVE_JOB_ENDPOINT': '/info/job/active',
	    'NODES_SETTINGS_SET_ENDPOINT': '/globals',
	    'NODES_SETTINGS_GET_ENDPOINT': '/info/globals',
	    //REST endpoints for USER
	    'USERS_ENDPOINT': '/components/models/users.json',
	    //Refresh interval in milliseconds
	    'REFRESH_INTERVAL': 5000,
	    //RegEx for validation
	    'CIDR_REGEX': '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$',
	    'VLAN_REGEX': '^([0-9]{1,4}?-[0-9]{1,4}?)$',
	    'VXLAN_REGEX': '^([0-9]{1,8}?-[0-9]{1,8}?)$',
	    // System strings
	    'PRODUCT_NAME': 'Cisco Container Networking',
	    'PRODUCT_VERSION': 'TP1.0'
	};
	

/***/ },

/***/ 31:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/8/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var authservice_1 = __webpack_require__(68);
	var ApiService = (function () {
	    function ApiService(http, authService) {
	        this.http = http;
	        this.authService = authService;
	    }
	    ApiService.prototype.get = function (url) {
	        var options = this.prepareHeader('get');
	        return this.http.get(url, options);
	    };
	    ApiService.prototype.put = function (url, body) {
	        var options = this.prepareHeader('put');
	        return this.http.put(url, body, options);
	    };
	    ApiService.prototype.post = function (url, body) {
	        var options = this.prepareHeader('post');
	        return this.http.post(url, body, options);
	    };
	    ApiService.prototype.delete = function (url) {
	        var options = this.prepareHeader('delete');
	        return this.http.delete(url, options);
	    };
	    ApiService.prototype.prepareHeader = function (method) {
	        this.headers = new http_1.Headers();
	        if (method != 'get' && method != 'delete')
	            this.headers.append('Content-Type', 'application/json');
	        if (this.authService.authToken.length > 0)
	            this.headers.append('Authorization', "Bearer " + this.authService.authToken);
	        var options = new http_1.RequestOptions({ headers: this.headers });
	        return options;
	    };
	    ApiService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _b) || Object])
	    ], ApiService);
	    return ApiService;
	    var _a, _b;
	}());
	exports.ApiService = ApiService;
	

/***/ },

/***/ 38:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/17/16.
	 */
	var core_1 = __webpack_require__(2);
	var common_1 = __webpack_require__(18);
	var errormessagedirective_1 = __webpack_require__(275);
	var tabledirective_1 = __webpack_require__(279);
	var forms_1 = __webpack_require__(24);
	var accordiondirective_1 = __webpack_require__(272);
	var collapsibledirective_1 = __webpack_require__(274);
	var namevaluedirective_1 = __webpack_require__(276);
	var authdirective_1 = __webpack_require__(273);
	var networksettingcomponent_1 = __webpack_require__(278);
	var acisettingcomponent_1 = __webpack_require__(277);
	var DirectivesModule = (function () {
	    function DirectivesModule() {
	    }
	    DirectivesModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                common_1.CommonModule, forms_1.FormsModule
	            ],
	            declarations: [
	                errormessagedirective_1.ErrorMessageComponent,
	                tabledirective_1.CtvTableComponent,
	                tabledirective_1.CtvThComponent,
	                tabledirective_1.CtvSearchComponent,
	                tabledirective_1.CtvTpaginationComponent,
	                accordiondirective_1.CtvAccordionComponent,
	                collapsibledirective_1.CtvCollapsibleComponent,
	                namevaluedirective_1.CtvNamevalueComponent,
	                authdirective_1.AuthDirective,
	                networksettingcomponent_1.NetworkSettingComponent,
	                acisettingcomponent_1.AciSettingComponent
	            ],
	            exports: [
	                errormessagedirective_1.ErrorMessageComponent,
	                tabledirective_1.CtvTableComponent,
	                tabledirective_1.CtvThComponent,
	                tabledirective_1.CtvSearchComponent,
	                tabledirective_1.CtvTpaginationComponent,
	                accordiondirective_1.CtvAccordionComponent,
	                collapsibledirective_1.CtvCollapsibleComponent,
	                namevaluedirective_1.CtvNamevalueComponent,
	                authdirective_1.AuthDirective,
	                networksettingcomponent_1.NetworkSettingComponent,
	                acisettingcomponent_1.AciSettingComponent
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DirectivesModule);
	    return DirectivesModule;
	}());
	exports.DirectivesModule = DirectivesModule;
	

/***/ },

/***/ 39:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var basecollection_1 = __webpack_require__(280);
	var _ = __webpack_require__(26);
	var Collection = (function (_super) {
	    __extends(Collection, _super);
	    /**
	     * Extends BaseCollection class to do create, update and delete using POST, PUT and DELETE verbs.
	     * @param $http
	     * @param $q
	     * @param url Used for doing HTTP GET and fetch objects from server
	     * @constructor
	     */
	    function Collection(http, url, apiService) {
	        _super.call(this, http, url, apiService);
	        this.inspectStats = {};
	    }
	    /**
	     *
	     * @param model
	     * @param url Optional if not passed it is constructed using key and url passed in constructor
	     * @returns {*}
	     */
	    Collection.prototype.create = function (model, url) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            if (url === undefined)
	                url = collection.url + model.key + '/';
	            collection.apiService.post(url, model).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                var responseData = response;
	                //For rest endpoints that do not return created json object in response
	                if ((responseData === undefined) || (responseData === '')) {
	                    responseData = model;
	                }
	                _.remove(collection.models, function (n) {
	                    return n['key'] == model['key'];
	                });
	                collection.models.push(responseData);
	                resolve(responseData);
	            }, function errorCallback(response) {
	                reject(response);
	            });
	        });
	        return promise;
	    };
	    ;
	    /**
	     * This is for netmaster specific endpoints and used by netmaster objects only.
	     * TODO: Generalize
	     * @param model
	     * @param url Optional
	     * @returns {*}
	     */
	    Collection.prototype.save = function (model) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            var url = collection.url + model.key + '/';
	            collection.apiService.put(url, model).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                _.remove(collection.models, function (n) {
	                    return n['key'] == model['key'];
	                });
	                collection.models.push(response);
	                resolve(response);
	            }, function errorCallback(response) {
	                reject(response);
	            });
	        });
	        return promise;
	    };
	    ;
	    /**
	     * This is for netmaster specific endpoints and used by netmaster objects only.
	     * TODO: Generalize
	     * @param model
	     * @returns {*}
	     */
	    Collection.prototype.delete = function (model) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            var url = collection.url + model.key + '/';
	            collection.apiService.delete(url).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                _.remove(collection.models, function (n) {
	                    return n['key'] == model['key'];
	                });
	                resolve(response);
	            }, function errorCallback(response) {
	                reject(response);
	            });
	        });
	        return promise;
	    };
	    ;
	    /**
	     *
	     * @param key
	     * @param keyname
	     * @param url Optional if not passed it is constructed using key and url passed in constructor
	     * @returns {*}
	     */
	    Collection.prototype.deleteUsingKey = function (key, keyname, url) {
	        var collection = this;
	        if (keyname === undefined)
	            keyname = 'key';
	        var promise = new Promise(function (resolve, reject) {
	            if (url === undefined)
	                url = collection.url + key + '/';
	            collection.apiService.delete(url).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                _.remove(collection.models, function (n) {
	                    return n[keyname] == key;
	                });
	                resolve(response);
	            }, function errorCallback(response) {
	                reject(response);
	            });
	        });
	        return promise;
	    };
	    ;
	    Collection.prototype.getInspectByKey = function (key, url, refresh) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            if (key in collection.inspectStats && refresh == false) {
	                resolve(collection.inspectStats[key]);
	            }
	            else {
	                collection.apiService.get(url + key + '/').map(function (res) { return res.json(); }).toPromise()
	                    .then(function successCallback(response) {
	                    var responseStats = response;
	                    collection.inspectStats[key] = responseStats;
	                    resolve(responseStats);
	                }, function errorCallback(error) {
	                    reject(error);
	                });
	            }
	        });
	        return promise;
	    };
	    ;
	    return Collection;
	}(basecollection_1.BaseCollection));
	exports.Collection = Collection;
	

/***/ },

/***/ 44:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var ApplicationGroupsModel = (function (_super) {
	    __extends(ApplicationGroupsModel, _super);
	    function ApplicationGroupsModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.APPLICATIONGROUPS_ENDPOINT, apiService);
	    }
	    /**
	     * Generate key for application group
	     * @param group
	     */
	    ApplicationGroupsModel.prototype.generateKey = function (group) {
	        return group.tenantName + ':' + group.groupName;
	    };
	    ApplicationGroupsModel.prototype.get = function (reload) {
	        return _super.prototype.get.call(this, reload)
	            .then(function (result) {
	            //add logic for result processing
	            var items = [];
	            for (var _i = 0, result_1 = result; _i < result_1.length; _i++) {
	                var item = result_1[_i];
	                if (typeof item.policies === 'undefined')
	                    item['policies'] = [];
	                if (typeof item.networkName === 'undefined')
	                    item['networkName'] = '';
	                items.push(item);
	            }
	            return items;
	        });
	    };
	    ApplicationGroupsModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], ApplicationGroupsModel);
	    return ApplicationGroupsModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.ApplicationGroupsModel = ApplicationGroupsModel;
	

/***/ },

/***/ 45:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var util_1 = __webpack_require__(51);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var NetworksModel = (function (_super) {
	    __extends(NetworksModel, _super);
	    function NetworksModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.NETWORKS_ENDPOINT, apiService);
	    }
	    NetworksModel.prototype.getInspectByKey = function (key, url, reload) {
	        return _super.prototype.getInspectByKey.call(this, key, url, reload)
	            .then(function (result) {
	            if (!util_1.isUndefined(result['Oper'].endpoints)) {
	                var processedEndpoints = [];
	                var endpoints = result['Oper'].endpoints;
	                for (var i = 0; i < endpoints.length; i++) {
	                    if (util_1.isUndefined(endpoints[i].containerID)) {
	                        endpoints[i]['containerID'] = endpoints[i]['endpointID'];
	                        endpoints[i]['containerName'] = endpoints[i]['endpointID'].toString().substr(0, 6);
	                    }
	                }
	                result['Oper'].endpoints = endpoints;
	            }
	            return result;
	        });
	    };
	    NetworksModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], NetworksModel);
	    return NetworksModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.NetworksModel = NetworksModel;
	

/***/ },

/***/ 51:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var numLinesEst = 0;
	  var length = output.reduce(function(prev, cur) {
	    numLinesEst++;
	    if (cur.indexOf('\n') >= 0) numLinesEst++;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = __webpack_require__(735);

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = __webpack_require__(734);

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(225)))

/***/ },

/***/ 66:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var OrganizationsModel = (function (_super) {
	    __extends(OrganizationsModel, _super);
	    function OrganizationsModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.ORGANIZATIONS_ENDPOINT, apiService);
	    }
	    OrganizationsModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], OrganizationsModel);
	    return OrganizationsModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.OrganizationsModel = OrganizationsModel;
	

/***/ },

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var PoliciesModel = (function (_super) {
	    __extends(PoliciesModel, _super);
	    function PoliciesModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.POLICIES_ENDPOINT, apiService);
	    }
	    /**
	     * Generate policy key to save policy on server
	     * @param policy
	     * @returns {string}
	     */
	    PoliciesModel.prototype.generateKey = function (policy) {
	        return policy.tenantName + ':' + policy.policyName;
	    };
	    PoliciesModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], PoliciesModel);
	    return PoliciesModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.PoliciesModel = PoliciesModel;
	

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/4/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var Observable_1 = __webpack_require__(1);
	__webpack_require__(226);
	__webpack_require__(227);
	__webpack_require__(140);
	var http_1 = __webpack_require__(19);
	var authMatrix_1 = __webpack_require__(159);
	var util_1 = __webpack_require__(51);
	var AuthService = (function () {
	    function AuthService(http) {
	        this.http = http;
	        this.isLoggedIn = false;
	        this.isLoggedIn = false;
	        this.redirectUrl = '';
	        this.accessMatrix = authMatrix_1.AuthMatrix;
	        this.authTokenPayload = {};
	        this.authToken = '';
	        this.firstRun = false;
	    }
	    AuthService.prototype.checkAccess = function (url) {
	        var searchUrl = url.replace('/m/', '');
	        if (searchUrl.indexOf('details') > -1 || searchUrl.indexOf('edit') > -1)
	            searchUrl = searchUrl.replace(/\/[^\/]*$/, '');
	        if (searchUrl.indexOf('policyTab') > -1)
	            searchUrl = searchUrl.replace(/;[^\/]*$/, '');
	        var role = this.authTokenPayload['role'];
	        if (this.accessMatrix[searchUrl][role] == 'y')
	            return true;
	        else
	            return false;
	    };
	    AuthService.prototype.login = function (user) {
	        var _this = this;
	        var data = this.encodeUrlData(user);
	        this.headers = new http_1.Headers();
	        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
	        var options = new http_1.RequestOptions({ headers: this.headers });
	        // This is just a mock
	        return new Observable_1.Observable(function (observer) {
	            if (user.username != "devops" && user.username != "admin")
	                observer.next(false);
	            else {
	                var res = '';
	                if (user.username == "devops" && user.password == "devops")
	                    var res = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBTExfQ0xVU1RFUlNfQVVUSCI6dHJ1ZSwiZXhwIjoxNDk4NjQ3NjIxLCJyb2xlIjoiRGV2T3BzIn0=.WXE_VtvyE_pg8paoVDwVIavZNHB-LmBLGJgY4REgvYk";
	                if (user.username == "admin" && user.password == "admin")
	                    var res = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJBTExfQ0xVU1RFUlNfQVVUSCI6dHJ1ZSwiZXhwIjoxNDk4NjQ3NjIxLCJyb2xlIjoiU3lzQWRtaW4ifQ==.WXE_VtvyE_pg8paoVDwVIavZNHB-LmBLGJgY4REgvYk";
	                if (res == '') {
	                    observer.next(false);
	                }
	                else {
	                    _this.isLoggedIn = true;
	                    localStorage.setItem("authToken", res);
	                    localStorage.setItem("loginTime", new Date().toLocaleString());
	                    localStorage.setItem("lastAccessTime", new Date().toLocaleString());
	                    _this.extractBody();
	                    observer.next(true);
	                }
	            }
	        });
	        // This Code will be active after CCN Proxy is live...
	        /*
	        return this.http.post("/1/system/login", data, options)
	            .map((res) => {
	                var s = this.extractToken(res);
	                if (s){
	                    this.isLoggedIn = true;
	                    return true;
	                }
	                else{
	                    this.isLoggedIn = false;
	                    return false;
	                }
	            })
	            .catch((error:any) => Observable.throw(error));
	            */
	    };
	    AuthService.prototype.logout = function () {
	        this.cleanuplocalstorage();
	    };
	    AuthService.prototype.cleanuplocalstorage = function () {
	        localStorage.removeItem("authToken");
	        localStorage.removeItem("loginTime");
	        localStorage.removeItem("lastAccessTime");
	        this.isLoggedIn = false;
	    };
	    AuthService.prototype.encodeUrlData = function (body) {
	        var str = Object.keys(body).map(function (key) {
	            return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
	        }).join('&');
	        return str;
	    };
	    AuthService.prototype.extractToken = function (res) {
	        var xAuthToken = res.headers.get("x-auth-token");
	        if (xAuthToken.length > 0) {
	            localStorage.setItem("authToken", xAuthToken);
	            localStorage.setItem("loginTime", new Date().toLocaleString());
	            localStorage.setItem("lastAccessTime", new Date().toLocaleString());
	            this.extractBody();
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	    AuthService.prototype.extractBody = function () {
	        var token = localStorage.getItem("authToken");
	        this.authToken = token;
	        var bodyEncoded = token.split('.')[1];
	        var bodyString = atob(bodyEncoded);
	        this.authTokenPayload = JSON.parse(bodyString);
	        if (util_1.isNull(localStorage.getItem('firstRun')))
	            this.firstRun = true;
	        else
	            this.firstRun = false;
	    };
	    AuthService.prototype.validateExpiry = function () {
	        var lastAcessTime;
	        var currentDate = new Date();
	        lastAcessTime = localStorage.getItem("lastAccessTime");
	        if (util_1.isNull(lastAcessTime)) {
	            return false;
	        }
	        lastAcessTime = new Date(lastAcessTime);
	        var durationEloped = (currentDate.getTime() - lastAcessTime.getTime()) / 60000;
	        if ((durationEloped > 0) && (durationEloped < 10)) {
	            if (currentDate.getTime() > (this.authTokenPayload['exp'] * 1000))
	                return false;
	            localStorage.setItem("lastAccessTime", currentDate.toLocaleString());
	            return true;
	        }
	        return false;
	    };
	    AuthService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
	    ], AuthService);
	    return AuthService;
	    var _a;
	}());
	exports.AuthService = AuthService;
	

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/9/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	(function (PolicyTab) {
	    PolicyTab[PolicyTab["isolation"] = 0] = "isolation";
	    PolicyTab[PolicyTab["bandwidth"] = 1] = "bandwidth";
	})(exports.PolicyTab || (exports.PolicyTab = {}));
	var PolicyTab = exports.PolicyTab;
	var NetworkPoliciesTabsComponent = (function () {
	    function NetworkPoliciesTabsComponent(activatedRoute, router) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.isolationPolicySelected = true;
	        this.bandwidthPolicySelected = false;
	        this.policyTab = PolicyTab;
	        this.selectPolicyTab(+activatedRoute.snapshot.params['policyTab']);
	    }
	    NetworkPoliciesTabsComponent.prototype.createNetworkPolicy = function () {
	        if (this.isolationPolicySelected) {
	            this.router.navigate(['../isolation/create'], { relativeTo: this.activatedRoute });
	        }
	        if (this.bandwidthPolicySelected) {
	            this.router.navigate(['../bandwidth/create'], { relativeTo: this.activatedRoute });
	        }
	    };
	    NetworkPoliciesTabsComponent.prototype.selectPolicyTab = function (tab) {
	        switch (tab) {
	            case PolicyTab.isolation:
	                this.isolationPolicySelected = true;
	                this.bandwidthPolicySelected = false;
	                break;
	            case PolicyTab.bandwidth:
	                this.isolationPolicySelected = false;
	                this.bandwidthPolicySelected = true;
	                break;
	            default:
	                this.isolationPolicySelected = true;
	                this.bandwidthPolicySelected = false;
	                break;
	        }
	    };
	    NetworkPoliciesTabsComponent = __decorate([
	        core_1.Component({
	            selector: 'networkpoliciestabs',
	            templateUrl: 'network_policies/networkpoliciestabs.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	    ], NetworkPoliciesTabsComponent);
	    return NetworkPoliciesTabsComponent;
	    var _a, _b;
	}());
	exports.NetworkPoliciesTabsComponent = NetworkPoliciesTabsComponent;
	

/***/ },

/***/ 73:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by hardik gandhi on 6/15/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var NetprofilesModel = (function (_super) {
	    __extends(NetprofilesModel, _super);
	    function NetprofilesModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.NETPROFILES_ENDPOINT, apiService);
	    }
	    /**
	     * Generate policy key to save policy on server
	     * @param policy
	     * @returns {string}
	     */
	    NetprofilesModel.prototype.generateKey = function (policy) {
	        return policy.tenantName + ':' + policy.profileName;
	    };
	    NetprofilesModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], NetprofilesModel);
	    return NetprofilesModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.NetprofilesModel = NetprofilesModel;
	

/***/ },

/***/ 74:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 5/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var ServicelbsModel = (function (_super) {
	    __extends(ServicelbsModel, _super);
	    function ServicelbsModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.SERVICELBS_ENDPOINT, apiService);
	    }
	    ServicelbsModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], ServicelbsModel);
	    return ServicelbsModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.ServicelbsModel = ServicelbsModel;
	

/***/ },

/***/ 75:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/29/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var networkservice_1 = __webpack_require__(116);
	var nodesservice_1 = __webpack_require__(117);
	var FirstRunWizardService = (function () {
	    function FirstRunWizardService(networkService, nodesService) {
	        this.networkService = networkService;
	        this.nodesService = nodesService;
	        this.setting = { networkInfraType: '', vlans: '', vxlans: '', fwdMode: '' };
	        this.extra_vars = { control_interface: '', netplugin_if: '', service_vip: '', scheduler_provider: '', ucp_bootstrap_node_name: '', cluster_name: '',
	            contiv_network_mode: '', fwd_mode: '', apic_url: '', apic_username: '', apic_password: '', apic_leaf_nodes: '', apic_phys_domain: '',
	            apic_epg_bridge_domain: '', apic_contracts_unrestricted_mode: '' };
	    }
	    FirstRunWizardService.prototype.getNetworkSettings = function () {
	        var _this = this;
	        this.networkService.getSettings()
	            .then(function (result) {
	            _this.setting = result;
	        });
	    };
	    FirstRunWizardService.prototype.getAciSettings = function () {
	        /*
	        this.nodesService.getSettings(this)
	            .then((result) => {
	            })
	         */
	    };
	    FirstRunWizardService.prototype.updateSettings = function () {
	        this.networkService.updateSettings(this.setting)
	            .then(function (result) {
	        });
	        return this.nodesService.updateSettings(this.extra_vars);
	    };
	    FirstRunWizardService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof networkservice_1.NetworkService !== 'undefined' && networkservice_1.NetworkService) === 'function' && _a) || Object, (typeof (_b = typeof nodesservice_1.NodesService !== 'undefined' && nodesservice_1.NodesService) === 'function' && _b) || Object])
	    ], FirstRunWizardService);
	    return FirstRunWizardService;
	    var _a, _b;
	}());
	exports.FirstRunWizardService = FirstRunWizardService;
	

/***/ },

/***/ 90:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var AppProfilesModel = (function (_super) {
	    __extends(AppProfilesModel, _super);
	    function AppProfilesModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.APP_PROFILES_ENDPOINT, apiService);
	    }
	    /**
	     * Generate key for application profile
	     * @param profile
	     */
	    AppProfilesModel.prototype.generateKey = function (profile) {
	        return profile.tenantName + ':' + profile.appProfileName;
	    };
	    AppProfilesModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], AppProfilesModel);
	    return AppProfilesModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.AppProfilesModel = AppProfilesModel;
	

/***/ },

/***/ 91:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/21/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var BgpsModel = (function (_super) {
	    __extends(BgpsModel, _super);
	    function BgpsModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.BGPS_ENDPOINT, apiService);
	    }
	    BgpsModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], BgpsModel);
	    return BgpsModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.BgpsModel = BgpsModel;
	

/***/ },

/***/ 92:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/7/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var _ = __webpack_require__(26);
	var UsersModel = (function (_super) {
	    __extends(UsersModel, _super);
	    function UsersModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.USERS_ENDPOINT, apiService);
	    }
	    /**
	     * Generate key for application group
	     * @param group
	     */
	    UsersModel.prototype.generateKey = function (user) {
	        return user.tenantName + ':' + user.username;
	    };
	    UsersModel.prototype.create = function (model, url) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            collection.models.push(model);
	            resolve(model);
	        });
	        return promise;
	    };
	    UsersModel.prototype.getModelByKey = function (key, reload, keyname) {
	        return _super.prototype.getModelByKey.call(this, key, false, keyname);
	    };
	    UsersModel.prototype.save = function (model) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            _.remove(collection.models, function (n) {
	                return n['key'] == model['key'];
	            });
	            collection.models.push(model);
	            resolve(model);
	        });
	        return promise;
	    };
	    UsersModel.prototype.delete = function (model) {
	        var collection = this;
	        var promise = new Promise(function (resolve, reject) {
	            _.remove(collection.models, function (n) {
	                return n['key'] == model['key'];
	            });
	            resolve(model);
	        });
	        return promise;
	    };
	    ;
	    UsersModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], UsersModel);
	    return UsersModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.UsersModel = UsersModel;
	

/***/ },

/***/ 93:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 7/17/16.
	 */
	var core_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(51);
	var InspectService = (function () {
	    function InspectService() {
	    }
	    /* This function would build the containerDetails object.
	     eg :
	     containerDetails={
	     ContainerId1 : [{name: "homingHost", value: "cluster-node1", type: "string", format: "none"},
	     {name: macAddress, value: "02:02", type:"string", format:"none"}
	     ],
	     ContainerId2 : [{name: "homingHost", value: "cluster-node1" type: "string", format: "none"},
	     {name: macAddress, value: "02:04", type: "string", format: "none"}
	     ]
	     }
	     --Used in displaying the container detail inside an accordion.
	     */
	    InspectService.prototype.buildEndPoints = function (endpoints) {
	        var containerDetails = {};
	        for (var i in endpoints) {
	            var containerAttributes = [];
	            for (var key in endpoints[i]) {
	                var endpointAttribute = {};
	                endpointAttribute['name'] = key;
	                endpointAttribute['format'] = 'none';
	                endpointAttribute['type'] = 'string';
	                switch (key) {
	                    case "ipAddress":
	                        endpointAttribute['value'] = endpoints[i][key].filter(function (ipAddress) { return ipAddress.length > 0; }).join();
	                        break;
	                    case "labels":
	                        endpointAttribute['value'] = endpoints[i][key].replace(/(map\[|\])/gi, '').replace(/(:)/gi, '=').split(' ')
	                            .filter(function (v) { return v.length > 0; });
	                        endpointAttribute['format'] = 'label';
	                        endpointAttribute['type'] = 'array';
	                        break;
	                    default: endpointAttribute['value'] = endpoints[i][key];
	                }
	                containerAttributes.push(endpointAttribute);
	            }
	            containerDetails[endpoints[i].containerID] = containerAttributes;
	        }
	        return containerDetails;
	    };
	    /*  This function checks whether any new containers were added or not
	     View is updated only when there is a change in container configuration
	     */
	    InspectService.prototype.checkContainerChanged = function (contDetailsA, contDetailsB) {
	        if (util_1.isUndefined(contDetailsA))
	            return true;
	        else {
	            if (Object.keys(contDetailsA).length != Object.keys(contDetailsB).length)
	                return true;
	            for (var key in contDetailsB) {
	                if (!(key in contDetailsA))
	                    return true;
	            }
	            return false;
	        }
	    };
	    InspectService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], InspectService);
	    return InspectService;
	}());
	exports.InspectService = InspectService;
	

/***/ },

/***/ 115:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/8/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	var collection_1 = __webpack_require__(39);
	var _ = __webpack_require__(26);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var RulesModel = (function (_super) {
	    __extends(RulesModel, _super);
	    function RulesModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.RULES_ENDPOINT, apiService);
	    }
	    /**
	     * Get incoming rules for a given policy and a tenant
	     * @param policyName
	     * @param tenantName
	     * @returns {*|webdriver.promise.Promise}
	     */
	    RulesModel.prototype.getIncomingRules = function (policyName, tenantName) {
	        var rulesmodel = this;
	        return rulesmodel.get(false).then(function (result) {
	            return _.filter(result, {
	                'policyName': policyName,
	                'direction': 'in',
	                'tenantName': tenantName
	            });
	        });
	    };
	    /**
	     * Get outgoing rules for a given policy and a tenant
	     * @param policyName
	     * @param tenantName
	     * @returns {*|webdriver.promise.Promise}
	     */
	    RulesModel.prototype.getOutgoingRules = function (policyName, tenantName) {
	        var rulesmodel = this;
	        return rulesmodel.get(false).then(function (result) {
	            return _.filter(result, {
	                'policyName': policyName,
	                'direction': 'out',
	                'tenantName': tenantName
	            });
	        });
	    };
	    /**
	     * Generate rule key to save rule on server
	     * @param rule
	     * @returns {string}
	     */
	    RulesModel.prototype.generateKey = function (rule) {
	        return rule.tenantName + ':' + rule.policyName + ':' + rule.ruleId;
	    };
	    RulesModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], RulesModel);
	    return RulesModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.RulesModel = RulesModel;
	

/***/ },

/***/ 116:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	__webpack_require__(106);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var NetworkService = (function () {
	    function NetworkService(http, apiService) {
	        this.http = http;
	        this.apiService = apiService;
	    }
	    NetworkService.prototype.getSettings = function () {
	        var networkservice = this;
	        var promise = new Promise(function (resolve, reject) {
	            var url = contivglobals_1.ContivGlobals.NETWORK_SETTINGS_ENDPOINT;
	            networkservice.apiService.get(url).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(result) {
	                resolve(result[0]);
	            }, function errorCallback(result) {
	                reject(result);
	            });
	        });
	        return promise;
	    };
	    NetworkService.prototype.updateSettings = function (setting) {
	        return this.apiService.post(contivglobals_1.ContivGlobals.NETWORK_SETTINGS_ENDPOINT
	            + 'global/', setting).map(function (res) { return res.json(); }).toPromise();
	    };
	    NetworkService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], NetworkService);
	    return NetworkService;
	    var _a, _b;
	}());
	exports.NetworkService = NetworkService;
	

/***/ },

/***/ 117:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(19);
	__webpack_require__(106);
	var contivglobals_1 = __webpack_require__(15);
	var apiservice_1 = __webpack_require__(31);
	var NodesService = (function () {
	    function NodesService(http, apiService) {
	        this.http = http;
	        this.apiService = apiService;
	    }
	    Object.defineProperty(NodesService, "node_constants", {
	        get: function () {
	            return {
	                APIC_CONTR_UNRESTRICT_MODE: 'apic_contracts_unrestricted_mode',
	                APIC_EPG_BRIDGE_DOMAIN: 'apic_epg_bridge_domain',
	                APIC_LEAF_NODES: 'apic_leaf_nodes',
	                APIC_PASSWORD: 'apic_password',
	                APIC_PHYS_DOMAIN: 'apic_phys_domain',
	                APIC_URL: 'apic_url',
	                APIC_USERNAME: 'apic_username',
	                CONTIV_NET_MODE: 'contiv_network_mode',
	                CONTROL_INTERFACE: 'control_interface',
	                ENV: 'env',
	                FWD_MODE: 'fwd_mode',
	                DATA_INTERFACE: 'netplugin_if',
	                SCHED_PROVIDER: 'scheduler_provider',
	                VIP_ADDR: 'service_vip',
	                UCP_BOOTSTRAP_NODE: 'ucp_bootstrap_node_name',
	                CLUSTER_NAME: 'cluster_name'
	            };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    NodesService.prototype.getSettings = function (ctrl) {
	        var nodeservice = this;
	        var promise = new Promise(function (resolve, reject) {
	            var url = contivglobals_1.ContivGlobals.NODES_SETTINGS_GET_ENDPOINT;
	            nodeservice.apiService.get(url).map(function (res) { return res.json(); }).toPromise().then(function successCallback(result) {
	                resolve(result);
	                //ctrl.setting = result;
	                var extraVars = result.extra_vars;
	                var sched_provider = extraVars[NodesService.node_constants.SCHED_PROVIDER];
	                var network_mode = extraVars[NodesService.node_constants.CONTIV_NET_MODE];
	                if (extraVars[NodesService.node_constants.CONTROL_INTERFACE]) {
	                    ctrl.extra_vars[NodesService.node_constants.CONTROL_INTERFACE] =
	                        extraVars[NodesService.node_constants.CONTROL_INTERFACE];
	                }
	                if (extraVars[NodesService.node_constants.DATA_INTERFACE]) {
	                    ctrl.extra_vars[NodesService.node_constants.DATA_INTERFACE] =
	                        extraVars[NodesService.node_constants.DATA_INTERFACE];
	                }
	                if (extraVars[NodesService.node_constants.VIP_ADDR]) {
	                    ctrl.extra_vars[NodesService.node_constants.VIP_ADDR] = extraVars[NodesService.node_constants.VIP_ADDR];
	                }
	                if (sched_provider) {
	                    ctrl.extra_vars[NodesService.node_constants.SCHED_PROVIDER] = sched_provider;
	                    if (sched_provider === 'ucp-swarm') {
	                        ctrl.extra_vars[NodesService.node_constants.UCP_BOOTSTRAP_NODE] =
	                            extraVars[NodesService.node_constants.UCP_BOOTSTRAP_NODE];
	                    }
	                }
	                if (network_mode) {
	                    ctrl.extra_vars[NodesService.node_constants.CONTIV_NET_MODE] = network_mode;
	                    if (network_mode === 'standalone') {
	                        ctrl.extra_vars[NodesService.node_constants.FWD_MODE] = extraVars[NodesService.node_constants.FWD_MODE];
	                    }
	                    else if (network_mode === 'aci') {
	                        ctrl.extra_vars[NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE] =
	                            extraVars[NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE];
	                        ctrl.extra_vars[NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN] =
	                            extraVars[NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN];
	                        ctrl.extra_vars[NodesService.node_constants.APIC_LEAF_NODES] =
	                            extraVars[NodesService.node_constants.APIC_LEAF_NODES];
	                        ctrl.extra_vars[NodesService.node_constants.APIC_PASSWORD] =
	                            extraVars[NodesService.node_constants.APIC_PASSWORD];
	                        ctrl.extra_vars[NodesService.node_constants.APIC_PHYS_DOMAIN] =
	                            extraVars[NodesService.node_constants.APIC_PHYS_DOMAIN];
	                        ctrl.extra_vars[NodesService.node_constants.APIC_URL] =
	                            extraVars[NodesService.node_constants.APIC_URL];
	                        ctrl.extra_vars[NodesService.node_constants.APIC_USERNAME] =
	                            extraVars[NodesService.node_constants.APIC_USERNAME];
	                    }
	                }
	                if (extraVars[NodesService.node_constants.CLUSTER_NAME]) {
	                    ctrl.extra_vars[NodesService.node_constants.CLUSTER_NAME] =
	                        extraVars[NodesService.node_constants.CLUSTER_NAME];
	                }
	                nodeservice.createEnvVariables(extraVars[NodesService.node_constants.ENV], ctrl.envVariables);
	                nodeservice.createAnsibleVariables(extraVars, ctrl.ansibleVariables);
	            }, function errorCallback(result) {
	                reject(result);
	            });
	        });
	        return promise;
	    };
	    NodesService.prototype.createEnvVariables = function (envVars, envVariables) {
	        var i;
	        for (i in envVars) {
	            envVariables.push({ 'name': i, 'value': envVars[i] });
	        }
	    };
	    NodesService.prototype.createAnsibleVariables = function (extraVars, ansibleVariables) {
	        var setting_filter = [NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE,
	            NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN, NodesService.node_constants.APIC_LEAF_NODES,
	            NodesService.node_constants.APIC_PASSWORD, NodesService.node_constants.APIC_PHYS_DOMAIN,
	            NodesService.node_constants.APIC_URL, NodesService.node_constants.APIC_USERNAME,
	            NodesService.node_constants.CONTIV_NET_MODE, NodesService.node_constants.CONTROL_INTERFACE,
	            NodesService.node_constants.ENV, NodesService.node_constants.FWD_MODE, NodesService.node_constants.DATA_INTERFACE,
	            NodesService.node_constants.SCHED_PROVIDER, NodesService.node_constants.VIP_ADDR,
	            NodesService.node_constants.UCP_BOOTSTRAP_NODE, NodesService.node_constants.CLUSTER_NAME];
	        var i;
	        for (i in extraVars) {
	            if (setting_filter.indexOf(i) === -1) {
	                ansibleVariables.push({ 'name': i, 'value': extraVars[i] });
	            }
	        }
	    };
	    ;
	    NodesService.prototype.updateSettings = function (nodeOpsObj) {
	        //let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
	        //let options = new RequestOptions({ headers: headers }); // Create a request option
	        return this.apiService.post(contivglobals_1.ContivGlobals.NODES_SETTINGS_SET_ENDPOINT, nodeOpsObj)
	            .map(function (res) { return res.json(); }).toPromise();
	    };
	    ;
	    NodesService.prototype.createExtraVars = function (ctrl) {
	        //Add ansible variables to extra_vars
	        ctrl.ansibleVariables.forEach(function (item) {
	            ctrl.extra_vars[item.name] = item.value;
	        });
	        //Add environment variables to extra_vars
	        var envVars = {};
	        ctrl.envVariables.forEach(function (item) {
	            envVars[item.name] = item.value;
	        });
	        ctrl.extra_vars[NodesService.node_constants.ENV] = envVars;
	        ctrl.nodeOpsObj.extra_vars = JSON.stringify(ctrl.extra_vars);
	    };
	    ;
	    /**
	     * Cleanup ansible variables for network mode and scheduler. ng-if removes it from the view (DOM) but not from
	     * the model.
	     */
	    NodesService.prototype.cleanupExtraVars = function (ctrl) {
	        //Cleanup for network mode
	        if (ctrl.extra_vars[NodesService.node_constants.CONTIV_NET_MODE] == 'aci') {
	            delete ctrl.extra_vars[NodesService.node_constants.FWD_MODE];
	        }
	        else {
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_URL];
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_USERNAME];
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_PASSWORD];
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_LEAF_NODES];
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_PHYS_DOMAIN];
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_EPG_BRIDGE_DOMAIN];
	            delete ctrl.extra_vars[NodesService.node_constants.APIC_CONTR_UNRESTRICT_MODE];
	        }
	        //Cleanup for scheduler
	        if (ctrl.extra_vars[NodesService.node_constants.SCHED_PROVIDER] == 'native-swarm') {
	            delete ctrl.extra_vars[NodesService.node_constants.UCP_BOOTSTRAP_NODE];
	        }
	    };
	    ;
	    NodesService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], NodesService);
	    return NodesService;
	    var _a, _b;
	}());
	exports.NodesService = NodesService;
	

/***/ },

/***/ 152:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var networksmodel_1 = __webpack_require__(45);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var crudhelperservice_1 = __webpack_require__(9);
	var ApplicationGroupCreateComponent = (function () {
	    function ApplicationGroupCreateComponent(activatedRoute, router, networksModel, applicationGroupsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.networksModel = networksModel;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.networks = [];
	        this.applicationGroup = {};
	        this.selectedNetwork = '';
	        var applicationGroupCreateCtrl = this;
	        /**
	         * Get networks for the given tenant.
	         */
	        function getNetworks() {
	            networksModel.get(false).then(function (result) {
	                applicationGroupCreateCtrl.networks = _.filter(result, {
	                    'tenantName': 'default' //TODO: Remove hardcoded tenant.
	                });
	            });
	        }
	        function resetForm() {
	            crudHelperService.stopLoader(applicationGroupCreateCtrl);
	            crudHelperService.hideServerError(applicationGroupCreateCtrl);
	            applicationGroupCreateCtrl.applicationGroup = {
	                groupName: '',
	                networkName: '',
	                policies: [],
	                netProfile: '',
	                tenantName: 'default' //TODO: Remove hardcoded tenant.
	            };
	        }
	        getNetworks();
	        resetForm();
	    }
	    ApplicationGroupCreateComponent.prototype.returnToApplicationGroup = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    ApplicationGroupCreateComponent.prototype.cancelCreating = function () {
	        this.returnToApplicationGroup();
	    };
	    ApplicationGroupCreateComponent.prototype.createApplicationGroup = function (validform) {
	        var applicationGroupCreateCtrl = this;
	        if (validform) {
	            applicationGroupCreateCtrl.crudHelperService.hideServerError(applicationGroupCreateCtrl);
	            applicationGroupCreateCtrl.crudHelperService.startLoader(applicationGroupCreateCtrl);
	            applicationGroupCreateCtrl.applicationGroup.networkName =
	                applicationGroupCreateCtrl.selectedNetwork;
	            applicationGroupCreateCtrl.applicationGroup.key =
	                applicationGroupCreateCtrl.applicationGroupsModel.generateKey(applicationGroupCreateCtrl.applicationGroup);
	            /**
	             * applicationGroup consist of Group Name, Network Name, Isolation Policies, Bandwidth Policy
	             */
	            applicationGroupCreateCtrl.applicationGroupsModel.create(applicationGroupCreateCtrl.applicationGroup, undefined).then(function successCallback(result) {
	                applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
	                applicationGroupCreateCtrl.returnToApplicationGroup();
	            }, function errorCallback(result) {
	                applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
	                applicationGroupCreateCtrl.crudHelperService.showServerError(applicationGroupCreateCtrl, result);
	            });
	        }
	    };
	    ApplicationGroupCreateComponent.prototype.updateNetwork = function (networkName) {
	        this.selectedNetwork = networkName;
	    };
	    ApplicationGroupCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'applicationgroupcreate',
	            templateUrl: 'applicationgroups/applicationgroupcreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _c) || Object, (typeof (_d = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], ApplicationGroupCreateComponent);
	    return ApplicationGroupCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.ApplicationGroupCreateComponent = ApplicationGroupCreateComponent;
	

/***/ },

/***/ 153:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/15/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var crudhelperservice_1 = __webpack_require__(9);
	var ApplicationGroupDetailsComponent = (function () {
	    function ApplicationGroupDetailsComponent(activatedRoute, router, ngZone, applicationGroupsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.applicationGroup = {};
	        this.mode = 'details';
	        var applicationGroupDetailsCtrl = this;
	        /**
	         * To show edit or details screen based on the route
	         */
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                applicationGroupDetailsCtrl.mode = 'edit';
	            }
	            else {
	                applicationGroupDetailsCtrl.mode = 'details';
	            }
	        }
	        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.crudHelperService.hideServerError(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.applicationGroupsModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function (group) {
	            applicationGroupDetailsCtrl.applicationGroup = group;
	            applicationGroupDetailsCtrl.ngZone.run(function () {
	                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            });
	        }, function (error) {
	            applicationGroupDetailsCtrl.ngZone.run(function () {
	                applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            });
	        });
	        setMode();
	        this.applicationGroup = { groupName: '', networkName: '' };
	        this.serverErrorMessage = '';
	        this.statskey = '';
	        this.infoselected = true;
	    }
	    ApplicationGroupDetailsComponent.prototype.ngOnInit = function () {
	        this.statskey = this.activatedRoute.snapshot.params['key'];
	    };
	    ApplicationGroupDetailsComponent.prototype.returnToApplicationGroup = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    ApplicationGroupDetailsComponent.prototype.returnToApplicationGroupDetails = function () {
	        this.router.navigate(['../../details', this.applicationGroup.key], { relativeTo: this.activatedRoute });
	    };
	    ApplicationGroupDetailsComponent.prototype.editApplicationGroup = function () {
	        this.router.navigate(['../../edit', this.applicationGroup.key], { relativeTo: this.activatedRoute });
	    };
	    ApplicationGroupDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToApplicationGroupDetails();
	    };
	    ApplicationGroupDetailsComponent.prototype.deleteApplicationGroup = function () {
	        var applicationGroupDetailsCtrl = this;
	        applicationGroupDetailsCtrl.crudHelperService.hideServerError(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.applicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup).then(function successCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.returnToApplicationGroup();
	        }, function errorCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.crudHelperService.showServerError(applicationGroupDetailsCtrl, result);
	        });
	    };
	    ApplicationGroupDetailsComponent.prototype.saveApplicationGroup = function () {
	        var applicationGroupDetailsCtrl = this;
	        applicationGroupDetailsCtrl.crudHelperService.hideServerError(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.applicationGroupsModel.save(applicationGroupDetailsCtrl.applicationGroup).then(function successCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.returnToApplicationGroupDetails();
	        }, function errorCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.crudHelperService.showServerError(applicationGroupDetailsCtrl, result);
	        });
	    };
	    ApplicationGroupDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'applicationgroupdetails',
	            templateUrl: 'applicationgroups/applicationgroupdetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], ApplicationGroupDetailsComponent);
	    return ApplicationGroupDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.ApplicationGroupDetailsComponent = ApplicationGroupDetailsComponent;
	

/***/ },

/***/ 154:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var AppGrouplistComponent = (function () {
	    function AppGrouplistComponent(activatedRoute, router, appGroupModel, crudHelperService) {
	        var _this = this;
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.appGroupModel = appGroupModel;
	        this.crudHelperService = crudHelperService;
	        this.applicationGroupListCtrl = this;
	        this['showLoader'] = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getApplicationGroup(true);
	        });
	    }
	    AppGrouplistComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getApplicationGroup(false);
	    };
	    AppGrouplistComponent.prototype.getApplicationGroup = function (reload) {
	        var applicationGroupListCtrl = this;
	        this.appGroupModel.get(reload)
	            .then(function (result) {
	            applicationGroupListCtrl['groups'] = result;
	            applicationGroupListCtrl.crudHelperService.stopLoader(applicationGroupListCtrl);
	        }, function (error) {
	            applicationGroupListCtrl.crudHelperService.stopLoader(applicationGroupListCtrl);
	        });
	    };
	    AppGrouplistComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    AppGrouplistComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    AppGrouplistComponent = __decorate([
	        core_1.Component({
	            selector: 'app-group',
	            template: __webpack_require__(465)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], AppGrouplistComponent);
	    return AppGrouplistComponent;
	    var _a, _b, _c, _d;
	}());
	exports.AppGrouplistComponent = AppGrouplistComponent;
	

/***/ },

/***/ 155:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var appprofilesmodel_1 = __webpack_require__(90);
	var AppProfileCreateComponent = (function () {
	    function AppProfileCreateComponent(activatedRoute, router, crudHelperService, appProfilesModel, ngZone) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.appProfilesModel = appProfilesModel;
	        this.ngZone = ngZone;
	        this.newAppProfile = {};
	        var component = this;
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            crudHelperService.hideServerError(component);
	            component.newAppProfile = {
	                key: '',
	                appProfileName: '',
	                endpointGroups: [],
	                tenantName: 'default' //TODO: Remove hardcoded tenant.
	            };
	        }
	        resetForm();
	    }
	    AppProfileCreateComponent.prototype.returnToAppProfiles = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    AppProfileCreateComponent.prototype.cancelCreating = function () {
	        this.returnToAppProfiles();
	    };
	    AppProfileCreateComponent.prototype.createAppProfile = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            this.crudHelperService.startLoader(this);
	            this.crudHelperService.hideServerError(this);
	            component.newAppProfile.key = this.appProfilesModel.generateKey(this.newAppProfile);
	            this.appProfilesModel.create(component.newAppProfile, undefined)
	                .then(function (result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.returnToAppProfiles();
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError(component, error);
	            });
	        }
	    };
	    AppProfileCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'appprofilecreate',
	            templateUrl: 'appprofiles/appprofilecreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof appprofilesmodel_1.AppProfilesModel !== 'undefined' && appprofilesmodel_1.AppProfilesModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], AppProfileCreateComponent);
	    return AppProfileCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.AppProfileCreateComponent = AppProfileCreateComponent;
	

/***/ },

/***/ 156:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var appprofilesmodel_1 = __webpack_require__(90);
	var crudhelperservice_1 = __webpack_require__(9);
	var AppProfileDetailsComponent = (function () {
	    function AppProfileDetailsComponent(activatedRoute, router, ngZone, appProfilesModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.appProfilesModel = appProfilesModel;
	        this.crudHelperService = crudHelperService;
	        this.appProfile = {};
	        this.mode = 'details';
	        var component = this;
	        /**
	         * To show edit or details screen based on the route
	         */
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                component.mode = 'edit';
	            }
	            else {
	                component.mode = 'details';
	            }
	        }
	        component.crudHelperService.stopLoader(component);
	        component.crudHelperService.hideServerError(component);
	        component.appProfilesModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function (appProfile) {
	            component.appProfile = appProfile;
	        });
	        setMode();
	    }
	    AppProfileDetailsComponent.prototype.returnToAppProfile = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    AppProfileDetailsComponent.prototype.returnToAppProfileDetails = function () {
	        this.router.navigate(['../../details', this.appProfile.key], { relativeTo: this.activatedRoute });
	    };
	    AppProfileDetailsComponent.prototype.editAppProfile = function () {
	        this.router.navigate(['../../edit', this.appProfile.key], { relativeTo: this.activatedRoute });
	    };
	    AppProfileDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToAppProfileDetails();
	    };
	    AppProfileDetailsComponent.prototype.deleteAppProfile = function () {
	        var component = this;
	        component.crudHelperService.hideServerError(component);
	        component.crudHelperService.startLoader(component);
	        component.appProfilesModel.delete(component.appProfile).then(function successCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.returnToAppProfile();
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showServerError(component, result);
	        });
	    };
	    AppProfileDetailsComponent.prototype.saveAppProfile = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            component.crudHelperService.hideServerError(component);
	            component.crudHelperService.startLoader(component);
	            component.appProfilesModel.save(component.appProfile).then(function successCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.returnToAppProfileDetails();
	            }, function errorCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError(component, result);
	            });
	        }
	    };
	    AppProfileDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'appprofiledetails',
	            templateUrl: 'appprofiles/appprofiledetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof appprofilesmodel_1.AppProfilesModel !== 'undefined' && appprofilesmodel_1.AppProfilesModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], AppProfileDetailsComponent);
	    return AppProfileDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.AppProfileDetailsComponent = AppProfileDetailsComponent;
	

/***/ },

/***/ 157:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var appprofilesmodel_1 = __webpack_require__(90);
	var AppProfileListComponent = (function () {
	    function AppProfileListComponent(activatedRoute, router, appProfilesModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.appProfilesModel = appProfilesModel;
	        this.crudHelperService = crudHelperService;
	        this.ngZone = ngZone;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getAppProfiles(true);
	        });
	    }
	    AppProfileListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getAppProfiles(false);
	    };
	    AppProfileListComponent.prototype.getAppProfiles = function (reload) {
	        var component = this;
	        this.appProfilesModel.get(reload)
	            .then(function successCallback(result) {
	            component['appProfiles'] = result;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    AppProfileListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    AppProfileListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    AppProfileListComponent = __decorate([
	        core_1.Component({
	            selector: 'appprofilelist',
	            templateUrl: 'appprofiles/appprofilelist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof appprofilesmodel_1.AppProfilesModel !== 'undefined' && appprofilesmodel_1.AppProfilesModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], AppProfileListComponent);
	    return AppProfileListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.AppProfileListComponent = AppProfileListComponent;
	

/***/ },

/***/ 158:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/21/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var filterpipe_1 = __webpack_require__(281);
	var PipesModule = (function () {
	    function PipesModule() {
	    }
	    PipesModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule
	            ],
	            declarations: [
	                filterpipe_1.FilterPipe
	            ],
	            exports: [
	                filterpipe_1.FilterPipe,
	                forms_1.FormsModule,
	                common_1.CommonModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], PipesModule);
	    return PipesModule;
	}());
	exports.PipesModule = PipesModule;
	3;
	

/***/ },

/***/ 159:
/***/ function(module, exports) {

	/**
	 * Created by cshampur on 11/4/16.
	 */
	"use strict";
	exports.AuthMatrix = {
	    'firstrun': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'dashboard': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networkpolicies/list': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networkpolicies/isolation/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'networkpolicies/isolation/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networkpolicies/isolation/edit': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'networkpolicies/bandwidth/create': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networkpolicies/bandwidth/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networkpolicies/bandwidth/edit': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'applicationgroups/list': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'applicationgroups/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'applicationgroups/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'applicationgroups/edit': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/users/list': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/users/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/users/details': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/users/edit': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/nodes/list': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/nodes/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/nodes/details': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/nodes/edit': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'settings/networks': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'organizations/list': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'organizations/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'organizations/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networks/list': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'networks/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'networks/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'servicelbs/list': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'servicelbs/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'servicelbs/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'appprofiles/list': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'appprofiles/create': { 'DevOps': 'n', 'SysAdmin': 'y' },
	    'appprofiles/details': { 'DevOps': 'y', 'SysAdmin': 'y' },
	    'appprofiles/edit': { 'DevOps': 'n', 'SysAdmin': 'y' }
	};
	

/***/ },

/***/ 160:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 11/4/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var authservice_1 = __webpack_require__(68);
	var authMatrix_1 = __webpack_require__(159);
	var util_1 = __webpack_require__(51);
	var AuthGuard = (function () {
	    function AuthGuard(authService, router) {
	        this.authService = authService;
	        this.router = router;
	        this.accessMatrix = authMatrix_1.AuthMatrix;
	        this.unguardedUrls = ['/unauthorized', '/login', '/logout'];
	    }
	    AuthGuard.prototype.canActivate = function (route, state) {
	        var url = state.url;
	        if (this.unguardedUrls.indexOf(url) > -1)
	            return true;
	        return this.checkLogin(url);
	    };
	    AuthGuard.prototype.canActivateChild = function (route, state) {
	        return this.canActivate(route, state);
	    };
	    AuthGuard.prototype.checkLogin = function (url) {
	        if (this.checkFirstRun()) {
	            this.router.navigate(['/unauthorized']);
	            return false;
	        }
	        if (this.authService.isLoggedIn) {
	            if (this.checkAccess(url))
	                if (this.authService.validateExpiry())
	                    return true;
	                else {
	                    this.loadLogin(url);
	                    return false;
	                }
	            else {
	                this.router.navigate(['/unauthorized']);
	                return false;
	            }
	        }
	        // Validate Token Expiration
	        if (!util_1.isNull(localStorage.getItem("authToken"))) {
	            this.authService.extractBody();
	            if (this.authService.validateExpiry()) {
	                this.authService.isLoggedIn = true;
	                if (this.checkAccess(url))
	                    return true;
	                else {
	                    this.router.navigate(['/unauthorized']);
	                    return false;
	                }
	            }
	        }
	        this.loadLogin(url);
	        return false;
	    };
	    AuthGuard.prototype.loadLogin = function (url) {
	        // Clean the local storage
	        this.authService.cleanuplocalstorage();
	        // Store the attempted URL for redirecting
	        this.authService.redirectUrl = url;
	        // Navigate to the login page
	        this.router.navigate(['/login']);
	    };
	    AuthGuard.prototype.checkAccess = function (url) {
	        return this.authService.checkAccess(url);
	    };
	    AuthGuard.prototype.checkFirstRun = function () {
	        if (util_1.isNull(localStorage.getItem('firstRun')))
	            this.authService.firstRun = true;
	        else
	            this.authService.firstRun = false;
	        if (this.authService.firstRun && (this.authService.authTokenPayload['role'] == 'DevOps'))
	            return true;
	        else
	            return false;
	    };
	    AuthGuard = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	    ], AuthGuard);
	    return AuthGuard;
	    var _a, _b;
	}());
	exports.AuthGuard = AuthGuard;
	

/***/ },

/***/ 161:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var Observable_1 = __webpack_require__(1);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var policiesmodel_1 = __webpack_require__(67);
	var networksmodel_1 = __webpack_require__(45);
	var DashboardComponent = (function () {
	    function DashboardComponent(networksModel, applicationGroupsModel, policiesModel, ngZone) {
	        this.networksModel = networksModel;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.policiesModel = policiesModel;
	        this.ngZone = ngZone;
	        this.nodes = 0;
	        this.networks = 0;
	        this.volumes = 0;
	        this.groups = 0;
	        this.networkpolicies = 0;
	        this.storagepolicies = 0;
	        var dashboardComponent = this;
	        function getDashboardInfo(reload) {
	            ngZone.run(function () {
	                networksModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.networks = result.length;
	                });
	                applicationGroupsModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.groups = result.length;
	                });
	                policiesModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.networkpolicies = result.length;
	                });
	            });
	        }
	        //Load from cache for quick display initially
	        getDashboardInfo(false);
	        this.subscription = Observable_1.Observable.interval(5000).subscribe(function () {
	            getDashboardInfo(true);
	        });
	    }
	    DashboardComponent.prototype.ngOnDestroy = function () {
	        this.subscription.unsubscribe();
	    };
	    DashboardComponent = __decorate([
	        core_1.Component({
	            selector: 'dashboard',
	            templateUrl: 'dashboard/dashboard.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _a) || Object, (typeof (_b = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _b) || Object, (typeof (_c = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], DashboardComponent);
	    return DashboardComponent;
	    var _a, _b, _c, _d;
	}());
	exports.DashboardComponent = DashboardComponent;
	

/***/ },

/***/ 162:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/29/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var firstrunwizardservice_1 = __webpack_require__(75);
	var FirstrunWizardComponent = (function () {
	    function FirstrunWizardComponent(wizardService) {
	        this.wizardService = wizardService;
	        this.pageNo = 1;
	        wizardService.getNetworkSettings();
	        wizardService.getAciSettings();
	    }
	    FirstrunWizardComponent.prototype.ngOnInit = function () {
	    };
	    FirstrunWizardComponent.prototype.updatePage = function (pageno) {
	        this.pageNo = ++pageno;
	    };
	    FirstrunWizardComponent.prototype.ngOnDestroy = function () {
	        jQuery(".ui.fullscreen.modal").remove();
	    };
	    FirstrunWizardComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunwizard',
	            templateUrl: 'firstrunwizard/firstrunwizard.html',
	            styleUrls: ['firstrunwizard/firstrunwizard.css']
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _a) || Object])
	    ], FirstrunWizardComponent);
	    return FirstrunWizardComponent;
	    var _a;
	}());
	exports.FirstrunWizardComponent = FirstrunWizardComponent;
	

/***/ },

/***/ 163:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var router_1 = __webpack_require__(5);
	var authservice_1 = __webpack_require__(68);
	var contivglobals_1 = __webpack_require__(15);
	var LoginComponent = (function () {
	    function LoginComponent(router, activatedRoute, crudHelperService, authService) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.authService = authService;
	        this.product_name = contivglobals_1.ContivGlobals.PRODUCT_NAME;
	        this.showLoader = true;
	        this.showServerError = false;
	        this.serverErrorMessage = '';
	        this.crudHelperService = crudHelperService;
	        this.username = '';
	        this.password = '';
	        this.loginCtrl = this;
	    }
	    LoginComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.stopLoader(this);
	        this.crudHelperService.hideServerError(this);
	        jQuery("body").addClass("background");
	    };
	    LoginComponent.prototype.login = function () {
	        var _this = this;
	        this.crudHelperService.startLoader(this);
	        this.authService.login({ username: this.username, password: this.password })
	            .subscribe(function (result) {
	            if (result) {
	                _this.crudHelperService.stopLoader(_this);
	                if (_this.authService.firstRun) {
	                    _this.router.navigate(['/m/firstrun']);
	                }
	                else {
	                    if (_this.authService.redirectUrl.length > 0) {
	                        var redirectUrl = _this.authService.redirectUrl;
	                        _this.authService.redirectUrl = '';
	                        _this.router.navigate([redirectUrl]);
	                    }
	                    else {
	                        _this.router.navigate(['/m/dashboard']);
	                    }
	                }
	            }
	            else {
	                _this.crudHelperService.stopLoader(_this);
	                jQuery('#login-failed').modal('show');
	            }
	        }, function (error) {
	            _this.crudHelperService.stopLoader(_this);
	            jQuery('#login-failed').modal('show');
	        });
	    };
	    LoginComponent = __decorate([
	        core_1.Component({
	            selector: 'login',
	            templateUrl: 'login/login.html',
	            styles: [__webpack_require__(733)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _d) || Object])
	    ], LoginComponent);
	    return LoginComponent;
	    var _a, _b, _c, _d;
	}());
	exports.LoginComponent = LoginComponent;
	

/***/ },

/***/ 164:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/6/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var contivglobals_1 = __webpack_require__(15);
	var LogoutComponent = (function () {
	    function LogoutComponent(router, activatedRoute) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.product_name = contivglobals_1.ContivGlobals.PRODUCT_NAME;
	    }
	    LogoutComponent.prototype.ngOnInit = function () {
	        jQuery("body").addClass("background");
	    };
	    LogoutComponent.prototype.login = function () {
	        this.router.navigate(['/login'], { relativeTo: this.activatedRoute });
	    };
	    LogoutComponent = __decorate([
	        core_1.Component({
	            selector: 'logout',
	            templateUrl: 'login/logout.html',
	            styleUrls: ['login/logout.css']
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object])
	    ], LogoutComponent);
	    return LogoutComponent;
	    var _a, _b;
	}());
	exports.LogoutComponent = LogoutComponent;
	

/***/ },

/***/ 165:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/6/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var UnauthorizedComponent = (function () {
	    function UnauthorizedComponent() {
	    }
	    UnauthorizedComponent.prototype.ngOnInit = function () {
	        jQuery("body").addClass("background");
	    };
	    UnauthorizedComponent = __decorate([
	        core_1.Component({
	            selector: 'unauthorized',
	            templateUrl: 'login/unauthorized.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], UnauthorizedComponent);
	    return UnauthorizedComponent;
	}());
	exports.UnauthorizedComponent = UnauthorizedComponent;
	

/***/ },

/***/ 166:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 5/19/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var authservice_1 = __webpack_require__(68);
	var contivglobals_1 = __webpack_require__(15);
	var MenuComponent = (function () {
	    function MenuComponent(activatedRoute, router, authService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.authService = authService;
	        this.product_name = contivglobals_1.ContivGlobals.PRODUCT_NAME;
	        this.username = authService.authTokenPayload['role'];
	    }
	    MenuComponent.prototype.ngOnInit = function () {
	        jQuery("body").removeClass("background");
	        this.firstRun = this.authService.firstRun;
	    };
	    MenuComponent.prototype.ngDoCheck = function () {
	        this.firstRun = this.authService.firstRun;
	    };
	    MenuComponent.prototype.logout = function () {
	        this.authService.logout();
	        this.router.navigate(['/logout'], { relativeTo: this.activatedRoute });
	    };
	    MenuComponent = __decorate([
	        core_1.Component({
	            selector: 'menu',
	            templateUrl: 'menu/menu.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _c) || Object])
	    ], MenuComponent);
	    return MenuComponent;
	    var _a, _b, _c;
	}());
	exports.MenuComponent = MenuComponent;
	

/***/ },

/***/ 167:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/*
	/**
	 * Created by hardik gandhi on 6/14/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var netprofilesmodel_1 = __webpack_require__(73);
	var crudhelperservice_1 = __webpack_require__(9);
	var networkpoliciestabsctrl_1 = __webpack_require__(69);
	var BandwidthPolicyCreateComponent = (function () {
	    function BandwidthPolicyCreateComponent(activatedRoute, router, netprofilesModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.netprofilesModel = netprofilesModel;
	        this.crudHelperService = crudHelperService;
	        var bandwidthPolicyCreateCtrl = this;
	        function resetForm() {
	            crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
	            crudHelperService.hideServerError(bandwidthPolicyCreateCtrl);
	            bandwidthPolicyCreateCtrl.newPolicy = {
	                profileName: '',
	                tenantName: 'default',
	                bandwidth: '',
	                DSCP: ''
	            };
	        }
	        resetForm();
	    }
	    BandwidthPolicyCreateComponent.prototype.returnToPolicies = function () {
	        this.router.navigate(['../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.bandwidth }], { relativeTo: this.activatedRoute });
	    };
	    BandwidthPolicyCreateComponent.prototype.cancelCreating = function () {
	        this.returnToPolicies();
	    };
	    BandwidthPolicyCreateComponent.prototype.createPolicy = function (validform) {
	        var bandwidthPolicyCreateCtrl = this;
	        if (validform) {
	            bandwidthPolicyCreateCtrl.crudHelperService.hideServerError(bandwidthPolicyCreateCtrl);
	            bandwidthPolicyCreateCtrl.crudHelperService.startLoader(bandwidthPolicyCreateCtrl);
	            bandwidthPolicyCreateCtrl.newPolicy.key =
	                bandwidthPolicyCreateCtrl.netprofilesModel.generateKey(bandwidthPolicyCreateCtrl.newPolicy);
	            bandwidthPolicyCreateCtrl.newPolicy.bandwidth = bandwidthPolicyCreateCtrl.newPolicy.bandwidthNumber
	                + " " + bandwidthPolicyCreateCtrl.newPolicy.bandwidthUnit;
	            bandwidthPolicyCreateCtrl.netprofilesModel.create(bandwidthPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
	                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
	                bandwidthPolicyCreateCtrl.returnToPolicies();
	            }, function errorCallback(result) {
	                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
	                bandwidthPolicyCreateCtrl.crudHelperService.showServerError(bandwidthPolicyCreateCtrl, result);
	            });
	        }
	    };
	    BandwidthPolicyCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'bandwidthpolicycreate',
	            templateUrl: 'network_policies/bandwidthpolicycreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], BandwidthPolicyCreateComponent);
	    return BandwidthPolicyCreateComponent;
	    var _a, _b, _c, _d;
	}());
	exports.BandwidthPolicyCreateComponent = BandwidthPolicyCreateComponent;
	

/***/ },

/***/ 168:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by hardik gandhi on 6/16/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var netprofilesmodel_1 = __webpack_require__(73);
	var crudhelperservice_1 = __webpack_require__(9);
	var networkpoliciestabsctrl_1 = __webpack_require__(69);
	var BandwidthPolicyDetailsComponent = (function () {
	    function BandwidthPolicyDetailsComponent(activatedRoute, router, netprofilesModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.netprofilesModel = netprofilesModel;
	        this.crudHelperService = crudHelperService;
	        this.bandwidthProfiles = [];
	        this.policy = {};
	        this.mode = 'details';
	        var bandwidthPolicyDetailsCtrl = this;
	        /**
	         * To show edit or details screen based on the route
	         */
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                bandwidthPolicyDetailsCtrl.mode = 'edit';
	            }
	            else {
	                bandwidthPolicyDetailsCtrl.mode = 'details';
	            }
	        }
	        /* Get particular Profile for based on key*/
	        bandwidthPolicyDetailsCtrl.netprofilesModel.getModelByKey(activatedRoute.snapshot.params['key'], false, undefined)
	            .then(function (policy) {
	            bandwidthPolicyDetailsCtrl.policy = policy;
	        });
	        bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	        bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
	        setMode();
	    }
	    BandwidthPolicyDetailsComponent.prototype.deletePolicy = function () {
	        var bandwidthPolicyDetailsCtrl = this;
	        bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
	        bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
	        bandwidthPolicyDetailsCtrl.netprofilesModel.deleteUsingKey(bandwidthPolicyDetailsCtrl.policy.key, 'key', undefined).then(function successCallback(result) {
	            bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.returnToPolicies();
	        }, function errorCallback(result) {
	            bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.crudHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
	        });
	    };
	    BandwidthPolicyDetailsComponent.prototype.returnToPolicies = function () {
	        this.router.navigate(['../../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.bandwidth }], { relativeTo: this.activatedRoute });
	    };
	    BandwidthPolicyDetailsComponent.prototype.returnToPolicyDetails = function () {
	        this.router.navigate(['../../details', this.policy.key], { relativeTo: this.activatedRoute });
	    };
	    BandwidthPolicyDetailsComponent.prototype.editPolicy = function () {
	        this.router.navigate(['../../edit', this.policy.key], { relativeTo: this.activatedRoute });
	    };
	    BandwidthPolicyDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToPolicyDetails();
	    };
	    BandwidthPolicyDetailsComponent.prototype.savePolicy = function (validform) {
	        var bandwidthPolicyDetailsCtrl = this;
	        if (validform) {
	            bandwidthPolicyDetailsCtrl.crudHelperService.hideServerError(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.policy.bandwidth = bandwidthPolicyDetailsCtrl.policy.bandwidthNumber + " " + bandwidthPolicyDetailsCtrl.policy.bandwidthUnit;
	            bandwidthPolicyDetailsCtrl.netprofilesModel.save(bandwidthPolicyDetailsCtrl.policy).then(function successCallback(result) {
	                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	                bandwidthPolicyDetailsCtrl.returnToPolicyDetails();
	            }, function errorCallback(result) {
	                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	                bandwidthPolicyDetailsCtrl.crudHelperService.showServerError(bandwidthPolicyDetailsCtrl, result);
	            });
	        }
	    };
	    BandwidthPolicyDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'bandwidthpolicydetails',
	            templateUrl: 'network_policies/bandwidthpolicydetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], BandwidthPolicyDetailsComponent);
	    return BandwidthPolicyDetailsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.BandwidthPolicyDetailsComponent = BandwidthPolicyDetailsComponent;
	

/***/ },

/***/ 169:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/10/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var policiesmodel_1 = __webpack_require__(67);
	var crudhelperservice_1 = __webpack_require__(9);
	var networkpoliciestabsctrl_1 = __webpack_require__(69);
	var IsolationPolicyCreateComponent = (function () {
	    function IsolationPolicyCreateComponent(activatedRoute, router, policiesModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.policiesModel = policiesModel;
	        this.crudHelperService = crudHelperService;
	        var isolationPolicyCreateCtrl = this;
	        function resetForm() {
	            crudHelperService.stopLoader(isolationPolicyCreateCtrl);
	            crudHelperService.hideServerError(isolationPolicyCreateCtrl);
	            isolationPolicyCreateCtrl.newPolicy = {
	                policyName: '',
	                tenantName: 'default' //TODO: Remove hardcoded tenant.
	            };
	        }
	        resetForm();
	    }
	    IsolationPolicyCreateComponent.prototype.returnToPolicies = function () {
	        this.router.navigate(['../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.isolation }], { relativeTo: this.activatedRoute });
	    };
	    IsolationPolicyCreateComponent.prototype.cancelCreating = function () {
	        this.returnToPolicies();
	    };
	    IsolationPolicyCreateComponent.prototype.createPolicy = function (validform) {
	        var isolationPolicyCreateCtrl = this;
	        if (validform) {
	            isolationPolicyCreateCtrl.crudHelperService.hideServerError(isolationPolicyCreateCtrl);
	            isolationPolicyCreateCtrl.crudHelperService.startLoader(isolationPolicyCreateCtrl);
	            isolationPolicyCreateCtrl.newPolicy.key =
	                isolationPolicyCreateCtrl.policiesModel.generateKey(isolationPolicyCreateCtrl.newPolicy);
	            isolationPolicyCreateCtrl.policiesModel.create(isolationPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
	                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
	                isolationPolicyCreateCtrl.returnToPolicies();
	            }, function errorCallback(result) {
	                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
	                isolationPolicyCreateCtrl.crudHelperService.showServerError(isolationPolicyCreateCtrl, result);
	            });
	        }
	    };
	    IsolationPolicyCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'isolationpolicycreate',
	            templateUrl: 'network_policies/isolationpolicycreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], IsolationPolicyCreateComponent);
	    return IsolationPolicyCreateComponent;
	    var _a, _b, _c, _d;
	}());
	exports.IsolationPolicyCreateComponent = IsolationPolicyCreateComponent;
	

/***/ },

/***/ 170:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 3/8/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var policiesmodel_1 = __webpack_require__(67);
	var rulesmodel_1 = __webpack_require__(115);
	var networksmodel_1 = __webpack_require__(45);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var crudhelperservice_1 = __webpack_require__(9);
	var networkpoliciestabsctrl_1 = __webpack_require__(69);
	var contivglobals_1 = __webpack_require__(15);
	var IsolationPolicyDetailsComponent = (function () {
	    function IsolationPolicyDetailsComponent(activatedRoute, router, policiesModel, rulesModel, networksModel, applicationGroupsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.policiesModel = policiesModel;
	        this.rulesModel = rulesModel;
	        this.networksModel = networksModel;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.policy = {};
	        this.incomingRules = [];
	        this.outgoingRules = [];
	        this.mode = 'details';
	        this.newIncomingRule = {};
	        this.newOutgoingRule = {};
	        this.networks = [];
	        this.applicationGroups = [];
	        this.disableOutgoingNetworkSelection = false;
	        this.disableIncomingNetworkSelection = false;
	        this.disableOutgoingApplicationGroupSelection = false;
	        this.disableIncomingApplicationGroupSelection = false;
	        this.disableIncomingIPAddressSelection = false;
	        this.disableOutgoingIPAddressSelection = false;
	        this.newIncomingSelectedApplicationGroup = '';
	        this.newOutgoingSelectedApplicationGroup = '';
	        this.newIncomingSelectedNetwork = '';
	        this.newOutgoingSelectedNetwork = '';
	        this.incorrectCIDR = false;
	        this.validateCIDRFlag = false;
	        var isolationPolicyDetailsCtrl = this;
	        /**
	         * To show edit or details screen based on the route
	         */
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                isolationPolicyDetailsCtrl.mode = 'edit';
	            }
	            else {
	                isolationPolicyDetailsCtrl.mode = 'details';
	            }
	        }
	        /**
	         * Get network names for the given tenant.
	         */
	        function getNetworks() {
	            isolationPolicyDetailsCtrl.networksModel.get(false).then(function (result) {
	                //_.filter() returns a new array
	                isolationPolicyDetailsCtrl.networks = _.filter(result, {
	                    'tenantName': 'default' //TODO: Remove hardcoded tenant.
	                });
	            });
	        }
	        /**
	         * Get application group names for the given tenant.
	         */
	        function getApplicationGroups() {
	            isolationPolicyDetailsCtrl.applicationGroupsModel.get(false)
	                .then(function (result) {
	                //_.filter() returns a new array
	                isolationPolicyDetailsCtrl.applicationGroups = _.filter(result, {
	                    'tenantName': 'default' //TODO: Remove hardcoded tenant.
	                });
	            });
	        }
	        isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.policiesModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function (policy) {
	            isolationPolicyDetailsCtrl.policy = policy;
	            isolationPolicyDetailsCtrl.rulesModel.getIncomingRules(policy.policyName, 'default').then(function (result) {
	                isolationPolicyDetailsCtrl.incomingRules = result;
	                isolationPolicyDetailsCtrl.resetNewIncomingRule();
	            });
	            isolationPolicyDetailsCtrl.rulesModel.getOutgoingRules(policy.policyName, 'default').then(function (result) {
	                isolationPolicyDetailsCtrl.outgoingRules = result;
	                isolationPolicyDetailsCtrl.resetNewOutgoingRule();
	            });
	        });
	        getNetworks();
	        getApplicationGroups();
	        setMode();
	    }
	    IsolationPolicyDetailsComponent.prototype.returnToPolicies = function () {
	        this.router.navigate(['../../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.isolation }], { relativeTo: this.activatedRoute });
	    };
	    IsolationPolicyDetailsComponent.prototype.returnToPolicyDetails = function () {
	        this.router.navigate(['../../details', this.policy.key], { relativeTo: this.activatedRoute });
	    };
	    IsolationPolicyDetailsComponent.prototype.editPolicy = function () {
	        this.router.navigate(['../../edit', this.policy.key], { relativeTo: this.activatedRoute });
	    };
	    IsolationPolicyDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToPolicyDetails();
	    };
	    /**
	     * Go back to policy details after done editing
	     */
	    IsolationPolicyDetailsComponent.prototype.doneEditing = function () {
	        this.returnToPolicyDetails();
	    };
	    IsolationPolicyDetailsComponent.prototype.deletePolicy = function () {
	        var isolationPolicyDetailsCtrl = this;
	        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.policiesModel.delete(isolationPolicyDetailsCtrl.policy).then(function successCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.returnToPolicies();
	        }, function errorCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
	        });
	    };
	    IsolationPolicyDetailsComponent.prototype.validateCIDR = function (ipaddress) {
	        var cidrPattern = new RegExp(contivglobals_1.ContivGlobals.CIDR_REGEX);
	        if (ipaddress == '') {
	            return true;
	        }
	        if (cidrPattern.test(ipaddress)) {
	            this.incorrectCIDR = false;
	            return true;
	        }
	        this.incorrectCIDR = true;
	        this.validateCIDRFlag = true;
	        return false;
	    };
	    IsolationPolicyDetailsComponent.prototype.resetNewIncomingRule = function () {
	        //Rule object to be created on server
	        this.newIncomingRule = {
	            ruleId: '',
	            priority: 1,
	            action: 'allow',
	            fromEndpointGroup: '',
	            fromNetwork: '',
	            fromIpAddress: '',
	            protocol: 'tcp',
	            port: 0,
	            direction: 'in',
	            tenantName: 'default',
	            policyName: this.policy.policyName
	        };
	        this.newIncomingSelectedApplicationGroup = '';
	        this.newIncomingSelectedNetwork = '';
	        this.disableIncomingNetworkSelection = false;
	        this.disableIncomingApplicationGroupSelection = false;
	        this.disableIncomingIPAddressSelection = false;
	        this.incorrectCIDR = false;
	        this.validateCIDRFlag = false;
	    };
	    IsolationPolicyDetailsComponent.prototype.resetNewOutgoingRule = function () {
	        //Rule object to be created on server
	        this.newOutgoingRule = {
	            ruleId: '',
	            priority: 1,
	            action: 'allow',
	            toEndpointGroup: '',
	            toNetwork: '',
	            toIpAddress: '',
	            protocol: 'tcp',
	            port: 0,
	            direction: 'out',
	            tenantName: 'default',
	            policyName: this.policy.policyName
	        };
	        this.newOutgoingSelectedApplicationGroup = '';
	        this.newOutgoingSelectedNetwork = '';
	        this.disableOutgoingNetworkSelection = false;
	        this.disableOutgoingApplicationGroupSelection = false;
	        this.disableOutgoingIPAddressSelection = false;
	        this.incorrectCIDR = false;
	        this.validateCIDRFlag = false;
	    };
	    /**
	     * Event handler to disable network selection box once application group is selected while creating a new
	     * rule.
	     */
	    IsolationPolicyDetailsComponent.prototype.onChangeOutgoingApplicationGroupSelection = function (group) {
	        if (group) {
	            //If application group has been selected
	            this.newOutgoingRule.toEndpointGroup = group;
	            this.newOutgoingRule.toNetwork = '';
	            this.disableOutgoingNetworkSelection = true;
	        }
	        else {
	            //When 'none' is selected
	            this.newOutgoingRule.toEndpointGroup = '';
	            this.disableOutgoingNetworkSelection = false;
	        }
	    };
	    /**
	     * Event handler to disable network selection box once application group is selected while creating a new
	     * rule.
	     */
	    IsolationPolicyDetailsComponent.prototype.onChangeIncomingApplicationGroupSelection = function (group) {
	        if (group) {
	            //If application group has been selected
	            this.newIncomingRule.fromEndpointGroup = group;
	            this.newIncomingRule.fromNetwork = '';
	            this.disableIncomingNetworkSelection = true;
	        }
	        else {
	            //When 'none' is selected
	            this.newIncomingRule.fromEndpointGroup = '';
	            this.disableOutgoingApplicationGroupSelection = false;
	            this.disableIncomingNetworkSelection = false;
	        }
	    };
	    /**
	     * Event handler to disable application group selection box once network is selected while creating a new
	     * rule.
	     */
	    IsolationPolicyDetailsComponent.prototype.onChangeOutgoingNetworkSelection = function (network) {
	        if (network) {
	            //If network has been selected
	            this.newOutgoingRule.toNetwork = network;
	            this.newOutgoingRule.ToEndpointGroup = '';
	            this.disableOutgoingApplicationGroupSelection = true;
	            this.disableOutgoingIPAddressSelection = true;
	        }
	        else {
	            this.newOutgoingRule.toIpAddress = '';
	            this.disableOutgoingApplicationGroupSelection = false;
	            this.disableOutgoingIPAddressSelection = false;
	        }
	    };
	    /**
	     * Event handler to disable application group selection box once network is selected while creating a new
	     * rule.
	     */
	    IsolationPolicyDetailsComponent.prototype.onChangeIncomingNetworkSelection = function (network) {
	        if (network) {
	            //If network has been selected
	            this.newIncomingRule.fromNetwork = network;
	            this.newIncomingRule.fromEndpointGroup = '';
	            this.disableIncomingApplicationGroupSelection = true;
	            this.disableIncomingIPAddressSelection = true;
	        }
	        else {
	            this.newIncomingRule.fromNetwork = '';
	            this.disableIncomingApplicationGroupSelection = false;
	            this.disableIncomingIPAddressSelection = false;
	        }
	    };
	    IsolationPolicyDetailsComponent.prototype.onChangeIncomingIPAddress = function () {
	        if (this.newIncomingRule.fromIpAddress == '') {
	            this.incorrectCIDR = false;
	            this.disableIncomingNetworkSelection = false;
	        }
	        else {
	            this.disableIncomingNetworkSelection = true;
	        }
	        if (this.validateCIDRFlag &&
	            this.incorrectCIDR) {
	            this.validateCIDR(this.newIncomingRule.fromIpAddress);
	        }
	    };
	    IsolationPolicyDetailsComponent.prototype.onChangeOutgoingIPAddress = function () {
	        if (this.newOutgoingRule.toIpAddress == '') {
	            this.incorrectCIDR = false;
	            this.disableOutgoingNetworkSelection = false;
	        }
	        else {
	            this.disableOutgoingNetworkSelection = true;
	        }
	        if (this.validateCIDRFlag &&
	            this.incorrectCIDR) {
	            this.validateCIDR(this.newOutgoingRule.toIpAddress);
	        }
	    };
	    /**
	     * Generates rule id
	     * TODO Make it cryptographically stronger once we have multiple users updating same policy
	     */
	    IsolationPolicyDetailsComponent.prototype.generateRuleId = function (rule) {
	        rule.ruleId =
	            (this.incomingRules.length + this.outgoingRules.length + 1).toString() + '-' +
	                Date.now().toString();
	    };
	    /**
	     * Rule is saved to server
	     */
	    IsolationPolicyDetailsComponent.prototype.addIncomingRule = function () {
	        var isolationPolicyDetailsCtrl = this;
	        if (isolationPolicyDetailsCtrl.validateCIDR(isolationPolicyDetailsCtrl.newIncomingRule.fromIpAddress)) {
	            isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.generateRuleId(isolationPolicyDetailsCtrl.newIncomingRule);
	            isolationPolicyDetailsCtrl.newIncomingRule.key = isolationPolicyDetailsCtrl.rulesModel.generateKey(isolationPolicyDetailsCtrl.newIncomingRule);
	            isolationPolicyDetailsCtrl.rulesModel.create(isolationPolicyDetailsCtrl.newIncomingRule, undefined).then(function successCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.incomingRules.push(result);
	                isolationPolicyDetailsCtrl.resetNewIncomingRule();
	            }, function errorCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
	            });
	        }
	    };
	    /**
	     * Rule is saved to server
	     */
	    IsolationPolicyDetailsComponent.prototype.addOutgoingRule = function () {
	        var isolationPolicyDetailsCtrl = this;
	        if (isolationPolicyDetailsCtrl.validateCIDR(isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress)) {
	            isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.generateRuleId(isolationPolicyDetailsCtrl.newOutgoingRule);
	            isolationPolicyDetailsCtrl.newOutgoingRule.key = isolationPolicyDetailsCtrl.rulesModel.generateKey(isolationPolicyDetailsCtrl.newOutgoingRule);
	            isolationPolicyDetailsCtrl.rulesModel.create(isolationPolicyDetailsCtrl.newOutgoingRule, undefined).then(function successCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.outgoingRules.push(result);
	                isolationPolicyDetailsCtrl.resetNewOutgoingRule();
	            }, function errorCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
	            });
	        }
	    };
	    /**
	     * Delete incoming rule from server
	     */
	    IsolationPolicyDetailsComponent.prototype.deleteIncomingRule = function (key) {
	        var isolationPolicyDetailsCtrl = this;
	        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.rulesModel.deleteUsingKey(key, 'key', undefined).then(function successCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            _.remove(isolationPolicyDetailsCtrl.incomingRules, function (n) {
	                return n.key == key;
	            });
	        }, function errorCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
	        });
	    };
	    /**
	     * Delete outgoing rule from server
	     */
	    IsolationPolicyDetailsComponent.prototype.deleteOutgoingRule = function (key) {
	        var isolationPolicyDetailsCtrl = this;
	        isolationPolicyDetailsCtrl.crudHelperService.hideServerError(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.rulesModel.deleteUsingKey(key, 'key', undefined).then(function successCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            _.remove(isolationPolicyDetailsCtrl.outgoingRules, function (n) {
	                return n.key == key;
	            });
	        }, function errorCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showServerError(isolationPolicyDetailsCtrl, result);
	        });
	    };
	    IsolationPolicyDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'isolationpolicydetails',
	            templateUrl: 'network_policies/isolationpolicydetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _c) || Object, (typeof (_d = typeof rulesmodel_1.RulesModel !== 'undefined' && rulesmodel_1.RulesModel) === 'function' && _d) || Object, (typeof (_e = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _e) || Object, (typeof (_f = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _f) || Object, (typeof (_g = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _g) || Object])
	    ], IsolationPolicyDetailsComponent);
	    return IsolationPolicyDetailsComponent;
	    var _a, _b, _c, _d, _e, _f, _g;
	}());
	exports.IsolationPolicyDetailsComponent = IsolationPolicyDetailsComponent;
	

/***/ },

/***/ 171:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var networksmodel_1 = __webpack_require__(45);
	var crudhelperservice_1 = __webpack_require__(9);
	var router_1 = __webpack_require__(5);
	var contivglobals_1 = __webpack_require__(15);
	var NetworkCreateComponent = (function () {
	    function NetworkCreateComponent(router, activatedRoute, networksModel, crudHelperService) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.networksModel = networksModel;
	        this.crudHelperService = crudHelperService;
	        this['showLoader'] = false;
	        this['showServerError'] = false;
	        this['serverErrorMessage'] = '';
	        this['cidrPattern'] = contivglobals_1.ContivGlobals.CIDR_REGEX;
	        this.newNetwork = { networkName: '', encap: 'vxlan', subnet: '', gateway: '', tenantName: 'default', key: '' };
	        this.networkCreateCtrl = this;
	    }
	    NetworkCreateComponent.prototype.returnToNetworks = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    NetworkCreateComponent.prototype.cancelCreating = function () {
	        this.returnToNetworks();
	    };
	    NetworkCreateComponent.prototype.createNetwork = function (formvalid) {
	        debugger;
	        var networkCreateCtrl = this;
	        if (formvalid) {
	            this.crudHelperService.hideServerError(this);
	            this.crudHelperService.startLoader(this);
	            this.newNetwork.key = this.newNetwork.tenantName + ':' + this.newNetwork.networkName;
	            this.networksModel.create(this.newNetwork, undefined)
	                .then(function (result) {
	                networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
	                networkCreateCtrl.returnToNetworks();
	            }, function (error) {
	                networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
	                networkCreateCtrl.crudHelperService.showServerError(networkCreateCtrl, error);
	            });
	        }
	    };
	    NetworkCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'networkcreate',
	            templateUrl: 'networks/networkcreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], NetworkCreateComponent);
	    return NetworkCreateComponent;
	    var _a, _b, _c, _d;
	}());
	exports.NetworkCreateComponent = NetworkCreateComponent;
	

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var networksmodel_1 = __webpack_require__(45);
	var util_1 = __webpack_require__(51);
	var router_1 = __webpack_require__(5);
	var _ = __webpack_require__(26);
	var NetworkdetailsComponent = (function () {
	    function NetworkdetailsComponent(route, router, applicationGroupsModel, networksModel, crudHelperService) {
	        var _this = this;
	        this.route = route;
	        this.router = router;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.networksModel = networksModel;
	        this.crudHelperService = crudHelperService;
	        this.infoselected = true;
	        this.statskey = '';
	        this['showLoader'] = true;
	        this['showServerError'] = false;
	        this['serverErrorMessage'] = '';
	        this.network = { networkName: '', encap: '', subnet: '', gateway: '' };
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getApplicationGroups(true);
	        });
	        this.networkDetailsCtrl = this;
	    }
	    NetworkdetailsComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.statskey = this.route.snapshot.params['key'];
	        this.getNetworksModel(false);
	    };
	    NetworkdetailsComponent.prototype.getApplicationGroups = function (reload) {
	        var networkDetailsCtrl = this;
	        if (!util_1.isUndefined(networkDetailsCtrl['network'])) {
	            this.applicationGroupsModel.get(reload)
	                .then(function successCallback(result) {
	                networkDetailsCtrl['applicationGroups'] = _.filter(result, { 'networkName': networkDetailsCtrl['network'].networkName });
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	            }, function errorCallback(result) {
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	            });
	        }
	    };
	    NetworkdetailsComponent.prototype.getNetworksModel = function (reload) {
	        var networkDetailsCtrl = this;
	        this.networksModel.getModelByKey(this.route.snapshot.params['key'], reload, 'key')
	            .then(function (result) {
	            networkDetailsCtrl['network'] = result;
	            networkDetailsCtrl.getApplicationGroups(false);
	        }, function (error) {
	            networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	        });
	    };
	    NetworkdetailsComponent.prototype.deleteNetwork = function () {
	        var networkDetailsCtrl = this;
	        this.crudHelperService.hideServerError(networkDetailsCtrl);
	        this.crudHelperService.startLoader(networkDetailsCtrl);
	        if (!util_1.isUndefined(networkDetailsCtrl['network'])) {
	            this.networksModel.delete(networkDetailsCtrl['network'])
	                .then(function (result) {
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	                networkDetailsCtrl.returnToNetworks();
	            }, function (error) {
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	                networkDetailsCtrl.crudHelperService.showServerError(networkDetailsCtrl, error);
	            });
	        }
	    };
	    NetworkdetailsComponent.prototype.returnToNetworks = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.route });
	    };
	    NetworkdetailsComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    NetworkdetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'networkdetails',
	            templateUrl: "networks/networkdetails.html"
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _c) || Object, (typeof (_d = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], NetworkdetailsComponent);
	    return NetworkdetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NetworkdetailsComponent = NetworkdetailsComponent;
	

/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var networksmodel_1 = __webpack_require__(45);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var router_1 = __webpack_require__(5);
	var NetworkListComponent = (function () {
	    function NetworkListComponent(router, activatedRoute, networksModel, crudHelperService) {
	        var _this = this;
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.networksModel = networksModel;
	        this.crudHelperService = crudHelperService;
	        this.networkListComp = this;
	        this['showLoader'] = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getNetworks(true);
	        });
	    }
	    NetworkListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getNetworks(false);
	    };
	    NetworkListComponent.prototype.getNetworks = function (reload) {
	        var networkListComp = this;
	        this.networksModel.get(reload)
	            .then(function successCallback(result) {
	            networkListComp['networks'] = result;
	            networkListComp.crudHelperService.stopLoader(networkListComp);
	        }, function errorCallback(result) {
	            networkListComp.crudHelperService.stopLoader(networkListComp);
	        });
	    };
	    NetworkListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    NetworkListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    NetworkListComponent = __decorate([
	        core_1.Component({
	            selector: 'networkList',
	            template: __webpack_require__(466)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], NetworkListComponent);
	    return NetworkListComponent;
	    var _a, _b, _c, _d;
	}());
	exports.NetworkListComponent = NetworkListComponent;
	

/***/ },

/***/ 174:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var organizationsmodel_1 = __webpack_require__(66);
	var OrganizationCreateComponent = (function () {
	    function OrganizationCreateComponent(activatedRoute, router, crudHelperService, organizationsModel, ngZone) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.organizationsModel = organizationsModel;
	        this.ngZone = ngZone;
	        this.newOrganization = { key: '', tenantName: '' };
	        this.showServerError = false;
	        this.serverErrorMessage = '';
	        this.showLoader = false;
	        this.organizationCreateCtrl = this;
	    }
	    OrganizationCreateComponent.prototype.returnToOrganizations = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    OrganizationCreateComponent.prototype.cancelCreating = function () {
	        this.returnToOrganizations();
	    };
	    OrganizationCreateComponent.prototype.createOrganization = function (formvalid) {
	        var organizationCreateCtrl = this;
	        if (formvalid) {
	            this.crudHelperService.startLoader(this);
	            this.crudHelperService.hideServerError(this);
	            organizationCreateCtrl.newOrganization.key = organizationCreateCtrl.newOrganization.tenantName;
	            this.organizationsModel.create(organizationCreateCtrl.newOrganization, undefined)
	                .then(function (result) {
	                organizationCreateCtrl.ngZone.run(function () {
	                    organizationCreateCtrl.crudHelperService.stopLoader(organizationCreateCtrl);
	                });
	                organizationCreateCtrl.returnToOrganizations();
	            }, function (error) {
	                organizationCreateCtrl.ngZone.run(function () {
	                    organizationCreateCtrl.crudHelperService.stopLoader(organizationCreateCtrl);
	                });
	                organizationCreateCtrl.crudHelperService.showServerError(organizationCreateCtrl, error);
	            });
	        }
	    };
	    OrganizationCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'organizationcreate',
	            templateUrl: 'organizations/organizationcreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], OrganizationCreateComponent);
	    return OrganizationCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.OrganizationCreateComponent = OrganizationCreateComponent;
	

/***/ },

/***/ 175:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var organizationsmodel_1 = __webpack_require__(66);
	var OrganizationDetailsComponent = (function () {
	    function OrganizationDetailsComponent(activatedRoute, router, crudHelperService, organizationsModel, ngZone) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.organizationsModel = organizationsModel;
	        this.ngZone = ngZone;
	        this.showServerError = false;
	        this.serverErrorMessage = '';
	        this.showLoader = false;
	        this.organization = { tenantName: '' };
	        this.organizationDetailsCtrl = this;
	    }
	    OrganizationDetailsComponent.prototype.ngOnInit = function () {
	        this.showLoader = true;
	        var organizationDetailsCtrl = this;
	        this.organizationsModel.getModelByKey(this.activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function (result) {
	            organizationDetailsCtrl.organization = result;
	            organizationDetailsCtrl.ngZone.run(function () {
	                organizationDetailsCtrl.showLoader = false;
	            });
	        }, function (error) {
	            organizationDetailsCtrl.ngZone.run(function () {
	                organizationDetailsCtrl.showLoader = false;
	            });
	        });
	    };
	    OrganizationDetailsComponent.prototype.returnToOrganization = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    OrganizationDetailsComponent.prototype.deleteOrganization = function () {
	        var organizationDetailsCtrl = this;
	        this.crudHelperService.hideServerError(this);
	        this.showLoader = true;
	        this.organizationsModel.delete(this.organization)
	            .then(function (result) {
	            organizationDetailsCtrl.showLoader = false;
	            organizationDetailsCtrl.returnToOrganization();
	        }, function (error) {
	            organizationDetailsCtrl.showLoader = false;
	            organizationDetailsCtrl.crudHelperService.showServerError(organizationDetailsCtrl, error);
	        });
	    };
	    OrganizationDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'organizationdetails',
	            templateUrl: 'organizations/organizationdetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], OrganizationDetailsComponent);
	    return OrganizationDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.OrganizationDetailsComponent = OrganizationDetailsComponent;
	

/***/ },

/***/ 176:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var organizationsmodel_1 = __webpack_require__(66);
	var OrganizationListComponent = (function () {
	    function OrganizationListComponent(activatedRoute, router, organizationsModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.crudHelperService = crudHelperService;
	        this.organizationsListCtrl = this;
	        this['showLoader'] = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getOrganizations(true);
	        });
	    }
	    OrganizationListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getOrganizations(false);
	    };
	    OrganizationListComponent.prototype.getOrganizations = function (reload) {
	        var organizationsListCtrl = this;
	        this.organizationsModel.get(reload)
	            .then(function successCallback(result) {
	            organizationsListCtrl['organizations'] = result;
	            organizationsListCtrl.ngZone.run(function () {
	                organizationsListCtrl.crudHelperService.stopLoader(organizationsListCtrl);
	            });
	        }, function errorCallback(result) {
	            organizationsListCtrl.ngZone.run(function () {
	                organizationsListCtrl.crudHelperService.stopLoader(organizationsListCtrl);
	            });
	        });
	    };
	    OrganizationListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    OrganizationListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    OrganizationListComponent = __decorate([
	        core_1.Component({
	            selector: 'organizationlist',
	            templateUrl: 'organizations/organizationlist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], OrganizationListComponent);
	    return OrganizationListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.OrganizationListComponent = OrganizationListComponent;
	

/***/ },

/***/ 177:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var servicelbsmodel_1 = __webpack_require__(74);
	var networksmodel_1 = __webpack_require__(45);
	var router_1 = __webpack_require__(5);
	var _ = __webpack_require__(26);
	var ServicelbCreateComponent = (function () {
	    function ServicelbCreateComponent(router, activatedRoute, servicelbsModel, crudHelperService, networksModel) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.servicelbsModel = servicelbsModel;
	        this.networksModel = networksModel;
	        this.crudHelperService = crudHelperService;
	        this['showLoader'] = true;
	        this.servicelb = { serviceName: '', networkName: '', ipAddress: '', selectors: [], ports: [], tenantName: 'default', key: '' };
	        this.networks = [];
	        this.labelSelectors = [];
	        this.servicelbCreateCtrl = this;
	    }
	    ServicelbCreateComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getNetworks(false);
	    };
	    ServicelbCreateComponent.prototype.getNetworks = function (reload) {
	        var servicelbCreateCtrl = this;
	        this.networksModel.get(reload)
	            .then(function (result) {
	            servicelbCreateCtrl.networks = _.filter(result, { 'tenantName': 'default' });
	            servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	        }, function (error) {
	            servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	        });
	    };
	    ServicelbCreateComponent.prototype.createServicelb = function (formvalid) {
	        var _this = this;
	        debugger;
	        var servicelbCreateCtrl = this;
	        this.createLabelSelectorStrings();
	        if (formvalid) {
	            this.crudHelperService.hideServerError(this);
	            this.crudHelperService.startLoader(this);
	            this.servicelb.key = this.servicelb.tenantName + ':' + this.servicelb.serviceName;
	            this.servicelbsModel.create(this.servicelb, undefined).then(function (result) {
	                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	                _this.returnToServicelbs();
	            }, function (error) {
	                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	                servicelbCreateCtrl.crudHelperService.showServerError(servicelbCreateCtrl, error);
	            });
	        }
	    };
	    ServicelbCreateComponent.prototype.cancelCreating = function () {
	        this.returnToServicelbs();
	    };
	    ServicelbCreateComponent.prototype.returnToServicelbs = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    ServicelbCreateComponent.prototype.createLabelSelectorStrings = function () {
	        var _this = this;
	        this.labelSelectors.forEach(function (labelSelector) {
	            var selectorString = labelSelector.name + '=' + labelSelector.value;
	            _this.servicelb.selectors.push(selectorString);
	        });
	    };
	    ServicelbCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'servicelbCreate',
	            templateUrl: 'service_lbs/servicelbcreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _e) || Object])
	    ], ServicelbCreateComponent);
	    return ServicelbCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.ServicelbCreateComponent = ServicelbCreateComponent;
	

/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var servicelbinfoctrl_1 = __webpack_require__(179);
	var servicelbstatsctrl_1 = __webpack_require__(181);
	var router_1 = __webpack_require__(5);
	var _ = __webpack_require__(26);
	var ServicelbDetailsComponent = (function () {
	    function ServicelbDetailsComponent(router, activatedRoute) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.infoselected = true;
	        this.statskey = '';
	        this.mode = 'details';
	        this.serviceName = '';
	        this.servicelbDetailsCtrl = this;
	    }
	    ServicelbDetailsComponent.prototype.ngOnInit = function () {
	        this.statskey = this.activatedRoute.snapshot.params['key'];
	    };
	    ServicelbDetailsComponent.prototype.returnToServicelbs = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    ServicelbDetailsComponent.prototype.loadDetails = function () {
	        this.mode = "details";
	    };
	    ServicelbDetailsComponent.prototype.loadEdit = function () {
	        this.mode = "edit";
	    };
	    ServicelbDetailsComponent.prototype.deleteServicelb = function () {
	        this.servielbInfo.deleteServicelb();
	    };
	    __decorate([
	        core_1.ViewChild(servicelbinfoctrl_1.ServicelbInfoComponent), 
	        __metadata('design:type', (typeof (_a = typeof servicelbinfoctrl_1.ServicelbInfoComponent !== 'undefined' && servicelbinfoctrl_1.ServicelbInfoComponent) === 'function' && _a) || Object)
	    ], ServicelbDetailsComponent.prototype, "servielbInfo", void 0);
	    __decorate([
	        core_1.ViewChild(servicelbstatsctrl_1.ServicelbStatComponent), 
	        __metadata('design:type', (typeof (_b = typeof servicelbinfoctrl_1.ServicelbInfoComponent !== 'undefined' && servicelbinfoctrl_1.ServicelbInfoComponent) === 'function' && _b) || Object)
	    ], ServicelbDetailsComponent.prototype, "servielbStat", void 0);
	    ServicelbDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'servicelbDetails',
	            templateUrl: "service_lbs/servicelbdetails.html"
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object])
	    ], ServicelbDetailsComponent);
	    return ServicelbDetailsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ServicelbDetailsComponent = ServicelbDetailsComponent;
	

/***/ },

/***/ 179:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var servicelbsmodel_1 = __webpack_require__(74);
	var router_1 = __webpack_require__(5);
	var _ = __webpack_require__(26);
	var ServicelbInfoComponent = (function () {
	    function ServicelbInfoComponent(router, activatedRoute, servicelbsModel, crudHelperService, ngZone) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.servicelbsModel = servicelbsModel;
	        this.crudHelperService = crudHelperService;
	        this.infoselected = true;
	        this.statskey = '';
	        this.showLoader = true;
	        this['showServerError'] = false;
	        this['serverErrorMessage'] = '';
	        this.mode = 'details';
	        this.servicelb = { serviceName: '', networkName: '', ipAddress: '', selectors: [], ports: [], tenantName: 'default', key: '' };
	        this.labelSelectors = [];
	        this.modeChange = new core_1.EventEmitter();
	        this.serviceName = new core_1.EventEmitter();
	        this.ngZone = ngZone;
	        this.servicelbInfoCtrl = this;
	    }
	    ServicelbInfoComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.statskey = this.activatedRoute.snapshot.params['key'];
	        this.getServicelbs(false);
	    };
	    ServicelbInfoComponent.prototype.returnToServicelbDetails = function () {
	        this.mode = "details";
	        this.modeChange.emit(this.mode);
	    };
	    ServicelbInfoComponent.prototype.returnToServicelbs = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    ServicelbInfoComponent.prototype.getServicelbs = function (reload) {
	        var servicelbInfoCtrl = this;
	        this.servicelbsModel.getModelByKey(this.statskey, false, 'key')
	            .then(function (result) {
	            servicelbInfoCtrl['servicelb'] = result;
	            servicelbInfoCtrl.createEditViewLabels();
	            servicelbInfoCtrl.serviceName.emit(servicelbInfoCtrl.servicelb.serviceName);
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	            });
	        }, function (error) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	            });
	        });
	    };
	    ServicelbInfoComponent.prototype.createEditViewLabels = function () {
	        var _this = this;
	        this.servicelb.selectors.forEach(function (item) {
	            var selector = {
	                name: item.split('=')[0],
	                value: item.split('=')[1]
	            };
	            _this.labelSelectors.push(selector);
	        });
	    };
	    ServicelbInfoComponent.prototype.createLabelSelectorStrings = function () {
	        var _this = this;
	        var servicelbInfoCtrl = this;
	        this.servicelb.selectors = [];
	        this.labelSelectors.forEach(function (selector) {
	            var selectorString = selector.name + "=" + selector.value;
	            _this.servicelb.selectors.push(selectorString);
	        });
	    };
	    ServicelbInfoComponent.prototype.saveServicelb = function () {
	        this.crudHelperService.hideServerError(this);
	        this.crudHelperService.startLoader(this);
	        var existingLabelsView = this.servicelb.selectors.slice();
	        this.createLabelSelectorStrings();
	        var servicelbInfoCtrl = this;
	        this.servicelbsModel.save(this.servicelb)
	            .then(function (result) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	            });
	            servicelbInfoCtrl.returnToServicelbDetails();
	        }, function (error) {
	            servicelbInfoCtrl.servicelb.selectors = existingLabelsView;
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	                servicelbInfoCtrl.crudHelperService.showServerError(servicelbInfoCtrl, error);
	            });
	        });
	    };
	    ServicelbInfoComponent.prototype.deleteServicelb = function () {
	        this.crudHelperService.hideServerError(this);
	        this.crudHelperService.startLoader(this);
	        var servicelbInfoCtrl = this;
	        this.servicelbsModel.delete(this.servicelb)
	            .then(function (result) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	            });
	            servicelbInfoCtrl.returnToServicelbs();
	        }, function (error) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	                servicelbInfoCtrl.crudHelperService.showServerError(servicelbInfoCtrl, error);
	            });
	        });
	    };
	    ServicelbInfoComponent.prototype.cancelEditing = function () {
	        this.returnToServicelbDetails();
	    };
	    __decorate([
	        core_1.Input('mode'), 
	        __metadata('design:type', String)
	    ], ServicelbInfoComponent.prototype, "mode", void 0);
	    __decorate([
	        core_1.Output('modeChange'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], ServicelbInfoComponent.prototype, "modeChange", void 0);
	    __decorate([
	        core_1.Output('serviceName'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], ServicelbInfoComponent.prototype, "serviceName", void 0);
	    ServicelbInfoComponent = __decorate([
	        core_1.Component({
	            selector: 'servicelb-info',
	            templateUrl: "service_lbs/servicelbinfo.html"
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object, (typeof (_e = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object, (typeof (_g = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _g) || Object])
	    ], ServicelbInfoComponent);
	    return ServicelbInfoComponent;
	    var _a, _b, _c, _d, _e, _f, _g;
	}());
	exports.ServicelbInfoComponent = ServicelbInfoComponent;
	

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var servicelbsmodel_1 = __webpack_require__(74);
	var router_1 = __webpack_require__(5);
	var ServicelbListComponent = (function () {
	    function ServicelbListComponent(router, route, servicelbsModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.router = router;
	        this.route = route;
	        this.ngZone = ngZone;
	        this.servicelbsModel = servicelbsModel;
	        this.crudHelperService = crudHelperService;
	        this.servicelbListCtrl = this;
	        this['showLoader'] = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getServicelbs(true);
	        });
	    }
	    ServicelbListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getServicelbs(false);
	    };
	    ServicelbListComponent.prototype.getServicelbs = function (reload) {
	        var servicelbListCtrl = this;
	        this.servicelbsModel.get(reload)
	            .then(function successCallback(result) {
	            servicelbListCtrl['servicelbs'] = result;
	            servicelbListCtrl.ngZone.run(function () {
	                servicelbListCtrl.crudHelperService.stopLoader(servicelbListCtrl);
	            });
	        }, function errorCallback(result) {
	            servicelbListCtrl.ngZone.run(function () {
	                servicelbListCtrl.crudHelperService.stopLoader(servicelbListCtrl);
	            });
	        });
	    };
	    ServicelbListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.route });
	    };
	    ServicelbListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    ServicelbListComponent = __decorate([
	        core_1.Component({
	            selector: 'servicelbList',
	            templateUrl: 'service_lbs/servicelblist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], ServicelbListComponent);
	    return ServicelbListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.ServicelbListComponent = ServicelbListComponent;
	

/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var inspectservice_1 = __webpack_require__(93);
	var util_1 = __webpack_require__(51);
	var servicelbsmodel_1 = __webpack_require__(74);
	var contivglobals_1 = __webpack_require__(15);
	var ServicelbStatComponent = (function () {
	    function ServicelbStatComponent(servicelbsModel, crudHelperService, inspectSerrvice, ngZone) {
	        var _this = this;
	        this.crudHelperService = crudHelperService;
	        this.servicelbsModel = servicelbsModel;
	        this.inspectSerrvice = inspectSerrvice;
	        this.showLoader = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            if (_this.statkey != '')
	                _this.getServicelbInspect(true);
	        });
	        this.servicelbInspectStats = {
	            allocatedAddressesCount: '',
	            allocatedIPAddresses: '',
	            dnsServerIP: '',
	            externalPktTag: '',
	            numEndpoints: '',
	            pktTag: ''
	        };
	        this.config = { serviceName: '', };
	        this.providers = [];
	        this.filteredproviders = [];
	        this.providerDetails = {};
	        this.ngZone = ngZone;
	        this.servicelbStatsCtrl = this;
	        this.statkey = '';
	    }
	    ServicelbStatComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        if (this.statkey != '')
	            this.getServicelbInspect(false);
	    };
	    ServicelbStatComponent.prototype.getServicelbInspect = function (reload) {
	        var servicelbStatsCtrl = this;
	        this.servicelbsModel.getInspectByKey(this.statkey, contivglobals_1.ContivGlobals.SERVICELBS_INSPECT_ENDPOINT, reload)
	            .then(function (result) {
	            servicelbStatsCtrl['servicelbInspectStats'] = result['Oper'];
	            servicelbStatsCtrl['config'] = result['Config'];
	            if (!util_1.isUndefined(result['Oper'].providers)) {
	                var providerDetails = servicelbStatsCtrl.inspectSerrvice.buildEndPoints(result['Oper'].providers);
	                if (servicelbStatsCtrl.inspectSerrvice.checkContainerChanged(servicelbStatsCtrl['providerDetails'], providerDetails)) {
	                    servicelbStatsCtrl['providers'] = result['Oper'].providers;
	                    servicelbStatsCtrl['providerDetails'] = providerDetails;
	                }
	            }
	            else {
	                servicelbStatsCtrl['providers'] = [];
	                servicelbStatsCtrl['providerDetails'] = {};
	            }
	            servicelbStatsCtrl.ngZone.run(function () {
	                servicelbStatsCtrl.crudHelperService.stopLoader(servicelbStatsCtrl);
	            });
	        }, function (error) {
	            servicelbStatsCtrl.ngZone.run(function () {
	                servicelbStatsCtrl.crudHelperService.stopLoader(servicelbStatsCtrl);
	            });
	        });
	    };
	    ServicelbStatComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    __decorate([
	        core_1.Input('statkey'), 
	        __metadata('design:type', String)
	    ], ServicelbStatComponent.prototype, "statkey", void 0);
	    ServicelbStatComponent = __decorate([
	        core_1.Component({
	            selector: 'servicelb-stat',
	            templateUrl: 'service_lbs/servicelbstats.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], ServicelbStatComponent);
	    return ServicelbStatComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ServicelbStatComponent = ServicelbStatComponent;
	

/***/ },

/***/ 182:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var networkservice_1 = __webpack_require__(116);
	var nodesservice_1 = __webpack_require__(117);
	var NetworkSettingsComponent = (function () {
	    function NetworkSettingsComponent(crudHelperService, networkService, nodesService) {
	        this.crudHelperService = crudHelperService;
	        this.networkService = networkService;
	        this.nodesService = nodesService;
	        this.setting = {};
	        this['showLoader'] = true;
	        this['showServerError'] = false;
	        this['serverErrorMessage'] = '';
	        this.extra_vars = {};
	        var networkSettingCtrl = this;
	        function getNetworkSettings() {
	            networkSettingCtrl.networkService.getSettings().then(function successCallback(result) {
	                networkSettingCtrl.setting = result;
	                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            }, function errorCallback(result) {
	                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            });
	        }
	        getNetworkSettings();
	        nodesService.getSettings(networkSettingCtrl)
	            .then(function (result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	        });
	        this.networkSettingCtrl = this;
	    }
	    NetworkSettingsComponent.prototype.updateNetworkSettings = function (settings) {
	        var networkSettingCtrl = this;
	        networkSettingCtrl.crudHelperService.hideServerError(networkSettingCtrl);
	        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
	        networkSettingCtrl.networkService.updateSettings(networkSettingCtrl.setting).then(function successCallback(result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	        }, function errorCallback(result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            networkSettingCtrl.crudHelperService.showServerError(networkSettingCtrl, result._body);
	        });
	    };
	    NetworkSettingsComponent.prototype.updateAciSetting = function (extra_vars) {
	        var networkSettingCtrl = this;
	        networkSettingCtrl.crudHelperService.hideServerError(networkSettingCtrl);
	        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
	        networkSettingCtrl.nodesService.cleanupExtraVars(networkSettingCtrl);
	        networkSettingCtrl.nodesService.createExtraVars(networkSettingCtrl);
	        networkSettingCtrl.nodesService.updateSettings(extra_vars)
	            .then(function (result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	        }, function (error) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            networkSettingCtrl.crudHelperService.showServerError(networkSettingCtrl, error._body);
	        });
	    };
	    NetworkSettingsComponent = __decorate([
	        core_1.Component({
	            selector: 'networksetting',
	            templateUrl: 'settings/networksettings.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _a) || Object, (typeof (_b = typeof networkservice_1.NetworkService !== 'undefined' && networkservice_1.NetworkService) === 'function' && _b) || Object, (typeof (_c = typeof nodesservice_1.NodesService !== 'undefined' && nodesservice_1.NodesService) === 'function' && _c) || Object])
	    ], NetworkSettingsComponent);
	    return NetworkSettingsComponent;
	    var _a, _b, _c;
	}());
	exports.NetworkSettingsComponent = NetworkSettingsComponent;
	

/***/ },

/***/ 183:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var bgpsmodel_1 = __webpack_require__(91);
	var NodeCreateComponent = (function () {
	    function NodeCreateComponent(activatedRoute, router, crudHelperService, bgpsModel, ngZone) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.bgpsModel = bgpsModel;
	        this.ngZone = ngZone;
	        this.newNode = {};
	        var component = this;
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            crudHelperService.hideServerError(component);
	            component.newNode = {
	                "key": "",
	                "hostname": "",
	                "routerip": "",
	                "as": 0,
	                "neighbor": "",
	                "neighbor-as": 0
	            };
	        }
	        resetForm();
	    }
	    NodeCreateComponent.prototype.returnToNodes = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    NodeCreateComponent.prototype.cancelCreating = function () {
	        this.returnToNodes();
	    };
	    NodeCreateComponent.prototype.createNode = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            this.crudHelperService.startLoader(this);
	            this.crudHelperService.hideServerError(this);
	            component.newNode.key = component.newNode.hostname;
	            this.bgpsModel.create(component.newNode, undefined)
	                .then(function (result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.returnToNodes();
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError(component, error);
	            });
	        }
	    };
	    NodeCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'nodecreate',
	            templateUrl: 'settings/nodes/nodecreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], NodeCreateComponent);
	    return NodeCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeCreateComponent = NodeCreateComponent;
	

/***/ },

/***/ 184:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var bgpsmodel_1 = __webpack_require__(91);
	var NodeDetailsComponent = (function () {
	    function NodeDetailsComponent(activatedRoute, router, ngZone, bgpsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.bgpsModel = bgpsModel;
	        this.crudHelperService = crudHelperService;
	        this.node = {};
	        this.mode = 'details';
	        var component = this;
	        /**
	         * To show edit or details screen based on the route
	         */
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                component.mode = 'edit';
	            }
	            else {
	                component.mode = 'details';
	            }
	        }
	        component.crudHelperService.stopLoader(component);
	        component.crudHelperService.hideServerError(component);
	        component.bgpsModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function successCallBack(node) {
	            component.node = node;
	        });
	        setMode();
	    }
	    NodeDetailsComponent.prototype.returnToNode = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    NodeDetailsComponent.prototype.returnToNodeDetails = function () {
	        this.router.navigate(['../../details', this.node.key], { relativeTo: this.activatedRoute });
	    };
	    NodeDetailsComponent.prototype.editNode = function () {
	        this.router.navigate(['../../edit', this.node.key], { relativeTo: this.activatedRoute });
	    };
	    NodeDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToNodeDetails();
	    };
	    NodeDetailsComponent.prototype.deleteNode = function () {
	        var component = this;
	        component.crudHelperService.hideServerError(component);
	        component.crudHelperService.startLoader(component);
	        component.bgpsModel.delete(component.node).then(function successCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.returnToNode();
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showServerError(component, result);
	        });
	    };
	    NodeDetailsComponent.prototype.saveNode = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            component.crudHelperService.hideServerError(component);
	            component.crudHelperService.startLoader(component);
	            component.bgpsModel.save(component.node).then(function successCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.returnToNodeDetails();
	            }, function errorCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError(component, result);
	            });
	        }
	    };
	    NodeDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'nodedetails',
	            templateUrl: 'settings/nodes/nodedetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], NodeDetailsComponent);
	    return NodeDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeDetailsComponent = NodeDetailsComponent;
	

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var bgpsmodel_1 = __webpack_require__(91);
	var NodeListComponent = (function () {
	    function NodeListComponent(activatedRoute, router, bgpsModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.bgpsModel = bgpsModel;
	        this.crudHelperService = crudHelperService;
	        this.ngZone = ngZone;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getNodes(true);
	        });
	    }
	    NodeListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getNodes(false);
	    };
	    NodeListComponent.prototype.getNodes = function (reload) {
	        var component = this;
	        this.bgpsModel.get(reload)
	            .then(function successCallback(result) {
	            component['nodes'] = result;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    NodeListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    NodeListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    NodeListComponent = __decorate([
	        core_1.Component({
	            selector: 'nodelist',
	            templateUrl: 'settings/nodes/nodelist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], NodeListComponent);
	    return NodeListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeListComponent = NodeListComponent;
	

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/3/16.
	 */
	var core_1 = __webpack_require__(2);
	var SettingsMenuComponent = (function () {
	    function SettingsMenuComponent() {
	    }
	    SettingsMenuComponent = __decorate([
	        core_1.Component({
	            selector: 'settingsmenu',
	            templateUrl: 'settings/settingsmenu.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SettingsMenuComponent);
	    return SettingsMenuComponent;
	}());
	exports.SettingsMenuComponent = SettingsMenuComponent;
	

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var usersmodel_1 = __webpack_require__(92);
	var organizationsmodel_1 = __webpack_require__(66);
	var UserCreateComponent = (function () {
	    function UserCreateComponent(activatedRoute, router, crudHelperService, usersModel, organizationsModel, ngZone) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.usersModel = usersModel;
	        this.organizationsModel = organizationsModel;
	        this.ngZone = ngZone;
	        this.newUser = {};
	        this.organizations = [];
	        var component = this;
	        /**
	         * Get organizations.
	         */
	        function getOrganizations() {
	            organizationsModel.get(false).then(function (result) {
	                component.organizations = result;
	            });
	        }
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            crudHelperService.hideServerError(component);
	            component.newUser = {
	                userName: '',
	                firstName: '',
	                lastName: '',
	                role: 'DevOps',
	                enabled: false,
	                tenantName: 'default' //TODO: Remove hardcoded tenant.
	            };
	        }
	        getOrganizations();
	        resetForm();
	    }
	    UserCreateComponent.prototype.returnToUsers = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    UserCreateComponent.prototype.cancelCreating = function () {
	        this.returnToUsers();
	    };
	    UserCreateComponent.prototype.createUser = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            this.crudHelperService.startLoader(this);
	            this.crudHelperService.hideServerError(this);
	            component.newUser.key = this.usersModel.generateKey(this.newUser);
	            this.usersModel.create(component.newUser, undefined)
	                .then(function (result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.returnToUsers();
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError(component, error);
	            });
	        }
	    };
	    UserCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'usercreate',
	            templateUrl: 'settings/users/usercreate.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _d) || Object, (typeof (_e = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _e) || Object, (typeof (_f = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _f) || Object])
	    ], UserCreateComponent);
	    return UserCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.UserCreateComponent = UserCreateComponent;
	

/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var usersmodel_1 = __webpack_require__(92);
	var crudhelperservice_1 = __webpack_require__(9);
	var organizationsmodel_1 = __webpack_require__(66);
	var UserDetailsComponent = (function () {
	    function UserDetailsComponent(activatedRoute, router, ngZone, usersModel, organizationsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.usersModel = usersModel;
	        this.organizationsModel = organizationsModel;
	        this.crudHelperService = crudHelperService;
	        this.user = {};
	        this.organizations = [];
	        this.mode = 'details';
	        var component = this;
	        /**
	         * To show edit or details screen based on the route
	         */
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                component.mode = 'edit';
	            }
	            else {
	                component.mode = 'details';
	            }
	        }
	        /**
	         * Get organizations.
	         */
	        function getOrganizations() {
	            organizationsModel.get(false).then(function (result) {
	                component.organizations = result;
	            });
	        }
	        component.crudHelperService.stopLoader(component);
	        component.crudHelperService.hideServerError(component);
	        component.usersModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function (user) {
	            component.user = user;
	        });
	        getOrganizations();
	        setMode();
	    }
	    UserDetailsComponent.prototype.returnToUser = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    UserDetailsComponent.prototype.returnToUserDetails = function () {
	        this.router.navigate(['../../details', this.user.key], { relativeTo: this.activatedRoute });
	    };
	    UserDetailsComponent.prototype.editUser = function () {
	        this.router.navigate(['../../edit', this.user.key], { relativeTo: this.activatedRoute });
	    };
	    UserDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToUserDetails();
	    };
	    UserDetailsComponent.prototype.deleteUser = function () {
	        var component = this;
	        component.crudHelperService.hideServerError(component);
	        component.crudHelperService.startLoader(component);
	        component.usersModel.delete(component.user).then(function successCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.returnToUser();
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showServerError(component, result);
	        });
	    };
	    UserDetailsComponent.prototype.saveUser = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            component.crudHelperService.hideServerError(component);
	            component.crudHelperService.startLoader(component);
	            component.usersModel.save(component.user).then(function successCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.returnToUserDetails();
	            }, function errorCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError(component, result);
	            });
	        }
	    };
	    UserDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'userdetails',
	            templateUrl: 'settings/users/userdetails.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _d) || Object, (typeof (_e = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object])
	    ], UserDetailsComponent);
	    return UserDetailsComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.UserDetailsComponent = UserDetailsComponent;
	

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var usersmodel_1 = __webpack_require__(92);
	var UserListComponent = (function () {
	    function UserListComponent(activatedRoute, router, usersModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.usersModel = usersModel;
	        this.crudHelperService = crudHelperService;
	        this.ngZone = ngZone;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getUsers(true);
	        });
	    }
	    UserListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getUsers(false);
	    };
	    UserListComponent.prototype.getUsers = function (reload) {
	        var component = this;
	        this.usersModel.get(reload)
	            .then(function successCallback(result) {
	            component['users'] = result;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    UserListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    UserListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    UserListComponent = __decorate([
	        core_1.Component({
	            selector: 'userlist',
	            templateUrl: 'settings/users/userlist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], UserListComponent);
	    return UserListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.UserListComponent = UserListComponent;
	

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/1/16.
	 */
	var core_1 = __webpack_require__(2);
	var AppComponent = (function () {
	    function AppComponent() {
	    }
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'ccn-app',
	            template: "<router-outlet></router-outlet>"
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;
	

/***/ },

/***/ 263:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/6/16.
	 */
	var core_1 = __webpack_require__(2);
	var platform_browser_1 = __webpack_require__(89);
	var http_1 = __webpack_require__(19);
	var common_1 = __webpack_require__(18);
	var dashboard_module_1 = __webpack_require__(282);
	var networkpolicies_module_1 = __webpack_require__(292);
	var applicationgroups_module_ts_1 = __webpack_require__(266);
	var settings_module_1 = __webpack_require__(299);
	var network_module_1 = __webpack_require__(293);
	var servicelb_module_1 = __webpack_require__(297);
	var appprofile_module_1 = __webpack_require__(271);
	var organization_module_1 = __webpack_require__(296);
	var users_module_1 = __webpack_require__(300);
	var netprofilesmodel_1 = __webpack_require__(73);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var networksmodel_1 = __webpack_require__(45);
	var organizationsmodel_1 = __webpack_require__(66);
	var policiesmodel_1 = __webpack_require__(67);
	var rulesmodel_1 = __webpack_require__(115);
	var servicelbsmodel_1 = __webpack_require__(74);
	var usersmodel_1 = __webpack_require__(92);
	var appprofilesmodel_1 = __webpack_require__(90);
	var bgpsmodel_1 = __webpack_require__(91);
	var crudhelperservice_1 = __webpack_require__(9);
	var inspectservice_1 = __webpack_require__(93);
	var networkservice_1 = __webpack_require__(116);
	var nodesservice_1 = __webpack_require__(117);
	var menu_module_1 = __webpack_require__(289);
	var app_component_1 = __webpack_require__(262);
	var app_routes_ts_1 = __webpack_require__(264);
	var login_module_1 = __webpack_require__(288);
	var authservice_1 = __webpack_require__(68);
	var authguard_1 = __webpack_require__(160);
	var apiservice_1 = __webpack_require__(31);
	var firstrunwizard_module_1 = __webpack_require__(285);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    AppModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                platform_browser_1.BrowserModule,
	                http_1.HttpModule,
	                app_routes_ts_1.default,
	                menu_module_1.MenuModule,
	                dashboard_module_1.DashboardModule,
	                networkpolicies_module_1.NetworkPoliciesModule,
	                applicationgroups_module_ts_1.ApplicationGroupsModule,
	                settings_module_1.SettingsModule,
	                network_module_1.NetworkModule,
	                servicelb_module_1.ServicelbModule,
	                appprofile_module_1.AppProfilesModule,
	                organization_module_1.OrganizationModule,
	                login_module_1.LoginModule,
	                users_module_1.UsersModule,
	                firstrunwizard_module_1.FirstrunWizardModule
	            ],
	            declarations: [
	                app_component_1.AppComponent
	            ],
	            providers: [
	                applicationgroupsmodel_1.ApplicationGroupsModel,
	                netprofilesmodel_1.NetprofilesModel,
	                networksmodel_1.NetworksModel,
	                organizationsmodel_1.OrganizationsModel,
	                policiesmodel_1.PoliciesModel,
	                rulesmodel_1.RulesModel,
	                servicelbsmodel_1.ServicelbsModel,
	                usersmodel_1.UsersModel,
	                appprofilesmodel_1.AppProfilesModel,
	                bgpsmodel_1.BgpsModel,
	                crudhelperservice_1.CRUDHelperService,
	                inspectservice_1.InspectService,
	                networkservice_1.NetworkService,
	                nodesservice_1.NodesService,
	                authservice_1.AuthService,
	                authguard_1.AuthGuard,
	                apiservice_1.ApiService,
	                { provide: common_1.APP_BASE_HREF, useValue: '' },
	                { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy }
	            ],
	            bootstrap: [app_component_1.AppComponent]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppModule);
	    return AppModule;
	}());
	exports.AppModule = AppModule;
	

/***/ },

/***/ 264:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by vjain3 on 11/1/16.
	 */
	var router_1 = __webpack_require__(5);
	var menuCtrl_1 = __webpack_require__(166);
	var networkpoliciestabsctrl_1 = __webpack_require__(69);
	var isolationpolicycreatectrl_1 = __webpack_require__(169);
	var isolationpolicydetailsctrl_1 = __webpack_require__(170);
	var bandwidthpolicycreatectrl_1 = __webpack_require__(167);
	var bandwidthpolicydetailsctrl_1 = __webpack_require__(168);
	var dashboardctrl_1 = __webpack_require__(161);
	var applicationgrouplistctrl_1 = __webpack_require__(154);
	var applicationgroupcreatectrl_1 = __webpack_require__(152);
	var applicationgroupdetailsctrl_1 = __webpack_require__(153);
	var settingsmenu_component_1 = __webpack_require__(186);
	var networksettingctrl_1 = __webpack_require__(182);
	var organizationlistctrl_1 = __webpack_require__(176);
	var organizationcreatectrl_1 = __webpack_require__(174);
	var organizationdetailsctrl_1 = __webpack_require__(175);
	var networklistctrl_1 = __webpack_require__(173);
	var networkdetailsctrl_1 = __webpack_require__(172);
	var networkcreatectrl_1 = __webpack_require__(171);
	var servicelblistctrl_1 = __webpack_require__(180);
	var servicelbcreatectrl_1 = __webpack_require__(177);
	var servicelbdetailsctrl_1 = __webpack_require__(178);
	var loginctrl_1 = __webpack_require__(163);
	var authguard_1 = __webpack_require__(160);
	var unauthorized_1 = __webpack_require__(165);
	var logoutctrl_1 = __webpack_require__(164);
	var userlist_component_1 = __webpack_require__(189);
	var usercreate_component_1 = __webpack_require__(187);
	var userdetails_component_1 = __webpack_require__(188);
	var appprofilelist_component_1 = __webpack_require__(157);
	var appprofilecreate_component_1 = __webpack_require__(155);
	var appprofiledetails_component_1 = __webpack_require__(156);
	var firstrunwizardctrl_1 = __webpack_require__(162);
	var nodelist_component_1 = __webpack_require__(185);
	var nodecreate_component_1 = __webpack_require__(183);
	var nodedetails_component_1 = __webpack_require__(184);
	var routes = [
	    { path: 'login', component: loginctrl_1.LoginComponent, canActivate: [authguard_1.AuthGuard] },
	    { path: 'logout', component: logoutctrl_1.LogoutComponent, canActivate: [authguard_1.AuthGuard] },
	    { path: 'unauthorized', component: unauthorized_1.UnauthorizedComponent, canActivate: [authguard_1.AuthGuard] },
	    { path: '', redirectTo: 'login', pathMatch: 'full' },
	    {
	        path: 'm',
	        component: menuCtrl_1.MenuComponent,
	        canActivateChild: [authguard_1.AuthGuard],
	        children: [
	            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
	            { path: 'dashboard', component: dashboardctrl_1.DashboardComponent },
	            { path: 'firstrun', component: firstrunwizardctrl_1.FirstrunWizardComponent },
	            //Network Policies
	            { path: 'networkpolicies/list', component: networkpoliciestabsctrl_1.NetworkPoliciesTabsComponent },
	            { path: 'networkpolicies/isolation/create', component: isolationpolicycreatectrl_1.IsolationPolicyCreateComponent },
	            { path: 'networkpolicies/isolation/details/:key', component: isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent },
	            { path: 'networkpolicies/isolation/edit/:key', component: isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent },
	            { path: 'networkpolicies/bandwidth/create', component: bandwidthpolicycreatectrl_1.BandwidthPolicyCreateComponent },
	            { path: 'networkpolicies/bandwidth/details/:key', component: bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent },
	            { path: 'networkpolicies/bandwidth/edit/:key', component: bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent },
	            //Application Groups
	            { path: 'applicationgroups/list', component: applicationgrouplistctrl_1.AppGrouplistComponent },
	            { path: 'applicationgroups/create', component: applicationgroupcreatectrl_1.ApplicationGroupCreateComponent },
	            { path: 'applicationgroups/details/:key', component: applicationgroupdetailsctrl_1.ApplicationGroupDetailsComponent },
	            { path: 'applicationgroups/edit/:key', component: applicationgroupdetailsctrl_1.ApplicationGroupDetailsComponent },
	            //Settings
	            {
	                path: 'settings',
	                component: settingsmenu_component_1.SettingsMenuComponent,
	                children: [
	                    { path: '', redirectTo: 'users/list', pathMatch: 'full' },
	                    { path: 'networks', component: networksettingctrl_1.NetworkSettingsComponent },
	                    { path: 'users/list', component: userlist_component_1.UserListComponent },
	                    { path: 'users/create', component: usercreate_component_1.UserCreateComponent },
	                    { path: 'users/details/:key', component: userdetails_component_1.UserDetailsComponent },
	                    { path: 'users/edit/:key', component: userdetails_component_1.UserDetailsComponent },
	                    { path: 'nodes/list', component: nodelist_component_1.NodeListComponent },
	                    { path: 'nodes/create', component: nodecreate_component_1.NodeCreateComponent },
	                    { path: 'nodes/details/:key', component: nodedetails_component_1.NodeDetailsComponent },
	                    { path: 'nodes/edit/:key', component: nodedetails_component_1.NodeDetailsComponent }
	                ]
	            },
	            //Organizations
	            { path: 'organizations/list', component: organizationlistctrl_1.OrganizationListComponent },
	            { path: 'organizations/create', component: organizationcreatectrl_1.OrganizationCreateComponent },
	            { path: 'organizations/details/:key', component: organizationdetailsctrl_1.OrganizationDetailsComponent },
	            //Networks
	            { path: 'networks/list', component: networklistctrl_1.NetworkListComponent },
	            { path: 'networks/create', component: networkcreatectrl_1.NetworkCreateComponent },
	            { path: 'networks/details/:key', component: networkdetailsctrl_1.NetworkdetailsComponent },
	            //Servicelbs
	            { path: 'servicelbs/list', component: servicelblistctrl_1.ServicelbListComponent },
	            { path: 'servicelbs/create', component: servicelbcreatectrl_1.ServicelbCreateComponent },
	            { path: 'servicelbs/details/:key', component: servicelbdetailsctrl_1.ServicelbDetailsComponent },
	            //Application profiles
	            { path: 'appprofiles/list', component: appprofilelist_component_1.AppProfileListComponent },
	            { path: 'appprofiles/create', component: appprofilecreate_component_1.AppProfileCreateComponent },
	            { path: 'appprofiles/details/:key', component: appprofiledetails_component_1.AppProfileDetailsComponent },
	            { path: 'appprofiles/edit/:key', component: appprofiledetails_component_1.AppProfileDetailsComponent },
	        ]
	    },
	    { path: '**', redirectTo: 'login', pathMatch: 'full' }
	];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = router_1.RouterModule.forRoot(routes);
	

/***/ },

/***/ 265:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/18/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var ApplicationGroupInfoComponent = (function () {
	    function ApplicationGroupInfoComponent() {
	        this.applicationGroup = {
	            groupName: '',
	            networkName: ''
	        };
	        this.mode = 'details';
	    }
	    __decorate([
	        core_1.Input('applicationGroup'), 
	        __metadata('design:type', Object)
	    ], ApplicationGroupInfoComponent.prototype, "applicationGroup", void 0);
	    __decorate([
	        core_1.Input('mode'), 
	        __metadata('design:type', String)
	    ], ApplicationGroupInfoComponent.prototype, "mode", void 0);
	    __decorate([
	        core_1.Input('showLoader'), 
	        __metadata('design:type', Boolean)
	    ], ApplicationGroupInfoComponent.prototype, "showLoader", void 0);
	    ApplicationGroupInfoComponent = __decorate([
	        core_1.Component({
	            selector: 'applicationgroupinfo',
	            templateUrl: 'applicationgroups/applicationgroupinfo.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ApplicationGroupInfoComponent);
	    return ApplicationGroupInfoComponent;
	}());
	exports.ApplicationGroupInfoComponent = ApplicationGroupInfoComponent;
	

/***/ },

/***/ 266:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/21/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(38);
	var pipes_module_1 = __webpack_require__(158);
	var applicationgroupcreatectrl_1 = __webpack_require__(152);
	var applicationgroupdetailsctrl_1 = __webpack_require__(153);
	var isolationpolicydirective_1 = __webpack_require__(269);
	var bandwidthpolicydirective_1 = __webpack_require__(268);
	var applicationgrouplistctrl_1 = __webpack_require__(154);
	var applicationgroupstats_1 = __webpack_require__(267);
	var applicationgroupinfoctrl_1 = __webpack_require__(265);
	var ApplicationGroupsModule = (function () {
	    function ApplicationGroupsModule() {
	    }
	    ApplicationGroupsModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule,
	                pipes_module_1.PipesModule
	            ],
	            declarations: [
	                applicationgroupcreatectrl_1.ApplicationGroupCreateComponent,
	                applicationgroupdetailsctrl_1.ApplicationGroupDetailsComponent,
	                isolationpolicydirective_1.IsolationPolicySelectionComponent,
	                bandwidthpolicydirective_1.BandwidthPolicySelectionComponent,
	                applicationgrouplistctrl_1.AppGrouplistComponent,
	                applicationgroupstats_1.ApplicationGroupStatsComponent,
	                applicationgroupinfoctrl_1.ApplicationGroupInfoComponent
	            ],
	            exports: [
	                applicationgrouplistctrl_1.AppGrouplistComponent,
	                applicationgroupcreatectrl_1.ApplicationGroupCreateComponent,
	                applicationgroupdetailsctrl_1.ApplicationGroupDetailsComponent,
	                isolationpolicydirective_1.IsolationPolicySelectionComponent,
	                bandwidthpolicydirective_1.BandwidthPolicySelectionComponent,
	                applicationgroupstats_1.ApplicationGroupStatsComponent,
	                applicationgroupinfoctrl_1.ApplicationGroupInfoComponent,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule,
	                pipes_module_1.PipesModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ApplicationGroupsModule);
	    return ApplicationGroupsModule;
	}());
	exports.ApplicationGroupsModule = ApplicationGroupsModule;
	

/***/ },

/***/ 267:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/18/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var crudhelperservice_1 = __webpack_require__(9);
	var inspectservice_1 = __webpack_require__(93);
	var rxjs_1 = __webpack_require__(29);
	var contivglobals_1 = __webpack_require__(15);
	var util_1 = __webpack_require__(51);
	var ApplicationGroupStatsComponent = (function () {
	    function ApplicationGroupStatsComponent(applicationGroupsModel, crudHelperService, inspectService, ngZone) {
	        var _this = this;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.inspectService = inspectService;
	        this.ngZone = ngZone;
	        this.statkey = '';
	        this.applicationInspectStats = {
	            externalPktTag: '',
	            numEndpoints: '',
	            pktTag: ''
	        };
	        this.config = { networkName: '', groupName: '' };
	        this.endpoints = [];
	        this.filteredendpoints = [];
	        this.containerDetails = {};
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            if (_this.statkey != '')
	                _this.getApplicationgroupInspect(true);
	        });
	    }
	    ApplicationGroupStatsComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        if (this.statkey != '')
	            this.getApplicationgroupInspect(false);
	    };
	    ApplicationGroupStatsComponent.prototype.getApplicationgroupInspect = function (reload) {
	        var applicationStatsCtrl = this;
	        this.applicationGroupsModel.getInspectByKey(this.statkey, contivglobals_1.ContivGlobals.APPLICATIONGROUPS_INSPECT_ENDPOINT, reload)
	            .then(function (result) {
	            applicationStatsCtrl['applicationInspectStats'] = result['Oper'];
	            applicationStatsCtrl['config'] = result['Config'];
	            if (!util_1.isUndefined(result['Oper'].endpoints)) {
	                var containerDetails = applicationStatsCtrl.inspectService.buildEndPoints(result['Oper'].endpoints);
	                if (applicationStatsCtrl.inspectService.checkContainerChanged(applicationStatsCtrl['containerDetails'], containerDetails)) {
	                    applicationStatsCtrl['endpoints'] = result['Oper'].endpoints;
	                    applicationStatsCtrl['containerDetails'] = containerDetails;
	                }
	            }
	            else {
	                applicationStatsCtrl['endpoints'] = [];
	                applicationStatsCtrl['containerDetails'] = {};
	            }
	            applicationStatsCtrl.ngZone.run(function () {
	                applicationStatsCtrl.crudHelperService.stopLoader(applicationStatsCtrl);
	            });
	        }, function (error) {
	            applicationStatsCtrl.ngZone.run(function () {
	                applicationStatsCtrl.crudHelperService.stopLoader(applicationStatsCtrl);
	            });
	        });
	    };
	    ApplicationGroupStatsComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    __decorate([
	        core_1.Input('statkey'), 
	        __metadata('design:type', String)
	    ], ApplicationGroupStatsComponent.prototype, "statkey", void 0);
	    ApplicationGroupStatsComponent = __decorate([
	        core_1.Component({
	            selector: 'applicationgroupstats',
	            templateUrl: 'applicationgroups/applicationgroupstats.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], ApplicationGroupStatsComponent);
	    return ApplicationGroupStatsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ApplicationGroupStatsComponent = ApplicationGroupStatsComponent;
	

/***/ },

/***/ 268:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by hardik gandhi on 6/28/16.
	 */
	var core_1 = __webpack_require__(2);
	var _ = __webpack_require__(26);
	var netprofilesmodel_1 = __webpack_require__(73);
	/*
	angular.module("contiv.applicationgroups")
	    .directive("ctvBandwidthpolicy", function () {
	        return {
	            restrict: 'E',
	            scope: {
	                mode: "=",
	                applicationgroup: '='
	            },

	            controller: [
	                '$scope',
	                'NetprofilesModel',
	                function ($scope,
	                          NetprofilesModel) {
	                    $scope.netProfiles = [];
	                    $scope.selectedNetprofile = {
	                        policy: {}
	                    };

	                    /**
	                     * Get profiles for the given tenant.
	                     */
	/*function getNetprofiles() {
	    NetprofilesModel.get().then(function (result) {
	        $scope.netProfiles = _.filter(result, {
	            'tenantName': 'default'        //TODO: Remove hardcoded tenant.
	        });
	        if ($scope.applicationgroup.netProfile !== '') {
	            $scope.selectedNetprofile.policy = _.find($scope.netProfiles, function (policy) {
	                return policy.profileName === $scope.applicationgroup.netProfile;
	            });
	        }
	    });
	}

	/**
	 * Assign profileName to applicationgroup whichever user has given
	 */
	/*$scope.updateApplicationgroup = function () {
	    if ($scope.selectedNetprofile.policy === null) {
	        $scope.applicationgroup.netProfile = '';
	    } else {
	        $scope.applicationgroup.netProfile = $scope.selectedNetprofile.policy.profileName;
	    }
	};

	getNetprofiles();
	}],

	templateUrl: 'applicationgroups/bandwidthpolicy.html'
	}
	});*/
	var BandwidthPolicySelectionComponent = (function () {
	    function BandwidthPolicySelectionComponent(netprofilesModel) {
	        this.netprofilesModel = netprofilesModel;
	        this.netProfiles = [];
	        this.selectedNetprofile = {};
	        this.netProfileSearchText = '';
	    }
	    BandwidthPolicySelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        /**
	         * Get profiles for the given tenant.
	         */
	        function getNetprofiles() {
	            component.netprofilesModel.get(false).then(function (result) {
	                component.netProfiles = _.filter(result, {
	                    'tenantName': 'default' //TODO: Remove hardcoded tenant.
	                });
	                if (component.applicationgroup.netProfile !== '') {
	                    component.selectedNetprofile = _.find(component.netProfiles, function (policy) {
	                        return policy.profileName === component.applicationgroup.netProfile;
	                    });
	                }
	            });
	        }
	        getNetprofiles();
	    };
	    BandwidthPolicySelectionComponent.prototype.updateApplicationgroup = function (netprofile) {
	        this.selectedNetprofile = netprofile;
	        if (this.selectedNetprofile === null) {
	            this.applicationgroup.netProfile = '';
	        }
	        else {
	            this.applicationgroup.netProfile = this.selectedNetprofile.profileName;
	        }
	    };
	    ;
	    __decorate([
	        core_1.Input('mode'), 
	        __metadata('design:type', String)
	    ], BandwidthPolicySelectionComponent.prototype, "mode", void 0);
	    __decorate([
	        core_1.Input('applicationgroup'), 
	        __metadata('design:type', Object)
	    ], BandwidthPolicySelectionComponent.prototype, "applicationgroup", void 0);
	    BandwidthPolicySelectionComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-bandwidthpolicy',
	            templateUrl: 'applicationgroups/bandwidthpolicy.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _a) || Object])
	    ], BandwidthPolicySelectionComponent);
	    return BandwidthPolicySelectionComponent;
	    var _a;
	}());
	exports.BandwidthPolicySelectionComponent = BandwidthPolicySelectionComponent;
	

/***/ },

/***/ 269:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by hardik gandhi on 7/8/16.
	 */
	var core_1 = __webpack_require__(2);
	var _ = __webpack_require__(26);
	var policiesmodel_1 = __webpack_require__(67);
	var rulesmodel_1 = __webpack_require__(115);
	var IsolationPolicySelectionComponent = (function () {
	    function IsolationPolicySelectionComponent(policiesModel, rulesModel) {
	        this.policiesModel = policiesModel;
	        this.rulesModel = rulesModel;
	        this.incomingRules = [];
	        this.outgoingRules = [];
	        this.selectedPolicies = []; // To Store policies selected by user to display
	        this.isolationPolicies = []; // To Get all isolation policies of tenant
	        this.isolationPolicySearchText = '';
	        var component = this;
	        /**
	         * Get policies for the given tenant.
	         */
	        function getIsolationPolicies() {
	            component.policiesModel.get(false).then(function (result) {
	                component.isolationPolicies = _.filter(result, {
	                    'tenantName': 'default' //TODO: Remove hardcoded tenant.
	                });
	            });
	        }
	        getIsolationPolicies();
	    }
	    IsolationPolicySelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        /**
	         * Get incoming and outgoing rules for each policy present in applicationgroup
	         */
	        function getRules() {
	            component.applicationgroup.policies.forEach(function (policy) {
	                //To display rules of selected policies
	                component.rulesModel.getIncomingRules(policy, 'default')
	                    .then(function (rules) {
	                    Array.prototype.push.apply(component.incomingRules, rules);
	                });
	                component.rulesModel.getOutgoingRules(policy, 'default')
	                    .then(function (rules) {
	                    Array.prototype.push.apply(component.outgoingRules, rules);
	                });
	            });
	        }
	        /**
	         *  To check 'details' or 'edit' mode (not create mode)
	         */
	        if (component.mode === 'details' || (component.mode === 'edit' && component.applicationgroup.groupName != "")) {
	            //Application Groups might not have any policies associated with them so define an empty array
	            if (component.applicationgroup.policies === undefined) {
	                component.applicationgroup.policies = [];
	            }
	            getRules();
	        }
	    };
	    /**
	     * Add policy to application group
	     */
	    IsolationPolicySelectionComponent.prototype.addIsolationPolicy = function (policyName) {
	        var component = this;
	        var currentPolicyName = policyName;
	        if (currentPolicyName !== undefined && _.includes(component.selectedPolicies, currentPolicyName) == false) {
	            //To display selected policies
	            component.selectedPolicies.push(currentPolicyName);
	            //To display rules of selected policies
	            component.rulesModel.getIncomingRules(currentPolicyName, 'default')
	                .then(function (rules) {
	                Array.prototype.push.apply(component.incomingRules, rules);
	            });
	            component.rulesModel.getOutgoingRules(currentPolicyName, 'default')
	                .then(function (rules) {
	                Array.prototype.push.apply(component.outgoingRules, rules);
	            });
	            //To be added to application group and saved to the server
	            component.applicationgroup.policies
	                .push(currentPolicyName);
	        }
	    };
	    ;
	    /**
	     * Remove policy from application group
	     */
	    IsolationPolicySelectionComponent.prototype.removeIsolationPolicy = function (policyName) {
	        _.remove(this.selectedPolicies, function (policy) {
	            return policy === policyName;
	        });
	        _.remove(this.applicationgroup.policies, function (policy) {
	            return policy === policyName;
	        });
	        _.remove(this.incomingRules, function (rule) {
	            return rule.policyName === policyName;
	        });
	        _.remove(this.outgoingRules, function (rule) {
	            return rule.policyName === policyName;
	        });
	    };
	    ;
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], IsolationPolicySelectionComponent.prototype, "mode", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], IsolationPolicySelectionComponent.prototype, "applicationgroup", void 0);
	    IsolationPolicySelectionComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-isolationpolicy',
	            templateUrl: 'applicationgroups/isolationpolicy.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _a) || Object, (typeof (_b = typeof rulesmodel_1.RulesModel !== 'undefined' && rulesmodel_1.RulesModel) === 'function' && _b) || Object])
	    ], IsolationPolicySelectionComponent);
	    return IsolationPolicySelectionComponent;
	    var _a, _b;
	}());
	exports.IsolationPolicySelectionComponent = IsolationPolicySelectionComponent;
	

/***/ },

/***/ 270:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/11/16.
	 */
	var core_1 = __webpack_require__(2);
	var _ = __webpack_require__(26);
	var applicationgroupsmodel_1 = __webpack_require__(44);
	var ApplicationGroupSelectionComponent = (function () {
	    function ApplicationGroupSelectionComponent(applicationGroupsModel) {
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.applicationGroups = []; // To Get all application groups of tenant
	        this.applicationGroupSearchText = '';
	        this.selectedApplicationGroups = [];
	    }
	    ApplicationGroupSelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        /**
	         * Get application groups.
	         */
	        function getApplicationGroups() {
	            //Refresh application groups as its links would be updated when a new application profile is created.
	            component.applicationGroupsModel.get(true).then(function (result) {
	                component.selectedApplicationGroups = _.filter(result, function (group) {
	                    return _.includes(component.appProfile.endpointGroups, group['groupName']);
	                });
	                //No two application profiles can share the same application groups
	                component.applicationGroups = _.filter(result, function (group) {
	                    return ((_.isEmpty(group['links'].AppProfile))
	                        || (group['links'].AppProfile.key === component.appProfile.key));
	                });
	            });
	        }
	        getApplicationGroups();
	    };
	    /**
	     * Add group to app profile
	     */
	    ApplicationGroupSelectionComponent.prototype.addApplicationGroup = function (groupName) {
	        var component = this;
	        var currentGroupName = groupName;
	        if (currentGroupName !== undefined && !_.includes(component.appProfile.endpointGroups, currentGroupName)) {
	            var key = 'default:' + currentGroupName;
	            component.applicationGroupsModel.getModelByKey(key, false, undefined).then(function (group) {
	                component.selectedApplicationGroups.push(group);
	                component.selectedApplicationGroups = component.selectedApplicationGroups.slice();
	            });
	            //To be added to application group and saved to the server
	            component.appProfile.endpointGroups.push(currentGroupName);
	        }
	    };
	    ;
	    /**
	     * Remove group from app profile
	     */
	    ApplicationGroupSelectionComponent.prototype.removeApplicationGroup = function (groupName) {
	        _.remove(this.selectedApplicationGroups, function (group) {
	            return group['groupName'] === groupName;
	        });
	        this.selectedApplicationGroups = this.selectedApplicationGroups.slice();
	        _.remove(this.appProfile.endpointGroups, function (group) {
	            return group === groupName;
	        });
	    };
	    ;
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ApplicationGroupSelectionComponent.prototype, "mode", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ApplicationGroupSelectionComponent.prototype, "appProfile", void 0);
	    ApplicationGroupSelectionComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-appgroupselection',
	            templateUrl: 'appprofiles/appgroupselection.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _a) || Object])
	    ], ApplicationGroupSelectionComponent);
	    return ApplicationGroupSelectionComponent;
	    var _a;
	}());
	exports.ApplicationGroupSelectionComponent = ApplicationGroupSelectionComponent;
	

/***/ },

/***/ 271:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(38);
	var appprofilelist_component_1 = __webpack_require__(157);
	var appprofilecreate_component_1 = __webpack_require__(155);
	var appprofiledetails_component_1 = __webpack_require__(156);
	var appgroupselection_component_1 = __webpack_require__(270);
	var pipes_module_1 = __webpack_require__(158);
	var AppProfilesModule = (function () {
	    function AppProfilesModule() {
	    }
	    AppProfilesModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule,
	                pipes_module_1.PipesModule
	            ],
	            declarations: [
	                appprofilelist_component_1.AppProfileListComponent,
	                appprofilecreate_component_1.AppProfileCreateComponent,
	                appprofiledetails_component_1.AppProfileDetailsComponent,
	                appgroupselection_component_1.ApplicationGroupSelectionComponent
	            ],
	            exports: [
	                appprofilelist_component_1.AppProfileListComponent,
	                appprofilecreate_component_1.AppProfileCreateComponent,
	                appprofiledetails_component_1.AppProfileDetailsComponent,
	                appgroupselection_component_1.ApplicationGroupSelectionComponent,
	                directives_module_1.DirectivesModule,
	                pipes_module_1.PipesModule,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppProfilesModule);
	    return AppProfilesModule;
	}());
	exports.AppProfilesModule = AppProfilesModule;
	

/***/ },

/***/ 272:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 7/1/16.
	 */
	var core_1 = __webpack_require__(2);
	var CtvAccordionComponent = (function () {
	    function CtvAccordionComponent(elem) {
	    }
	    CtvAccordionComponent.prototype.ngOnInit = function () {
	        jQuery(".ui.accordion").accordion();
	    };
	    __decorate([
	        core_1.Input('items'), 
	        __metadata('design:type', Array)
	    ], CtvAccordionComponent.prototype, "items", void 0);
	    CtvAccordionComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-accordion',
	            templateUrl: 'components/directives/accordion.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	    ], CtvAccordionComponent);
	    return CtvAccordionComponent;
	    var _a;
	}());
	exports.CtvAccordionComponent = CtvAccordionComponent;
	

/***/ },

/***/ 273:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/7/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var authservice_1 = __webpack_require__(68);
	var AuthDirective = (function () {
	    function AuthDirective(authService, templateRef, viewContainer) {
	        this.authService = authService;
	        this.templateRef = templateRef;
	        this.viewContainer = viewContainer;
	        this.auth = '';
	    }
	    AuthDirective.prototype.ngOnInit = function () {
	        if (this.auth == this.authService.authTokenPayload['role']) {
	            this.viewContainer.createEmbeddedView(this.templateRef);
	        }
	        else {
	            this.viewContainer.clear();
	        }
	    };
	    __decorate([
	        core_1.Input('auth'), 
	        __metadata('design:type', String)
	    ], AuthDirective.prototype, "auth", void 0);
	    AuthDirective = __decorate([
	        core_1.Directive({
	            selector: '[auth]'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof core_1.TemplateRef !== 'undefined' && core_1.TemplateRef) === 'function' && _b) || Object, (typeof (_c = typeof core_1.ViewContainerRef !== 'undefined' && core_1.ViewContainerRef) === 'function' && _c) || Object])
	    ], AuthDirective);
	    return AuthDirective;
	    var _a, _b, _c;
	}());
	exports.AuthDirective = AuthDirective;
	

/***/ },

/***/ 274:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by vjain3 on 6/2/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var CtvCollapsibleComponent = (function () {
	    function CtvCollapsibleComponent() {
	        this.title = '';
	        this.collapsed = true;
	    }
	    __decorate([
	        core_1.Input('title'), 
	        __metadata('design:type', String)
	    ], CtvCollapsibleComponent.prototype, "title", void 0);
	    __decorate([
	        core_1.Input('collapsed'), 
	        __metadata('design:type', Boolean)
	    ], CtvCollapsibleComponent.prototype, "collapsed", void 0);
	    CtvCollapsibleComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-collapsible',
	            templateUrl: 'components/directives/collapsible.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvCollapsibleComponent);
	    return CtvCollapsibleComponent;
	}());
	exports.CtvCollapsibleComponent = CtvCollapsibleComponent;
	

/***/ },

/***/ 275:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 4/28/16.
	 */
	var core_1 = __webpack_require__(2);
	var ErrorMessageComponent = (function () {
	    function ErrorMessageComponent() {
	        this.showError = true;
	    }
	    ErrorMessageComponent.prototype.ngOnChanges = function () {
	        this.showError = true;
	    };
	    ErrorMessageComponent.prototype.close = function () {
	        this.showError = false;
	    };
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ErrorMessageComponent.prototype, "header", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ErrorMessageComponent.prototype, "error", void 0);
	    ErrorMessageComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-error',
	            templateUrl: 'components/directives/errormessage.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ErrorMessageComponent);
	    return ErrorMessageComponent;
	}());
	exports.ErrorMessageComponent = ErrorMessageComponent;
	

/***/ },

/***/ 276:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/17/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var _ = __webpack_require__(26);
	var CtvNamevalueComponent = (function () {
	    function CtvNamevalueComponent() {
	        this.itemsChange = new core_1.EventEmitter();
	        this.items = [];
	        this.nameheader = 'Name';
	        this.valueheader = 'Value';
	        this.type = 'text';
	        this.newItem = { name: '', value: '' };
	        this.options = [];
	    }
	    CtvNamevalueComponent.prototype.resetItem = function () {
	        this.newItem = { name: '', value: '' };
	    };
	    CtvNamevalueComponent.prototype.add = function () {
	        function compare(val1, val2) {
	            return val1.name == val2.name;
	        }
	        if (this.newItem.name == '' && this.newItem.value == '') {
	            return;
	        }
	        _.pullAllWith(this.items, [this.newItem], compare);
	        this.items.push(this.newItem);
	        this.itemsChange.emit(this.items);
	        this.resetItem();
	    };
	    CtvNamevalueComponent.prototype.remove = function (passedItem) {
	        _.remove(this.items, function (item) {
	            return item.name == passedItem.name;
	        });
	    };
	    __decorate([
	        core_1.Input('items'), 
	        __metadata('design:type', Array)
	    ], CtvNamevalueComponent.prototype, "items", void 0);
	    __decorate([
	        core_1.Input('nameheader'), 
	        __metadata('design:type', String)
	    ], CtvNamevalueComponent.prototype, "nameheader", void 0);
	    __decorate([
	        core_1.Input('options'), 
	        __metadata('design:type', Array)
	    ], CtvNamevalueComponent.prototype, "options", void 0);
	    __decorate([
	        core_1.Input('valueheader'), 
	        __metadata('design:type', String)
	    ], CtvNamevalueComponent.prototype, "valueheader", void 0);
	    __decorate([
	        core_1.Output('itemsChange'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], CtvNamevalueComponent.prototype, "itemsChange", void 0);
	    __decorate([
	        core_1.Input('type'), 
	        __metadata('design:type', String)
	    ], CtvNamevalueComponent.prototype, "type", void 0);
	    CtvNamevalueComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-namevalue',
	            templateUrl: 'components/directives/namevalue.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvNamevalueComponent);
	    return CtvNamevalueComponent;
	    var _a;
	}());
	exports.CtvNamevalueComponent = CtvNamevalueComponent;
	

/***/ },

/***/ 277:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var AciSettingComponent = (function () {
	    function AciSettingComponent() {
	        this.extra_vars = { control_interface: '', netplugin_if: '', service_vip: '', scheduler_provider: '', ucp_bootstrap_node_name: '', cluster_name: '',
	            contiv_network_mode: '', fwd_mode: '', apic_url: '', apic_username: '', apic_password: '', apic_leaf_nodes: '', apic_phys_domain: '',
	            apic_epg_bridge_domain: '', apic_contracts_unrestricted_mode: '' };
	        this.updateAciDef = new core_1.EventEmitter();
	        this.backTriggered = new core_1.EventEmitter();
	    }
	    AciSettingComponent.prototype.updateAciSetting = function (formvalid) {
	        if (formvalid) {
	            this.updateAciDef.emit(this.extra_vars);
	        }
	    };
	    __decorate([
	        core_1.Input('firstRunWiz'), 
	        __metadata('design:type', Boolean)
	    ], AciSettingComponent.prototype, "firstRunWiz", void 0);
	    __decorate([
	        core_1.Output('updateAciDef'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], AciSettingComponent.prototype, "updateAciDef", void 0);
	    __decorate([
	        core_1.Input('extra_vars'), 
	        __metadata('design:type', Object)
	    ], AciSettingComponent.prototype, "extra_vars", void 0);
	    __decorate([
	        core_1.Output('backTriggered'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], AciSettingComponent.prototype, "backTriggered", void 0);
	    AciSettingComponent = __decorate([
	        core_1.Component({
	            selector: 'acisettingcomp',
	            templateUrl: 'components/directives/settings/acisetting.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AciSettingComponent);
	    return AciSettingComponent;
	    var _a, _b;
	}());
	exports.AciSettingComponent = AciSettingComponent;
	

/***/ },

/***/ 278:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/14/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var contivglobals_1 = __webpack_require__(15);
	var NetworkSettingComponent = (function () {
	    function NetworkSettingComponent() {
	        this.vlanPattern = contivglobals_1.ContivGlobals.VLAN_REGEX;
	        this.vxlanPattern = contivglobals_1.ContivGlobals.VXLAN_REGEX;
	        this.updateNetDef = new core_1.EventEmitter();
	        this.backTriggered = new core_1.EventEmitter();
	        this.firstRunWiz = false;
	        this.setting = { networkInfraType: '', vlans: '', vxlans: '', fwdMode: '' };
	    }
	    NetworkSettingComponent.prototype.updateNetworkSettings = function (formvalid) {
	        if (formvalid) {
	            this.updateNetDef.emit(this.setting);
	        }
	    };
	    __decorate([
	        core_1.Input('firstRunWiz'), 
	        __metadata('design:type', Boolean)
	    ], NetworkSettingComponent.prototype, "firstRunWiz", void 0);
	    __decorate([
	        core_1.Input('setting'), 
	        __metadata('design:type', Object)
	    ], NetworkSettingComponent.prototype, "setting", void 0);
	    __decorate([
	        core_1.Output('updateNetDef'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], NetworkSettingComponent.prototype, "updateNetDef", void 0);
	    __decorate([
	        core_1.Output('backTriggered'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], NetworkSettingComponent.prototype, "backTriggered", void 0);
	    NetworkSettingComponent = __decorate([
	        core_1.Component({
	            selector: 'networksettingcomp',
	            templateUrl: 'components/directives/settings/networksetting.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NetworkSettingComponent);
	    return NetworkSettingComponent;
	    var _a, _b;
	}());
	exports.NetworkSettingComponent = NetworkSettingComponent;
	

/***/ },

/***/ 279:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/10/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var util_1 = __webpack_require__(51);
	var _ = __webpack_require__(26);
	var CtvTableComponent = (function () {
	    function CtvTableComponent() {
	        this.filteredinputitems = new core_1.EventEmitter();
	        this.table = { chunks: [], pageNo: 0, tableSize: 12, searchText: '' };
	        this.pageChunks = [];
	        this.defaultSortColumn = '';
	        this.size = 12;
	        this.items = [];
	        this.sortObj = this.initializeSort(this.defaultSortColumn);
	    }
	    CtvTableComponent.prototype.ngOnInit = function () {
	        if (isNaN(this.size))
	            this.size = 12;
	        this.table.tableSize = this.size;
	        this.sortObj = this.initializeSort(this.defaultSortColumn);
	        this.showChunk(this.table.pageNo, this.table.searchText);
	    };
	    CtvTableComponent.prototype.ngOnChanges = function () {
	        this.showChunk(this.table.pageNo, this.table.searchText);
	    };
	    CtvTableComponent.prototype.showChunk = function (pageNo, searchText) {
	        this.table.searchText = searchText;
	        if (util_1.isUndefined(pageNo) || pageNo < 0) {
	            pageNo = 0;
	        }
	        this.table.pageNo = pageNo;
	        if (!(util_1.isUndefined(this.items))) {
	            var searchTextFilteredItems = this.filterItems(searchText);
	            var sortedItems = this.sort(searchTextFilteredItems);
	            var noOfChunks = Math.ceil(sortedItems.length / this.table.tableSize);
	            if (noOfChunks == 0) {
	                noOfChunks = 1;
	            }
	            this.table.chunks = [];
	            for (var i = 0; i < noOfChunks; i++) {
	                this.table.chunks.push({ selected: false, pageNo: i });
	            }
	            if (pageNo >= this.table.chunks.length) {
	                this.table.pageNo = 0;
	            }
	            this.table.chunks[this.table.pageNo]['selected'] = true;
	            if (this.table.chunks.length > 5) {
	                var sliceStart, sliceEnd;
	                sliceStart = this.table.pageNo - 2;
	                sliceEnd = this.table.pageNo + 3;
	                if (sliceStart < 0) {
	                    sliceEnd = sliceEnd = sliceStart;
	                    sliceStart = 0;
	                }
	                if (sliceEnd > this.table.chunks.length) {
	                    sliceStart = sliceStart = (sliceEnd = this.table.chunks.length);
	                    sliceEnd = this.table.chunks.length;
	                }
	                this.pageChunks = this.table.chunks.slice(sliceStart, sliceEnd);
	            }
	            else {
	                this.pageChunks = this.table.chunks;
	            }
	            var filtitems = this.limitItems(this.table.tableSize, this.table.pageNo * this.table.tableSize, sortedItems);
	            this.filteredinputitems.emit(filtitems);
	        }
	        return false;
	    };
	    CtvTableComponent.prototype.showPrevChunk = function () {
	        var prevChunk;
	        if (this.table.pageNo <= 0) {
	            prevChunk = 0;
	        }
	        else {
	            prevChunk = this.table.pageNo - 1;
	        }
	        return this.showChunk(prevChunk, this.table.searchText);
	    };
	    CtvTableComponent.prototype.showNextChunk = function () {
	        var nextChunk;
	        nextChunk = this.table.pageNo + 1;
	        if (nextChunk > this.table.chunks.length - 1) {
	            nextChunk = this.table.chunks.length - 1;
	        }
	        return this.showChunk(nextChunk, this.table.searchText);
	    };
	    CtvTableComponent.prototype.filterItems = function (searchText) {
	        var selectedItems = [];
	        if (searchText.length === 0) {
	            return this.items;
	        }
	        for (var _i = 0, _a = this.items; _i < _a.length; _i++) {
	            var item = _a[_i];
	            var str = '';
	            for (var key in item) {
	                str += JSON.stringify(item[key]);
	            }
	            if (str.search(searchText) > -1) {
	                selectedItems.push(item);
	            }
	        }
	        return selectedItems;
	    };
	    CtvTableComponent.prototype.limitItems = function (limitSize, start, items) {
	        var selectedItems = [];
	        for (var i = start; (i < items.length) && (i < (start + limitSize)); i++) {
	            selectedItems.push(items[i]);
	        }
	        return selectedItems;
	    };
	    CtvTableComponent.prototype.initializeSort = function (sortfield) {
	        return {
	            field: sortfield,
	            reverse: false,
	            iconDirection: { "down": true, "up": false }
	        };
	    };
	    CtvTableComponent.prototype.applysort = function (sortfield) {
	        if (sortfield == this.sortObj.field) {
	            this.sortObj.field = sortfield;
	            this.sortObj.reverse = !this.sortObj.reverse;
	            this.sortObj.iconDirection = {
	                "down": !(this.sortObj.reverse),
	                "up": this.sortObj.reverse
	            };
	        }
	        else {
	            this.sortObj = this.initializeSort(sortfield);
	        }
	        this.showChunk(this.table.pageNo, this.table.searchText);
	    };
	    CtvTableComponent.prototype.sort = function (items) {
	        var sortedItems;
	        if (this.sortObj.field == '')
	            return items;
	        sortedItems = _.sortBy(items, [this.defaultSortColumn]);
	        sortedItems = _.sortBy(sortedItems, [this.sortObj.field]);
	        if (this.sortObj.reverse)
	            sortedItems = _.reverse(sortedItems);
	        return sortedItems;
	    };
	    __decorate([
	        core_1.Input('items'), 
	        __metadata('design:type', Array)
	    ], CtvTableComponent.prototype, "items", void 0);
	    __decorate([
	        core_1.Input('size'), 
	        __metadata('design:type', Number)
	    ], CtvTableComponent.prototype, "size", void 0);
	    __decorate([
	        core_1.Output('filtereditems'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], CtvTableComponent.prototype, "filteredinputitems", void 0);
	    __decorate([
	        core_1.Input('defaultSortColumn'), 
	        __metadata('design:type', String)
	    ], CtvTableComponent.prototype, "defaultSortColumn", void 0);
	    CtvTableComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-table',
	            templateUrl: 'components/directives/table.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvTableComponent);
	    return CtvTableComponent;
	    var _a;
	}());
	exports.CtvTableComponent = CtvTableComponent;
	var CtvThComponent = (function () {
	    function CtvThComponent() {
	        this.sortdata = new core_1.EventEmitter();
	        this.sortfield = '';
	        this.sortobject = { field: '', iconDirection: { down: true, up: false }, reverse: false };
	    }
	    CtvThComponent.prototype.sortColumn = function () {
	        this.sortdata.emit(this.sortfield);
	    };
	    CtvThComponent.prototype.ngOnInit = function () {
	    };
	    __decorate([
	        core_1.Input('sortfield'), 
	        __metadata('design:type', String)
	    ], CtvThComponent.prototype, "sortfield", void 0);
	    __decorate([
	        core_1.Output('sortdata'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], CtvThComponent.prototype, "sortdata", void 0);
	    __decorate([
	        core_1.Input('sortobject'), 
	        __metadata('design:type', Object)
	    ], CtvThComponent.prototype, "sortobject", void 0);
	    CtvThComponent = __decorate([
	        core_1.Component({
	            selector: "ctv-th",
	            templateUrl: 'components/directives/tableheader.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvThComponent);
	    return CtvThComponent;
	    var _a;
	}());
	exports.CtvThComponent = CtvThComponent;
	var CtvTpaginationComponent = (function () {
	    function CtvTpaginationComponent() {
	        this.chunks = [];
	        this.showPage = new core_1.EventEmitter();
	        this.prevChunk = new core_1.EventEmitter();
	        this.nextChunk = new core_1.EventEmitter();
	    }
	    CtvTpaginationComponent.prototype.showPrevChunk = function () {
	        this.prevChunk.emit();
	    };
	    CtvTpaginationComponent.prototype.showNextChunk = function () {
	        this.nextChunk.emit();
	    };
	    CtvTpaginationComponent.prototype.showClickedPage = function (pageNo) {
	        this.showPage.emit(pageNo);
	    };
	    __decorate([
	        core_1.Input('chunks'), 
	        __metadata('design:type', Array)
	    ], CtvTpaginationComponent.prototype, "chunks", void 0);
	    __decorate([
	        core_1.Output('showPage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], CtvTpaginationComponent.prototype, "showPage", void 0);
	    __decorate([
	        core_1.Output('prevChunk'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], CtvTpaginationComponent.prototype, "prevChunk", void 0);
	    __decorate([
	        core_1.Output('nextChunk'), 
	        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
	    ], CtvTpaginationComponent.prototype, "nextChunk", void 0);
	    CtvTpaginationComponent = __decorate([
	        core_1.Component({
	            selector: "ctv-tpagination",
	            templateUrl: 'components/directives/paginationmenu.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvTpaginationComponent);
	    return CtvTpaginationComponent;
	    var _a, _b, _c;
	}());
	exports.CtvTpaginationComponent = CtvTpaginationComponent;
	var CtvSearchComponent = (function () {
	    function CtvSearchComponent() {
	        this.searchTextChange = new core_1.EventEmitter();
	        this.searchText = '';
	        this.size = 30;
	        this.placeholder = 'Search';
	    }
	    CtvSearchComponent.prototype.showChunk = function (event) {
	        this.searchTextChange.emit(event);
	    };
	    __decorate([
	        core_1.Input('placeholder'), 
	        __metadata('design:type', String)
	    ], CtvSearchComponent.prototype, "placeholder", void 0);
	    __decorate([
	        core_1.Output('searchTextChange'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], CtvSearchComponent.prototype, "searchTextChange", void 0);
	    CtvSearchComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-search',
	            templateUrl: 'components/directives/searchinput.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvSearchComponent);
	    return CtvSearchComponent;
	    var _a;
	}());
	exports.CtvSearchComponent = CtvSearchComponent;
	

/***/ },

/***/ 280:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(106);
	var _ = __webpack_require__(26);
	/**
	 * BaseCollection class that does just fetch of the objects.
	 * @param $http
	 * @param $q
	 * @param url Used for doing HTTP GET and fetch objects from server
	 * @constructor
	 */
	var BaseCollection = (function () {
	    function BaseCollection(http, url, apiService) {
	        this.http = http;
	        this.url = url;
	        this.apiService = apiService;
	        this.models = [];
	        this.url = url;
	    }
	    /**
	     *
	     * @param reload Optional. Default is false
	     * @returns {*}
	     */
	    BaseCollection.prototype.get = function (reload) {
	        var collection = this;
	        if (reload === undefined)
	            reload = false;
	        return (!reload && collection.models.length > 0) ?
	            new Promise(function (resolve) {
	                resolve(collection.models);
	            }) : collection.apiService.get(collection.url).map(function (res) { return res.json(); }).toPromise()
	            .then(function (result) {
	            collection.models = result;
	            return collection.models;
	        });
	    };
	    ;
	    /**
	     * Returns a deep copy of the cached object
	     * @param key
	     * @param reload Optional. Default is false
	     * @param keyname
	     * @returns {*}
	     */
	    BaseCollection.prototype.getModelByKey = function (key, reload, keyname) {
	        var collection = this;
	        if (reload === undefined)
	            reload = false;
	        if (keyname === undefined)
	            keyname = 'key';
	        var promise = new Promise(function (resolve) {
	            if (!reload && collection.models.length > 0) {
	                resolve(findModel());
	            }
	            else {
	                collection.get(reload)
	                    .then(function () {
	                    resolve(findModel());
	                });
	            }
	        });
	        function findModel() {
	            return _.cloneDeep(_.find(collection.models, function (c) {
	                return c[keyname] == key;
	            }));
	        }
	        return promise;
	    };
	    ;
	    /**
	     * Returns a deep copy of the cached object
	     * @param model
	     * @param reload Optional. Default is false
	     * @returns {*}
	     */
	    BaseCollection.prototype.getModel = function (model, reload) {
	        var collection = this;
	        if (reload === undefined)
	            reload = false;
	        var promise = new Promise(function (resolve) {
	            if (!reload && collection.models.length > 0) {
	                resolve(findModel());
	            }
	            else {
	                collection.get(reload)
	                    .then(function () {
	                    resolve(findModel());
	                });
	            }
	        });
	        function findModel() {
	            return _.cloneDeep(_.find(collection.models, model));
	        }
	        return promise;
	    };
	    ;
	    return BaseCollection;
	}());
	exports.BaseCollection = BaseCollection;
	

/***/ },

/***/ 281:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/21/16.
	 */
	var core_1 = __webpack_require__(2);
	var FilterPipe = (function () {
	    function FilterPipe() {
	    }
	    FilterPipe.prototype.transform = function (items, searchText) {
	        var selectedItems = [];
	        if (searchText.length === 0) {
	            return items;
	        }
	        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
	            var item = items_1[_i];
	            var str = '';
	            for (var key in item) {
	                str += JSON.stringify(item[key]);
	            }
	            if (str.search(searchText) > -1) {
	                selectedItems.push(item);
	            }
	        }
	        return selectedItems;
	    };
	    FilterPipe = __decorate([
	        core_1.Pipe({
	            name: 'filter',
	            pure: false
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FilterPipe);
	    return FilterPipe;
	}());
	exports.FilterPipe = FilterPipe;
	

/***/ },

/***/ 282:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/3/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var dashboardctrl_1 = __webpack_require__(161);
	var DashboardModule = (function () {
	    function DashboardModule() {
	    }
	    DashboardModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ],
	            declarations: [
	                dashboardctrl_1.DashboardComponent
	            ],
	            exports: [
	                dashboardctrl_1.DashboardComponent,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DashboardModule);
	    return DashboardModule;
	}());
	exports.DashboardModule = DashboardModule;
	

/***/ },

/***/ 283:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/30/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var firstrunwizardservice_1 = __webpack_require__(75);
	var FirstrunACISettingsComponent = (function () {
	    function FirstrunACISettingsComponent(wizardService) {
	        this.wizardService = wizardService;
	        this.extra_vars = this.wizardService.extra_vars;
	        this.updatePage = new core_1.EventEmitter();
	    }
	    FirstrunACISettingsComponent.prototype.ngOnInit = function () {
	        this.extra_vars = this.wizardService.extra_vars;
	    };
	    FirstrunACISettingsComponent.prototype.updateAciSettings = function (extra_vars) {
	        this.wizardService.extra_vars = extra_vars;
	        this.updatePage.emit(3);
	    };
	    FirstrunACISettingsComponent.prototype.goBack = function () {
	        this.updatePage.emit(1);
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunACISettingsComponent.prototype, "updatePage", void 0);
	    FirstrunACISettingsComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunacisettings',
	            templateUrl: 'firstrunwizard/firstrunacisettings.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_b = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _b) || Object])
	    ], FirstrunACISettingsComponent);
	    return FirstrunACISettingsComponent;
	    var _a, _b;
	}());
	exports.FirstrunACISettingsComponent = FirstrunACISettingsComponent;
	

/***/ },

/***/ 284:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/30/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var firstrunwizardservice_1 = __webpack_require__(75);
	var FirstrunNetworkDefaultComponent = (function () {
	    function FirstrunNetworkDefaultComponent(wizardService) {
	        this.wizardService = wizardService;
	        this.setting = this.wizardService.setting;
	        this.updatePage = new core_1.EventEmitter();
	    }
	    FirstrunNetworkDefaultComponent.prototype.ngOnInit = function () {
	        this.setting = this.wizardService.setting;
	    };
	    FirstrunNetworkDefaultComponent.prototype.updateNetworkSettings = function (setting) {
	        this.wizardService.setting = setting;
	        this.updatePage.emit(2);
	    };
	    FirstrunNetworkDefaultComponent.prototype.goBack = function () {
	        this.updatePage.emit(0);
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunNetworkDefaultComponent.prototype, "updatePage", void 0);
	    FirstrunNetworkDefaultComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunnetworkdefault',
	            templateUrl: 'firstrunwizard/firstrunnetworkdefault.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_b = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _b) || Object])
	    ], FirstrunNetworkDefaultComponent);
	    return FirstrunNetworkDefaultComponent;
	    var _a, _b;
	}());
	exports.FirstrunNetworkDefaultComponent = FirstrunNetworkDefaultComponent;
	

/***/ },

/***/ 285:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/29/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 10/18/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var directives_module_1 = __webpack_require__(38);
	var router_1 = __webpack_require__(5);
	var firstrunwizardservice_1 = __webpack_require__(75);
	var firstrunwizardctrl_1 = __webpack_require__(162);
	var firstrunwizardpage1ctrl_1 = __webpack_require__(287);
	var firstrunnetworkdefaults_1 = __webpack_require__(284);
	var firstrunacisettings_1 = __webpack_require__(283);
	var firstrunwizardconfirmpage_1 = __webpack_require__(286);
	var FirstrunWizardModule = (function () {
	    function FirstrunWizardModule() {
	    }
	    FirstrunWizardModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                directives_module_1.DirectivesModule,
	                router_1.RouterModule
	            ],
	            declarations: [
	                firstrunwizardctrl_1.FirstrunWizardComponent,
	                firstrunwizardpage1ctrl_1.FirstrunWizardpage1Component,
	                firstrunnetworkdefaults_1.FirstrunNetworkDefaultComponent,
	                firstrunacisettings_1.FirstrunACISettingsComponent,
	                firstrunwizardconfirmpage_1.FirstrunConfirmComponent
	            ],
	            exports: [
	                firstrunwizardctrl_1.FirstrunWizardComponent,
	                firstrunwizardpage1ctrl_1.FirstrunWizardpage1Component,
	                firstrunnetworkdefaults_1.FirstrunNetworkDefaultComponent,
	                firstrunacisettings_1.FirstrunACISettingsComponent,
	                firstrunwizardconfirmpage_1.FirstrunConfirmComponent
	            ],
	            providers: [firstrunwizardservice_1.FirstRunWizardService]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FirstrunWizardModule);
	    return FirstrunWizardModule;
	}());
	exports.FirstrunWizardModule = FirstrunWizardModule;
	

/***/ },

/***/ 286:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/30/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var firstrunwizardservice_1 = __webpack_require__(75);
	var FirstrunConfirmComponent = (function () {
	    function FirstrunConfirmComponent(wizardservice, router, activatedRoute) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.wizardService = wizardservice;
	        this.updatePage = new core_1.EventEmitter();
	        this.showLoader = false;
	    }
	    FirstrunConfirmComponent.prototype.ngOnInit = function () {
	    };
	    FirstrunConfirmComponent.prototype.process = function () {
	        this.updatePage.emit(4);
	        // Will be calling the update settings funciton of wizard service,
	        // A loader will be shown un til all the updates are completed.
	        this.showLoader = true;
	        /*
	        this.wizardService.updateSettings()
	            .then((result) => {
	                this.loadDashboard();
	            }, (error) => {
	                this.loadDashboard();
	            });
	        */
	        this.loadDashboard();
	    };
	    FirstrunConfirmComponent.prototype.loadDashboard = function () {
	        this.showLoader = false;
	        jQuery(".ui.fullscreen.modal").modal('hide');
	        localStorage.setItem('firstRun', '');
	        this.router.navigate(['/m/dashboard']);
	    };
	    FirstrunConfirmComponent.prototype.goBack = function () {
	        this.updatePage.emit(2);
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunConfirmComponent.prototype, "updatePage", void 0);
	    FirstrunConfirmComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunwizardconfirmpage',
	            templateUrl: 'firstrunwizard/firstrunwizardconfirmpage.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_b = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object])
	    ], FirstrunConfirmComponent);
	    return FirstrunConfirmComponent;
	    var _a, _b, _c, _d;
	}());
	exports.FirstrunConfirmComponent = FirstrunConfirmComponent;
	

/***/ },

/***/ 287:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/30/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var FirstrunWizardpage1Component = (function () {
	    function FirstrunWizardpage1Component() {
	        this.updatePage = new core_1.EventEmitter();
	    }
	    FirstrunWizardpage1Component.prototype.process = function () {
	        this.updatePage.emit(1);
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunWizardpage1Component.prototype, "updatePage", void 0);
	    FirstrunWizardpage1Component = __decorate([
	        core_1.Component({
	            selector: 'firstrunwizardpage1',
	            templateUrl: 'firstrunwizard/firstrunwizardpage1.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], FirstrunWizardpage1Component);
	    return FirstrunWizardpage1Component;
	    var _a;
	}());
	exports.FirstrunWizardpage1Component = FirstrunWizardpage1Component;
	

/***/ },

/***/ 288:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/3/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var loginctrl_1 = __webpack_require__(163);
	var unauthorized_1 = __webpack_require__(165);
	var logoutctrl_1 = __webpack_require__(164);
	var LoginModule = (function () {
	    function LoginModule() {
	    }
	    LoginModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ],
	            declarations: [
	                loginctrl_1.LoginComponent,
	                logoutctrl_1.LogoutComponent,
	                unauthorized_1.UnauthorizedComponent
	            ],
	            exports: [
	                loginctrl_1.LoginComponent,
	                logoutctrl_1.LogoutComponent,
	                unauthorized_1.UnauthorizedComponent,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], LoginModule);
	    return LoginModule;
	}());
	exports.LoginModule = LoginModule;
	

/***/ },

/***/ 289:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 11/1/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var menuCtrl_1 = __webpack_require__(166);
	var directives_module_1 = __webpack_require__(38);
	var MenuModule = (function () {
	    function MenuModule() {
	    }
	    MenuModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ],
	            declarations: [
	                menuCtrl_1.MenuComponent
	            ],
	            exports: [
	                menuCtrl_1.MenuComponent,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], MenuModule);
	    return MenuModule;
	}());
	exports.MenuModule = MenuModule;
	

/***/ },

/***/ 290:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 10/19/16.
	 */
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var netprofilesmodel_1 = __webpack_require__(73);
	var BandwidthListComponent = (function () {
	    function BandwidthListComponent(netprofilesModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.netprofilesModel = netprofilesModel;
	        this.ngZone = ngZone;
	        this.crudHelperService = crudHelperService;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getPolicies(true);
	        });
	    }
	    BandwidthListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getPolicies(false);
	    };
	    BandwidthListComponent.prototype.getPolicies = function (reload) {
	        var bandwidthPolicyListCtrl = this;
	        this.netprofilesModel.get(reload)
	            .then(function (result) {
	            bandwidthPolicyListCtrl['policies'] = result;
	            bandwidthPolicyListCtrl.ngZone.run(function () {
	                bandwidthPolicyListCtrl.crudHelperService.stopLoader(bandwidthPolicyListCtrl);
	            });
	        }, function (error) {
	            bandwidthPolicyListCtrl.ngZone.run(function () {
	                bandwidthPolicyListCtrl.crudHelperService.stopLoader(bandwidthPolicyListCtrl);
	            });
	        });
	    };
	    BandwidthListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    BandwidthListComponent = __decorate([
	        core_1.Component({
	            selector: 'bandwidthpolicylist',
	            templateUrl: 'network_policies/bandwidthpolicylist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], BandwidthListComponent);
	    return BandwidthListComponent;
	    var _a, _b, _c;
	}());
	exports.BandwidthListComponent = BandwidthListComponent;
	

/***/ },

/***/ 291:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 10/19/16.
	 */
	var core_1 = __webpack_require__(2);
	var policiesmodel_1 = __webpack_require__(67);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var IsolationListComponent = (function () {
	    function IsolationListComponent(policiesModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.ngZone = ngZone;
	        this.crudHelperService = crudHelperService;
	        this.policiesModel = policiesModel;
	        this.isolationPolicyListCtrl = this;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getPolicies(true);
	        });
	    }
	    IsolationListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getPolicies(false);
	    };
	    IsolationListComponent.prototype.getPolicies = function (reload) {
	        var isolationPolicyListCtrl = this;
	        this.policiesModel.get(reload)
	            .then(function (result) {
	            isolationPolicyListCtrl['policies'] = result;
	            isolationPolicyListCtrl.ngZone.run(function () {
	                isolationPolicyListCtrl.crudHelperService.stopLoader(isolationPolicyListCtrl);
	            });
	        }, function (error) {
	            isolationPolicyListCtrl.ngZone.run(function () {
	                isolationPolicyListCtrl.crudHelperService.stopLoader(isolationPolicyListCtrl);
	            });
	        });
	    };
	    IsolationListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    IsolationListComponent = __decorate([
	        core_1.Component({
	            selector: 'isolationpolicylist',
	            templateUrl: 'network_policies/isolationpolicylist.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], IsolationListComponent);
	    return IsolationListComponent;
	    var _a, _b, _c;
	}());
	exports.IsolationListComponent = IsolationListComponent;
	

/***/ },

/***/ 292:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/14/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(38);
	var networkpoliciestabsctrl_1 = __webpack_require__(69);
	var isolationpolicycreatectrl_1 = __webpack_require__(169);
	var isolationpolicydetailsctrl_1 = __webpack_require__(170);
	var bandwidthpolicycreatectrl_1 = __webpack_require__(167);
	var bandwidthpolicydetailsctrl_1 = __webpack_require__(168);
	var isolationpolicylistctrl_1 = __webpack_require__(291);
	var bandwidthpolicylistctrl_1 = __webpack_require__(290);
	var NetworkPoliciesModule = (function () {
	    function NetworkPoliciesModule() {
	    }
	    NetworkPoliciesModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ],
	            declarations: [
	                networkpoliciestabsctrl_1.NetworkPoliciesTabsComponent,
	                isolationpolicycreatectrl_1.IsolationPolicyCreateComponent,
	                isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent,
	                bandwidthpolicycreatectrl_1.BandwidthPolicyCreateComponent,
	                bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent,
	                bandwidthpolicycreatectrl_1.BandwidthPolicyCreateComponent,
	                isolationpolicylistctrl_1.IsolationListComponent,
	                bandwidthpolicylistctrl_1.BandwidthListComponent
	            ],
	            exports: [
	                networkpoliciestabsctrl_1.NetworkPoliciesTabsComponent,
	                isolationpolicycreatectrl_1.IsolationPolicyCreateComponent,
	                isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent,
	                bandwidthpolicycreatectrl_1.BandwidthPolicyCreateComponent,
	                bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent,
	                isolationpolicylistctrl_1.IsolationListComponent,
	                bandwidthpolicylistctrl_1.BandwidthListComponent,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NetworkPoliciesModule);
	    return NetworkPoliciesModule;
	}());
	exports.NetworkPoliciesModule = NetworkPoliciesModule;
	

/***/ },

/***/ 293:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 10/18/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var directives_module_1 = __webpack_require__(38);
	var networklistctrl_1 = __webpack_require__(173);
	var networkstatsctrl_1 = __webpack_require__(295);
	var networkdetailsctrl_1 = __webpack_require__(172);
	var networkinfoctrl_1 = __webpack_require__(294);
	var networkcreatectrl_1 = __webpack_require__(171);
	var router_1 = __webpack_require__(5);
	var NetworkModule = (function () {
	    function NetworkModule() {
	    }
	    NetworkModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                directives_module_1.DirectivesModule,
	                router_1.RouterModule
	            ],
	            declarations: [
	                networklistctrl_1.NetworkListComponent,
	                networkstatsctrl_1.NetworkStatComponent,
	                networkinfoctrl_1.NetworkInfoComponent,
	                networkdetailsctrl_1.NetworkdetailsComponent,
	                networkcreatectrl_1.NetworkCreateComponent
	            ],
	            exports: [
	                networklistctrl_1.NetworkListComponent,
	                networkstatsctrl_1.NetworkStatComponent,
	                networkinfoctrl_1.NetworkInfoComponent,
	                networkdetailsctrl_1.NetworkdetailsComponent,
	                networkcreatectrl_1.NetworkCreateComponent
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NetworkModule);
	    return NetworkModule;
	}());
	exports.NetworkModule = NetworkModule;
	

/***/ },

/***/ 294:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/25/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var NetworkInfoComponent = (function () {
	    function NetworkInfoComponent() {
	        this.networkDetailsCtrl = { network: { networkName: '', encap: '', subnet: '', gateway: '' },
	            showLoader: false,
	            applicationGroups: []
	        };
	    }
	    __decorate([
	        core_1.Input('networkDetailsCtrl'), 
	        __metadata('design:type', Object)
	    ], NetworkInfoComponent.prototype, "networkDetailsCtrl", void 0);
	    NetworkInfoComponent = __decorate([
	        core_1.Component({
	            selector: 'network-info',
	            templateUrl: 'networks/networkinfo.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NetworkInfoComponent);
	    return NetworkInfoComponent;
	}());
	exports.NetworkInfoComponent = NetworkInfoComponent;
	

/***/ },

/***/ 295:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var crudhelperservice_1 = __webpack_require__(9);
	var rxjs_1 = __webpack_require__(29);
	var networksmodel_1 = __webpack_require__(45);
	var inspectservice_1 = __webpack_require__(93);
	var util_1 = __webpack_require__(51);
	var contivglobals_1 = __webpack_require__(15);
	var NetworkStatComponent = (function () {
	    function NetworkStatComponent(networksModel, crudHelperService, inspectSerrvice, ngZone) {
	        var _this = this;
	        this.ngZone = ngZone;
	        this.crudHelperService = crudHelperService;
	        this.networksModel = networksModel;
	        this.inspectSerrvice = inspectSerrvice;
	        this.statKey = '';
	        this.showLoader = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            if (_this.statKey != '')
	                _this.getNetworkInspect(true);
	        });
	        this.networkInspectStats = {
	            allocatedAddressesCount: '',
	            allocatedIPAddresses: '',
	            dnsServerIP: '',
	            externalPktTag: '',
	            numEndpoints: '',
	            pktTag: ''
	        };
	        this.config = { networkName: '', };
	        this.endpoints = [];
	        this.filteredendpoints = [];
	        this.containerDetails = {};
	        this.networkStatsCtrl = this;
	    }
	    NetworkStatComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        if (this.statKey != '')
	            this.getNetworkInspect(false);
	    };
	    NetworkStatComponent.prototype.getNetworkInspect = function (reload) {
	        var networkStatsCtrl = this;
	        this.networksModel.getInspectByKey(this.statKey, contivglobals_1.ContivGlobals.NETWORKS_INSPECT_ENDPOINT, reload)
	            .then(function (result) {
	            networkStatsCtrl['networkInspectStats'] = result['Oper'];
	            networkStatsCtrl['config'] = result['Config'];
	            if (!util_1.isUndefined(result['Oper'].endpoints)) {
	                var containerDetails = networkStatsCtrl.inspectSerrvice.buildEndPoints(result['Oper'].endpoints);
	                if (networkStatsCtrl.inspectSerrvice.checkContainerChanged(networkStatsCtrl['containerDetails'], containerDetails)) {
	                    networkStatsCtrl['endpoints'] = result['Oper'].endpoints;
	                    networkStatsCtrl['containerDetails'] = containerDetails;
	                }
	            }
	            else {
	                networkStatsCtrl['endpoints'] = [];
	                networkStatsCtrl['containerDetails'] = {};
	            }
	            networkStatsCtrl.ngZone.run(function () {
	                networkStatsCtrl.crudHelperService.stopLoader(networkStatsCtrl);
	            });
	        }, function (error) {
	            networkStatsCtrl.ngZone.run(function () {
	                networkStatsCtrl.crudHelperService.stopLoader(networkStatsCtrl);
	            });
	        });
	    };
	    NetworkStatComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    __decorate([
	        core_1.Input('statKey'), 
	        __metadata('design:type', String)
	    ], NetworkStatComponent.prototype, "statKey", void 0);
	    NetworkStatComponent = __decorate([
	        core_1.Component({
	            selector: 'network-stat',
	            templateUrl: 'networks/networkstats.html'
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], NetworkStatComponent);
	    return NetworkStatComponent;
	    var _a, _b, _c, _d;
	}());
	exports.NetworkStatComponent = NetworkStatComponent;
	

/***/ },

/***/ 296:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 10/18/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(38);
	var organizationlistctrl_1 = __webpack_require__(176);
	var organizationcreatectrl_1 = __webpack_require__(174);
	var organizationdetailsctrl_1 = __webpack_require__(175);
	var OrganizationModule = (function () {
	    function OrganizationModule() {
	    }
	    OrganizationModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ],
	            declarations: [
	                organizationlistctrl_1.OrganizationListComponent,
	                organizationcreatectrl_1.OrganizationCreateComponent,
	                organizationdetailsctrl_1.OrganizationDetailsComponent
	            ],
	            exports: [
	                organizationlistctrl_1.OrganizationListComponent,
	                organizationcreatectrl_1.OrganizationCreateComponent,
	                organizationdetailsctrl_1.OrganizationDetailsComponent,
	                directives_module_1.DirectivesModule,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], OrganizationModule);
	    return OrganizationModule;
	}());
	exports.OrganizationModule = OrganizationModule;
	

/***/ },

/***/ 297:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/18/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var directives_module_1 = __webpack_require__(38);
	var servicelblistctrl_1 = __webpack_require__(180);
	var servicelbstatsctrl_1 = __webpack_require__(181);
	var servicelbportsdirective_1 = __webpack_require__(298);
	var servicelbcreatectrl_1 = __webpack_require__(177);
	var servicelbinfoctrl_1 = __webpack_require__(179);
	var servicelbdetailsctrl_1 = __webpack_require__(178);
	var router_1 = __webpack_require__(5);
	var ServicelbModule = (function () {
	    function ServicelbModule() {
	    }
	    ServicelbModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                directives_module_1.DirectivesModule,
	                router_1.RouterModule
	            ],
	            declarations: [
	                servicelblistctrl_1.ServicelbListComponent,
	                servicelbstatsctrl_1.ServicelbStatComponent,
	                servicelbportsdirective_1.ServicelbPortsComponent,
	                servicelbcreatectrl_1.ServicelbCreateComponent,
	                servicelbinfoctrl_1.ServicelbInfoComponent,
	                servicelbdetailsctrl_1.ServicelbDetailsComponent
	            ],
	            exports: [
	                servicelblistctrl_1.ServicelbListComponent,
	                servicelbstatsctrl_1.ServicelbStatComponent,
	                servicelbportsdirective_1.ServicelbPortsComponent,
	                servicelbcreatectrl_1.ServicelbCreateComponent,
	                servicelbinfoctrl_1.ServicelbInfoComponent,
	                servicelbdetailsctrl_1.ServicelbDetailsComponent
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ServicelbModule);
	    return ServicelbModule;
	}());
	exports.ServicelbModule = ServicelbModule;
	

/***/ },

/***/ 298:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 10/17/16.
	 */
	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(2);
	var _ = __webpack_require__(26);
	var ServicelbPortsComponent = (function () {
	    function ServicelbPortsComponent() {
	        this.itemsChange = new core_1.EventEmitter();
	        this.items = [];
	        this.newItem = { servicePort: '', providerPort: '', protocol: '' };
	    }
	    ServicelbPortsComponent.prototype.resetItem = function () {
	        this.newItem = { servicePort: '', providerPort: '', protocol: '' };
	    };
	    ServicelbPortsComponent.prototype.add = function () {
	        function compare(val1, val2) {
	            return val1 == val2;
	        }
	        if (this.newItem.servicePort == '' && this.newItem.providerPort == '' && this.newItem.protocol == '') {
	            return;
	        }
	        var newItemStr = this.newItem.servicePort + ':' + this.newItem.providerPort + ':' + this.newItem.protocol;
	        _.pullAllWith(this.items, [newItemStr], compare);
	        this.items.push(newItemStr);
	        this.itemsChange.emit(this.items);
	        this.resetItem();
	    };
	    ServicelbPortsComponent.prototype.remove = function (passedItem) {
	        _.remove(this.items, function (item) {
	            return item == passedItem;
	        });
	    };
	    __decorate([
	        core_1.Input('items'), 
	        __metadata('design:type', Array)
	    ], ServicelbPortsComponent.prototype, "items", void 0);
	    __decorate([
	        core_1.Output('itemsChange'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], ServicelbPortsComponent.prototype, "itemsChange", void 0);
	    ServicelbPortsComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-servicelbports',
	            templateUrl: 'service_lbs/servicelbports.html'
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ServicelbPortsComponent);
	    return ServicelbPortsComponent;
	    var _a;
	}());
	exports.ServicelbPortsComponent = ServicelbPortsComponent;
	

/***/ },

/***/ 299:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by vjain3 on 10/25/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(38);
	var networksettingctrl_1 = __webpack_require__(182);
	var settingsmenu_component_1 = __webpack_require__(186);
	var nodelist_component_1 = __webpack_require__(185);
	var nodecreate_component_1 = __webpack_require__(183);
	var nodedetails_component_1 = __webpack_require__(184);
	var SettingsModule = (function () {
	    function SettingsModule() {
	    }
	    SettingsModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ],
	            declarations: [
	                settingsmenu_component_1.SettingsMenuComponent,
	                networksettingctrl_1.NetworkSettingsComponent,
	                nodelist_component_1.NodeListComponent,
	                nodecreate_component_1.NodeCreateComponent,
	                nodedetails_component_1.NodeDetailsComponent
	            ],
	            exports: [
	                settingsmenu_component_1.SettingsMenuComponent,
	                networksettingctrl_1.NetworkSettingsComponent,
	                nodelist_component_1.NodeListComponent,
	                nodecreate_component_1.NodeCreateComponent,
	                nodedetails_component_1.NodeDetailsComponent,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SettingsModule);
	    return SettingsModule;
	}());
	exports.SettingsModule = SettingsModule;
	

/***/ },

/***/ 300:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	/**
	 * Created by cshampur on 10/18/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(24);
	var common_1 = __webpack_require__(18);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(38);
	var userlist_component_1 = __webpack_require__(189);
	var usercreate_component_1 = __webpack_require__(187);
	var userdetails_component_1 = __webpack_require__(188);
	var UsersModule = (function () {
	    function UsersModule() {
	    }
	    UsersModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ],
	            declarations: [
	                userlist_component_1.UserListComponent,
	                usercreate_component_1.UserCreateComponent,
	                userdetails_component_1.UserDetailsComponent
	            ],
	            exports: [
	                userlist_component_1.UserListComponent,
	                usercreate_component_1.UserCreateComponent,
	                userdetails_component_1.UserDetailsComponent,
	                directives_module_1.DirectivesModule,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], UsersModule);
	    return UsersModule;
	}());
	exports.UsersModule = UsersModule;
	

/***/ },

/***/ 461:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(462)();
	// imports


	// module
	exports.push([module.id, ".copyright {\n    max-width: 450px;\n}\n\n.login-seg {\n    margin-top: 600px;\n}", ""]);

	// exports


/***/ },

/***/ 462:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 465:
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"left aligned twelve wide column\">\n        <div class=\"content\" style=\"font-size: 24px\">Application Groups</div>\n    </div>\n\n    <div class=\"center aligned four wide column\">\n        <button class=\"ui blue button\" (click)=\"create()\">\n            <i class=\"add icon\"></i>\n            Create Application Group\n        </button>\n    </div>\n</div>\n\n<div class=\"ui basic segment\">\n    <div class=\"ui active inverted dimmer\" *ngIf=\"applicationGroupListCtrl.showLoader\">\n        <div class=\"ui loader\"></div>\n    </div>\n    <ctv-table #tableRef [defaultSortColumn]=\"'groupName'\"\n               [items]=\"applicationGroupListCtrl['groups']\"\n               (filtereditems)=\"applicationGroupListCtrl['filteredgroups']=$event;\"\n               [size]=\"12\">\n        <thead>\n            <tr>\n                <th><ctv-th [sortfield]=\"'groupName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Network</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'policies'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Policies</ctv-th></th>\n                <th class=\"right floated three wide column\">\n                    <ctv-search (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [placeholder]=\"'Search application groups...'\"></ctv-search>\n                </th>\n            </tr>\n        </thead>\n\n        <tbody>\n            <tr *ngFor=\"let group of applicationGroupListCtrl['filteredgroups']\">\n                <td><a [routerLink]=\"['../details', group.key]\">{{group.groupName}}</a></td>\n                <td>{{group.networkName}}</td>\n                <td>{{group.policies.join(\", \")}}</td>\n                <td></td>\n            </tr>\n        </tbody>\n\n        <tfoot>\n            <tr>\n                <td colspan=\"4\">\n                    <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                     (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                     (prevChunk)=\"tableRef.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef.showNextChunk()\">\n\n                    </ctv-tpagination>\n                </td>\n            </tr>\n        </tfoot>\n    </ctv-table>\n</div>"

/***/ },

/***/ 466:
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"left aligned thirteen wide column\">\n        <div class=\"content\" style=\"font-size: 24px\">Networks</div>\n    </div>\n\n    <div class=\"center aligned three wide column\" *auth=\"'SysAdmin'\">\n        <button class=\"ui blue button\" (click)=\"create()\">\n            <i class=\"add icon\"></i>\n            Create Network\n        </button>\n    </div>\n</div>\n\n<div class=\"ui basic segment\">\n\n    <div class=\"ui active inverted dimmer\" *ngIf=\"networkListComp.showLoader\">\n        <div class=\"ui loader\"></div>\n    </div>\n\n    <ctv-table #tableRef [defaultSortColumn]=\"'networkName'\"\n               [items]=\"networkListComp['networks']\"\n               (filtereditems)=\"networkListComp['filterednetworks']=$event;\"\n               [size]=\"12\">\n        <thead>\n        <tr>\n            <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n            <th><ctv-th [sortfield]=\"'encap'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Encapsulation</ctv-th></th>\n            <th><ctv-th [sortfield]=\"'subnet'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Subnet</ctv-th></th>\n            <th><ctv-th [sortfield]=\"'gateway'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Gateway</ctv-th></th>\n            <th class=\"right floated three wide column\">\n                <ctv-search (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [placeholder]=\"'Search networks...'\"></ctv-search>\n            </th>\n        </tr>\n        </thead>\n\n        <tbody>\n        <tr *ngFor=\"let network of networkListComp['filterednetworks']\">\n            <td><a [routerLink]=\"['../details',network.key]\">{{network.networkName}}</a></td>\n            <td>{{network.encap}}</td>\n            <td>{{network.subnet}}</td>\n            <td>{{network.gateway}}</td>\n            <td></td>\n        </tr>\n        </tbody>\n        <tfoot>\n        <tr>\n            <td colspan=\"5\">\n                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                </ctv-tpagination>\n            </td>\n        </tr>\n        </tfoot>\n    </ctv-table>\n</div>"

/***/ },

/***/ 733:
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(461);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },

/***/ 734:
/***/ function(module, exports) {

	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor
	    var TempCtor = function () {}
	    TempCtor.prototype = superCtor.prototype
	    ctor.prototype = new TempCtor()
	    ctor.prototype.constructor = ctor
	  }
	}


/***/ },

/***/ 735:
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }

});
//# sourceMappingURL=main.map