/**
 * The base class for link objects for the graph.
 * Supports policies.
 * 
 * To write your own link object, create a new factory that uses the link
 * you want to inherit as a dependency, and extend its link class. 
 * Return the class object with Link as key
 * 
 */
angular.module('contiv.graph')
    .factory('Link', [function () {
    	class Link {
    		/**
    		 * Constructs the object.
    		 *
    		 * @param      {Node}  sourceNode  The source node
    		 * @param      {Node}  targetNode  The target node
    		 */
			constructor(sourceNode, targetNode) {
				this.source = sourceNode;
				this.target = targetNode;
				this.hasPolicy = false;
				this.pathPolicies = [];
				this.graph = null;
				this.initialized = false;
			}

			/**
			 * Called when a link is added to the graph
			 *
			 * @param      {Graph}  graph   The graph it is added to
			 */
			initialize(graph) {
				if (this.initialized == false) {
					this.initialized = true;
					this.graph = graph;
				}
			}

			/**
			 * Called during the update graph for existing links
			 *
			 * @param      {D3Object}  d3path  The d3 path
			 * @param      {Link}  	   d       Matching Link Object       
			 */
			updateAttr(d3path, d) {
				d3path.style('marker-end', 'url(#end-arrow)')
		            .attr("d", arrowPath);
			}

			/**
			 * Called during the first update graph for a link
			 *
			 * @param      {D3Object}  d3path  The d3 path
			 * @param      {Link}  	   d       Matching Link Object       
			 */
			newPathAttr(d3path, d) {
				d3path.attr('d', arrowPath);
			}

			/**
			 * Calculates the arrow path
			 *
			 * @return     {string}  The path to draw
			 */
		    arrowPath() {
		    	var d = this;
		        var dx = d.target.x - d.source.x,
		            dy = d.target.y - d.source.y,
		            dr = Math.sqrt(dx * dx + dy * dy);
		        return "M" + d.source.x + "," + d.source.y + "A" + dr + "," + dr + " 0 0,1 " + d.target.x + "," + d.target.y;
		    }

		    /**
		     * Used to install policies that are called when this
		     * link has a mouse event
		     *
		     * @param      {Policy}  policy  The policy to install
		     */
			installPathPolicy(policy) {
				this.hasPolicy = true;
				this.pathPolicies.push(policy);
				policy.initialize(this.graph);
			}

			/**
			 * Used to uninstall policy for this link
			 *
			 * @param      {Policy}  policyRemove  The policy to remove
			 */
			uninstallPathPolicy(policyRemove) {
				var policyRemoveName;
				var thisPath = this;
				if (typeof policyRemove === 'string') {
					policyRemoveName = policyRemove;
				} else {
					policyRemoveName = policyRemove.policyName;
				}
				_(thisPath.pathPolicies).forEach(function(policy, index) {
					if (policy.policyName === policyRemoveName) {
						policy.destroy();
						thisPath.pathPolicies.splice(index, 1);
					}
				});
				if (thisPath.pathPolicies.length === 0) {
					thisPath.hasPolicy = false;
				}
			}

			/**
			 * Called when there is a mouse event for this path
			 *
			 * @param      {string}  event     The mouse event
			 * @param      {D3Object}  d3path  The d3 path
			 * @param      {Object}  d         The matching link object
			 */
			pathPolicyEvent(event, d3path, d) {
				_(d.pathPolicies).forEach(function(policy) {
					policy[event](d3path, d);
				})
			}
		}
		return {
			Link: Link
		}
}]);






