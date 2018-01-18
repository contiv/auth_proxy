'use strict';

describe('NodeSelectionPolicy', function(){
    var policyFactory;
    var graph;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            policyFactory = $injector.get('NodeSelectionPolicy');
        });
        //creating mock for testing
        graph = {
                    state:{}, 
                    consts:{},
                    nodes: [],
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

    it('Checking inital values', function(){
        var policy = new policyFactory.Policy("test");
        expect(policy.policyName).toBe("NodeSelectionPolicy");
        expect(policy.graph).toBe(null);
        expect(policy.initialized).toBe(false);
    });

    it('add and removing nodes', function() {
        var policy = new policyFactory.Policy();
        policy.initialize(graph);
        var selectedClass = graph.consts.NodeSelectionPolicy.selectedClass;

        //creates a mock that can be used both as a
        //d3node and as nodeData
        function dummyNode(id) {
            return {
                id: id,
                className: null,
                classed: function(className, set) {
                    if (set) {
                        this.className = className;
                    } else {
                        this.className = null;
                    }
                }
            }
        }
        var state = graph.state.NodeSelectionPolicy;

        var node1 = dummyNode(1);
        var node2 = dummyNode(2);
        var node3 = dummyNode(3);

        graph.circles.nodes = [node1, node2, node3];

        //testing adding and removing a node
        policy.addSelectNode(node1, node1);//node should be added
        expect(state.selectedNodes.length).toBe(1);
        expect(node1.className).toBe(selectedClass);
        policy.addSelectNode(node2, node2);//node should be added
        expect(state.selectedNodes.length).toBe(2);
        expect(node2.className).toBe(selectedClass);
        expect(_.includes(state.selectedNodes, node1)).toBe(true);
        policy.removeSelectFromNode(node1, node1);//node should be removed
        expect(node1.className).toBe(null);
        expect(node2.className).toBe(selectedClass);
        expect(_.includes(state.selectedNodes, node2)).toBe(true);
        policy.removeSelectFromNode(node2, node2);//node should be removed
        expect(node2.className).toBe(null);
        expect(_.isEmpty(state.selectedNodes)).toBe(true);

        //testing removing all selected nodes
        policy.addSelectNode(node1, node1);//node should be added
        policy.addSelectNode(node2, node2);//node should be added
        policy.addSelectNode(node3, node3);//node should be added
        expect(state.selectedNodes.length).toBe(3);
        policy.removeAllSelectedNodes();
        expect(state.selectedNodes.length).toBe(0);


    })
});








