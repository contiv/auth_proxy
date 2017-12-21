'use strict';

describe('policy', function(){
    var policyFactory;
    var graph;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            policyFactory = $injector.get('QTipPolicy');
        });
        graph = {state:{
                    testNodesOld:null,
                    testPathsOld:null
                }, 
                consts:{}, 
                updateNewNodes:function(n){
                    this.state.testNodesOld = 'oldNewNodes';
                },
                updateNewPaths:function(n) {
                    this.state.testPathsOld = 'oldNewPaths';
                } 
            };
    });

    it('Checking inital values', function(){
        //shouldn't take in passed in name
        var policy = new policyFactory.Policy("test");
        expect(policy.policyName).toBe("QTipPolicy");
        expect(policy.graph).toBe(null);
        expect(policy.initialized).toBe(false);
    });

    it('Checking initializing', function() {
        var policy = new policyFactory.Policy();
        policy.updateNewNodes = function(n){
            state.testNodesNew = 'qtip';
        };
        policy.updateNewPaths = function() {
            state.testPathsNew = 'qtip';
        };
        policy.initialize(graph);
        //checking policy is only modifying state and consts
        //and graph functions
        expect(graph.state != null).toBe(true);
        expect(graph.consts != null).toBe(true);
        expect(graph.updateNewPaths != null).toBe(true);
        expect(graph.updateNewNodes != null).toBe(true);
        var keys = 0;
        for (var k in graph) {
            keys++;
        }
        expect(keys).toBe(4);
        var state = graph.state.QTipPolicy;
        var graphState = graph.state;
        expect(state.mousedown).toBe(false);

        //checking overriding of update new nodes and update new paths
        
        graph.updateNewNodes();
        expect(graphState.testNodesOld != null).toBe(true);
        expect(state.testNodesNew != null).toBe(true);
        graph.updateNewPaths();
        expect(graphState.testPathsOld != null).toBe(true);
        expect(state.testPathsNew != null).toBe(true);

    });

    it('checking mouse up and down trigger', function() {
        var policy = new policyFactory.Policy();

        policy.initialize(graph);
        var state = graph.state.QTipPolicy;

        expect(state.mousedown).toBe(false);
        policy.mousedown();
        expect(state.mousedown).toBe(true);
        policy.mouseup();
        expect(state.mousedown).toBe(false);
    })
});







