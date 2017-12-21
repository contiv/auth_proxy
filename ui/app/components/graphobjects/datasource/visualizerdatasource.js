/**
 * The DataSource used for the visualization tab.
 * 
 * Node Data from the server is expected to be in the following format:
 * {id: node_id, text: node_text}
 * Parent and Ancestor attributes can be set by calling setAncestors
 * 
 * Link Data from the server is expected to be in the following format:
 * {source: sourceNodeId, target: targetNodeId, weight: linkWeight}
 * 
 */
angular.module('contiv.graph')
    .factory('VisualizerDataSource', ['DataSource', 'VisualizerNode', 'VisualizerLink', 
    	function (DataSource, VisualizerNode, VisualizerLink) {

    	class VisualizerDataSource extends DataSource.DataSource {
    		/**
    		 * Constructs the object.
    		 * 
    		 * Children Struct and ancestors_struct are JSON objects,
    		 * mapping a node Id to a list of it's children or ancestors.
    		 * Children Struct is also expected to have a field called
    		 * topLevel, that maps to a list of all the nodes that don't
    		 * have any parents.
    		 *
    		 * @param      {Array}   nodes              The node data 
    		 * @param      {Array}   links              The link data
    		 * @param      {Object}  children_struct    The children structure
    		 * @param      {Object}  ancestors_struct   The ancestors structure
    		 * @param      {Array}   labels             The labels
    		 * @param      {Array}   selectors          The selectors
    		 */
			constructor(nodes, links, children_struct, ancestors_struct, 
					labels, selectors) {
				super(nodes,links);
				this.children_struct = children_struct;
				this.ancestors_struct = ancestors_struct;
				this.labels = labels;
				this.selectors = selectors;
			}

		    /**
		     * Determines if it has child.
		     *
		     * @param      {string}   id      The identifier
		     * @return     {boolean}  True if has child, False otherwise.
		     */
		    hasChild(id) {
		    	if (this.children_struct[id] == null) {
            		return false;
            	}
            	return true;	
		    }

		    /**
		     * Sets the parent and ancestors attribute using 
		     * ancestors_struct for all the nodes
		     * Also adds any nodes without ancestors, that aren't 
		     * toplevel to the client service.
		     */
		    setAncestors() {
		    	var thisDataSource = this;
		    	var addedClient = false;
		    	_.forEach(thisDataSource.nodes, function(node) {
		    		node.ancestors = thisDataSource.ancestors_struct[node.id] || [];
		    		if (_.isEmpty(node.ancestors) === false) {
		    			node.parent = node.ancestors[0];
		    		} else {
		    			if (_.includes(thisDataSource.children_struct.topLevel, node.id) == false) {
		    				//container has no parent
		    				//adding to client
		    				node.ancestors.push("client");
		    				thisDataSource.ancestors_struct[node.id] = ["client"];
		    				if (addedClient === false) {
		    					addedClient = true;
			    				thisDataSource.children_struct.topLevel.push("client");
		    					thisDataSource.children_struct['client'] = [];
		    				}
		    				thisDataSource.children_struct['client'].push(node.id);
			    		}
		    		}
		    	})
		    }

		    /**
		     * Returns the flow between the highest level grouping
		     *
		     * @return     {Object}  The top level flow.
		     */
		    getTopLevelFlow() {
		        return this.getFlowBetweenSet(this.children_struct.topLevel);
		    }

		    /**
		     * Gets the flow between any set of node levels
		     *
		     * @param      {Array}  node_names  The node names in the set
		     * @return     {Object}  The flow between set.
		     */
		    getFlowBetweenSet(node_names) {
		        var local_nodes = this.nodes;
		        var idMapping = {};
		        for (var i = 0; i < local_nodes.length; i++) {
		            var node = local_nodes[i];

		            //if node is already at its highest level
		            if (node.ancestors === null) {
		                idMapping[node.id] = node.name;
		            } else {
		                //check to see which tags are present in the ancestor list
		                for (var j = 0; j < node_names.length; j++) {
		                    if (node.ancestors.indexOf(node_names[j]) > -1) {
		                        idMapping[node.id] = node_names[j];
		                        break;
		                    }
		                }
		            }
		        }   
		        //modify links
		        var links = this.links;
		        var linkData = [];
		        
		        for (var i = 0; i < links.length; i++) {
		            var link = [];
		            link.source = idMapping[links[i].source] || links[i].source;
		            link.target = idMapping[links[i].target] || links[i].target;
		            link.weight = links[i].weight;
		            linkData.push(link);
		        }

		        //creating the nodeData
		        var nodeData = [];
		        for (var i = 0; i < node_names.length; i++) {
		            var node_to_add = [];
		            node_to_add.id = node_names[i];
		            node_to_add.text = this.nodeIdToName(node_names[i]) || node_names[i];


		            node_to_add.ancestors = this.ancestors_struct[node_names[i]] || this.ancestors_struct[node_to_add.text] || [];
		            if (_.isEmpty(node_to_add.ancestors) === false) {
		                node_to_add.parent = node_to_add.ancestors[0];
		            } else {
		                node_to_add.parent = null;
		            }
		            nodeData.push(node_to_add);
		        }

		        return {nodeData:nodeData, linkData:linkData};
		    }

		    /**
		     * process the nodeData output of getFlowBetweenSet
		     *
		     * @param      {Array}  nodeData  NodeData to convert 
		     *                                to node objects
		     * @return     {Array}  Node objects
		     */
		    processNodeData(nodeData) {
		        var nodes = [];
		        _.forEach(nodeData, function(data) {
		            var newNode = new VisualizerNode.Node(null, null, data.id, data.text,
		                null, data.parent, data.ancestors, null, null);
		            nodes.push(newNode);
		        });
		        return nodes;
		    }

		    /**
		     * process the linkData output of getFlowBetweenSet
		     *
		     * @param      {Array}  linkData  The link data
		     * @param      {Array}  nodes     The nodes
		     * @return     {Array}  Link objects
		     */
		    processLinkData(linkData, nodes) {
		    	/**
			     * Returns the node that matches the id
			     *
			     * @param      {string} id      The identifier
			     * @return     {Node}   The node with the matching id
			     */
			    function findNodeById(id, nodes) {
			        for (var i = 0; i < nodes.length; i++) {
			            if (id == nodes[i].id) {
			                return nodes[i];
			            }
			        }
			    }

		        var links = [];
		        //a mapping from source.id-target.id to the link added
		        var added_links = {};
		        //transforming link data
		        for (var i = 0; i < linkData.length; i++) {
		            if (linkData[i].source != linkData[i].target) {
		                var source = findNodeById(linkData[i].source, nodes);
		                var target = findNodeById(linkData[i].target, nodes);
		                var weight = linkData[i].weight;
		                //in order to sum all the weights of the links of the sub-nodes,
		                //we use added_links to keep track if an link was added
		                //if it is, we modify its weight
		                if (source == null || target == null) {
		                	continue;
		                }
		                if (added_links[source.id + '-' + target.id] === undefined) {
		                    var link = new VisualizerLink.Link(source, target, weight);
		                    added_links[source.id + '-' + target.id] = link;
		                    links.push(link);
		                } else {
		                    var existing_link = added_links[source.id + '-' + target.id];
		                    existing_link.setWeight(existing_link.getRawWeight() + weight);
		                    existing_link.increaseCount();
		                }
		            }  
		        }
		        return links;
		    }
		}
		return {
			DataSource: VisualizerDataSource
		}
}]);






