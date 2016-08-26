/**
 * Base policy class for the graph object
 * 
 * Policies are used to isolate features for a graph.
 * Policies can be installed on nodes, links, or the graph.
 * Each policy has interaction handlers that will be called by the graph
 * if installed. Policies can also modify graph functions (see QTipPolicy).
 * Multiple policies can be installed for a node or link. 
 * 
 * To write your own policy, create a new factory that uses the policy
 * you want to inherit as a dependency, and extend its policy. 
 * Return the class object with Policy as key, and 
 * add the policy to the PolicyService factory.
 * 
 * For saving state or consts for the policy, create a namespace
 * in graph.state and graph.consts.
 * Ex. 
 *      graph.state.myPolicy = {};
 *      graph.consts.myPolicy = {};
 *      
 */
angular.module('contiv.graph')
    .factory('Policy', [function () {
        class Policy {
            /**
             * Constructs the object.
             *
             * @param      {string}  policyName  The policy name
             */
            constructor(policyName) {
                this.policyName = policyName;
                this.graph = null;
                this.initialized = false;
            }

            /**
             * Called when the policy is installed.
             * 
             * @param  {Graph}  graph   The Graph that the policy is
             *                          being installed on
             */
            initialize(graph) {
                if (this.initialized) {
                    return; 
                }
                this.initialized = true;
                this.graph = graph;
            }

            /**
             * Handler, meant to be overridden in subclasses
             *
             * @param  {d3 object}    d3obj    The d3object
             * @param  {Node/Link/Graph}  d   The object it was
             *                                installed for.    
             */
            mouseover (d3obj, d) {}
            dblclick(d3obj, d) {}
            contextmenu(d3obj, d) {}
            mouseout(d3obj, d) {}
            mousedown(d3obj, d) {}
            mouseup(d3obj, d) {}

            /**
             * Will be called when the graph is being destroyed.
             * Used to remove any elements or bindings the policy
             * has added.
             */
            destroy() {}
        }
         return {
            Policy: Policy
        }
}]);




