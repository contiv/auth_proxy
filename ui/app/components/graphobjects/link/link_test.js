'use strict';

describe('link', function(){
    var linkFactory;
    var link;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            linkFactory = $injector.get('Link');
            link = new linkFactory.Link('source', 'target');
        });
    });
    
    it('Checking inital values', function(){
        expect(link.source).toBe('source');
        expect(link.target).toBe('target');
        expect(link.graph).toBe(null);
        expect(link.initialized).toBe(false);
    });

    it('Checking initializing', function() {
        link.initialize("testGraph");
        expect(link.graph).toBe("testGraph");
        expect(link.initialized).toBe(true);

        //calling initialize again shouldn't change anything
        link.initialize("newGraph");
        expect(link.graph).toBe("testGraph");
        expect(link.initialized).toBe(true);
    });


    it('testing policy related methods', function() {
        var policy = {
            policyName:'testPolicy',
            initialize: function(g){
                this.graph = g;
            },
            click:function(d3Obj, d) {
                expect(d.source).toBe('source');
            },
            destroy: function(){
                this.destroyed = true;
            }
        };
        link.initialize("testGraph");
        link.installPathPolicy(policy);
        expect(link.hasPolicy).toBe(true);
        expect(link.pathPolicies.length).toBe(1);
        expect(policy.graph).toBe('testGraph');

        link.pathPolicyEvent('click', null, link);
        link.uninstallPathPolicy(policy);
        expect(policy.destroyed).toBe(true);
        expect(link.hasPolicy).toBe(false);
        expect(link.pathPolicies.length).toBe(0);

        link.installPathPolicy(policy);
        expect(link.hasPolicy).toBe(true);
        expect(link.pathPolicies.length).toBe(1);
        
        link.uninstallPathPolicy('testPolicy');
        expect(link.hasPolicy).toBe(false);
        expect(link.pathPolicies.length).toBe(0);        
    })

});




