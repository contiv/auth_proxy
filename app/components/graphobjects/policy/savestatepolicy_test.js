'use strict';

describe('SaveStatePolicy', function(){
    var policyFactory;
    var graph;
    var defaultNodePolicies;
    var defaultPathPolicies;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            policyFactory = $injector.get('SaveStatePolicy');
        });
        //creating mock for testing
        defaultNodePolicies = [];
        defaultPathPolicies = [];
        var p;
        for (var i = 0; i < 5; i++) {
            p = {
                    stateVal:0,
                    load:function(state){
                        this.stateVal = state.node[i.toString()];
                    },
                    destroy:function(state){
                        state.node[i.toString()] = this.stateVal;
                    }
                };

            defaultNodePolicies.push(p) 
        }

        for (var i = 0; i < 5; i++) {
            p = {
                    stateVal:0,
                    load:function(state){
                        this.stateVal = state.path[i.toString()];
                    },
                    destroy:function(state){
                        state.path[i.toString()] = this.stateVal;
                    }
                };

            defaultPathPolicies.push(p) 
        }

        graph = {
                    state:{}, 
                    defaultNodePolicies:defaultNodePolicies,
                    defaultPathPolicies:defaultPathPolicies
                };
    });

    it('Checking inital values', function(){
        var savestate;
        var policy = new policyFactory.Policy(savestate);
        expect(policy.policyName).toBe("SaveStatePolicy");
        expect(policy.graph).toBe(null);
        expect(policy.initialized).toBe(false);
    });

    it('testing load and destroy', function() {
        var savestate = {node:{}, path:{}};
        var policy = new policyFactory.Policy(savestate);
        //testing adding graph methods
        expect(graph.load).toBe(undefined);
        expect(graph.destroy).toBe(undefined);
        policy.initialize(graph);
        expect(graph.load == null).toBe(false);
        expect(graph.destroy == null).toBe(false);

        //testing saving value on destroy
        _.forEach(defaultNodePolicies, function(p) {
            p.stateVal = 2;
        });
        _.forEach(defaultPathPolicies, function(p) {
            p.stateVal = 3;
        });

        graph.destroy();

        _.forEach(defaultNodePolicies, function(p) {
            p.stateVal = 0;
        });
        _.forEach(defaultPathPolicies, function(p) {
            p.stateVal = 0;
        });

        graph.load(savestate);

        _.forEach(defaultNodePolicies, function(p) {
            expect(p.stateVal).toBe(2);
        });
        _.forEach(defaultPathPolicies, function(p) {
            expect(p.stateVal).toBe(3);
        }) 
    })
});








