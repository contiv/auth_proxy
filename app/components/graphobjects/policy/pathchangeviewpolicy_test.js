'use strict';

describe('PathChangeViewPolicy', function(){
    var policyFactory;
    var $state;
    beforeEach(function(){
        module('contiv.graph');
        inject( function($injector){
            policyFactory = $injector.get('PathChangeViewPolicy');
        });
        $state = {go:function(url, obj) {
                        this.url = url;
                        this.sourceName = obj.sourceName;
                        this.targetName = obj.targetName;
                        this.sourceList = obj.sourceList;
                        this.targetList = obj.targetList;
                    }};
    });

    it('Checking inital values', function(){
        var policy = new policyFactory.Policy($state);
        expect(policy.policyName).toBe("PathChangeViewPolicy");
        expect(policy.graph).toBe(null);
        expect(policy.initialized).toBe(false);
        expect(policy.$state).toBe($state);
    });

    it('Checking view edge on container to container link', function(){
        var graph = {
            dataSource: {
                hasChild: function() {return false;}
            }
        };
        var policy = new policyFactory.Policy($state);
        policy.initialize(graph);
        var edge = {
            source: {
                id:'source'
            },
            target: {
                id:'target'
            }
        };
        policy.viewEdge(edge);
        expect($state.url).toBe('contiv.menu.visualization.edge');
        expect($state.sourceName).toBe('source');
        expect($state.targetName).toBe('target');
        expect(_.isEqual($state.sourceList, ['source'])).toBe(true);
        expect(_.isEqual($state.targetList, ['target'])).toBe(true);
    });

    it('Checking generateList', function() {
        var graph = {
            dataSource: {
                children_struct: {
                    'gp1':['p1', 'p2'],
                    'p1': ['c1'],
                    'p2': ['c2', 'c3'],
                    'p3': ['c4']
                },
                hasChild: function(id) {
                    if (this.children_struct[id] == null) {
                        return false;
                    }
                    return true;
                }
            }
        };
        var policy = new policyFactory.Policy($state);
        policy.initialize(graph);
        var edge = {
            source: {
                id: 'gp1'
            },
            target: {
                id: 'p3'
            }
        };
        policy.viewEdge(edge);
        expect($state.url).toBe('contiv.menu.visualization.edge');
        expect($state.sourceName).toBe('gp1');
        expect($state.targetName).toBe('p3');
        expect(_.isEqual($state.sourceList, ['c1','c2','c3'])).toBe(true);
        expect(_.isEqual($state.targetList, ['c4'])).toBe(true);
    })

});











