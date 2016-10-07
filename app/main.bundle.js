webpackJsonp([2],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/**
	 * Created by vjain3 on 10/6/16.
	 */
	var upgrade_1 = __webpack_require__(124);
	var app_module_1 = __webpack_require__(198);
	var upgradeAdapter = new upgrade_1.UpgradeAdapter(app_module_1.AppModule);
	upgradeAdapter.bootstrap(document.documentElement, ['contivApp']);
	

/***/ },

/***/ 198:
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
	var core_1 = __webpack_require__(24);
	var platform_browser_1 = __webpack_require__(68);
	var AppModule = (function () {
	    function AppModule() {
	    }
	    AppModule = __decorate([
	        core_1.NgModule({
	            imports: [
	                platform_browser_1.BrowserModule
	            ]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], AppModule);
	    return AppModule;
	}());
	exports.AppModule = AppModule;
	

/***/ }

});
//# sourceMappingURL=main.map