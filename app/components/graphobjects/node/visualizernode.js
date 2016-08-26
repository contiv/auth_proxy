/**
 * The node that is used specifically for the visualization tab.
 */
angular.module('contiv.graph')
    .factory('VisualizerNode', ['Node', function (Node) {
		class VisualizerNode extends Node.Node {
			/**
			 * Constructs the object.
			 *
			 * @param      {number}  x       	x location
			 * @param      {number}  y       	y location
			 * @param      {string}  id      	The identifier
			 * @param      {string}  text    	The text to display
			 * @param      {number}  radius  	The radius of the node
			 * @param      {string}  parent     The parent id
			 * @param      {Array}   ancestors  Array of ancestors Id
			 * @param      {number}  xStart     x loc to start animation
			 * @param      {number}  yStart     y loc to start animation
			 */
		    constructor(x, y, id, text, radius, parent, ancestors, 
		    	xStart, yStart) {
		        super(x, y, id, text, radius);
		        this.parent = parent;
		        this.ancestors = ancestors;
		        if (xStart == null) {
		        	this.xStart = x;
		        } else {
		        	this.xStart = xStart;
		        }
		        if (yStart == null) {
		        	this.yStart = y;
		        } else {
		        	this.yStart = yStart;
		        }
		    }

			/**
			 * Called during the first update graph for a node
			 *
			 * @param      {D3Object}  d3node  The d3 node
			 * @param      {Node}    d         The matching Node
			 */
			newNodeAttr(d3node, d) {
				var thisGraph = this.graph;
				if (thisGraph.consts.containerClass != null &&
						thisGraph.dataSource.children_struct[d.id] == null) {
					d3node.classed(thisGraph.consts.containerClass, true);
				}
				d3node.transition("nodePositionTransition")
		                .duration(750)
		                .attrTween("transform", function(d) {
		                    if (d.xStart != null && d.yStart != null) {
		                        var xStart = d.xStart;
		                        var yStart = d.yStart;
		                        d.xStart = d.x;
		                        d.yStart = d.y;
		                        return d3.interpolateString("translate(" + xStart + "," + yStart + ")", "translate(" + d.x + "," + d.y + ")");
		                    }
		                    return d3.interpolateString("translate(" + d.x + "," + d.y + ")", "translate(" + d.x + "," + d.y + ")");
		                });
			}
		}

		return {
			Node: VisualizerNode
		}

}]);








