'use strict';

describe('visualizer node', function(){
    var nodeFactory;
    var node;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            nodeFactory = $injector.get('VisualizerNode');
            node = new nodeFactory.Node(1, 2, 'testId', 'testText', 5, 'p', 'a', 0, -1);
        });
    });
    
    it('Checking inital values', function(){
        expect(node.x).toBe(1);
        expect(node.y).toBe(2);
        expect(node.id).toBe('testId');
        expect(node.text).toBe('testText');
        expect(node.radius).toBe(5);
        expect(node.parent).toBe('p');
        expect(node.ancestors).toBe('a');
        expect(node.xStart).toBe(0);
        expect(node.yStart).toBe(-1);
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
});




