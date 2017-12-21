'use strict';

describe('SplitJoinNodePolicy', function(){
    var policyFactory;
    var graph;
    var VisualizerNode;
    var envVariables;
    var children_struct;
    var ancestors_struct;
    beforeEach(function(){
        envVariables = {
            "nodes": [
                {
                    "name":"Web",
                    "id": 0,
                    "ancestors": null
                },
                {
                    "name":"Passenger App Container",
                    "id": 1,
                    "parent": "Passenger App",
                    "ancestors":"Passenger App, Passenger"
                },
                {
                    "name":"Passenger App Container",
                    "id": 2,
                    "parent": "Passenger App",
                    "ancestors":"Passenger App, Passenger"
                },
                {
                    "name":"Passenger Db Container",
                    "id": 3,
                    "parent": "Passenger Db",
                    "ancestors":"Passenger Db, Passenger"
                },
                {
                    "name":"Driver App Container",
                    "id": 4,
                    "parent": "Driver App",
                    "ancestors":"Driver App, Driver"
                },
                {
                    "name":"Driver Db Container",
                    "id": 5,
                    "parent": "Driver Db",
                     "ancestors":"Driver Db, Driver"
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
        children_struct = {};
        children_struct.topLevel = ["Web", "Passenger", "Driver"];
        children_struct["Passenger"] = ["Passenger App", "Passenger Db"];
        children_struct["Driver"] = ["Driver App", "Driver Db"];
        children_struct["Passenger App"] = [1, 2];
        children_struct["Passenger Db"] = [3];
        children_struct["Driver App"] = [4];
        children_struct["Driver Db"] = [5];

        ancestors_struct = {};
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
        module('contiv.graph');
        // module('NodeModule');
        inject( function($injector){
            // VisualizerNode = $injector.get('VisualizerNode');
            policyFactory = $injector.get('SplitJoinNodePolicy');
        });
        //creating mock for testing
        graph = {
                    state:{},
                    findNodeById: function(id) {
                        var thisGraph = this;
                        for (var i = 0; i < thisGraph.nodes.length; i++) {
                            if (id === thisGraph.nodes[i].id) {
                                return thisGraph.nodes[i];
                            }
                        } 
                    },
                    consts:{radiusDecay: .9},
                    nodes: [],
                    links: [],
                    spliceLinksForNode: function(){},
                    dataSource: {
                        children_struct: children_struct,
                        ancestors_struct: ancestors_struct,
                        getFlowBetweenSet: function(nameset) {
                        if (_.includes(nameset, "Web") && 
                            _.includes(nameset, "Passenger App") && 
                            _.includes(nameset, "Passenger Db") &&
                            _.includes(nameset, "Driver")) {
                            return {nodeData: [
                                        {id:'Web'}, 
                                        {id:'Passenger App'},
                                        {id:'Passenger Db'},
                                        {id:'Driver'}]
                            };
                        } else if (_.includes(nameset, "Web") && 
                            _.includes(nameset, "Passenger") && 
                            _.includes(nameset, "Driver Db") &&
                            _.includes(nameset, "Driver App")) {
                            return {nodeData: [
                                        {id:'Web'}, 
                                        {id:'Passenger'},
                                        {id:'Driver Db'},
                                        {id:'Driver App'}]
                            };
                        } else if (_.includes(nameset, "Web") && 
                            _.includes(nameset, "Passenger App") && 
                            _.includes(nameset, "Passenger Db") &&
                            _.includes(nameset, "Driver Db") &&
                            _.includes(nameset, "Driver App")) {
                            return {nodeData: [
                                        {id:'Web'}, 
                                        {id:'Passenger App'},
                                        {id:'Passenger Db'},
                                        {id:'Driver Db'},
                                        {id:'Driver App'}]
                            };
                        } else if (_.includes(nameset, "Web") && 
                            _.includes(nameset, 1) && 
                            _.includes(nameset, 2) && 
                            _.includes(nameset, "Passenger Db") &&
                            _.includes(nameset, "Driver")) {
                            return {nodeData: [
                                        {id:'Web'}, 
                                        {id:1},
                                        {id:2},
                                        {id:'Passenger Db'},
                                        {id:'Driver'}]
                            };
                        } else if (_.includes(nameset, "Web") &&
                            _.includes(nameset, "Passenger") &&
                            _.includes(nameset, "Driver")) {
                            return {nodeData: [
                                        {id:'Web'},
                                        {id:'Passenger'},
                                        {id:'Driver'}]
                            };
                        }
                    },
                    processLinkData:function(){} },
                    initNodes: function(){},
                    initLinks: function(){},
                    drag: {
                        on: function(){}
                    },
                    
                    circles:{
                        nodes : [],
                        filter:function(f){
                            var nodematch = _.filter(this.nodes, f);
                            return {
                                classed: function(className, set) {
                                    _.forEach(nodematch, function(n){
                                        n.classed(className, set); 
                                    });
                                }
                            }
                        },
                        classed: function(className, set) {
                            _.forEach(this.nodes, function(n){
                                n.classed(className, set); 
                            })
                        }
                    }
                    
                };
    });

    function checkSplitNode(policy, graph, node, expectation) {
        policy.splitNode(node); 
        for (var i = 0; i < graph.nodes.length; i++) {
            if (expectation[graph.nodes[i].id] === undefined) {
                console.log(graph.nodes[i].id, expectation);
            }
            expect(expectation[graph.nodes[i].id]).toBe(true);
        }
        var count = 0;
        for (var k in expectation) {
            count++;
        }
        expect(graph.nodes.length).toBe(count)
    }

    function checkMultiSplit(policy, graph, nodes, expectation) {
        policy.splitMultipleNodes(nodes); 
        for (var i = 0; i < graph.nodes.length; i++) {
            if (expectation[graph.nodes[i].id] === undefined) {
                console.log(graph.nodes[i].id, expectation);
            }
            expect(expectation[graph.nodes[i].id]).toBe(true);
        }
        var count = 0;
        for (var k in expectation) {
            count++;
        }
        expect(graph.nodes.length).toBe(count)
    }

    function checkJoinNode(policy, graph, node, expectation) {
        policy.joinNode(node);  
        for (var i = 0; i < graph.nodes.length; i++) {
            if (expectation[graph.nodes[i].id] === undefined) {
                console.log(graph.nodes[i].id, expectation);
            }
            expect(expectation[graph.nodes[i].id]).toBe(true);
        }
        var count = 0;
        for (var k in expectation) {
            count++;
        }
        expect(graph.nodes.length).toBe(count)
    }

    function checkMultiJoin(policy, graph, nodes, expectation) {
        policy.joinMultipleNode(nodes);  
        for (var i = 0; i < graph.nodes.length; i++) {
            if (expectation[graph.nodes[i].id] === undefined) {
                console.log(graph.nodes[i].id, expectation);
            }
            expect(expectation[graph.nodes[i].id]).toBe(true);
        }
        var count = 0;
        for (var k in expectation) {
            count++;
        }
        expect(graph.nodes.length).toBe(count)
    }

    
    it('Checking inital values', function(){
        var policy = new policyFactory.Policy("test");
        expect(policy.policyName).toBe("SplitJoinNodePolicy");
        expect(policy.graph).toBe(null);
        expect(policy.initialized).toBe(false);
    });


    it('splitting and joining nodes', function() {
        var expectation, node;
        var policy = new policyFactory.Policy();
        policy.initialize(graph);
        //catching post event so updategraph isn't run
        policy.splitNodeEvent = function(){};
        policy.joinNodeEvent = function(){};
        policy.splitMultipleNodesEvent = function(){};
        policy.joinMultipleNodesEvent = function(){};
        graph.nodes = [{id:'Web', ancestors:[]}, 
                        {id:'Passenger', ancestors:[]},
                        {id:'Driver', ancestors:[]}];

        // basic splitting
        node = graph.findNodeById("Passenger");
        expectation = {"Web":true,
                        "Passenger App": true,
                        "Passenger Db": true,
                        "Driver": true};
        // spyOn(graph.dataSource, ['getFlowBetweenSet'])
        //     .and.returnValue({nodeData: [{id:'Web'}, 
        //                                 {id:'Passenger App'},
        //                                 {id:'Passenger Db'},
        //                                 {id:'Driver'}]
        //                     });
                            
        checkSplitNode(policy, graph, node, expectation);

        // can't split a node that has no children
        node = graph.findNodeById("Web");
        checkSplitNode(policy, graph, node, expectation);

        //checking second level split
        node = graph.findNodeById("Passenger App");
        expectation = {"Web":true,
                        "1": true,
                        "2": true,
                        "Passenger Db": true,
                        "Driver": true};

        checkSplitNode(policy, graph, node, expectation); 
        //joining passenger db -- will join the passenger
        //app container as well
        node = graph.findNodeById("Passenger Db");
        expectation = {"Web":true,
                        "Passenger": true,
                        "Driver": true};
        checkJoinNode(policy, graph, node, expectation);

        // can't join a node that has no parent
        node = graph.findNodeById("Passenger");
        checkJoinNode(policy, graph, node, expectation);


        // multiple splitting
        var n1 = graph.findNodeById("Passenger");
        var n2 = graph.findNodeById("Driver");
        var nodeList = [n1, n2];
        expectation = {"Web":true,
                        "Passenger App": true,
                        "Passenger Db": true,
                        "Driver Db": true,
                        "Driver App": true};
        checkMultiSplit(policy, graph, nodeList, expectation);

        // multiple joining
        n1 = graph.findNodeById("Passenger App");
        n2 = graph.findNodeById("Driver Db");
        nodeList = [n1, n2];
        expectation = {"Web":true,
                        "Passenger": true,
                        "Driver": true};
        checkMultiJoin(policy, graph, nodeList, expectation);

    })
});








