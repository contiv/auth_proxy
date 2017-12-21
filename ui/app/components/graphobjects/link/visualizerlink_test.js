'use strict';

describe('link', function(){
    var linkFactory;
    var link;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            linkFactory = $injector.get('VisualizerLink');
            link = new linkFactory.Link('source', 'target', 10);
        });
    });
    
    it('Checking inital values', function(){
        expect(link.source).toBe('source');
        expect(link.target).toBe('target');
        expect(link.weight).toBe(10);
        expect(link.graph).toBe(null);
        expect(link.initialized).toBe(false);
    });

    it('testing weight related methods', function() {
        var graph = {
            links:[link],
            state:{
                VisualizerLink:{
                    useAvgWeight:true
                }
            }
        }

        link.initialize(graph);
        link.setWeight(20);
        expect(link.weight).toBe(20);
        expect(link.getWeight()).toBe(20);
        link.increaseCount();
        expect(link.weight).toBe(20);
        expect(link.getWeight()).toBe(10);
        expect(link.getRawWeight()).toBe(20);
        link.setUseAvgWeight(false);
        expect(link.weight).toBe(20);
        expect(link.getWeight()).toBe(20);
        expect(link.getRawWeight()).toBe(20);

    })

});




