/**
 * The base class for node objects for the graph.
 * Supports policies.
 * 
 * To write your own Node object, create a new factory that uses the node
 * you want to inherit as a dependency, and extend its node class. 
 * Return the class object with Node as key
 * 
 */
angular.module('contiv.graph')
    .factory('Node', [function () {
		class Node {
			/**
			 * Constructs the object.
			 *
			 * @param      {number}  x       x location
			 * @param      {number}  y       y location
			 * @param      {string}  id      The identifier
			 * @param      {string}  text    The text to display
			 * @param      {number}  radius  The radius of the node
			 */
			constructor(x, y, id, text, radius) {
				this.x = x;
				this.y = y;
				this.radius = radius;
				this.id = id;
				this.text = text;
				this.radius = radius;
				this.hasPolicy = false;
				this.policy = null;
				this.nodePolicies = [];
				this.graph = null;
				this.initialized = false;
			}

			/**
			 * Called when a node is added to the graph
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
			 * @param      {D3Object}  d3node  The d3 node
			 */
			updateAttr(d3node, d) {
				d3node.attr("transform", function(d){return "translate(" + d.x + "," + d.y + ")";});
			}
			
			/**
			 * Called during the first update graph for a node
			 * Hook for sub classes
			 * 
			 * @param      {D3Object}  d3node  The d3 node
			 * @param      {Node}      d       Matching Node Object
			 */
			newNodeAttr(d3node, d) {
			}

			/**
			 * Sets the radius of the node.
			 *
			 * @param      {number}  radius  The radius
			 */
			setRadius(radius) {
				this.radius = radius;
			}

		    /**
		     * Used to install policies that are called when this
		     * node has a mouse event
		     *
		     * @param      {Policy}  policy  The policy to install
		     */
			installNodePolicy(policy) {
				this.hasPolicy = true;
				this.nodePolicies.push(policy);
				policy.initialize(this.graph);
			}

			/**
			 * Used to uninstall policy for this node
			 *
			 * @param      {Policy|string}  policyRemove  The policy to remove
			 */			
			uninstallNodePolicy(policyRemove) {
				var policyRemoveName;
				var thisNode = this;
				if (typeof policyRemove === 'string') {
					policyRemoveName = policyRemove;
				} else {
					policyRemoveName = policyRemove.policyName;
				}
				_(thisNode.nodePolicies).forEach(function(policy, index) {
					if (policy.policyName === policyRemoveName) {
						policy.destroy();
						thisNode.nodePolicies.splice(index, 1);
					}
				});
				if (thisNode.nodePolicies.length === 0) {
					thisNode.hasPolicy = false;
				}
			}

			/**
			 * Called when there is a mouse event for this node
			 *
			 * @param      {string}  event     The mouse event
			 * @param      {D3Object}  d3node  The d3 node
			 * @param      {Object}  d         The matching node object
			 */
			nodePolicyEvent(event, d3node, d) {
				_.forEach(this.nodePolicies, function(policy) {
					policy[event](d3node, d);
				});
			}
		}
		return {
			Node: Node
		}
}]);







