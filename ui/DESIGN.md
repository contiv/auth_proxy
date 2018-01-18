#Graph Design

##Developers - Table of contents
=================

  * [Overview](#overview)
  * [Data Source Objects](#data-source-objects)
    * [Data Source](#data-source-datasourcejs)
    * [Visualizer Data Source](#visualizer-data-source-visualizerdatasourcejs)
  * [Node Objects](#node-objects)
    * [Node](#node-nodejs)
    * [Visualizer Node](#visualizer-node-visualizernodejs)
  * [Link Objects](#link-objects)
    * [Link](#link-linkjs)
    * [Visualizer Link](#visualizer-link-visualizerlinkjs)
  * [Graph Objects](#graph-objects)
    * [Graph](#graph-graphjs)
    * [Visualizer Graph](#visualizer-graph-visualizergraphjs)
  * [Policy Objects](#policy-objects)
    * [Policy](#policy-policyjs)
    * [Path Change View Policy](#path-change-view-policy-pathchangeviewpolicyjs)
    * [QTip Policy](#qtip-policy-qtippolicyjs)
    * [Save State Policy](#save-state-policy-savestatepolicyjs)
    * [Node Selection Policy](#node-selection-policy-nodeselectionpolicyjs)
    * [Split Join Node Policy](#split-join-node-policy-splitjoinnodepolicyjs)
    * [Split Join View Policy](#split-join-view-policy-splitjoinviewpolicyjs)

    
###Overview:
=============
The graph is composed of five components. Each of these components has a base class, and are meant to be extended to create tailored versions as needed.
* Data source Object
  * Takes in node and link data from the server, and provides methods for converting and manipulating the data for the graph object.
* Node Object
  * The object that holds data that is paired to the svg circles drawn.
* Link Object:
  * The object that holds data for each connection, and is paired to the svg paths drawn.
* Graph Object:
  * The graph object that controls the svg, nodes, links, and responds to user interactions.
* Policy Object:
  * Determines how user interactions and events affect the graph. Used to isolate features from eachother.
  * Multiple policies can be installed at the same time.
  * Has a handler for all the standard mouse interactions, and these handlers will fire for the object it is installed on when the event occurs.

To use the graph object, include the contiv.graph module as a dependency for your module. Then you can inject which ever objects you need. Node objects, Link objects, and Graph objects all support policy installation and uninstallation. Graph objects support installing a policy for interaction with the graph, as well as default policies for nodes and links. When an event occurs, if the Node or Link in the event has its own policies installed, it will call the event handler for all the node or link's installed policies. If it doesn't have any of its own policies, it will call the event handler for the graph's default node policies or default path policies. This allows for certain nodes or links to have specialized policies if needed while still having a convenient way to install a policy on all nodes or on all links.

###Data Source Objects
=======================
Takes in node and link data from the server, and provides methods for converting and manipulating the data for the graph object.

To write your own DataSource object, create a new factory that uses the DataSource you want to inherit as a dependency, and extend its DataSource class. Return the class object with DataSource as key. 

####Data Source (datasource.js)
This is the base class for the Data Source Object. The processNodeData and processLinkData methods convert the data into Node and Link Objects, which are expected by the Graph Object.

It's constructor has the following expectations:
* Nodes:
  * Sample JSON - {id: node_id, text: node_text_to_display}
* Links:
  * Sample JSON - {source: sourceNodeId, target: targetNodeId}

####Visualizer Data Source (visualizerdatasource.js)
This is the Data Source Object used to handle data from the Contiv-UI backend, and to manipulate it specifically for the App Connectivity Graph tab. 

It's constructor has the following expectations:
* Nodes:
  * Sample JSON - {id: node_id, text: node_text_to_display}
* Links:
  * Sample JSON - {source: sourceNodeId, target: targetNodeId, weight: linkWeight}
* children_struct:
  * JSON object mapping node Id to an array of its children's Ids.
    * In the context of Contiv, a key would be a service id, and its corresponding value would be an array of container Ids for the containers that are part of the service.
  * Expected to have a topLevel attribute, that corresponds to an array of node Ids that have no parent.
  * If a Node is meant to be able to have children, but currently doesn't have any, it is expected that the children_struct still has the node id as key, and that its corresponding value is an empty list.
  	* In the context of Contiv, this would be a service without any containers.
* ancestors_struct:
  * JSON object mapping node Id to an array of its parent's Id, in increasing order of ancestry
  	* Ex. ancestor_struct[node1] = ['parent_id', 'grandparent_id']
* labels:
  * JSON mapping  node Id to a JSON of its label pairings.
    * In the context of Contiv, it would map a container Id to its labels.
* selectors:
  * JSON mapping node Id to a JSON of its service selectors.
    * In the context of Contiv, it would map a serviceId to its selectors.

It also contains method to aggregate flow between groups of containers, which allows for showing traffic between services, instead of containers.

###Node Objects
=======================
Basic object that is used by the Graph Object. Each node will correspond to one of the svg circles. If any policies are installed on the node, the graph will call their event handlers instead of the graph's default node policies. The initialization method of the node will be called when it is added to the graph.

To write your own Node object, create a new factory that uses the node you want to inherit as a dependency, and extend its node class. Return the class object with Node as key.

####Node (node.js)
This is the base class for the Node Object.

It's constructor has the following expectations:
* x:
  * x coordinate of the center of the circle. Must have a value by the time it is drawn by D3.
* y:
  * y coordinate of the center of the circle. Must have a value by the time it is drawn by D3.
* id:
  * Unique Identifier for the node.
* text:
  * text to be displayed on the node.
* radius:
  * radius of the circle. Must have a value by the time it is drawn by D3.

####Visualizer Node (visualizernode.js)
This is the Node Object that is designed for the App Connectivity Graph tab. Supports policies.

It's constructor has the following expectations:
* x:
  * x coordinate of the center of the circle. Must have a value by the time it is drawn by D3.
* y:
  * y coordinate of the center of the circle. Must have a value by the time it is drawn by D3.
* id:
  * Unique Identifier for the node.
* text:
  * text to be displayed on the node.
* radius:
  * radius of the circle. Must have a value by the time it is drawn by D3.
* parent:
  * Id of it's parent container, or null/undefined if there is none.
* ancestors:
  * Array of its ancestors Ids, in order of ancestry.
    * Ex node.ancestors = ['parent_id', 'grandparent_id']
* xStart:
  * Starting x position of the node. Will be animated to its x coordinate when it is drawn by the graph.
* yStart:
  * Starting y position of the node. Will be animated to its y coordinate when it is drawn by the graph.

###Link Objects
=======================
Basic object that is used by the Graph Object. Each link will correspond to one of the svg paths. If any policies are installed on the link, the graph will call their event handlers instead of the graph's default path policies. The initialization method of the link will be called when it is added to the graph.

To write your own Link object, create a new factory that uses the link you want to inherit as a dependency, and extend its link class. Return the class object with Link as key.

####Link (link.js)
This is the base class for the Link Object.

It's constructor has the following expectations:
* sourceNode:
  * Node that is the source of the link
* targetNode:
  * Node that is the target of the link

####Visualizer Link (visualizerlink.js)
This is the Link Object that is designed for the App Connectivity Graph tab. Supports policies.

It's constructor has the following expectations:
* sourceNode:
  * Node that is the source of the link.
* targetNode:
  * Node that is the target of the link.
* weight:
  * Weight of the link.

###Graph Objects
=======================
The graph object controls drawing of the Nodes and Links, as well as user interaction with the graph. It is installed onto an svg element. Any nodes in its nodes attributes and any links in its links attribute will be drawn the next time the graph's updateGraph method is called. 

The graph can only have one Svg policy, one D3 Drag policy, and one D3 zoom policy installed at a time. The graph has a default node policies and a default path policies, both which support installing multiple policies. When an event happens, if the node or link has no policies installed on it, it will trigger the event handler to the default node policies or to the default path policies.

The destroy function will remove any window bindings added by the graph, as well as call the destroy method of all policies installed.

####Graph (graph.js)
The basic graph object.

It's constructor has the following expectations:
* svg:
  * The svg that will contain the graph.
* nodes:
  * Array of Node objects to draw.
* links
  * Array of Link objects to draw.

####Visualizer Graph (visualizergraph.js)
The graph object used by the App Connectivity Graph tab.

It's constructor has the following expectations:
* svg:
  * The svg that will contain the graph.
* nodes:
  * Array of Node objects to draw.
* links
  * Array of Link objects to draw.
* dataSource
  * Data Source object that is serving data to the graph.

###Policy Objects
=======================
Policies are used to isolate features for a graph. Policies can be installed on nodes, links, or the graph. Each policy has interaction handlers that will be called by the graph if installed. Policies can also modify graph functions (see QTipPolicy for an example). Multiple policies can be installed for a node or link. The destroy method will trigger when the graph is destroyed, or if the policy is uninstalled.

For using policies, you only need to inject PolicyService, which will contain all the policy objects.

To write your own policy, create a new factory that uses the policy you want to inherit as a dependency, and extend its policy. Return the class object with Policy as key, and add the policy to the PolicyService factory. 

For saving state or consts for the policy, create a namespace in graph.state and graph.consts.
```
graph.state.myPolicy = {};
graph.consts.myPolicy = {};
```

####Policy (policy.js)
Base class for the Policy object. Has all the mouse handlers.

It's constructor has the following expectations:
* policyName:
  * The name for the policy. Policy names should be unique.

####Path Change View Policy (pathchangeviewpolicy.js)
This policy is used to change the angular state when paths are clicked. Generates the variables expected by visualizationEdgeCtrl, and then changes state.

It's constructor has the following expectations:
* $state:
  * The angular state parameter. Used for changing states.


####QTip Policy (qtippolicy.js)
This policy adds tooltip functionality to the nodes and paths. It utilizes the qTip library. 

In order to install qTip onto the svg elements, theis policy must modify the updateNewNodes and updateNewPaths methods of the graph. By saving the original method of the graph, and replacing it with a method that contains both the original, and the function you want to call.
```
var graphUpdateNewNodes = graph.updateNewNodes;
graph.updateNewNodes = function(newNodes) {
    graphUpdateNewNodes.call(graph, newNodes);
    thisPolicy.updateNewNodes(newNodes);
}

var graphUpdateNewPaths = graph.updateNewPaths;
graph.updateNewPaths = function(newPaths) {
    graphUpdateNewPaths.call(graph, newPaths);
    thisPolicy.updateNewPaths(newPaths);
}
```

####Save State Policy (savestatepolicy.js)
This policy allows for saving variables between angular states. Since angular services are only instantiated once, by passing in a variable of the service into this policy, any variables saved onto it will be saved even when the graph is destroyed. This policy modifies the graph's destroy function to pass the service variable as an argument for policies to save variables. When the graph is created again, if a load method is defined for a policy, it will call it with the service variable passed in.

It's constructor has the following expectations:
* savedState:
  * An angular service's variable.

####Node Selection Policy (nodeselectionpolicy.js)
This policy creates a selection method for selecting nodes. It also allows for selecting and moving multiple nodes when using the ctrl key.

####Split Join Node Policy (splitjoinnodepolicy.js)
This policy allows for nodes to split into its children nodes, and for nodes to be joined together back into their parent node. Has minimal logic for placing the new nodes. Supports splitting and joining multiple nodes at once.

Inherits from Node Selection Policy.

####Split Join View Policy (splitjoinviewpolicy.js)
This policy controls most of the view logic of the App Connectivity Graph tab. The logic is controlled by focus groups. When there is no focus groups, it will display the top level of children_struct. When a node is broken into its children, the Id of the node being split will be added to the focus group. Any nodes that have connections to the split node will remain in view on the bottom half of the screen, while the children will be placed on the top half. If any node is split on the top half, it will become the focus group. If a bottom half node is split, it will become a second focus group, and the bottom half view will be replaced with the newly split node's children. Joining a node will replace its respective focus group with the grandparent of the node being joined, or will remove it as a focus group if none exists. 

This policy modifies the d3 force simulation methods of the graph to control the node placements, as well as to animate view changes between focus groups. Once a layout is generated, it is saved and will be reloaded if that specific focus group setup is revisited.

This policy also has a handle for installing an HTML element to function as a back button, as well as a handler for installing an HTML element for setting the title, which is determined by the focus groups.

Inherits from Split Join Node Policy.






















