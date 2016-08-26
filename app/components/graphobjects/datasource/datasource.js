/**
 * The base class the DataSource object.
 * 
 * The DataSource object takes in node and link data from the server, 
 * and provides methods for converting and manipulating the data for
 * the graph object.
 * 
 * To write your own DataSource object, create a new factory that uses the 
 * DataSource you want to inherit as a dependency, and extend 
 * its DataSource class. 
 * Return the class object with DataSource as key.
 * 
 * Node data is expected to be in the following format:
 * {id:node_id, text:node_text}
 * 
 * Link data is expected to be in the following format:
 * {source: sourceNodeId, target: targetNodeId}
 * 
 */
angular.module('contiv.graph')
    .factory('DataSource', ['Node', 'Link', 
    	function (Node, Link) {

    	class DataSource {
    		/**
    		 * Constructs the object.
    		 *
    		 * @param      {Array}   nodes              The node data 
    		 * @param      {Array}   links              The link data
    		 */
			constructor(nodes, links) {
				this.nodes = nodes;
				this.links = links;
			}

			/**
			 * Replaces the node data
			 *
			 * @param      {Node}  nodes   The nodes
			 */
			updateNodes(nodes) {
				this.nodes = nodes;
			}

			/**
			 * Replaces the link data
			 *
			 * @param      {Link}  links   The links
			 */
			updateLinks(links) {
				this.links = links;
			}

			/**
			 * Returns the Name attribute of the Node with the 
			 * matching id
			 *
			 * @param      {string}  id      The identifier
			 * @return     {string}  name of the matching node
			 */
			nodeIdToName(id) {
		        var nodes = this.nodes;
		        for (var i = 0; i < nodes.length; i++) {
		            if (nodes[i].id == id) {
		                return nodes[i].name;
		            }
		        }
		    }

		    /**
		     * process the nodeData to create Node objects
		     *
		     * @param      {Array}  nodeData  NodeData to convert 
		     *                                to node objects
		     * @return     {Array}  Node objects
		     */
		    processNodeData(nodeData) {
		        var nodes = [];
		        _.forEach(nodeData, function(data) {
		            var newNode = new Node.Node(null, null, data.id, data.text, null);
		            nodes.push(newNode);
		        });
		        return nodes;
		    }

		    /**
		     * process the linkData
		     *
		     * @param      {Array}  linkData  The link data
		     * @param      {Array}  nodes     The nodes from processNodeData
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
		        //transforming link data
		        for (var i = 0; i < linkData.length; i++) {
		            if (linkData[i].source != linkData[i].target) {
		                var source = findNodeById(linkData[i].source, nodes);
		                var target = findNodeById(linkData[i].target, nodes);
		                if (source == null || target == null) {
		                	continue;
		                }
	                    var link = new Link.Link(source, target);
	                    links.push(link);
		            }  
		        }
		        return links;
		    }
		}
		return {
			DataSource:DataSource
		}
}]);






