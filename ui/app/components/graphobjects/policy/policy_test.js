'use strict';

describe('policy', function(){
    var policyFactory;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            policyFactory = $injector.get('Policy');
        });
    });
    
    it('Checking inital values', function(){
        var policy = new policyFactory.Policy("test");
        expect(policy.policyName).toBe("test");
        expect(policy.graph).toBe(null);
        expect(policy.initialized).toBe(false);
    });

    it('Checking initializing', function() {
        var policy = new policyFactory.Policy("test");

        policy.initialize("testGraph");
        expect(policy.policyName).toBe("test");
        expect(policy.graph).toBe("testGraph");
        expect(policy.initialized).toBe(true);

        //calling initialize again shouldn't change anything
        policy.initialize("newGraph");
        expect(policy.policyName).toBe("test");
        expect(policy.graph).toBe("testGraph");
        expect(policy.initialized).toBe(true);
    })
});




