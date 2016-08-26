'use strict';

describe('node', function(){
    var nodeFactory;
    var node;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            nodeFactory = $injector.get('Node');
            node = new nodeFactory.Node(1, 2, 'testId', 'testText', 5);
        });
    });
    
    it('Checking inital values', function(){
        expect(node.x).toBe(1);
        expect(node.y).toBe(2);
        expect(node.id).toBe('testId');
        expect(node.text).toBe('testText');
        expect(node.radius).toBe(5);
        expect(node.graph).toBe(null);
        expect(node.initialized).toBe(false);
    });

    it('Checking initializing and setRadius', function() {
        node.initialize("testGraph");
        expect(node.graph).toBe("testGraph");
        expect(node.initialized).toBe(true);

        //calling initialize again shouldn't change anything
        node.initialize("newGraph");
        expect(node.graph).toBe("testGraph");
        expect(node.initialized).toBe(true);

        expect(node.radius).toBe(5);
        node.setRadius(10);
        expect(node.radius).toBe(10);
    });

    it('checking updateAttr', function() {
        var d3node = {
            attr : function(type, func) {
                if (type === "transform") {
                    expect(func(node)).toBe("translate(1,2)");
                }
            }
        };
        node.updateAttr(d3node, node);
    });

    it('testing policy related methods', function() {
        var policy = {
            policyName:'testPolicy',
            initialize: function(g){
                this.graph = g;
            },
            click:function(d3node, d) {
                expect(d.id).toBe('testId');
            },
            destroy: function(){
                this.destroyed = true;
            }
        };
        node.initialize("testGraph");
        node.installNodePolicy(policy);
        expect(node.hasPolicy).toBe(true);
        expect(node.nodePolicies.length).toBe(1);
        expect(policy.graph).toBe('testGraph');

        node.nodePolicyEvent('click', null, node);
        node.uninstallNodePolicy(policy);
        expect(policy.destroyed).toBe(true);
        expect(node.hasPolicy).toBe(false);
        expect(node.nodePolicies.length).toBe(0);

        node.installNodePolicy(policy);
        expect(node.hasPolicy).toBe(true);
        expect(node.nodePolicies.length).toBe(1);
        
        node.uninstallNodePolicy('testPolicy');
        expect(node.hasPolicy).toBe(false);
        expect(node.nodePolicies.length).toBe(0);        
    })

});




