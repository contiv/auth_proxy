
'use strict';

describe('contiv.visualization module', function () {
	var envVariables = {
		"nodes": [
			{
				"name":"Web",
				"id": 0
			},
			{
				"name":"Passenger App Container",
				"id": 1
			},
			{
				"name":"Passenger App Container",
				"id": 2
			},
			{
				"name":"Passenger Db Container",
				"id": 3
			},
			{
				"name":"Driver App Container",
				"id": 4
			},
			{
				"name":"Driver Db Container",
				"id": 5
			}
		],
		"links": [
			{
				"source": 0,
				"target": 1,
				"weight": 5
			},
			{
				"source": 1,
				"target": 0,
				"weight": 5
			},
			{
				"source": 0,
				"target": 2,
				"weight": 3
			},
			{
				"source": 1,
				"target": 3,
				"weight": 2
			},
			{
				"source": 2,
				"target": 3,
				"weight": 3
			},
			{
				"source": 0,
				"target": 4,
				"weight": 6
			},
			{
				"source": 4,
				"target": 5,
				"weight": 10
			}
		]
	};
	var children_struct = {};
	children_struct.topLevel = ["Web", "Passenger", "Driver"];
	children_struct["Passenger"] = ["Passenger App", "Passenger Db"];
	children_struct["Driver"] = ["Driver App", "Driver Db"];
	children_struct["Passenger App"] = [1, 2];
	children_struct["Passenger Db"] = [3];
	children_struct["Driver App"] = [4];
	children_struct["Driver Db"] = [5];

	var ancestors_struct = {};
	ancestors_struct["Passenger App Container"] = ["Passenger App", "Passenger"];
	ancestors_struct["Passenger Db Container"] = ["Passenger Db", "Passenger"];
	ancestors_struct["Driver App Container"] = ["Driver App", "Driver"];
	ancestors_struct["Driver Db Container"] = ["Driver Db", "Driver"];
	ancestors_struct["Passenger App"] = ["Passenger"];
	ancestors_struct["Passenger Db"] = ["Passenger"];
	ancestors_struct["Driver App"] = ["Driver"];
	ancestors_struct["Driver Db"] = ["Driver"];
	ancestors_struct["Passenger"] = [null];
	ancestors_struct["Driver"] = [null];
	ancestors_struct["Web"] = [null];

	var structureData = {ancestors_struct:ancestors_struct, 
			children_struct:children_struct};

	var $compile, $rootScope, directiveElem, $httpBackend;

	var params = {
                    pretty:true,
                    db:"telegraf",
                    q:"SELECT BytesIn, BytesOut, EndpointIP, ProviderIP FROM httpjson_svcstats WHERE time > now() - 1m GROUP BY * LIMIT 1"
                };

    beforeEach(module('ui.router'));

    beforeEach(module('contiv.test.directives'));

    beforeEach(module('contiv.visualization'));

    beforeEach(inject(function (_$httpBackend_) {
        $httpBackend = _$httpBackend_;
        $httpBackend.when('GET', ContivGlobals.VISUALIZATION_ENDPOINT + 'influx/query', params).respond(envVariables);
        $httpBackend.when('GET', ContivGlobals.VISUALIZATION_ENDPOINT + 'data/services').respond(structureData);
    }));

    function getCompiledElement(){
	  	var element = angular.element('<div visualization-graph></div>');
	  	var compiledElement = $compile(element)($rootScope);
	  	$rootScope.$digest();
	  	return compiledElement;
	}

    beforeEach(inject(function(_$rootScope_, _$compile_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_.$new();
        directiveElem = getCompiledElement();
     	$rootScope.nodes = envVariables.nodes;
     	$rootScope.links = envVariables.links;
     	$rootScope.children_struct = children_struct;
     	$rootScope.ancestors_struct = ancestors_struct;
     	$rootScope.$digest();
    }));

    it('should have svg element', function () {
	  	var svgElement = directiveElem.find('svg');
	  	var backButton = directiveElem.find('#backButton');
	  	var graphTitle = directiveElem.find('#graph-title');
	  	expect(svgElement).toBeDefined();
	  	expect(backButton).toBeDefined();
	  	expect(graphTitle).toBeDefined();
	  	expect($rootScope.visualizationGraph).toBeDefined();
	});

	it('testing on destroy', function() {
		//adding test binding
		var graph = $rootScope.visualizationGraph;
		var destroyFired = false;
		graph.destroy = function() {
			destroyFired = true;
		};
		$rootScope.$destroy();
		expect(destroyFired).toBe(true);
	});
});



