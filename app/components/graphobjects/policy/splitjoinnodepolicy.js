/**
 * This policy is used for splitting a node into its children,
 * and joining them back to their parent.
 * Splits on double click, and joins on right click.
 * If multiple nodes are selected at the time of a split or join event,
 * it will split or join all of them.
 */
angular.module('contiv.graph')
    .factory('SplitJoinNodePolicy', ['NodeSelectionPolicy', 'VisualizerNode', 
    		function (NodeSelectionPolicy, VisualizerNode) {
		class SplitJoinNodePolicy extends NodeSelectionPolicy.Policy {
			/**
			 * Constructs the object.
			 */
            constructor() {
                super();
                this.policyName = "SplitJoinNodePolicy";
            }

            /**
             * Called when policy is installed
             *
             * @param      {Graph}  graph   The graph
             */
            initialize(graph) {
                if (this.initialized) {
                    return;
                }
                super.initialize(graph);
                var state = graph.state.SplitJoinNodePolicy = {};
                state.splitNodes = []; 
            }

            /**
             * Triggering split on double click
             *
             * @param      {D3Object}  d3node  The d3 node
             * @param      {Object}  d      The matching data object
             */
            dblclick(d3node, d) {
                var thisGraph = this.graph,
                    superState = thisGraph.state.SplitJoinNodePolicy;

                if (!d3.event.ctrlKey) {
                    if (superState.selectedNodes.indexOf(d) > -1) {
                        this.splitMultipleNodes(superState.selectedNodes);
                    } else {
                        this.removeAllSelectedNodes();
                        this.splitNode(d);
                    }
                }
            }

            /**
             * Triggering join on right click
             *
             * @param      {D3Obj}  d3node  The d3 node
             * @param      {Object}  d      The matching data object
             */
            contextmenu(d3node, d) {
                var thisGraph = this.graph,
                    superState = thisGraph.state.NodeSelectionPolicy;
                d3.event.preventDefault();
                if (!d3.event.ctrlKey) {
                    //if try to join a highlighted node while multiple nodes are selected,
                    //we join all highlighted nodes
                    var selectedNodes = superState.selectedNodes;
                    if (selectedNodes.indexOf(d) > -1) {
                        for (var i = 0; i < selectedNodes.length; i++) {
                            this.joinNode(selectedNodes[i]);
                        }
                    } else {
                        //if we try to join a node that isn't part of a highlight,
                        //we remove all highlights and then join the clicked node
                        this.removeAllSelectedNodes();
                        this.joinNode(d);
                    }
                }
            }
            
            /**
             * Splits a node.
             * used to share code between splitNode and splitMultipleNodes
             * while preventing the handlers for them both firing
             * 
             * @param      {Node}  node    The node being split
             * @return     {Array}  The new nodes created by the split
             */
            __splitNode(node) {
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinNodePolicy;
                var name = node.id;
                var children_struct = thisGraph.dataSource.children_struct;
                //if it has no children to split into
                if (children_struct[name] === undefined || _.isEmpty(children_struct[name])) {
                    return;
                }

                //removing the node from the list of nodes
                thisGraph.nodes = _.filter(thisGraph.nodes, function(graphNodes) {
                    return graphNodes != node;
                });
                // console.log(thisGraph.nodes);
                thisGraph.spliceLinksForNode(node);

                //getting all the node id's for finding flow
                var node_names_set = [];
                for (var i = 0; i < thisGraph.nodes.length; i++) {
                    node_names_set.push(thisGraph.nodes[i].id);
                }

                //set of nodes after the split
                var new_nodes = [];
                for (var i = 0; i < children_struct[name].length; i++) {
                    node_names_set.push(children_struct[name][i]);
                    new_nodes.push(children_struct[name][i]);
                }
                var retData = thisGraph.dataSource.getFlowBetweenSet(node_names_set);

                //formatting data for new nodes
                var xLoc = node.x;
                var yLoc = node.y;
                var ancestors = node.ancestors.slice();
                //keeping ordering that first in ancestor list is closest in relationship
                ancestors.splice(0, 0, node.id);
                var parent = node.id;
                var new_node_objs = [];
                var radius = node.radius * thisGraph.consts.radiusDecay;
                var nodeData = retData.nodeData;
                for (var i = 0; i < nodeData.length; i++) {
                    //calculating which of the nodes in retData[0] are new
                    if (new_nodes.indexOf(nodeData[i].id) > -1) {
                        var id = nodeData[i].id;
                        var text = nodeData[i].text;
                        var new_node = new VisualizerNode.Node(null, null, id, text, radius, parent, ancestors, xLoc, yLoc);
                        new_node.initialize(thisGraph);
                        thisGraph.nodes.push(new_node);
                        new_node_objs.push(new_node);
                    }
                }
                thisGraph.links = thisGraph.dataSource.processLinkData(retData.linkData, thisGraph.nodes);
                thisGraph.initNodes();
                thisGraph.initLinks();

                state.splitNodes.push(node.id);
                return new_node_objs;
            }

            /**
             * Splits the give node
             *
             * @param      {Node}  node    The node being split
             */
            splitNode(node) {
                var res = this.__splitNode(node);
                if (res == null) {
                    return;
                }
                this.splitNodeEvent(res);

            }

            /**
             * Splits all the nodes passed in
             *
             * @param      {Array}  nodes   Array of nodes to be split
             */
            splitMultipleNodes(nodes) {
                var thisGraph = this.graph;
                var resNodes = [];
                for (var i = 0; i < nodes.length; i++) {
                    var res = this.__splitNode(nodes[i]);
                    resNodes = resNodes.concat(res);
                }

                this.splitMultipleNodesEvent(res);
            }

            /**
             * Called after a single node is split
             *
             * @param      {Array}  newNodes  The new nodes
             */
            splitNodeEvent(newNodes) {
                var thisGraph = this.graph;
                thisGraph.setPositions();
                thisGraph.updateGraph();
            }

            /**
             * Called after multiple nodes are split at once
             *
             * @param      {Array}  newNodes  The new nodes
             */
            splitMultipleNodesEvent(newNodes) {
                var thisGraph = this.graph;
                thisGraph.setPositions();
                thisGraph.updateGraph();
            }

            /**
             * used to share code between joinNode and joinMultipleNode
             * while preventing both handlers firing
             * 
             * @param      {Node}          node    The node to join
             * @return     {Node}  The new node after the join
             */
            __joinNode(node) {
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinNodePolicy;

                //check that node still exists
                if (thisGraph.nodes.indexOf(node) == -1) {
                    return;
                }

                var children_struct = thisGraph.dataSource.children_struct;
                var name = node.id;
                //if it has no ancestor, nothing to join
                if (children_struct.topLevel.indexOf(name) > -1) {
                    return;
                }

                var to_be_deleted = [];
                var node_names_set = [];
                for (var i = 0; i < thisGraph.nodes.length; i++) {
                    //if node won't be collapsed
                    if (thisGraph.nodes[i].ancestors.indexOf(node.parent) == -1) {
                        node_names_set.push(thisGraph.nodes[i].id);
                    } else {
                        to_be_deleted.push(thisGraph.nodes[i]);
                    }
                }
                var new_node_id = node.parent;
                node_names_set.push(node.parent);

                //formatting data
                var radius = node.radius / thisGraph.consts.radiusDecay; 
                var xLoc = node.x;
                var yLoc = node.y;
                var parent = node.ancestors[1];
                var ancestors = node.ancestors.slice(1);
                var new_node = new VisualizerNode.Node(xLoc, yLoc, new_node_id, new_node_id, radius, parent, ancestors);
                thisGraph.nodes.push(new_node);

                var retData = thisGraph.dataSource.getFlowBetweenSet(node_names_set);
                //remove all nodes that will be joined
                for (var i = 0; i < to_be_deleted.length; i++) {
                    var node_to_delete = to_be_deleted[i];
                    thisGraph.nodes.splice(thisGraph.nodes.indexOf(node_to_delete), 1);
                    thisGraph.spliceLinksForNode(node_to_delete);
                }
                thisGraph.links = thisGraph.dataSource.processLinkData(retData.linkData, thisGraph.nodes);
                thisGraph.initNodes();
                thisGraph.initLinks();

                state.splitNodes.splice(state.splitNodes.indexOf(new_node.id), 1);

                return new_node;
            }

            /**
             * Joins the given node
             *
             * @param      {Node}  node    The node to join
             */
            joinNode(node) {
                var newNode = this.__joinNode(node);
                if (newNode != null) {
                	this.joinNodeEvent(newNode);
                }
            }

            /**
             * Joins all the given nodes
             *
             * @param      {Array}  nodes   The nodes to join
             */
            joinMultipleNode(nodes) {
                var new_nodes = [];
                for (var i = 0; i < nodes.length; i++) {
                    var res = this.__joinNode(nodes[i]);
                    new_nodes.push(res);
                }
                this.joinMultipleNodesEvent(new_nodes);
            }

            /**
             * Called after a single node is joined
             *
             * @param      {Node}  newNode  The new node
             */
            joinNodeEvent(newNode) {
                var thisGraph = this.graph;
                thisGraph.updateGraph();
            }

            /**
             * Called after multiple nodes are joined
             *
             * @param      {Array}  newNodes  The new nodes
             */
            joinMultipleNodesEvent(newNodes) {
                var thisGraph = this.graph;
                thisGraph.updateGraph();
            }
            
        }
        return {
            Policy: SplitJoinNodePolicy
        }
}]);




