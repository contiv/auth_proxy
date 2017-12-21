/**
 * This policy provides a way for properties to be saved 
 * between view changes
 * 
 * It modifies the destroy function to also pass in an object that
 * will have all its properties saved and will be available 
 * on graph load. When saving variables to the object, namespace with
 * the policy name.
 * 
 * This policy must be loaded first in order for it saved variables 
 * to be loaded when the view comes back to the graph
 */
angular.module('contiv.graph')
    .factory('SaveStatePolicy', ['Policy', function (Policy) {
    	class SaveStatePolicy extends Policy.Policy {
    		
    		/**
    		 * Takes in the angular service to which it will
    		 * save it's properties to.
    		 *
    		 * @param      {Object}  savedState  Object to save 
    		 *                                   properties to
    		 */
    		constructor(savedState) {
    			super('SaveStatePolicy');
    			this.savedState = savedState;
    		}

    		/**
    		 * Called when the policy is installed
    		 * Modifies the destroy method 
    		 * and adds a load method to the graph
    		 *
    		 * @param      {Graph}  graph   The graph it is 
    		 *                              installed on
    		 */
    		initialize(graph) {
    			this.graph = graph;
    			var thisPolicy = this;
    			graph.destroy = function() {
    				thisPolicy.graphDestroy.call(graph, thisPolicy.savedState);
    			};

    			graph.load = function(savedState) {
    				thisPolicy.graphLoad.call(graph, savedState);
    			}
    		}

    		/**
    		 * Will override the graph's default destroy, with 
    		 * this policy's savedState passed in.
    		 * Called with this as the graph
    		 *
    		 * @param      {Object}  savedState  The saved state
    		 */
    		graphDestroy(savedState) {
                var thisGraph = this;
                 _(thisGraph.defaultNodePolicies).forEach(function(policy) {
                    policy.destroy(savedState);
                });
                _(thisGraph.defaultPathPolicies).forEach(function(policy) {
                    policy.destroy(savedState);
                });
                for (var key in thisGraph.bindings) {
                    $(window).off(key, thisGraph.bindings[key]);
                }
            }

            /**
             * Will be called with the graph as this
             * Used to have all other policies use the load state
             *
             * @param      {Object}  savedState  The saved state
             */
            graphLoad(savedState) {
            	var thisGraph = this;
                 _(thisGraph.defaultNodePolicies).forEach(function(policy) {
                 	if (policy.load != null) {
                    	policy.load(savedState);
                 	}
                });
                _(thisGraph.defaultPathPolicies).forEach(function(policy) {
                 	if (policy.load != null) {
                    	policy.load(savedState);
                 	}
                });
            }
    	}
    	return {
    		Policy: SaveStatePolicy
    	}
}]);







