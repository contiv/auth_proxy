'use strict';

describe('VisualizerDataSource', function(){
    var VisualizerDataSource;
    var nodes;
    var links;
    var children_struct;
    var ancestors_struct;

    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            VisualizerDataSource = $injector.get('VisualizerDataSource');
        });
        //creating mock data for testing
        nodes = [];
        links = [];
        //client endpoints
        nodes.push({id:'1.1'});
        nodes.push({id:'1.2'});
        nodes.push({id:'1.3'});
        nodes.push({id:'1.4'});
        //service 1 containers
        nodes.push({id:'2.1'});
        nodes.push({id:'2.2'});
        nodes.push({id:'2.3'});
        nodes.push({id:'2.4'});
        //service 2 containers
        nodes.push({id:'3.1'});
        nodes.push({id:'3.2'});
        nodes.push({id:'3.3'});
        nodes.push({id:'3.4'});

        links.push({source: '1.1', target:'2.1', weight:15});
        links.push({source: '2.1', target:'1.1', weight:5});
        links.push({source: '1.1', target:'2.2', weight:20});
        links.push({source: '2.2', target:'1.1', weight:10});
        links.push({source: '1.4', target:'2.3', weight:10});
        links.push({source: '2.3', target:'1.4', weight:5});
        links.push({source: '1.3', target:'3.1', weight:25});
        links.push({source: '3.1', target:'1.3', weight:5});
        links.push({source: '1.4', target:'3.2', weight:5});
        links.push({source: '3.2', target:'1.4', weight:10});
        links.push({source: '3.3', target:'3.4', weight:5});
        links.push({source: '3.4', target:'3.3', weight:5});
        links.push({source: '3.4', target:'2.4', weight:25});
        links.push({source: '2.4', target:'3.4', weight:20});

        children_struct = {};
        children_struct.topLevel = ['s1', 's2'];
        children_struct['s1'] = ['2.1', '2.2', '2.3', '2.4'];
        children_struct['s2'] = ['3.1', '3.2', '3.3', '3.4'];
        ancestors_struct = {};
        _.forEach(children_struct['s1'], function(s) {
            ancestors_struct[s] = ['s1'];
        });
        _.forEach(children_struct['s2'], function(s) {
            ancestors_struct[s] = ['s2'];
        });
    });

    //incomplete
    it('Checking setAncestors', function(){
        var dataSource = new VisualizerDataSource.DataSource(nodes, links, children_struct, ancestors_struct);
        dataSource.setAncestors();
        //check that the ancestor and parent attr is set correctly
        _.forEach(nodes, function(node) {
            expect(_.isEqual(node.ancestors, ancestors_struct[node.id])).toBe(true);
        })
    });

    
});








