/**
 * This policy is used to change the view to focus on splitting and 
 * joining events.
 * Overrides the certain force layout functions of the graph to partition a split
 * into the focused nodes and the connected nodes.
 * 
 * Has save/load methods for the save state policy.
 * Has back button support.
 * Can auto change the title of the graph.
 */
angular.module('contiv.graph')
    .factory('SplitJoinViewPolicy', ['SplitJoinNodePolicy', 'VisualizerNode', function (SplitJoinNodePolicy, VisualizerNode) { 
        class SplitJoinViewPolicy extends SplitJoinNodePolicy.Policy{
            /**
             * Constructs the object.
             */
            constructor() {
                super();
                this.policyName = "SplitJoinViewPolicy";
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
                var state = graph.state.SplitJoinViewPolicy = {};
                state.savedStates = [];
                // state.focusGroup = null;
                state.eventHistory = [];
                state.focusGroups = [];
                state.foci = [];
                state.zooms = {};
                state.layout = {};
                state.layoutDefault = null;
                state.zoomDefault = null;
                state.nodeIdsToReshow = null;
                state.backButtonElem = null;
                state.titleElem = null;

                var consts = graph.consts.SplitJoinViewPolicy = {};
                consts.boundary = 0.8;

                //overriding d3force methods of the graph.
                graph.d3ForceBounds = this.d3ForceBounds;
                graph.d3ForceTick = this.d3ForceTick;
                graph.d3ForceStart = this.d3ForceStart;
                graph.d3ForceEnd = this.d3ForceEnd;
            }

            /**
             * Links the provided element a back button feature
             * Doesn't trigger the on-click event
             * That should be done through angular ng-click.
             *
             * @param      {jQuery}  elem    The jquery selected element
             */
            installBackButton(elem) {
                var thisGraph = this.graph,
                    thisPolicy = this,
                    state = thisGraph.state.SplitJoinViewPolicy;

                state.backButtonElem = elem;
                state.backButton = function() {
                    if (state.eventHistory.length > 0) {
                        thisPolicy.undoLastEvent.call(thisPolicy);
                    }
                }
            }

            /**
             * Will allow this policy to change the title of the graph
             * as split and join events occur.
             *
             * @param      {jQuery}  elem    The jquery selected element
             */
            installTitle(elem) {
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;

                state.titleElem = elem;
            }

            /**
             * Called when the graph is being destroyed
             *
             * @param      {Object}  savedState  Any property on this
             *                                   object will be accessible
             *                                   when the view reloads
             */
            destroy(savedState) {
                //Only if the save state policy is installed
                if (savedState != null) {
                    this.save(savedState);
                }
            }

            /**
             * Will save the current state, and all history.
             *
             * @param      {Object}  savedState  Any property on this
             *                                   object will be accessible
             *                                   when the view reloads
             */
            save(savedState) {
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;

                var nodes = thisGraph.nodes;
                var links = thisGraph.links;
                var currTitle = null;
                if (state.titleElem != null) {
                    currTitle = state.titleElem.text();
                }
                var focusGroups = state.focusGroups;
                var eventHistory = state.eventHistory;
                var zooms = state.zooms;
                var layout = state.layout;

                var layoutDefault = state.layoutDefault;
                var zoomDefault = state.zoomDefault;
                var ret = {nodes:nodes, links:links, 
                    states:state.savedStates, currTitle:currTitle, 
                    focusGroups: focusGroups,
                    eventHistory:eventHistory, zooms:zooms,
                    layout:layout, layoutDefault:layoutDefault,
                    zoomDefault:zoomDefault};
                savedState.SplitJoinViewPolicy = ret;
            }

            /**
             * Will be called when the graph is reloaded, assuming
             * save state policy is installed
             *
             * @param      {Object}  loadState  Contains all the saved
             *                                  variables
             */
            load(loadState) {
                var thisPolicy = this;
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;

                loadState = loadState.SplitJoinViewPolicy;
                state.savedStates = loadState.states;
                thisGraph.links = loadState.links;
                thisGraph.nodes = loadState.nodes;

                var currTitle = loadState.currTitle;
                if (state.titleElem != null) {
                    state.titleElem.text(currTitle);
                }
                state.eventHistory = loadState.eventHistory;
                state.focusGroups = loadState.focusGroups;
                state.zooms = loadState.zooms;
                state.layout = loadState.layout;
                state.layoutDefault = loadState.layoutDefault;
                state.zoomDefault = loadState.zoomDefault;

                if (state.backButtonElem != null) {
                    if (state.eventHistory.length > 0) {
                        state.backButtonElem.fadeTo('slow', 1);
                    }
                }

                var children_struct = thisGraph.dataSource.children_struct;

                _.forEach(thisGraph.nodes, function(d) {
                    d.SplitJoinViewPolicy = {};
                    if (_.includes(children_struct[state.focusGroups[0]], 
                            d.id)) {
                        d.SplitJoinViewPolicy.type = "focus";
                    } else {
                        d.SplitJoinViewPolicy.type = "connected";
                    }
                });

                //loading a previous layout
                var layout;
                if (state.focusGroups.length === 0) {
                    layout = state.layoutDefault;
                    var zoom = state.zoomDefault; 
                    thisGraph.zoomed(zoom[0], zoom[1]);
                } else {
                    var zoom = state.zooms[state.focusGroups];
                    if (zoom != null) {
                        thisGraph.zoomed(zoom[0], zoom[1]);
                    }
                    layout = state.layout[state.focusGroups];
                }

                //layout can't be null
                _.forEach(thisGraph.nodes, function(n) {
                    var pos = layout[n.id];
                    if (pos == null) {
                        console.log(layout, n);
                    }
                    n.x = pos.x;
                    n.y = pos.y;
                });
                thisGraph.state.initForce = true;
                thisGraph.updateGraph.call(thisGraph, function() {
                    thisPolicy.updateGraphCallback.call(thisPolicy);
                });
            }

            /**
             * Triggering split on double click
             * 
             * Focus group stores the node that is about to be split.
             * 
             * When focus group has length 0, the first split 
             * will just be pushed on.
             * The node will be split and pushed to the top half 
             * of the screen, and the bottom half will contain any
             * nodes it has connections to.
             * 
             * When a focus group length is >= 1, if the node to be
             * split is a focus node, it will replace focusGroups[0] and
             * the top half will be its children, and bottom half will
             * be the nodes it has connections to.
             * 
             * If the split is in the bottom half, then the bottom half
             * will display it's children and will only show connections between
             * the two groups, and will replace focusGroups[1].
             * 
             * @param      {D3Obj}   d3node  The d3 node
             * @param      {Object}  d       The matching data object
             */
            dblclick(d3node, d) {
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;

                //check if can split
                var name = d.id;
                var children_struct = thisGraph.dataSource.children_struct;
                if (children_struct[name] === undefined || _.isEmpty(children_struct[name])) {
                    return;
                }

                state.focusGroups.slice();

                if (state.focusGroups.length === 0) { //toplevel split
                    state.focusGroups.push(d.id);
                } else if (_.includes(children_struct[state.focusGroups[0]], 
                                d.id)) { //splitting a focus node
                    state.focusGroups[0] = d.id;
                } else if (state.focusGroups.length === 1) {//splitting a
                                                            //connected node
                    state.focusGroups.push(d.id);
                } else if (_.includes(children_struct[state.focusGroups[1]],
                                d.id)) {//splitting a
                                        //connected node
                    state.focusGroups[1] = d.id;
                }
                    
                if (state.focusGroups.length === 2 && 
                        state.focusGroups[1] === d.id) {
                    //Splitting a connected node, keep all focus nodes
                    var nodesToKeep = [d];
                    var nodeIdsToReshow = [];
                    var groupOneNodes = children_struct[state.focusGroups[0]];
                    _.forEach(thisGraph.nodes, function(node) {
                        if (_.includes(groupOneNodes, node.id)) {
                            nodeIdsToReshow.push(node.id);
                            nodesToKeep.push(node);
                        }
                    });
                } else {
                    //Make split nodes the focus and keep nodes that are connected
                    var nodesToKeep = [d];
                    var nodeIdsToReshow = [];
                    _.forEach(thisGraph.links, function(link) {
                        if (link.source === d &&
                                nodeIdsToReshow.indexOf(link.target.id) == -1) {
                            link.target.SplitJoinViewPolicy = {};
                            link.target.SplitJoinViewPolicy.type = "connected";
                            nodeIdsToReshow.push(link.target.id);
                            nodesToKeep.push(link.target);
                        } else if (link.target === d && 
                                nodeIdsToReshow.indexOf(link.source.id) == -1) {
                            link.source.SplitJoinViewPolicy = {};
                            link.source.SplitJoinViewPolicy.type = "connected";
                            nodeIdsToReshow.push(link.source.id);
                            nodesToKeep.push(link.source);
                        }
                    });
                }

                //Removing links from the node to be split
                thisGraph.circles.each(function(node) {
                    if (node.id !== d.id) {
                        thisGraph.spliceLinksForNode(node);
                    }
                });
                thisGraph.updateGraph();

                //disabling update graph to prevent new data from
                //redrawing links while there are animations going on
                thisGraph.state.disableUpdate = true;
                thisGraph.circles.each(function(node) {
                    if (node.id !== d.id) {
                        d3.select(this).transition().delay(200).duration(400).style("opacity", 0);
                    } else {
                        //disabling qtip if installed
                        if ($(this).qtip != null) {
                            $(this).qtip('disable', true);
                        }
                    }
                });

                var translate = thisGraph.dragSvg.translate();
                var scale = thisGraph.dragSvg.scale();
                var xLoc = (parseFloat(thisGraph.svg.style("width")) / scale) / 2  + translate[0];
                var yLoc = (parseFloat(thisGraph.svg.style("height")) / scale)/ 2  + translate[1];
                d.xStart = d.x;
                d.yStart = d.y;
                d.x = xLoc;
                d.y = yLoc;
                d3node.transition("nodePositionTransition")
                        .duration(750)
                        .attrTween("transform", function(d) {
                            var xStart = d.xStart;
                            var yStart = d.yStart;
                            d.xStart = d.x;
                            d.yStart = d.y;
                            return d3.interpolateString("translate(" + xStart + "," + yStart + ")", "translate(" + d.x + "," + d.y + ")");
                        });

                var splitNodeFunc = super.splitNode;
                state.nodeIdsToReshow = nodeIdsToReshow;
                //waiting for node transition
                var thisPolicy = this;
                setTimeout(function() {
                    thisGraph.nodes = nodesToKeep;
                    splitNodeFunc.call(thisPolicy, d);
                }, 750);
            }

            /**
             * To be called after the graph is split.
             * Brings all nodes back into view and sets their attributes
             */
            updateGraphCallback() {
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;

                    thisGraph.circles.each(function(node) {
                        d3.select(this).transition().duration(400).style("opacity", 1);
                        d3.select(this).classed("focus", false);
                        d3.select(this).classed("connected", false);

                        if (node.SplitJoinViewPolicy != null) {
                            if (node.SplitJoinViewPolicy.type === "focus") {
                                d3.select(this).classed("focus", true);
                            } else if (node.SplitJoinViewPolicy.type === "connected") {
                                d3.select(this).classed("connected", true);
                            }
                        }
                    });

                    state.nodeIdsToReshow = null;

                    thisGraph.updateGraph();
            }

            /**
             * Randomly sets the positions of any unset node
             */
            setPositions() {
                var thisGraph = this.graph,
                    thisPolicy = this,
                    graphConsts = thisGraph.consts;

                var offset = graphConsts.displayOffset;
                var nodes = thisGraph.nodes;
                var ret = thisPolicy.d3ForceBounds.call(thisGraph);

                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }

                _.forEach(nodes, function(node) {
                    if (node.x == null || node.y == null) {
                        var x = getRandomInt(node.radius + offset, ret.width - node.radius - offset);
                        var y = getRandomInt(node.radius + offset, ret.height - node.radius - offset);
                        node.x = x;
                        node.y = y;
                    }
                })
            }

            /**
             * Called on the start of the d3 force simulation
             * Will override the method of the graph
             * "this" points to the graph
             */
            d3ForceStart() {
                var thisGraph = this;
                thisGraph.circles
                    .attr('cx', function(d) { 
                        if (d.xStart != null) {
                            d.xStart = (d.xStart * thisGraph.dragSvg.scale()) + thisGraph.dragSvg.translate()[0];
                        }
                        return d.x;
                    })
                    .attr('cy', function(d) { 
                        if (d.yStart != null) {
                            d.yStart = (d.yStart *thisGraph.dragSvg.scale()) + thisGraph.dragSvg.translate()[1];
                        }
                        return d.y;
                    });

                thisGraph.paths
                    .attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });
            }

            /**
             * Called on the start of the d3 force simulation
             * Will override the method of the graph
             * "this" points to the graph
             */
            d3ForceEnd() {
                var thisGraph = this,
                    state = thisGraph.state,
                    statePolicy = state.SplitJoinViewPolicy;
                if (statePolicy.layoutDefault == null) {
                    var defaultLayout = {};
                    _.forEach(thisGraph.nodes, function(n) {
                        defaultLayout[n.id] = {x:n.x, y:n.y};
                    });
                    statePolicy.layoutDefault = defaultLayout;
                    var scale = thisGraph.dragSvg.scale();
                    var translate = thisGraph.dragSvg.translate();
                    statePolicy.zoomDefault = [translate, scale]; 
                }

                thisGraph.circles
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });

                thisGraph.paths.attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });
            }

            /**
             * Will be called during D3 force simulations
             * by the graph, so "this" will point to the graph object
             *
             * @param      {number}  width   D3 Layout Width
             * @param      {number}  height  D3 Layout Height
             */
            d3ForceTick(e, width, height) {
                var thisGraph = this,
                    state = thisGraph.state,
                    consts = thisGraph.consts,
                    statePolicy = state.SplitJoinViewPolicy;

                var offset = consts.displayOffset;
                var scale = thisGraph.dragSvg.scale();

                // Move nodes toward cluster focus.
                var foci = statePolicy.foci;
                function gravity(alpha) {
                    return function(d) {
                        if (foci.length === 2) {
                            if (d.SplitJoinViewPolicy.type === "focus") {
                                d.y += (foci[0] - d.y) * alpha;
                            } else {
                                d.y += (foci[1] - d.y) * alpha;
                            }
                            d.x += (width/2 - d.x) * alpha;
                        } else {
                            d.y += (height/2 - d.y) * alpha;
                            d.x += (width/2 - d.x) * alpha;
                        }
                    };
                }

                // Make sure nodes are within bounds
                thisGraph.circles
                    .each(this.d3ForceCollide(.5))
                    .each(gravity(.2 * e.alpha))
                    .attr("cx", function(d) { 
                        return d.x = Math.max((d.radius + offset)/scale, Math.min(width + ((-offset- d.radius) / scale), d.x));
                    })
                    .attr("cy", function(d) { 
                        if (d.SplitJoinViewPolicy == null || d.SplitJoinViewPolicy == null) {
                            d.y = Math.max((d.radius + offset)/scale, 
                                    Math.min(height + ((-offset - d.radius)/scale), d.y));
                            return d.y;
                        } else if (d.SplitJoinViewPolicy.type === "focus") {
                            d.y = Math.max(d.radius + offset, 
                                    Math.min((height + ((-offset - d.radius)/scale))*consts.SplitJoinViewPolicy.boundary, d.y));
                            return d.y;
                        } else if (d.SplitJoinViewPolicy.type === "connected") {
                            d.y = Math.max((height + ((offset - d.radius)/scale)) *consts.SplitJoinViewPolicy.boundary, 
                                    Math.min(height + ((-offset - d.radius)/scale), d.y));
                            return d.y;
                        }
                    });

                thisGraph.paths
                    .attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });

            }

            /**
             * Calculates the boundaries of the simulation
             * 
             * Will be called during D3 force simulations
             * by the graph, so "this" will point to the graph object
             * 
             * @return     {Object}          Returns an object
             *                               that has the width
             *                               and height as 
             *                               properties 
             */
            d3ForceBounds() {
                var thisGraph = this,
                    state = thisGraph.state,
                    consts = thisGraph.consts,
                    constsPolicy = consts.SplitJoinViewPolicy,
                    statePolicy = state.SplitJoinViewPolicy;
                var nodes = thisGraph.nodes;
                function calcMaxNodes(width, height) {
                    var area = width * height;
                    var radius = thisGraph.consts.startRadius;
                    //treating them as a square for approx
                    var length = (radius *3.5);
                    var amount = area /(length *length);
                    return amount;
                }
                //The offset is the buffer from the edges
                //Original Width and Height are given to the force layout
                //so that it is centered, but nodes will be forced to be
                //within the offset bounds
                var offset = consts.displayOffset;
                var svgWidth = parseFloat(thisGraph.svg.style("width"));
                var svgHeight = parseFloat(thisGraph.svg.style("height"));

                var width = svgWidth;
                var height = svgHeight;

                var amount = calcMaxNodes(width - (2*offset), height - (2*offset));
                var scale = 1;
                if (nodes.length > amount) {
                    scale = amount / nodes.length;
                    thisGraph.zoomed(thisGraph.dragSvg.translate(), scale);
                    width /= scale;
                    height /= scale;
                } else {
                    thisGraph.zoomed(thisGraph.dragSvg.translate(), scale);
                }

                //calculating foci for simulation
                var focusGroups = statePolicy.focusGroups;
                var foci;
                if (focusGroups.length === 0) {
                    foci = [height/2];
                } else {
                    //setting foci height position based on percentage
                    var focusNodes = thisGraph.dataSource.children_struct[focusGroups[0]];
                    constsPolicy.boundary = focusNodes.length / nodes.length;
                    var top = height * constsPolicy.boundary;
                    var bot = height - top;
                    if (top < 2*thisGraph.consts.maxRadius) {
                        constsPolicy.boundary = (2.5 * thisGraph.consts.maxRadius) / height;
                        top = height * constsPolicy.boundary;
                        bot = height - top;

                    }
                    if (bot < 2* thisGraph.consts.maxRadius) {
                        constsPolicy.boundary = 1 - ((2.5 * thisGraph.consts.maxRadius) / height);
                        top = height * constsPolicy.boundary;
                        bot = height - top;
                    }
                    foci = [top/2, top + bot / 2];

                }
                statePolicy.foci = foci;
                return {width:width, height:height};
            }

            /**
             * Called after a single node is split
             * 
             * @param      {Array}  newNodes  The new nodes
             */
            splitNodeEvent(newNodes) {
                var thisPolicy = this;
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;

                var children_struct = thisGraph.dataSource.children_struct;
                _.forEach(newNodes, function(d){
                    d.SplitJoinViewPolicy = {};
                    if (_.includes(children_struct[state.focusGroups[0]], 
                            d.id)) {
                        d.SplitJoinViewPolicy.type = "focus";
                    } else {
                        d.SplitJoinViewPolicy.type = "connected";
                    }
                });

                var title = newNodes[0].parent;
                // state.focusGroup = title;

                //if the last event has the same id, it must be the
                //oppposite of this event, so we remove that event from
                //the event stack.
                //Otherwise, we add the event ot the stack
                if (state.eventHistory.length !== 0 &&
                        state.eventHistory[state.eventHistory.length - 1].id === title) {
                    state.eventHistory.pop();
                } else {
                    state.eventHistory.push({id:title, event:'split'});
                }

                if (state.backButtonElem != null && 
                            state.eventHistory.length !== 0) {
                    state.backButtonElem.fadeTo('slow', 1);
                }
                
                if (state.titleElem != null) {
                    var text = "";
                    if (state.focusGroups.length > 0) {
                        text += state.focusGroups[0];
                    }
                    if (state.focusGroups.length === 2) {
                        text += ' & ' + state.focusGroups[1];
                    }
                    state.titleElem.text(text);
                }

                //re-enable graph update
                thisGraph.state.disableUpdate = false;
                thisPolicy.setLayout();
            }

            /**
             * Sets the layout of the nodes. 
             * If there is a previous layout, it will be loaded.
             * Else, it will run a D3 Force simulation and create one.
             */
            setLayout() {
                var thisPolicy = this;
                var thisGraph = this.graph,
                    state = thisGraph.state.SplitJoinViewPolicy;
                var layout;
                if (state.focusGroups.length === 0) {
                    layout = state.layoutDefault;
                    var zoom = state.zoomDefault;
                    thisGraph.zoomed(zoom[0], zoom[1]);
                } else {
                    var zoom = state.zooms[state.focusGroups];
                    if (zoom != null) {
                        thisGraph.zoomed(zoom[0], zoom[1]);
                    }
                    layout = state.layout[state.focusGroups];
                }

                if (layout != null) {
                    _.forEach(thisGraph.nodes, function(n) {
                        var pos = layout[n.id];
                        if (pos == null) {
                            console.log(layout, n);
                        }
                        n.x = pos.x;
                        n.y = pos.y;
                    });
                    thisGraph.updateGraph.call(thisGraph, function() {
                        thisPolicy.updateGraphCallback.call(thisPolicy);
                    });
                } else {
                    //Need to run a force simulation as this layout
                    //hasn't been done before
                    thisGraph.state.initForce = false;
                    // thisPolicy.setPositions();
                    thisGraph.updateGraph(function() {
                        thisPolicy.updateGraphCallback.call(thisPolicy);
                    });
                    state.zooms[state.focusGroups] = [thisGraph.dragSvg.translate(),
                                                        thisGraph.dragSvg.scale()];
                    var layout = {};
                    _.forEach(thisGraph.nodes, function(n) {
                        layout[n.id] = {x:n.x, y:n.y};
                    });
                    state.layout[state.focusGroups] = layout;
                } 
            }

            /**
             * Overriding from super class so that we can have
             * top level nodes reappear when they are hidden
             * due to there being two focus groups.
             * 
             * @param      {Node}          node    The node to join
             * @return     {Node}  The new node after the join
             */
            __joinNode(node) {
                var thisGraph = this.graph,
                    stateSuper = thisGraph.state.SplitJoinNodePolicy,
                    state = thisGraph.state.SplitJoinViewPolicy;

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

                var parent = node.parent;
                var to_be_deleted = [];
                var nodeNameSet = [];
                for (var i = 0; i < thisGraph.nodes.length; i++) {
                    //if node won't be collapsed
                    if (thisGraph.nodes[i].ancestors.indexOf(node.parent) == -1) {
                        nodeNameSet.push(thisGraph.nodes[i].id);
                    } else {
                        to_be_deleted.push(thisGraph.nodes[i]);
                    }
                }
                var new_node_id = node.parent;
                nodeNameSet.push(node.parent);

                var ancestors_struct = thisGraph.dataSource.ancestors_struct;
                var children_struct = thisGraph.dataSource.children_struct;
                // - setting focusGroups -
                //either replacing one of the groups,
                //or joining back into a top level, so there is only
                //one focus
                var index = state.focusGroups.indexOf(parent);
                if (ancestors_struct[parent] != null) {
                    state.focusGroups[index] = ancestors_struct[parent];
                } else {
                    state.focusGroups.splice(index, 1);
                }

                //nameToAdd are top level nodes that are to be added
                //to the graph.
                var nameToAdd = [];
                //will only need to add a top level node if there is
                //only one focus
                if (state.focusGroups.length === 1) {
                    //Add only thost that aren't an ancestor of the node
                    //to join, the focus group or an ancestor of it,
                    //and aren't already in nodeNameSet.
                    //get flow between top level as long as
                    //the top level isn't an ancestor of the
                    //focus group, and isn't already part of the
                    //node set;
                    var ancestors = ancestors_struct[node.id];
                    ancestors.push(state.focusGroups[0]);
                    //the or empty array is to prevent concatenating a null
                    //or undefined value
                    ancestors = ancestors.concat(ancestors_struct[state.focusGroups[0]] || []);
                    _.forEach(children_struct.topLevel, function(n) {
                        if (ancestors.indexOf(n) === -1 &&
                                nodeNameSet.indexOf(n) == -1) {
                            nameToAdd.push(n);
                        }
                    });
                    nodeNameSet = nodeNameSet.concat(nameToAdd);
                } else if (state.focusGroups.length === 0) {
                    //no focus groups means we are at top level
                    //Should add any top level nodes that aren't
                    //already there
                    _.forEach(children_struct.topLevel, function(n) {
                        if (nodeNameSet.indexOf(n) == -1) {
                            nameToAdd.push(n);
                        }
                    });
                    nodeNameSet = nodeNameSet.concat(nameToAdd);
                }

                //formatting data
                var radius = node.radius / thisGraph.consts.radiusDecay; 
                var xLoc = node.x;
                var yLoc = node.y;
                var parent = node.ancestors[1];
                var ancestors = node.ancestors.slice(1);
                var newNode = new VisualizerNode.Node(xLoc, yLoc, new_node_id, new_node_id, radius, parent, ancestors);
                thisGraph.nodes.push(newNode);

                //remove all nodes that will be joined
                for (var i = 0; i < to_be_deleted.length; i++) {
                    var node_to_delete = to_be_deleted[i];
                    thisGraph.nodes.splice(thisGraph.nodes.indexOf(node_to_delete), 1);
                    thisGraph.spliceLinksForNode(node_to_delete);
                }

                var retData = thisGraph.dataSource.getFlowBetweenSet(nodeNameSet);
                //holds the nodeData which will be processed
                var nodesToProcess = [];
                //finding the node data that corresponds to the top level
                //nodes to add - nameToAdd.
                var nodeData = retData.nodeData;
                for (var i = 0; i < nodeData.length; i++) {
                    if (nameToAdd.indexOf(nodeData[i].id) !== -1) {
                        nodesToProcess.push(nodeData[i]);
                    }
                }

                //The top level nodes that are added
                var newNodes = thisGraph.dataSource.processNodeData(nodesToProcess);
                _.forEach(newNodes, function(n) {
                    n.radius = n.radius || thisGraph.consts.startRadius;
                });
                thisGraph.nodes = thisGraph.nodes.concat(newNodes);

                thisGraph.links = thisGraph.dataSource.processLinkData(retData.linkData, thisGraph.nodes);
                //Only keep top level nodes that have connections to
                //the current focus group
                //we remove the node name from nameToAdd if we are
                //keeping it
                if (state.focusGroups.length === 1) {
                    _.forEach(thisGraph.links, function(l) {
                        //checking if there exists a link touching each of nameToAdd
                        if (nameToAdd.indexOf(l.source.id) !== -1) {
                            if (state.focusGroups[0] === l.target.parent) {
                                nameToAdd.splice(nameToAdd.indexOf(l.source.id), 1);
                            }
                        } else if (nameToAdd.indexOf(l.target.id) !== -1) {
                            if (state.focusGroups[0] === l.source.parent) {
                                nameToAdd.splice(nameToAdd.indexOf(l.target.id), 1);
                            }
                        }
                    })
                } else {
                    //We want to keep them all
                    //since any left in nameToAdd will be removed,
                    //we reset nameToAdd here.
                    nameToAdd = [];
                }
                
                //whatever is remaining in nameToAdd isn't connected
                //to the focus group, so we should remove it.
                var nodeToRemove = [];
                if (nameToAdd.length !== 0) {
                    for (var i = 0; i < thisGraph.nodes.length; i++) {
                        if (nameToAdd.indexOf(thisGraph.nodes[i].id) !== -1) {
                            nameToAdd.splice(nameToAdd.indexOf(thisGraph.nodes[i].id), 1);
                            thisGraph.spliceLinksForNode(thisGraph.nodes[i]);
                            nodeToRemove.push(thisGraph.nodes[i]);
                            if (nameToAdd.length === 0) {
                                break;
                            }
                        }
                    }
                }
                _.forEach(nodeToRemove, function(n) {
                    thisGraph.nodes.splice(thisGraph.nodes.indexOf(n), 1);
                });

                thisGraph.initNodes();
                thisGraph.initLinks();

                stateSuper.splitNodes.splice(stateSuper.splitNodes.indexOf(newNode.id), 1);

                return newNode; 
            }

            /**
             * Called after a single node is joined
             * 
             * If the focus group has been seen before, it will
             * load that layout. Otherwise, it will run a d3 force
             * simulation to generate one.
             *
             * @param      {Node}  newNode  The new node
             */
            joinNodeEvent(newNode) {
                var thisGraph = this.graph,
                    thisPolicy = this,
                    state = thisGraph.state.SplitJoinViewPolicy;

                //if the last event has the same id, it must be the
                //oppposite of this event, so we remove that event from
                //the event stack.
                //Otherwise, we add the event to the stack
                if (state.eventHistory.length !== 0 &&
                    state.eventHistory[state.eventHistory.length - 1].id === newNode.id) {
                    state.eventHistory.pop();
                } else {
                    state.eventHistory.push({id:newNode.id, event:'join'})
                }

                var children_struct = thisGraph.dataSource.children_struct;

                _.forEach(thisGraph.nodes, function(d) {
                    d.SplitJoinViewPolicy = {};
                    if (_.includes(children_struct[state.focusGroups[0]], 
                            d.id)) {
                        d.SplitJoinViewPolicy.type = "focus";
                    } else {
                        d.SplitJoinViewPolicy.type = "connected";
                    }
                });

                //setting back button
                if (state.backButtonElem != null &&
                         state.eventHistory.length === 0) {
                    state.backButtonElem.fadeTo('slow', 0);
                }

                //setting title
                if (state.titleElem != null) {
                    var text = "";
                    if (state.focusGroups.length > 0) {
                        text += state.focusGroups[0];
                    }
                    if (state.focusGroups.length === 2) {
                        text += ' & ' + state.focusGroups[1];
                    }
                    state.titleElem.text(text);
                }
                thisPolicy.setLayout();
            }

            /**
             * Undoes the last split or join event.
             * Meant to be called by the back button.
             */
            undoLastEvent() {
                var thisGraph = this.graph,
                    thisPolicy = this,
                    state = thisGraph.state.SplitJoinViewPolicy;

                var last = state.eventHistory[state.eventHistory.length - 1];
                var id = last.id;
                var node;
                if (last.event === 'join') {
                    node = thisGraph.findNodeById(id);
                    var d3node = thisGraph.findD3Node(id);
                    thisPolicy.dblclick(d3node, node);
                } else {
                    var nodeId = thisGraph.dataSource.children_struct[id][0];
                    node = thisGraph.findNodeById(nodeId);
                    super.joinNode.call(thisPolicy, node);
                }
            }
        }

        return {
            Policy: SplitJoinViewPolicy
        }
}]);







