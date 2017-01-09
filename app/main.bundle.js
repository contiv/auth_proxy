webpackJsonp([2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by vjain3 on 10/6/16.
	 */
	var platform_browser_dynamic_1 = __webpack_require__(161);
	var app_module_1 = __webpack_require__(395);
	platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
	

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
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
	var notification_1 = __webpack_require__(99);
	var CRUDHelperService = (function () {
	    function CRUDHelperService() {
	        this.message = '';
	        this.item = '';
	    }
	    CRUDHelperService.prototype.startLoader = function (controller) {
	        controller.showLoader = true;
	    };
	    CRUDHelperService.prototype.stopLoader = function (controller) {
	        controller.showLoader = false;
	    };
	    CRUDHelperService.prototype.showNotification = function (message, item, notifyType) {
	        this.message = message;
	        this.item = item;
	        this.notificationType = notifyType;
	        this.displayNotify = true;
	    };
	    CRUDHelperService.prototype.showServerError = function (message, error) {
	        var status = error.status;
	        var operationstate = '';
	        if (status == '401' || status == '402') {
	            operationstate = 'Unauthorized Operation';
	        }
	        if (error.text().length > 0)
	            operationstate = error.text();
	        else
	            operationstate = error.toString();
	        this.showNotification(message, operationstate, notification_1.NotificationType.alert);
	    };
	    CRUDHelperService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], CRUDHelperService);
	    return CRUDHelperService;
	}());
	exports.CRUDHelperService = CRUDHelperService;
	

/***/ },
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/***/ function(module, exports) {

	"use strict";
	/**
	 * Created by vjain3 on 11/2/16.
	 * 12/21/16: updating API paths for ccn_proxy [catw]
	 */
	exports.ContivGlobals = {
	    //REST endpoints for NETMASTER
	    'NETWORKS_ENDPOINT': '/api/v1/networks/',
	    'NETWORKS_INSPECT_ENDPOINT': '/api/v1/inspect/networks/',
	    'SERVICELBS_INSPECT_ENDPOINT': '/api/v1/inspect/serviceLBs/',
	    'POLICIES_ENDPOINT': '/api/v1/policys/',
	    'POLICIES_INSPECT_ENDPOINT': '/api/v1/inspect/policys/',
	    'RULES_ENDPOINT': '/api/v1/rules/',
	    'APPLICATIONGROUPS_ENDPOINT': '/api/v1/endpointGroups/',
	    'APPLICATIONGROUPS_INSPECT_ENDPOINT': '/api/v1/inspect/endpointGroups/',
	    'SERVICELBS_ENDPOINT': '/api/v1/serviceLBs/',
	    'ORGANIZATIONS_ENDPOINT': '/api/v1/tenants/',
	    'NETWORK_SETTINGS_ENDPOINT': '/api/v1/globals/',
	    'GLOBAL_NETWORK_INSPECT_ENDPOINT': '/api/v1/inspect/globals/',
	    'ACI_SETTINGS_ENDPOINT': '/api/v1/aciGws/',
	    'NETPROFILES_ENDPOINT': '/api/v1/netprofiles/',
	    'BGPS_ENDPOINT': '/api/v1/Bgps/',
	    'BGPS_INSPECT_ENDPOINT': '/api/v1/inspect/Bgps/',
	    'APP_PROFILES_ENDPOINT': '/api/v1/appProfiles/',
	    'CONTRACTS_ENDPOINT': '/api/v1/extContractsGroups/',
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
	    //REST endpoint for Login
	    'LOGIN_ENDPOINT': '/api/v1/ccn_proxy/login',
	    //REST endpoints for USER
	    'USERS_ENDPOINT': '/api/v1/ccn_proxy/local_users',
	    'LDAP_ENDPOINT': '/api/v1/ccn_proxy/ldap_configuration',
	    'AUTHORIZATION_ENDPOINT': '/api/v1/ccn_proxy/authorizations',
	    //Refresh interval in milliseconds
	    'REFRESH_INTERVAL': 5000,
	    //RegEx for validation
	    'CIDR_REGEX': '^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])(\/([0-9]|[1-2][0-9]|3[0-2]))$',
	    'VLAN_REGEX': '^([0-9]{1,4}?-[0-9]{1,4}?)$',
	    'VXLAN_REGEX': '^([0-9]{1,8}?-[0-9]{1,8}?)$',
	    'NUMBER_REGEX': '^[0-9]*$',
	    // System strings
	    'PRODUCT_NAME': 'Unified Container Networking',
	    'PRODUCT_VERSION': 'TP_1.0.0'
	};
	

/***/ },
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
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

	exports.isBuffer = __webpack_require__(1021);

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
	exports.inherits = __webpack_require__(1020);

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

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(356)))

/***/ },
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */
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
	var http_1 = __webpack_require__(23);
	var authservice_1 = __webpack_require__(54);
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
	    ApiService.prototype.patch = function (url, body) {
	        var options = this.prepareHeader('patch');
	        return this.http.patch(url, body, options);
	    };
	    ApiService.prototype.prepareHeader = function (method) {
	        this.headers = new http_1.Headers();
	        if (method != 'get' && method != 'delete')
	            this.headers.append('Content-Type', 'application/json');
	        if (this.authService.authToken.length > 0)
	            this.headers.append('X-Auth-Token', this.authService.authToken);
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
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
/* 35 */,
/* 36 */,
/* 37 */
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
	var common_1 = __webpack_require__(20);
	var errormessagedirective_1 = __webpack_require__(408);
	var tabledirective_1 = __webpack_require__(414);
	var forms_1 = __webpack_require__(26);
	var accordiondirective_1 = __webpack_require__(405);
	var collapsibledirective_1 = __webpack_require__(407);
	var namevaluedirective_1 = __webpack_require__(410);
	var authdirective_1 = __webpack_require__(406);
	var networksettingcomponent_1 = __webpack_require__(413);
	var acisettingcomponent_1 = __webpack_require__(411);
	var linegraphcomponent_1 = __webpack_require__(409);
	var ng2_charts_1 = __webpack_require__(146);
	var notification_1 = __webpack_require__(99);
	var ldapsettingcomponent_1 = __webpack_require__(412);
	var DirectivesModule = (function () {
	    function DirectivesModule() {
	    }
	    DirectivesModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                common_1.CommonModule, forms_1.FormsModule, ng2_charts_1.ChartsModule
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
	                acisettingcomponent_1.AciSettingComponent,
	                linegraphcomponent_1.LineGraphComponent,
	                notification_1.NotificationComponent,
	                ldapsettingcomponent_1.LdapSettingsComponent
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
	                acisettingcomponent_1.AciSettingComponent,
	                linegraphcomponent_1.LineGraphComponent,
	                notification_1.NotificationComponent,
	                ldapsettingcomponent_1.LdapSettingsComponent
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], DirectivesModule);
	    return DirectivesModule;
	}());
	exports.DirectivesModule = DirectivesModule;
	

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var basecollection_1 = __webpack_require__(415);
	var _ = __webpack_require__(28);
	var util_1 = __webpack_require__(19);
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
	        this.cudOperationFlag = false;
	    }
	    /**
	     *
	     * @param model
	     * @param url Optional if not passed it is constructed using key and url passed in constructor
	     * @returns {*}
	     */
	    Collection.prototype.create = function (model, url, key) {
	        var collection = this;
	        if (util_1.isUndefined(key))
	            key = 'key';
	        var promise = new Promise(function (resolve, reject) {
	            if (url === undefined)
	                url = collection.url + model.key + '/';
	            collection.cudOperationFlag = true;
	            collection.apiService.post(url, model).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                var responseData = response;
	                //For rest endpoints that do not return created json object in response
	                if ((responseData === undefined) || (responseData === '')) {
	                    responseData = model;
	                }
	                _.remove(collection.models, function (n) {
	                    return n[key] == model[key];
	                });
	                collection.models.push(responseData);
	                collection.cudOperationFlag = false;
	                resolve(responseData);
	            }, function errorCallback(response) {
	                collection.cudOperationFlag = false;
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
	            collection.cudOperationFlag = true;
	            collection.apiService.put(url, model).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                _.remove(collection.models, function (n) {
	                    return n['key'] == model['key'];
	                });
	                collection.models.push(response);
	                collection.cudOperationFlag = false;
	                resolve(response);
	            }, function errorCallback(response) {
	                collection.cudOperationFlag = false;
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
	            collection.cudOperationFlag = true;
	            collection.apiService.delete(url).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(response) {
	                _.remove(collection.models, function (n) {
	                    return n['key'] == model['key'];
	                });
	                collection.cudOperationFlag = false;
	                resolve(response);
	            }, function errorCallback(response) {
	                collection.cudOperationFlag = false;
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
	            collection.cudOperationFlag = true;
	            collection.apiService.delete(url).map(function (res) {
	                if (res.statusText === 'No Content')
	                    return key;
	                else
	                    return res.json();
	            }).toPromise()
	                .then(function successCallback(response) {
	                _.remove(collection.models, function (n) {
	                    return n[keyname] == key;
	                });
	                collection.cudOperationFlag = false;
	                resolve(response);
	            }, function errorCallback(response) {
	                collection.cudOperationFlag = false;
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
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(19);
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
	    ApplicationGroupsModel.prototype.getInspectByKey = function (key, url, reload) {
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
/* 48 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var util_1 = __webpack_require__(19);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
	    NetworksModel.prototype.get = function (reload) {
	        var collection = this;
	        if (collection.cudOperationFlag) {
	            return new Promise(function (resolve, reject) {
	                resolve(collection.models);
	            });
	        }
	        else {
	            return _super.prototype.get.call(this, reload);
	        }
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
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */
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
	__webpack_require__(359);
	__webpack_require__(361);
	__webpack_require__(360);
	var http_1 = __webpack_require__(23);
	var authMatrix_1 = __webpack_require__(169);
	var util_1 = __webpack_require__(19);
	var contivglobals_1 = __webpack_require__(11);
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
	        this.headers = new http_1.Headers();
	        this.headers.append('Content-Type', 'application/json');
	        var options = new http_1.RequestOptions({ headers: this.headers });
	        /* Use the below code if you are calling netmaster apis through CCN_Proxy */
	        return this.http.post(contivglobals_1.ContivGlobals.LOGIN_ENDPOINT, user, options)
	            .map(function (res) {
	            var s = _this.extractToken(res);
	            if (s) {
	                _this.isLoggedIn = true;
	                return true;
	            }
	            else {
	                _this.isLoggedIn = false;
	                return false;
	            }
	        })
	            .catch(function (error) { return Observable_1.Observable.throw(error); });
	        /* This is just a mock. Use the below code if you are calling netmaster apis directly
	        return new Observable((observer) => {
	            if (user.username != "devops" && user.username != "admin")
	                observer.next(false);
	            else{
	                var res = '';

	                if (user.username == "devops" && user.password == "devops")
	                    var res = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNDgxODAwNDc0LCJpc3MiOiJjY25fcHJveHkiLCJyb2xlIjoiYWRtaW4iLCJ1c2VybmFtZSI6ImFkbWluIn0.U9-yhzl-Q7BKYIROdNf-BwtvXVukTpJL-_Z0Jsddfmc";

	                if (user.username == "admin" && user.password == "admin")
	                    var res = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6dHJ1ZSwiZXhwIjoxNDgxODAwNDc0LCJpc3MiOiJjY25fcHJveHkiLCJyb2xlIjoib3BzIiwidXNlcm5hbWUiOiJvcHMifQ==.U9-yhzl-Q7BKYIROdNf-BwtvXVukTpJL-_Z0Jsddfmc";

	                if (res == ''){
	                    observer.next(false);
	                }
	                else{
	                    this.isLoggedIn = true;
	                    localStorage.setItem("authToken", res);
	                    localStorage.setItem("loginTime", new Date().toLocaleString());
	                    localStorage.setItem("lastAccessTime", new Date().toLocaleString());
	                    this.extractBody();
	                    observer.next(true);
	                }
	            }



	        });
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
	        /* CCN_Proxy is now sending the token as part of the body */
	        var xAuthToken = res.json()['token'];
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
/* 55 */
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
	    PolicyTab[PolicyTab["contractGroup"] = 2] = "contractGroup";
	})(exports.PolicyTab || (exports.PolicyTab = {}));
	var PolicyTab = exports.PolicyTab;
	var NetworkPoliciesTabsComponent = (function () {
	    function NetworkPoliciesTabsComponent(activatedRoute, router) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.isolationPolicySelected = true;
	        this.bandwidthPolicySelected = false;
	        this.contractGroupSelected = false;
	        this.policyTab = PolicyTab;
	        this.policyMode = 'isolation';
	        this.selectPolicyTab(+activatedRoute.snapshot.params['policyTab']);
	    }
	    NetworkPoliciesTabsComponent.prototype.createNetworkPolicy = function () {
	        if (this.isolationPolicySelected) {
	            this.router.navigate(['../isolation/create'], { relativeTo: this.activatedRoute });
	        }
	        if (this.bandwidthPolicySelected) {
	            this.router.navigate(['../bandwidth/create'], { relativeTo: this.activatedRoute });
	        }
	        if (this.contractGroupSelected) {
	            this.router.navigate(['../contractgroup/create'], { relativeTo: this.activatedRoute });
	        }
	    };
	    NetworkPoliciesTabsComponent.prototype.selectPolicyTab = function (tab) {
	        switch (tab) {
	            case PolicyTab.isolation:
	                this.isolationPolicySelected = true;
	                this.bandwidthPolicySelected = false;
	                this.contractGroupSelected = false;
	                this.policyMode = 'isolation';
	                break;
	            case PolicyTab.bandwidth:
	                this.isolationPolicySelected = false;
	                this.bandwidthPolicySelected = true;
	                this.contractGroupSelected = false;
	                this.policyMode = 'bandwidth';
	                break;
	            case PolicyTab.contractGroup:
	                this.isolationPolicySelected = false;
	                this.bandwidthPolicySelected = false;
	                this.contractGroupSelected = true;
	                this.policyMode = 'contractgroup';
	                break;
	            default:
	                this.isolationPolicySelected = true;
	                this.bandwidthPolicySelected = false;
	                this.contractGroupSelected = false;
	                this.policyMode = 'isolation';
	                break;
	        }
	    };
	    NetworkPoliciesTabsComponent = __decorate([
	        core_1.Component({
	            selector: 'networkpoliciestabs',
	            template: __webpack_require__(725)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object])
	    ], NetworkPoliciesTabsComponent);
	    return NetworkPoliciesTabsComponent;
	    var _a, _b;
	}());
	exports.NetworkPoliciesTabsComponent = NetworkPoliciesTabsComponent;
	

/***/ },
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	var freeGlobal = __webpack_require__(242);

	/** Detect free variable `self`. */
	var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

	/** Used as a reference to the global object. */
	var root = freeGlobal || freeSelf || Function('return this')();

	module.exports = root;


/***/ },
/* 62 */,
/* 63 */,
/* 64 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(19);
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
	    PoliciesModel.prototype.getInspectByKey = function (key, url, reload) {
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
	    PoliciesModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], PoliciesModel);
	    return PoliciesModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.PoliciesModel = PoliciesModel;
	

/***/ },
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
/* 73 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
/* 74 */,
/* 75 */,
/* 76 */
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
/* 77 */,
/* 78 */,
/* 79 */
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
	 * Created by vjain3 on 12/13/16.
	 */
	var core_1 = __webpack_require__(2);
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
	var ContractGroupsModel = (function (_super) {
	    __extends(ContractGroupsModel, _super);
	    function ContractGroupsModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.CONTRACTS_ENDPOINT, apiService);
	    }
	    /**
	     * Generate policy key to save policy on server
	     * @param policy
	     * @returns {string}
	     */
	    ContractGroupsModel.prototype.generateKey = function (contractGroup) {
	        return contractGroup.tenantName + ':' + contractGroup.contractsGroupName;
	    };
	    ContractGroupsModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], ContractGroupsModel);
	    return ContractGroupsModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.ContractGroupsModel = ContractGroupsModel;
	

/***/ },
/* 80 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(19);
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
	    NetprofilesModel.prototype.get = function (reload) {
	        return _super.prototype.get.call(this, reload).then(function (result) {
	            var items = result.filter(function (item) {
	                return !util_1.isUndefined(item['profileName']);
	            });
	            return items;
	        });
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
/* 81 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
	var _ = __webpack_require__(28);
	var UsersModel = (function (_super) {
	    __extends(UsersModel, _super);
	    function UsersModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.USERS_ENDPOINT, apiService);
	    }
	    UsersModel.prototype.save = function (model) {
	        var collection = this;
	        var url = contivglobals_1.ContivGlobals.USERS_ENDPOINT + '/' + model['username'];
	        return this.apiService.patch(url, model).map(function (res) { return res.json(); }).toPromise()
	            .then(function (result) {
	            _.remove(collection.models, function (n) {
	                return n['username'] == model['username'];
	            });
	            collection.models.push(result);
	            return result;
	        });
	    };
	    UsersModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], UsersModel);
	    return UsersModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.UsersModel = UsersModel;
	

/***/ },
/* 82 */
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
	var rxjs_1 = __webpack_require__(17);
	var authservice_1 = __webpack_require__(54);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
	var util_1 = __webpack_require__(19);
	(function (EndpointType) {
	    EndpointType[EndpointType["Network"] = 0] = "Network";
	    EndpointType[EndpointType["ApplicationGroup"] = 1] = "ApplicationGroup";
	})(exports.EndpointType || (exports.EndpointType = {}));
	var EndpointType = exports.EndpointType;
	var ChartService = (function () {
	    function ChartService(authService, apiService) {
	        this.authService = authService;
	        this.apiService = apiService;
	        this.networks = [];
	        this.netInspect = {};
	        this.graphData = { 0: {}, 1: {} };
	        this.source = new rxjs_1.Subject();
	        this.stream = this.source.asObservable();
	        this.startpolling();
	    }
	    ChartService.prototype.getInspectData = function (listEndPoint, inspectEndpoint, endpointtype) {
	        var _this = this;
	        this.apiService.get(listEndPoint)
	            .map(function (res) { return res.json(); })
	            .subscribe(function (result1) {
	            for (var _i = 0, result1_1 = result1; _i < result1_1.length; _i++) {
	                var x = result1_1[_i];
	                var key = x['key'];
	                _this.apiService.get(inspectEndpoint + key + '/')
	                    .map(function (res) { return res.json(); })
	                    .subscribe(function (result2) {
	                    var inspectkey = result2['Config']['key'];
	                    if (!util_1.isUndefined(result2['Oper']['numEndpoints'])) {
	                        _this.generateGraphData(inspectkey, result2['Oper']['numEndpoints'], endpointtype);
	                    }
	                    else {
	                        _this.generateGraphData(inspectkey, 0, endpointtype);
	                    }
	                }, function (error) { });
	            }
	        }, function (error) { });
	    };
	    ChartService.prototype.generateGraphData = function (key, count, type) {
	        if (util_1.isUndefined(this.graphData[type][key])) {
	            this.graphData[type][key] = [];
	            for (var i = 0; i < 15; i++) {
	                this.graphData[type][key].push(count);
	            }
	        }
	        else {
	            this.graphData[type][key].push(count);
	            this.source.next({ iKey: key, count: count, type: type });
	        }
	    };
	    /* This method is called by menuctrl.ts after the user logs out of the system */
	    ChartService.prototype.cleanBuffer = function () {
	        this.networks = [];
	        this.netInspect = {};
	        this.graphData = { 0: {}, 1: {} };
	        this.refresh.unsubscribe();
	    };
	    /* This method is called by loginctrl.ts after the user logs into the system */
	    ChartService.prototype.startpolling = function () {
	        var _this = this;
	        if (this.authService.isLoggedIn) {
	            this.getInspectData(contivglobals_1.ContivGlobals.NETWORKS_ENDPOINT, contivglobals_1.ContivGlobals.NETWORKS_INSPECT_ENDPOINT, EndpointType.Network);
	            this.getInspectData(contivglobals_1.ContivGlobals.APPLICATIONGROUPS_ENDPOINT, contivglobals_1.ContivGlobals.APPLICATIONGROUPS_INSPECT_ENDPOINT, EndpointType.ApplicationGroup);
	        }
	        this.refresh = rxjs_1.Observable.interval(10000).subscribe(function () {
	            if (_this.authService.isLoggedIn) {
	                _this.getInspectData(contivglobals_1.ContivGlobals.NETWORKS_ENDPOINT, contivglobals_1.ContivGlobals.NETWORKS_INSPECT_ENDPOINT, EndpointType.Network);
	                _this.getInspectData(contivglobals_1.ContivGlobals.APPLICATIONGROUPS_ENDPOINT, contivglobals_1.ContivGlobals.APPLICATIONGROUPS_INSPECT_ENDPOINT, EndpointType.ApplicationGroup);
	            }
	        });
	    };
	    ChartService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], ChartService);
	    return ChartService;
	    var _a, _b;
	}());
	exports.ChartService = ChartService;
	

/***/ },
/* 83 */
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
	var util_1 = __webpack_require__(19);
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
/* 84 */
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
	var networkservice_1 = __webpack_require__(123);
	var FirstRunWizardService = (function () {
	    function FirstRunWizardService(networkService) {
	        this.networkService = networkService;
	        this.setting = { networkInfraType: '', vlans: '', vxlans: '', fwdMode: '' };
	        this.aciSetting = {
	            key: '',
	            enforcePolicies: 'yes',
	            includeCommonTenant: 'no',
	            name: '',
	            nodeBindings: '',
	            pathBindings: '',
	            physicalDomain: ''
	        };
	    }
	    FirstRunWizardService.prototype.getNetworkSettings = function () {
	        var _this = this;
	        this.networkService.getSettings()
	            .then(function (result) {
	            _this.setting = result;
	        });
	    };
	    FirstRunWizardService.prototype.getAciSettings = function () {
	        var _this = this;
	        this.networkService.getAciSettings()
	            .then(function (result) {
	            _this.aciSetting = result;
	        });
	    };
	    FirstRunWizardService.prototype.updateSettings = function () {
	        this.networkService.updateSettings(this.setting)
	            .then(function (result) {
	        });
	        return this.networkService.updateAciSettings(this.aciSetting);
	    };
	    FirstRunWizardService = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof networkservice_1.NetworkService !== 'undefined' && networkservice_1.NetworkService) === 'function' && _a) || Object])
	    ], FirstRunWizardService);
	    return FirstRunWizardService;
	    var _a;
	}());
	exports.FirstRunWizardService = FirstRunWizardService;
	

/***/ },
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsNative = __webpack_require__(659),
	    getValue = __webpack_require__(666);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = getValue(object, key);
	  return baseIsNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/30/16.
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
	var crudhelperservice_1 = __webpack_require__(7);
	var util_1 = __webpack_require__(19);
	(function (NotificationType) {
	    NotificationType[NotificationType["confirm"] = 0] = "confirm";
	    NotificationType[NotificationType["alert"] = 1] = "alert";
	    NotificationType[NotificationType["info"] = 2] = "info";
	})(exports.NotificationType || (exports.NotificationType = {}));
	var NotificationType = exports.NotificationType;
	var NotificationComponent = (function () {
	    function NotificationComponent(crudHelperService) {
	        this.crudHelperService = crudHelperService;
	        this.NotificationType = NotificationType;
	        this.message = '';
	        this.item = '';
	        this.notifyId = 0;
	        this.notifyCounter = 0;
	    }
	    NotificationComponent.prototype.ngOnInit = function () {
	        jQuery('.notify').css({ right: 30 + 'px',
	            top: ((80 / 100) * window.innerHeight) + 'px'
	        });
	        jQuery('.notify').css({ visibility: 'hidden' });
	        window.onresize = function () {
	            jQuery('.notify').css({ right: 30 + 'px',
	                top: ((80 / 100) * window.innerHeight) + 'px'
	            });
	        };
	        this.notifyId = 0;
	    };
	    NotificationComponent.prototype.runAnimation = function (start) {
	        var self = this;
	        var animation = {
	            animation: 'fade up',
	            duration: '600ms',
	            onStart: function () {
	                if (start)
	                    self.displayMessage();
	            }
	        };
	        jQuery('.notify').transition(animation);
	    };
	    NotificationComponent.prototype.displayMessage = function () {
	        this.message = this.crudHelperService.message;
	        this.item = this.crudHelperService.item;
	        this.notificationType = this.crudHelperService.notificationType;
	        if (util_1.isUndefined(this.notificationType))
	            this.notificationType = NotificationType.confirm;
	    };
	    /*
	        Since notification is part of the Menu component. The ngDoCheck() block runs every time the angular
	        checks for changes in the Document tree.
	        CrudhelperService is the service using which all child components of menu communicate with the
	        notification component.
	        this.crudHelperService.displayNotify gets set to true when this.crudHelperService.showNotification is called.
	        When its true : -
	            a) if there is any earlier notification which is getting displayed then the notifyId would be positive integer.
	                In this case I will be closing the current notification by running this.runAnimation(false), The flag is false
	                so while closing the notification I dont change the message inside the Notification element.
	            b) if there is no earlier notification  I execute runAnimation() with flag true which swaps the message inside the notification element on
	                start of the animation.
	            c) The notification counter for the first time would be 1. This id is passed to notifyTimer which sets up a setTimeout.
	                The setTimeout only hides the notification with matching timerId and notifyId. If there is a new notification
	                before the previous setTimeout has closed the previous notification, Then we first close the previous notification and we increment the notifyId
	                and create a new timer for closing notification with id 2. Meanwhile after 20 sec if the setTimeout from previous
	                notification runs, we dont close the notification since the timer id of the previous notification is 1 but
	                the current notifyId is 2.
	    */
	    NotificationComponent.prototype.ngDoCheck = function () {
	        var self = this;
	        if (this.crudHelperService.displayNotify) {
	            if (this.notifyId !== 0) {
	                this.runAnimation(false);
	                this.notifyId = 0;
	            }
	            this.crudHelperService.displayNotify = false;
	            this.runAnimation(true);
	            var currentnotifyId = ++this.notifyCounter;
	            this.notifyId = currentnotifyId;
	            var newTimer = new notifyTimer(currentnotifyId);
	        }
	        function notifyTimer(timerId) {
	            var timerId = timerId;
	            setTimeout(function () {
	                if (timerId == self.notifyId) {
	                    self.runAnimation(false);
	                    self.notifyId = 0;
	                }
	            }, 15000);
	        }
	    };
	    NotificationComponent.prototype.close = function () {
	        this.runAnimation(false);
	        this.notifyId = 0;
	    };
	    NotificationComponent = __decorate([
	        core_1.Component({
	            selector: 'notification',
	            template: __webpack_require__(698),
	            styles: [__webpack_require__(1015)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _a) || Object])
	    ], NotificationComponent);
	    return NotificationComponent;
	    var _a;
	}());
	exports.NotificationComponent = NotificationComponent;
	

/***/ },
/* 100 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 12/13/16.
	 */
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
	var contivglobals_1 = __webpack_require__(11);
	var http_1 = __webpack_require__(23);
	var apiservice_1 = __webpack_require__(27);
	var collection_1 = __webpack_require__(38);
	var AuthorizationModel = (function (_super) {
	    __extends(AuthorizationModel, _super);
	    function AuthorizationModel(http, apiService) {
	        _super.call(this, http, contivglobals_1.ContivGlobals.AUTHORIZATION_ENDPOINT, apiService);
	    }
	    AuthorizationModel.prototype.delete = function (authId) {
	        var collection = this;
	        var url = collection.url + '/' + authId;
	        return _super.prototype.deleteUsingKey.call(this, authId, 'AuthzUUID', url);
	    };
	    AuthorizationModel.prototype.save = function (model) {
	        var collection = this;
	        var url = contivglobals_1.ContivGlobals.AUTHORIZATION_ENDPOINT + '/' + model['AuthzUUID'];
	        return this.apiService.patch(url, model).map(function (res) { return res.json(); }).toPromise()
	            .then(function (result) {
	            _.remove(collection.models, function (n) {
	                return n['AuthzUUID'] == model['AuthzUUID'];
	            });
	            collection.models.push(result);
	            return result;
	        });
	    };
	    AuthorizationModel.prototype.create = function (model) {
	        var collection = this;
	        return this.apiService.post(contivglobals_1.ContivGlobals.AUTHORIZATION_ENDPOINT, model)
	            .map(function (res) { return res.json(); }).toPromise()
	            .then(function (result) {
	            _.remove(collection.models, function (n) {
	                return (n['PrincipalName'] == model['PrincipalName'] &&
	                    n['TenantName'] == model['TenantName'] &&
	                    n['Role'] == model['Role']);
	            });
	            collection.models.push(result);
	            return result;
	        });
	    };
	    AuthorizationModel = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object, (typeof (_b = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _b) || Object])
	    ], AuthorizationModel);
	    return AuthorizationModel;
	    var _a, _b;
	}(collection_1.Collection));
	exports.AuthorizationModel = AuthorizationModel;
	

/***/ },
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(241),
	    getRawTag = __webpack_require__(664),
	    objectToString = __webpack_require__(670);

	/** `Object#toString` result references. */
	var nullTag = '[object Null]',
	    undefinedTag = '[object Undefined]';

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * The base implementation of `getTag` without fallbacks for buggy environments.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function baseGetTag(value) {
	  if (value == null) {
	    return value === undefined ? undefinedTag : nullTag;
	  }
	  value = Object(value);
	  return (symToStringTag && symToStringTag in value)
	    ? getRawTag(value)
	    : objectToString(value);
	}

	module.exports = baseGetTag;


/***/ },
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */
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
	var http_1 = __webpack_require__(23);
	var collection_1 = __webpack_require__(38);
	var _ = __webpack_require__(28);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
/* 123 */
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
	var http_1 = __webpack_require__(23);
	__webpack_require__(149);
	var contivglobals_1 = __webpack_require__(11);
	var apiservice_1 = __webpack_require__(27);
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
	        setting.key = "global";
	        setting.name = "global";
	        return this.apiService.post(contivglobals_1.ContivGlobals.NETWORK_SETTINGS_ENDPOINT
	            + 'global/', setting).map(function (res) { return res.json(); }).toPromise();
	    };
	    NetworkService.prototype.getAciSettings = function () {
	        var networkservice = this;
	        var promise = new Promise(function (resolve, reject) {
	            var url = contivglobals_1.ContivGlobals.ACI_SETTINGS_ENDPOINT;
	            networkservice.apiService.get(url).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(result) {
	                if (result.length == 0) {
	                    result = [
	                        {
	                            key: '',
	                            enforcePolicies: 'yes',
	                            includeCommonTenant: 'no',
	                            name: '',
	                            nodeBindings: '',
	                            pathBindings: '',
	                            physicalDomain: ''
	                        }
	                    ];
	                }
	                resolve(result[0]);
	            }, function errorCallback(result) {
	                reject(result);
	            });
	        });
	        return promise;
	    };
	    NetworkService.prototype.updateAciSettings = function (setting) {
	        setting.key = "aciGw";
	        setting.name = "aciGw";
	        return this.apiService.post(contivglobals_1.ContivGlobals.ACI_SETTINGS_ENDPOINT
	            + 'aciGw/', setting).map(function (res) { return res.json(); }).toPromise();
	    };
	    NetworkService.prototype.getGlobalInspect = function () {
	        var networkservice = this;
	        var promise = new Promise(function (resolve, reject) {
	            var url = contivglobals_1.ContivGlobals.GLOBAL_NETWORK_INSPECT_ENDPOINT + 'global/';
	            networkservice.apiService.get(url).map(function (res) { return res.json(); }).toPromise()
	                .then(function successCallback(result) {
	                resolve(result);
	            }, function errorCallback(result) {
	                reject(result);
	            });
	        });
	        return promise;
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
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return value != null && typeof value == 'object';
	}

	module.exports = isObjectLike;


/***/ },
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */
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
	var networksmodel_1 = __webpack_require__(48);
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var crudhelperservice_1 = __webpack_require__(7);
	var organizationsmodel_1 = __webpack_require__(34);
	var ApplicationGroupCreateComponent = (function () {
	    function ApplicationGroupCreateComponent(activatedRoute, router, ngZone, organizationsModel, networksModel, applicationGroupsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.networksModel = networksModel;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.networks = [];
	        this.tenants = [];
	        this.applicationGroup = {};
	        var applicationGroupCreateCtrl = this;
	        function resetForm() {
	            crudHelperService.stopLoader(applicationGroupCreateCtrl);
	            applicationGroupCreateCtrl.applicationGroup = {
	                groupName: '',
	                networkName: '',
	                policies: [],
	                netProfile: '',
	                extContractsGrps: [],
	                tenantName: ''
	            };
	        }
	        resetForm();
	    }
	    ApplicationGroupCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
	    ApplicationGroupCreateComponent.prototype.returnToApplicationGroup = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    ApplicationGroupCreateComponent.prototype.cancelCreating = function () {
	        this.returnToApplicationGroup();
	    };
	    ApplicationGroupCreateComponent.prototype.createApplicationGroup = function (validform) {
	        var applicationGroupCreateCtrl = this;
	        if (validform) {
	            applicationGroupCreateCtrl.crudHelperService.startLoader(applicationGroupCreateCtrl);
	            applicationGroupCreateCtrl.applicationGroup.key =
	                applicationGroupCreateCtrl.applicationGroupsModel.generateKey(applicationGroupCreateCtrl.applicationGroup);
	            /**
	             * applicationGroup consist of Group Name, Network Name, Isolation Policies, Bandwidth Policy
	             */
	            applicationGroupCreateCtrl.applicationGroupsModel.create(applicationGroupCreateCtrl.applicationGroup, undefined).then(function successCallback(result) {
	                applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
	                applicationGroupCreateCtrl.crudHelperService.showNotification("Application group: Created", result.key.toString());
	                applicationGroupCreateCtrl.returnToApplicationGroup();
	            }, function errorCallback(result) {
	                applicationGroupCreateCtrl.crudHelperService.stopLoader(applicationGroupCreateCtrl);
	                applicationGroupCreateCtrl.crudHelperService.showServerError("Application group: Create failed", result);
	            });
	        }
	    };
	    /**
	     * Get networks for the given tenant.
	     */
	    ApplicationGroupCreateComponent.prototype.getNetworks = function (tenantName) {
	        var component = this;
	        component.networksModel.get(false).then(function (result) {
	            component.networks = _.filter(result, {
	                'tenantName': tenantName
	            });
	        });
	    };
	    ApplicationGroupCreateComponent.prototype.updateTenant = function (tenantName, isolationPolicyComponent, bandwidthPolicyComponent, contractGroupComponent) {
	        this.applicationGroup.tenantName = tenantName;
	        this.getNetworks(tenantName);
	        isolationPolicyComponent.getIsolationPolicies();
	        bandwidthPolicyComponent.getNetprofiles();
	        contractGroupComponent.getContractGroups();
	    };
	    ApplicationGroupCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'applicationgroupcreate',
	            template: __webpack_require__(681)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _e) || Object, (typeof (_f = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _f) || Object, (typeof (_g = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _g) || Object])
	    ], ApplicationGroupCreateComponent);
	    return ApplicationGroupCreateComponent;
	    var _a, _b, _c, _d, _e, _f, _g;
	}());
	exports.ApplicationGroupCreateComponent = ApplicationGroupCreateComponent;
	

/***/ },
/* 163 */
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
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var crudhelperservice_1 = __webpack_require__(7);
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
	    ApplicationGroupDetailsComponent.prototype.cancelDetails = function () {
	        this.returnToApplicationGroup();
	    };
	    ApplicationGroupDetailsComponent.prototype.deleteApplicationGroup = function () {
	        var applicationGroupDetailsCtrl = this;
	        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.applicationGroupsModel.delete(applicationGroupDetailsCtrl.applicationGroup).then(function successCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.crudHelperService.showNotification("Application group: Deleted", result.toString());
	            applicationGroupDetailsCtrl.returnToApplicationGroup();
	        }, function errorCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.crudHelperService.showServerError("Application group: Delete failed", result);
	        });
	    };
	    ApplicationGroupDetailsComponent.prototype.saveApplicationGroup = function () {
	        var applicationGroupDetailsCtrl = this;
	        applicationGroupDetailsCtrl.crudHelperService.startLoader(applicationGroupDetailsCtrl);
	        applicationGroupDetailsCtrl.applicationGroupsModel.save(applicationGroupDetailsCtrl.applicationGroup).then(function successCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.crudHelperService.showNotification("Application group: Updated", result.key.toString());
	            applicationGroupDetailsCtrl.returnToApplicationGroupDetails();
	        }, function errorCallback(result) {
	            applicationGroupDetailsCtrl.crudHelperService.stopLoader(applicationGroupDetailsCtrl);
	            applicationGroupDetailsCtrl.crudHelperService.showServerError("Application group: Update failed", result);
	        });
	    };
	    ApplicationGroupDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'applicationgroupdetails',
	            template: __webpack_require__(682)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], ApplicationGroupDetailsComponent);
	    return ApplicationGroupDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.ApplicationGroupDetailsComponent = ApplicationGroupDetailsComponent;
	

/***/ },
/* 164 */
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
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
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
	        this.crudHelperService.startLoader(this);
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
	            template: __webpack_require__(684)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], AppGrouplistComponent);
	    return AppGrouplistComponent;
	    var _a, _b, _c, _d;
	}());
	exports.AppGrouplistComponent = AppGrouplistComponent;
	

/***/ },
/* 165 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var appprofilesmodel_1 = __webpack_require__(100);
	var organizationsmodel_1 = __webpack_require__(34);
	var AppProfileCreateComponent = (function () {
	    function AppProfileCreateComponent(activatedRoute, router, ngZone, organizationsModel, crudHelperService, appProfilesModel) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.crudHelperService = crudHelperService;
	        this.appProfilesModel = appProfilesModel;
	        this.newAppProfile = {};
	        this.tenants = [];
	        var component = this;
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            component.newAppProfile = {
	                key: '',
	                appProfileName: '',
	                endpointGroups: [],
	                tenantName: ''
	            };
	        }
	        resetForm();
	    }
	    AppProfileCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
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
	            component.newAppProfile.key = this.appProfilesModel.generateKey(this.newAppProfile);
	            this.appProfilesModel.create(component.newAppProfile, undefined)
	                .then(function (result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                    component.crudHelperService.showNotification("Application profile: Created", result.key.toString());
	                });
	                component.returnToAppProfiles();
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError("Application profile: Create failed", error);
	            });
	        }
	    };
	    AppProfileCreateComponent.prototype.updateTenant = function (tenantName, appGroupSelComponent) {
	        this.newAppProfile.tenantName = tenantName;
	        appGroupSelComponent.getApplicationGroups();
	    };
	    AppProfileCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'appprofilecreate',
	            template: __webpack_require__(690)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object, (typeof (_f = typeof appprofilesmodel_1.AppProfilesModel !== 'undefined' && appprofilesmodel_1.AppProfilesModel) === 'function' && _f) || Object])
	    ], AppProfileCreateComponent);
	    return AppProfileCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.AppProfileCreateComponent = AppProfileCreateComponent;
	

/***/ },
/* 166 */
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
	var appprofilesmodel_1 = __webpack_require__(100);
	var crudhelperservice_1 = __webpack_require__(7);
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
	        component.crudHelperService.startLoader(component);
	        component.appProfilesModel.delete(component.appProfile).then(function successCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	                component.crudHelperService.showNotification("Application profile: Deleted", result);
	            });
	            component.returnToAppProfile();
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showServerError("Application profile: Delete failed", result);
	        });
	    };
	    AppProfileDetailsComponent.prototype.saveAppProfile = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            component.crudHelperService.startLoader(component);
	            component.appProfilesModel.save(component.appProfile).then(function successCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                    component.crudHelperService.showNotification("Application profile: Updated", result.key.toString());
	                });
	                component.returnToAppProfileDetails();
	            }, function errorCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError("Application profile: Update failed", result);
	            });
	        }
	    };
	    AppProfileDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'appprofiledetails',
	            template: __webpack_require__(691)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof appprofilesmodel_1.AppProfilesModel !== 'undefined' && appprofilesmodel_1.AppProfilesModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], AppProfileDetailsComponent);
	    return AppProfileDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.AppProfileDetailsComponent = AppProfileDetailsComponent;
	

/***/ },
/* 167 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var appprofilesmodel_1 = __webpack_require__(100);
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
	            template: __webpack_require__(692)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof appprofilesmodel_1.AppProfilesModel !== 'undefined' && appprofilesmodel_1.AppProfilesModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], AppProfileListComponent);
	    return AppProfileListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.AppProfileListComponent = AppProfileListComponent;
	

/***/ },
/* 168 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var filterpipe_1 = __webpack_require__(416);
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
/* 169 */
/***/ function(module, exports) {

	/**
	 * Created by cshampur on 11/4/16.
	 */
	"use strict";
	exports.AuthMatrix = {
	    'firstrun': { 'ops': 'n', 'admin': 'y' },
	    'dashboard': { 'ops': 'y', 'admin': 'y' },
	    'networkpolicies/list': { 'ops': 'y', 'admin': 'y' },
	    'networkpolicies/isolation/create': { 'ops': 'n', 'admin': 'y' },
	    'networkpolicies/isolation/details': { 'ops': 'y', 'admin': 'y' },
	    'networkpolicies/isolation/edit': { 'ops': 'n', 'admin': 'y' },
	    'networkpolicies/bandwidth/create': { 'ops': 'y', 'admin': 'y' },
	    'networkpolicies/bandwidth/details': { 'ops': 'y', 'admin': 'y' },
	    'networkpolicies/bandwidth/edit': { 'ops': 'n', 'admin': 'y' },
	    'networkpolicies/contractgroup/create': { 'ops': 'n', 'admin': 'y' },
	    'networkpolicies/contractgroup/details': { 'ops': 'y', 'admin': 'y' },
	    'applicationgroups/list': { 'ops': 'y', 'admin': 'y' },
	    'applicationgroups/create': { 'ops': 'n', 'admin': 'y' },
	    'applicationgroups/details': { 'ops': 'y', 'admin': 'y' },
	    'applicationgroups/edit': { 'ops': 'n', 'admin': 'y' },
	    'settings/users/list': { 'ops': 'n', 'admin': 'y' },
	    'settings/users/create': { 'ops': 'n', 'admin': 'y' },
	    'settings/users/details': { 'ops': 'n', 'admin': 'y' },
	    'settings/users/edit': { 'ops': 'n', 'admin': 'y' },
	    'settings/nodes/list': { 'ops': 'n', 'admin': 'y' },
	    'settings/nodes/create': { 'ops': 'n', 'admin': 'y' },
	    'settings/nodes/details': { 'ops': 'n', 'admin': 'y' },
	    'settings/nodes/edit': { 'ops': 'n', 'admin': 'y' },
	    'settings/authorization/list': { 'ops': 'n', 'admin': 'y' },
	    'settings/authorization/details': { 'ops': 'n', 'admin': 'y' },
	    'settings/authorization/create': { 'ops': 'n', 'admin': 'y' },
	    'settings/authorization/edit': { 'ops': 'n', 'admin': 'y' },
	    'settings/networks': { 'ops': 'n', 'admin': 'y' },
	    'settings/ldap': { 'ops': 'n', 'admin': 'y' },
	    'settings/organizations/list': { 'ops': 'y', 'admin': 'y' },
	    'settings/organizations/create': { 'ops': 'n', 'admin': 'y' },
	    'settings/organizations/details': { 'ops': 'y', 'admin': 'y' },
	    'networks/list': { 'ops': 'y', 'admin': 'y' },
	    'networks/create': { 'ops': 'n', 'admin': 'y' },
	    'networks/details': { 'ops': 'y', 'admin': 'y' },
	    'servicelbs/list': { 'ops': 'y', 'admin': 'y' },
	    'servicelbs/create': { 'ops': 'n', 'admin': 'y' },
	    'servicelbs/details': { 'ops': 'y', 'admin': 'y' },
	    'appprofiles/list': { 'ops': 'y', 'admin': 'y' },
	    'appprofiles/create': { 'ops': 'n', 'admin': 'y' },
	    'appprofiles/details': { 'ops': 'y', 'admin': 'y' },
	    'appprofiles/edit': { 'ops': 'n', 'admin': 'y' }
	};
	

/***/ },
/* 170 */
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
	var authservice_1 = __webpack_require__(54);
	var authMatrix_1 = __webpack_require__(169);
	var util_1 = __webpack_require__(19);
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
/* 171 */
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
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var policiesmodel_1 = __webpack_require__(64);
	var networksmodel_1 = __webpack_require__(48);
	var servicelbsmodel_1 = __webpack_require__(73);
	var util_1 = __webpack_require__(19);
	var chartservice_1 = __webpack_require__(82);
	var DashboardComponent = (function () {
	    function DashboardComponent(networksModel, applicationGroupsModel, policiesModel, servicelbsModel, ngZone) {
	        this.networksModel = networksModel;
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.policiesModel = policiesModel;
	        this.servicelbsModel = servicelbsModel;
	        this.ngZone = ngZone;
	        this.EndpointType = chartservice_1.EndpointType;
	        this.nodes = 0;
	        this.networks = 0;
	        this.groups = 0;
	        this.networkpolicies = 0;
	        this.servicelbs = 0;
	        var dashboardComponent = this;
	        this.networkList = [];
	        this.applicationGroupList = [];
	        this.endpointType = chartservice_1.EndpointType.Network;
	        this.key = '';
	        this.setkeyflag = true;
	        function getDashboardInfo(reload) {
	            ngZone.run(function () {
	                networksModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.networks = result.length;
	                    dashboardComponent.networkList = result;
	                });
	                applicationGroupsModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.groups = result.length;
	                    dashboardComponent.applicationGroupList = result;
	                });
	                policiesModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.networkpolicies = result.length;
	                });
	                servicelbsModel.get(reload)
	                    .then(function (result) {
	                    dashboardComponent.servicelbs = result.length;
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
	    DashboardComponent.prototype.switch = function (endpointType) {
	        if (endpointType == chartservice_1.EndpointType.Network) {
	            if (this.endpointType !== chartservice_1.EndpointType.Network) {
	                this.setkeyflag = true;
	                this.endpointType = chartservice_1.EndpointType.Network;
	            }
	        }
	        else {
	            if (this.endpointType !== chartservice_1.EndpointType.ApplicationGroup) {
	                this.setkeyflag = true;
	                this.endpointType = chartservice_1.EndpointType.ApplicationGroup;
	            }
	        }
	    };
	    DashboardComponent.prototype.setKey = function (tempArr) {
	        var _this = this;
	        if (!util_1.isUndefined(tempArr)) {
	            var temp = tempArr;
	            if (tempArr.length > 0 && this.setkeyflag) {
	                Observable_1.Observable.timer(1).subscribe(function () {
	                    _this.key = temp[0]['key'];
	                });
	                this.setkeyflag = false;
	            }
	        }
	    };
	    DashboardComponent = __decorate([
	        core_1.Component({
	            selector: 'dashboard',
	            template: __webpack_require__(706),
	            styles: [__webpack_require__(1016)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _a) || Object, (typeof (_b = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _b) || Object, (typeof (_c = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _c) || Object, (typeof (_d = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], DashboardComponent);
	    return DashboardComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.DashboardComponent = DashboardComponent;
	

/***/ },
/* 172 */
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
	var router_1 = __webpack_require__(5);
	var authservice_1 = __webpack_require__(54);
	var firstrunwizardservice_1 = __webpack_require__(84);
	var FirstrunWizardComponent = (function () {
	    function FirstrunWizardComponent(wizardService, activatedRoute, router, authService) {
	        this.wizardService = wizardService;
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.authService = authService;
	        this.pageNo = 1;
	        this.welcomeActive = true;
	        wizardService.getNetworkSettings();
	        wizardService.getAciSettings();
	    }
	    FirstrunWizardComponent.prototype.ngOnInit = function () {
	    };
	    FirstrunWizardComponent.prototype.updatePage = function (pageno) {
	        this.pageNo = ++pageno;
	    };
	    FirstrunWizardComponent.prototype.logout = function () {
	        this.authService.logout();
	        this.router.navigate(['/logout'], { relativeTo: this.activatedRoute });
	    };
	    FirstrunWizardComponent.prototype.skip = function () {
	        localStorage.setItem('firstRun', 'skip');
	        this.router.navigate(['/m/dashboard'], { relativeTo: this.activatedRoute });
	    };
	    FirstrunWizardComponent.prototype.runwizard = function () {
	        this.welcomeActive = false;
	    };
	    FirstrunWizardComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunwizard',
	            template: __webpack_require__(709),
	            styles: [__webpack_require__(1017)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _d) || Object])
	    ], FirstrunWizardComponent);
	    return FirstrunWizardComponent;
	    var _a, _b, _c, _d;
	}());
	exports.FirstrunWizardComponent = FirstrunWizardComponent;
	

/***/ },
/* 173 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var router_1 = __webpack_require__(5);
	var authservice_1 = __webpack_require__(54);
	var contivglobals_1 = __webpack_require__(11);
	var chartservice_1 = __webpack_require__(82);
	var LoginComponent = (function () {
	    function LoginComponent(router, activatedRoute, crudHelperService, authService, chartService) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.authService = authService;
	        this.chartService = chartService;
	        this.product_name = contivglobals_1.ContivGlobals.PRODUCT_NAME;
	        this.showLoader = true;
	        this.showServerError = false;
	        this.crudHelperService = crudHelperService;
	        this.username = '';
	        this.password = '';
	        this.loginCtrl = this;
	    }
	    LoginComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.stopLoader(this);
	        jQuery("body").addClass("loginbackground");
	    };
	    LoginComponent.prototype.ngOnDestroy = function () {
	        jQuery("body").removeClass("loginbackground");
	    };
	    LoginComponent.prototype.login = function () {
	        var _this = this;
	        this.crudHelperService.startLoader(this);
	        this.authService.login({ username: this.username, password: this.password })
	            .subscribe(function (result) {
	            if (result) {
	                _this.showServerError = false;
	                _this.crudHelperService.stopLoader(_this);
	                _this.chartService.startpolling();
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
	                _this.showServerError = true;
	                jQuery('#login-failed').modal('show');
	            }
	        }, function (error) {
	            _this.crudHelperService.stopLoader(_this);
	            _this.showServerError = true;
	        });
	    };
	    LoginComponent = __decorate([
	        core_1.Component({
	            selector: 'login',
	            template: __webpack_require__(711),
	            styles: [__webpack_require__(1018)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _d) || Object, (typeof (_e = typeof chartservice_1.ChartService !== 'undefined' && chartservice_1.ChartService) === 'function' && _e) || Object])
	    ], LoginComponent);
	    return LoginComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.LoginComponent = LoginComponent;
	

/***/ },
/* 174 */
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
	var contivglobals_1 = __webpack_require__(11);
	var LogoutComponent = (function () {
	    function LogoutComponent(router, activatedRoute) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.product_name = contivglobals_1.ContivGlobals.PRODUCT_NAME;
	    }
	    LogoutComponent.prototype.ngOnInit = function () {
	        jQuery("body").addClass("logoutbackground");
	    };
	    LogoutComponent.prototype.ngOnDestroy = function () {
	        jQuery("body").removeClass("logoutbackground");
	    };
	    LogoutComponent.prototype.login = function () {
	        this.router.navigate(['/login'], { relativeTo: this.activatedRoute });
	    };
	    LogoutComponent = __decorate([
	        core_1.Component({
	            selector: 'logout',
	            template: __webpack_require__(712),
	            styles: [__webpack_require__(1019)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object])
	    ], LogoutComponent);
	    return LogoutComponent;
	    var _a, _b;
	}());
	exports.LogoutComponent = LogoutComponent;
	

/***/ },
/* 175 */
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
	        jQuery("body").addClass("logoutbackground");
	    };
	    UnauthorizedComponent.prototype.ngOnDestroy = function () {
	        jQuery("body").removeClass("logoutbackground");
	    };
	    UnauthorizedComponent = __decorate([
	        core_1.Component({
	            selector: 'unauthorized',
	            template: __webpack_require__(713)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], UnauthorizedComponent);
	    return UnauthorizedComponent;
	}());
	exports.UnauthorizedComponent = UnauthorizedComponent;
	

/***/ },
/* 176 */
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
	var authservice_1 = __webpack_require__(54);
	var contivglobals_1 = __webpack_require__(11);
	var chartservice_1 = __webpack_require__(82);
	var MenuComponent = (function () {
	    function MenuComponent(activatedRoute, router, authService, chartService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.authService = authService;
	        this.chartService = chartService;
	        this.product_name = contivglobals_1.ContivGlobals.PRODUCT_NAME;
	        this.username = authService.authTokenPayload['username'];
	    }
	    MenuComponent.prototype.ngOnInit = function () {
	        this.firstRun = this.authService.firstRun;
	    };
	    MenuComponent.prototype.ngDoCheck = function () {
	        this.firstRun = this.authService.firstRun;
	    };
	    MenuComponent.prototype.logout = function () {
	        this.authService.logout();
	        this.chartService.cleanBuffer();
	        this.router.navigate(['/logout'], { relativeTo: this.activatedRoute });
	    };
	    MenuComponent = __decorate([
	        core_1.Component({
	            selector: 'menu',
	            template: __webpack_require__(714)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof authservice_1.AuthService !== 'undefined' && authservice_1.AuthService) === 'function' && _c) || Object, (typeof (_d = typeof chartservice_1.ChartService !== 'undefined' && chartservice_1.ChartService) === 'function' && _d) || Object])
	    ], MenuComponent);
	    return MenuComponent;
	    var _a, _b, _c, _d;
	}());
	exports.MenuComponent = MenuComponent;
	

/***/ },
/* 177 */
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
	var netprofilesmodel_1 = __webpack_require__(80);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var organizationsmodel_1 = __webpack_require__(34);
	var BandwidthPolicyCreateComponent = (function () {
	    function BandwidthPolicyCreateComponent(activatedRoute, router, ngZone, organizationsModel, netprofilesModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.netprofilesModel = netprofilesModel;
	        this.crudHelperService = crudHelperService;
	        this.tenants = [];
	        var bandwidthPolicyCreateCtrl = this;
	        function resetForm() {
	            crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
	            bandwidthPolicyCreateCtrl.newPolicy = {
	                profileName: '',
	                tenantName: '',
	                bandwidth: '',
	                bandwidthUnit: 'mbps',
	                DSCP: ''
	            };
	        }
	        resetForm();
	    }
	    BandwidthPolicyCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
	    BandwidthPolicyCreateComponent.prototype.returnToPolicies = function () {
	        this.router.navigate(['../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.bandwidth }], { relativeTo: this.activatedRoute });
	    };
	    BandwidthPolicyCreateComponent.prototype.cancelCreating = function () {
	        this.returnToPolicies();
	    };
	    BandwidthPolicyCreateComponent.prototype.createPolicy = function (validform) {
	        var bandwidthPolicyCreateCtrl = this;
	        if (validform) {
	            bandwidthPolicyCreateCtrl.crudHelperService.startLoader(bandwidthPolicyCreateCtrl);
	            bandwidthPolicyCreateCtrl.newPolicy.key =
	                bandwidthPolicyCreateCtrl.netprofilesModel.generateKey(bandwidthPolicyCreateCtrl.newPolicy);
	            bandwidthPolicyCreateCtrl.newPolicy.bandwidth = bandwidthPolicyCreateCtrl.newPolicy.bandwidthNumber
	                + " " + bandwidthPolicyCreateCtrl.newPolicy.bandwidthUnit;
	            bandwidthPolicyCreateCtrl.netprofilesModel.create(bandwidthPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
	                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
	                bandwidthPolicyCreateCtrl.crudHelperService.showNotification("Bandwidth policy: Created", result.key.toString());
	                bandwidthPolicyCreateCtrl.returnToPolicies();
	            }, function errorCallback(result) {
	                bandwidthPolicyCreateCtrl.crudHelperService.stopLoader(bandwidthPolicyCreateCtrl);
	                bandwidthPolicyCreateCtrl.crudHelperService.showServerError("Bandwidth policy: Create failed", result);
	            });
	        }
	    };
	    BandwidthPolicyCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'bandwidthpolicycreate',
	            template: __webpack_require__(715)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object])
	    ], BandwidthPolicyCreateComponent);
	    return BandwidthPolicyCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.BandwidthPolicyCreateComponent = BandwidthPolicyCreateComponent;
	

/***/ },
/* 178 */
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
	var netprofilesmodel_1 = __webpack_require__(80);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
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
	        setMode();
	    }
	    BandwidthPolicyDetailsComponent.prototype.deletePolicy = function () {
	        var bandwidthPolicyDetailsCtrl = this;
	        bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
	        bandwidthPolicyDetailsCtrl.netprofilesModel.deleteUsingKey(bandwidthPolicyDetailsCtrl.policy.key, 'key', undefined).then(function successCallback(result) {
	            bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.crudHelperService.showNotification("Bandwidth policy: Deleted", result);
	            bandwidthPolicyDetailsCtrl.returnToPolicies();
	        }, function errorCallback(result) {
	            bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.crudHelperService.showServerError("Bandwidth policy: Delete failed", result);
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
	    BandwidthPolicyDetailsComponent.prototype.cancelDetails = function () {
	        this.returnToPolicies();
	    };
	    BandwidthPolicyDetailsComponent.prototype.savePolicy = function (validform) {
	        var bandwidthPolicyDetailsCtrl = this;
	        if (validform) {
	            bandwidthPolicyDetailsCtrl.crudHelperService.startLoader(bandwidthPolicyDetailsCtrl);
	            bandwidthPolicyDetailsCtrl.policy.bandwidth = bandwidthPolicyDetailsCtrl.policy.bandwidthNumber + " " + bandwidthPolicyDetailsCtrl.policy.bandwidthUnit;
	            bandwidthPolicyDetailsCtrl.netprofilesModel.save(bandwidthPolicyDetailsCtrl.policy).then(function successCallback(result) {
	                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	                bandwidthPolicyDetailsCtrl.crudHelperService.showNotification("Bandwidth policy: Updated", result.key.toString());
	                bandwidthPolicyDetailsCtrl.returnToPolicyDetails();
	            }, function errorCallback(result) {
	                bandwidthPolicyDetailsCtrl.crudHelperService.stopLoader(bandwidthPolicyDetailsCtrl);
	                bandwidthPolicyDetailsCtrl.crudHelperService.showServerError("Bandwidth policy: Update failed", result);
	            });
	        }
	    };
	    BandwidthPolicyDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'bandwidthpolicydetails',
	            template: __webpack_require__(716)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], BandwidthPolicyDetailsComponent);
	    return BandwidthPolicyDetailsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.BandwidthPolicyDetailsComponent = BandwidthPolicyDetailsComponent;
	

/***/ },
/* 179 */
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
	 * Created by vjain3 on 12/13/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var contractgroupsmodel_1 = __webpack_require__(79);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var organizationsmodel_1 = __webpack_require__(34);
	var ContractGroupCreateComponent = (function () {
	    function ContractGroupCreateComponent(activatedRoute, router, ngZone, organizationsModel, contractGroupsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.contractGroupsModel = contractGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.tenants = [];
	        var component = this;
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            component.newContractGroup = {
	                contractGroupName: '',
	                tenantName: '',
	                contractsType: '',
	                contracts: []
	            };
	        }
	        resetForm();
	    }
	    ContractGroupCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
	    ContractGroupCreateComponent.prototype.returnToContractGroups = function () {
	        this.router.navigate(['../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.contractGroup }], { relativeTo: this.activatedRoute });
	    };
	    ContractGroupCreateComponent.prototype.cancelCreating = function () {
	        this.returnToContractGroups();
	    };
	    ContractGroupCreateComponent.prototype.parseContracts = function () {
	        var re = /\s*,\s*/; //uses 0 or more spaces followed by , followed by 0 or more spaces as separator
	        Array.prototype.push.apply(this.newContractGroup.contracts, this.contractsString.split(re));
	    };
	    ContractGroupCreateComponent.prototype.createContractGroup = function (validform) {
	        var component = this;
	        if (validform) {
	            component.crudHelperService.startLoader(component);
	            component.newContractGroup.key =
	                component.contractGroupsModel.generateKey(component.newContractGroup);
	            component.parseContracts();
	            component.contractGroupsModel.create(component.newContractGroup, undefined).then(function successCallback(result) {
	                component.crudHelperService.stopLoader(component);
	                component.crudHelperService.showNotification("External contract group: Created", result.key);
	                component.returnToContractGroups();
	            }, function errorCallback(result) {
	                component.crudHelperService.stopLoader(component);
	                component.crudHelperService.showServerError("External contract group: Create failed", result);
	            });
	        }
	    };
	    ContractGroupCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'contractgroupcreate',
	            template: __webpack_require__(718)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof contractgroupsmodel_1.ContractGroupsModel !== 'undefined' && contractgroupsmodel_1.ContractGroupsModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object])
	    ], ContractGroupCreateComponent);
	    return ContractGroupCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.ContractGroupCreateComponent = ContractGroupCreateComponent;
	

/***/ },
/* 180 */
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
	 * Created by vjain3 on 12/13/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var contractgroupsmodel_1 = __webpack_require__(79);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var ContractGroupDetailsComponent = (function () {
	    function ContractGroupDetailsComponent(activatedRoute, router, contractGroupsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.contractGroupsModel = contractGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.contractGroup = {};
	        var component = this;
	        /* Get particular Profile for based on key*/
	        component.contractGroupsModel.getModelByKey(activatedRoute.snapshot.params['key'], false, undefined)
	            .then(function (contractGroup) {
	            component.contractGroup = contractGroup;
	        });
	        component.crudHelperService.stopLoader(component);
	    }
	    ContractGroupDetailsComponent.prototype.deleteContractGroup = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        component.contractGroupsModel.deleteUsingKey(component.contractGroup.key, 'key', undefined).then(function successCallback(result) {
	            component.crudHelperService.stopLoader(component);
	            component.crudHelperService.showNotification("External contract group: Deleted", result);
	            component.returnToContractGroups();
	        }, function errorCallback(result) {
	            component.crudHelperService.stopLoader(component);
	            component.crudHelperService.showServerError("External contract group: Delete failed", result);
	        });
	    };
	    ContractGroupDetailsComponent.prototype.returnToContractGroups = function () {
	        this.router.navigate(['../../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.contractGroup }], { relativeTo: this.activatedRoute });
	    };
	    ContractGroupDetailsComponent.prototype.returnToContractDetails = function () {
	        this.router.navigate(['../../details', this.contractGroup.key], { relativeTo: this.activatedRoute });
	    };
	    ContractGroupDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'contractgroupdetails',
	            template: __webpack_require__(719)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof contractgroupsmodel_1.ContractGroupsModel !== 'undefined' && contractgroupsmodel_1.ContractGroupsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], ContractGroupDetailsComponent);
	    return ContractGroupDetailsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ContractGroupDetailsComponent = ContractGroupDetailsComponent;
	

/***/ },
/* 181 */
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
	var policiesmodel_1 = __webpack_require__(64);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var organizationsmodel_1 = __webpack_require__(34);
	var IsolationPolicyCreateComponent = (function () {
	    function IsolationPolicyCreateComponent(activatedRoute, router, ngZone, organizationsModel, policiesModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.policiesModel = policiesModel;
	        this.crudHelperService = crudHelperService;
	        this.tenants = [];
	        this.policyMode = 'isolation';
	        var component = this;
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('isolation')) {
	                component.policyMode = 'isolation';
	            }
	            else {
	                component.policyMode = 'bandwidth';
	            }
	        }
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            component.newPolicy = {
	                policyName: '',
	                tenantName: ''
	            };
	        }
	        setMode();
	        resetForm();
	    }
	    IsolationPolicyCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
	    IsolationPolicyCreateComponent.prototype.returnToPolicies = function () {
	        this.router.navigate(['../../list', { policyTab: networkpoliciestabsctrl_1.PolicyTab.isolation }], { relativeTo: this.activatedRoute });
	    };
	    IsolationPolicyCreateComponent.prototype.cancelCreating = function () {
	        this.returnToPolicies();
	    };
	    IsolationPolicyCreateComponent.prototype.createPolicy = function (validform) {
	        var isolationPolicyCreateCtrl = this;
	        if (validform) {
	            isolationPolicyCreateCtrl.crudHelperService.startLoader(isolationPolicyCreateCtrl);
	            isolationPolicyCreateCtrl.newPolicy.key =
	                isolationPolicyCreateCtrl.policiesModel.generateKey(isolationPolicyCreateCtrl.newPolicy);
	            isolationPolicyCreateCtrl.policiesModel.create(isolationPolicyCreateCtrl.newPolicy, undefined).then(function successCallback(result) {
	                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
	                isolationPolicyCreateCtrl.crudHelperService.showNotification("Isolation policy: Created", result.key);
	                isolationPolicyCreateCtrl.returnToPolicies();
	            }, function errorCallback(result) {
	                isolationPolicyCreateCtrl.crudHelperService.stopLoader(isolationPolicyCreateCtrl);
	                isolationPolicyCreateCtrl.crudHelperService.showServerError("Isolation policy: Create failed", result);
	            });
	        }
	    };
	    IsolationPolicyCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'isolationpolicycreate',
	            template: __webpack_require__(721)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object])
	    ], IsolationPolicyCreateComponent);
	    return IsolationPolicyCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.IsolationPolicyCreateComponent = IsolationPolicyCreateComponent;
	

/***/ },
/* 182 */
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
	var policiesmodel_1 = __webpack_require__(64);
	var rulesmodel_1 = __webpack_require__(122);
	var networksmodel_1 = __webpack_require__(48);
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var contivglobals_1 = __webpack_require__(11);
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
	        this.infoselected = true;
	        this.statskey = '';
	        var isolationPolicyDetailsCtrl = this;
	        this.statskey = activatedRoute.snapshot.params['key'];
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
	                    'tenantName': isolationPolicyDetailsCtrl['policy'].tenantName
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
	                    'tenantName': isolationPolicyDetailsCtrl['policy'].tenantName
	                });
	            });
	        }
	        isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.policiesModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function (policy) {
	            isolationPolicyDetailsCtrl.policy = policy;
	            isolationPolicyDetailsCtrl.rulesModel.getIncomingRules(policy.policyName, policy.tenantName).then(function (result) {
	                isolationPolicyDetailsCtrl.incomingRules = result;
	                isolationPolicyDetailsCtrl.resetNewIncomingRule();
	            });
	            isolationPolicyDetailsCtrl.rulesModel.getOutgoingRules(policy.policyName, policy.tenantName).then(function (result) {
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
	    IsolationPolicyDetailsComponent.prototype.cancelDetails = function () {
	        this.returnToPolicies();
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
	        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.policiesModel.delete(isolationPolicyDetailsCtrl.policy).then(function successCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showNotification("Isolation policy: Deleted", result);
	            isolationPolicyDetailsCtrl.returnToPolicies();
	        }, function errorCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showServerError("Isolation policy: Delete failed", result);
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
	            tenantName: this.policy.tenantName,
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
	            tenantName: this.policy.tenantName,
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
	            isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.generateRuleId(isolationPolicyDetailsCtrl.newIncomingRule);
	            isolationPolicyDetailsCtrl.newIncomingRule.key = isolationPolicyDetailsCtrl.rulesModel.generateKey(isolationPolicyDetailsCtrl.newIncomingRule);
	            isolationPolicyDetailsCtrl.rulesModel.create(isolationPolicyDetailsCtrl.newIncomingRule, undefined).then(function successCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.incomingRules.push(result);
	                isolationPolicyDetailsCtrl.resetNewIncomingRule();
	                isolationPolicyDetailsCtrl.crudHelperService.showNotification("Isolation policy: Incoming rules added", result.key.toString());
	            }, function errorCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.crudHelperService.showServerError("Isolation policy: Adding incoming rules failed", result);
	            });
	        }
	    };
	    /**
	     * Rule is saved to server
	     */
	    IsolationPolicyDetailsComponent.prototype.addOutgoingRule = function () {
	        var isolationPolicyDetailsCtrl = this;
	        if (isolationPolicyDetailsCtrl.validateCIDR(isolationPolicyDetailsCtrl.newOutgoingRule.toIpAddress)) {
	            isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.generateRuleId(isolationPolicyDetailsCtrl.newOutgoingRule);
	            isolationPolicyDetailsCtrl.newOutgoingRule.key = isolationPolicyDetailsCtrl.rulesModel.generateKey(isolationPolicyDetailsCtrl.newOutgoingRule);
	            isolationPolicyDetailsCtrl.rulesModel.create(isolationPolicyDetailsCtrl.newOutgoingRule, undefined).then(function successCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.outgoingRules.push(result);
	                isolationPolicyDetailsCtrl.resetNewOutgoingRule();
	                isolationPolicyDetailsCtrl.crudHelperService.showNotification("Isolation policy: Outgoing rules added", result.key.toString());
	            }, function errorCallback(result) {
	                isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	                isolationPolicyDetailsCtrl.crudHelperService.showServerError("Isolation policy: Adding outgoing rules failed", result);
	            });
	        }
	    };
	    /**
	     * Delete incoming rule from server
	     */
	    IsolationPolicyDetailsComponent.prototype.deleteIncomingRule = function (key) {
	        var isolationPolicyDetailsCtrl = this;
	        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.rulesModel.deleteUsingKey(key, 'key', undefined).then(function successCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            _.remove(isolationPolicyDetailsCtrl.incomingRules, function (n) {
	                return n.key == key;
	            });
	            isolationPolicyDetailsCtrl.crudHelperService.showNotification("Isolation policy: Incoming rules deleted", result);
	        }, function errorCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showServerError("Isolation policy: Deleting incoming rules failed", result);
	        });
	    };
	    /**
	     * Delete outgoing rule from server
	     */
	    IsolationPolicyDetailsComponent.prototype.deleteOutgoingRule = function (key) {
	        var isolationPolicyDetailsCtrl = this;
	        isolationPolicyDetailsCtrl.crudHelperService.startLoader(isolationPolicyDetailsCtrl);
	        isolationPolicyDetailsCtrl.rulesModel.deleteUsingKey(key, 'key', undefined).then(function successCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            _.remove(isolationPolicyDetailsCtrl.outgoingRules, function (n) {
	                return n.key == key;
	            });
	            isolationPolicyDetailsCtrl.crudHelperService.showNotification("Isolation policy: Outgoing rules deleted", result);
	        }, function errorCallback(result) {
	            isolationPolicyDetailsCtrl.crudHelperService.stopLoader(isolationPolicyDetailsCtrl);
	            isolationPolicyDetailsCtrl.crudHelperService.showServerError("Isolation policy: Deleting outgoing rules failed", result);
	        });
	    };
	    IsolationPolicyDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'isolationpolicydetails',
	            template: __webpack_require__(722)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _c) || Object, (typeof (_d = typeof rulesmodel_1.RulesModel !== 'undefined' && rulesmodel_1.RulesModel) === 'function' && _d) || Object, (typeof (_e = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _e) || Object, (typeof (_f = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _f) || Object, (typeof (_g = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _g) || Object])
	    ], IsolationPolicyDetailsComponent);
	    return IsolationPolicyDetailsComponent;
	    var _a, _b, _c, _d, _e, _f, _g;
	}());
	exports.IsolationPolicyDetailsComponent = IsolationPolicyDetailsComponent;
	

/***/ },
/* 183 */
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
	 * Created by cshampur on 10/14/16.
	 */
	var core_1 = __webpack_require__(2);
	var networksmodel_1 = __webpack_require__(48);
	var crudhelperservice_1 = __webpack_require__(7);
	var router_1 = __webpack_require__(5);
	var contivglobals_1 = __webpack_require__(11);
	var notification_1 = __webpack_require__(99);
	var organizationsmodel_1 = __webpack_require__(34);
	var NetworkCreateComponent = (function () {
	    function NetworkCreateComponent(router, activatedRoute, ngZone, networksModel, organizationsModel, crudHelperService) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.ngZone = ngZone;
	        this.networksModel = networksModel;
	        this.organizationsModel = organizationsModel;
	        this.crudHelperService = crudHelperService;
	        this.tenants = [];
	        this['showLoader'] = false;
	        this['cidrPattern'] = contivglobals_1.ContivGlobals.CIDR_REGEX;
	        this.newNetwork = { networkName: '', encap: 'vxlan', subnet: '', gateway: '', tenantName: '', key: '' };
	        this.networkCreateCtrl = this;
	    }
	    NetworkCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
	    NetworkCreateComponent.prototype.returnToNetworks = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    NetworkCreateComponent.prototype.cancelCreating = function () {
	        this.returnToNetworks();
	    };
	    NetworkCreateComponent.prototype.createNetwork = function (formvalid) {
	        var networkCreateCtrl = this;
	        if (formvalid) {
	            networkCreateCtrl.crudHelperService.startLoader(networkCreateCtrl);
	            this.newNetwork.key = this.newNetwork.tenantName + ':' + this.newNetwork.networkName;
	            this.networksModel.create(this.newNetwork, undefined)
	                .then(function (result) {
	                networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
	                networkCreateCtrl.crudHelperService.showNotification("Network: Created", result.key.toString());
	                networkCreateCtrl.returnToNetworks();
	            }, function (error) {
	                networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
	                networkCreateCtrl.crudHelperService.showServerError("Network: Create failed", error);
	            });
	            setTimeout(function () {
	                if (networkCreateCtrl['showLoader'] == true) {
	                    networkCreateCtrl.crudHelperService.stopLoader(networkCreateCtrl);
	                    networkCreateCtrl.crudHelperService.showNotification("Network: Create task submitted", networkCreateCtrl.newNetwork.key, notification_1.NotificationType.info);
	                    networkCreateCtrl.returnToNetworks();
	                }
	            }, 2000);
	        }
	    };
	    NetworkCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'networkcreate',
	            template: __webpack_require__(726)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _d) || Object, (typeof (_e = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object])
	    ], NetworkCreateComponent);
	    return NetworkCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.NetworkCreateComponent = NetworkCreateComponent;
	

/***/ },
/* 184 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var networksmodel_1 = __webpack_require__(48);
	var util_1 = __webpack_require__(19);
	var router_1 = __webpack_require__(5);
	var notification_1 = __webpack_require__(99);
	var _ = __webpack_require__(28);
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
	        this.network = { networkName: '', encap: '', subnet: '', gateway: '' };
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            if (_this['showloader'] != true)
	                _this.getApplicationGroups(true);
	        });
	        this.networkDetailsCtrl = this;
	    }
	    NetworkdetailsComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.statskey = this.route.snapshot.params['key'];
	        this.getNetwork(false);
	    };
	    NetworkdetailsComponent.prototype.getApplicationGroups = function (reload) {
	        var networkDetailsCtrl = this;
	        if (!util_1.isUndefined(networkDetailsCtrl['network'])) {
	            this.applicationGroupsModel.get(reload)
	                .then(function successCallback(result) {
	                networkDetailsCtrl['applicationGroups'] = _.filter(result, {
	                    'networkName': networkDetailsCtrl['network'].networkName,
	                    'tenantName': networkDetailsCtrl['network'].tenantName
	                });
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	            }, function errorCallback(result) {
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	            });
	        }
	    };
	    NetworkdetailsComponent.prototype.getNetwork = function (reload) {
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
	        this.crudHelperService.startLoader(networkDetailsCtrl);
	        if (!util_1.isUndefined(networkDetailsCtrl['network'])) {
	            this.networksModel.delete(networkDetailsCtrl['network'])
	                .then(function (result) {
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	                networkDetailsCtrl.crudHelperService.showNotification("Network: Deleted", result.toString());
	                networkDetailsCtrl.returnToNetworks();
	            }, function (error) {
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	                networkDetailsCtrl.crudHelperService.showServerError("Network: Delete failed", error);
	            });
	        }
	        setTimeout(function () {
	            if (networkDetailsCtrl['showLoader'] == true) {
	                networkDetailsCtrl.crudHelperService.showNotification("Network: Delete task submitted", networkDetailsCtrl.network.key, notification_1.NotificationType.info);
	                networkDetailsCtrl.crudHelperService.stopLoader(networkDetailsCtrl);
	            }
	            networkDetailsCtrl.returnToNetworks();
	        }, 2000);
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
	            template: __webpack_require__(727)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _c) || Object, (typeof (_d = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], NetworkdetailsComponent);
	    return NetworkdetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NetworkdetailsComponent = NetworkdetailsComponent;
	

/***/ },
/* 185 */
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
	var networksmodel_1 = __webpack_require__(48);
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
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
	            template: __webpack_require__(729)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object])
	    ], NetworkListComponent);
	    return NetworkListComponent;
	    var _a, _b, _c, _d;
	}());
	exports.NetworkListComponent = NetworkListComponent;
	

/***/ },
/* 186 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var servicelbsmodel_1 = __webpack_require__(73);
	var networksmodel_1 = __webpack_require__(48);
	var router_1 = __webpack_require__(5);
	var organizationsmodel_1 = __webpack_require__(34);
	var _ = __webpack_require__(28);
	var ServicelbCreateComponent = (function () {
	    function ServicelbCreateComponent(router, activatedRoute, ngZone, organizationsModel, servicelbsModel, crudHelperService, networksModel) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.ngZone = ngZone;
	        this.organizationsModel = organizationsModel;
	        this.servicelbsModel = servicelbsModel;
	        this.crudHelperService = crudHelperService;
	        this.networksModel = networksModel;
	        this.networks = [];
	        this.labelSelectors = [];
	        this.tenants = [];
	        this.servicelb = {
	            serviceName: '',
	            networkName: '',
	            ipAddress: '',
	            selectors: [],
	            ports: [],
	            tenantName: '',
	            key: ''
	        };
	        this.servicelbCreateCtrl = this;
	    }
	    ServicelbCreateComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.startLoader(this);
	        function getTenants(reload) {
	            component.organizationsModel.get(reload)
	                .then(function (result) {
	                component.tenants = result;
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	            });
	        }
	        getTenants(false);
	    };
	    ServicelbCreateComponent.prototype.getNetworks = function (tenantName) {
	        var servicelbCreateCtrl = this;
	        this.networksModel.get(false)
	            .then(function (result) {
	            servicelbCreateCtrl.networks = _.filter(result, { 'tenantName': tenantName });
	            servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	        }, function (error) {
	            servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	        });
	    };
	    ServicelbCreateComponent.prototype.createServicelb = function (formvalid) {
	        var _this = this;
	        var servicelbCreateCtrl = this;
	        this.createLabelSelectorStrings();
	        if (formvalid) {
	            this.crudHelperService.startLoader(this);
	            this.servicelb.key = this.servicelb.tenantName + ':' + this.servicelb.serviceName;
	            this.servicelbsModel.create(this.servicelb, undefined).then(function (result) {
	                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	                servicelbCreateCtrl.crudHelperService.showNotification("Service load balancer: Created", result.key.toString());
	                _this.returnToServicelbs();
	            }, function (error) {
	                servicelbCreateCtrl.crudHelperService.stopLoader(servicelbCreateCtrl);
	                servicelbCreateCtrl.crudHelperService.showServerError("Service load balancer: Create failed", error);
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
	    ServicelbCreateComponent.prototype.updateTenant = function (tenantName) {
	        this.servicelb.tenantName = tenantName;
	        this.getNetworks(tenantName);
	    };
	    ServicelbCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'servicelbCreate',
	            template: __webpack_require__(731)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object, (typeof (_g = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _g) || Object])
	    ], ServicelbCreateComponent);
	    return ServicelbCreateComponent;
	    var _a, _b, _c, _d, _e, _f, _g;
	}());
	exports.ServicelbCreateComponent = ServicelbCreateComponent;
	

/***/ },
/* 187 */
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
	var servicelbinfoctrl_1 = __webpack_require__(188);
	var servicelbstatsctrl_1 = __webpack_require__(190);
	var router_1 = __webpack_require__(5);
	var _ = __webpack_require__(28);
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
	    ServicelbDetailsComponent.prototype.cancelDetails = function () {
	        this.returnToServicelbs();
	    };
	    ServicelbDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToServicelbs();
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
	            template: __webpack_require__(732)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object])
	    ], ServicelbDetailsComponent);
	    return ServicelbDetailsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ServicelbDetailsComponent = ServicelbDetailsComponent;
	

/***/ },
/* 188 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var servicelbsmodel_1 = __webpack_require__(73);
	var router_1 = __webpack_require__(5);
	var _ = __webpack_require__(28);
	var ServicelbInfoComponent = (function () {
	    function ServicelbInfoComponent(router, activatedRoute, servicelbsModel, crudHelperService, ngZone) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.servicelbsModel = servicelbsModel;
	        this.crudHelperService = crudHelperService;
	        this.infoselected = true;
	        this.statskey = '';
	        this.showLoader = true;
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
	        this.crudHelperService.startLoader(this);
	        var existingLabelsView = this.servicelb.selectors.slice();
	        this.createLabelSelectorStrings();
	        var servicelbInfoCtrl = this;
	        this.servicelbsModel.save(this.servicelb)
	            .then(function (result) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	                servicelbInfoCtrl.crudHelperService.showNotification("Service load balancer: Updated", result.key.toString());
	            });
	            servicelbInfoCtrl.returnToServicelbDetails();
	        }, function (error) {
	            servicelbInfoCtrl.servicelb.selectors = existingLabelsView;
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	                servicelbInfoCtrl.crudHelperService.showServerError("Service load balancer: Update failed", error);
	            });
	        });
	    };
	    ServicelbInfoComponent.prototype.deleteServicelb = function () {
	        this.crudHelperService.startLoader(this);
	        var servicelbInfoCtrl = this;
	        this.servicelbsModel.delete(this.servicelb)
	            .then(function (result) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	                servicelbInfoCtrl.crudHelperService.showNotification("Service load balancer: Deleted", result.toString());
	            });
	            servicelbInfoCtrl.returnToServicelbs();
	        }, function (error) {
	            servicelbInfoCtrl.ngZone.run(function () {
	                servicelbInfoCtrl.crudHelperService.stopLoader(servicelbInfoCtrl);
	                servicelbInfoCtrl.crudHelperService.showNotification("Service load balancer: Delete failed", error);
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
	            template: __webpack_require__(733)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object, (typeof (_e = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _e) || Object, (typeof (_f = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _f) || Object, (typeof (_g = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _g) || Object])
	    ], ServicelbInfoComponent);
	    return ServicelbInfoComponent;
	    var _a, _b, _c, _d, _e, _f, _g;
	}());
	exports.ServicelbInfoComponent = ServicelbInfoComponent;
	

/***/ },
/* 189 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var servicelbsmodel_1 = __webpack_require__(73);
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
	        this.count = 0;
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
	            template: __webpack_require__(734)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _a) || Object, (typeof (_b = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _b) || Object, (typeof (_c = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], ServicelbListComponent);
	    return ServicelbListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.ServicelbListComponent = ServicelbListComponent;
	

/***/ },
/* 190 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var inspectservice_1 = __webpack_require__(83);
	var util_1 = __webpack_require__(19);
	var servicelbsmodel_1 = __webpack_require__(73);
	var contivglobals_1 = __webpack_require__(11);
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
	            template: __webpack_require__(736)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof servicelbsmodel_1.ServicelbsModel !== 'undefined' && servicelbsmodel_1.ServicelbsModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], ServicelbStatComponent);
	    return ServicelbStatComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ServicelbStatComponent = ServicelbStatComponent;
	

/***/ },
/* 191 */
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
	 * Created by cshampur on 12/13/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(7);
	var usersmodel_1 = __webpack_require__(81);
	var organizationsmodel_1 = __webpack_require__(34);
	var authorizationmodel_1 = __webpack_require__(101);
	var AuthorizationCreateComponent = (function () {
	    function AuthorizationCreateComponent(activatedRoute, router, crudHelperService, authorizationModel, organizationsModel, usersModel) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.authorizationModel = authorizationModel;
	        this.organizationsModel = organizationsModel;
	        this.usersModel = usersModel;
	        this.authorization = { PrincipalName: '', Local: false, Role: '', TenantName: '' };
	        this.tenants = [];
	        this.users = [];
	        this.showLoader = false;
	    }
	    AuthorizationCreateComponent.prototype.ngOnInit = function () {
	        this.getOrganization();
	    };
	    AuthorizationCreateComponent.prototype.getOrganization = function () {
	        var authCreateComp = this;
	        this.crudHelperService.startLoader(this);
	        this.organizationsModel.get(false)
	            .then(function (result) {
	            authCreateComp.tenants = result;
	            authCreateComp.getUsers();
	        }, function (error) {
	            authCreateComp.crudHelperService.stopLoader(authCreateComp);
	        });
	    };
	    AuthorizationCreateComponent.prototype.getUsers = function () {
	        var authCreateComp = this;
	        this.usersModel.get(false)
	            .then(function (result) {
	            authCreateComp.users = result;
	            authCreateComp.crudHelperService.stopLoader(authCreateComp);
	        }, function (error) {
	            authCreateComp.crudHelperService.stopLoader(authCreateComp);
	        });
	    };
	    AuthorizationCreateComponent.prototype.returnToAuthList = function () {
	        this.router.navigate(['../list'], { relativeTo: this.activatedRoute });
	    };
	    AuthorizationCreateComponent.prototype.cancelCreating = function () {
	        this.returnToAuthList();
	    };
	    AuthorizationCreateComponent.prototype.createAuthorization = function (formvalid) {
	        var authCreateComp = this;
	        if (formvalid) {
	            this.crudHelperService.startLoader(this);
	            this.authorizationModel.create(this.authorization)
	                .then(function (result) {
	                authCreateComp.crudHelperService.stopLoader(authCreateComp);
	                authCreateComp.crudHelperService.showNotification("Authorization: Created", result['PrincipalName'] + '::' + result['TenantName'] + '::' + result['Role']);
	                authCreateComp.returnToAuthList();
	            }, function (error) {
	                authCreateComp.crudHelperService.stopLoader(authCreateComp);
	                authCreateComp.crudHelperService.showServerError("Authorization: Create failed", error);
	            });
	        }
	    };
	    AuthorizationCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'authorizationcreate',
	            template: __webpack_require__(737)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof authorizationmodel_1.AuthorizationModel !== 'undefined' && authorizationmodel_1.AuthorizationModel) === 'function' && _d) || Object, (typeof (_e = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _e) || Object, (typeof (_f = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _f) || Object])
	    ], AuthorizationCreateComponent);
	    return AuthorizationCreateComponent;
	    var _a, _b, _c, _d, _e, _f;
	}());
	exports.AuthorizationCreateComponent = AuthorizationCreateComponent;
	

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 12/13/16.
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
	var authorizationmodel_1 = __webpack_require__(101);
	var crudhelperservice_1 = __webpack_require__(7);
	var router_1 = __webpack_require__(5);
	var organizationsmodel_1 = __webpack_require__(34);
	var AuthorizationDetailsComponent = (function () {
	    function AuthorizationDetailsComponent(authorizationModel, crudHelperService, router, activatedRoute, organizationModel) {
	        this.authorizationModel = authorizationModel;
	        this.crudHelperService = crudHelperService;
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.organizationModel = organizationModel;
	        this.authorization = { AuthzUUID: '', PrincipalName: '', Local: false, Role: '', TenantName: '' };
	        this.mode = 'details';
	        this.showLoader = false;
	        this.tenants = [];
	        var authdetailsComp = this;
	        function setMode() {
	            if (activatedRoute.routeConfig.path.includes('edit')) {
	                authdetailsComp.mode = 'edit';
	            }
	            else {
	                authdetailsComp.mode = 'details';
	            }
	        }
	        setMode();
	    }
	    AuthorizationDetailsComponent.prototype.ngOnInit = function () {
	        this.getAuthorizationDetail();
	    };
	    AuthorizationDetailsComponent.prototype.getAuthorizationDetail = function () {
	        var authdetailsComp = this;
	        this.crudHelperService.startLoader(this);
	        this.authorizationModel.getModelByKey(this.activatedRoute.snapshot.params['key'], false, 'AuthzUUID')
	            .then(function (result) {
	            authdetailsComp.authorization = result;
	            authdetailsComp.getOrganization();
	        }, function (error) {
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	        });
	    };
	    AuthorizationDetailsComponent.prototype.getOrganization = function () {
	        var authdetailsComp = this;
	        this.organizationModel.get(false)
	            .then(function (result) {
	            authdetailsComp.tenants = result;
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	        }, function (error) {
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	        });
	    };
	    AuthorizationDetailsComponent.prototype.returnToList = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    AuthorizationDetailsComponent.prototype.editAuthorization = function () {
	        this.router.navigate(['../../edit', this.authorization.AuthzUUID], { relativeTo: this.activatedRoute });
	    };
	    AuthorizationDetailsComponent.prototype.returntoAuthDetails = function () {
	        this.router.navigate(['../../details', this.authorization.AuthzUUID], { relativeTo: this.activatedRoute });
	    };
	    AuthorizationDetailsComponent.prototype.cancelEditing = function () {
	        this.returntoAuthDetails();
	    };
	    AuthorizationDetailsComponent.prototype.saveAuthorization = function () {
	        var authdetailsComp = this;
	        authdetailsComp.crudHelperService.startLoader(authdetailsComp);
	        this.authorizationModel.save(this.authorization)
	            .then(function (result) {
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	            authdetailsComp.crudHelperService.showNotification("Authorization: Updated", result['PrincipalName'] + '::' + result['TenantName'] + '::' + result['Role']);
	            authdetailsComp.returntoAuthDetails();
	        });
	    };
	    AuthorizationDetailsComponent.prototype.deleteAuthorization = function () {
	        var authdetailsComp = this;
	        authdetailsComp.crudHelperService.startLoader(authdetailsComp);
	        this.authorizationModel.delete(authdetailsComp.authorization['AuthzUUID'])
	            .then(function (result) {
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	            authdetailsComp.crudHelperService.showNotification("Authorization: Deleted", result);
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	            authdetailsComp.returnToList();
	        }, function (error) {
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	            authdetailsComp.crudHelperService.showServerError("Authorization: Delete failed", error);
	            authdetailsComp.crudHelperService.stopLoader(authdetailsComp);
	            authdetailsComp.returnToList();
	        });
	    };
	    AuthorizationDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'authorizationdetails',
	            template: __webpack_require__(738)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof authorizationmodel_1.AuthorizationModel !== 'undefined' && authorizationmodel_1.AuthorizationModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object, (typeof (_e = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _e) || Object])
	    ], AuthorizationDetailsComponent);
	    return AuthorizationDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.AuthorizationDetailsComponent = AuthorizationDetailsComponent;
	

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 12/13/16.
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
	var rxjs_1 = __webpack_require__(17);
	var crudhelperservice_1 = __webpack_require__(7);
	var authorizationmodel_1 = __webpack_require__(101);
	var router_1 = __webpack_require__(5);
	var AuthorizationListComponent = (function () {
	    function AuthorizationListComponent(crudHelperService, authorizationModel, router, activatedRoute) {
	        var _this = this;
	        this.crudHelperService = crudHelperService;
	        this.authorizationModel = authorizationModel;
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.authorizations = [];
	        this.filteredauth = [];
	        this.showLoader = false;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getAuthorization(true);
	        });
	    }
	    AuthorizationListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getAuthorization(false);
	    };
	    AuthorizationListComponent.prototype.getAuthorization = function (reload) {
	        var authorizationComp = this;
	        this.authorizationModel.get(reload)
	            .then(function (result) {
	            authorizationComp.authorizations = result;
	            authorizationComp.crudHelperService.stopLoader(authorizationComp);
	        }, function (error) {
	            authorizationComp.crudHelperService.stopLoader(authorizationComp);
	        });
	    };
	    AuthorizationListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    AuthorizationListComponent.prototype.create = function () {
	        this.router.navigate(['../create'], { relativeTo: this.activatedRoute });
	    };
	    AuthorizationListComponent = __decorate([
	        core_1.Component({
	            selector: 'authorizationlist',
	            template: __webpack_require__(739)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _a) || Object, (typeof (_b = typeof authorizationmodel_1.AuthorizationModel !== 'undefined' && authorizationmodel_1.AuthorizationModel) === 'function' && _b) || Object, (typeof (_c = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _c) || Object, (typeof (_d = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _d) || Object])
	    ], AuthorizationListComponent);
	    return AuthorizationListComponent;
	    var _a, _b, _c, _d;
	}());
	exports.AuthorizationListComponent = AuthorizationListComponent;
	

/***/ },
/* 194 */
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
	 * Created by cshampur on 12/18/16.
	 */
	var core_1 = __webpack_require__(2);
	var LdapConfigComponent = (function () {
	    function LdapConfigComponent() {
	    }
	    LdapConfigComponent = __decorate([
	        core_1.Component({
	            selector: 'ldapconfig',
	            template: "\n        <ldapsettings></ldapsettings>\n        "
	        }), 
	        __metadata('design:paramtypes', [])
	    ], LdapConfigComponent);
	    return LdapConfigComponent;
	}());
	exports.LdapConfigComponent = LdapConfigComponent;
	

/***/ },
/* 195 */
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
	var rxjs_1 = __webpack_require__(17);
	var crudhelperservice_1 = __webpack_require__(7);
	var networkservice_1 = __webpack_require__(123);
	var NetworkSettingsComponent = (function () {
	    function NetworkSettingsComponent(crudHelperService, networkService) {
	        var _this = this;
	        this.crudHelperService = crudHelperService;
	        this.networkService = networkService;
	        this.setting = {};
	        this.aciSetting = {};
	        this.globalInspectStats = {};
	        this['showLoader'] = true;
	        this['showServerError'] = false;
	        this['serverErrorMessage'] = '';
	        var networkSettingCtrl = this;
	        function getNetworkSettings() {
	            networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
	            networkSettingCtrl.networkService.getSettings().then(function successCallback(result) {
	                networkSettingCtrl.setting = result;
	                getAciSettings();
	            }, function errorCallback(result) {
	                getAciSettings();
	            });
	        }
	        getNetworkSettings();
	        function getAciSettings() {
	            networkService.getAciSettings()
	                .then(function (result) {
	                networkSettingCtrl.aciSetting = result;
	                networkSettingCtrl.getGlobalInspect(false);
	            }, function (error) {
	                networkSettingCtrl.getGlobalInspect(false);
	            });
	        }
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getGlobalInspect(true);
	        });
	    }
	    NetworkSettingsComponent.prototype.updateNetworkSettings = function (settings) {
	        var networkSettingCtrl = this;
	        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
	        networkSettingCtrl.networkService.updateSettings(settings).then(function successCallback(result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            networkSettingCtrl.crudHelperService.showNotification("Network settings: Updated", result.key.toString());
	        }, function errorCallback(result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            networkSettingCtrl.crudHelperService.showServerError("Network settings: Update failed", result);
	        });
	    };
	    NetworkSettingsComponent.prototype.updateAciSetting = function (settings) {
	        var networkSettingCtrl = this;
	        networkSettingCtrl.crudHelperService.startLoader(networkSettingCtrl);
	        networkSettingCtrl.networkService.updateAciSettings(settings)
	            .then(function (result) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            networkSettingCtrl.crudHelperService.showNotification("ACI settings: Updated", result.key.toString());
	        }, function (error) {
	            networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	            networkSettingCtrl.crudHelperService.showServerError("ACI settings: Update failed", error);
	        });
	    };
	    NetworkSettingsComponent.prototype.getGlobalInspect = function (reload) {
	        var networkSettingCtrl = this;
	        networkSettingCtrl.networkService.getGlobalInspect()
	            .then(function (result) {
	            networkSettingCtrl['globalInspectStats'] = result['Oper'];
	            if (!reload)
	                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	        }, function (error) {
	            if (!reload)
	                networkSettingCtrl.crudHelperService.stopLoader(networkSettingCtrl);
	        });
	    };
	    NetworkSettingsComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    NetworkSettingsComponent = __decorate([
	        core_1.Component({
	            selector: 'networksetting',
	            template: __webpack_require__(740)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _a) || Object, (typeof (_b = typeof networkservice_1.NetworkService !== 'undefined' && networkservice_1.NetworkService) === 'function' && _b) || Object])
	    ], NetworkSettingsComponent);
	    return NetworkSettingsComponent;
	    var _a, _b;
	}());
	exports.NetworkSettingsComponent = NetworkSettingsComponent;
	

/***/ },
/* 196 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var bgpsmodel_1 = __webpack_require__(72);
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
	            component.newNode = {
	                "key": "",
	                "hostname": "",
	                "routerip": "",
	                "as": "0",
	                "neighbor": "",
	                "neighbor-as": "0"
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
	            component.newNode.key = component.newNode.hostname;
	            this.bgpsModel.create(component.newNode, undefined)
	                .then(function (result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                    component.crudHelperService.showNotification("Node: Created", result.key.toString());
	                });
	                component.returnToNodes();
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError("Node: Create failed", error);
	            });
	        }
	    };
	    NodeCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'nodecreate',
	            template: __webpack_require__(741)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], NodeCreateComponent);
	    return NodeCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeCreateComponent = NodeCreateComponent;
	

/***/ },
/* 197 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var bgpsmodel_1 = __webpack_require__(72);
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
	        setMode();
	        this.statskey = this.activatedRoute.snapshot.params['key'];
	        this.infoselected = true;
	    }
	    NodeDetailsComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.stopLoader(component);
	        component.bgpsModel.getModelByKey(component.activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function successCallBack(node) {
	            component.node = node;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function (error) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    NodeDetailsComponent.prototype.returnToNode = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    NodeDetailsComponent.prototype.returnToNodeDetails = function () {
	        this.router.navigate(['../../details', this.node.key], { relativeTo: this.activatedRoute });
	    };
	    NodeDetailsComponent.prototype.cancelDetails = function () {
	        this.returnToNode();
	    };
	    NodeDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToNodeDetails();
	    };
	    NodeDetailsComponent.prototype.editNode = function () {
	        this.router.navigate(['../../edit', this.node.key], { relativeTo: this.activatedRoute });
	    };
	    NodeDetailsComponent.prototype.deleteNode = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        component.bgpsModel.delete(component.node).then(function successCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showNotification("Node: Deleted", result);
	            component.returnToNode();
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showServerError("Node: Delete failed", result);
	        });
	    };
	    NodeDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'nodedetails',
	            template: __webpack_require__(742)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], NodeDetailsComponent);
	    return NodeDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeDetailsComponent = NodeDetailsComponent;
	

/***/ },
/* 198 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var bgpsmodel_1 = __webpack_require__(72);
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
	            template: __webpack_require__(744)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], NodeListComponent);
	    return NodeListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeListComponent = NodeListComponent;
	

/***/ },
/* 199 */
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
	            template: __webpack_require__(746)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], SettingsMenuComponent);
	    return SettingsMenuComponent;
	}());
	exports.SettingsMenuComponent = SettingsMenuComponent;
	

/***/ },
/* 200 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var organizationsmodel_1 = __webpack_require__(34);
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
	            organizationCreateCtrl.newOrganization.key = organizationCreateCtrl.newOrganization.tenantName;
	            this.organizationsModel.create(organizationCreateCtrl.newOrganization, undefined)
	                .then(function (result) {
	                organizationCreateCtrl.ngZone.run(function () {
	                    organizationCreateCtrl.crudHelperService.stopLoader(organizationCreateCtrl);
	                    organizationCreateCtrl.crudHelperService.showNotification("Tenant: Created", result.key);
	                });
	                organizationCreateCtrl.returnToOrganizations();
	            }, function (error) {
	                organizationCreateCtrl.ngZone.run(function () {
	                    organizationCreateCtrl.crudHelperService.stopLoader(organizationCreateCtrl);
	                });
	                organizationCreateCtrl.crudHelperService.showServerError("Tenant: Create failed", error);
	            });
	        }
	    };
	    OrganizationCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'organizationcreate',
	            template: __webpack_require__(747)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], OrganizationCreateComponent);
	    return OrganizationCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.OrganizationCreateComponent = OrganizationCreateComponent;
	

/***/ },
/* 201 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var organizationsmodel_1 = __webpack_require__(34);
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
	    OrganizationDetailsComponent.prototype.close = function () { this.returnToOrganization(); };
	    OrganizationDetailsComponent.prototype.deleteOrganization = function () {
	        var organizationDetailsCtrl = this;
	        this.showLoader = true;
	        this.organizationsModel.delete(this.organization)
	            .then(function (result) {
	            organizationDetailsCtrl.showLoader = false;
	            organizationDetailsCtrl.crudHelperService.showNotification("Tenant: Deleted", result);
	            organizationDetailsCtrl.returnToOrganization();
	        }, function (error) {
	            organizationDetailsCtrl.showLoader = false;
	            organizationDetailsCtrl.crudHelperService.showServerError("Tenant: Delete failed", error);
	        });
	    };
	    OrganizationDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'organizationdetails',
	            template: __webpack_require__(748)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], OrganizationDetailsComponent);
	    return OrganizationDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.OrganizationDetailsComponent = OrganizationDetailsComponent;
	

/***/ },
/* 202 */
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
	var rxjs_1 = __webpack_require__(17);
	var crudhelperservice_1 = __webpack_require__(7);
	var organizationsmodel_1 = __webpack_require__(34);
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
	            template: __webpack_require__(749)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof organizationsmodel_1.OrganizationsModel !== 'undefined' && organizationsmodel_1.OrganizationsModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], OrganizationListComponent);
	    return OrganizationListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.OrganizationListComponent = OrganizationListComponent;
	

/***/ },
/* 203 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var usersmodel_1 = __webpack_require__(81);
	var contivglobals_1 = __webpack_require__(11);
	var UserCreateComponent = (function () {
	    function UserCreateComponent(activatedRoute, router, crudHelperService, usersModel, ngZone) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.crudHelperService = crudHelperService;
	        this.usersModel = usersModel;
	        this.ngZone = ngZone;
	        this.newUser = { username: '', password: '', first_name: '', last_name: '', disable: false };
	        this.organizations = [];
	        var component = this;
	        function resetForm() {
	            crudHelperService.stopLoader(component);
	            component.newUser = {
	                username: '',
	                password: '',
	                first_name: '',
	                last_name: '',
	                disable: false
	            };
	        }
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
	            this.usersModel.create(component.newUser, contivglobals_1.ContivGlobals.USERS_ENDPOINT, 'username')
	                .then(function (result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showNotification("User: Created", result.username);
	                component.returnToUsers();
	            }, function (error) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError("User: Create failed", error);
	            });
	        }
	    };
	    UserCreateComponent = __decorate([
	        core_1.Component({
	            selector: 'usercreate',
	            template: __webpack_require__(750)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _c) || Object, (typeof (_d = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], UserCreateComponent);
	    return UserCreateComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.UserCreateComponent = UserCreateComponent;
	

/***/ },
/* 204 */
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
	var usersmodel_1 = __webpack_require__(81);
	var crudhelperservice_1 = __webpack_require__(7);
	var contivglobals_1 = __webpack_require__(11);
	var UserDetailsComponent = (function () {
	    function UserDetailsComponent(activatedRoute, router, ngZone, usersModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.usersModel = usersModel;
	        this.crudHelperService = crudHelperService;
	        this.user = { username: '', password: '', first_name: '', last_name: '', disable: false };
	        this.organizations = [];
	        this.mode = 'details';
	        this.userDetailsCtrl = {};
	        this.userDetailsCtrl = this;
	        var component = this;
	        this.user = { username: '', first_name: '', last_name: '', disable: false };
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
	        component.usersModel.getModelByKey(activatedRoute.snapshot.params['key'], false, 'username')
	            .then(function (user) {
	            component.user = user;
	        });
	        setMode();
	    }
	    UserDetailsComponent.prototype.returnToUser = function () {
	        this.router.navigate(['../../list'], { relativeTo: this.activatedRoute });
	    };
	    UserDetailsComponent.prototype.returnToUserDetails = function () {
	        this.router.navigate(['../../details', this.user.username], { relativeTo: this.activatedRoute });
	    };
	    UserDetailsComponent.prototype.editUser = function () {
	        this.router.navigate(['../../edit', this.user.username], { relativeTo: this.activatedRoute });
	    };
	    UserDetailsComponent.prototype.cancelEditing = function () {
	        this.returnToUserDetails();
	    };
	    UserDetailsComponent.prototype.cancelDetails = function () {
	        this.returnToUser();
	    };
	    UserDetailsComponent.prototype.deleteUser = function () {
	        var component = this;
	        component.crudHelperService.startLoader(component);
	        var username = component.user['username'];
	        var url = contivglobals_1.ContivGlobals.USERS_ENDPOINT + '/' + username;
	        component.usersModel.deleteUsingKey(username, 'username', url).then(function successCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showNotification("User: Deleted", result);
	            component.returnToUser();
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	            component.crudHelperService.showServerError("User: Delete failed", result);
	        });
	    };
	    UserDetailsComponent.prototype.saveUser = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            component.crudHelperService.startLoader(component);
	            component.usersModel.save(component.user).then(function successCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showNotification("User: Updated", result.username.toString());
	                component.returnToUserDetails();
	            }, function errorCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError("User: Update failed", result);
	            });
	        }
	    };
	    UserDetailsComponent = __decorate([
	        core_1.Component({
	            selector: 'userdetails',
	            template: __webpack_require__(751)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], UserDetailsComponent);
	    return UserDetailsComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.UserDetailsComponent = UserDetailsComponent;
	

/***/ },
/* 205 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var usersmodel_1 = __webpack_require__(81);
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
	        // update breadcrumbs
	        $('.crumb2').html('User Management');
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
	            template: __webpack_require__(752)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof usersmodel_1.UsersModel !== 'undefined' && usersmodel_1.UsersModel) === 'function' && _c) || Object, (typeof (_d = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _d) || Object, (typeof (_e = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _e) || Object])
	    ], UserListComponent);
	    return UserListComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.UserListComponent = UserListComponent;
	

/***/ },
/* 206 */,
/* 207 */,
/* 208 */,
/* 209 */,
/* 210 */,
/* 211 */,
/* 212 */,
/* 213 */,
/* 214 */,
/* 215 */,
/* 216 */,
/* 217 */,
/* 218 */,
/* 219 */,
/* 220 */,
/* 221 */,
/* 222 */,
/* 223 */,
/* 224 */,
/* 225 */,
/* 226 */,
/* 227 */,
/* 228 */,
/* 229 */,
/* 230 */,
/* 231 */,
/* 232 */,
/* 233 */,
/* 234 */,
/* 235 */,
/* 236 */,
/* 237 */,
/* 238 */,
/* 239 */,
/* 240 */,
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(61);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 242 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
	var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

	module.exports = freeGlobal;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 243 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

	  return value === proto;
	}

	module.exports = isPrototype;


/***/ },
/* 244 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var funcProto = Function.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/**
	 * Converts `func` to its source code.
	 *
	 * @private
	 * @param {Function} func The function to convert.
	 * @returns {string} Returns the source code.
	 */
	function toSource(func) {
	  if (func != null) {
	    try {
	      return funcToString.call(func);
	    } catch (e) {}
	    try {
	      return (func + '');
	    } catch (e) {}
	  }
	  return '';
	}

	module.exports = toSource;


/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(112),
	    isObject = __webpack_require__(247);

	/** `Object#toString` result references. */
	var asyncTag = '[object AsyncFunction]',
	    funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]',
	    proxyTag = '[object Proxy]';

	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  if (!isObject(value)) {
	    return false;
	  }
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 9 which returns 'object' for typed arrays and other constructors.
	  var tag = baseGetTag(value);
	  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
	}

	module.exports = isFunction;


/***/ },
/* 246 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;

	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This method is loosely based on
	 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}

	module.exports = isLength;


/***/ },
/* 247 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the
	 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return value != null && (type == 'object' || type == 'function');
	}

	module.exports = isObject;


/***/ },
/* 248 */,
/* 249 */,
/* 250 */,
/* 251 */,
/* 252 */,
/* 253 */,
/* 254 */,
/* 255 */,
/* 256 */,
/* 257 */,
/* 258 */,
/* 259 */,
/* 260 */,
/* 261 */,
/* 262 */,
/* 263 */,
/* 264 */,
/* 265 */,
/* 266 */,
/* 267 */,
/* 268 */,
/* 269 */,
/* 270 */,
/* 271 */,
/* 272 */,
/* 273 */,
/* 274 */,
/* 275 */,
/* 276 */,
/* 277 */,
/* 278 */,
/* 279 */,
/* 280 */,
/* 281 */,
/* 282 */,
/* 283 */,
/* 284 */,
/* 285 */,
/* 286 */,
/* 287 */,
/* 288 */,
/* 289 */,
/* 290 */,
/* 291 */,
/* 292 */,
/* 293 */,
/* 294 */,
/* 295 */,
/* 296 */,
/* 297 */,
/* 298 */,
/* 299 */,
/* 300 */,
/* 301 */,
/* 302 */,
/* 303 */,
/* 304 */,
/* 305 */,
/* 306 */,
/* 307 */,
/* 308 */,
/* 309 */,
/* 310 */,
/* 311 */,
/* 312 */,
/* 313 */,
/* 314 */,
/* 315 */,
/* 316 */,
/* 317 */,
/* 318 */,
/* 319 */,
/* 320 */,
/* 321 */,
/* 322 */,
/* 323 */,
/* 324 */,
/* 325 */,
/* 326 */,
/* 327 */,
/* 328 */,
/* 329 */,
/* 330 */,
/* 331 */,
/* 332 */,
/* 333 */,
/* 334 */,
/* 335 */,
/* 336 */,
/* 337 */,
/* 338 */,
/* 339 */,
/* 340 */,
/* 341 */,
/* 342 */,
/* 343 */,
/* 344 */,
/* 345 */,
/* 346 */,
/* 347 */,
/* 348 */,
/* 349 */,
/* 350 */,
/* 351 */,
/* 352 */,
/* 353 */,
/* 354 */,
/* 355 */,
/* 356 */,
/* 357 */,
/* 358 */,
/* 359 */,
/* 360 */,
/* 361 */,
/* 362 */,
/* 363 */,
/* 364 */,
/* 365 */,
/* 366 */,
/* 367 */,
/* 368 */,
/* 369 */,
/* 370 */,
/* 371 */,
/* 372 */,
/* 373 */,
/* 374 */,
/* 375 */,
/* 376 */,
/* 377 */,
/* 378 */,
/* 379 */,
/* 380 */,
/* 381 */,
/* 382 */,
/* 383 */,
/* 384 */,
/* 385 */,
/* 386 */,
/* 387 */,
/* 388 */,
/* 389 */,
/* 390 */,
/* 391 */,
/* 392 */,
/* 393 */,
/* 394 */
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
/* 395 */
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
	var platform_browser_1 = __webpack_require__(78);
	var http_1 = __webpack_require__(23);
	var common_1 = __webpack_require__(20);
	var dashboard_module_1 = __webpack_require__(417);
	var networkpolicies_module_1 = __webpack_require__(428);
	var settings_module_1 = __webpack_require__(437);
	var network_module_1 = __webpack_require__(429);
	var servicelb_module_1 = __webpack_require__(432);
	var appprofile_module_1 = __webpack_require__(404);
	var users_module_1 = __webpack_require__(439);
	var netprofilesmodel_1 = __webpack_require__(80);
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var networksmodel_1 = __webpack_require__(48);
	var organizationsmodel_1 = __webpack_require__(34);
	var policiesmodel_1 = __webpack_require__(64);
	var rulesmodel_1 = __webpack_require__(122);
	var servicelbsmodel_1 = __webpack_require__(73);
	var usersmodel_1 = __webpack_require__(81);
	var appprofilesmodel_1 = __webpack_require__(100);
	var bgpsmodel_1 = __webpack_require__(72);
	var contractgroupsmodel_1 = __webpack_require__(79);
	var crudhelperservice_1 = __webpack_require__(7);
	var inspectservice_1 = __webpack_require__(83);
	var networkservice_1 = __webpack_require__(123);
	var menu_module_1 = __webpack_require__(423);
	var app_component_1 = __webpack_require__(394);
	var login_module_1 = __webpack_require__(422);
	var authservice_1 = __webpack_require__(54);
	var authguard_1 = __webpack_require__(170);
	var apiservice_1 = __webpack_require__(27);
	var firstrunwizard_module_1 = __webpack_require__(420);
	var chartservice_1 = __webpack_require__(82);
	var authorizationmodel_1 = __webpack_require__(101);
	var applicationgroups_module_1 = __webpack_require__(398);
	var app_routes_1 = __webpack_require__(396);
	var authorization_module_1 = __webpack_require__(434);
	var organization_module_1 = __webpack_require__(438);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    AppModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                platform_browser_1.BrowserModule,
	                http_1.HttpModule,
	                app_routes_1.default,
	                menu_module_1.MenuModule,
	                dashboard_module_1.DashboardModule,
	                networkpolicies_module_1.NetworkPoliciesModule,
	                applicationgroups_module_1.ApplicationGroupsModule,
	                settings_module_1.SettingsModule,
	                network_module_1.NetworkModule,
	                servicelb_module_1.ServicelbModule,
	                appprofile_module_1.AppProfilesModule,
	                organization_module_1.OrganizationModule,
	                login_module_1.LoginModule,
	                users_module_1.UsersModule,
	                authorization_module_1.AuthorizationModule,
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
	                contractgroupsmodel_1.ContractGroupsModel,
	                authorizationmodel_1.AuthorizationModel,
	                crudhelperservice_1.CRUDHelperService,
	                inspectservice_1.InspectService,
	                networkservice_1.NetworkService,
	                authservice_1.AuthService,
	                authguard_1.AuthGuard,
	                apiservice_1.ApiService,
	                chartservice_1.ChartService,
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
/* 396 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by vjain3 on 11/1/16.
	 */
	var router_1 = __webpack_require__(5);
	var menuCtrl_1 = __webpack_require__(176);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var isolationpolicycreatectrl_1 = __webpack_require__(181);
	var isolationpolicydetailsctrl_1 = __webpack_require__(182);
	var bandwidthpolicycreatectrl_1 = __webpack_require__(177);
	var bandwidthpolicydetailsctrl_1 = __webpack_require__(178);
	var dashboardctrl_1 = __webpack_require__(171);
	var applicationgrouplistctrl_1 = __webpack_require__(164);
	var applicationgroupcreatectrl_1 = __webpack_require__(162);
	var applicationgroupdetailsctrl_1 = __webpack_require__(163);
	var settingsmenu_component_1 = __webpack_require__(199);
	var networksettingctrl_1 = __webpack_require__(195);
	var networklistctrl_1 = __webpack_require__(185);
	var networkdetailsctrl_1 = __webpack_require__(184);
	var networkcreatectrl_1 = __webpack_require__(183);
	var servicelblistctrl_1 = __webpack_require__(189);
	var servicelbcreatectrl_1 = __webpack_require__(186);
	var servicelbdetailsctrl_1 = __webpack_require__(187);
	var loginctrl_1 = __webpack_require__(173);
	var authguard_1 = __webpack_require__(170);
	var unauthorized_1 = __webpack_require__(175);
	var logoutctrl_1 = __webpack_require__(174);
	var userlist_component_1 = __webpack_require__(205);
	var usercreate_component_1 = __webpack_require__(203);
	var userdetails_component_1 = __webpack_require__(204);
	var appprofilelist_component_1 = __webpack_require__(167);
	var appprofilecreate_component_1 = __webpack_require__(165);
	var appprofiledetails_component_1 = __webpack_require__(166);
	var firstrunwizardctrl_1 = __webpack_require__(172);
	var nodelist_component_1 = __webpack_require__(198);
	var nodecreate_component_1 = __webpack_require__(196);
	var nodedetails_component_1 = __webpack_require__(197);
	var contractgroupcreate_component_1 = __webpack_require__(179);
	var contractgroupdetails_component_1 = __webpack_require__(180);
	var authorizationlist_1 = __webpack_require__(193);
	var authorizationdetails_1 = __webpack_require__(192);
	var authorizationcreate_1 = __webpack_require__(191);
	var organizationlistctrl_1 = __webpack_require__(202);
	var organizationcreatectrl_1 = __webpack_require__(200);
	var organizationdetailsctrl_1 = __webpack_require__(201);
	var ldapconfiguration_1 = __webpack_require__(194);
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
	            { path: 'networkpolicies', redirectTo: 'networkpolicies/list', pathMatch: 'full' },
	            { path: 'networkpolicies/list', component: networkpoliciestabsctrl_1.NetworkPoliciesTabsComponent },
	            { path: 'networkpolicies/isolation/create', component: isolationpolicycreatectrl_1.IsolationPolicyCreateComponent },
	            { path: 'networkpolicies/isolation/details/:key', component: isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent },
	            { path: 'networkpolicies/isolation/edit/:key', component: isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent },
	            { path: 'networkpolicies/bandwidth/create', component: bandwidthpolicycreatectrl_1.BandwidthPolicyCreateComponent },
	            { path: 'networkpolicies/bandwidth/details/:key', component: bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent },
	            { path: 'networkpolicies/bandwidth/edit/:key', component: bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent },
	            { path: 'networkpolicies/contractgroup/create', component: contractgroupcreate_component_1.ContractGroupCreateComponent },
	            { path: 'networkpolicies/contractgroup/details/:key', component: contractgroupdetails_component_1.ContractGroupDetailsComponent },
	            //Application Groups
	            { path: 'applicationgroups', redirectTo: 'applicationgroups/list', pathMatch: 'full' },
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
	                    { path: 'ldap', component: ldapconfiguration_1.LdapConfigComponent },
	                    { path: 'nodes', redirectTo: 'nodes/list', pathMatch: 'full' },
	                    { path: 'nodes/list', component: nodelist_component_1.NodeListComponent },
	                    { path: 'nodes/create', component: nodecreate_component_1.NodeCreateComponent },
	                    { path: 'nodes/details/:key', component: nodedetails_component_1.NodeDetailsComponent },
	                    { path: 'nodes/edit/:key', component: nodedetails_component_1.NodeDetailsComponent },
	                    //Users
	                    { path: 'users', redirectTo: 'users/list', pathMatch: 'full' },
	                    { path: 'users/list', component: userlist_component_1.UserListComponent },
	                    { path: 'users/create', component: usercreate_component_1.UserCreateComponent },
	                    { path: 'users/details/:key', component: userdetails_component_1.UserDetailsComponent },
	                    { path: 'users/edit/:key', component: userdetails_component_1.UserDetailsComponent },
	                    //Authorizations
	                    { path: 'authorization', redirectTo: 'authorization/list', pathMatch: 'full' },
	                    { path: 'authorization/list', component: authorizationlist_1.AuthorizationListComponent },
	                    { path: 'authorization/create', component: authorizationcreate_1.AuthorizationCreateComponent },
	                    { path: 'authorization/details/:key', component: authorizationdetails_1.AuthorizationDetailsComponent },
	                    { path: 'authorization/edit/:key', component: authorizationdetails_1.AuthorizationDetailsComponent },
	                    //Tenants
	                    { path: 'organizations', redirectTo: 'organizations/list', pathMatch: 'full' },
	                    { path: 'organizations/list', component: organizationlistctrl_1.OrganizationListComponent },
	                    { path: 'organizations/create', component: organizationcreatectrl_1.OrganizationCreateComponent },
	                    { path: 'organizations/details/:key', component: organizationdetailsctrl_1.OrganizationDetailsComponent },
	                ]
	            },
	            //Networks
	            { path: 'networks', redirectTo: 'networks/list', pathMatch: 'full' },
	            { path: 'networks/list', component: networklistctrl_1.NetworkListComponent },
	            { path: 'networks/create', component: networkcreatectrl_1.NetworkCreateComponent },
	            { path: 'networks/details/:key', component: networkdetailsctrl_1.NetworkdetailsComponent },
	            //Servicelbs
	            { path: 'servicelbs', redirectTo: 'servicelbs/list', pathMatch: 'full' },
	            { path: 'servicelbs/list', component: servicelblistctrl_1.ServicelbListComponent },
	            { path: 'servicelbs/create', component: servicelbcreatectrl_1.ServicelbCreateComponent },
	            { path: 'servicelbs/details/:key', component: servicelbdetailsctrl_1.ServicelbDetailsComponent },
	            //Application profiles
	            { path: 'appprofiles', redirectTo: 'appprofiles/list', pathMatch: 'full' },
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
/* 397 */
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
	            template: __webpack_require__(683)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ApplicationGroupInfoComponent);
	    return ApplicationGroupInfoComponent;
	}());
	exports.ApplicationGroupInfoComponent = ApplicationGroupInfoComponent;
	

/***/ },
/* 398 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var pipes_module_1 = __webpack_require__(168);
	var applicationgroupcreatectrl_1 = __webpack_require__(162);
	var applicationgroupdetailsctrl_1 = __webpack_require__(163);
	var isolationpolicydirective_1 = __webpack_require__(402);
	var bandwidthpolicydirective_1 = __webpack_require__(400);
	var contractgroup_component_1 = __webpack_require__(401);
	var applicationgrouplistctrl_1 = __webpack_require__(164);
	var applicationgroupstats_1 = __webpack_require__(399);
	var applicationgroupinfoctrl_1 = __webpack_require__(397);
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
	                contractgroup_component_1.ContractGroupSelectionComponent,
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
	                contractgroup_component_1.ContractGroupSelectionComponent,
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
/* 399 */
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
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var crudhelperservice_1 = __webpack_require__(7);
	var inspectservice_1 = __webpack_require__(83);
	var rxjs_1 = __webpack_require__(17);
	var contivglobals_1 = __webpack_require__(11);
	var util_1 = __webpack_require__(19);
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
	            template: __webpack_require__(685)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], ApplicationGroupStatsComponent);
	    return ApplicationGroupStatsComponent;
	    var _a, _b, _c, _d;
	}());
	exports.ApplicationGroupStatsComponent = ApplicationGroupStatsComponent;
	

/***/ },
/* 400 */
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
	var _ = __webpack_require__(28);
	var netprofilesmodel_1 = __webpack_require__(80);
	var util_1 = __webpack_require__(19);
	var BandwidthPolicySelectionComponent = (function () {
	    function BandwidthPolicySelectionComponent(netprofilesModel) {
	        this.netprofilesModel = netprofilesModel;
	        this.netProfiles = [];
	        this.selectedNetprofile = {};
	        this.netProfileSearchText = '';
	    }
	    BandwidthPolicySelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        component.getNetprofiles();
	    };
	    /**
	     * Get profiles for the given tenant.
	     */
	    BandwidthPolicySelectionComponent.prototype.getNetprofiles = function () {
	        var component = this;
	        component.netprofilesModel.get(false).then(function (result) {
	            component.netProfiles = _.filter(result, {
	                'tenantName': component.applicationgroup.tenantName
	            });
	            if ((component.applicationgroup.netProfile !== '') && (!util_1.isUndefined(component.applicationgroup['netProfile']))) {
	                component.selectedNetprofile = _.find(component.netProfiles, function (policy) {
	                    return policy.profileName === component.applicationgroup.netProfile;
	                });
	            }
	        });
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
	            template: __webpack_require__(686)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _a) || Object])
	    ], BandwidthPolicySelectionComponent);
	    return BandwidthPolicySelectionComponent;
	    var _a;
	}());
	exports.BandwidthPolicySelectionComponent = BandwidthPolicySelectionComponent;
	

/***/ },
/* 401 */
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
	 * Created by vjain3 on 12/14/16.
	 */
	var core_1 = __webpack_require__(2);
	var _ = __webpack_require__(28);
	var contractgroupsmodel_1 = __webpack_require__(79);
	var ContractGroupSelectionComponent = (function () {
	    function ContractGroupSelectionComponent(contractGroupsModel) {
	        this.contractGroupsModel = contractGroupsModel;
	        this.selectedContractGroups = []; // To Store contract groups selected by user to display
	        this.contractGroups = []; // To Get all contract groups of tenant
	        this.contractGroupSearchText = '';
	    }
	    ContractGroupSelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        /**
	         * Get contract group objects for each contract group present in applicationgroup
	         */
	        function getSelectedContractGroups() {
	            component.applicationgroup.extContractsGrps.forEach(function (contractGroup) {
	                //To display details of selected contract groups
	                var key = component.applicationgroup.tenantName + ':' + contractGroup;
	                component.contractGroupsModel.getModelByKey(key, false, undefined)
	                    .then(function (group) {
	                    component.selectedContractGroups.push(group);
	                });
	            });
	        }
	        /**
	         *  To check 'details' or 'edit' mode (not create mode)
	         */
	        if (component.mode === 'details' || (component.mode === 'edit' && component.applicationgroup.groupName != "")) {
	            component.getContractGroups();
	            //Application Groups might not have any contract groups associated with them so define an empty array
	            if (component.applicationgroup.extContractsGrps === undefined) {
	                component.applicationgroup.extContractsGrps = [];
	            }
	            getSelectedContractGroups();
	        }
	    };
	    /**
	     * Get contract groups for the given tenant.
	     */
	    ContractGroupSelectionComponent.prototype.getContractGroups = function () {
	        var component = this;
	        component.contractGroupsModel.get(false).then(function (result) {
	            component.contractGroups = _.filter(result, {
	                'tenantName': component.applicationgroup.tenantName
	            });
	        });
	    };
	    /**
	     * Add contract group to application group
	     */
	    ContractGroupSelectionComponent.prototype.addContractGroup = function (contractGroupName) {
	        var component = this;
	        if (contractGroupName !== undefined && _.includes(component.selectedContractGroups, contractGroupName) == false) {
	            //To display selected contract groups
	            var key = component.applicationgroup.tenantName + ':' + contractGroupName;
	            component.contractGroupsModel.getModelByKey(key, false, undefined)
	                .then(function (group) {
	                component.selectedContractGroups.push(group);
	            });
	            //To be added to application group and saved to the server
	            component.applicationgroup.extContractsGrps
	                .push(contractGroupName);
	        }
	    };
	    ;
	    /**
	     * Remove contract group from application group
	     */
	    ContractGroupSelectionComponent.prototype.removeContractGroup = function (contractGroupName) {
	        _.remove(this.selectedContractGroups, function (group) {
	            return group.contractsGroupName === contractGroupName;
	        });
	        _.remove(this.applicationgroup.extContractsGrps, function (group) {
	            return group === contractGroupName;
	        });
	    };
	    ;
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', String)
	    ], ContractGroupSelectionComponent.prototype, "mode", void 0);
	    __decorate([
	        core_1.Input(), 
	        __metadata('design:type', Object)
	    ], ContractGroupSelectionComponent.prototype, "applicationgroup", void 0);
	    ContractGroupSelectionComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-contractgroup',
	            template: __webpack_require__(687)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof contractgroupsmodel_1.ContractGroupsModel !== 'undefined' && contractgroupsmodel_1.ContractGroupsModel) === 'function' && _a) || Object])
	    ], ContractGroupSelectionComponent);
	    return ContractGroupSelectionComponent;
	    var _a;
	}());
	exports.ContractGroupSelectionComponent = ContractGroupSelectionComponent;
	

/***/ },
/* 402 */
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
	var _ = __webpack_require__(28);
	var policiesmodel_1 = __webpack_require__(64);
	var rulesmodel_1 = __webpack_require__(122);
	var IsolationPolicySelectionComponent = (function () {
	    function IsolationPolicySelectionComponent(policiesModel, rulesModel) {
	        this.policiesModel = policiesModel;
	        this.rulesModel = rulesModel;
	        this.incomingRules = [];
	        this.outgoingRules = [];
	        this.selectedPolicies = []; // To Store policies selected by user to display
	        this.isolationPolicies = []; // To Get all isolation policies of tenant
	        this.isolationPolicySearchText = '';
	    }
	    IsolationPolicySelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        /**
	         * Get incoming and outgoing rules for each policy present in applicationgroup
	         */
	        function getRules() {
	            component.applicationgroup.policies.forEach(function (policy) {
	                //To display rules of selected policies
	                component.rulesModel.getIncomingRules(policy, component.applicationgroup.tenantName)
	                    .then(function (rules) {
	                    Array.prototype.push.apply(component.incomingRules, rules);
	                });
	                component.rulesModel.getOutgoingRules(policy, component.applicationgroup.tenantName)
	                    .then(function (rules) {
	                    Array.prototype.push.apply(component.outgoingRules, rules);
	                });
	            });
	        }
	        /**
	         *  To check 'details' or 'edit' mode (not create mode)
	         */
	        if (component.mode === 'details' || (component.mode === 'edit' && component.applicationgroup.groupName != "")) {
	            component.getIsolationPolicies();
	            //Application Groups might not have any policies associated with them so define an empty array
	            if (component.applicationgroup.policies === undefined) {
	                component.applicationgroup.policies = [];
	            }
	            getRules();
	        }
	    };
	    /**
	     * Get policies for the given tenant.
	     */
	    IsolationPolicySelectionComponent.prototype.getIsolationPolicies = function () {
	        var component = this;
	        component.policiesModel.get(false).then(function (result) {
	            component.isolationPolicies = _.filter(result, {
	                'tenantName': component.applicationgroup.tenantName
	            });
	        });
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
	            component.rulesModel.getIncomingRules(currentPolicyName, component.applicationgroup.tenantName)
	                .then(function (rules) {
	                Array.prototype.push.apply(component.incomingRules, rules);
	            });
	            component.rulesModel.getOutgoingRules(currentPolicyName, component.applicationgroup.tenantName)
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
	            template: __webpack_require__(688)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _a) || Object, (typeof (_b = typeof rulesmodel_1.RulesModel !== 'undefined' && rulesmodel_1.RulesModel) === 'function' && _b) || Object])
	    ], IsolationPolicySelectionComponent);
	    return IsolationPolicySelectionComponent;
	    var _a, _b;
	}());
	exports.IsolationPolicySelectionComponent = IsolationPolicySelectionComponent;
	

/***/ },
/* 403 */
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
	var _ = __webpack_require__(28);
	var applicationgroupsmodel_1 = __webpack_require__(47);
	var ApplicationGroupSelectionComponent = (function () {
	    function ApplicationGroupSelectionComponent(applicationGroupsModel) {
	        this.applicationGroupsModel = applicationGroupsModel;
	        this.applicationGroups = []; // To Get all application groups of tenant
	        this.applicationGroupSearchText = '';
	        this.selectedApplicationGroups = [];
	    }
	    ApplicationGroupSelectionComponent.prototype.ngOnChanges = function () {
	        var component = this;
	        component.getApplicationGroups();
	        /**
	         *  To check 'details' or 'edit' mode (not create mode)
	         */
	        if (component.mode === 'details' || (component.mode === 'edit' && component.appProfile.appProfileName != "")) {
	            //Application Profiles might not have any groups associated with them so define an empty array
	            if (component.appProfile.endpointGroups === undefined) {
	                component.appProfile.endpointGroups = [];
	            }
	        }
	    };
	    /**
	     * Get application groups.
	     */
	    ApplicationGroupSelectionComponent.prototype.getApplicationGroups = function () {
	        var component = this;
	        //Refresh application groups as its links would be updated when a new application profile is created.
	        component.applicationGroupsModel.get(true).then(function (result) {
	            component.selectedApplicationGroups = _.filter(result, function (group) {
	                return _.includes(component.appProfile.endpointGroups, group['groupName']);
	            });
	            //No two application profiles can share the same application groups
	            component.applicationGroups = _.filter(result, function (group) {
	                return (((_.isEmpty(group['links'].AppProfile)) || (group['links'].AppProfile.key === component.appProfile.key))
	                    && (group['tenantName'] === component.appProfile.tenantName));
	            });
	        });
	    };
	    /**
	     * Add group to app profile
	     */
	    ApplicationGroupSelectionComponent.prototype.addApplicationGroup = function (groupName) {
	        var component = this;
	        var currentGroupName = groupName;
	        if (currentGroupName !== undefined && !_.includes(component.appProfile.endpointGroups, currentGroupName)) {
	            var key = component.appProfile.tenantName + ':' + currentGroupName;
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
	            template: __webpack_require__(689)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof applicationgroupsmodel_1.ApplicationGroupsModel !== 'undefined' && applicationgroupsmodel_1.ApplicationGroupsModel) === 'function' && _a) || Object])
	    ], ApplicationGroupSelectionComponent);
	    return ApplicationGroupSelectionComponent;
	    var _a;
	}());
	exports.ApplicationGroupSelectionComponent = ApplicationGroupSelectionComponent;
	

/***/ },
/* 404 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var appprofilelist_component_1 = __webpack_require__(167);
	var appprofilecreate_component_1 = __webpack_require__(165);
	var appprofiledetails_component_1 = __webpack_require__(166);
	var appgroupselection_component_1 = __webpack_require__(403);
	var pipes_module_1 = __webpack_require__(168);
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
/* 405 */
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
	            template: __webpack_require__(693)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof core_1.ElementRef !== 'undefined' && core_1.ElementRef) === 'function' && _a) || Object])
	    ], CtvAccordionComponent);
	    return CtvAccordionComponent;
	    var _a;
	}());
	exports.CtvAccordionComponent = CtvAccordionComponent;
	

/***/ },
/* 406 */
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
	var authservice_1 = __webpack_require__(54);
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
/* 407 */
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
	            template: __webpack_require__(694)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvCollapsibleComponent);
	    return CtvCollapsibleComponent;
	}());
	exports.CtvCollapsibleComponent = CtvCollapsibleComponent;
	

/***/ },
/* 408 */
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
	            template: __webpack_require__(695)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ErrorMessageComponent);
	    return ErrorMessageComponent;
	}());
	exports.ErrorMessageComponent = ErrorMessageComponent;
	

/***/ },
/* 409 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 11/16/16.
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
	var chartservice_1 = __webpack_require__(82);
	var util_1 = __webpack_require__(19);
	var util_2 = __webpack_require__(19);
	var LineGraphComponent = (function () {
	    function LineGraphComponent(chartService) {
	        this.chartService = chartService;
	        this.EndpointType = chartservice_1.EndpointType;
	        this.lineChartOptions = {};
	        this.lineChartColors = [
	            {
	                backgroundColor: 'rgba(255,255,255,0',
	                borderColor: 'rgba(4,159,217,1)',
	                pointBackgroundColor: 'rgba(0,117,180,1)',
	                pointBorderColor: 'rgba(0,117,180,1)',
	                pointHoverBackgroundColor: '#fff',
	                pointHoverBorderColor: 'rgba(77,83,96,1)'
	            }
	        ];
	        this.lineChartLegend = true;
	        this.lineChartType = 'line';
	        this.lineChartData = [{
	                label: '# of Endpoints',
	                data: [0, 0, 0, 0],
	            }];
	        this.adjustScale(100);
	        this.lineChartLabels = ['0T', '1T', '2T', '3T'];
	        this.inspectActivated = false;
	        this.prevKey = '';
	        this.key = '';
	        this.endpointType = chartservice_1.EndpointType.Network;
	        this.prevEndpointType = chartservice_1.EndpointType.Network;
	    }
	    LineGraphComponent.prototype.ngOnInit = function () {
	        var _this = this;
	        this.prevKey = this.key;
	        this.prevEndpointType = this.endpointType;
	        this.subscription = this.chartService.stream.subscribe(function (result) {
	            var resultKey = result['iKey'];
	            var resultEndpointType = result['type'];
	            var currKey = _this.key;
	            var currEndpointType = _this.endpointType;
	            if (resultKey === currKey && resultEndpointType === currEndpointType) {
	                _this.scaleEnd++;
	                if (!_this.inspectActivated) {
	                    _this.start++;
	                    _this.end++;
	                    _this.loadGraphData();
	                }
	            }
	        });
	    };
	    /*  This function is needed to redraw the chart after every update. The drawing is done
	        using last 15 array values from chartservice.graphdata.
	        eg:
	        chartservice.graphdata = { 0:
	                                        {   'contiv-net': [1,2,3,4,5...],
	                                            'super-net': [1,2,3,4,5...]
	                                        },
	                                   1:
	                                        {   'app-group1': [1,2,3,4,5...],
	                                            'app-group2': [1,2,3,4,5...]
	                                        }
	                                 }
	        In the above structure 0 represents enum EndpointType.Network;
	                               1 represents enum EndpointType.ApplicationGroup;
	     */
	    LineGraphComponent.prototype.loadGraphData = function () {
	        this.lineChartData[0]['data'] = [];
	        this.lineChartLabels = [];
	        var max = 0;
	        for (var i = this.start; i <= this.end; i++) {
	            var endpointcount = this.chartService.graphData[this.endpointType][this.key][i];
	            this.lineChartData[0]['data'].push(endpointcount);
	            this.lineChartLabels.push(i + 'T');
	            if (endpointcount > max) {
	                max = endpointcount;
	            }
	        }
	        if (!util_1.isUndefined(this.lineChartOptions.scales)) {
	            var scaleMax = this.lineChartOptions.scales.yAxes[0].ticks.suggestedMax;
	            if (max > scaleMax) {
	                this.adjustScale(max);
	            }
	        }
	        else {
	            this.adjustScale(max);
	        }
	    };
	    /*
	        This function is needed to update the Y-axes scale values so that the line
	        is always within the boundry and there is significant change in offset of line
	        when there is variation in the array values. This is needed since scale always begins at 0.
	     */
	    LineGraphComponent.prototype.adjustScale = function (max) {
	        this.lineChartOptions = {};
	        this.lineChartOptions = {
	            animation: false,
	            responsive: true,
	            scales: {
	                yAxes: [{
	                        type: 'linear',
	                        ticks: {
	                            beginAtZero: true,
	                            suggestedMax: max * 1.5
	                        }
	                    }]
	            },
	            elements: {
	                line: {
	                    borderWidth: 2
	                },
	                point: {
	                    radius: 4
	                }
	            }
	        };
	    };
	    LineGraphComponent.prototype.ngDoCheck = function () {
	        if ((this.key != '') && (!util_1.isUndefined(this.key)) && (!util_2.isNull(this.key)))
	            if ((this.key !== this.prevKey) || (this.endpointType !== this.prevEndpointType)) {
	                if (!util_1.isUndefined(this.chartService.graphData[this.endpointType][this.key]))
	                    this.prepareChartData();
	            }
	    };
	    //  This function kind of resets the chart when different network or application group is selected.
	    LineGraphComponent.prototype.prepareChartData = function () {
	        this.inspectActivated = false;
	        this.end = this.chartService.graphData[this.endpointType][this.key].length - 1;
	        this.scaleEnd = this.end;
	        this.start = this.end - 14;
	        this.lineChartOptions = {};
	        this.loadGraphData();
	        this.prevKey = this.key;
	        this.prevEndpointType = this.endpointType;
	    };
	    LineGraphComponent.prototype.slide = function (slideVal) {
	        if (slideVal < this.scaleEnd) {
	            this.inspectActivated = true;
	        }
	        if (slideVal == this.scaleEnd) {
	            this.inspectActivated = false;
	        }
	        this.end = slideVal;
	        this.start = slideVal - 14;
	        this.loadGraphData();
	    };
	    LineGraphComponent.prototype.ngOnDestroy = function () {
	        this.subscription.unsubscribe();
	    };
	    __decorate([
	        core_1.Input('key'), 
	        __metadata('design:type', String)
	    ], LineGraphComponent.prototype, "key", void 0);
	    __decorate([
	        core_1.Input('endpointType'), 
	        __metadata('design:type', (typeof (_a = typeof chartservice_1.EndpointType !== 'undefined' && chartservice_1.EndpointType) === 'function' && _a) || Object)
	    ], LineGraphComponent.prototype, "endpointType", void 0);
	    LineGraphComponent = __decorate([
	        core_1.Component({
	            selector: 'linegraph',
	            template: __webpack_require__(696),
	            styles: [__webpack_require__(1014)]
	        }), 
	        __metadata('design:paramtypes', [(typeof (_b = typeof chartservice_1.ChartService !== 'undefined' && chartservice_1.ChartService) === 'function' && _b) || Object])
	    ], LineGraphComponent);
	    return LineGraphComponent;
	    var _a, _b;
	}());
	exports.LineGraphComponent = LineGraphComponent;
	

/***/ },
/* 410 */
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
	var _ = __webpack_require__(28);
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
	            template: __webpack_require__(697)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvNamevalueComponent);
	    return CtvNamevalueComponent;
	    var _a;
	}());
	exports.CtvNamevalueComponent = CtvNamevalueComponent;
	

/***/ },
/* 411 */
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
	        this.updateAciDef = new core_1.EventEmitter();
	        this.cancel = new core_1.EventEmitter();
	        this.skip = new core_1.EventEmitter();
	        this.goback = new core_1.EventEmitter();
	    }
	    AciSettingComponent.prototype.updateAciSetting = function (formvalid) {
	        if (formvalid) {
	            this.updateAciDef.emit(this.setting);
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
	        core_1.Input('setting'), 
	        __metadata('design:type', Object)
	    ], AciSettingComponent.prototype, "setting", void 0);
	    __decorate([
	        core_1.Output('cancel'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], AciSettingComponent.prototype, "cancel", void 0);
	    __decorate([
	        core_1.Output('skip'), 
	        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
	    ], AciSettingComponent.prototype, "skip", void 0);
	    __decorate([
	        core_1.Output('goback'), 
	        __metadata('design:type', (typeof (_d = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _d) || Object)
	    ], AciSettingComponent.prototype, "goback", void 0);
	    AciSettingComponent = __decorate([
	        core_1.Component({
	            selector: 'acisettingcomp',
	            template: __webpack_require__(701)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AciSettingComponent);
	    return AciSettingComponent;
	    var _a, _b, _c, _d;
	}());
	exports.AciSettingComponent = AciSettingComponent;
	

/***/ },
/* 412 */
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
	 * Created by cshampur on 12/18/16.
	 */
	var core_1 = __webpack_require__(2);
	var apiservice_1 = __webpack_require__(27);
	var contivglobals_1 = __webpack_require__(11);
	var crudhelperservice_1 = __webpack_require__(7);
	var isEmpty = __webpack_require__(676);
	var LdapSettingsComponent = (function () {
	    function LdapSettingsComponent(apiService, crudHelperService) {
	        this.apiService = apiService;
	        this.crudHelperService = crudHelperService;
	        this.ldapConfig = { server: '', port: 0, base_dn: '', service_account_dn: '', service_account_password: '', StartTLS: false, InsecureSkipVerify: false };
	        this.ldapConfigExists = true;
	    }
	    LdapSettingsComponent.prototype.ngOnInit = function () {
	        this.getLdapConfig();
	    };
	    LdapSettingsComponent.prototype.getLdapConfig = function () {
	        var ldapComponent = this;
	        this.crudHelperService.startLoader(this);
	        this.apiService.get(contivglobals_1.ContivGlobals.LDAP_ENDPOINT)
	            .map(function (res) { return res.json(); })
	            .subscribe(function (result) {
	            if (!isEmpty(result))
	                ldapComponent.ldapConfig = result;
	            else
	                ldapComponent.ldapConfigExists = false;
	            ldapComponent.crudHelperService.stopLoader(ldapComponent);
	        }, function (error) {
	            ldapComponent.ldapConfigExists = false;
	            ldapComponent.crudHelperService.stopLoader(ldapComponent);
	        });
	    };
	    LdapSettingsComponent.prototype.updateLdapConfig = function (formValid) {
	        var ldapComponeent = this;
	        if (formValid) {
	            this.crudHelperService.startLoader(this);
	            this.update().subscribe(function (result) {
	                ldapComponeent.crudHelperService.stopLoader(ldapComponeent);
	                ldapComponeent.crudHelperService.showNotification("LDAP: Configuration Updated", ldapComponeent.ldapConfig.server);
	            }, function (error) {
	                ldapComponeent.crudHelperService.stopLoader(ldapComponeent);
	                ldapComponeent.crudHelperService.showServerError("LDAP: Update Failed", error);
	            });
	        }
	    };
	    LdapSettingsComponent.prototype.update = function () {
	        if (this.ldapConfigExists) {
	            return this.apiService.patch(contivglobals_1.ContivGlobals.LDAP_ENDPOINT, this.ldapConfig);
	        }
	        else {
	            return this.apiService.post(contivglobals_1.ContivGlobals.LDAP_ENDPOINT, this.ldapConfig);
	        }
	    };
	    LdapSettingsComponent = __decorate([
	        core_1.Component({
	            selector: 'ldapsettings',
	            template: __webpack_require__(702)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof apiservice_1.ApiService !== 'undefined' && apiservice_1.ApiService) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object])
	    ], LdapSettingsComponent);
	    return LdapSettingsComponent;
	    var _a, _b;
	}());
	exports.LdapSettingsComponent = LdapSettingsComponent;
	

/***/ },
/* 413 */
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
	var contivglobals_1 = __webpack_require__(11);
	var NetworkSettingComponent = (function () {
	    function NetworkSettingComponent() {
	        this.vlanPattern = contivglobals_1.ContivGlobals.VLAN_REGEX;
	        this.vxlanPattern = contivglobals_1.ContivGlobals.VXLAN_REGEX;
	        this.updateNetDef = new core_1.EventEmitter();
	        this.cancel = new core_1.EventEmitter();
	        this.skip = new core_1.EventEmitter();
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
	        core_1.Output('cancel'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], NetworkSettingComponent.prototype, "cancel", void 0);
	    __decorate([
	        core_1.Output('skip'), 
	        __metadata('design:type', (typeof (_c = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _c) || Object)
	    ], NetworkSettingComponent.prototype, "skip", void 0);
	    NetworkSettingComponent = __decorate([
	        core_1.Component({
	            selector: 'networksettingcomp',
	            template: __webpack_require__(703)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NetworkSettingComponent);
	    return NetworkSettingComponent;
	    var _a, _b, _c;
	}());
	exports.NetworkSettingComponent = NetworkSettingComponent;
	

/***/ },
/* 414 */
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
	var util_1 = __webpack_require__(19);
	var _ = __webpack_require__(28);
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
	        /*
	            This check is needed when you are having two tables on the same page and when you
	            are trying to switch table views using ng-if, like the toggle between Networks and
	            Application groups on the dashboard page.
	        */
	        if (this.sortObj.field.length == 0) {
	            this.sortObj = this.initializeSort(this.defaultSortColumn);
	        }
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
	            this.count = filtitems.length;
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
	            template: __webpack_require__(704)
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
	            template: __webpack_require__(705)
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
	            template: __webpack_require__(699)
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
	        core_1.Input('count'), 
	        __metadata('design:type', Number)
	    ], CtvSearchComponent.prototype, "count", void 0);
	    __decorate([
	        core_1.Output('searchTextChange'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], CtvSearchComponent.prototype, "searchTextChange", void 0);
	    CtvSearchComponent = __decorate([
	        core_1.Component({
	            selector: 'ctv-search',
	            template: __webpack_require__(700)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], CtvSearchComponent);
	    return CtvSearchComponent;
	    var _a;
	}());
	exports.CtvSearchComponent = CtvSearchComponent;
	

/***/ },
/* 415 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	__webpack_require__(149);
	var _ = __webpack_require__(28);
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
/* 416 */
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
/* 417 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var dashboardctrl_1 = __webpack_require__(171);
	var ng2_charts_1 = __webpack_require__(146);
	var directives_module_1 = __webpack_require__(37);
	var DashboardModule = (function () {
	    function DashboardModule() {
	    }
	    DashboardModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule,
	                ng2_charts_1.ChartsModule
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
/* 418 */
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
	 * Created by cshampur on 10/30/16.
	 */
	var core_1 = __webpack_require__(2);
	var firstrunwizardservice_1 = __webpack_require__(84);
	var FirstrunACISettingsComponent = (function () {
	    function FirstrunACISettingsComponent(wizardService) {
	        this.wizardService = wizardService;
	        this.setting = this.wizardService.aciSetting;
	        this.updatePage = new core_1.EventEmitter();
	        this.cancelPage = new core_1.EventEmitter();
	    }
	    FirstrunACISettingsComponent.prototype.ngOnInit = function () {
	        this.setting = this.wizardService.aciSetting;
	    };
	    FirstrunACISettingsComponent.prototype.updateAciSettings = function (setting) {
	        this.wizardService.aciSetting = setting;
	        this.updatePage.emit(2);
	    };
	    FirstrunACISettingsComponent.prototype.goBack = function () {
	        this.updatePage.emit(0);
	    };
	    FirstrunACISettingsComponent.prototype.skip = function () {
	        this.updatePage.emit(2);
	    };
	    FirstrunACISettingsComponent.prototype.cancel = function () {
	        this.cancelPage.emit();
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunACISettingsComponent.prototype, "updatePage", void 0);
	    __decorate([
	        core_1.Output('cancelPage'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], FirstrunACISettingsComponent.prototype, "cancelPage", void 0);
	    FirstrunACISettingsComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunacisettings',
	            template: __webpack_require__(707)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _c) || Object])
	    ], FirstrunACISettingsComponent);
	    return FirstrunACISettingsComponent;
	    var _a, _b, _c;
	}());
	exports.FirstrunACISettingsComponent = FirstrunACISettingsComponent;
	

/***/ },
/* 419 */
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
	var firstrunwizardservice_1 = __webpack_require__(84);
	var FirstrunNetworkDefaultComponent = (function () {
	    function FirstrunNetworkDefaultComponent(wizardService) {
	        this.wizardService = wizardService;
	        this.setting = this.wizardService.setting;
	        this.updatePage = new core_1.EventEmitter();
	        this.cancelPage = new core_1.EventEmitter();
	    }
	    FirstrunNetworkDefaultComponent.prototype.ngOnInit = function () {
	        this.setting = this.wizardService.setting;
	    };
	    FirstrunNetworkDefaultComponent.prototype.updateNetworkSettings = function (setting) {
	        this.wizardService.setting = setting;
	        this.updatePage.emit(1);
	    };
	    FirstrunNetworkDefaultComponent.prototype.cancel = function () {
	        this.cancelPage.emit();
	    };
	    FirstrunNetworkDefaultComponent.prototype.skip = function () {
	        this.updatePage.emit(1);
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunNetworkDefaultComponent.prototype, "updatePage", void 0);
	    __decorate([
	        core_1.Output('cancelPage'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], FirstrunNetworkDefaultComponent.prototype, "cancelPage", void 0);
	    FirstrunNetworkDefaultComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunnetworkdefault',
	            template: __webpack_require__(708)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _c) || Object])
	    ], FirstrunNetworkDefaultComponent);
	    return FirstrunNetworkDefaultComponent;
	    var _a, _b, _c;
	}());
	exports.FirstrunNetworkDefaultComponent = FirstrunNetworkDefaultComponent;
	

/***/ },
/* 420 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var directives_module_1 = __webpack_require__(37);
	var router_1 = __webpack_require__(5);
	var firstrunwizardservice_1 = __webpack_require__(84);
	var firstrunwizardctrl_1 = __webpack_require__(172);
	var firstrunnetworkdefaults_1 = __webpack_require__(419);
	var firstrunacisettings_1 = __webpack_require__(418);
	var firstrunwizardconfirmpage_1 = __webpack_require__(421);
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
	                firstrunnetworkdefaults_1.FirstrunNetworkDefaultComponent,
	                firstrunacisettings_1.FirstrunACISettingsComponent,
	                firstrunwizardconfirmpage_1.FirstrunConfirmComponent
	            ],
	            exports: [
	                firstrunwizardctrl_1.FirstrunWizardComponent,
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
/* 421 */
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
	var firstrunwizardservice_1 = __webpack_require__(84);
	var FirstrunConfirmComponent = (function () {
	    function FirstrunConfirmComponent(wizardservice, router, activatedRoute) {
	        this.router = router;
	        this.activatedRoute = activatedRoute;
	        this.wizardService = wizardservice;
	        this.updatePage = new core_1.EventEmitter();
	        this.cancelPage = new core_1.EventEmitter();
	        this.showLoader = false;
	    }
	    FirstrunConfirmComponent.prototype.ngOnInit = function () {
	    };
	    FirstrunConfirmComponent.prototype.process = function () {
	        var _this = this;
	        this.updatePage.emit(3);
	        // Will be calling the update settings funciton of wizard service,
	        // A loader will be shown un til all the updates are completed.
	        this.showLoader = true;
	        this.wizardService.updateSettings()
	            .then(function (result) {
	            _this.loadDashboard();
	        }, function (error) {
	            _this.loadDashboard();
	        });
	        this.loadDashboard();
	    };
	    FirstrunConfirmComponent.prototype.loadDashboard = function () {
	        this.showLoader = false;
	        jQuery(".ui.fullscreen.modal").modal('hide');
	        localStorage.setItem('firstRun', '');
	        this.router.navigate(['/m/dashboard']);
	    };
	    FirstrunConfirmComponent.prototype.goBack = function () {
	        this.updatePage.emit(1);
	    };
	    FirstrunConfirmComponent.prototype.cancel = function () {
	        this.cancelPage.emit();
	    };
	    __decorate([
	        core_1.Output('updatePage'), 
	        __metadata('design:type', (typeof (_a = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _a) || Object)
	    ], FirstrunConfirmComponent.prototype, "updatePage", void 0);
	    __decorate([
	        core_1.Output('cancelPage'), 
	        __metadata('design:type', (typeof (_b = typeof core_1.EventEmitter !== 'undefined' && core_1.EventEmitter) === 'function' && _b) || Object)
	    ], FirstrunConfirmComponent.prototype, "cancelPage", void 0);
	    FirstrunConfirmComponent = __decorate([
	        core_1.Component({
	            selector: 'firstrunwizardconfirmpage',
	            template: __webpack_require__(710)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_c = typeof firstrunwizardservice_1.FirstRunWizardService !== 'undefined' && firstrunwizardservice_1.FirstRunWizardService) === 'function' && _c) || Object, (typeof (_d = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _d) || Object, (typeof (_e = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _e) || Object])
	    ], FirstrunConfirmComponent);
	    return FirstrunConfirmComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.FirstrunConfirmComponent = FirstrunConfirmComponent;
	

/***/ },
/* 422 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var loginctrl_1 = __webpack_require__(173);
	var unauthorized_1 = __webpack_require__(175);
	var logoutctrl_1 = __webpack_require__(174);
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
/* 423 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var menuCtrl_1 = __webpack_require__(176);
	var directives_module_1 = __webpack_require__(37);
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
/* 424 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var netprofilesmodel_1 = __webpack_require__(80);
	var BandwidthListComponent = (function () {
	    function BandwidthListComponent(netprofilesModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.netprofilesModel = netprofilesModel;
	        this.ngZone = ngZone;
	        this.crudHelperService = crudHelperService;
	        this.bandwidthPolicyListCtrl = this;
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
	            template: __webpack_require__(717)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof netprofilesmodel_1.NetprofilesModel !== 'undefined' && netprofilesmodel_1.NetprofilesModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], BandwidthListComponent);
	    return BandwidthListComponent;
	    var _a, _b, _c;
	}());
	exports.BandwidthListComponent = BandwidthListComponent;
	

/***/ },
/* 425 */
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
	 * Created by vjain3 on 12/13/16.
	 */
	var core_1 = __webpack_require__(2);
	var contractgroupsmodel_1 = __webpack_require__(79);
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var ContractGroupListComponent = (function () {
	    function ContractGroupListComponent(contractGroupsModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.contractGroupsModel = contractGroupsModel;
	        this.crudHelperService = crudHelperService;
	        this.ngZone = ngZone;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            _this.getContractGroups(true);
	        });
	    }
	    ContractGroupListComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        this.getContractGroups(false);
	    };
	    ContractGroupListComponent.prototype.getContractGroups = function (reload) {
	        var component = this;
	        this.contractGroupsModel.get(reload)
	            .then(function (result) {
	            component.contractGroups = result;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function (error) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    ContractGroupListComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    ContractGroupListComponent = __decorate([
	        core_1.Component({
	            selector: 'contractgrouplist',
	            template: __webpack_require__(720)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof contractgroupsmodel_1.ContractGroupsModel !== 'undefined' && contractgroupsmodel_1.ContractGroupsModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], ContractGroupListComponent);
	    return ContractGroupListComponent;
	    var _a, _b, _c;
	}());
	exports.ContractGroupListComponent = ContractGroupListComponent;
	

/***/ },
/* 426 */
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
	var policiesmodel_1 = __webpack_require__(64);
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
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
	            template: __webpack_require__(723)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], IsolationListComponent);
	    return IsolationListComponent;
	    var _a, _b, _c;
	}());
	exports.IsolationListComponent = IsolationListComponent;
	

/***/ },
/* 427 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by cshampur on 12/12/16.
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var inspectservice_1 = __webpack_require__(83);
	var contivglobals_1 = __webpack_require__(11);
	var util_1 = __webpack_require__(19);
	var policiesmodel_1 = __webpack_require__(64);
	var IsolationPolicyStatComponent = (function () {
	    function IsolationPolicyStatComponent(policiesModel, crudHelperService, inspectSerrvice, ngZone) {
	        var _this = this;
	        this.ngZone = ngZone;
	        this.crudHelperService = crudHelperService;
	        this.policiesModel = policiesModel;
	        this.inspectSerrvice = inspectSerrvice;
	        this.statKey = '';
	        this.showLoader = true;
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            if (_this.statKey != '')
	                _this.getIsolationPolicyInspect(true);
	        });
	        this.isolationPolicyInspectStats = {
	            numEndpoints: '',
	        };
	        this.config = { policyName: '', tenantName: '' };
	        this.endpoints = [];
	        this.filteredendpoints = [];
	        this.containerDetails = {};
	        this.isolationPolicyStatsComp = this;
	    }
	    IsolationPolicyStatComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        if (this.statKey != '')
	            this.getIsolationPolicyInspect(false);
	    };
	    IsolationPolicyStatComponent.prototype.getIsolationPolicyInspect = function (reload) {
	        var isolationPolicyStatsComp = this;
	        this.policiesModel.getInspectByKey(this.statKey, contivglobals_1.ContivGlobals.POLICIES_INSPECT_ENDPOINT, reload)
	            .then(function (result) {
	            isolationPolicyStatsComp['isolationPolicyInspectStats'] = result['Oper'];
	            isolationPolicyStatsComp['config'] = result['Config'];
	            if (!util_1.isUndefined(result['Oper'].endpoints)) {
	                var containerDetails = isolationPolicyStatsComp.inspectSerrvice.buildEndPoints(result['Oper'].endpoints);
	                if (isolationPolicyStatsComp.inspectSerrvice.checkContainerChanged(isolationPolicyStatsComp['containerDetails'], containerDetails)) {
	                    isolationPolicyStatsComp['endpoints'] = result['Oper'].endpoints;
	                    isolationPolicyStatsComp['containerDetails'] = containerDetails;
	                }
	            }
	            else {
	                isolationPolicyStatsComp['endpoints'] = [];
	                isolationPolicyStatsComp['containerDetails'] = {};
	            }
	            isolationPolicyStatsComp.ngZone.run(function () {
	                isolationPolicyStatsComp.crudHelperService.stopLoader(isolationPolicyStatsComp);
	            });
	        }, function (error) {
	            isolationPolicyStatsComp.ngZone.run(function () {
	                isolationPolicyStatsComp.crudHelperService.stopLoader(isolationPolicyStatsComp);
	            });
	        });
	    };
	    IsolationPolicyStatComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    __decorate([
	        core_1.Input('statKey'), 
	        __metadata('design:type', String)
	    ], IsolationPolicyStatComponent.prototype, "statKey", void 0);
	    IsolationPolicyStatComponent = __decorate([
	        core_1.Component({
	            selector: 'isolationpolicystats',
	            template: __webpack_require__(724)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof policiesmodel_1.PoliciesModel !== 'undefined' && policiesmodel_1.PoliciesModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], IsolationPolicyStatComponent);
	    return IsolationPolicyStatComponent;
	    var _a, _b, _c, _d;
	}());
	exports.IsolationPolicyStatComponent = IsolationPolicyStatComponent;
	

/***/ },
/* 428 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var networkpoliciestabsctrl_1 = __webpack_require__(55);
	var isolationpolicycreatectrl_1 = __webpack_require__(181);
	var isolationpolicydetailsctrl_1 = __webpack_require__(182);
	var bandwidthpolicycreatectrl_1 = __webpack_require__(177);
	var bandwidthpolicydetailsctrl_1 = __webpack_require__(178);
	var isolationpolicylistctrl_1 = __webpack_require__(426);
	var bandwidthpolicylistctrl_1 = __webpack_require__(424);
	var isolationpolicystats_1 = __webpack_require__(427);
	var contractgrouplist_component_1 = __webpack_require__(425);
	var contractgroupcreate_component_1 = __webpack_require__(179);
	var contractgroupdetails_component_1 = __webpack_require__(180);
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
	                bandwidthpolicylistctrl_1.BandwidthListComponent,
	                isolationpolicystats_1.IsolationPolicyStatComponent,
	                contractgrouplist_component_1.ContractGroupListComponent,
	                contractgroupcreate_component_1.ContractGroupCreateComponent,
	                contractgroupdetails_component_1.ContractGroupDetailsComponent
	            ],
	            exports: [
	                networkpoliciestabsctrl_1.NetworkPoliciesTabsComponent,
	                isolationpolicycreatectrl_1.IsolationPolicyCreateComponent,
	                isolationpolicydetailsctrl_1.IsolationPolicyDetailsComponent,
	                bandwidthpolicycreatectrl_1.BandwidthPolicyCreateComponent,
	                bandwidthpolicydetailsctrl_1.BandwidthPolicyDetailsComponent,
	                isolationpolicylistctrl_1.IsolationListComponent,
	                bandwidthpolicylistctrl_1.BandwidthListComponent,
	                isolationpolicystats_1.IsolationPolicyStatComponent,
	                contractgrouplist_component_1.ContractGroupListComponent,
	                contractgroupcreate_component_1.ContractGroupCreateComponent,
	                contractgroupdetails_component_1.ContractGroupDetailsComponent,
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
/* 429 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var directives_module_1 = __webpack_require__(37);
	var networklistctrl_1 = __webpack_require__(185);
	var networkstatsctrl_1 = __webpack_require__(431);
	var networkdetailsctrl_1 = __webpack_require__(184);
	var networkinfoctrl_1 = __webpack_require__(430);
	var networkcreatectrl_1 = __webpack_require__(183);
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
/* 430 */
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
	            template: __webpack_require__(728)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], NetworkInfoComponent);
	    return NetworkInfoComponent;
	}());
	exports.NetworkInfoComponent = NetworkInfoComponent;
	

/***/ },
/* 431 */
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
	var crudhelperservice_1 = __webpack_require__(7);
	var rxjs_1 = __webpack_require__(17);
	var networksmodel_1 = __webpack_require__(48);
	var inspectservice_1 = __webpack_require__(83);
	var util_1 = __webpack_require__(19);
	var contivglobals_1 = __webpack_require__(11);
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
	            template: __webpack_require__(730)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof networksmodel_1.NetworksModel !== 'undefined' && networksmodel_1.NetworksModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof inspectservice_1.InspectService !== 'undefined' && inspectservice_1.InspectService) === 'function' && _c) || Object, (typeof (_d = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _d) || Object])
	    ], NetworkStatComponent);
	    return NetworkStatComponent;
	    var _a, _b, _c, _d;
	}());
	exports.NetworkStatComponent = NetworkStatComponent;
	

/***/ },
/* 432 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var directives_module_1 = __webpack_require__(37);
	var servicelblistctrl_1 = __webpack_require__(189);
	var servicelbstatsctrl_1 = __webpack_require__(190);
	var servicelbportsdirective_1 = __webpack_require__(433);
	var servicelbcreatectrl_1 = __webpack_require__(186);
	var servicelbinfoctrl_1 = __webpack_require__(188);
	var servicelbdetailsctrl_1 = __webpack_require__(187);
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
/* 433 */
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
	var _ = __webpack_require__(28);
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
	            template: __webpack_require__(735)
	        }), 
	        __metadata('design:paramtypes', [])
	    ], ServicelbPortsComponent);
	    return ServicelbPortsComponent;
	    var _a;
	}());
	exports.ServicelbPortsComponent = ServicelbPortsComponent;
	

/***/ },
/* 434 */
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
	 * Created by cshampur on 12/13/16.
	 */
	var core_1 = __webpack_require__(2);
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var authorizationlist_1 = __webpack_require__(193);
	var authorizationdetails_1 = __webpack_require__(192);
	var authorizationcreate_1 = __webpack_require__(191);
	var AuthorizationModule = (function () {
	    function AuthorizationModule() {
	    }
	    AuthorizationModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule,
	                directives_module_1.DirectivesModule
	            ],
	            declarations: [
	                authorizationlist_1.AuthorizationListComponent,
	                authorizationdetails_1.AuthorizationDetailsComponent,
	                authorizationcreate_1.AuthorizationCreateComponent
	            ],
	            exports: [
	                authorizationlist_1.AuthorizationListComponent,
	                authorizationdetails_1.AuthorizationDetailsComponent,
	                authorizationcreate_1.AuthorizationCreateComponent,
	                directives_module_1.DirectivesModule,
	                forms_1.FormsModule,
	                common_1.CommonModule,
	                router_1.RouterModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AuthorizationModule);
	    return AuthorizationModule;
	}());
	exports.AuthorizationModule = AuthorizationModule;
	

/***/ },
/* 435 */
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
	 * Created by vjain3 on 12/7/16.
	 */
	var core_1 = __webpack_require__(2);
	var router_1 = __webpack_require__(5);
	var crudhelperservice_1 = __webpack_require__(7);
	var bgpsmodel_1 = __webpack_require__(72);
	var NodeInfoComponent = (function () {
	    function NodeInfoComponent(activatedRoute, router, ngZone, bgpsModel, crudHelperService) {
	        this.activatedRoute = activatedRoute;
	        this.router = router;
	        this.ngZone = ngZone;
	        this.bgpsModel = bgpsModel;
	        this.crudHelperService = crudHelperService;
	        this.node = {};
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
	        setMode();
	    }
	    NodeInfoComponent.prototype.ngOnInit = function () {
	        var component = this;
	        component.crudHelperService.stopLoader(component);
	        component.bgpsModel.getModelByKey(component.activatedRoute.snapshot.params['key'], false, 'key')
	            .then(function successCallBack(node) {
	            component.node = node;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function (error) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    NodeInfoComponent.prototype.returnToNodeDetails = function () {
	        this.router.navigate(['../../details', this.node.key], { relativeTo: this.activatedRoute });
	    };
	    NodeInfoComponent.prototype.cancelEditing = function () {
	        this.returnToNodeDetails();
	    };
	    NodeInfoComponent.prototype.saveNode = function (formvalid) {
	        var component = this;
	        if (formvalid) {
	            component.crudHelperService.startLoader(component);
	            component.bgpsModel.save(component.node).then(function successCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showNotification("Node: Bgp config updated", result.key.toString());
	                component.returnToNodeDetails();
	            }, function errorCallback(result) {
	                component.ngZone.run(function () {
	                    component.crudHelperService.stopLoader(component);
	                });
	                component.crudHelperService.showServerError("Node: Bgp config update failed", result);
	                component.crudHelperService.showServerError(component, result);
	            });
	        }
	    };
	    __decorate([
	        core_1.Input('mode'), 
	        __metadata('design:type', String)
	    ], NodeInfoComponent.prototype, "mode", void 0);
	    NodeInfoComponent = __decorate([
	        core_1.Component({
	            selector: 'nodeinfo',
	            template: __webpack_require__(743)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof router_1.ActivatedRoute !== 'undefined' && router_1.ActivatedRoute) === 'function' && _a) || Object, (typeof (_b = typeof router_1.Router !== 'undefined' && router_1.Router) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object, (typeof (_d = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _d) || Object, (typeof (_e = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _e) || Object])
	    ], NodeInfoComponent);
	    return NodeInfoComponent;
	    var _a, _b, _c, _d, _e;
	}());
	exports.NodeInfoComponent = NodeInfoComponent;
	

/***/ },
/* 436 */
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
	 * Created by vjain3 on 12/7/16.
	 */
	var core_1 = __webpack_require__(2);
	var rxjs_1 = __webpack_require__(17);
	var contivglobals_1 = __webpack_require__(11);
	var bgpsmodel_1 = __webpack_require__(72);
	var crudhelperservice_1 = __webpack_require__(7);
	var NodeStatsComponent = (function () {
	    function NodeStatsComponent(bgpsModel, crudHelperService, ngZone) {
	        var _this = this;
	        this.bgpsModel = bgpsModel;
	        this.crudHelperService = crudHelperService;
	        this.ngZone = ngZone;
	        this.statkey = '';
	        this.inspect = {
	            Config: {
	                neighbor: ''
	            },
	            Oper: {
	                adminStatus: '',
	                neighborStatus: '',
	                numRoutes: ''
	            }
	        };
	        this.routes = [];
	        this.filteredroutes = [];
	        this.refresh = rxjs_1.Observable.interval(5000).subscribe(function () {
	            if (_this.statkey != '')
	                _this.getBgpInspect(true);
	        });
	    }
	    NodeStatsComponent.prototype.ngOnInit = function () {
	        this.crudHelperService.startLoader(this);
	        if (this.statkey != '')
	            this.getBgpInspect(false);
	    };
	    NodeStatsComponent.prototype.ngOnDestroy = function () {
	        this.refresh.unsubscribe();
	    };
	    NodeStatsComponent.prototype.getBgpInspect = function (reload) {
	        var component = this;
	        this.bgpsModel.getInspectByKey(this.statkey, contivglobals_1.ContivGlobals.BGPS_INSPECT_ENDPOINT, reload)
	            .then(function successCallback(result) {
	            component.inspect = result;
	            component.routes = result['Oper'].routes;
	            component.filteredroutes = result['Oper'].routes;
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        }, function errorCallback(result) {
	            component.ngZone.run(function () {
	                component.crudHelperService.stopLoader(component);
	            });
	        });
	    };
	    __decorate([
	        core_1.Input('statkey'), 
	        __metadata('design:type', String)
	    ], NodeStatsComponent.prototype, "statkey", void 0);
	    NodeStatsComponent = __decorate([
	        core_1.Component({
	            selector: 'nodestats',
	            template: __webpack_require__(745)
	        }), 
	        __metadata('design:paramtypes', [(typeof (_a = typeof bgpsmodel_1.BgpsModel !== 'undefined' && bgpsmodel_1.BgpsModel) === 'function' && _a) || Object, (typeof (_b = typeof crudhelperservice_1.CRUDHelperService !== 'undefined' && crudhelperservice_1.CRUDHelperService) === 'function' && _b) || Object, (typeof (_c = typeof core_1.NgZone !== 'undefined' && core_1.NgZone) === 'function' && _c) || Object])
	    ], NodeStatsComponent);
	    return NodeStatsComponent;
	    var _a, _b, _c;
	}());
	exports.NodeStatsComponent = NodeStatsComponent;
	

/***/ },
/* 437 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var networksettingctrl_1 = __webpack_require__(195);
	var settingsmenu_component_1 = __webpack_require__(199);
	var nodelist_component_1 = __webpack_require__(198);
	var nodecreate_component_1 = __webpack_require__(196);
	var nodedetails_component_1 = __webpack_require__(197);
	var nodeinfo_component_1 = __webpack_require__(435);
	var nodestats_component_1 = __webpack_require__(436);
	var ldapconfiguration_1 = __webpack_require__(194);
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
	                nodedetails_component_1.NodeDetailsComponent,
	                nodeinfo_component_1.NodeInfoComponent,
	                nodestats_component_1.NodeStatsComponent,
	                ldapconfiguration_1.LdapConfigComponent
	            ],
	            exports: [
	                settingsmenu_component_1.SettingsMenuComponent,
	                networksettingctrl_1.NetworkSettingsComponent,
	                nodelist_component_1.NodeListComponent,
	                nodecreate_component_1.NodeCreateComponent,
	                nodedetails_component_1.NodeDetailsComponent,
	                nodeinfo_component_1.NodeInfoComponent,
	                nodestats_component_1.NodeStatsComponent,
	                ldapconfiguration_1.LdapConfigComponent,
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
/* 438 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var organizationlistctrl_1 = __webpack_require__(202);
	var organizationcreatectrl_1 = __webpack_require__(200);
	var organizationdetailsctrl_1 = __webpack_require__(201);
	/**
	 * Created by cshampur on 10/18/16.
	 */
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
/* 439 */
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
	var forms_1 = __webpack_require__(26);
	var common_1 = __webpack_require__(20);
	var router_1 = __webpack_require__(5);
	var directives_module_1 = __webpack_require__(37);
	var userlist_component_1 = __webpack_require__(205);
	var usercreate_component_1 = __webpack_require__(203);
	var userdetails_component_1 = __webpack_require__(204);
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
/* 440 */,
/* 441 */,
/* 442 */,
/* 443 */,
/* 444 */,
/* 445 */,
/* 446 */,
/* 447 */,
/* 448 */,
/* 449 */,
/* 450 */,
/* 451 */,
/* 452 */,
/* 453 */,
/* 454 */,
/* 455 */,
/* 456 */,
/* 457 */,
/* 458 */,
/* 459 */,
/* 460 */,
/* 461 */,
/* 462 */,
/* 463 */,
/* 464 */,
/* 465 */,
/* 466 */,
/* 467 */,
/* 468 */,
/* 469 */,
/* 470 */,
/* 471 */,
/* 472 */,
/* 473 */,
/* 474 */,
/* 475 */,
/* 476 */,
/* 477 */,
/* 478 */,
/* 479 */,
/* 480 */,
/* 481 */,
/* 482 */,
/* 483 */,
/* 484 */,
/* 485 */,
/* 486 */,
/* 487 */,
/* 488 */,
/* 489 */,
/* 490 */,
/* 491 */,
/* 492 */,
/* 493 */,
/* 494 */,
/* 495 */,
/* 496 */,
/* 497 */,
/* 498 */,
/* 499 */,
/* 500 */,
/* 501 */,
/* 502 */,
/* 503 */,
/* 504 */,
/* 505 */,
/* 506 */,
/* 507 */,
/* 508 */,
/* 509 */,
/* 510 */,
/* 511 */,
/* 512 */,
/* 513 */,
/* 514 */,
/* 515 */,
/* 516 */,
/* 517 */,
/* 518 */,
/* 519 */,
/* 520 */,
/* 521 */,
/* 522 */,
/* 523 */,
/* 524 */,
/* 525 */,
/* 526 */,
/* 527 */,
/* 528 */,
/* 529 */,
/* 530 */,
/* 531 */,
/* 532 */,
/* 533 */,
/* 534 */,
/* 535 */,
/* 536 */,
/* 537 */,
/* 538 */,
/* 539 */,
/* 540 */,
/* 541 */,
/* 542 */,
/* 543 */,
/* 544 */,
/* 545 */,
/* 546 */,
/* 547 */,
/* 548 */,
/* 549 */,
/* 550 */,
/* 551 */,
/* 552 */,
/* 553 */,
/* 554 */,
/* 555 */,
/* 556 */,
/* 557 */,
/* 558 */,
/* 559 */,
/* 560 */,
/* 561 */,
/* 562 */,
/* 563 */,
/* 564 */,
/* 565 */,
/* 566 */,
/* 567 */,
/* 568 */,
/* 569 */,
/* 570 */,
/* 571 */,
/* 572 */,
/* 573 */,
/* 574 */,
/* 575 */,
/* 576 */,
/* 577 */,
/* 578 */,
/* 579 */,
/* 580 */,
/* 581 */,
/* 582 */,
/* 583 */,
/* 584 */,
/* 585 */,
/* 586 */,
/* 587 */,
/* 588 */,
/* 589 */,
/* 590 */,
/* 591 */,
/* 592 */,
/* 593 */,
/* 594 */,
/* 595 */,
/* 596 */,
/* 597 */,
/* 598 */,
/* 599 */,
/* 600 */,
/* 601 */,
/* 602 */,
/* 603 */,
/* 604 */,
/* 605 */,
/* 606 */,
/* 607 */,
/* 608 */,
/* 609 */,
/* 610 */,
/* 611 */,
/* 612 */,
/* 613 */,
/* 614 */,
/* 615 */,
/* 616 */,
/* 617 */,
/* 618 */,
/* 619 */,
/* 620 */,
/* 621 */,
/* 622 */,
/* 623 */,
/* 624 */,
/* 625 */,
/* 626 */,
/* 627 */,
/* 628 */,
/* 629 */,
/* 630 */,
/* 631 */,
/* 632 */,
/* 633 */,
/* 634 */,
/* 635 */,
/* 636 */,
/* 637 */,
/* 638 */,
/* 639 */,
/* 640 */,
/* 641 */,
/* 642 */,
/* 643 */,
/* 644 */,
/* 645 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(76)();
	// imports


	// module
	exports.push([module.id, "#slider{\n    width:92%;\n}\n\nspan{\n    font-family: CiscoSansRegular;\n    font-weight: bold;\n    padding-left: 5px;\n    padding-right: 5px;\n    padding-bottom: 8px;\n    font-size: 15px;\n}", ""]);

	// exports


/***/ },
/* 646 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(76)();
	// imports


	// module
	exports.push([module.id, "#notificationMessage{\n    z-index: 4000;\n    position: fixed;\n    display: block;\n    padding-top: 25px;\n    background: #5d5d5d;\n    padding-left: 0px;\n    padding-right: 40px;\n    opacity: 0.85;\n}\n\n#notificationMessage.ready, #notificationMessage.info{\n    padding-left: 30px;\n    padding-right: 50px;\n}\n\n#notificationMessage.minor{\n    padding-left: 0px;\n    padding-right: 40px;\n}\n\n#notificationText #header2, #notificationText p, #notificationText span{\n    color: white;\n    font-family: CiscoSansBold;\n    font-size:14px;\n}\n\n.close.icon{\n    color:white;\n    padding-right: 20px;\n}\n\np.ready, p.info{\n    width:400px\n}\n\np.minor{\n    width:650px;\n}\n\n#notifyIcon{\n    position: relative;\n    padding-top: 4px;\n    top:15%;\n    font-size: 3em;\n}\n\n.toast_confirm.icon{\n    color: #00c905;\n}\n\n.toast_warning.icon{\n    color: #F4B400;\n}\n\n.toast_info.icon{\n    color: #008FCE;\n}\n\n\n#backgroundIcon{\n    position: absolute;\n    border-radius: 50%;\n    width: 37px;\n    height: 37px;\n    z-index: -1;\n    display: block;\n    left: 3%;\n    top: -21%;\n    background-color: white;\n}\n", ""]);

	// exports


/***/ },
/* 647 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(76)();
	// imports


	// module
	exports.push([module.id, "tbody tr{\n    cursor: pointer;\n}\n\ntbody tr.notSelected:hover{\n    background-color: aliceblue;\n}\n\n.selected:hover{\n    background-color: #4D7198;\n    color: white;\n}\n\n.selected{\n    background-color: #4D7198;\n    color: white;\n}\n\n.notSelected{\n    background: none;\n}\n\n.graphTable{\n    width:80%;\n}", ""]);

	// exports


/***/ },
/* 648 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(76)();
	// imports


	// module
	exports.push([module.id, ".ui.grid{\n    margin-bottom: 30px;\n}\n\n.steps-container{\n    width: 100%;\n}\n\n.progressbar{\n    counter-reset: step;\n}\n\n.progressbar li{\n    list-style-type: none;\n    float: left;\n    width:33.33%;\n    position: relative;\n    text-align: center;\n}\n\n.progressbar li:before{\n    content: counter(step);\n    counter-increment: step;\n    width: 30px;\n    height: 30px;\n    line-height: 30px;\n    border: 1px solid #DDDDDD;\n    display: block;\n    text-align: center;\n    margin: 0 auto 10px auto;\n    border-radius: 50%;\n    background-color: lightgrey;\n}\n\n.progressbar li:after {\n    content: '';\n    position: absolute;\n    width: 100%;\n    height: 1px;\n    background-color: #DDDDDD;\n    top: 15px;\n    left: -50%;\n    z-index: -1;\n}\n\n.progressbar li:first-child:after {\n    content: none;\n}\n\n.progressbar li.active {\n    color: white;\n}\n\n.progressbar li.active:before {\n    border-color: dodgerblue;\n    background-color: dodgerblue;\n\n}\n\n.progressbar li.completed + li:after {\n    background-color: dodgerblue;\n}\n\n.progressbar li span {\n    color: dimgrey;\n\n}\n\n.progressbar li.completed:before {\n    content: '\\2714';\n    color: dodgerblue;\n    background-color: white;\n    border-color: dodgerblue;\n}\n", ""]);

	// exports


/***/ },
/* 649 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(76)();
	// imports


	// module
	exports.push([module.id, ".copyright {\n    max-width: 450px;\n}\n\n.login-seg {\n    margin-top: 600px;\n}", ""]);

	// exports


/***/ },
/* 650 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(76)();
	// imports


	// module
	exports.push([module.id, ".logout {\n    width:50%;\n    margin-top: 100px;\n}\n\n", ""]);

	// exports


/***/ },
/* 651 */,
/* 652 */,
/* 653 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(92),
	    root = __webpack_require__(61);

	/* Built-in method references that are verified to be native. */
	var DataView = getNative(root, 'DataView');

	module.exports = DataView;


/***/ },
/* 654 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(92),
	    root = __webpack_require__(61);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 655 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(92),
	    root = __webpack_require__(61);

	/* Built-in method references that are verified to be native. */
	var Promise = getNative(root, 'Promise');

	module.exports = Promise;


/***/ },
/* 656 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(92),
	    root = __webpack_require__(61);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 657 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(92),
	    root = __webpack_require__(61);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 658 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(112),
	    isObjectLike = __webpack_require__(145);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';

	/**
	 * The base implementation of `_.isArguments`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 */
	function baseIsArguments(value) {
	  return isObjectLike(value) && baseGetTag(value) == argsTag;
	}

	module.exports = baseIsArguments;


/***/ },
/* 659 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(245),
	    isMasked = __webpack_require__(667),
	    isObject = __webpack_require__(247),
	    toSource = __webpack_require__(244);

	/**
	 * Used to match `RegExp`
	 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
	 */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var funcProto = Function.prototype,
	    objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = funcProto.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * The base implementation of `_.isNative` without bad shim checks.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function,
	 *  else `false`.
	 */
	function baseIsNative(value) {
	  if (!isObject(value) || isMasked(value)) {
	    return false;
	  }
	  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
	  return pattern.test(toSource(value));
	}

	module.exports = baseIsNative;


/***/ },
/* 660 */
/***/ function(module, exports, __webpack_require__) {

	var baseGetTag = __webpack_require__(112),
	    isLength = __webpack_require__(246),
	    isObjectLike = __webpack_require__(145);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    dataViewTag = '[object DataView]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
	typedArrayTags[errorTag] = typedArrayTags[funcTag] =
	typedArrayTags[mapTag] = typedArrayTags[numberTag] =
	typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
	typedArrayTags[setTag] = typedArrayTags[stringTag] =
	typedArrayTags[weakMapTag] = false;

	/**
	 * The base implementation of `_.isTypedArray` without Node.js optimizations.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 */
	function baseIsTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
	}

	module.exports = baseIsTypedArray;


/***/ },
/* 661 */
/***/ function(module, exports, __webpack_require__) {

	var isPrototype = __webpack_require__(243),
	    nativeKeys = __webpack_require__(668);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  if (!isPrototype(object)) {
	    return nativeKeys(object);
	  }
	  var result = [];
	  for (var key in Object(object)) {
	    if (hasOwnProperty.call(object, key) && key != 'constructor') {
	      result.push(key);
	    }
	  }
	  return result;
	}

	module.exports = baseKeys;


/***/ },
/* 662 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.unary` without support for storing metadata.
	 *
	 * @private
	 * @param {Function} func The function to cap arguments for.
	 * @returns {Function} Returns the new capped function.
	 */
	function baseUnary(func) {
	  return function(value) {
	    return func(value);
	  };
	}

	module.exports = baseUnary;


/***/ },
/* 663 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(61);

	/** Used to detect overreaching core-js shims. */
	var coreJsData = root['__core-js_shared__'];

	module.exports = coreJsData;


/***/ },
/* 664 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(241);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/** Built-in value references. */
	var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

	/**
	 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the raw `toStringTag`.
	 */
	function getRawTag(value) {
	  var isOwn = hasOwnProperty.call(value, symToStringTag),
	      tag = value[symToStringTag];

	  try {
	    value[symToStringTag] = undefined;
	    var unmasked = true;
	  } catch (e) {}

	  var result = nativeObjectToString.call(value);
	  if (unmasked) {
	    if (isOwn) {
	      value[symToStringTag] = tag;
	    } else {
	      delete value[symToStringTag];
	    }
	  }
	  return result;
	}

	module.exports = getRawTag;


/***/ },
/* 665 */
/***/ function(module, exports, __webpack_require__) {

	var DataView = __webpack_require__(653),
	    Map = __webpack_require__(654),
	    Promise = __webpack_require__(655),
	    Set = __webpack_require__(656),
	    WeakMap = __webpack_require__(657),
	    baseGetTag = __webpack_require__(112),
	    toSource = __webpack_require__(244);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    promiseTag = '[object Promise]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	var dataViewTag = '[object DataView]';

	/** Used to detect maps, sets, and weakmaps. */
	var dataViewCtorString = toSource(DataView),
	    mapCtorString = toSource(Map),
	    promiseCtorString = toSource(Promise),
	    setCtorString = toSource(Set),
	    weakMapCtorString = toSource(WeakMap);

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	var getTag = baseGetTag;

	// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
	if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
	    (Map && getTag(new Map) != mapTag) ||
	    (Promise && getTag(Promise.resolve()) != promiseTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = baseGetTag(value),
	        Ctor = result == objectTag ? value.constructor : undefined,
	        ctorString = Ctor ? toSource(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case dataViewCtorString: return dataViewTag;
	        case mapCtorString: return mapTag;
	        case promiseCtorString: return promiseTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 666 */
/***/ function(module, exports) {

	/**
	 * Gets the value at `key` of `object`.
	 *
	 * @private
	 * @param {Object} [object] The object to query.
	 * @param {string} key The key of the property to get.
	 * @returns {*} Returns the property value.
	 */
	function getValue(object, key) {
	  return object == null ? undefined : object[key];
	}

	module.exports = getValue;


/***/ },
/* 667 */
/***/ function(module, exports, __webpack_require__) {

	var coreJsData = __webpack_require__(663);

	/** Used to detect methods masquerading as native. */
	var maskSrcKey = (function() {
	  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
	  return uid ? ('Symbol(src)_1.' + uid) : '';
	}());

	/**
	 * Checks if `func` has its source masked.
	 *
	 * @private
	 * @param {Function} func The function to check.
	 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
	 */
	function isMasked(func) {
	  return !!maskSrcKey && (maskSrcKey in func);
	}

	module.exports = isMasked;


/***/ },
/* 668 */
/***/ function(module, exports, __webpack_require__) {

	var overArg = __webpack_require__(671);

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = overArg(Object.keys, Object);

	module.exports = nativeKeys;


/***/ },
/* 669 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(242);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Detect free variable `process` from Node.js. */
	var freeProcess = moduleExports && freeGlobal.process;

	/** Used to access faster Node.js helpers. */
	var nodeUtil = (function() {
	  try {
	    return freeProcess && freeProcess.binding && freeProcess.binding('util');
	  } catch (e) {}
	}());

	module.exports = nodeUtil;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(121)(module)))

/***/ },
/* 670 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the
	 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var nativeObjectToString = objectProto.toString;

	/**
	 * Converts `value` to a string using `Object.prototype.toString`.
	 *
	 * @private
	 * @param {*} value The value to convert.
	 * @returns {string} Returns the converted string.
	 */
	function objectToString(value) {
	  return nativeObjectToString.call(value);
	}

	module.exports = objectToString;


/***/ },
/* 671 */
/***/ function(module, exports) {

	/**
	 * Creates a unary function that invokes `func` with its argument transformed.
	 *
	 * @private
	 * @param {Function} func The function to wrap.
	 * @param {Function} transform The argument transform.
	 * @returns {Function} Returns the new function.
	 */
	function overArg(func, transform) {
	  return function(arg) {
	    return func(transform(arg));
	  };
	}

	module.exports = overArg;


/***/ },
/* 672 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsArguments = __webpack_require__(658),
	    isObjectLike = __webpack_require__(145);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;

	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
	 *  else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
	  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
	    !propertyIsEnumerable.call(value, 'callee');
	};

	module.exports = isArguments;


/***/ },
/* 673 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;

	module.exports = isArray;


/***/ },
/* 674 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(245),
	    isLength = __webpack_require__(246);

	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null && isLength(value.length) && !isFunction(value);
	}

	module.exports = isArrayLike;


/***/ },
/* 675 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(61),
	    stubFalse = __webpack_require__(678);

	/** Detect free variable `exports`. */
	var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

	/** Detect free variable `module`. */
	var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

	/** Detect the popular CommonJS extension `module.exports`. */
	var moduleExports = freeModule && freeModule.exports === freeExports;

	/** Built-in value references. */
	var Buffer = moduleExports ? root.Buffer : undefined;

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

	/**
	 * Checks if `value` is a buffer.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.3.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
	 * @example
	 *
	 * _.isBuffer(new Buffer(2));
	 * // => true
	 *
	 * _.isBuffer(new Uint8Array(2));
	 * // => false
	 */
	var isBuffer = nativeIsBuffer || stubFalse;

	module.exports = isBuffer;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(121)(module)))

/***/ },
/* 676 */
/***/ function(module, exports, __webpack_require__) {

	var baseKeys = __webpack_require__(661),
	    getTag = __webpack_require__(665),
	    isArguments = __webpack_require__(672),
	    isArray = __webpack_require__(673),
	    isArrayLike = __webpack_require__(674),
	    isBuffer = __webpack_require__(675),
	    isPrototype = __webpack_require__(243),
	    isTypedArray = __webpack_require__(677);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    setTag = '[object Set]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if `value` is an empty object, collection, map, or set.
	 *
	 * Objects are considered empty if they have no own enumerable string keyed
	 * properties.
	 *
	 * Array-like values such as `arguments` objects, arrays, buffers, strings, or
	 * jQuery-like collections are considered empty if they have a `length` of `0`.
	 * Similarly, maps and sets are considered empty if they have a `size` of `0`.
	 *
	 * @static
	 * @memberOf _
	 * @since 0.1.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is empty, else `false`.
	 * @example
	 *
	 * _.isEmpty(null);
	 * // => true
	 *
	 * _.isEmpty(true);
	 * // => true
	 *
	 * _.isEmpty(1);
	 * // => true
	 *
	 * _.isEmpty([1, 2, 3]);
	 * // => false
	 *
	 * _.isEmpty({ 'a': 1 });
	 * // => false
	 */
	function isEmpty(value) {
	  if (value == null) {
	    return true;
	  }
	  if (isArrayLike(value) &&
	      (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
	        isBuffer(value) || isTypedArray(value) || isArguments(value))) {
	    return !value.length;
	  }
	  var tag = getTag(value);
	  if (tag == mapTag || tag == setTag) {
	    return !value.size;
	  }
	  if (isPrototype(value)) {
	    return !baseKeys(value).length;
	  }
	  for (var key in value) {
	    if (hasOwnProperty.call(value, key)) {
	      return false;
	    }
	  }
	  return true;
	}

	module.exports = isEmpty;


/***/ },
/* 677 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsTypedArray = __webpack_require__(660),
	    baseUnary = __webpack_require__(662),
	    nodeUtil = __webpack_require__(669);

	/* Node.js helper references. */
	var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @since 3.0.0
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

	module.exports = isTypedArray;


/***/ },
/* 678 */
/***/ function(module, exports) {

	/**
	 * This method returns `false`.
	 *
	 * @static
	 * @memberOf _
	 * @since 4.13.0
	 * @category Util
	 * @returns {boolean} Returns `false`.
	 * @example
	 *
	 * _.times(2, _.stubFalse);
	 * // => [false, false]
	 */
	function stubFalse() {
	  return false;
	}

	module.exports = stubFalse;


/***/ },
/* 679 */,
/* 680 */,
/* 681 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Application Group</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/applicationgroups/list\">\n                        Application Groups\n                    </a>\n                </span>\n                <span class=\"crumb current\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n                  (ngSubmit)=\"createApplicationGroup(formRef.valid)\"\n                  novalidate>\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n                <div class=\"ui basic segment\">\n\n                    <div class=\"ui six wide column field\">\n                        <div *ngIf=\"formRef.submitted\">\n                            <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"newApplicationGroupNameRef.errors?.required\">Please\n                                        enter application group name\n                                    </li>\n                                    <li *ngIf=\"newApplicationGroupTenantRef.errors?.required\">\n                                        Please select tenant\n                                    </li>\n                                    <li *ngIf=\"newApplicationGroupNetworkRef.errors?.required\"\n                                        [hidden]=\"!applicationGroup.tenantName.length\">Please\n                                        select network\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newApplicationGroupName\">Application group name</label>\n                                    <input #newApplicationGroupNameRef=\"ngModel\"\n                                           type=\"text\"\n                                           id=\"newApplicationGroupName\"\n                                           name=\"newApplicationGroupName\"\n                                           [(ngModel)]=\"applicationGroup.groupName\"\n                                           placeholder=\"Enter name\" required>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newApplicationGroupTenant\">Tenant</label>\n                                    <select id=\"newApplicationGroupTenant\" class=\"ui dropdown\"\n                                            name=\"newApplicationGroupTenant\"\n                                            ngModel\n                                            (change)=\"updateTenant($event.target.value, isolationPolicyRef, bandwidthPolicyRef, contractGroupRef)\"\n                                            required #newApplicationGroupTenantRef=\"ngModel\">\n                                        <option value=\"\">-- Select a tenant --</option>\n                                        <option *ngFor=\"let tenant of tenants\" [value]=\"tenant.tenantName\">{{tenant.tenantName}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\" [hidden]=\"!applicationGroup.tenantName.length\">\n                                    <label for=\"newApplicationGroupNetwork\">Network</label>\n                                    <select id=\"newApplicationGroupNetwork\"\n                                            class=\"ui dropdown\"\n                                            #newApplicationGroupNetworkRef=\"ngModel\"\n                                            name=\"newApplicationGroupNetwork\"\n                                            [(ngModel)]=\"applicationGroup.networkName\"\n                                            required>\n                                        <option *ngIf=\"networks.length\" value=\"\">-- Select a network --</option>\n                                        <option *ngIf=\"!networks.length\" value=\"\">-- The tenant has no networks --</option>\n                                        <option *ngFor=\"let network of networks\"\n                                                [ngValue]=\"network.networkName\">\n                                            {{network.networkName}}\n                                        </option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\" >\n                            <div class=\"left aligned sixteen wide column\">\n                                <ctv-collapsible title=\"Isolation Policies To Apply\" class=\"policySelection\">\n                                    <ctv-isolationpolicy mode=\"edit\" [applicationgroup]=\"applicationGroup\" #isolationPolicyRef></ctv-isolationpolicy>\n                                </ctv-collapsible>\n                            </div>\n                        </div>\n\n                        <div class=\"ui row\">\n                            <div class=\"left aligned sixteen wide column\">\n\n                                <ctv-collapsible title=\"Bandwidth Policy To Apply\" class=\"policySelection\">\n                                    <ctv-bandwidthpolicy mode=\"edit\" [applicationgroup]=\"applicationGroup\" #bandwidthPolicyRef></ctv-bandwidthpolicy>\n                                </ctv-collapsible>\n\n                            </div>\n                        </div>\n\n                        <div class=\"ui row\">\n                            <div class=\"left aligned sixteen wide column\">\n\n                                <ctv-collapsible title=\"External Contract Groups (ACI)\" class=\"policySelection\">\n                                    <ctv-contractgroup mode=\"edit\" [applicationgroup]=\"applicationGroup\" #contractGroupRef></ctv-contractgroup>\n                                </ctv-collapsible>\n\n                            </div>\n                        </div>\n\n                        <div class=\"ui row\">\n                            <div class=\"right aligned sixteen wide column\">\n\n                                <div class=\"buttonRow\">\n                                    <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                        Cancel\n                                    </button>\n                                    <button type=\"submit\" class=\"ui blue large button pimaryBtn\">\n                                        Create\n                                    </button>\n                                </div>\n\n                                <ctv-error *ngIf=\"showServerError\" header=\"Error creating application group\"\n                                           [error]=\"serverErrorMessage\">\n                                </ctv-error>\n\n                            </div>\n                        </div>\n\n                    </div>\n                </div>\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 682 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row\">\n        <div class=\"left aligned eight wide column pageHeader\" [ngSwitch]=\"mode\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{applicationGroup.groupName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{applicationGroup.groupName}}</div>\n        </div>\n\n        <div [ngSwitch]=\"mode\" class=\"right aligned eight wide column\">\n            <div id=\"delete-group-modal\" class=\"ui small modal\">\n                <div class=\"header\">Remove Application Group: {{applicationGroup.groupName}}\n                </div>\n                <div class=\"content\">\n                    <p>Are you sure you want to <strong>remove</strong> this application group?</p>\n                </div>\n                <div class=\"actions\">\n                    <div class=\"ui negative button\">No</div>\n                    <div class=\"ui positive button\" (click)=\"deleteApplicationGroup()\">\n                        Yes\n                    </div>\n                </div>\n            </div>\n            <button *ngSwitchCase=\"'details'\" type=\"button\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelDetails()\">\n                Close\n            </button>\n            <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelEditing()\">\n                Cancel\n            </button>\n            <button *ngSwitchCase=\"'details'\" class=\"ui blue large button secondaryBtn\"\n                    (click)=\"editApplicationGroup()\">\n                Edit\n            </button>\n            <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-group-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n        </div>\n\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/applicationgroups/list\">\n                        Application Groups\n                    </a>\n                </span>\n                <span class=\"crumb\">{{applicationGroup.groupName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row tabs\">\n        <div class=\"aligned left ui sixteen wide column\">\n            <div class=\"ui tabular menu\" *ngIf=\"mode=='details'\">\n                <a class=\"item\" [ngClass]=\"{active: infoselected}\" (click)=\"infoselected=true\">\n                    Details\n                </a>\n                <a class=\"item\" [ngClass]=\"{active: !infoselected}\" (click)=\"infoselected=false\">\n                    Stats\n                </a>\n            </div>\n            <div *ngIf=\"infoselected || mode == 'edit'\">\n\n                <applicationgroupinfo [applicationGroup]=\"applicationGroup\"\n                                      [mode]=\"mode\" [showLoader]=\"showLoader\"></applicationgroupinfo>\n\n                <div class=\"ui row\" [ngSwitch]=\"mode\" style=\"margin-top: 40px\">\n\n                    <div class=\"right aligned sixteen wide column\">\n                        <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                                (click)=\"cancelEditing()\">\n                            Cancel\n                        </button>\n                        <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui blue large button primaryBtn\"\n                                (click)=\"saveApplicationGroup()\">\n                            Save\n                        </button>\n                    </div>\n\n                    <ctv-error *ngIf=\"((showServerError) && (mode === 'edit'))\"\n                               header=\"Error saving application group\"\n                               [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                    <ctv-error *ngIf=\"((showServerError) && (mode === 'details'))\"\n                               header=\"Error deleting application group\"\n                               [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                </div>\n            </div>\n\n            <applicationgroupstats [statkey]=\"statskey\"\n                                   *ngIf=\"!infoselected && mode != 'edit'\"></applicationgroupstats>\n        </div>\n    </div>\n\n</div>\n"

/***/ },
/* 683 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui row \">\n    <div class=\"ui sixteen wide column\">\n        <div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n            <table>\n                <tbody>\n                <tr>\n                    <td class=\"ctv-header\"><strong>Name</strong></td>\n                    <td class=\"ctv-value\">{{applicationGroup.groupName}}</td>\n                </tr>\n                <tr>\n                    <td class=\"ctv-header\">Tenant</td>\n                    <td class=\"ctv-value\">{{applicationGroup.tenantName}}</td>\n                </tr>\n                <tr>\n                    <td class=\"ctv-header\"><strong>Network</strong></td>\n                    <td class=\"ctv-value\">{{applicationGroup.networkName}}</td>\n                </tr>\n                </tbody>\n            </table>\n\n        </div>\n    </div>\n</div>\n\n<div class=\"ui row \">\n    <div class=\"ui sixteen wide column\">\n        <ctv-collapsible title=\"Isolation Policies Applied\" class=\"policySelection\">\n            <ctv-isolationpolicy [mode]=\"mode\" [applicationgroup]=\"applicationGroup\"></ctv-isolationpolicy>\n        </ctv-collapsible>\n    </div>\n</div>\n\n<div class=\"ui row \">\n    <div class=\"ui sixteen wide column\">\n        <ctv-collapsible title=\"Bandwidth Policies Applied\" class=\"policySelection\">\n            <ctv-bandwidthpolicy [mode]=\"mode\" [applicationgroup]=\"applicationGroup\"></ctv-bandwidthpolicy>\n        </ctv-collapsible>\n    </div>\n</div>\n\n<div class=\"ui row \">\n    <div class=\"ui sixteen wide column\">\n         <ctv-collapsible title=\"External Contract Groups (ACI)\">\n            <ctv-contractgroup [mode]=\"mode\" [applicationgroup]=\"applicationGroup\"></ctv-contractgroup>\n        </ctv-collapsible>\n    </div>\n</div>\n"

/***/ },
/* 684 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Application Groups</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\">\n                <i class=\"add icon\"></i>\n                Create Application Group\n            </button>\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">Application Groups</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row searchRow\">\n        <div class=\"ui sixteen wide column\">\n            <ctv-search *ngIf=\"applicationGroupListCtrl['groups']\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n        </div>\n    </div>\n\n    <div class=\"ui row ctvTable\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"ui active inverted dimmer\" *ngIf=\"applicationGroupListCtrl.showLoader\">\n                <div class=\"ui loader\"></div>\n            </div>\n            <ctv-table #tableRef [defaultSortColumn]=\"'groupName'\"\n                       [items]=\"applicationGroupListCtrl['groups']\"\n                       (filtereditems)=\"applicationGroupListCtrl['filteredgroups']=$event;\"\n                       [size]=\"12\">\n                <thead>\n                    <tr>\n                        <th><ctv-th [sortfield]=\"'groupName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Tenant</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Network</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'policies'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Policies</ctv-th></th>\n                    </tr>\n                </thead>\n\n                <tbody *ngIf=\"applicationGroupListCtrl['groups']\">\n                    <tr *ngFor=\"let group of applicationGroupListCtrl['filteredgroups']\">\n                        <td><a [routerLink]=\"['../details', group.key]\">{{group.groupName}}</a></td>\n                    <td>{{group.tenantName}}</td>\n                    <td>{{group.networkName}}</td>\n                    <td>{{group.policies.join(\", \")}}</td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"!applicationGroupListCtrl['groups']\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"4\">No application groups found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">define one?</a></td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"applicationGroupListCtrl['groups'] && !tableRef.count\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"4\">No records matched your filter criteria.</td>\n                    </tr>\n                </tbody>\n\n                <tfoot>\n                    <tr class=\"pagination\">\n                        <td colspan=\"4\">\n                            <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                             (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                             (prevChunk)=\"tableRef.showPrevChunk()\"\n                                             (nextChunk)=\"tableRef.showNextChunk()\">\n                            </ctv-tpagination>\n                        </td>\n                    </tr>\n                </tfoot>\n            </ctv-table>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 685 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n    <table>\n        <tbody>\n        <tr>\n            <td class=\"ctv-header\">Name</td>\n            <td class=\"ctv-value\">{{config['groupName'] || 'not configured'}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Network Name</td>\n            <td class=\"ctv-value\">{{config['networkName'] || 'not configured'}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">External Packet Tag</td>\n            <td class=\"ctv-value\">{{applicationInspectStats.externalPktTag || 'not configured'}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Number of Endpoints</td>\n            <td class=\"ctv-value\">{{applicationInspectStats.numEndpoints || 'not configured'}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Packet Tag</td>\n            <td class=\"ctv-value\">{{applicationInspectStats.pktTag || 'not configured'}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <div class=\"ui section divider\"></div>\n    <ctv-collapsible title=\"End Points\">\n\n        <ctv-search *ngIf=\"endpoints.length\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [placeholder]=\"'filter string'\"></ctv-search>\n\n        <ctv-table #tableRef [defaultSortColumn]=\"'containerName'\"\n                   [items]=\"endpoints\"\n                   (filtereditems)=\"filteredendpoints=$event\"\n                   [size]=\"12\">\n            <thead>\n            <tr>\n                <div class=\"ui grid\" style=\"margin-top: 25px;margin-left: 25px;margin-bottom: 1px;\">\n                    <th class=\"five wide column\"><ctv-th [sortfield]=\"'containerName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Container Name </ctv-th></th>\n                    <th class=\"four wide column\" style=\"padding-left: 18px !important;\"><ctv-th [sortfield]=\"'ipAddress'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> IP Address </ctv-th></th>\n                    <th class=\"three wide column\" style=\"padding-left: 44px !important;\"><ctv-th [sortfield]=\"'homingHost'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Host </ctv-th></th>\n                </div>\n            </tr>\n            </thead>\n\n            <tbody *ngIf=\"endpoints.length\">\n            <tr *ngFor=\"let endpoint of filteredendpoints\">\n                <td colspan=\"3\">\n                    <ctv-accordion [items]=\"containerDetails[endpoint.containerID]\">\n                        <div class=\"ui grid\" style=\"margin-top: -33px; margin-left: 30px;\">\n                            <div class=\"five wide column\">{{endpoint.containerName.substr(1)}}</div>\n                            <div class=\"four wide column\">{{endpoint.ipAddress.join(' ')}}</div>\n                            <div class=\"four wide column\">{{endpoint.homingHost}}</div>\n                        </div>\n                    </ctv-accordion>\n                </td>\n                <td></td>\n            </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!endpoints.length\">\n            <tr class=\"noDataFound\">\n                <td colspan=\"3\">No endpoints found</td>\n            </tr>\n            </tbody>\n\n            <tbody *ngIf=\"endpoints.length && !filtereditems.count\">\n                <tr class=\"noDataFound\">\n                    <td colspan=\"3\">No records matched your filter criteria.</td>\n                </tr>\n            </tbody>\n\n            <tfoot>\n            <tr class=\"pagination\">\n                <td colspan=\"3\">\n                    <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                     (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                     (prevChunk)=\"tableRef.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef.showNextChunk()\">\n                    </ctv-tpagination>\n                </td>\n            </tr>\n            </tfoot>\n        </ctv-table>\n    </ctv-collapsible>\n</div>\n"

/***/ },
/* 686 */
/***/ function(module, exports) {

	module.exports = "<div *ngIf=\"mode=='edit'\" class=\"field policyOutput\">\n    <table class=\"ui very basic collapsing unstackable table noRowBorders\">\n        <tbody>\n        <tr class=\"noHover\">\n            <td>\n                <div class=\"ui left icon input\">\n                    <input name=\"netProfileSearchText\"\n                           type=\"text\"\n                           [(ngModel)]=\"netProfileSearchText\"\n                           placeholder=\"filter menu options\">\n                    <i class=\"search icon\"></i>\n                </div>\n            </td>\n            <td>\n                <select class=\"ui dropdown\"\n                        name=\"selectNetprofile\"\n                        [class.noDataFound]=\"!netProfiles.length\"\n                        [ngModel]=\"selectedNetprofile\"\n                        (ngModelChange)=\"updateApplicationgroup($event)\">\n                    <option *ngIf=\"netProfiles.length\" value=\"\">-- Select a bandwidth policy --</option>\n                    <option *ngIf=\"!netProfiles.length\" value=\"\">No policies defined</option>\n                    <option *ngFor=\"let policy of (netProfiles | filter:netProfileSearchText)\"\n                            [ngValue]=\"policy\">\n                        {{policy.profileName}}\n                    </option>\n                </select>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n</div>\n<h5 class=\"ui header\">Bandwidth Policy Details</h5>\n<table class=\"ui very basic unstackable table\">\n    <thead>\n    <tr>\n        <th>Profile Name</th>\n        <th>Tenant Name</th>\n        <th>Bandwidth</th>\n        <th>DSCP</th>\n    </tr>\n    </thead>\n\n    <tbody *ngIf=\"selectedNetprofile && selectedNetprofile.profileName\">\n    <tr>\n        <td>{{selectedNetprofile.profileName}}</td>\n        <td>{{selectedNetprofile.tenantName}}</td>\n        <td>{{selectedNetprofile.bandwidth}}</td>\n        <td>{{selectedNetprofile.DSCP}}</td>\n    </tr>\n    </tbody>\n\n    <tbody *ngIf=\"!selectedNetprofile || !selectedNetprofile.profileName\">\n    <tr class=\"noDataFound\">\n        <td colspan=\"4\">none selected</td>\n    </tr>\n    </tbody>\n\n</table>\n"

/***/ },
/* 687 */
/***/ function(module, exports) {

	module.exports = "<div [ngSwitch]=\"mode\" class=\"field\">\n    <table *ngSwitchCase=\"'edit'\" class=\"ui very basic collapsing unstackable table\">\n        <tbody>\n        <tr>\n            <td>\n                <div class=\"ui left icon input\">\n                    <input name=\"contractGroupSearchText\"\n                           type=\"text\"\n                           [(ngModel)]=\"contractGroupSearchText\"\n                           placeholder=\"Filter by external contract group name\">\n                    <i class=\"search icon\"></i>\n                </div>\n            </td>\n            <td>\n                <select #selectContractGroupRef\n                        name=\"selectContractGroups\"\n                        class=\"ui dropdown\"\n                        ngModel>\n                    <option value=\"\">-- Please select external contract group --</option>\n                    <option *ngFor=\"let contractGroup of (contractGroups | filter:contractGroupSearchText)\"\n                            [value]=\"contractGroup.contractsGroupName\">\n                        {{contractGroup.contractsGroupName}}\n                    </option>\n                </select>\n            </td>\n            <td>\n                <button type=\"button\" class=\"ui icon button\"\n                        (click)=\"addContractGroup(selectContractGroupRef.value)\">\n                    <i class=\"blue add icon\"></i>\n                </button>\n            </td>\n        </tr>\n        <tr *ngFor=\"let contractGroupName of applicationgroup.extContractsGrps\">\n            <td>{{contractGroupName}}</td>\n            <td></td>\n            <td>\n                <button type=\"button\" class=\"ui icon button\"\n                        (click)=\"removeContractGroup(contractGroupName)\">\n                    <i class=\"trash icon\"></i>\n                </button>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n\n    <table *ngSwitchCase=\"'details'\" class=\"ui very basic unstackable table\">\n        <tbody>\n        <tr *ngFor=\"let contractGroupName of applicationgroup.extContractsGrps\">\n            <td>{{contractGroupName}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <h5 class=\"ui header\">External contract groups</h5>\n    <table class=\"ui very basic unstackable table\" style=\"margin-top: 40px\">\n        <thead>\n        <tr>\n            <th>Name</th>\n            <th>Tenant</th>\n            <th>Type</th>\n            <th>Contracts</th>\n        </tr>\n        </thead>\n\n        <tbody>\n        <tr *ngFor=\"let contractGroup of selectedContractGroups\">\n            <td>{{contractGroup.contractsGroupName}}</td>\n            <td>{{contractGroup.tenantName}}</td>\n            <td>{{contractGroup.contractsType}}</td>\n            <td>{{contractGroup.contracts?.join(\", \")}}</td>\n        </tr>\n\n        </tbody>\n    </table>\n</div>"

/***/ },
/* 688 */
/***/ function(module, exports) {

	module.exports = "<div [ngSwitch]=\"mode\" class=\"field policyOutput\">\n    <table *ngSwitchCase=\"'edit'\" class=\"ui very basic collapsing unstackable table noRowBorders\">\n        <tbody>\n        <tr class=\"noHover\">\n            <td>\n                <div class=\"ui left icon input\">\n                    <input name=\"isolationPolicySearchText\"\n                           type=\"text\"\n                           [(ngModel)]=\"isolationPolicySearchText\"\n                           placeholder=\"filter menu options\">\n                    <i class=\"search icon\"></i>\n                </div>\n            </td>\n            <td>\n                <select #selectIsolationPolicyRef\n                        name=\"selectIsolationPolicies\"\n                        class=\"ui dropdown\"\n                        [class.noDataFound]=\"!isolationPolicies.length\"\n                        ngModel>\n                    <option *ngIf=\"isolationPolicies.length\" value=\"\">-- Select an isolation policy --</option>\n                    <option *ngIf=\"!isolationPolicies.length\" value=\"\">No policies defined</option>\n                    <option *ngFor=\"let policy of (isolationPolicies | filter:isolationPolicySearchText)\"\n                            [value]=\"policy.policyName\">\n                        {{policy.policyName}}\n                    </option>\n                </select>\n            </td>\n            <td>\n                <button type=\"button\" class=\"ui icon button iconBtn primaryIconBtn\"\n                        (click)=\"addIsolationPolicy(selectIsolationPolicyRef.value)\">\n                    <i class=\"add icon\"></i>\n                </button>\n            </td>\n        </tr>\n        <tr *ngFor=\"let policy of applicationgroup.policies\">\n            <td>Will apply: \"{{policy}}\"</td>\n            <td></td>\n            <td>\n                <button type=\"button\" class=\"ui icon button iconBtn secondaryIconBtn\"\n                        (click)=\"removeIsolationPolicy(policy)\">\n                    <i class=\"trash icon\"></i>\n                </button>\n            </td>\n        </tr>\n        <tr *ngIf=\"!applicationgroup.policies\" class=\"noDataFound\">\n            <td>select a policy or policies from the dropdown</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <table *ngSwitchCase=\"'details'\" class=\"ui very basic unstackable table\">\n        <tbody *ngIf=\"applicationgroup.policies\">\n        <tr *ngFor=\"let policy of applicationgroup.policies\">\n            <td>Applying: \"{{policy}}\"</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"!applicationgroup.policies\">\n        <tr class=\"noDataFound\">\n            <td>No policies were selected</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <h5 class=\"ui header\">All Applicable Incoming Rules</h5>\n    <table class=\"ui very basic unstackable table\">\n        <thead>\n        <tr>\n            <th>Policy Name</th>\n            <th>Priority</th>\n            <th>Action</th>\n            <th>From group</th>\n            <th>From network</th>\n            <th>From IP address</th>\n            <th>Protocol</th>\n            <th>Port</th>\n        </tr>\n        </thead>\n\n        <tbody *ngIf=\"incomingRules.length>0\">\n        <tr *ngFor=\"let rule of incomingRules\">\n            <td>{{rule.policyName}}</td>\n            <td>{{rule.priority}}</td>\n            <td>{{rule.action}}</td>\n            <td>{{rule.fromEndpointGroup}}</td>\n            <td>{{rule.fromNetwork}}</td>\n            <td>{{rule.fromIPAddress}}</td>\n            <td>{{rule.protocol}}</td>\n            <td>{{rule.port}}</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"incomingRules.length==0\">\n        <tr class=\"noDataFound\">\n            <td colspan=\"8\">None applied</td>\n        </tr>\n        </tbody>\n\n    </table>\n\n    <h5 class=\"ui header\" style=\"margin-top: 40px\">All Applicable Outgoing Rules</h5>\n    <table class=\"ui very basic unstackable table\" >\n        <thead>\n        <tr>\n            <th>Policy Name</th>\n            <th>Priority</th>\n            <th>Action</th>\n            <th>To group</th>\n            <th>To network</th>\n            <th>To IP address</th>\n            <th>Protocol</th>\n            <th>Port</th>\n        </tr>\n        </thead>\n\n        <tbody *ngIf=\"outgoingRules.length>0\">\n        <tr *ngFor=\"let rule of outgoingRules\">\n            <td>{{rule.policyName}}</td>\n            <td>{{rule.priority}}</td>\n            <td>{{rule.action}}</td>\n            <td>{{rule.toEndpointGroup}}</td>\n            <td>{{rule.toNetwork}}</td>\n            <td>{{rule.toIPAddress}}</td>\n            <td>{{rule.protocol}}</td>\n            <td>{{rule.port}}</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"outgoingRules.length==0\">\n        <tr class=\"noDataFound\">\n            <td colspan=\"8\">None applied</td>\n        </tr>\n        </tbody>\n\n    </table>\n</div>\n"

/***/ },
/* 689 */
/***/ function(module, exports) {

	module.exports = "<div [ngSwitch]=\"mode\" class=\"field\" style=\"margin-top: 20px;\">\n\n    <div *ngSwitchCase=\"'details'\" class=\"description\">Application groups associated with this profile.</div>\n    <div *ngSwitchCase=\"'edit'\" class=\"description\">Add application groups to associate with this profile.</div>\n\n    <table *ngSwitchCase=\"'edit'\" class=\"ui very basic collapsing unstackable table noRowBorders\" style=\"margin-top:0; \">\n        <tbody>\n        <tr class=\"noHover\">\n            <td>\n                <div class=\"ui left icon input\">\n                    <input name=\"applicationGroupSearchText\"\n                           type=\"text\"\n                           [(ngModel)]=\"applicationGroupSearchText\"\n                           placeholder=\"filter menu options\"\n                           size=\"30\">\n                    <i class=\"search icon\"></i>\n                </div>\n            </td>\n            <td>\n                <select #selectApplicationGroupRef\n                        name=\"selectApplicationGroups\"\n                        class=\"ui dropdown\"\n                        ngModel>\n                    <option value=\"\">-- Select an application group --</option>\n                    <option *ngFor=\"let group of (applicationGroups | filter:applicationGroupSearchText)\"\n                            [value]=\"group.groupName\">\n                        {{group.groupName}}\n                    </option>\n                </select>\n            </td>\n            <td>\n                <button type=\"button\" class=\"ui icon button iconBtn primaryIconBtn\"\n                        (click)=\"addApplicationGroup(selectApplicationGroupRef.value)\">\n                    <i class=\"add icon\"></i>\n                </button>\n            </td>\n        </tr>\n        </tbody>\n    </table>\n\n    <ctv-table #tableRef\n               [defaultSortColumn]=\"'groupName'\"\n               [items]=\"selectedApplicationGroups\"\n               (filtereditems)=\"filteredSelectedApplicationGroups=$event\"\n               [size]=\"5\">\n        <thead>\n        <tr>\n            <th>\n                <ctv-th [sortfield]=\"'groupName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\"> Application group name\n                </ctv-th>\n            </th>\n            <th>\n                <ctv-th [sortfield]=\"'policies'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\"> Policies\n                </ctv-th>\n            </th>\n            <th class=\"right floated three wide column\">&nbsp;</th>\n        </tr>\n        </thead>\n\n        <tbody *ngIf=\"selectedApplicationGroups\">\n        <tr *ngFor=\"let group of filteredSelectedApplicationGroups\">\n            <td>\n                <a [routerLink]=\"['/m/applicationgroups/details', group.key]\">{{group.groupName}}</a>\n            </td>\n            <td>{{group.policies.join(\", \")}}</td>\n            <td style=\"text-align: right;\">\n                <button *ngSwitchCase=\"'edit'\"\n                        type=\"button\"\n                        class=\"ui icon button iconBtn secondaryIconBtn\"\n                        (click)=\"removeApplicationGroup(group.groupName)\">\n                    <i class=\"trash icon\"></i>\n                </button>\n            </td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"selectedApplicationGroups.length==0\">\n        <tr class=\"noDataFound\">\n            <td colspan=\"3\">\n                No application groups have been added to this profile.\n            </td>\n        </tr>\n        </tbody>\n\n        <tfoot>\n        <tr class=\"pagination\">\n            <td colspan=\"3\">\n                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                </ctv-tpagination>\n            </td>\n        </tr>\n        </tfoot>\n    </ctv-table>\n\n</div>\n"

/***/ },
/* 690 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create ACI Application Profile</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/appprofiles\">\n                        ACI Application Profiles\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n            <form class=\"ui form\" role=\"form\"\n                  (submit)=\"createAppProfile(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n                    <div class=\"ui grid\">\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column field\">\n                                <div *ngIf=\"formRef.submitted\">\n                                    <div [hidden]=\"formRef.valid\" class=\"ui negative message\">\n                                        <ul class=\"list\">\n                                            <li *ngIf=\"newAppProfileName.errors?.required\">Please enter\n                                                application profile name\n                                            </li>\n                                            <li *ngIf=\"newAppProfileTenantRef.errors?.required\">\n                                                Please select tenant\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newAppProfileName\">Application profile name</label>\n                                    <input type=\"text\" id=\"newAppProfileName\" name=\"newAppProfileName\"\n                                           [(ngModel)]=\"newAppProfile.appProfileName\"\n                                           placeholder=\"Enter name\" required #newAppProfileName=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newAppProfileTenant\">Tenant</label>\n                                    <select id=\"newAppProfileTenant\" class=\"ui dropdown\"\n                                            name=\"newAppProfileTenant\"\n                                            ngModel\n                                            (change)=\"updateTenant($event.target.value, appGroupSelRef)\"\n                                            required #newAppProfileTenantRef=\"ngModel\">\n                                        <option value=\"\">-- Select a tenant --</option>\n                                        <option *ngFor=\"let tenant of tenants\" [value]=\"tenant.tenantName\">\n                                            {{tenant.tenantName}}\n                                        </option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <ctv-appgroupselection mode=\"edit\" [appProfile]=\"newAppProfile\"\n                                           #appGroupSelRef></ctv-appgroupselection>\n\n                    <div class=\"ui grid\">\n                        <div class=\"right aligned sixteen wide column buttonRow\">\n\n                            <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                Cancel\n                            </button>\n                            <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                Create Profile\n                            </button>\n\n                        </div>\n                    </div>\n\n                    <ctv-error *ngIf=\"showServerError\" header=\"Error creating application profile\"\n                               [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                </div>\n            </form>\n        </div>\n    </div>\n\n</div>\n"

/***/ },
/* 691 */
/***/ function(module, exports) {

	module.exports = "<div [ngSwitch]=\"mode\" class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{appProfile.appProfileName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{appProfile.appProfileName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div id=\"delete-appProfile-modal\" class=\"ui small modal\">\n                <div class=\"header\">Remove Application Profile: {{appProfile.appProfileName}}\n                </div>\n                <div class=\"content\">\n                    <p>Are you sure you want to remove this application profile?</p>\n                </div>\n                <div class=\"actions\">\n                    <div class=\"ui negative button\">Cancel</div>\n                    <div class=\"ui positive button\" (click)=\"deleteAppProfile()\">\n                        Remove\n                    </div>\n                </div>\n            </div>\n\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button cancelBtn\"\n                    (click)=\"returnToAppProfile()\">\n                Close\n            </button>\n            <button *ngSwitchCase=\"'edit'\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelEditing()\">\n                Cancel\n            </button>\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button secondaryBtn\"\n                    (click)=\"editAppProfile()\">\n                Edit\n            </button>\n            <button class=\"ui large button secondaryBtn\" onclick=\"$('#delete-appProfile-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/appprofiles\">\n                        ACI Application Profiles\n                    </a>\n                </span>\n                <span class=\"crumb\">{{appProfile.appProfileName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\" style=\"margin-top: 30px\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui basic segment ctvTable\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <table>\n                    <tbody>\n                    <tr>\n                        <td class=\"ctv-header\">Application Profile Name</td>\n                        <td class=\"ctv-value\">{{appProfile.appProfileName}}</td>\n                    </tr>\n                    <tr>\n                        <td class=\"ctv-header\">Tenant</td>\n                        <td class=\"ctv-value\">{{appProfile.tenantName}}</td>\n                    </tr>\n                    </tbody>\n                </table>\n\n                <h4 class=\"ui header\" style=\"margin-top: 40px\">Application Groups</h4>\n\n                <div [ngSwitch]=\"mode\">\n                    <form class=\"ui form\"\n                          role=\"form\"\n                          (submit)=\"saveAppProfile(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                        <ctv-appgroupselection [mode]=\"mode\" [appProfile]=\"appProfile\"></ctv-appgroupselection>\n\n                        <div class=\"ui grid\" style=\"margin-top: 40px\">\n                            <div class=\"right aligned sixteen wide column\">\n                                <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                                        (click)=\"cancelEditing()\">\n                                    Cancel\n                                </button>\n                                <button *ngSwitchCase=\"'edit'\" type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Save\n                                </button>\n                            </div>\n                        </div>\n\n                    </form>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 692 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">ACI Application Profiles</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\">\n                <i class=\"add icon\"></i>\n                Create ACI Application Profile\n            </button>\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">ACI Application Profiles</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row searchRow\">\n        <div class=\"ui sixteen wide column\">\n            <ctv-search  *ngIf=\"appProfiles\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n        </div>\n    </div>\n\n    <div class=\"ui row ctvTable\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                <div class=\"ui loader\"></div>\n            </div>\n            <ctv-table #tableRef [defaultSortColumn]=\"'appProfileName'\"\n                       [items]=\"appProfiles\"\n                       (filtereditems)=\"filteredAppProfiles=$event\"\n                       [size]=\"12\">\n                <thead>\n                    <tr>\n                        <th><ctv-th [sortfield]=\"'appProfileName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Tenant</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'endpointGroups'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Application groups</ctv-th></th>\n                    </tr>\n                </thead>\n\n                <tbody *ngIf=\"appProfiles\">\n                    <tr *ngFor=\"let appProfile of filteredAppProfiles\">\n                        <td><a [routerLink]=\"['../details', appProfile.key]\">{{appProfile.appProfileName}}</a></td>\n                        <td>{{appProfile.tenantName}}</td>\n                        <td>{{appProfile.endpointGroups?.join(\", \")}}</td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"!appProfiles\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"2\">No application profiles found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"appProfiles && !filteredAppProfiles.length\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"2\">No records matched your filter criteria.</td>\n                    </tr>\n                </tbody>\n\n                <tfoot>\n                    <tr class=\"pagination\">\n                        <td colspan=\"2\">\n                            <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                             (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                             (prevChunk)=\"tableRef.showPrevChunk()\"\n                                             (nextChunk)=\"tableRef.showNextChunk()\">\n                            </ctv-tpagination>\n                        </td>\n                    </tr>\n                </tfoot>\n            </ctv-table>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 693 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui accordion\">\n    <div class=\"title\">\n        <i class=\"dropdown icon\"></i>\n        <ng-content></ng-content>\n    </div>\n    <div class=\"content\">\n        <table class=\"ui very basic table\" style=\"margin-left:20px\">\n            <tbody style=\"border-style: hidden\">\n            <tr *ngFor=\"let item of items\">\n                <td class=\"ctv-header three column wide key\">{{item.name}}</td>\n                <td *ngIf=\"item.format=='label'\" class=\"twelve column wide value\">\n                    <div class = \"ui label tiny\" *ngFor=\"let selector of item.value\" style=\"margin-top: 2px;\">{{selector}}</div>\n                </td>\n                <td *ngIf=\"item.format!='label'\" class=\"twelve column wide value\">{{item.value}}</td>\n            </tr>\n            </tbody>\n        </table>\n    </div>\n</div>\n"

/***/ },
/* 694 */
/***/ function(module, exports) {

	module.exports = "<div (click)=\"collapsed = !collapsed\" class=\"ctv-collapsible-label\">\n    <h4 class=\"ui header\">\n        <i *ngIf=\"!collapsed\" class=\"grey minus circle outline icon\"></i>\n        <i *ngIf=\"collapsed\" class=\"grey plus circle outline icon\"></i>\n        {{title}}\n    </h4>\n</div>\n\n\n<div class=\"ctv-collapsible-content\" [hidden]=\"collapsed\">\n    <ng-content></ng-content>\n</div>"

/***/ },
/* 695 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui negative floating message\" style=\"margin-top: 20px\" *ngIf=\"showError\">\n    <i class=\"close icon\" (click)=\"close()\"></i>\n    <div class=\"header\">{{header}}</div>\n    <p>{{error}}</p>\n</div>"

/***/ },
/* 696 */
/***/ function(module, exports) {

	module.exports = "<div style=\"display: block;\">\n    <canvas id=\"canvas1\"\n            baseChart width=\"900\" height=\"300\"\n            [datasets]=\"lineChartData\"\n            [labels]=\"lineChartLabels\"\n            [options]=\"lineChartOptions\"\n            [colors]=\"lineChartColors\"\n            [legend]=\"lineChartLegend\"\n            [chartType]=\"lineChartType\">\n    </canvas>\n</div>\n<div class=\"ui grid\">\n    <div class=\"ui one column centered row\">\n        <div class=\"ui center aligned twelve wide column\">\n            <h5>Time Series</h5>\n        </div>\n    </div>\n    <div class=\"ui one column centered row\">\n        <div class=\"ui center aligned twelve wide column\">\n            <span>0</span>\n            <input type=\"range\" #slider [min]=\"'14'\" [max]=\"scaleEnd\" id=\"slider\"  [value]=\"end\" (change)=\"slide(slider.value)\">\n            <span>{{scaleEnd}}</span>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 697 */
/***/ function(module, exports) {

	module.exports = "<table class=\"ui very basic unstackable table\" style=\"margin-top: 10px\">\n    <thead>\n    <th>{{nameheader}}</th>\n    <th>{{valueheader}}</th>\n    <th>&nbsp;</th>\n    </thead>\n\n    <tbody>\n    <tr class=\"noHover\">\n        <td class=\"ui four wide\">\n            <div class=\"input\">\n                <input *ngIf=\"type=='text'\" type=\"text\" [(ngModel)]=\"newItem.name\">\n                <select class=\"ui dropdown\" *ngIf=\"type=='select'\" [(ngModel)]=\"newItem.name\">\n                    <option *ngFor=\"let option of options\" [value]=\"option\">{{option}}</option>\n                </select>\n            </div>\n        </td>\n        <td class=\"ui four wide\">\n            <div class=\"input\">\n                <input type=\"text\" [(ngModel)]=\"newItem.value\">\n            </div>\n        </td>\n        <td>\n            <button type=\"button\" class=\"ui icon button iconBtn primaryIconBtn\" (click)=\"add()\">\n                <i class=\"add icon\"></i>\n            </button>\n        </td>\n    </tr>\n    </tbody>\n\n    <tbody *ngIf=\"items.length\">\n    <tr *ngFor=\"let item of items\">\n        <td class=\"key\">{{item.name}}</td>\n        <td class=\"value\">{{item.value}}</td>\n        <td>\n            <button type=\"button\" class=\"ui icon button iconBtn secondaryIconBtn\" (click)=\"remove(item);\">\n                <i class=\"trash icon\"></i>\n            </button>\n        </td>\n    </tr>\n    </tbody>\n\n    <tbody  *ngIf=\"!items.length\">\n    <tr class=\"noDataFound\"><td colspan=\"3\">No labels have been defined.</td></tr>\n    </tbody>\n\n</table>\n"

/***/ },
/* 698 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui small message notify\" id=\"notificationMessage\"\n     [ngClass]=\"{   ready: notificationType==NotificationType.confirm,\n                    minor: notificationType==NotificationType.alert,\n                    info: notificationType==NotificationType.info}\">\n    <i class=\"close icon\" (click)=\"close()\"></i>\n    <div class=\"ui grid\">\n        <div class=\"ui right aligned two wide column\">\n            <i id=\"notifyIcon\" class=\"icon inverted\" [ngClass]=\"{toast_confirm: notificationType==NotificationType.confirm,\n                                                        toast_warning: notificationType==NotificationType.alert,\n                                                        toast_info: notificationType==NotificationType.info}\">\n                <span id=\"backgroundIcon\"></span>\n            </i>\n        </div>\n        <div class=\"ui left aligned fourteen wide column\" id=\"notificationText\">\n            <div class=\"header\" id=\"header2\">\n                <span *ngIf=\"notificationType==NotificationType.confirm\">Confirmation: </span>\n                <span *ngIf=\"notificationType==NotificationType.info\">Information: </span>\n                <span *ngIf=\"notificationType==NotificationType.alert\">Alert: </span>\n                {{message}}\n            </div>\n            <p [ngClass]=\"{ ready: notificationType==NotificationType.confirm,\n                            minor: notificationType==NotificationType.alert,\n                            info: notificationType==NotificationType.info}\">{{item}}</p>\n            <span *ngIf=\"notificationType==NotificationType.info\">Will notify when operation is complete</span>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 699 */
/***/ function(module, exports) {

	module.exports = "<div *ngIf=\"chunks.length > 1\">\n    <div class=\"ui right floated pagination borderless menu\" style=\"margin-top: 10px\">\n        <a class=\"icon item\" (click)=\"showPrevChunk()\">\n            <i class=\"chevron left icon\"></i>\n        </a>\n        <a *ngFor=\"let chunk of chunks\" class=\"item\"\n           [ngClass]=\"{'active': chunk.selected}\" (click)=\"showClickedPage(chunk.pageNo)\">{{chunk.pageNo + 1}}\n        </a>\n        <a class=\"icon item\" (click)=\"showNextChunk()\">\n            <i class=\"chevron right icon\"></i>\n        </a>\n    </div>\n</div>"

/***/ },
/* 700 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui left icon input searchField\">\n    <input type=\"text\" [ngModel]=\"searchText\" (ngModelChange)=\"showChunk($event)\"\n           size='{{size}}' [placeholder]=\" 'filter string' \" class=\"ctvSearch\">\n    <i class=\"search icon\"></i>\n</div>\n"

/***/ },
/* 701 */
/***/ function(module, exports) {

	module.exports = "<form class=\"ui form\" role=\"form\" #aciForm=\"ngForm\" name=\"aciForm\" (submit)=\"updateAciSetting(aciForm.valid)\"\n      novalidate>\n    <div class=\"ui grid\">\n        <div class=\"ui row\">\n            <div class=\"ui six wide column\">\n                <div class=\"field\">\n                    <label for=\"apicPhysicalDomain\">Physical domain</label>\n                    <input type=\"text\" id=\"apicPhysicalDomain\" name=\"apicPhysicalDomain\"\n                           [(ngModel)]=\"setting.physicalDomain\"\n                           placeholder=\"Enter physical domain name\" required #apicPhysicalDomain=\"ngModel\">\n                </div>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column\">\n                <div class=\"field\">\n                    <label for=\"apicLeafNodes\">Node bindings</label>\n                    <input type=\"text\" id=\"apicLeafNodes\" name=\"apicLeafNodes\"\n                           [(ngModel)]=\"setting.nodeBindings\"\n                           placeholder=\"Enter comma separated nodes of the form topology/pod-1/node-101\">\n                </div>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column\">\n                <div class=\"field\">\n                    <label for=\"apicPathBindings\">Path bindings</label>\n                    <input type=\"text\" id=\"apicPathBindings\" name=\"apicPathBindings\"\n                           [(ngModel)]=\"setting.pathBindings\"\n                           placeholder=\"Enter comma separated paths of the form topology/pod-1/paths-101/pathep-[eth1/14]\">\n                </div>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column\">\n                <div class=\"field\">\n                    <label>&nbsp;<br>\n                        <input type=\"checkbox\" name=\"apicEnforcePolicies\" tabindex=\"0\"\n                               [checked]=\"setting.enforcePolicies == 'yes'\"\n                               (change)=\"$event.target.checked?setting.enforcePolicies='yes':setting.enforcePolicies='no'\"\n                               class=\"alignLabel\">\n                        Enforce security policies\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column\">\n                <div class=\"field\">\n                    <label>&nbsp;<br>\n                        <input type=\"checkbox\" name=\"apicIncludeCommonTenant\" tabindex=\"0\"\n                               [checked]=\"setting.includeCommonTenant == 'yes'\"\n                               (change)=\"$event.target.checked?setting.includeCommonTenant='yes':setting.includeCommonTenant='no'\"\n                               class=\"alignLabel\">\n                        Lookup objects in common tenant\n                    </label>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column\">\n                <div class=\"field\" style=\"margin-top:15px;\">\n                    <div *ngIf=\"aciForm.submitted\">\n                        <div [hidden]=\"aciForm.valid\" class=\"ui negative message\">\n                            <ul class=\"list\">\n                                <!-- APIC settings validation -->\n                                <li *ngIf=\"apicPhysicalDomain.errors?.required\">Please enter physical domain\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div *ngIf=\"!firstRunWiz\" class=\"ui row\">\n            <div class=\"right aligned six wide column\">\n                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                    Update ACI Settings\n                </button>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"firstRunWiz\">\n        <div class=\"ui section divider\" style=\"margin-top: 60px\"></div>\n        <div class=\"ui grid\">\n            <div class=\"right floated right aligned sixteen wide column\">\n                <button type=\"button\" class=\"ui basic button\" (click)=\"cancel.emit()\">Cancel</button>\n                <button type=\"button\" class=\"ui basic blue button\" (click)=\"goback.emit()\"><i\n                        class=\"arrow left icon\"></i>Go back\n                </button>\n                <button type=\"button\" class=\"ui blue basic button\" (click)=\"skip.emit()\">Skip this step</button>\n                <button type=\"submit\" class=\"ui blue button\">Continue<i class=\"arrow right icon\"></i></button>\n            </div>\n        </div>\n    </div>\n</form>\n"

/***/ },
/* 702 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n    <div class=\"ui sixteen column grid\">\n        <div class=\"ui row pageHeader\">\n            <div class=\"left aligned eight wide column\">\n                <div class=\"content pageTitle\">LDAP Settings</div>\n            </div>\n            <div class=\"right aligned eight wide column\">&nbsp;</div>\n        </div>\n\n        <div class=\"ui row breadcrumbRow\">\n            <div class=\"ui sixteen wide column\">\n                <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                        LDAP Settings\n                </span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"ui row\">\n            <div class=\"ui sixteen wide column\">\n\n                <form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n                      (ngSubmit)=\"updateLdapConfig(formRef.valid)\" novalidate>\n\n                    <div class=\"six wide field\">\n                        <div *ngIf=\"formRef.submitted\">\n                            <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"server.errors?.required\">\n                                        Please enter ldap server address\n                                    </li>\n                                    <li *ngIf=\"port.errors?.required\">\n                                        Please enter ldap server port number\n                                    </li>\n                                    <li *ngIf=\"base_dn.errors?.required\">\n                                        Please enter ldap base dn\n                                    </li>\n                                    <li *ngIf=\"service_account_dn.errors?.required\">\n                                        Please enter ladap service account dn\n                                    </li>\n                                    <li *ngIf=\"service_account_password.errors?.required\">\n                                        Please enter ldap service account password\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n\n                                <div class=\"field\">\n                                    <label for=\"server\">Server Address</label>\n                                    <input #server=\"ngModel\"\n                                           type=\"text\"\n                                           id=\"server\"\n                                           name=\"server\"\n                                           [(ngModel)]=\"ldapConfig.server\" placeholder=\"Server address\" required>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"port\">Server Port</label>\n                                    <input #port=\"ngModel\"\n                                           type=\"number\"\n                                           id=\"port\"\n                                           name=\"port\"\n                                           [(ngModel)]=\"ldapConfig.port\" placeholder=\"Server port\" required>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"service_account_password\">Service Account Password</label>\n                                    <input #service_account_password=\"ngModel\"\n                                           type=\"password\"\n                                           id=\"service_account_password\"\n                                           name=\"service_account_password\"\n                                           [(ngModel)]=\"ldapConfig.service_account_password\"\n                                           placeholder=\"Enter password\" required>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"base_dn\">Base DN</label>\n                                    <input #base_dn=\"ngModel\"\n                                           type=\"text\"\n                                           id=\"base_dn\"\n                                           name=\"base_dn\"\n                                           [(ngModel)]=\"ldapConfig.base_dn\" placeholder=\"Enter base DN\" required>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"service_account_dn\">Service Account DN</label>\n                                    <input #service_account_dn=\"ngModel\"\n                                           type=\"text\"\n                                           id=\"service_account_dn\"\n                                           name=\"service_account_dn\"\n                                           [(ngModel)]=\"ldapConfig.service_account_dn\"\n                                           placeholder=\"Enter service account DN\" required>\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label>&nbsp;<br>\n                                        <input type=\"checkbox\" name=\"StartTLS\" tabindex=\"0\" class=\"alignLabel\"\n                                               [(ngModel)]=\"ldapConfig.StartTLS\">\n                                        Start TLS\n                                    </label>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label>&nbsp;<br>\n                                        <input type=\"checkbox\" name=\"InsecureSkipVerify\" tabindex=\"0\" class=\"alignLabel\"\n                                               [(ngModel)]=\"ldapConfig.InsecureSkipVerify\">\n                                        Accept certs as-is, skipping validation\n                                    </label>\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"ui grid\">\n                                    <div class=\"right floated right aligned sixteen wide column\">\n                                        <div class=\"buttonRow\">\n                                            <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                                Save\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                        </div>\n\n                    </div>\n                </form>\n\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 703 */
/***/ function(module, exports) {

	module.exports = "<form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n      (ngSubmit)=\"updateNetworkSettings(formRef.valid)\" novalidate>\n\n    <div class=\"ui grid\">\n        <div class=\"ui row\">\n            <div class=\"ui six wide column field\">\n                <div *ngIf=\"formRef.submitted\">\n                    <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                        <ul class=\"list\">\n                            <li *ngIf=\"networkInfrastructureRef.errors?.required\">\n                                Please enter network infrastructure type\n                            </li>\n                            <li *ngIf=\"allowedVlanRangeRef.errors?.required\">\n                                Please enter allowed vlan range\n                            </li>\n                            <li *ngIf=\"allowedVxlanRangeRef.errors?.required\">\n                                Please enter allowed vxlan range\n                            </li>\n                            <li *ngIf=\"forwardingmodeRef.errors?.required\">\n                                Please enter forwarding mode\n                            </li>\n                            <li *ngIf=\"allowedVlanRangeRef.errors?.pattern\">\n                                Please enter vlan in range in the correct notation\n                            </li>\n                            <li *ngIf=\"allowedVxlanRangeRef.errors?.pattern\">\n                                Please enter vxlan in range in the correct notation\n                            </li>\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column field\">\n                <label for=\"networkInfrastructure\">Network infrastructure type</label>\n                <select #networkInfrastructureRef=\"ngModel\"\n                        id=\"networkInfrastructure\"\n                        name=\"networkInfrastructure\"\n                        class=\"ui dropdown\"\n                        [(ngModel)]=\"setting['networkInfraType']\" required>\n                    <option value=\"\">-- Please select network infrastructure type --</option>\n                    <option value=\"default\">default</option>\n                    <option value=\"aci\">aci</option>\n                </select>\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column field\">\n                <label for=\"allowedVlanRange\">Allowed vlan range</label>\n                <input #allowedVlanRangeRef=\"ngModel\"\n                       type=\"text\"\n                       id=\"allowedVlanRange\"\n                       name=\"allowedVlanRange\"\n                       [(ngModel)]=\"setting['vlans']\" placeholder=\"1-4094\" required [pattern]=\"vlanPattern\">\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column field\">\n                <label for=\"allowedVxlanRange\">Allowed vxlan range</label>\n                <input #allowedVxlanRangeRef=\"ngModel\"\n                       type=\"text\"\n                       id=\"allowedVxlanRange\"\n                       name=\"allowedVxlanRange\"\n                       [(ngModel)]=\"setting['vxlans']\" placeholder=\"1-10000\" required [pattern]=\"vxlanPattern\">\n            </div>\n        </div>\n        <div class=\"ui row\">\n            <div class=\"ui six wide column field\">\n                <label for=\"forwardingmode\">Forwarding mode</label>\n                <select #forwardingmodeRef=\"ngModel\"\n                        id=\"forwardingmode\"\n                        name=\"forwardingmode\"\n                        class=\"ui dropdown\"\n                        [(ngModel)]=\"setting['fwdMode']\" required>\n                    <option value=\"\">-- Please select the network forwarding mode --</option>\n                    <option value=\"bridge\">bridge</option>\n                    <option value=\"routing\">routing</option>\n                </select>\n            </div>\n        </div>\n        <div *ngIf=\"!firstRunWiz\" class=\"ui row\">\n            <div class=\"right aligned six wide column\">\n                <div style=\"margin-top: 20px\">\n                    <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                        Update Network Settings\n                    </button>\n                </div>\n            </div>\n        </div>\n    </div>\n\n    <div *ngIf=\"firstRunWiz\">\n        <div class=\"ui section divider\" style=\"margin-top: 60px\"></div>\n        <div class=\"ui grid\">\n            <div class=\"right floated right aligned sixteen wide column\">\n                <button type=\"button\" class=\"ui basic button\" (click)=\"cancel.emit()\">Cancel</button>\n                <button type=\"button\" class=\"ui blue basic button\" (click)=\"skip.emit()\">Skip this step</button>\n                <button type=\"submit\" class=\"ui blue button\">Continue<i class=\"arrow right icon\"></i></button>\n            </div>\n        </div>\n    </div>\n\n</form>\n"

/***/ },
/* 704 */
/***/ function(module, exports) {

	module.exports = "<table  class=\"ui very basic unstackable table\" style=\"margin-top: 10px\">\n    <ng-content></ng-content>\n</table>"

/***/ },
/* 705 */
/***/ function(module, exports) {

	module.exports = "<div (click)=\"sortColumn()\">\n    <ng-content></ng-content>\n    <i  class=\"angle icon\"[ngClass]=\"sortobject.iconDirection\"\n        *ngIf=\"sortobject.field==sortfield && sortfield!=''\">\n    </i>\n</div>"

/***/ },
/* 706 */
/***/ function(module, exports) {

	module.exports = "<!--<div class=\"content\" style=\"font-size: 18px; margin-top: 30px\">Resources</div> -->\n<div class=\"ui grid\" style=\"margin-top: 15px\">\n    <div class=\"row\">\n        <div class=\"ui four wide column kpi\">\n            <a class=\"ui fluid card\" [routerLink]=\"['../servicelbs/list']\">\n                <div class=\"content\">\n                    <div class=\"kpiHeader\">Service Load Balancers</div>\n                    <div class=\"description\">\n                        <p class=\"center aligned kpiValue\">{{servicelbs}}</p>\n                    </div>\n\n                </div>\n            </a>\n        </div>\n        <div class=\"ui four wide column kpi\">\n            <a class=\"ui fluid card\" [routerLink]=\"['../applicationgroups/list']\">\n                <div class=\"content\">\n                    <div class=\"kpiHeader\">Application Groups</div>\n                    <div class=\"description\">\n                        <p class=\"center aligned kpiValue\">{{groups}}</p>\n                    </div>\n                </div>\n            </a>\n        </div>\n        <div class=\"ui four wide column kpi\">\n            <a class=\"ui fluid card\" [routerLink]=\"['../networkpolicies/list']\">\n                <div class=\"content\">\n                    <div class=\"kpiHeader\">Network Policies</div>\n                    <div class=\"description\">\n                        <p class=\"center aligned kpiValue\">{{networkpolicies}}</p>\n                    </div>\n                </div>\n            </a>\n        </div>\n        <div class=\"ui four wide column kpi\">\n            <a class=\"ui fluid card\" [routerLink]=\"['../networks/list']\">\n                <div class=\"content\">\n                    <div class=\"kpiHeader\">Networks</div>\n                    <div class=\"description\">\n                        <p class=\"center aligned kpiValue\">{{networks}}</p>\n                    </div>\n                </div>\n            </a>\n        </div>\n    </div>\n</div>\n\n\n<div class=\"ui grid\" style=\"margin-top: 15px\">\n    <div class=\"row\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"ui tabular menu\">\n                <a class=\"active item\" [ngClass]=\"{active: endpointType==EndpointType.Network}\" (click)=\"switch(EndpointType.Network)\">Networks</a>\n                <a class=\"item\" [ngClass]=\"{active: endpointType==EndpointType.ApplicationGroup}\" (click)=\"switch(EndpointType.ApplicationGroup)\">Application Groups</a>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui one column centered row\" style=\"margin-top: 20px;\">\n        <div class=\"ui fourteen wide column\">\n            <linegraph [key]=\"key\" [endpointType]=\"endpointType\"></linegraph>\n        </div>\n    </div>\n\n\n    <div class=\"ui one column centered row\" style=\"margin-top: 30px;\" *ngIf=\"endpointType===EndpointType.Network\">\n        <div class=\"ui fourteen wide column\">\n            <ctv-table #tableRef [defaultSortColumn]=\"'networkName'\" [items]=\"networkList\" (filtereditems)=\"filterednetworks=$event; setKey($event)\" [size]=\"4\">\n            <thead>\n            <tr>\n                <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Tenant</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'encap'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Encapsulation</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'subnet'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Subnet</ctv-th></th>\n            </tr>\n            </thead>\n            <tbody *ngIf=\"networkList\">\n            <tr class=\"selectable\" *ngFor=\"let network of filterednetworks\" [ngClass]=\"{selected: key==network.key, notSelected: key!=network.key}\" (click)=\"key=network.key\">\n                <td>{{network.networkName}}</td>\n                <td>{{network.tenantName}}</td>\n                <td>{{network.encap}}</td>\n                <td>{{network.subnet}}</td>\n            </tr>\n            </tbody>\n            <tbody *ngIf=\"!networkList\">\n            <tr>\n                <td colspan=\"2\">No rows found.</td>\n            </tr>\n            </tbody>\n            <tfoot>\n            <tr>\n                <td colspan=\"4\">\n                    <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                     (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                     (prevChunk)=\"tableRef.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef.showNextChunk()\">\n                    </ctv-tpagination>\n                </td>\n            </tr>\n            </tfoot>\n        </ctv-table>\n        </div>\n    </div>\n    <div class=\"ui one column centered row\" style=\"margin-top: 30px;\" *ngIf=\"endpointType===EndpointType.ApplicationGroup\">\n        <div class=\"ui fourteen wide column\">\n            <ctv-table #tableRef1 [defaultSortColumn]=\"'groupName'\" [items]=\"applicationGroupList\" (filtereditems)=\"filteredgroups=$event; setKey($event)\" [size]=\"4\">\n            <thead>\n            <tr>\n                <th><ctv-th [sortfield]=\"'groupName'\" (sortdata)=\"tableRef1.applysort($event)\" [sortobject]=\"tableRef1.sortObj\">Name</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef1.applysort($event)\" [sortobject]=\"tableRef1.sortObj\">Tenant</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef1.applysort($event)\" [sortobject]=\"tableRef1.sortObj\">Network</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'policies'\" (sortdata)=\"tableRef1.applysort($event)\" [sortobject]=\"tableRef1.sortObj\">Policies</ctv-th></th>\n            </tr>\n            </thead>\n            <tbody *ngIf=\"applicationGroupList\">\n            <tr *ngFor=\"let group of filteredgroups\" [ngClass]=\"{selected: key==group.key, notSelected: key!=group.key}\" (click)=\"key=group.key\">\n                <td>{{group.groupName}}</td>\n                <td>{{group.tenantName}}</td>\n                <td>{{group.networkName}}</td>\n                <td>{{group.policies.join(\", \")}}</td>\n            </tr>\n            </tbody>\n            <tbody *ngIf=\"!applicationGroupList\">\n            <tr>\n                <td colspan=\"2\">No rows found.</td>\n            </tr>\n            </tbody>\n            <tfoot>\n            <tr>\n                <td colspan=\"4\">\n                    <ctv-tpagination [chunks]=\"tableRef1.pageChunks\"\n                                     (showPage)=\"tableRef1.showChunk($event, tableRef1.table.searchText)\"\n                                     (prevChunk)=\"tableRef1.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef1.showNextChunk()\">\n                    </ctv-tpagination>\n                </td>\n            </tr>\n            </tfoot>\n        </ctv-table>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 707 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui grid\" style=\"margin-bottom: 30px\">\n    <div class=\"left floated sixteen wide column\">\n        <div class=\"content\" style=\"font-size: 24px\">\n            <span>Configure ACI Settings</span>\n        </div>\n    </div>\n</div>\n<acisettingcomp [firstRunWiz]=\"true\" (updateAciDef)=\"updateAciSettings($event)\" [setting]=\"setting\" (goback)=\"goBack()\" (skip)=\"skip()\" (cancel)=\"cancel()\"></acisettingcomp>"

/***/ },
/* 708 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui grid\" style=\"margin-bottom: 30px\">\n    <div class=\"left floated sixteen wide column\">\n        <div class=\"content\" style=\"font-size: 24px\">\n            <span>Select Network Defaults</span>\n        </div>\n    </div>\n</div>\n<networksettingcomp [firstRunWiz]=\"true\" (updateNetDef)=\"updateNetworkSettings($event)\" [setting]=\"setting\" (cancel)=\"cancel()\" (skip)=\"skip()\"></networksettingcomp>"

/***/ },
/* 709 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui container\" *ngIf=\"welcomeActive\">\n    <div class=\"ui grid\">\n        <div class=\"ui sixteen wide column\">\n            <h2>Welcome to Cisco Container Networking</h2>\n        </div>\n        <div class=\"ui sixteen wide column\">\n            <p>The Cisco Container Networking offers the quickest, easiest way to manage and scale your container infrastructure. A ready-to-go platform designed to be centrally managed by enterprise IT, with developer self-service, CCN provides a higher level of networking abstraction for microservices. CCN secures your application using a rich policy framework. It provides built-in service discovery and service routing for scale out services. </p>\n        </div>\n        <div class=\"ui sixteen wide column\">\n            <h4>Click below to step through the CCN global configuration. Doing so is optional and you can edit the same settings later via the <em>Global Settings</em> screen.</h4>\n        </div>\n        <div class=\"ui sixteen wide column\">\n\n            <button class=\"ui large blue button cancelBtn\" (click)=\"logout()\">Logout</button>\n\n            <button class=\"ui large blue button secondaryBtn\" (click)=\"skip()\">Skip Wizard</button>\n\n            <button class=\"ui large blue button primaryBtn\" (click)=\"runwizard()\">Run Wizard</button>\n\n        </div>\n    </div>\n</div>\n\n\n<div class=\"ui basic segment\" *ngIf=\"!welcomeActive\">\n    <div class=\"ui grid\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"steps-container\">\n                <ul class=\"progressbar\">\n                    <li class=\"active\" [ngClass]=\"{active: pageNo==1, completed: pageNo > 1}\"><span>Configure Network</span></li>\n                    <li [ngClass]=\"{active: pageNo==2, completed: pageNo > 2}\"><span>ACI Settings</span></li>\n                    <li [ngClass]=\"{active: pageNo==3, completed: pageNo > 3}\"><span>Confirm Details</span></li>\n                </ul>\n            </div>\n        </div>\n    </div>\n    <firstrunnetworkdefault *ngIf=\"pageNo==1\" (updatePage)=\"updatePage($event);\" (cancelPage)=\"welcomeActive=true\"></firstrunnetworkdefault>\n    <firstrunacisettings *ngIf=\"pageNo==2\" (updatePage)=\"updatePage($event); \" (cancelPage)=\"welcomeActive=true\"></firstrunacisettings>\n    <firstrunwizardconfirmpage *ngIf=\"pageNo==3\" (updatePage)=\"updatePage($event);\" (cancelPage)=\"welcomeActive=true\"></firstrunwizardconfirmpage>\n</div>\n\n"

/***/ },
/* 710 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n    <div class=\"ui grid\">\n        <div class=\"left floated sixteen wide column\">\n            <div class=\"content\" style=\"font-size: 24px\">\n                <span>Verify all the configuration</span>\n            </div>\n        </div>\n    </div>\n    <div class=\"ui section divider\" style=\"margin-top: 30px\"></div>\n    <h4 class=\"ui header\">Network Defaults</h4>\n    <table class=\"ui very basic selectable table\">\n        <tbody>\n            <tr>\n                <td class=\"ctv-header three wide column\">Network infrastructure type</td>\n                <td>{{wizardService.setting.networkInfraType}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Allowed vlan range</td>\n                <td>{{wizardService.setting.vlans}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Allowed vxlan range</td>\n                <td>{{wizardService.setting.vxlans}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Forwarding mode</td>\n                <td>{{wizardService.setting.fwdMode}}</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <div class=\"ui section divider\" style=\"margin-top: 30px\"></div>\n    <h4 class=\"ui header\">ACI Settings</h4>\n    <table class=\"ui very basic selectable table\">\n        <tbody>\n            <tr>\n                <td class=\"ctv-header three wide column\">Physical domain</td>\n                <td>{{wizardService.aciSetting.physicalDomain}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Node bindings</td>\n                <td>{{wizardService.aciSetting.nodeBindings}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Path bindings</td>\n                <td>{{wizardService.aciSetting.pathBindings}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Enforce security policies</td>\n                <td>{{wizardService.aciSetting.enforcePolicies}}</td>\n            </tr>\n            <tr>\n                <td class=\"ctv-header three wide column\">Lookup objects in common tenant</td>\n                <td>{{wizardService.aciSetting.includeCommonTenant}}</td>\n            </tr>\n        </tbody>\n    </table>\n\n    <div class=\"ui section divider\" style=\"margin-top: 60px\"></div>\n    <div class=\"ui grid\">\n        <div class=\"right floated right aligned sixteen wide column\">\n            <button type=\"button\" class=\"ui basic button\" (click)=\"cancel()\">Cancel</button>\n            <button type=\"button\" class=\"ui basic blue button\" (click)=\"goBack()\"><i class=\"arrow left icon\"></i>Go back</button>\n            <button type=\"button\" class=\"ui blue basic button\" (click)=\"process()\">Skip this step</button>\n            <button type=\"button\" class=\"ui blue button\" (click)=\"process()\">Finish</button>\n        </div>\n    </div>\n</div>"

/***/ },
/* 711 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui middle aligned center aligned grid container\">\n    <div class=\"column copyright\">\n\n        <form id=\"loginForm\" name=\"loginForm\" class=\"ui form\" role=\"form\"\n              (submit)=\"login()\" novalidate #loginForm=\"ngForm\">\n            <div class=\"ui active inverted dimmer\" *ngIf=\"loginCtrl.showLoader\">\n                <div class=\"ui loader\"></div>\n            </div>\n\n            <div class=\"login-seg\" style=\"margin-top: 180px; background-color: white; padding: 20px; \">\n                <h1 class=\"header\" style=\"margin-left:6px; margin-right:auto;\">\n                    <img class=\"ui image\" src=\"images/cisco_logo.svg\" height=\"30\" style=\"display:inline;\">\n                    <br>\n                    <span class=\"productname\">{{product_name}}</span>\n                </h1>\n\n\n                <div class=\"field\" [ngClass]=\"{'error': showServerError}\">\n                    <input type=\"text\" id=\"username\" name=\"username\" [(ngModel)]=\"loginCtrl.username\"\n                           placeholder=\"User Name\" required>\n                </div>\n                <div class=\"field\" [ngClass]=\"{'error': showServerError}\">\n                    <input type=\"password\" id=\"password\" name=\"password\" [(ngModel)]=\"loginCtrl.password\"\n                           placeholder=\"Password\" required>\n                </div>\n                <div class=\"field\">\n                    <div align=\"center\">\n                        <span *ngIf=\"showServerError\" style=\"color: red\">Incorrect user name or password. Please try again.</span>\n                    </div>\n                </div>\n\n                <div align=\"center\">\n                    <button *ngIf=\"loginForm.valid\" class=\"ui fluid blue button primaryBtn\" style=\"width: 100%\">\n                        Log In\n                    </button>\n                    <button *ngIf=\"!loginForm.valid\" class=\"ui disabled button\" style=\"width: 100%\">\n                        Log In\n                    </button>\n                </div>\n\n                <div class=\"center\">\n                    <div class=\"copyright\">\n                        Copyright (c) 2016 Cisco Systems, Inc. All rights reserved.\n                    </div>\n                </div>\n\n            </div>\n\n        </form>\n    </div>\n</div>"

/***/ },
/* 712 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui middle aligned center aligned grid container\">\n    <div class=\"column\" style=\"width: 450px;\">\n        <div class=\"ui login-seg\" style=\"margin-top: 180px; background-color: white; padding: 20px; \">\n            <h1 class=\"header\" style=\"margin-left:6px; margin-right:auto; text-align:center;\">\n                <img class=\"ui image\" src=\"images/cisco_logo.svg\" height=\"30\" style=\"display:inline;\">\n                <br>\n                <span class=\"productname\">{{product_name}}</span>\n            </h1>\n\n            <div class=\"column\" style=\"text-align: center\">\n                <h3>You have been logged out.</h3>\n            </div>\n\n            <div class=\"column\" style=\"text-align: center; margin-top:50px;\" align=\"center\">\n                <button type=\"button\" class=\"ui fluid blue button primaryBtn\" (click)=\"login()\" style=\"display: inline; width: 75%\">Login</button>\n            </div>\n           \n            <div class=\"center\">\n                <div class=\"column copyright\">\n                        Copyright (c) 2016 Cisco Systems, Inc. All rights reserved.\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 713 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui container logout\" style=\"margin-top: 100px; width: 60%\">\n    <div class=\"ui segment\">\n        <div class=\"ui one column centered grid\">\n            <div class=\"column\" style=\"text-align: center\">\n                <h2>401 - Unauthorized</h2>\n            </div>\n\n            <div class=\"column\" style=\"text-align: center\">\n                <h3>You are not authorized to view this page</h3>\n            </div>\n\n            <div class=\"column\" style=\"text-align: center\">\n                <h3>Please contact the administrator for further assistance</h3>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 714 */
/***/ function(module, exports) {

	module.exports = "<div class=\"page header\">\n    <div class=\"ui top attached menu mainMenu\" align=\"right\">\n        <h1 class=\"header\" style=\"margin-top: 2px; float: left; white-space: nowrap; \">\n            <img class=\"ui image\" src=\"images/cisco_logo.svg\" height=\"30\" style=\"display: inline; margin-right: 20px;\"><span class=\"productname\">{{product_name}}</span>\n        </h1>\n        <div class=\"utilnav\">\n            <button type=\"button\" class=\"circular ui mini icon button\"\n                    (click)=\"help()\">\n                <i class=\"large help icon\"></i>\n            </button>\n            <button type=\"button\" class=\"circular ui mini icon button\"\n                    (click)=\"logout()\">\n                <i class=\"large logout icon\"></i>\n            </button>\n            <button type=\"button\" class=\"circular ui mini icon button\"\n                    (click)=\"account()\">\n                <i class=\"large user icon\"></i>\n            </button>\n            <div class=\"ui dropdown\">\n                <div class=\"text\">{{username}}</div>\n                <i class=\"large dropdown icon\"></i>\n                <div class=\"menu\">\n                </div>\n            </div>\n        </div>\n\n    </div>\n</div>\n\n<notification></notification>\n\n<div id=\"sidebar\" class=\"ui visible left vertical sidebar icon labeled menu mainNav\">\n    <span *ngIf=\"!firstRun\">\n\n        <a class=\"item\" [routerLink]=\"['dashboard']\" routerLinkActive=\"active\">\n            Dashboard\n        </a>\n\n        <a class=\"item\" [routerLink]=\"['networks']\" routerLinkActive=\"active\">\n            Networks\n        </a>\n\n        <a class=\"item\" [routerLink]=\"['servicelbs']\" routerLinkActive=\"active\">\n            Service Load Balancers\n        </a>\n\n        <a class=\"item\" [routerLink]=\"['applicationgroups']\" routerLinkActive=\"active\">\n            Application Groups\n        </a>\n\n        <a class=\"item\" [routerLink]=\"['appprofiles']\" routerLinkActive=\"active\">\n            ACI Application Profiles\n        </a>\n\n        <a class=\"item\" [routerLink]=\"['networkpolicies']\" routerLinkActive=\"active\">\n            Network Policies\n        </a>\n\n        <a class=\"item\" [routerLink]=\"['settings']\" routerLinkActive=\"active\" *auth=\"'admin'\">\n            Settings\n        </a>\n    </span>\n</div>\n\n<div id=\"pageContent\">\n    <router-outlet></router-outlet>\n</div>\n"

/***/ },
/* 715 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Bandwidth Policy</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Network Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    <a (click)=\"returnToPolicies()\">\n                        Bandwidth Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n                  (ngSubmit)=\"createPolicy(formRef.valid)\" novalidate>\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n                    <div class=\"six wide field\">\n                        <div *ngIf=\"formRef.submitted\">\n                            <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"profileNameRef.errors?.required\">Please enter profile\n                                        name\n                                    </li>\n                                    <li *ngIf=\"policyTenantRef.errors?.required\">\n                                        Please select tenant\n                                    </li>\n                                    <li *ngIf=\"bandwidthNumberRef.errors?.required\">Please enter\n                                        bandwidth\n                                    </li>\n                                    <li *ngIf=\"bandwidthUnitRef.errors?.required\">Please select\n                                        bandwidth Unit\n                                    </li>\n                                    <li *ngIf=\"DSCPRef.errors?.required\">Please enter DSCP</li>\n                                </ul>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newProfileName\">Policy name</label>\n                                    <input #profileNameRef=\"ngModel\" type=\"text\" id=\"newProfileName\" name=\"newProfileName\"\n                                           [(ngModel)]=\"newPolicy.profileName\" placeholder=\"Enter profile name\" required>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newPolicyTenant\">Tenant</label>\n                                    <select id=\"newPolicyTenant\" class=\"ui dropdown\"\n                                            name=\"newPolicyTenant\"\n                                            [(ngModel)]=\"newPolicy.tenantName\"\n                                            required #policyTenantRef=\"ngModel\">\n                                        <option value=\"\">-- Please select tenant --</option>\n                                        <option *ngFor=\"let tenant of tenants\" [ngValue]=\"tenant.tenantName\">{{tenant.tenantName}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n\n                                <div class=\"fields\">\n                                    <div class=\"eight wide field\">\n                                        <label for=\"newBandwidthNumber\">Bandwidth Value</label>\n                                        <input #bandwidthNumberRef=\"ngModel\" type=\"number\" id=\"newBandwidthNumber\" name=\"newBandwidthNumber\"\n                                               [(ngModel)]=\"newPolicy.bandwidthNumber\" placeholder=\"Enter bandwidth\" required>\n                                    </div>\n                                    <div class=\"eight wide field\">\n                                        <label for=\"newBandwidthUnit\">Bandwidth Unit</label>\n                                        <select #bandwidthUnitRef=\"ngModel\" name=\"newBandwidthUnit\" id=\"newBandwidthUnit\" class=\"ui dropdown\"\n                                                [(ngModel)]=\"newPolicy.bandwidthUnit\" required>\n                                            <option value=\"\"> -- Select unit -- </option>\n                                            <option value=\"kbps\">kbps</option>\n                                            <option value=\"mbps\">mbps</option>\n                                            <option value=\"gbps\">gbps</option>\n                                        </select>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newDSCP\">DSCP</label>\n                                    <input #DSCPRef=\"ngModel\" type=\"number\" id=\"newDSCP\" name=\"newDSCP\"\n                                           [(ngModel)]=\"newPolicy.DSCP\" placeholder=\"Enter DSCP\" required/>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui grid\">\n                        <div class=\"right aligned six wide column\">\n                            <div class=\"buttonRow\">\n                                <button type=\"button\" class=\"ui basic large button cancelBtn\" (click)=\"cancelCreating()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Create\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n\n                    <ctv-error *ngIf=\"showServerError\" header=\"Error creating policy\"\n                               [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                </div>\n\n            </form>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 716 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div [ngSwitch]=\"mode\" class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{policy.profileName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{policy.profileName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div class=\"right aligned five wide column\">\n                <div id=\"delete-policy-modal\" class=\"ui small modal\">\n                    <div class=\"header\">Remove Policy: {{policy.profileName}}</div>\n                    <div class=\"content\">\n                        <p>Are you sure you want to remove this policy?</p>\n                    </div>\n                    <div class=\"actions\">\n                        <div class=\"ui negative button\">No</div>\n                        <div class=\"ui positive blue button\" (click)=\"deletePolicy()\">\n                            Yes\n                        </div>\n                    </div>\n                </div>\n                <button *ngSwitchCase=\"'details'\" type=\"button\" class=\"ui large button cancelBtn\"\n                        (click)=\"cancelDetails()\">\n                    Close\n                </button>\n                 <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                        (click)=\"cancelEditing()\">\n                    Cancel\n                </button>\n                <button *ngSwitchCase=\"'details'\" class=\"ui blue large button secondaryBtn\"\n                        (click)=\"editPolicy()\">\n                    Edit\n                </button>\n                <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-policy-modal').modal('show')\">\n                    <i class=\"trash icon\"></i>\n                    Remove\n                </button>\n            </div>\n\n        </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Network Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    <a (click)=\"returnToPolicies()\">\n                        Bandwidth Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">{{policy.profileName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div [ngSwitch]=\"mode\" class=\"ui basic segment\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div *ngSwitchCase=\"'details'\">\n\n                    <table>\n                        <tbody>\n                        <tr>\n                            <td class=\"ctv-header\">Profile Name</td>\n                            <td class=\"ctv-value\">{{policy.profileName}}</td>\n                        </tr>\n                        <tr>\n                            <td class=\"ctv-header\">Tenant</td>\n                            <td class=\"ctv-value\">{{policy.tenantName}}</td>\n                        </tr>\n                        <tr>\n                            <td class=\"ctv-header\">Bandwidth</td>\n                            <td class=\"ctv-value\">{{policy.bandwidth}}</td>\n                        </tr>\n                        <tr>\n                            <td class=\"ctv-header\">DSCP</td>\n                            <td class=\"ctv-value\">{{policy.DSCP}}</td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <div *ngSwitchCase=\"'edit'\">\n                    <form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n                          (ngSubmit)=\"savePolicy(formRef.valid)\" novalidate>\n\n                        <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                            <div class=\"ui loader\"></div>\n                        </div>\n\n                        <div class=\"six wide field\">\n                            <div *ngIf=\"formRef.submitted\">\n                                <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                                    <ul class=\"list\">\n                                        <li *ngIf=\"bandwidthNumberRef.errors?.required\">\n                                            Please enter bandwidth\n                                        </li>\n                                        <li *ngIf=\"bandwidthUnitRef.errors?.required\">\n                                            Please select bandwidth Unit\n                                        </li>\n                                        <li *ngIf=\"DSCPRef.errors?.required\">\n                                            Please enter DSCP\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n\n                        <table>\n                            <tbody>\n                            <tr>\n                                <td class=\"ctv-header\">Profile Name</td>\n                                <td class=\"ctv-value\">{{policy.profileName}}</td>\n                            </tr>\n                            </tbody>\n                        </table>\n\n                        <div class=\"ui sixteen column grid\" style=\"margin-top: 30px;\">\n                            <div class=\"ui row\">\n                                <div class=\"ui six wide column\">\n\n                                    <div class=\"fields\">\n                                        <div class=\"eight wide field\">\n                                            <label for=\"bandwidthNumber\">Bandwidth Value</label>\n                                            <input #bandwidthNumberRef=\"ngModel\" type=\"number\" id=\"bandwidthNumber\" name=\"bandwidthNumber\"\n                                                   [(ngModel)]=\"policy.bandwidthNumber\" placeholder=\"Enter bandwidth value\" required>\n                                        </div>\n                                        <div class=\"eight wide field\">\n                                            <label for=\"bandwidthUnit\">Bandwidth Unit</label>\n                                            <select #bandwidthUnitRef=\"ngModel\" name=\"bandwidthUnit\" id=\"bandwidthUnit\" class=\"ui dropdown\"\n                                                    [(ngModel)]=\"policy.bandwidthUnit\" required>\n                                                <option value=\"\">-- Select bandwidth unit --</option>\n                                                <option value=\"kbps\">kbps</option>\n                                                <option value=\"mbps\">mbps</option>\n                                                <option value=\"gbps\">gbps</option>\n                                            </select>\n                                        </div>\n                                    </div>\n\n                                </div>\n                                </div>\n                            <div class=\"ui row\">\n                                <div class=\"ui six wide column\">\n                                    <div class=\"field\">\n                                        <label for=\"DSCP\">DSCP</label>\n                                        <input #DSCPRef=\"ngModel\" type=\"number\" id=\"DSCP\" name=\"DSCP\"\n                                               [(ngModel)]=\"policy.DSCP\" placeholder=\"Enter DSCP\" required/>\n                                    </div>\n\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"ui grid\">\n                            <div class=\"right aligned six wide column buttonRow\">\n                                <button type=\"button\" class=\"ui large button cancelBtn\"\n                                        (click)=\"cancelEditing()\">\n                                    Cancel\n                                </button>\n\n                                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Save\n                                </button>\n                            </div>\n                        </div>\n\n                    </form>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 717 */
/***/ function(module, exports) {

	module.exports = "<ctv-search *ngIf=\"bandwidthPolicyListCtrl['policies']\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n<div class=\"ui basic segment ctvTable\" [ngClass]=\"{loading: showLoader}\">\n    <ctv-table #tableRef [defaultSortColumn]=\"'profileName'\"\n               [items]=\"bandwidthPolicyListCtrl['policies']\"\n               (filtereditems)=\"filteredPolicies=$event\"\n               [size]=\"12\">\n        <thead>\n        <tr>\n            <th>\n                <ctv-th [sortfield]=\"'profileName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Name\n                </ctv-th>\n            </th>\n            <th>\n                <ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Tenant\n                </ctv-th>\n            </th>\n        </tr>\n        </thead>\n\n        <tbody *ngIf=\"bandwidthPolicyListCtrl['policies']\">\n        <tr *ngFor=\"let policy of filteredPolicies\">\n            <td><a [routerLink]=\"['../bandwidth/details', policy.key]\">{{policy.profileName}}</a></td>\n            <td>{{policy.tenantName}}</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"!bandwidthPolicyListCtrl['policies']\">\n            <tr>\n                <td colspan=\"2\">No bandwidth policies found.</td>\n            </tr>\n        </tbody>\n\n        <tbody *ngIf=\"bandwidthPolicyListCtrl['policies'] && !tableRef.count\">\n            <tr>\n                <td colspan=\"2\">No records matched your filter criteria.</td>\n            </tr>\n        </tbody>\n\n        <tfoot>\n        <tr class=\"pagination\">\n            <td colspan=\"2\">\n                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                </ctv-tpagination>\n            </td>\n        </tr>\n        </tfoot>\n    </ctv-table>\n</div>\n"

/***/ },
/* 718 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create External Contract Group</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../list']\">\n                        Network Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    <a (click)=\"returnToContractGroups()\">\n                        External Contract Groups\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n                  (ngSubmit)=\"createContractGroup(formRef.valid)\" novalidate>\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n\n                    <div class=\"six wide field\">\n                        <div *ngIf=\"formRef.submitted\">\n                            <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"contractGroupNameRef.errors?.required\">\n                                        Please enter external contract group name\n                                    </li>\n                                    <li *ngIf=\"contractGroupTenantRef.errors?.required\">\n                                        Please select a tenant\n                                    </li>\n                                    <li *ngIf=\"contractGroupTypeRef.errors?.required\">\n                                        Please select external contract group type\n                                    </li>\n                                    <li *ngIf=\"contractGroupContractsRef.errors?.required\">\n                                        Please enter contracts\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newContractGroupName\">External contract group name</label>\n                                    <input #contractGroupNameRef=\"ngModel\" type=\"text\" id=\"newContractGroupName\" name=\"newContractGroupName\"\n                                           [(ngModel)]=\"newContractGroup.contractsGroupName\" placeholder=\"Enter name\" required>\n                                </div>\n                            </div>\n                            </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newContractGroupTenant\">Tenant</label>\n                                    <select id=\"newContractGroupTenant\" class=\"ui dropdown\"\n                                            name=\"newContractGroupTenant\"\n                                            [(ngModel)]=\"newContractGroup.tenantName\"\n                                            required #contractGroupTenantRef=\"ngModel\">\n                                        <option value=\"\">-- Select a tenant --</option>\n                                        <option *ngFor=\"let tenant of tenants\" [ngValue]=\"tenant.tenantName\">{{tenant.tenantName}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                            </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newContractGroupType\">External contract group type</label>\n                                    <select id=\"newContractGroupType\" class=\"ui dropdown\"\n                                            name=\"newContractGroupType\"\n                                            [(ngModel)]=\"newContractGroup.contractsType\"\n                                            required #contractGroupTypeRef>\n                                        <option value=\"\">-- Select group type --</option>\n                                        <option value=\"consumed\">consumed</option>\n                                        <option value=\"provided\">provided</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newContractGroupContracts\">Contracts</label>\n                                    <input #contractGroupContractsRef=\"ngModel\" type=\"text\" id=\"newContractGroupContracts\" name=\"newContractGroupContracts\"\n                                           [(ngModel)]=\"contractsString\" placeholder=\"Enter comma separated contract names\" required>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui grid\">\n                        <div class=\"right aligned six wide column\">\n                            <div class=\"buttonRow\">\n\n                                <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Create\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n\n                </div>\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 719 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n    <div class=\"ui eight wide column\">\n        <div class=\"content pageTitle\">\n            {{contractGroup.contractsGroupName}}\n        </div>\n    </div>\n    <div class=\"right aligned eight wide column\">\n\n        <div id=\"delete-contractgroup-modal\" class=\"ui small modal\">\n            <div class=\"header\">Remove External Contract Group: {{contractGroup.contractsGroupName}}</div>\n            <div class=\"content\">\n                <p>Are you sure you want to remove this external contract group?</p>\n            </div>\n            <div class=\"actions\">\n                <div class=\"ui negative button\">No</div>\n                <div class=\"ui positive blue button\" (click)=\"deleteContractGroup()\">\n                    Yes\n                </div>\n            </div>\n        </div>\n\n        <button class=\"ui large button secondaryBtn\" (click)=\"returnToContractGroups()\">\n            Close\n        </button>\n\n        <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-contractgroup-modal').modal('show')\">\n            <i class=\"trash icon\"></i>\n            Remove\n        </button>\n    </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Network Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    <a (click)=\"returnToContractGroups()\">\n                        External Contract Groups\n                    </a>\n                </span>\n                <span class=\"crumb\">{{contractGroup.contractsGroupName}}</span>\n            </div>\n        </div>\n    </div>\n    <div class=\"ui row\">\n        <div class=\"ui basic segment\">\n            <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                <div class=\"ui loader\"></div>\n            </div>\n\n            <table>\n                <tbody>\n                <tr>\n                    <td class=\"ctv-header\">External Contract Group Name</td>\n                    <td class=\"ctv-value\">{{contractGroup.contractsGroupName}}</td>\n                </tr>\n                <tr>\n                    <td class=\"ctv-header\">Tenant</td>\n                    <td class=\"ctv-value\">{{contractGroup.tenantName}}</td>\n                </tr>\n                <tr>\n                    <td class=\"ctv-header\">External Contract Group Type</td>\n                    <td class=\"ctv-value\">{{contractGroup.contractsType}}</td>\n                </tr>\n                <tr>\n                    <td class=\"ctv-header\">Contracts</td>\n                    <td class=\"ctv-value\">{{contractGroup.contracts?.join(\", \")}}</td>\n                </tr>\n                </tbody>\n            </table>\n\n        </div>\n    </div>\n</div>"

/***/ },
/* 720 */
/***/ function(module, exports) {

	module.exports = "<ctv-search *ngIf=\"contractGroups\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n<div class=\"ui basic segment ctvTable\" [ngClass]=\"{loading: showLoader}\">\n    <ctv-table #tableRef [defaultSortColumn]=\"'contractsGroupName'\"\n               [items]=\"contractGroups\"\n               (filtereditems)=\"filteredContractGroups=$event\"\n               [size]=\"12\">\n        <thead>\n        <tr>\n            <th>\n                <ctv-th [sortfield]=\"'contractsGroupName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Name\n                </ctv-th>\n            </th>\n            <th>\n                <ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Tenant\n                </ctv-th>\n            </th>\n            <th>\n                <ctv-th [sortfield]=\"'contractsType'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Type\n                </ctv-th>\n            </th>\n            <th>\n                <ctv-th [sortfield]=\"'contracts'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Contracts\n                </ctv-th>\n            </th>\n        </tr>\n        </thead>\n\n        <tbody *ngIf=\"contractGroups\">\n        <tr *ngFor=\"let contractGroup of filteredContractGroups\">\n            <td><a [routerLink]=\"['../contractgroup/details', contractGroup.key]\">{{contractGroup.contractsGroupName}}</a></td>\n            <td>{{contractGroup.tenantName}}</td>\n            <td>{{contractGroup.contractsType}}</td>\n            <td>{{contractGroup.contracts?.join(\", \")}}</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"!contractGroups\">\n        <tr class=\"noDataFound\">\n            <td colspan=\"4\">No external contract groups found.</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"contractGroups && !tableRef.count\">\n        <tr class=\"noDataFound\">\n            <td colspan=\"4\">No records matched your filter criteria.</td>\n        </tr>\n        </tbody>\n\n        <tfoot>\n        <tr class=\"pagination\">\n            <td colspan=\"4\">\n                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                </ctv-tpagination>\n            </td>\n        </tr>\n        </tfoot>\n    </ctv-table>\n</div>\n"

/***/ },
/* 721 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Isolation Policy</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Network Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Isolation Policies\n                    </a>\n                </span>\n                <span class=\"crumb current\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" role=\"form\" #formRef=\"ngForm\"\n                  (ngSubmit)=\"createPolicy(formRef.valid)\" novalidate>\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n\n                    <div class=\"ui six column wide field\">\n                        <div *ngIf=\"formRef.submitted\">\n                            <div *ngIf=\"!formRef.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"policyNameRef.errors?.required\">\n                                        Please enter policy name\n                                    </li>\n                                    <li *ngIf=\"policyTenantRef.errors?.required\">\n                                        Please select tenant\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"description\">\n                        <em>Name and create the policy now, after it is created you will edit it to define policy rules.</em>\n                    </div>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newPolicyName\">Policy name</label>\n                                    <input #policyNameRef=\"ngModel\" type=\"text\" id=\"newPolicyName\" name=\"newPolicyName\"\n                                           [(ngModel)]=\"newPolicy.policyName\" placeholder=\"Enter name\" required>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newPolicyTenant\">Tenant</label>\n                                    <select id=\"newPolicyTenant\" class=\"ui dropdown\"\n                                            name=\"newPolicyTenant\"\n                                            [(ngModel)]=\"newPolicy.tenantName\"\n                                            required #policyTenantRef=\"ngModel\">\n                                        <option value=\"\">-- Select a tenant --</option>\n                                        <option *ngFor=\"let tenant of tenants\" [ngValue]=\"tenant.tenantName\">{{tenant.tenantName}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui grid\">\n                        <div class=\"right aligned six wide column\">\n                            <div class=\"buttonRow\">\n\n                                <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Create\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <ctv-error *ngIf=\"showServerError\" header=\"Error creating policy\"\n                           [error]=\"serverErrorMessage\">\n                </ctv-error>\n\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 722 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div [ngSwitch]=\"mode\" class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{policy.policyName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{policy.policyName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div class=\"right aligned five wide column\">\n                <div id=\"delete-policy-modal\" class=\"ui small modal\">\n                    <div class=\"header\">Remove Policy: {{policy.policyName}}</div>\n                    <div class=\"content\">\n                        <p>Are you sure you want to remove this policy?</p>\n                    </div>\n                    <div class=\"actions\">\n                        <div class=\"ui negative button\">No</div>\n                        <div class=\"ui positive blue button\" (click)=\"deletePolicy()\">\n                            Yes\n                        </div>\n                    </div>\n                </div>\n                <button *ngSwitchCase=\"'details'\" type=\"button\" class=\"ui large button cancelBtn\"\n                        (click)=\"cancelDetails()\">\n                    Close\n                </button>\n                <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                        (click)=\"cancelEditing()\">\n                    Close\n                </button>\n                <button *ngSwitchCase=\"'details'\" class=\"ui blue large button secondaryBtn\"\n                        (click)=\"editPolicy()\">\n                    Edit\n                </button>\n                <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-policy-modal').modal('show')\">\n                    <i class=\"trash icon\"></i>\n                    Remove\n                </button>\n            </div>\n        </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Network Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networkpolicies/list\">\n                        Isolation Policies\n                    </a>\n                </span>\n                <span class=\"crumb\">{{policy.policyName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui basic segment\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <table>\n                    <tbody>\n                    <tr>\n                        <td class=\"ctv-header\">Name</td>\n                        <td class=\"ctv-value\">{{policy.policyName}}</td>\n                    </tr>\n                    <tr>\n                        <td class=\"ctv-header\">Tenant</td>\n                        <td class=\"ctv-value\">{{policy.tenantName}}</td>\n                    </tr>\n                    </tbody>\n                </table>\n\n                <form class=\"ui form policyOutput\" role=\"form\">\n                    <h4 class=\"ui header\">Incoming rules</h4>\n\n                    <div class=\"field\">\n                        <div *ngIf=\"incorrectCIDR\" class=\"ui negative message\">\n                            <ul class=\"list\">\n                                <li>Please enter the IP address in CIDR notation</li>\n                            </ul>\n                        </div>\n                    </div>\n\n                    <table class=\"ui very basic unstackable table\">\n                        <thead>\n                        <tr>\n                            <th class=\"two wide\">Priority</th>\n                            <th class=\"two wide\">Action</th>\n                            <th class=\"three wide\">From group</th>\n                            <th class=\"two wide\">From network</th>\n                            <th class=\"two wide\">From IP address</th>\n                            <th class=\"two wide\">Protocol</th>\n                            <th class=\"two wide\">Port</th>\n                            <th class=\"one wide\">&nbsp;</th>\n                        </tr>\n                        </thead>\n\n                        <tbody *ngIf=\"mode=='edit'\">\n                            <tr class=\"noHover\">\n                                <td>\n                                    <div class=\"ui input\">\n                                        <input name=\"incomingRulePriority\" [(ngModel)]=\"newIncomingRule.priority\" type=\"number\">\n                                    </div>\n                                </td>\n                                <td>\n                                    <select class=\"ui dropdown\" name=\"incomingRuleAction\" [(ngModel)]=\"newIncomingRule.action\">\n                                        <option value=\"allow\">allow</option>\n                                        <option value=\"deny\">deny</option>\n                                    </select>\n                                </td>\n                                <td>\n                                    <select class=\"ui dropdown\"\n                                            #incomingSelectedApplicationGroup\n                                            name=\"incomingSelectedApplicationGroup\"\n                                            ngModel\n                                            (change)=\"onChangeIncomingApplicationGroupSelection(incomingSelectedApplicationGroup.value)\"\n                                            [disabled]=\"disableIncomingApplicationGroupSelection\">\n                                        <option selected value=\"\">none</option>\n                                        <option *ngFor=\"let group of applicationGroups\">{{group.groupName}}</option>\n                                    </select>\n                                </td>\n                                <td>\n                                    <select class=\"ui dropdown\"\n                                            #incomingSelectedNetwork\n                                            name=\"incomingSelectedNetwork\"\n                                            ngModel\n                                            (change)=\"onChangeIncomingNetworkSelection(incomingSelectedNetwork.value)\"\n                                            [disabled]=\"disableIncomingNetworkSelection\">\n                                        <option selected value=\"\">none</option>\n                                        <option *ngFor=\"let network of networks\">{{network.networkName}}</option>\n                                    </select>\n                                </td>\n                                <td>\n                                    <div class=\"ui input\">\n                                        <input name=\"incomingRuleFromIpAddress\"\n                                               [(ngModel)]=\"newIncomingRule.fromIpAddress\"\n                                               [disabled]=\"disableIncomingIPAddressSelection\"\n                                               (change)=\"onChangeIncomingIPAddress()\"\n                                               placeholder=\"0.0.0.0/0\">\n                                    </div>\n                                </td>\n                                <td>\n                                    <select class=\"ui dropdown\" name=\"incomingRuleProtocol\" [(ngModel)]=\"newIncomingRule.protocol\">\n                                        <option value=\"tcp\">tcp</option>\n                                        <option value=\"udp\">udp</option>\n                                        <option value=\"icmp\">icmp</option>\n                                    </select>\n                                </td>\n                                <td>\n                                    <div class=\"ui input\">\n                                        <input name=\"incomingRulePort\"\n                                               [(ngModel)]=\"newIncomingRule.port\"\n                                               type=\"number\"\n                                               placeholder=\"0-65535\">\n                                    </div>\n                                </td>\n                                <td>\n                                    <button class=\"ui icon button iconBtn primaryIconBtn\" (click)=\"addIncomingRule()\">\n                                        <i class=\"add icon\"></i>\n                                    </button>\n                                </td>\n                            </tr>\n                        </tbody>\n                        <tbody *ngIf=\"incomingRules.length\">\n                            <tr *ngFor=\"let rule of incomingRules\">\n                                <td>{{rule.priority}}</td>\n                                <td>{{rule.action}}</td>\n                                <td>{{rule.fromEndpointGroup}}</td>\n                                <td>{{rule.fromNetwork}}</td>\n                                <td>{{rule.fromIpAddress}}</td>\n                                <td>{{rule.protocol}}</td>\n                                <td>{{rule.port}}</td>\n                                <td *ngIf=\"mode == 'edit'\">\n                                    <button class=\"ui icon button iconBtn secondaryIconBtn\" (click)=\"deleteIncomingRule(rule.key)\">\n                                        <i class=\"trash icon\"></i>\n                                    </button>\n                                </td>\n                            </tr>\n                        </tbody>\n                        <tbody *ngIf=\"!incomingRules.length\">\n                            <tr class=\"noDataFound\">\n                                <td colspan=\"8\">None applied</td>\n                            </tr>\n                        </tbody>\n                    </table>\n\n                    <h4 class=\"ui header\" style=\"margin-top: 40px\">Outgoing rules</h4>\n                    <table class=\"ui very basic unstackable table\" style=\"margin-top: 40px\">\n                        <thead>\n                        <tr>\n                            <th class=\"two wide\">Priority</th>\n                            <th class=\"two wide\">Action</th>\n                            <th class=\"three wide\">To group</th>\n                            <th class=\"two wide\">To network</th>\n                            <th class=\"two wide\">To IP address</th>\n                            <th class=\"two wide\">Protocol</th>\n                            <th class=\"two wide\">Port</th>\n                            <th class=\"one wide\">&nbsp;</th>\n                        </tr>\n                        </thead>\n\n                        <tbody *ngIf=\"mode=='edit'\">\n                        <tr class=\"noHover\">\n\n                            <td>\n                                <div class=\"ui input\">\n                                    <input name=\"outgoingRulePriority\" [(ngModel)]=\"newOutgoingRule.priority\" type=\"number\">\n                                </div>\n                            </td>\n                            <td>\n                                <select class=\"ui dropdown\" name=\"outgoingRuleAction\" [(ngModel)]=\"newOutgoingRule.action\">\n                                    <option value=\"allow\">allow</option>\n                                    <option value=\"deny\">deny</option>\n                                </select>\n                            </td>\n                            <td>\n                                <select class=\"ui dropdown\"\n                                        #outgoingSelectedApplicationGroup\n                                        name=\"outgoingSelectedApplicationGroup\"\n                                        ngModel\n                                        (change)=\"onChangeOutgoingApplicationGroupSelection(outgoingSelectedApplicationGroup.value)\"\n                                        [disabled]=\"disableOutgoingApplicationGroupSelection\">\n                                    <option value=\"\">none</option>\n                                    <option *ngFor=\"let group of applicationGroups\">{{group.groupName}}</option>\n                                </select>\n                            </td>\n                            <td>\n                                <select class=\"ui dropdown\"\n                                        #outgoingSelectedNetwork\n                                        name=\"outgoingSelectedNetwork\"\n                                        ngModel\n                                        (change)=\"onChangeOutgoingNetworkSelection(outgoingSelectedNetwork.value)\"\n                                        [disabled]=\"disableOutgoingNetworkSelection\">\n                                    <option value=\"\">none</option>\n                                    <option *ngFor=\"let network of networks\">{{network.networkName}}</option>\n                                </select>\n                            </td>\n                            <td>\n                                <div class=\"ui input\">\n                                    <input name=\"outgoingRuleToIpAddress\"\n                                           [(ngModel)]=\"newOutgoingRule.toIpAddress\"\n                                           [disabled]=\"disableOutgoingIPAddressSelection\"\n                                           (change)=\"onChangeOutgoingIPAddress()\"\n                                           placeholder=\"0.0.0.0/0\">\n                                </div>\n                            </td>\n                            <td>\n                                <select class=\"ui dropdown\" name=\"outgoingRuleProtocol\" [(ngModel)]=\"newOutgoingRule.protocol\">\n                                    <option value=\"tcp\">tcp</option>\n                                    <option value=\"udp\">udp</option>\n                                    <option value=\"icmp\">icmp</option>\n                                </select>\n                            </td>\n                            <td>\n                                <div class=\"ui input\">\n                                    <input name=\"outgoingRulePort\"\n                                           [(ngModel)]=\"newOutgoingRule.port\"\n                                           type=\"number\"\n                                           placeholder=\"0-65535\">\n                                </div>\n                            </td>\n\n                            <td>\n                                <button class=\"ui icon button iconBtn primaryIconBtn\" (click)=\"addOutgoingRule()\">\n                                    <i class=\"add icon\"></i>\n                                </button>\n                            </td>\n\n                        </tr>\n                        <tbody *ngIf=\"outgoingRules.length\">\n                            <tr *ngFor=\"let rule of outgoingRules\">\n                                <td>{{rule.priority}}</td>\n                                <td>{{rule.action}}</td>\n                                <td>{{rule.toEndpointGroup}}</td>\n                                <td>{{rule.toNetwork}}</td>\n                                <td>{{rule.toIpAddress}}</td>\n                                <td>{{rule.protocol}}</td>\n                                <td>{{rule.port}}</td>\n                                <td *ngIf=\"mode == 'edit'\">\n                                    <button class=\"ui icon button iconBtn secondaryIconBtn\" (click)=\"deleteOutgoingRule(rule.key)\">\n                                        <i class=\"trash icon\"></i>\n                                    </button>\n                                </td>\n                            </tr>\n                        </tbody>\n                        <tbody *ngIf=\"!outgoingRules.length\">\n                            <tr class=\"noDataFound\">\n                                <td colspan=\"8\">None applied</td>\n                            </tr>\n                        </tbody>\n                    </table>\n                </form>\n                <div [ngSwitch]=\"mode\">\n\n                    <ctv-error *ngIf=\"((showServerError) && (mode === 'edit'))\"\n                               header=\"Error editing isolation policy\"\n                               [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                    <ctv-error *ngIf=\"((showServerError) && (mode === 'details'))\"\n                               header=\"Error deleting isolation policy\"\n                               [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                </div>\n            </div>\n\n        </div>\n    </div>\n</div>\n<isolationpolicystats [statKey]=\"statskey\" *ngIf=\"!infoselected\"></isolationpolicystats>\n"

/***/ },
/* 723 */
/***/ function(module, exports) {

	module.exports = "<ctv-search *ngIf=\"isolationPolicyListCtrl['policies']\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n<div class=\"ui basic segment ctvTable\" [ngClass]=\"{loading: showLoader}\">\n    <ctv-table #tableRef [defaultSortColumn]=\"'policyName'\"\n               [items]=\"isolationPolicyListCtrl['policies']\"\n               (filtereditems)=\"isolationPolicyListCtrl['filteredPolicies']=$event\"\n               [size]=\"12\">\n        <thead>\n        <tr>\n            <th>\n                <ctv-th [sortfield]=\"'policyName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Name\n                </ctv-th>\n            </th>\n            <th>\n                <ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\"\n                        [sortobject]=\"tableRef.sortObj\">Tenant\n                </ctv-th>\n            </th>\n        </tr>\n        </thead>\n\n        <tbody *ngIf=\"isolationPolicyListCtrl['policies']\">\n        <tr *ngFor=\"let policy of isolationPolicyListCtrl['filteredPolicies']\">\n            <td><a [routerLink]=\"['../isolation/details', policy.key]\">{{policy.policyName}}</a></td>\n            <td>{{policy.tenantName}}</td>\n        </tr>\n        </tbody>\n\n        <tbody *ngIf=\"!isolationPolicyListCtrl['policies']\">\n            <tr class=\"noDataFound\">\n                <td colspan=\"2\">No isolation policies found.</td>\n            </tr>\n        </tbody>\n\n        <tbody *ngIf=\"isolationPolicyListCtrl['policies'] && !tableRef.count\">\n            <tr class=\"noDataFound\">\n                <td colspan=\"2\">No records matched your filter criteria.</td>\n            </tr>\n        </tbody>\n\n        <tfoot>\n        <tr class=\"pagination\">\n            <td colspan=\"2\">\n                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                </ctv-tpagination>\n            </td>\n        </tr>\n        </tfoot>\n    </ctv-table>\n</div>\n"

/***/ },
/* 724 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: isolationPolicyStatsComp.showLoader}\">\n    <table>\n        <tbody>\n        <tr>\n            <td class=\"ctv-header\">Name</td>\n            <td class=\"ctv-value\">{{isolationPolicyStatsComp['config']['policyName']}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Tenant Name</td>\n            <td class=\"ctv-value\">{{isolationPolicyStatsComp['config']['tenantName']}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Number of Endpoints</td>\n            <td class=\"ctv-value\">{{isolationPolicyStatsComp.isolationPolicyInspectStats.numEndpoints}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <div class=\"ui section divider\"></div>\n    <ctv-collapsible title=\"End Points\">\n        <ctv-table #tableRef [defaultSortColumn]=\"'containerName'\"\n                   [items]=\"isolationPolicyStatsComp['endpoints']\"\n                   (filtereditems)=\"isolationPolicyStatsComp['filteredendpoints']=$event;\"\n                   [size]=\"12\">\n            <thead>\n            <tr>\n                <div class=\"ui grid\" style=\"margin-top: 25px;margin-left: 25px;margin-bottom: 1px;\">\n                    <th class=\"five wide column\"><ctv-th [sortfield]=\"'containerName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Container Name </ctv-th></th>\n                    <th class=\"four wide column\" style=\"padding-left: 18px !important;\"><ctv-th [sortfield]=\"'ipAddress'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> IP Address </ctv-th></th>\n                    <th class=\"three wide column\" style=\"padding-left: 44px !important;\"><ctv-th [sortfield]=\"'homingHost'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Host </ctv-th></th>\n                    <th class=\"four wide column\">\n                        <ctv-search (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [placeholder]=\"'Search Containers...'\"></ctv-search>\n                    </th>\n                </div>\n            </tr>\n            </thead>\n\n            <tbody>\n            <tr *ngFor=\"let endpoint of isolationPolicyStatsComp['filteredendpoints']\">\n                <td>\n                    <ctv-accordion [items]=\"isolationPolicyStatsComp['containerDetails'][endpoint.containerID]\">\n                        <div class=\"ui grid\" style=\"margin-top: -33px; margin-left: 30px;\">\n                            <div class=\"five wide column\">{{endpoint.containerName.substr(1)}}</div>\n                            <div class=\"four wide column\">{{endpoint.ipAddress.join(' ')}}</div>\n                            <div class=\"four wide column\">{{endpoint.homingHost}}</div>\n                        </div>\n                    </ctv-accordion>\n                </td>\n                <td></td>\n            </tr>\n            </tbody>\n\n            <tfoot>\n            <tr>\n                <td colspan=\"5\">\n                    <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                     (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                     (prevChunk)=\"tableRef.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef.showNextChunk()\">\n\n                    </ctv-tpagination>\n                </td>\n            </tr>\n            </tfoot>\n        </ctv-table>\n    </ctv-collapsible>\n</div>"

/***/ },
/* 725 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Network Policies</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n          <button class=\"ui blue large button primaryBtn\" (click)=\"createNetworkPolicy()\">\n              <i class=\"add icon\"></i>\n              Create Policy\n          </button>\n        </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div [ngSwitch]=\"policyMode\" class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                  <a href=\"/#/m/networkpolicies/list\">\n                      Network Policies\n                  </a></span>\n                <span *ngSwitchCase=\"'isolation'\" class=\"crumb\">Isolation Policies</span>\n                <span *ngSwitchCase=\"'bandwidth'\" class=\"crumb\">Bandwidth Policies</span>\n                <span *ngSwitchCase=\"'contractgroup'\" class=\"crumb\">External Contract Groups</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n          <div class=\"ui tabular menu\">\n              <a class=\"item\"\n                 [ngClass]=\"{active: isolationPolicySelected}\"\n                 (click)=\"selectPolicyTab(policyTab.isolation)\">\n                  Isolation Policies\n              </a>\n              <a class=\"item\"\n                 [ngClass]=\"{active: bandwidthPolicySelected}\"\n                 (click)=\"selectPolicyTab(policyTab.bandwidth)\">\n                  Bandwidth Policies\n              </a>\n              <a class=\"item\"\n                 [ngClass]=\"{active: contractGroupSelected}\"\n                 (click)=\"selectPolicyTab(policyTab.contractGroup)\">\n                  External Contract Groups (ACI)\n              </a>\n          </div>\n\n          <isolationpolicylist *ngIf=\"isolationPolicySelected\"></isolationpolicylist>\n          <bandwidthpolicylist *ngIf=\"bandwidthPolicySelected\"></bandwidthpolicylist>\n          <contractgrouplist *ngIf=\"contractGroupSelected\"></contractgrouplist>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 726 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Network</div>\n        </div>\n\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networks/list\">\n                        Networks\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form id=\"networkCreationForm\" name=\"networkCreateForm\" class=\"ui form\" role=\"form\"\n                  (submit)=\"networkCreateCtrl.createNetwork(networkCreateForm.valid)\" novalidate #networkCreateForm=\"ngForm\">\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"networkCreateCtrl.showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui sixteen column grid\" style=\"margin: 0;\">\n                    <div class=\"ui row\">\n\n                        <div class=\"ui six wide column field\">\n                            <div *ngIf=\"networkCreateForm.submitted\">\n                                <div [hidden]=\"networkCreateForm.valid\" class=\"ui negative message\">\n                                    <ul class=\"list\">\n                                        <li *ngIf=\"newNetworkName.errors?.required\">Please enter network name\n                                        </li>\n                                        <li *ngIf=\"newNetworkTenant.errors?.required\">\n                                            Please select tenant\n                                        </li>\n                                        <li *ngIf=\"newNetworkSubnet.errors?.required\">Please enter subnet</li>\n                                        <li *ngIf=\"newNetworkSubnet.errors?.pattern\">Please enter subnet in CIDR\n                                            notation\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui row\">\n                        <div class=\"ui six wide column field\">\n                            <label for=\"newNetworkName\">Network name</label>\n                            <input type=\"text\" id=\"newNetworkName\" name=\"newNetworkName\"\n                                   [(ngModel)]=\"networkCreateCtrl.newNetwork.networkName\"\n                                   placeholder=\"Enter name\" required #newNetworkName=\"ngModel\">\n                        </div>\n                    </div>\n                    <div class=\"ui row\" style=\"margin-top: 15px;\">\n                        <div class=\"ui six wide column field\">\n                            <div class=\"field\">\n                                <label for=\"newNetworkTenant\">Tenant</label>\n                                <select id=\"newNetworkTenant\" class=\"ui dropdown\"\n                                        name=\"newNetworkTenant\"\n                                        [(ngModel)]=\"networkCreateCtrl.newNetwork.tenantName\"\n                                        required #newNetworkTenant=\"ngModel\">\n                                    <option value=\"\">-- Please select tenant --</option>\n                                    <option *ngFor=\"let tenant of networkCreateCtrl.tenants\" [ngValue]=\"tenant.tenantName\">{{tenant.tenantName}}</option>\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n                    <div class=\"ui row\" style=\"margin-top: 15px;\">\n                        <div class=\"ui six wide column field\">\n                            <label for=\"newNetworkEncapsulation\">Encapsulation</label>\n                            <select id=\"newNetworkEncapsulation\" class=\"ui dropdown\" [(ngModel)]=\"networkCreateCtrl.newNetwork.encap\" name=\"newNetworkEncap\">\n                                <option value=\"vxlan\">vxlan</option>\n                                <option value=\"vlan\">vlan</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div class=\"ui row\" style=\"margin-top: 15px;\">\n                        <div class=\"ui six wide column field\">\n                            <label for=\"newNetworkSubnet\">Subnet</label>\n                            <input type=\"text\" id=\"newNetworkSubnet\" name=\"newNetworkSubnet\"\n                                   [(ngModel)]=\"networkCreateCtrl.newNetwork.subnet\"\n                                   placeholder=\"CIDR notation, for example: 20.1.1.0/24\" required\n                                   [pattern]=\"networkCreateCtrl.cidrPattern\" #newNetworkSubnet=\"ngModel\">\n                        </div>\n                    </div>\n                    <div class=\"ui row\" style=\"margin-top: 15px;\">\n                        <div class=\"ui six wide column field\">\n                            <label for=\"newNetworkGateway\">Gateway</label>\n                            <input type=\"text\" id=\"newNetworkGateway\" [(ngModel)]=\"networkCreateCtrl.newNetwork.gateway\"\n                                   placeholder=\"Enter gateway\" name=\"newNetworkGateway\">\n                        </div>\n                    </div>\n\n                    <div class=\"ui row\">\n                        <div class=\"right aligned six wide column\">\n                            <div class=\"buttonRow\">\n                                <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"networkCreateCtrl.cancelCreating()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Create\n                                </button>\n                            </div>\n                        </div>\n                    </div>\n\n                    <ctv-error *ngIf=\"networkCreateCtrl.showServerError\" [header]=\"'Error creating network'\"\n                               [error]=\"networkCreateCtrl.serverErrorMessage\">\n                    </ctv-error>\n                </div>\n\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 727 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">{{networkDetailsCtrl.network.networkName}}</div>\n        </div>\n\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button cancelBtn\" (click)=\"returnToNetworks()\">\n                Close\n            </button>\n            <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-network-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/networks/list\">\n                        Networks\n                    </a>\n                </span>\n                <span class=\"crumb\">{{networkDetailsCtrl.network.networkName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"right aligned three wide column\">\n                <div id=\"delete-network-modal\" class=\"ui small modal\">\n                    <div class=\"header\">Remove Network: {{networkDetailsCtrl.network.networkName}}</div>\n                    <div class=\"content\">\n                        <p>Are you sure you want to remove this network?</p>\n                    </div>\n                    <div class=\"actions\">\n                        <div class=\"ui negative button\">No</div>\n                        <div class=\"ui positive button\" (click)=\"deleteNetwork()\">\n                            Yes\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"ui tabular menu\">\n                <a class=\"item\" [ngClass]=\"{active: infoselected}\" (click)=\"infoselected=true\">\n                    Details\n                </a>\n                <a class=\"item\" [ngClass]=\"{active: !infoselected}\" (click)=\"infoselected=false\">\n                    Stats\n                </a>\n            </div>\n\n            <network-info [networkDetailsCtrl]=\"networkDetailsCtrl\" *ngIf=\"infoselected\"></network-info>\n\n            <network-stat [statKey]=\"statskey\" *ngIf=\"!infoselected\"></network-stat>\n\n            <ctv-error *ngIf=\"networkDetailsCtrl.showServerError\" [header]=\"'Error deleting network'\"\n                       [error]=\"networkDetailsCtrl.serverErrorMessage\">\n            </ctv-error>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 728 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\">\n    <div class=\"ui active inverted dimmer\" *ngIf=\"networkDetailsCtrl.showLoader\">\n        <div class=\"ui loader\"></div>\n    </div>\n    <table>\n        <tbody>\n        <tr>\n            <td class=\"ctv-header\">Name</td>\n            <td class=\"ctv-value\">{{networkDetailsCtrl.network.networkName}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Tenant</td>\n            <td class=\"ctv-value\">{{networkDetailsCtrl.network.tenantName}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Encapsulation</td>\n            <td class=\"ctv-value\">{{networkDetailsCtrl.network.encap}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Subnet</td>\n            <td class=\"ctv-value\">{{networkDetailsCtrl.network.subnet}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Gateway</td>\n            <td class=\"value\">{{networkDetailsCtrl.network.gateway}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <h4 class=\"ui header\" style=\"margin-top: 30px\">Application Groups</h4>\n\n    <div style=\"margin-top: 20px\">\n\n        <ctv-search (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [placeholder]=\"'Search application groups...'\"></ctv-search>\n\n        <ctv-table #tableRef\n                   [defaultSortColumn]=\"'groupName'\"\n                   [items]=\"networkDetailsCtrl.applicationGroups\"\n                   (filtereditems)=\"networkDetailsCtrl.filteredApplicationGroups=$event\"\n                   [size]=\"5\">\n            <thead>\n            <tr>\n                <th><ctv-th [sortfield]=\"'groupName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Group name</ctv-th></th>\n                <th><ctv-th [sortfield]=\"'policies'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Policies</ctv-th></th>\n            </tr>\n            </thead>\n\n            <tbody *ngIf=\"networkDetailsCtrl.applicationGroups\">\n            <tr *ngFor=\"let group of networkDetailsCtrl.filteredApplicationGroups\">\n                <td class=\"three wide column\">\n                    <a [routerLink]=\"['/m/applicationgroups/details', group.key]\">{{group.groupName}}</a>\n                </td>\n                <td>{{group.policies.join(\", \")}}</td>\n            </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!networkDetailsCtrl.applicationGroups || networkDetailsCtrl.applicationGroups.length==0\">\n                <tr class=\"noDataFound\"><td colspan=\"2\">No application groups defined.</td></tr>\n            </tbody>\n\n            <tbody *ngIf=\"networkDetailsCtrl.applicationGroups && networkDetailsCtrl.applicationGroups.length>0 && networkDetailsCtrl.filteredApplicationGroups.length==0\">\n                <tr class=\"noDataFound\"><td colspan=\"2\">No records matched your filter criteria.</td></tr>\n            </tbody>\n\n            <tfoot>\n            <tr class=\"pagination\">\n                <td colspan=\"2\">\n                    <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                     (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                     (prevChunk)=\"tableRef.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef.showNextChunk()\">\n                    </ctv-tpagination>\n                </td>\n            </tr>\n            </tfoot>\n        </ctv-table>\n    </div>\n</div>\n"

/***/ },
/* 729 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Networks</div>\n        </div>\n\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\" *auth=\"'admin'\">\n                <i class=\"add icon\"></i>\n                Create Network\n            </button>\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">Networks</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <ctv-search *ngIf=\"networkListComp['networks']\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n            <div class=\"ui basic segment ctvTable\">\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"networkListComp.showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <ctv-table #tableRef [defaultSortColumn]=\"'networkName'\"\n                           [items]=\"networkListComp['networks']\"\n                           (filtereditems)=\"networkListComp['filterednetworks']=$event;\"\n                           [size]=\"12\">\n                    <thead>\n                    <tr>\n                        <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Tenant</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'encap'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Encapsulation</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'subnet'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Subnet</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'gateway'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Gateway</ctv-th></th>\n                    </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"networkListComp['networks']\">\n                    <tr *ngFor=\"let network of networkListComp['filterednetworks']\">\n                        <td><a [routerLink]=\"['../details',network.key]\">{{network.networkName}}</a></td>\n                        <td>{{network.tenantName}}</td>\n                        <td>{{network.encap}}</td>\n                        <td>{{network.subnet}}</td>\n                        <td>{{network.gateway}}</td>\n                    </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!networkListComp['networks']\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"5\">No networks found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"networkListComp['networks'] && !tableRef.count\">\n                        <tr class=\"noDataFound\"><td colspan=\"5\">No records matched your filter criteria.</td></tr>\n                    </tbody>\n\n                    <tfoot>\n                    <tr class=\"pagination\">\n                        <td colspan=\"5\">\n                            <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                             (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                             (prevChunk)=\"tableRef.showPrevChunk()\"\n                                             (nextChunk)=\"tableRef.showNextChunk()\">\n                            </ctv-tpagination>\n                        </td>\n                    </tr>\n                    </tfoot>\n                </ctv-table>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 730 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: networkStatsCtrl.showLoader}\">\n<table>\n    <tbody>\n    <tr>\n        <td class=\"ctv-header\">Name</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl['config']['networkName']}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">Allocated Addresses Count</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl.networkInspectStats.allocatedAddressesCount}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">Allocated IP-Addresses</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl.networkInspectStats.allocatedIPAddresses}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">DNS Server-IP</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl.networkInspectStats.dnsServerIP}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">External Packet Tag</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl.networkInspectStats.externalPktTag}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">Number of Endpoints</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl.networkInspectStats.numEndpoints}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">Packet Tag</td>\n        <td class=\"ctv-value\">{{networkStatsCtrl.networkInspectStats.pktTag}}</td>\n    </tr>\n    </tbody>\n</table>\n\n<ctv-collapsible title=\"End Points\">\n\n    <ctv-search (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [placeholder]=\"\"></ctv-search>\n\n    <ctv-table #tableRef [defaultSortColumn]=\"'containerName'\"\n               [items]=\"networkStatsCtrl['endpoints']\"\n               (filtereditems)=\"networkStatsCtrl['filteredendpoints']=$event;\"\n               [size]=\"12\">\n        <thead>\n            <tr>\n                <th class=\"five wide column\"><ctv-th [sortfield]=\"'containerName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Container Name </ctv-th></th>\n                <th class=\"five wide column\" style=\"padding-left: 18px !important;\"><ctv-th [sortfield]=\"'ipAddress'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> IP Address </ctv-th></th>\n                <th class=\"five wide column\" style=\"padding-left: 44px !important;\"><ctv-th [sortfield]=\"'homingHost'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\"> Host </ctv-th></th>\n            </tr>\n        </thead>\n\n        <tbody>\n            <tr *ngFor=\"let endpoint of networkStatsCtrl['filteredendpoints']\">\n                <td colspan=\"3\" style=\"padding-left: 0 !important;\">\n                    <ctv-accordion [items]=\"networkStatsCtrl['containerDetails'][endpoint.containerID]\">\n                        <div class=\"ui grid\" style=\"margin-top: -33px; margin-left: 20px;\">\n                            <div class=\"five wide column\">{{endpoint.containerName.substr(1)}}</div>\n                            <div class=\"five wide column\">{{endpoint.ipAddress.join(' ')}}</div>\n                            <div class=\"five wide column\">{{endpoint.homingHost}}</div>\n                        </div>\n                    </ctv-accordion>\n                </td>\n            </tr>\n        </tbody>\n\n        <tfoot>\n            <tr class=\"pagination\">\n                <td colspan=\"3\">\n                    <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                     (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                     (prevChunk)=\"tableRef.showPrevChunk()\"\n                                     (nextChunk)=\"tableRef.showNextChunk()\">\n\n                    </ctv-tpagination>\n                </td>\n            </tr>\n        </tfoot>\n    </ctv-table>\n</ctv-collapsible>\n</div>\n"

/***/ },
/* 731 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Service Load Balancer</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a  [routerLink]=\"['../list']\">\n                        Service Load Balancers\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" name=\"servicelbCreateForm\" role=\"form\" #servicelbCreateForm=\"ngForm\"\n                  (submit)=\"createServicelb(servicelbCreateForm.valid)\"\n                  novalidate>\n\n                <div class=\"ui basic segment\">\n\n                    <div class=\"ui active inverted dimmer\" *ngIf=\"servicelbCreateCtrl.showLoader\">\n                        <div class=\"ui loader\"></div>\n                    </div>\n\n                    <div class=\"six wide field\">\n                        <div *ngIf=\"servicelbCreateForm.submitted\">\n                            <div [hidden]=\"servicelbCreateForm.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"servicelbName.errors?.required\">Please enter service load\n                                        balancer name\n                                    </li>\n                                    <li *ngIf=\"servicelbTenantRef.errors?.required\">Please select tenant\n                                    </li>\n                                    <li *ngIf=\"servicelbNetwork.errors?.required\"\n                                        [hidden]=\"!servicelb.tenantName.length\">Please select network\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui sixteen column grid\" style=\"margin-bottom: 20px;\">\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"servicelbName\">Service load balancer name</label>\n                                    <input type=\"text\" id=\"servicelbName\" name=\"servicelbName\"\n                                           [(ngModel)]=\"servicelbCreateCtrl.servicelb.serviceName\" placeholder=\"Enter name\" required #servicelbName=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"servicelbTenant\">Tenant</label>\n                                    <select id=\"servicelbTenant\" class=\"ui dropdown\"\n                                            name=\"servicelbTenant\"\n                                            ngModel\n                                            (change)=\"updateTenant($event.target.value)\"\n                                            required #servicelbTenantRef=\"ngModel\">\n                                        <option value=\"\">-- Please select tenant --</option>\n                                        <option *ngFor=\"let tenant of tenants\" [value]=\"tenant.tenantName\">{{tenant.tenantName}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div [hidden]=\"!servicelb.tenantName.length\" class=\"field\">\n                                    <label for=\"servicelbNetwork\">Network</label>\n                                    <select id=\"servicelbNetwork\" class=\"ui dropdown\"\n                                            name=\"servicelbNetwork\"\n                                            [(ngModel)]=\"servicelb.networkName\"\n                                            required #servicelbNetwork=\"ngModel\">\n                                        <option *ngIf=\"networks.length\" value=\"\">-- Select a network --</option>\n                                        <option *ngIf=\"!networks.length\" value=\"\">-- Tenant has no networks --</option>\n                                        <option *ngFor=\"let network of networks\" [ngValue]=\"network.networkName\">{{network.networkName}}</option>\n                                    </select>\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div *ngIf=\"servicelb.tenantName\" class=\"field\">\n                                    <label for=\"servicelbIP\">Service IP address</label>\n                                    <input type=\"text\" id=\"servicelbIP\" name=\"servicelbIP\"\n                                           [(ngModel)]=\"servicelbCreateCtrl.servicelb.ipAddress\" placeholder=\"Enter IP address\" #servicelbIP=\"ngModel\">\n                                </div>\n                            </div>\n\n                        </div>\n                    </div>\n\n                    <ctv-collapsible [title]=\"'Label Selectors'\" [collapsed]=\"false\">\n                        <div class=\"field\">\n                            <div class=\"description\">\n                                Use this to add your selector name+value pairs.\n                            </div>\n                            <ctv-namevalue [items]=\"servicelbCreateCtrl.labelSelectors\" (itemsChange)=\"servicelbCreateCtrl.labelSelectors=$event\"></ctv-namevalue>\n                        </div>\n                    </ctv-collapsible>\n\n                    <ctv-collapsible [title]=\"'Ports'\" [collapsed]=\"false\">\n                        <div class=\"field\">\n                            <ctv-servicelbports [items]=\"servicelbCreateCtrl.servicelb.ports\" (itemsChange)=\"servicelbCreateCtrl.servicelb.ports=$event\"></ctv-servicelbports>\n                        </div>\n                    </ctv-collapsible>\n\n                    <div class=\"ui grid\">\n                        <div class=\"right aligned sixteen wide column buttonRow\">\n                            <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"servicelbCreateCtrl.cancelCreating()\">\n                                Cancel\n                            </button>\n                            <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                Create\n                            </button>\n                        </div>\n                    </div>\n\n                    <ctv-error *ngIf=\"servicelbCreateCtrl.showServerError\" [header]=\"'Error creating service load balancer'\"\n                               [error]=\"servicelbCreateCtrl.serverErrorMessage\">\n                    </ctv-error>\n                </div>\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 732 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid pageHeader\">\n    <div [ngSwitch]=\"servicelbDetailsCtrl.mode\" class=\"ui row\">\n        <div class=\"left aligned eight wide column\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{servicelbDetailsCtrl.serviceName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{servicelbDetailsCtrl.serviceName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div id=\"delete-service-modal\" class=\"ui small modal\">\n                <div class=\"header\">Remove Service: {{servicelbDetailsCtrl.serviceName}}</div>\n                <div class=\"content\">\n                    <p>Are you sure you want to remove this service?</p>\n                </div>\n                <div class=\"actions\">\n                    <div class=\"ui negative button\">No</div>\n                    <div class=\"ui positive button\" (click)=\"deleteServicelb()\">\n                        Yes\n                    </div>\n                </div>\n            </div>\n\n            <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelEditing()\">\n                Cancel\n            </button>\n            <button *ngSwitchCase=\"'details'\" type=\"button\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelDetails()\">\n                Close\n            </button>\n            <button *ngSwitchCase=\"'details'\" class=\"ui blue large button secondaryBtn\"\n                    (click)=\"loadEdit()\">\n                Edit\n            </button>\n            <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-service-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a href=\"/#/m/servicelbs/list\">\n                        Service Load Balancers\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    {{servicelbDetailsCtrl.serviceName}}\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui tabular menu\" *ngIf=\"servicelbDetailsCtrl.mode=='details'\">\n                <a class=\"item\" [ngClass]=\"{active: infoselected}\" (click)=\"infoselected=true\">\n                    Details\n                </a>\n                <a class=\"item\" [ngClass]=\"{active: !infoselected}\" (click)=\"infoselected=false\">\n                    Stats\n                </a>\n            </div>\n\n            <servicelb-info [(mode)]=\"mode\" *ngIf=\"infoselected || servicelbDetailsCtrl.mode == 'edit'\"\n                (serviceName)=\"serviceName=$event\"></servicelb-info>\n\n            <servicelb-stat [statkey]=\"servicelbDetailsCtrl.statskey\"\n                            *ngIf=\"!infoselected && servicelbDetailsCtrl.mode != 'edit'\"></servicelb-stat>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 733 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: servicelbInfoCtrl.showLoader}\">\n\n    <table>\n        <tbody>\n        <tr>\n            <td class=\"ctv-header\">Name</td>\n            <td class=\"ctv-value\">{{servicelbInfoCtrl.servicelb.serviceName}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Tenant</td>\n            <td class=\"ctv-value\">{{servicelbInfoCtrl.servicelb.tenantName}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Network</td>\n            <td class=\"ctv-value\">{{servicelbInfoCtrl.servicelb.networkName}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">IP address</td>\n            <td class=\"ctv-value\">{{servicelbInfoCtrl.servicelb.ipAddress}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <div [ngSwitch]=\"servicelbInfoCtrl.mode\">\n\n        <div *ngSwitchCase=\"'details'\">\n\n            <div class=\"ctv-collapsible\">\n                <h4 class=\"ui header ctv-collapsible-label\">Label Selectors</h4>\n                <table class=\"ui very basic selectable table\">\n\n                    <thead>\n                        <tr>\n                            <th class=\"ctv-header\">Name</th>\n                            <th class=\"ctv-header\">Value</th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"servicelbInfoCtrl.servicelb.selectors.length\">\n                        <tr *ngFor=\"let selector of servicelbInfoCtrl.servicelb.selectors\">\n                            <td class=\"ctv-header three wide column key\">{{selector.split('=')[0]}}</td>\n                            <td class=\"value\">{{selector.split('=')[1]}}</td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!servicelbInfoCtrl.servicelb.selectors.length\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"3\">No labels found.</td>\n                        </tr>\n                    </tbody>\n\n                </table>\n            </div>\n\n            <div class=\"ctv-collapsible\">\n                <h4 class=\"ui header ctv-collapsible-label\">Ports</h4>\n                <table class=\"ui very basic unstackable table\">\n\n                    <thead>\n                        <tr>\n                            <th class=\"ctv-header\">Service port</th>\n                            <th class=\"ctv-header\">Provider port</th>\n                            <th class=\"ctv-header\">Protocol</th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"servicelbInfoCtrl.servicelb.ports.length\">\n                        <tr *ngFor=\"let port of servicelbInfoCtrl.servicelb.ports\">\n                            <td>{{port.split(':')[0]}}</td>\n                            <td>{{port.split(':')[1]}}</td>\n                            <td>{{port.split(':')[2]}}</td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!servicelbInfoCtrl.servicelb.ports.length\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"3\">No ports found.</td>\n                        </tr>\n                    </tbody>\n\n                </table>\n            </div>\n\n        </div>\n        <div *ngSwitchCase=\"'edit'\">\n\n            <div class=\"ui form field\">\n                <ctv-collapsible title=\"Label Selectors\" [collapsed]=\"false\">\n                    <ctv-namevalue [items]=\"servicelbInfoCtrl.labelSelectors\" (itemsChange)=\"servicelbInfoCtrl.labelSelectors=$event\"></ctv-namevalue>\n                </ctv-collapsible>\n            </div>\n\n            <div class=\"ui form field\">\n                <ctv-collapsible title=\"Ports\" [collapsed]=\"false\">\n                    <ctv-servicelbports [items]=\"servicelbInfoCtrl.servicelb.ports\" (itemsChange)=\"servicelbInfoCtrl.servicelb.ports=$event\"></ctv-servicelbports>\n                </ctv-collapsible>\n            </div>\n        </div>\n        <div class=\"ui grid\" style=\"margin-top: 40px\">\n            <div class=\"right aligned sixteen wide column\">\n                <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui large button cancelBtn\"\n                        (click)=\"servicelbInfoCtrl.cancelEditing()\">\n                    Cancel\n                </button>\n                <button *ngSwitchCase=\"'edit'\" type=\"button\" class=\"ui blue large button primaryBtn\"\n                        (click)=\"servicelbInfoCtrl.saveServicelb()\">\n                    Save\n                </button>\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 734 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Service Load Balancers</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n          <button *auth=\"'admin'\" class=\"ui blue large button primaryBtn\" (click)=\"create()\">\n              <i class=\"add icon\"></i>\n              Create Service Load Balancer\n          </button>\n        </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">Service Load Balancers</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <ctv-search *ngIf=\"servicelbListCtrl.servicelbs\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n            <div class=\"ui basic segment ctvTable\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"servicelbListCtrl.showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n                <ctv-table #tableRef [defaultSortColumn]=\"'serviceName'\"\n                           [items]=\"servicelbListCtrl.servicelbs\"\n                           (filtereditems)=\"servicelbListCtrl.filteredservicelbs=$event\"\n                           [size]=\"12\">\n                    <thead>\n                        <tr>\n                            <th><ctv-th [sortfield]=\"'serviceName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Tenant</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'networkName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Network</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'ipAddress'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">IP Address</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'selectors'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Label Selectors</ctv-th></th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"servicelbListCtrl.servicelbs\">\n                        <tr *ngFor=\"let servicelb of servicelbListCtrl.filteredservicelbs\">\n                            <td><a [routerLink]=\"['../details', servicelb.key]\">{{servicelb.serviceName}}</a></td>\n                            <td>{{servicelb.tenantName}}</td>\n                            <td>{{servicelb.networkName}}</td>\n                            <td>{{servicelb.ipAddress}}</td>\n                            <td>\n                                <div class=\"ui label tiny\" *ngFor=\"let selector of servicelb.selectors\">{{selector}}</div>\n                            </td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!servicelbListCtrl.servicelbs\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"2\">No service load balancers found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"servicelbListCtrl.servicelbs && !tableRef.count\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"2\">No records matched your filter criteria.</td>\n                        </tr>\n                    </tbody>\n\n                    <tfoot>\n                        <tr class=\"pagination\">\n                            <td colspan=\"4\">\n                                <ctv-tpagination  [chunks]=\"tableRef.pageChunks\"\n                                                  (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                                  (prevChunk)=\"tableRef.showPrevChunk()\"\n                                                  (nextChunk)=\"tableRef.showNextChunk()\">\n                                </ctv-tpagination>\n                            </td>\n                        </tr>\n                    </tfoot>\n                </ctv-table>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 735 */
/***/ function(module, exports) {

	module.exports = "<table class=\"ui very basic unstackable table\" style=\"margin-top: 10px\">\n    <thead>\n    <th>Service Port</th>\n    <th>Provider Port</th>\n    <th>Protocol</th>\n    <th>&nbsp;</th>\n    </thead>\n\n    <tbody>\n    <tr class=\"noHover\">\n        <td class=\"ui three wide column\">\n            <div class=\"ui input\">\n                <input type=\"number\" [(ngModel)]=\"newItem.servicePort\" placeholder=\"0-65535\">\n            </div>\n        </td>\n        <td class=\"ui three wide column\">\n            <div class=\"ui input\">\n                <input type=\"number\" [(ngModel)]=\"newItem.providerPort\" placeholder=\"0-65535\">\n            </div>\n        </td>\n        <td class=\"ui three wide column\">\n            <select class=\"ui dropdown\" [(ngModel)]=\"newItem.protocol\">\n                <option value=\"TCP\">TCP</option>\n                <option value=\"UDP\">UDP</option>\n            </select>\n        </td>\n        <td>\n            <button type=\"button\" class=\"ui icon button iconBtn primaryIconBtn\" (click)=\"add()\">\n                <i class=\"add icon\"></i>\n            </button>\n        </td>\n    </tr>\n    </tbody>\n\n    <tbody *ngIf=\"items.length\">\n    <tr *ngFor=\"let item of items\">\n        <td>{{item.split(':')[0]}}</td>\n        <td>{{item.split(':')[1]}}</td>\n        <td>{{item.split(':')[2]}}</td>\n        <td>\n            <button type=\"button\" class=\"ui icon button iconBtn secondaryIconBtn\"\n                    (click)=\"remove(item)\">\n                <i class=\"trash icon\"></i>\n            </button>\n        </td>\n    </tr>\n    </tbody>\n\n    <tbody *ngIf=\"!items.length\">\n    <tr class=\"noDataFound\"><td colspan=\"3\">No ports have been defined.</td></tr>\n    </tbody>\n\n</table>\n"

/***/ },
/* 736 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: servicelbStatsCtrl.showLoader}\">\n\n<table>\n    <tbody>\n    <tr>\n        <td class=\"ctv-header\">Name</td>\n        <td class=\"ctv-value\">{{servicelbStatsCtrl.config.serviceName}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">Number of Providers</td>\n        <td class=\"ctv-value\">{{servicelbStatsCtrl.servicelbInspectStats.numProviders}}</td>\n    </tr>\n    <tr>\n        <td class=\"ctv-header\">Service Vip</td>\n        <td class=\"ctv-value\">{{servicelbStatsCtrl.servicelbInspectStats.serviceVip}}</td>\n    </tr>\n    </tbody>\n</table>\n\n<ctv-collapsible title=\"Providers\">\n\n    <ctv-search *ngIf=\"!servicelbStatsCtrl.providers.length\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n    <div class=\"ui basic segment ctvTable\">\n\n        <ctv-table #tableRef [defaultSortColumn]=\"'containerName'\"\n                   [items]=\"servicelbStatsCtrl.providers\"\n                   (filtereditems)=\"servicelbStatsCtrl.filteredproviders=$event\"\n                   [size]=\"12\">\n            <thead>\n                <tr>\n                    <div class=\"ui grid\" style=\"margin-top: 25px; margin-left: 25px; margin-bottom: 1px;\">\n                        <th class=\"six wide column\"><ctv-th [sortfield]=\"'containerName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Container Name</ctv-th></th>\n                        <th class=\"six wide column\" style=\"padding-left: 18px !important;\"><ctv-th [sortfield]=\"'ipAddress'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">IP Address</ctv-th></th>\n                        <th class=\"four wide column\" style=\"padding-left: 44px !important;\"><ctv-th [sortfield]=\"'homingHost'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Host</ctv-th></th>\n                    </div>\n                </tr>\n            </thead>\n\n            <tbody *ngIf=\"servicelbStatsCtrl.providers.length\">\n                <tr *ngFor=\"let provider of servicelbStatsCtrl.filteredproviders\">\n                    <td colspan=\"3\">\n                        <ctv-accordion [items]=\"servicelbStatsCtrl.providerDetails[provider.containerID]\">\n                            <div class=\"ui grid\" style=\"margin-top: -33px; margin-left: 30px;\">\n                                <div class=\"six wide column\">{{provider.containerName.substr(1)}}</div>\n                                <div class=\"six wide column\">{{provider.ipAddress.join(' ')}}</div>\n                                <div class=\"four wide column\">{{provider.homingHost}}</div>\n                            </div>\n                        </ctv-accordion>\n                    </td>\n                </tr>\n            </tbody>\n\n            <tbody *ngIf=\"!servicelbStatsCtrl.providers.length\">\n                <tr class=\"noDataFound\"><td colspan=\"3\">No container endpoints found.</td></tr>\n            </tbody>\n\n            <tfoot>\n                <tr class=\"pagination\">\n                    <td colspan=\"3\">\n                        <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                         (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                         (prevChunk)=\"tableRef.showPrevChunk()\"\n                                         (nextChunk)=\"tableRef.showNextChunk()\">\n                        </ctv-tpagination>\n                    </td>\n                </tr>\n            </tfoot>\n        </ctv-table>\n\n    </div>\n\n</ctv-collapsible>\n</div>\n"

/***/ },
/* 737 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n    <div class=\"ui sixteen column grid \">\n        <div class=\"ui row pageHeader\">\n            <div class=\"left floated left aligned eight wide column\">\n                <div class=\"content pageTitle\">Create Authorization</div>\n            </div>\n            <div class=\"right aligned eight wide column\">&nbsp;</div>\n        </div>\n\n        <div class=\"ui row\">\n            <div class=\"ui sixteen wide column\">\n                <div class=\"breadcrumbs\">\n                   <span class=\"crumb\">\n                        <a [routerLink]=\"['../../list']\">\n                            Authorizations\n                        </a>\n                    </span>\n                    <span class=\"crumb\">Create</span>\n                </div>\n            </div>\n        </div>\n\n        <div class=\"ui row\">\n            <div class=\"ui sixteen wide column\">\n\n                    <form class=\"ui form\" role=\"form\"\n                          (submit)=\"createAuthorization(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                            <div class=\"six wide field\">\n                                <div *ngIf=\"formRef.submitted\">\n                                    <div [hidden]=\"formRef.valid\" class=\"ui negative message\">\n                                        <ul class=\"list\">\n                                            <li *ngIf=\"username.errors?.required\">Please select\n                                                user name\n                                            </li>\n                                            <li *ngIf=\"role.errors?.required\">Please select\n                                                user role\n                                            </li>\n                                            <li *ngIf=\"tenant.errors?.required\">Please select\n                                                tenant\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n\n                            <div class=\"description\">Create user accounts here. You can assign users into tenancies, and define their role, under Settings > Authorizations. </div>\n\n                            <div class=\"ui sixteen column grid\">\n                                <div class=\"ui row\">\n\n                                    <div class=\"ui six wide column\">\n                                        <div class=\"field\">\n                                            <label for=\"username\">Username</label>\n                                            <select class=\"ui dropdown\" id=\"username\" name=\"username\" [(ngModel)]=\"authorization.PrincipalName\" required #username=\"ngModel\">\n                                                <option [value]=\"user.username\" *ngFor=\"let user of users\">{{user.username}}</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"ui row\">\n                                    <div class=\"ui six wide column\">\n                                        <div class=\"field\">\n                                            <label for=\"role\">Role</label>\n                                            <select class=\"ui dropdown\" id=\"role\" name=\"role\" [(ngModel)]=\"authorization.Role\" required #role=\"ngModel\">\n                                                <option value=\"admin\">Admin</option>\n                                                <option value=\"ops\">DevOps</option>\n                                            </select>\n                                        </div>\n                                    </div>\n\n                                </div>\n                                <div class=\"ui row\">\n\n                                    <div class=\"ui six wide column\">\n                                        <div class=\"field\">\n                                            <label for=\"tenant\">Tenant</label>\n                                            <select class=\"ui dropdown\" id=\"tenant\" name=\"tenant\" [(ngModel)]=\"authorization.TenantName\" required #tenant=\"ngModel\">\n                                                <option [value]=\"tenant.tenantName\" *ngFor=\"let tenant of tenants\">{{tenant.tenantName}}</option>\n                                            </select>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"ui row\">\n                                    <div class=\"ui six wide column\">\n                                        <div class=\"field\">\n                                            <label>&nbsp;<br>\n                                                <input type=\"checkbox\" name=\"local\" tabindex=\"0\" class=\"alignLabel\"\n                                                       [(ngModel)]=\"authorization.Local\">\n                                                Local User\n                                            </label>\n                                        </div>\n                                    </div>\n\n                                </div>\n                                <div class=\"ui row\">\n                                    <div class=\"ui right aligned six wide column\">\n                                        <div class=\"buttonRow\">\n                                            <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                                Cancel\n                                            </button>\n                                            <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                                Create\n                                            </button>\n                                        </div>\n                                    </div>\n                                </div>\n                            </div>\n\n                    </form>\n\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 738 */
/***/ function(module, exports) {

	module.exports = "<div [ngSwitch]=\"mode\" class=\"ui sixteen column grid \">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{authorization.PrincipalName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{authorization.PrincipalName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div id=\"delete-auth-modal\" class=\"ui small modal\">\n                <div class=\"header\">Remove Authorization: {{authorization.PrincipalName}}\n                    for Tenant: {{authorization.TenantName}}\n                </div>\n                <div class=\"content\">\n                    <p>Are you sure you want to remove this authorization?</p>\n                </div>\n                <div class=\"actions\">\n                    <div class=\"ui negative button\">Cancel</div>\n                    <div class=\"ui positive button\" (click)=\"deleteAuthorization()\">\n                        Remove\n                    </div>\n                </div>\n            </div>\n\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button cancelBtn\"\n                    (click)=\"returnToList()\">\n                Close\n            </button>\n            <button *ngSwitchCase=\"'edit-notsupported'\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelEditing()\">\n                Cancel\n            </button>\n            <button *ngSwitchCase=\"'details-edit-notsupported'\" class=\"ui large button secondaryBtn\"\n                    (click)=\"editAuthorization()\">\n                Edit\n            </button>\n            <button class=\"ui large button secondaryBtn\" onclick=\"$('#delete-auth-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../../list']\">\n                        Authorizations\n                    </a>\n                </span>\n                <span class=\"crumb\">{{authorization.PrincipalName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n\n                <div class=\"ui row\">\n                    <div class=\"ui sixteen wide column\">\n\n                        <div class=\"description\">Authorization records cannot be edited. Remove this record and recreate it if what you see here is not what you want.</div>\n\n                        <table>\n                            <tbody>\n                                <tr>\n                                    <td class=\"ctv-header\">Username</td>\n                                    <td class=\"ctv-value\">{{authorization.PrincipalName}}</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"ctv-header\">Local</td>\n                                    <td class=\"ctv-value\">{{(authorization.Local?'yes':'no')}}</td>\n                                </tr>\n                                <tr *ngSwitchCase=\"'details'\">\n                                    <td class=\"ctv-header\">Role</td>\n                                    <td class=\"ctv-value\">{{authorization.Role}}</td>\n                                </tr>\n                                <tr *ngSwitchCase=\"'details'\">\n                                    <td class=\"ctv-header\">Tenant Authorization</td>\n                                    <td class=\"ctv-value\">{{authorization.TenantName}}</td>\n                                </tr>\n                                <tr>\n                                    <td class=\"ctv-header\">Authorization UUID</td>\n                                    <td class=\"ctv-value\">{{authorization.AuthzUUID}}</td>\n                                </tr>\n                            </tbody>\n                        </table>\n\n                    </div>\n                </div>\n\n                <div class=\"ui row\" *ngSwitchCase=\"'edit-notsupported'\">\n                    <div class=\"ui sixteen wide column\">\n                        <form class=\"ui form\"\n                              role=\"form\"\n                              (submit)=\"saveAuthorization(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                            <div class=\"field\">\n                                <label for=\"role\">Role</label>\n                                <select class=\"ui dropdown\" id=\"role\" name=\"role\" [(ngModel)]=\"authorization.Role\">\n                                    <option value=\"admin\">Admin</option>\n                                    <option value=\"ops\">DevOps</option>\n                                </select>\n                            </div>\n\n                            <div class=\"field\">\n                                <label for=\"role\">Tenant</label>\n                                <select class=\"ui dropdown\" id=\"tenantname\" name=\"tenantname\" [(ngModel)]=\"authorization.TenantName\">\n                                    <option *ngFor=\"let tenant of tenants\">{{tenant.tenantName}}</option>\n                                </select>\n                            </div>\n\n                            <div class=\"ui grid\">\n                                <div class=\"right aligned sixteen wide column buttonRow\">\n                                    <button type=\"button\" class=\"ui large button cancelBtn\"\n                                            (click)=\"cancelEditing()\">\n                                        Cancel\n                                    </button>\n                                    <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                        Save\n                                    </button>\n                                </div>\n                            </div>\n\n                        </form>\n                    </div>\n                </div>\n\n            </div>\n\n        </div>\n    </div>\n</div>\n\n"

/***/ },
/* 739 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid \">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left floated left aligned eight wide column\">\n            <div class=\"content pageTitle\">Authorizations</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\">\n                <i class=\"add icon\"></i>\n                Create Authorization\n            </button>\n\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    Authorizations\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n\n                <ctv-search *ngIf=\"authorizations.length > 0\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n                <ctv-table #tableRef [defaultSortColumn]=\"'PrincipalName'\"\n                           [items]=\"authorizations\"\n                           (filtereditems)=\"filteredauth=$event;\"\n                           [size]=\"12\">\n                    <thead>\n                    <tr>\n                        <th><ctv-th [sortfield]=\"'PrincipalName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Username</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'Role'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Role</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'TenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Tenant Name</ctv-th></th>\n                        <th><ctv-th [sortfield]=\"'Local'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Local</ctv-th></th>\n                    </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"authorizations.length > 0\">\n                    <tr *ngFor=\"let auth of filteredauth\">\n                        <td><a [routerLink]=\"['../details',auth.AuthzUUID]\">{{auth.PrincipalName}}</a></td>\n                        <td>{{auth.Role}}</td>\n                        <td>{{auth.TenantName}}</td>\n                        <td>{{(auth.Local?'yes':'no')}}</td>\n                    </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"authorizations.length == 0\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"4\">No authorizations found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                    </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"(authorizations.length > 0) && !tableRef.count\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"4\">No records matched your filter criteria.</td>\n                    </tr>\n                    </tbody>\n\n                    <tfoot>\n                    <tr class=\"pagination\">\n                        <td colspan=\"4\">\n                            <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                             (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                             (prevChunk)=\"tableRef.showPrevChunk()\"\n                                             (nextChunk)=\"tableRef.showNextChunk()\">\n                            </ctv-tpagination>\n                        </td>\n                    </tr>\n                    </tfoot>\n                </ctv-table>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 740 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\">\n    <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n        <div class=\"ui loader\"></div>\n    </div>\n\n    <div><h4 class=\"ui header\">Global Operational State</h4></div>\n    <table>\n        <tbody>\n        <tr>\n            <td class=\"ctv-header\">Number of Networks</td>\n            <td class=\"ctv-value\">{{globalInspectStats.numNetworks}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">vlans in use</td>\n            <td class=\"ctv-value\">{{globalInspectStats.vlansInUse}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">vxlans in use</td>\n            <td class=\"ctv-value\">{{globalInspectStats.vxlansInUse}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Free vxlans start</td>\n            <td class=\"ctv-value\">{{globalInspectStats.freeVXLANsStart}}</td>\n        </tr>\n        <tr>\n            <td class=\"ctv-header\">Default Network</td>\n            <td class=\"ctv-value\">{{globalInspectStats.defaultNetwork}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <ctv-collapsible [title]=\"'Network Defaults'\">\n        <networksettingcomp [firstRunWiz]=\"false\" (updateNetDef)=\"updateNetworkSettings($event)\" [setting]=\"setting\"></networksettingcomp>\n    </ctv-collapsible>\n\n    <ctv-collapsible [title]=\"'ACI Settings'\">\n        <acisettingcomp [firstRunWiz]=\"false\" (updateAciDef)=\"updateAciSetting($event)\" [setting]=\"aciSetting\"></acisettingcomp>\n    </ctv-collapsible>\n\n</div>\n\n<ctv-error *ngIf=\"showServerError\" header=\"Error updating settings\" [error]=\"serverErrorMessage\">\n</ctv-error>\n"

/***/ },
/* 741 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Node</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../list']\">\n                        Nodes\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" role=\"form\"\n                  (submit)=\"createNode(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"six wide column field\">\n                            <div *ngIf=\"formRef.submitted\">\n                                <div [hidden]=\"formRef.valid\" class=\"ui negative message\">\n                                    <ul class=\"list\">\n                                        <li *ngIf=\"newHostname.errors?.required\">\n                                            <i>Host name</i> is required.\n                                        </li>\n                                        <li *ngIf=\"newRouterIP.errors?.required\">\n                                            <i>Router IP</i> is required.\n                                        </li>\n                                        <li *ngIf=\"newAS.errors?.required\">\n                                            <i>Autonomous system</i> value is required.\n                                        </li>\n                                    </ul>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"ui row\" style=\"margin-bottom: 20px;\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newHostname\">Host name</label>\n                                    <input type=\"text\" id=\"newHostname\" name=\"newHostname\"\n                                           [(ngModel)]=\"newNode['hostname']\"\n                                           placeholder=\"Enter host name\" required #newHostname=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n                    <h4 class=\"ui header\">BGP Settings</h4>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newRouterIP\">Router IP</label>\n                                    <input type=\"text\" id=\"newRouterIP\" name=\"newRouterIP\"\n                                           [(ngModel)]=\"newNode['routerip']\"\n                                           placeholder=\"Enter router IP\" required #newRouterIP=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newAS\">Autonomous system</label>\n                                    <input type=\"text\" id=\"newAS\" name=\"newAS\"\n                                           [(ngModel)]=\"newNode['as']\"\n                                           placeholder=\"Enter autonomous system\"\n                                           required\n                                           #newAS=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newNeighborIP\">Neighbor IP</label>\n                                    <input type=\"text\" id=\"newNeighborIP\" name=\"newNeighborIP\"\n                                           [(ngModel)]=\"newNode['neighbor']\"\n                                           placeholder=\"Enter neighbor IP\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newNeighborAS\">Neighbor autonomous system</label>\n                                    <input type=\"text\" id=\"newNeighborAS\" name=\"newNeighborAS\"\n                                           [(ngModel)]=\"newNode['neighbor-as']\"\n                                           placeholder=\"Enter neighbor autonomous system\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"right aligned six wide column\">\n                                <div class=\"buttonRow\">\n                                    <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                        Cancel\n                                    </button>\n                                    <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                        Create\n                                    </button>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n\n\n                    <ctv-error *ngIf=\"showServerError\" header=\"Error creating node\" [error]=\"serverErrorMessage\">\n                    </ctv-error>\n                </div>\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 742 */
/***/ function(module, exports) {

	module.exports = "<div [ngSwitch]=\"mode\" class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">\n                <span *ngSwitchCase=\"'details'\">{{node.hostname}}</span>\n                <span *ngSwitchCase=\"'edit'\">{{node.hostname}}</span>\n            </div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div id=\"delete-node-modal\" class=\"ui small modal\">\n                <div class=\"header\">Remove Node: {{node.hostname}}\n                </div>\n                <div class=\"content\">\n                    <p>Are you sure you want to remove this node?</p>\n                </div>\n                <div class=\"actions\">\n                    <div class=\"ui negative button\">Cancel</div>\n                    <div class=\"ui positive button\" (click)=\"deleteNode()\">\n                        Remove\n                    </div>\n                </div>\n            </div>\n\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelDetails()\">\n                Close\n            </button>\n            <button *ngSwitchCase=\"'edit'\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelEditing()\">\n                Cancel\n            </button>\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button secondaryBtn\"\n                    (click)=\"editNode()\">\n                Edit\n            </button>\n            <button class=\"ui large button secondaryBtn\" onclick=\"$('#delete-node-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../../list']\">\n                        Nodes\n                    </a>\n                </span>\n                <span class=\"crumb\">{{node.hostname}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui tabular menu\" *ngIf=\"mode=='details'\">\n                <a class=\"item\" [ngClass]=\"{active: infoselected}\" (click)=\"infoselected=true\">\n                    Details\n                </a>\n                <a class=\"item\" [ngClass]=\"{active: !infoselected}\" (click)=\"infoselected=false\">\n                    Stats\n                </a>\n            </div>\n\n            <nodeinfo *ngIf=\"infoselected\" [mode]=\"mode\"></nodeinfo>\n\n            <nodestats *ngIf=\"!infoselected\" [statkey]=\"statskey\"></nodestats>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 743 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui basic segment\">\n    <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n        <div class=\"ui loader\"></div>\n    </div>\n\n    <table>\n        <tbody>\n        <tr>\n            <td class=\"ctv-header\">Host Name</td>\n            <td class=\"ctv-value\">{{node.hostname}}</td>\n        </tr>\n        </tbody>\n    </table>\n\n    <div [ngSwitch]=\"mode\">\n        <form class=\"ui form\"\n              role=\"form\"\n              (submit)=\"saveNode(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n            <ctv-collapsible title=\"Node BGP Settings\">\n\n                <div *ngSwitchCase=\"'edit'\">\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n                            <div class=\"six wide column field\">\n                                <div *ngIf=\"formRef.submitted\">\n                                    <div [hidden]=\"formRef.valid\" class=\"ui negative message\">\n                                        <ul class=\"list\">\n                                            <li *ngIf=\"routerIP.errors?.required\">\n                                                Enter router IP\n                                            </li>\n                                            <li *ngIf=\"AS.errors?.required\">\n                                                Enter autonomous system\n                                            </li>\n                                        </ul>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"routerIP\">Router IP</label>\n                                    <input type=\"text\" id=\"routerIP\" name=\"routerIP\"\n                                           [(ngModel)]=\"node['routerip']\"\n                                           placeholder=\"Enter router IP\" required #routerIP=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"AS\">Autonomous System</label>\n                                    <input type=\"text\" id=\"AS\" name=\"AS\"\n                                           [(ngModel)]=\"node['as']\"\n                                           placeholder=\"Enter autonomous system\"\n                                           required #AS=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"neighborIP\">Neighbor IP</label>\n                                    <input type=\"text\" id=\"neighborIP\" name=\"neighborIP\"\n                                           [(ngModel)]=\"node['neighbor']\"\n                                           placeholder=\"Enter neighbor IP\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"left aligned six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"neighborAS\">Neighbor Autonomous System</label>\n                                    <input type=\"text\" id=\"neighborAS\" name=\"neighborAS\"\n                                           [(ngModel)]=\"node['neighbor-as']\"\n                                           placeholder=\"Enter neighbor autonomous system\">\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n\n                <div *ngSwitchCase=\"'details'\">\n                    <table class=\"ui very basic selectable table\">\n                        <tbody>\n                        <tr>\n                            <td class=\"ctv-header four wide column key\">Router IP</td>\n                            <td class=\"value\">{{node['routerip']}}</td>\n                        </tr>\n                        <tr>\n                            <td class=\"ctv-header four wide column key\">Autonomous System</td>\n                            <td class=\"value\">{{node['as']}}</td>\n                        </tr>\n                        <tr>\n                            <td class=\"ctv-header four wide column key\">Neighbor IP</td>\n                            <td class=\"value\">{{node['neighbor']}}</td>\n                        </tr>\n                        <tr>\n                            <td class=\"ctv-header four wide column key\">Neighbor Autonomous System</td>\n                            <td class=\"value\">{{node['neighbor-as']}}</td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n            </ctv-collapsible>\n\n            <div *ngSwitchCase=\"'edit'\" class=\"ui grid\" style=\"margin-top: 40px\">\n                <div class=\"ui row\">\n                    <div class=\"right aligned six wide column\">\n                        <button type=\"button\" class=\"ui large button cancelBtn\"\n                                (click)=\"cancelEditing()\">\n                            Cancel\n                        </button>\n                        <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                            Save\n                        </button>\n                    </div>\n                </div>\n            </div>\n\n            <ctv-error *ngIf=\"((showServerError) && (mode === 'edit'))\"\n                       header=\"Error saving node\"\n                       [error]=\"serverErrorMessage\">\n            </ctv-error>\n        </form>\n\n        <ctv-error *ngIf=\"((showServerError) && (mode === 'details'))\"\n                   header=\"Error deleting node\"\n                   [error]=\"serverErrorMessage\">\n        </ctv-error>\n    </div>\n\n</div>\n"

/***/ },
/* 744 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Nodes</div>\n        </div>\n\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\">\n                <i class=\"add icon\"></i>\n                Create Node\n            </button>\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">Nodes</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <ctv-search *ngIf=\"nodes\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n            <div class=\"ui basic segment ctvTable\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n                <ctv-table #tableRef [defaultSortColumn]=\"'hostname'\"\n                           [items]=\"nodes\"\n                           (filtereditems)=\"filterednodes=$event\"\n                           [size]=\"12\">\n                    <thead>\n                        <tr>\n                            <th><ctv-th [sortfield]=\"'hostname'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'routerip'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Router IP</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'as'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Autonomous system</ctv-th></th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"nodes\">\n                        <tr *ngFor=\"let node of nodes\">\n                            <td><a [routerLink]=\"['../details', node.key]\">{{node.hostname}}</a></td>\n                            <td>{{node.routerip}}</td>\n                            <td>{{node.as}}</td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!nodes\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"3\">No nodes found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"nodes && !tableRef.count\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"3\">No records matched your filter criteria.</td>\n                        </tr>\n                    </tbody>\n\n                    <tfoot>\n                        <tr class=\"pagination\">\n                            <td colspan=\"4\">\n                                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                                </ctv-tpagination>\n                            </td>\n                        </tr>\n                    </tfoot>\n                </ctv-table>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 745 */
/***/ function(module, exports) {

	module.exports = "\n    <div class=\"ui basic segment\" [ngClass]=\"{loading: showLoader}\">\n        <div>\n            <h4 class=\"ui header\">BGP Neighbors</h4>\n            <table class=\"ui very basic table\">\n                <thead>\n                <tr>\n                    <th>Neighbor IP</th>\n                    <th>Admin Status</th>\n                    <th>Neighbor Status</th>\n                    <th>Number of Routes</th>\n                </tr>\n                </thead>\n                <tbody *ngIf=\"inspect.Config['neighbor']\">\n                <tr>\n                    <!-- neighbor -->\n                    <td>{{inspect.Config['neighbor']}}</td>\n\n                    <!-- admin status -->\n                    <td *ngIf=\"inspect.Oper.adminStatus ===\n                            'ADMIN_STATE_UP'\"><i class=\"green up icon\"></i>Up\n                    </td>\n                    <td *ngIf=\"inspect.Oper.adminStatus ===\n                            'ADMIN_STATE_DOWN'\">Down\n                    </td>\n\n                    <!-- neighbor status -->\n                    <td *ngIf=\"inspect.Oper.neighborStatus === 'BGP_FSM_IDLE'\">\n                        <i class=\"red ban icon\"></i>Idle\n                    </td>\n                    <td *ngIf=\"inspect.Oper.neighborStatus === 'BGP_FSM_CONNECT'\">\n                        <i class=\"red ban icon\"></i>Connect\n                    </td>\n                    <td *ngIf=\"inspect.Oper.neighborStatus === 'BGP_FSM_ACTIVE'\">\n                        <i class=\"red ban icon\"></i>Active\n                    </td>\n                    <td *ngIf=\"inspect.Oper.neighborStatus === 'BGP_FSM_OPENSENT'\">\n                        <i class=\"red ban icon\"></i>Open sent\n                    </td>\n                    <td *ngIf=\"inspect.Oper.neighborStatus === 'BGP_FSM_OPENCONFIRM'\">\n                        <i class=\"red ban icon\"></i>Open confirm\n                    </td>\n                    <td *ngIf=\"inspect.Oper.neighborStatus ==='BGP_FSM_ESTABLISHED'\">\n                        <i class=\"green check icon\"></i>Established\n                    </td>\n\n                    <!-- number of routes -->\n                    <td>{{inspect.Oper.numRoutes}}</td>\n                </tr>\n                </tbody>\n\n                <tbody *ngIf=\"!inspect.Config['neighbor']\">\n                <tr class=\"noDataFound\"><td colspan=\"4\">No BGP neighbors found.</td></tr>\n                </tbody>\n\n            </table>\n\n            <div style=\"float:right\">\n                <ctv-search (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\"\n                                     placeholder=\"Search routes...\" size=\"30\"></ctv-search>\n            </div>\n\n            <h4 class=\"ui header\">BGP Routes</h4>\n\n            <ctv-table #tableRef [defaultSortColumn]=\"'route'\"\n                       [items]=\"routes\"\n                       (filtereditems)=\"filteredroutes=$event\">\n                <thead>\n                <tr>\n                    <th>\n                        <ctv-th [sortfield]=\"'routes'\" (sortdata)=\"tableRef.applysort($event)\"\n                                [sortobject]=\"tableRef.sortObj\">IP\n                        </ctv-th>\n                    </th>\n                    <th>\n                        <ctv-th>Next Hop</ctv-th>\n                    </th>\n                    <th>\n                        <ctv-th>Age</ctv-th>\n                    </th>\n                    <th>\n                        <ctv-th>Attributes</ctv-th>\n                    </th>\n                </tr>\n                </thead>\n\n                <tbody *ngIf=\"routes.length\">\n                    <tr *ngFor=\"let route of filteredroutes\">\n                        <td>{{route}}</td>\n                        <td></td>\n                        <td></td>\n                        <td></td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"!routes.length\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"4\">No routes found.</td>\n                    </tr>\n                </tbody>\n\n                <tbody *ngIf=\"routes.length && !filteredroutes.length\">\n                    <tr class=\"noDataFound\">\n                        <td colspan=\"4\">No records matched your filter criteria.</td>\n                    </tr>\n                </tbody>\n\n                <tfoot>\n                <tr class=\"pagination\">\n                    <td colspan=\"4\">\n                        <ctv-tpagination colspan=\"5\" [chunks]=\"tableRef.pageChunks\"\n                                         (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                         (prevChunk)=\"tableRef.showPrevChunk()\"\n                                         (nextChunk)=\"tableRef.showNextChunk()\"></ctv-tpagination>\n                    </td>\n                </tr>\n                </tfoot>\n            </ctv-table>\n        </div>\n    </div>\n"

/***/ },
/* 746 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\r\n    <div class=\"ui row pageHeader\">\r\n        <div class=\"left aligned eight wide column\">\r\n            <div class=\"content pageTitle\">Global Settings</div>\r\n        </div>\r\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\r\n    </div>\r\n    <div class=\"ui row breadcrumbRow\">\r\n        <div class=\"ui sixteen wide column\">\r\n            <div class=\"breadcrumbs\"></div>\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"ui row\" style=\"margin-bottom: 30px;\">\r\n        <div class=\"ui sixteen wide column\">\r\n\r\n            <div class=\"ui tabular menu\">\r\n                <a class=\"item\" [routerLink]=\"['organizations']\" routerLinkActive=\"active\">\r\n                    Tenants\r\n                </a>\r\n                <a class=\"item\" [routerLink]=\"['users']\" routerLinkActive=\"active\">\r\n                    User Management\r\n                </a>\r\n                <a class=\"item\" [routerLink]=\"['authorization']\" routerLinkActive=\"active\">\r\n                    Authorizations\r\n                </a>\r\n                <a class=\"item\" [routerLink]=\"['nodes']\" routerLinkActive=\"active\">\r\n                    Nodes (BGP)\r\n                </a>\r\n                <a class=\"item\" [routerLink]=\"['networks']\" routerLinkActive=\"active\">\r\n                    Network Defaults\r\n                </a>\r\n                <a class=\"item\" [routerLink]=\"['ldap']\" routerLinkActive=\"active\">\r\n                    LDAP Settings\r\n                </a>\r\n            </div>\r\n\r\n        </div>\r\n    </div>\r\n\r\n    <div class=\"ui row\">\r\n        <div class=\"ui sixteen wide column tabContent\">\r\n\r\n            <router-outlet></router-outlet>\r\n\r\n        </div>\r\n    </div>\r\n</div>\r\n"

/***/ },
/* 747 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create Tenant</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../list']\">\n                        Tenants\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"description\">Create a tenant by name. You can assign users into tenancies under Settings > Authorizations. </div>\n\n            <form id=\"organizationCreationForm\" name=\"organizationCreateCtrl.form\" class=\"ui form\" role=\"form\"\n                  (submit)=\"organizationCreateCtrl.createOrganization(organizationCreateFrom.valid)\" novalidate #organizationCreateFrom=\"ngForm\">\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"organizationCreateCtrl.showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n\n                    <div class=\"six wide field\">\n                        <div *ngIf=\"organizationCreateFrom.submitted\">\n                            <div [hidden]=\"organizationCreateFrom.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"newOrganizationName.errors?.required\">\n                                        Please enter a tenant name\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"ui six wide column field\">\n                        <label for=\"newOrganizationName\">Tenant name</label>\n                        <input type=\"text\" id=\"newOrganizationName\" name=\"newOrganizationName\"\n                               [(ngModel)]=\"organizationCreateCtrl.newOrganization.tenantName\"\n                               placeholder=\"Enter name\" required #newOrganizationName=\"ngModel\">\n                    </div>\n\n                    <div class=\"ui grid\">\n                        <div class=\"right aligned six wide column buttonRow\">\n                            <button type=\"button\" class=\"ui button large cancelBtn\" (click)=\"organizationCreateCtrl.cancelCreating()\">\n                                Cancel\n                            </button>\n                            <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                Create\n                            </button>\n                        </div>\n                    </div>\n\n                </div>\n\n            </form>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 748 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">{{organizationDetailsCtrl.organization.tenantName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui button large cancelBtn\" (click)=\"close()\">\n                Close\n            </button>\n            <button class=\"ui large button secondaryBtn\" onclick=\"$('#delete-organization-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n        </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../../list']\">\n                        Tenants\n                    </a>\n                </span>\n                <span class=\"crumb\">{{organizationDetailsCtrl.organization.tenantName}}</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"right aligned three wide column\">\n                <div id=\"delete-organization-modal\" class=\"ui small modal\">\n                    <div class=\"header\">Remove Tenant: {{organizationDetailsCtrl.organization.tenantName}}</div>\n                    <div class=\"content\">\n                        <p>Are you sure you want to remove this tenant?</p>\n                    </div>\n                    <div class=\"actions\">\n                        <div class=\"ui negative button\">No</div>\n                        <div class=\"ui positive button\" (click)=\"organizationDetailsCtrl.deleteOrganization()\">\n                            Yes\n                        </div>\n                    </div>\n                </div>\n            </div>\n\n            <div class=\"ui basic segment\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"organizationDetailsCtrl.showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ctvTable\">\n                    <table>\n                        <tbody>\n                        <tr>\n                            <td class=\"ctv-header\">Name</td>\n                            <td class=\"ctv-value\">{{organizationDetailsCtrl.organization.tenantName}}</td>\n                        </tr>\n                        </tbody>\n                    </table>\n                </div>\n\n                <ctv-error *ngIf=\"organizationDetailsCtrl.showServerError\" header=\"Error deleting organization\"\n                           [error]=\"organizationDetailsCtrl.serverErrorMessage\">\n                </ctv-error>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 749 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Tenants</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\" *auth=\"'admin'\">\n                <i class=\"add icon\"></i>\n                Create Tenant\n            </button>\n        </div>\n    </div>\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    Tenants\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"description\"><i>Tenancies</i> are the basic organizational container for all other assets. Create tenanats then assign users to them, and create network and other objects per tenant. Users assigned to a tenant (or multiple tenants) will be allowed to view and use their authorized tenancy resources only.</div>\n\n            <ctv-search *ngIf=\"organizationsListCtrl.organizations\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n            <div class=\"ui basic segment ctvTable\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"organizationsListCtrl.showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n                <ctv-table #tableRef [defaultSortColumn]=\"'tenantName'\"\n                           [items]=\"organizationsListCtrl.organizations\"\n                           (filtereditems)=\"organizationsListCtrl.filteredorganizations=$event\"\n                           [size]=\"12\">\n                    <thead>\n                        <tr>\n                            <th><ctv-th [sortfield]=\"'tenantName'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Name</ctv-th></th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"organizationsListCtrl.organizations\">\n                        <tr *ngFor=\"let organization of organizationsListCtrl.filteredorganizations\">\n                            <td><a [routerLink]=\"['../details', organization.key]\">{{organization.tenantName}}</a></td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!organizationsListCtrl.organizations\">\n                        <tr class=\"noDataFound\">\n                            <td>No tenants found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"organizationsListCtrl.organizations && !tableRef.count\">\n                        <tr class=\"noDataFound\"><td>No records matched your filter criteria.</td></tr>\n                    </tbody>\n\n                    <tfoot>\n                        <tr class=\"pagination\">\n                            <td>\n                                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                                </ctv-tpagination>\n                            </td>\n                        </tr>\n                    </tfoot>\n                </ctv-table>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 750 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">Create User</div>\n        </div>\n        <div class=\"right aligned eight wide column\">&nbsp;</div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../list']\">\n                        User Management\n                    </a>\n                </span>\n                <span class=\"crumb\">Create</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <form class=\"ui form\" role=\"form\"\n                  (submit)=\"createUser(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <div class=\"ui basic segment\">\n\n                    <div class=\"six wide field\">\n                        <div *ngIf=\"formRef.submitted\">\n                            <div [hidden]=\"formRef.valid\" class=\"ui negative message\">\n                                <ul class=\"list\">\n                                    <li *ngIf=\"newUserName.errors?.required\">\n                                        Please enter user name\n                                    </li>\n                                    <li *ngIf=\"newUserPassword.errors?.required\">\n                                        Please enter user password\n                                    </li>\n                                </ul>\n                            </div>\n                        </div>\n                    </div>\n\n                    <div class=\"description\">Create user accounts here. You can assign users into tenancies, and define their role, under Settings > Authorizations. </div>\n\n                    <div class=\"ui sixteen column grid\">\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newUserName\">Username</label>\n                                    <input type=\"text\" id=\"newUserName\" name=\"newUserName\"\n                                           [(ngModel)]=\"newUser.username\"\n                                           placeholder=\"Enter name\" required #newUserName=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newUserPassword\">Password</label>\n                                    <input type=\"password\" id=\"newUserPassword\" name=\"newUserPassword\"\n                                           [(ngModel)]=\"newUser.password\"\n                                           placeholder=\"Enter password\" required #newUserPassword=\"ngModel\">\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newFirstName\">First name</label>\n                                    <input type=\"text\" id=\"newFirstName\" name=\"newFirstName\"\n                                           [(ngModel)]=\"newUser.first_name\"\n                                           placeholder=\"Enter first name\" #newFirstName=\"ngModel\">\n                                </div>\n                            </div>\n                        </div>\n                        <div class=\"ui row\">\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newLastName\">Last name</label>\n                                    <input type=\"text\" id=\"newLastName\" name=\"newLastName\"\n                                           [(ngModel)]=\"newUser.last_name\"\n                                           placeholder=\"Enter last name\"  #newLastName=\"ngModel\">\n                                </div>\n                            </div>\n\n                        </div>\n                        <div class=\"ui row\">\n\n                            <div class=\"ui six wide column\">\n                                <div class=\"field\">\n                                    <label for=\"newUserDisabled\">&nbsp;<br>\n                                    <input type=\"checkbox\" id=\"newUserDisabled\" name=\"newUserDisabled\" tabindex=\"0\" class=\"alignLabel\"\n                                               [(ngModel)]=\"newUser.disable\">\n                                        Disabled\n                                    </label>\n                                </div>\n                            </div>\n\n                        </div>\n\n                        <div class=\"ui row\">\n                            <div class=\"right aligned six wide column buttonRow\">\n\n                                <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelCreating()\">\n                                    Cancel\n                                </button>\n                                <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                    Create\n                                </button>\n\n                            </div>\n                        </div>\n                    </div>\n\n                    <ctv-error *ngIf=\"showServerError\" header=\"Error creating user\" [error]=\"serverErrorMessage\">\n                    </ctv-error>\n\n                </div>\n            </form>\n\n         </div>\n    </div>\n</div>\n"

/***/ },
/* 751 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid pageHeader\">\n    <div [ngSwitch]=\"userDetailsCtrl.mode\" class=\"ui row\">\n        <div class=\"left aligned eight wide column\">\n            <div *ngSwitchCase=\"'details'\" class=\"content pageTitle\">{{userDetailsCtrl.user.userName}}</div>\n            <div *ngSwitchCase=\"'edit'\" class=\"content pageTitle\">{{userDetailsCtrl.user.userName}}</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n\n            <div id=\"delete-user-modal\" class=\"ui small modal\">\n                <div class=\"header\">Remove User: {{user.userName}}\n                </div>\n                <div class=\"content\">\n                    <p>Are you sure you want to remove this user?</p>\n                </div>\n                <div class=\"actions\">\n                    <div class=\"ui negative button\">No</div>\n                    <div class=\"ui positive button\" (click)=\"deleteUser()\">\n                        Yes\n                    </div>\n                </div>\n            </div>\n\n            <button *ngSwitchCase=\"'edit'\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelEditing()\">\n                Cancel\n            </button>\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button cancelBtn\"\n                    (click)=\"cancelDetails()\">\n                Close\n            </button>\n            <button *ngSwitchCase=\"'details'\" class=\"ui large button secondaryBtn\"\n                    (click)=\"editUser()\">\n                Edit\n            </button>\n            <button class=\"ui blue large button secondaryBtn\" onclick=\"$('#delete-user-modal').modal('show')\">\n                <i class=\"trash icon\"></i>\n                Remove\n            </button>\n\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">\n                    <a [routerLink]=\"['../../list']\">\n                        User Management\n                    </a>\n                </span>\n                <span class=\"crumb\">\n                    {{user.userName}}\n                </span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\"  [ngSwitch]=\"userDetailsCtrl.mode\">\n        <div class=\"ui sixteen wide column\">\n\n            <div class=\"ui basic segment\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <table>\n                    <tbody>\n                        <tr>\n                            <td class=\"ctv-header\">Username</td>\n                            <td class=\"ctv-value\">{{user.username}}</td>\n                        </tr>\n                        <tr *ngSwitchCase=\"'details'\">\n                            <td class=\"ctv-header\">Firstname</td>\n                            <td class=\"ctv-value\">{{user.first_name}}</td>\n                        </tr>\n                        <tr *ngSwitchCase=\"'details'\">\n                            <td class=\"ctv-header\">Lastname</td>\n                            <td class=\"ctv-value\">{{user.last_name}}</td>\n                        </tr>\n                        <tr *ngSwitchCase=\"'details'\">\n                            <td class=\"ctv-header\">Disabled</td>\n                            <td class=\"ctv-value\">{{user.disable?'Yes':'No'}}</td>\n                        </tr>\n                    </tbody>\n                </table>\n\n                <div *ngSwitchCase=\"'edit'\">\n                    <form class=\"ui form\"\n                          role=\"form\"\n                          (submit)=\"saveUser(formRef.valid)\" novalidate #formRef=\"ngForm\">\n\n                        <div class=\"ui sixteen column grid\">\n                            <div class=\"ui row\">\n                                <div class=\"ui six wide column\">\n                                    <div class=\"field\">\n                                        <label for=\"firstname\">First Name</label>\n                                        <input type=\"text\" id=\"firstname\" name=\"firstname\"\n                                               [(ngModel)]=\"user.first_name\"\n                                               placeholder=\"Enter First Name\" #firstname=\"ngModel\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"ui row\">\n                                <div class=\"ui six wide column\">\n                                    <div class=\"field\">\n                                        <label for=\"lastname\">Last Name</label>\n                                        <input type=\"text\" id=\"lastname\" name=\"lastname\"\n                                               [(ngModel)]=\"user.last_name\"\n                                               placeholder=\"Enter Last Name\" #lastname=\"ngModel\">\n                                    </div>\n                                </div>\n                            </div>\n                            <div class=\"ui row\">\n                                <div class=\"ui six wide column\">\n                                    <div class=\"field\">\n                                        <label for=\"password\">Password</label>\n                                        <input type=\"password\" id=\"password\" name=\"password\"\n                                               [(ngModel)]=\"user.password\"\n                                               placeholder=\"Reset Password\" #password=\"ngModel\">\n                                    </div>\n                                </div>\n\n                            </div>\n                            <div class=\"ui row\">\n\n                                <div class=\"ui six wide column\">\n                                    <label>&nbsp;<br>\n                                        <input type=\"checkbox\" name=\"userdisabled\" tabindex=\"0\" class=\"alignLabel\"\n                                                   [(ngModel)]=\"user.disable\">\n                                            Disabled\n                                    </label>\n                                </div>\n\n                            </div>\n                            <div class=\"ui row\">\n\n                                <div class=\"right aligned six wide column buttonRow\">\n                                    <button type=\"button\" class=\"ui large button cancelBtn\" (click)=\"cancelEditing()\">\n                                        Cancel\n                                    </button>\n                                    <button type=\"submit\" class=\"ui blue large button primaryBtn\">\n                                        Save\n                                    </button>\n                                </div>\n\n                            </div>\n\n                        </div>\n                    </form>\n                </div>\n\n            </div>\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 752 */
/***/ function(module, exports) {

	module.exports = "<div class=\"ui sixteen column grid\">\n    <div class=\"ui row pageHeader\">\n        <div class=\"left aligned eight wide column\">\n            <div class=\"content pageTitle\">User Management</div>\n        </div>\n        <div class=\"right aligned eight wide column\">\n            <button class=\"ui blue large button primaryBtn\" (click)=\"create()\">\n                <i class=\"add icon\"></i>\n                Create User\n            </button>\n        </div>\n    </div>\n\n    <div class=\"ui row breadcrumbRow\">\n        <div class=\"ui sixteen wide column\">\n            <div class=\"breadcrumbs\">\n                <span class=\"crumb\">User Management</span>\n            </div>\n        </div>\n    </div>\n\n    <div class=\"ui row\">\n        <div class=\"ui sixteen wide column\">\n\n            <ctv-search *ngIf=\"users\" (searchTextChange)=\"tableRef.showChunk(tableRef.table.pageNo,$event);\" [count]=\"tableRef.count\"></ctv-search>\n\n            <div class=\"ui basic segment ctvTable\">\n                <div class=\"ui active inverted dimmer\" *ngIf=\"showLoader\">\n                    <div class=\"ui loader\"></div>\n                </div>\n\n                <ctv-table #tableRef [defaultSortColumn]=\"'username'\"\n                           [items]=\"users\"\n                           (filtereditems)=\"filteredusers=$event\"\n                           [size]=\"12\">\n                    <thead>\n                        <tr>\n                            <th><ctv-th [sortfield]=\"'username'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Username</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'first_name'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">First Name</ctv-th></th>\n                            <th><ctv-th [sortfield]=\"'last_name'\" (sortdata)=\"tableRef.applysort($event)\" [sortobject]=\"tableRef.sortObj\">Last Name</ctv-th></th>\n                        </tr>\n                    </thead>\n\n                    <tbody *ngIf=\"users\">\n                        <tr *ngFor=\"let user of filteredusers\">\n                            <td><a [routerLink]=\"['../details', user.username]\">{{user.username}}</a></td>\n                            <td>{{user.first_name}}</td>\n                            <td>{{user.last_name}}</td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"!users\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"3\">No users found. Would you like to <a href=\"javascript: void(0);\" (click)=\"create()\">create one?</a></td>\n                        </tr>\n                    </tbody>\n\n                    <tbody *ngIf=\"users && !tableRef.count\">\n                        <tr class=\"noDataFound\">\n                            <td colspan=\"3\">No records matched your filter criteria.</td>\n                        </tr>\n                    </tbody>\n\n                    <tfoot>\n                        <tr class=\"pagination\">\n                            <td colspan=\"3\">\n                                <ctv-tpagination [chunks]=\"tableRef.pageChunks\"\n                                                 (showPage)=\"tableRef.showChunk($event, tableRef.table.searchText)\"\n                                                 (prevChunk)=\"tableRef.showPrevChunk()\"\n                                                 (nextChunk)=\"tableRef.showNextChunk()\">\n                                </ctv-tpagination>\n                            </td>\n                        </tr>\n                    </tfoot>\n                </ctv-table>\n            </div>\n\n        </div>\n    </div>\n</div>\n"

/***/ },
/* 753 */,
/* 754 */,
/* 755 */,
/* 756 */,
/* 757 */,
/* 758 */,
/* 759 */,
/* 760 */,
/* 761 */,
/* 762 */,
/* 763 */,
/* 764 */,
/* 765 */,
/* 766 */,
/* 767 */,
/* 768 */,
/* 769 */,
/* 770 */,
/* 771 */,
/* 772 */,
/* 773 */,
/* 774 */,
/* 775 */,
/* 776 */,
/* 777 */,
/* 778 */,
/* 779 */,
/* 780 */,
/* 781 */,
/* 782 */,
/* 783 */,
/* 784 */,
/* 785 */,
/* 786 */,
/* 787 */,
/* 788 */,
/* 789 */,
/* 790 */,
/* 791 */,
/* 792 */,
/* 793 */,
/* 794 */,
/* 795 */,
/* 796 */,
/* 797 */,
/* 798 */,
/* 799 */,
/* 800 */,
/* 801 */,
/* 802 */,
/* 803 */,
/* 804 */,
/* 805 */,
/* 806 */,
/* 807 */,
/* 808 */,
/* 809 */,
/* 810 */,
/* 811 */,
/* 812 */,
/* 813 */,
/* 814 */,
/* 815 */,
/* 816 */,
/* 817 */,
/* 818 */,
/* 819 */,
/* 820 */,
/* 821 */,
/* 822 */,
/* 823 */,
/* 824 */,
/* 825 */,
/* 826 */,
/* 827 */,
/* 828 */,
/* 829 */,
/* 830 */,
/* 831 */,
/* 832 */,
/* 833 */,
/* 834 */,
/* 835 */,
/* 836 */,
/* 837 */,
/* 838 */,
/* 839 */,
/* 840 */,
/* 841 */,
/* 842 */,
/* 843 */,
/* 844 */,
/* 845 */,
/* 846 */,
/* 847 */,
/* 848 */,
/* 849 */,
/* 850 */,
/* 851 */,
/* 852 */,
/* 853 */,
/* 854 */,
/* 855 */,
/* 856 */,
/* 857 */,
/* 858 */,
/* 859 */,
/* 860 */,
/* 861 */,
/* 862 */,
/* 863 */,
/* 864 */,
/* 865 */,
/* 866 */,
/* 867 */,
/* 868 */,
/* 869 */,
/* 870 */,
/* 871 */,
/* 872 */,
/* 873 */,
/* 874 */,
/* 875 */,
/* 876 */,
/* 877 */,
/* 878 */,
/* 879 */,
/* 880 */,
/* 881 */,
/* 882 */,
/* 883 */,
/* 884 */,
/* 885 */,
/* 886 */,
/* 887 */,
/* 888 */,
/* 889 */,
/* 890 */,
/* 891 */,
/* 892 */,
/* 893 */,
/* 894 */,
/* 895 */,
/* 896 */,
/* 897 */,
/* 898 */,
/* 899 */,
/* 900 */,
/* 901 */,
/* 902 */,
/* 903 */,
/* 904 */,
/* 905 */,
/* 906 */,
/* 907 */,
/* 908 */,
/* 909 */,
/* 910 */,
/* 911 */,
/* 912 */,
/* 913 */,
/* 914 */,
/* 915 */,
/* 916 */,
/* 917 */,
/* 918 */,
/* 919 */,
/* 920 */,
/* 921 */,
/* 922 */,
/* 923 */,
/* 924 */,
/* 925 */,
/* 926 */,
/* 927 */,
/* 928 */,
/* 929 */,
/* 930 */,
/* 931 */,
/* 932 */,
/* 933 */,
/* 934 */,
/* 935 */,
/* 936 */,
/* 937 */,
/* 938 */,
/* 939 */,
/* 940 */,
/* 941 */,
/* 942 */,
/* 943 */,
/* 944 */,
/* 945 */,
/* 946 */,
/* 947 */,
/* 948 */,
/* 949 */,
/* 950 */,
/* 951 */,
/* 952 */,
/* 953 */,
/* 954 */,
/* 955 */,
/* 956 */,
/* 957 */,
/* 958 */,
/* 959 */,
/* 960 */,
/* 961 */,
/* 962 */,
/* 963 */,
/* 964 */,
/* 965 */,
/* 966 */,
/* 967 */,
/* 968 */,
/* 969 */,
/* 970 */,
/* 971 */,
/* 972 */,
/* 973 */,
/* 974 */,
/* 975 */,
/* 976 */,
/* 977 */,
/* 978 */,
/* 979 */,
/* 980 */,
/* 981 */,
/* 982 */,
/* 983 */,
/* 984 */,
/* 985 */,
/* 986 */,
/* 987 */,
/* 988 */,
/* 989 */,
/* 990 */,
/* 991 */,
/* 992 */,
/* 993 */,
/* 994 */,
/* 995 */,
/* 996 */,
/* 997 */,
/* 998 */,
/* 999 */,
/* 1000 */,
/* 1001 */,
/* 1002 */,
/* 1003 */,
/* 1004 */,
/* 1005 */,
/* 1006 */,
/* 1007 */,
/* 1008 */,
/* 1009 */,
/* 1010 */,
/* 1011 */,
/* 1012 */,
/* 1013 */,
/* 1014 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(645);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 1015 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(646);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 1016 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(647);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 1017 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(648);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 1018 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(649);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 1019 */
/***/ function(module, exports, __webpack_require__) {

	
	        var result = __webpack_require__(650);

	        if (typeof result === "string") {
	            module.exports = result;
	        } else {
	            module.exports = result.toString();
	        }
	    

/***/ },
/* 1020 */
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
/* 1021 */
/***/ function(module, exports) {

	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	}

/***/ }
]);
//# sourceMappingURL=main.map