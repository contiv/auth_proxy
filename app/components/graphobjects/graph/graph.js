/**
 * The base class the graph object. Any nodes or links that are contained in
 * its nodes or links property will be drawn on updateGraph.
 * Supports policies.
 * 
 * To write your own graph object, create a new factory that uses the graph
 * you want to inherit as a dependency, and extend its graph class. 
 * Return the class object with Graph as key.
 * 
 */
angular.module('contiv.graph')
    .factory('Graph', ['PolicyService', function (PolicyService) {
        class Graph {
            /**
             * constructor for the graph
             *
             * @param      {HTML SVG}  svg     The svg that will 
             *                                 hold the graph
             * @param      {Array}  nodes      List of nodes for the graph
             * @param      {Array}  links      List of links for the graph
             */
            constructor(svg, nodes, links) {
                var thisGraph = this;

                thisGraph.nodes = nodes || [];
                thisGraph.links = links || [];

                thisGraph.defaultNodePolicies = [];
                thisGraph.defaultPathPolicies = [];

                thisGraph.svgPolicy = new PolicyService.Policy();

                thisGraph.state = {
                    canZoom: true,
                    canPan: true,
                    initForce: false,
                    disableUpdate: false
                };

                thisGraph.consts = {
                    circleGClass: "conceptG",
                    graphClass: "graph",
                    pathClass: "path",
                    nodeClass: "circle",
                    nodeText: "nodeText",
                    startRadius: 50,
                    maxRadius: 60,
                    padding: 5,
                    displayOffset: 60
                };

                svg.on("mouseover", function(d){
                        thisGraph.svgPolicy["mouseover"].call(this, d);    
                    })
                    .on("dblclick", function(d) {
                        thisGraph.svgPolicy["dblclick"].call(this, d);    
                    })
                    .on("contextmenu", function(d) {
                        thisGraph.svgPolicy["contextmenu"].call(this, d);    
                    })
                    .on("mouseout", function(d){
                        thisGraph.svgPolicy["mouseout"].call(this, d);    
                    })
                    .on("mousedown", function(d){
                        thisGraph.svgPolicy["mousedown"].call(this, d);    
                    })
                    .on("mouseup", function(d){
                        thisGraph.svgPolicy["mouseup"].call(this, d);    
                    });

                // define arrow markers for graph links
                var defs = svg.append('svg:defs');
                defs.append('svg:marker')
                    .attr('id', 'end-arrow')
                    .attr("viewBox", "0 -5 10 10")
                    .attr("refX", 20)
                    .attr("refY", -1)
                    .attr("markerWidth", 6)
                    .attr("markerHeight", 6)
                    .attr("orient", "auto")
                    .append("path")
                    .attr("d", "M0,-5L10,0L0,5");

                // define arrow markers for leading arrow
                defs.append('svg:marker')
                    .attr('id', 'mark-end-arrow')
                    .attr('viewBox', '0 -5 10 10')
                    .attr('refX', 7)
                    .attr('markerWidth', 3.5)
                    .attr('markerHeight', 3.5)
                    .attr('orient', 'auto')
                    .append('svg:path')
                    .attr('d', 'M0,-5L10,0L0,5');

                thisGraph.svg = svg;
                thisGraph.svgG = svg.append("g")
                    .classed(thisGraph.consts.graphClass, true);
                var svgG = thisGraph.svgG;

                // svg nodes and links 
                thisGraph.paths = svgG.append("g").selectAll("g");
                thisGraph.circles = svgG.append("g").selectAll("g");
                thisGraph.initNodes();
                thisGraph.initLinks();

                thisGraph.setPositions();
                var resizeFunc = function() {
                    thisGraph.onWindowResize(svg);
                };

                thisGraph.bindings = {
                    resize:resizeFunc
                };
                $(window).resize(resizeFunc);
            }

            /**
             * calls the destroy method for all policies
             */
            destroy() {
                var thisGraph = this;
                 _(thisGraph.defaultNodePolicies).forEach(function(policy) {
                    policy.destroy();
                });
                _(thisGraph.defaultPathPolicies).forEach(function(policy) {
                    policy.destroy();
                });
                thisGraph.svgPolicy.destroy();
                for (var key in thisGraph.bindings) {
                    $(window).off(key, thisGraph.bindings[key]);
                }
            }

            /**
             * Runs the init function for all the nodes
             */
            initNodes() {
                var thisGraph = this;
                _.forEach(thisGraph.nodes, function(node) {
                    node.initialize(thisGraph);
                });
            }

            /**
             * Runs the init function for all the links
             */
            initLinks() {
                var thisGraph = this;
                _.forEach(thisGraph.links, function(link) {
                    link.initialize(thisGraph);
                });
            }

            /**
             * returns the node matching the id, 
             * or undefined if there is none
             *
             * @param      {Object}  id      The identifier
             * @return     {Node}  { matching node }
             */
            findNodeById(id){
                var thisGraph = this;
                for (var i = 0; i < thisGraph.nodes.length; i++) {
                    if (id === thisGraph.nodes[i].id) {
                        return thisGraph.nodes[i];
                    }
                }
            };

            /**
             * Returns the d3Node object that matches the id,
             * or undefined if there is none
             *
             * @param      {string}  id      The identifier
             * @return     {D3Node} The d3 node
             */
            findD3Node(id) {
                var thisGraph = this;
                var d3Node;
                thisGraph.circles.each(function(d) {
                    if (d.id === id) {
                        d3Node = d3.select(this);
                    }
                });
                return d3Node;
            }

            /**
             * Used to install a drag policy that will be called
             * when nodes are dragged
             *
             * @param      {d3.behavior.drag}  d3drag  D3 drag object
             */
            installDragPolicy(d3drag) {
                this.drag = d3drag;
            }

            /**
             * Used to install a policy that will be called 
             * when there is mouse interactions with the graph's svg
             *
             * @param      {Policy}  policy  The policy to install
             */
            installSvgPolicy(policy) {
                this.svgPolicy = policy;
            }

            /**
             * Used to install policies that are called when there is
             * mouse interaction with a node
             *
             * @param      {Policy}  policy  The policy to install
             */
            installDefaultNodePolicy(policy) {
                var thisGraph = this;
                thisGraph.defaultNodePolicies.push(policy);
                policy.initialize(thisGraph);
            }


            /**
             * Used to remove an installed policy for nodes
             *
             * @param      {Node}  policyRemove  The policy to remove
             */
            uninstallDefaultNodePolicy(policyRemove) {
                var policyRemoveName;
                if (typeof policyRemove === 'string') {
                    policyRemoveName = policyRemove;
                } else {
                    policyRemoveName = policyRemove.policyName;
                }
                _(thisGraph.defaultNodePolicies).forEach(function(policy, index) {
                    if (policy.policyName === policyRemoveName) {
                        policy.destroy();
                        thisGraph.defaultNodePolicies.splice(index, 1);
                    }
                });
            }

            /**
             * Returns the node policy object with the given name
             *
             * @param      {string}  policyName  The policy name
             * @return     {Policy}  policy      The matching policy
             */
            getNodePolicy(policyName) {
            	var thisGraph = this;

                _(thisGraph.defaultNodePolicies).forEach(function(policy, index) {
                    if (policy.policyName === policyName) {
                        return policy;
                    }
                });
            }

            /**
             * Used to install policies that are called when there is a
             * mouse interaction with a path
             *
             * @param      {Policy}  policy  The policy to install
             */
            installDefaultPathPolicy(policy) {
                var thisGraph = this;
                thisGraph.defaultPathPolicies.push(policy);
                policy.initialize(thisGraph);
            }

            /**
             * Used to remove an installed policy for links
             *
             * @param      {Policy}  policyRemove  The policy to remove
             */
            uninstallDefaultPathPolicy(policyRemove) {
                var policyRemoveName;
                var thisGraph = this;
                if (typeof policyRemove === 'string') {
                    policyRemoveName = policyRemove;
                } else {
                    policyRemoveName = policyRemove.policyName;
                }
                _(thisGraph.defaultPathPolicies).forEach(function(policy, index) {
                    if (policy.policyName === policyRemoveName) {
                        policy.destroy();
                        thisGraph.defaultPathPolicies.splice(index, 1);
                    }
                });
            }
            
            /**
             * Called when there is a mouse interaction with a path
             * Propogates the event to all installed path policies
             *
             * @param      {string}  event   The event type
             * @param      {d3object}  d3path  The d3 path
             * @param      {Path}  d       The matching Link object
             */
            pathPolicyEvent(event, d3path, d) {
                var thisGraph = this;
                _(thisGraph.defaultPathPolicies).forEach(function(policy) {
                    policy[event](d3path, d);
                })
            }

            /**
             * Called when there is a mouse interaction with a node
             * Propogates the event to all installed node policies
             * 
             * @param      {string}  event   The event type
             * @param      {d3object}  d3node  The d3 node
             * @param      {Path}  d       The matching Node object
             */
            nodePolicyEvent(event, d3node, d) {
                var thisGraph = this;
                _.forEach(thisGraph.defaultNodePolicies, function(policy) {
                    policy[event](d3node, d);
                })
            }

            /**
             * Sets pan and zoom rules for the graph
             *
             * @param      {d3.behavior.zoom}  d3zoom  D3 zoom obj
             */
            installZoomPolicy(d3zoom) {
                this.dragSvg = d3zoom;
                this.svg.call(this.dragSvg);
            }

            /**
             * Called when the window is resized
             * Hook for overriding in subclasses
             *
             * @param      {HTML SVG}  svg     The svg that the handler
             *                                 is attached to
             */
            onWindowResize(svg) {}

            /**
             * Inserts line breaks in node text
             *
             * @param      {HTML Elem}  gEl    The elem to add text to
             * @param      {string}  title   The title
             */
            insertTitleLinebreaks (gEl, title) {
                var thisGraph = this;
                var words = title.split(/\s+/g),
                    nwords = words.length;
                var el = gEl.append("text")
                    .attr('class', thisGraph.consts.nodeText)
                    .attr("text-anchor","middle")
                    .attr("dy", "-" + (nwords-1)*7.5);

                for (var i = 0; i < words.length; i++) {
                    var tspan = el.append('tspan').text(words[i]);
                if (i > 0)
                    tspan.attr('x', 0).attr('dy', '15');
                }
            }

            /**
             * Removes all links from the given node
             *
             * @param      {Node}  node    The node
             */
            spliceLinksForNode(node) {
                var thisGraph = this,
                    toSplice = thisGraph.links.filter(function(l) {
                        return (l.source === node || l.target === node);
                    });
                toSplice.map(function(l) {
                    thisGraph.links.splice(thisGraph.links.indexOf(l), 1);
                });
            }

            /**
             * Adds the node to the graph and updates
             *
             * @param      {Node}  node    The node
             */
            addNode(node) {
                var thisGraph = this;
                thisGraph.nodes.push(node);
                node.initialize(thisGraph);
                thisGraph.updateGraph();
            };

            /**
             * Removes the node to the graph and updates
             *
             * @param      {Node}  node    The node
             */
            removeNode(node) {
                var thisGraph = this;
                thisGraph.nodes.splice(thisGraph.nodes.indexOf(node), 1);
                thisGraph.spliceLinksForNode(node);

                thisGraph.updateGraph();
            };

            /**
             * Adds the link to the graph and updates
             *
             * @param      {link}  link    The link
             */
            addLink(link) {
                var thisGraph = this;
                thisGraph.links.push(link);
                link.initialize(thisGraph);
                thisGraph.updateGraph();
            };

            /**
             * Removes the link to the graph and updates
             *
             * @param      {link}  link    The link
             */
            removeLink(link) {
                var thisGraph = this;
                thisGraph.links.splice(thisGraph.links.indexOf(link), 1);
                link.initialize(thisGraph);
                thisGraph.updateGraph();
            }

            /**
             * Called when the graph is updating existing paths
             *
             * @param      {Path}  paths   List of paths
             */
            updateExistingPaths(paths) {
                paths.each(function(d) {
                    d.updateAttr(d3.select(this), d);
                });
            }

            /**
             * Called when the graph is adding new paths
             *
             * @param      {Path}  newPaths  List of new paths
             */
            updateNewPaths(newPaths) {
                var thisGraph = this;

                thisGraph.initLinks();

                newPaths.each(function(d) {
                    d.newPathAttr(d3.select(this), d);
                });

                //if node doesn't have its own policy, use default for the graph
                newPaths.on("mouseover", function(d){
                        if (d.hasPolicy) {
                            d.pathPolicyEvent("mouseover", d3.select(this), d);    
                        } else {
                            thisGraph.pathPolicyEvent("mouseover", d3.select(this), d);    
                        }
                    })
                    .on("dblclick", function(d) {
                        if (d.hasPolicy) {
                            d.pathPolicyEvent("dblclick", d3.select(this), d);    
                        } else {
                            thisGraph.pathPolicyEvent("dblclick", d3.select(this), d);    
                        }
                    })
                    .on("contextmenu", function(d) {
                        if (d.hasPolicy) {
                            d.pathPolicyEvent("contextmenu", d3.select(this), d);    
                        } else {
                            thisGraph.pathPolicyEvent("contextmenu", d3.select(this), d);    
                        }
                    })
                    .on("mouseout", function(d){
                        if (d.hasPolicy) {
                            d.pathPolicyEvent("mouseout", d3.select(this), d);    
                        } else {
                            thisGraph.pathPolicyEvent("mouseout", d3.select(this), d);    
                        }
                    })
                    .on("mousedown", function(d){
                        if (d.hasPolicy) {
                            d.pathPolicyEvent("mousedown", d3.select(this), d);    
                        } else {
                            thisGraph.pathPolicyEvent("mousedown", d3.select(this), d);    
                        }
                    })
                    .on("mouseup", function(d){
                        if (d.hasPolicy) {
                            d.pathPolicyEvent("mouseup", d3.select(this), d);    
                        } else {
                            thisGraph.pathPolicyEvent("mouseup", d3.select(this), d);    
                        }
                    })
                    .call(thisGraph.drag);
            }


            /**
             * Called when the graph is updating existing nodes
             */
            updateExistingNodes() {
                var thisGraph = this;
                thisGraph.circles = this.circles.data(thisGraph.nodes, function(d){ return d.id;})
                    .each(function(d) {
                        d.updateAttr(d3.select(this), d);
                    });

            }

            /**
             * Called when the graph is adding new nodes
             *
             * @param      {Node}  newNodes  List of new nodes
             */
            updateNewNodes(newNodes) {
                var thisGraph = this;

                newNodes.each(function(d) {
                    if (d.graph == null) {
                        d.initialize(thisGraph);
                    }
                    d.newNodeAttr(d3.select(this), d);
                });

                
                //if node doesn't have its own policy, use default for the graph
                newNodes.on("mouseover", function(d){
                        if (d.hasPolicy) {
                            d.nodePolicyEvent("mouseover", d3.select(this), d);    
                        } else {
                            thisGraph.nodePolicyEvent("mouseover", d3.select(this), d);    
                        }
                    })
                    .on("dblclick", function(d) {
                        if (d.hasPolicy) {
                            d.nodePolicyEvent("dblclick", d3.select(this), d);    
                        } else {
                            thisGraph.nodePolicyEvent("dblclick", d3.select(this), d);    
                        }
                    })
                    .on("contextmenu", function(d) {
                        if (d.hasPolicy) {
                            d.nodePolicyEvent("contextmenu", d3.select(this), d);    
                        } else {
                            thisGraph.nodePolicyEvent("contextmenu", d3.select(this), d);    
                        }
                    })
                    .on("mouseout", function(d){
                        if (d.hasPolicy) {
                            d.nodePolicyEvent("mouseout", d3.select(this), d);    
                        } else {
                            thisGraph.nodePolicyEvent("mouseout", d3.select(this), d);    
                        }
                    })
                    .on("mousedown", function(d){
                        if (d.hasPolicy) {
                            d.nodePolicyEvent("mousedown", d3.select(this), d);    
                        } else {
                            thisGraph.nodePolicyEvent("mousedown", d3.select(this), d);    
                        }
                    })
                    .on("mouseup", function(d){
                        if (d.hasPolicy) {
                            d.nodePolicyEvent("mouseup", d3.select(this), d);    
                        } else {
                            thisGraph.nodePolicyEvent("mouseup", d3.select(this), d);    
                        }
                    })
                    .call(thisGraph.drag);

                newNodes.append("circle")
                .attr("r", function(d) {return String(d.radius)});


                newNodes.each(function(d){
                    thisGraph.insertTitleLinebreaks(d3.select(this), d.text);
                });
            }

            /**
             * Prevents nodes from colliding
             *
             * @param      {number}  alpha   Affects how much change
             *                               the collision causes
             * @return     {boolean}  {Whether nodes are collided}
             */
            d3ForceCollide(alpha) {
            	var thisGraph = this,
            		consts = thisGraph.consts;
            	var nodes = thisGraph.nodes;
            	var quadtree = d3.geom.quadtree(nodes);
                    return function(d) {
                    var r = d.radius + consts.maxRadius + consts.padding,
                        nx1 = d.x - r,
                        nx2 = d.x + r,
                        ny1 = d.y - r,
                        ny2 = d.y + r;
                    quadtree.visit(function(quad, x1, y1, x2, y2) {
                        if (quad.point && (quad.point !== d)) {
                            var x = d.x - quad.point.x,
                                y = d.y - quad.point.y,
                                l = Math.sqrt(x * x + y * y),
                                r = d.radius + quad.point.radius + consts.padding;
                            if (l < r) {
                              l = (l - r) / l * alpha;
                              d.x -= x *= l;
                              d.y -= y *= l;
                              quad.point.x += x;
                              quad.point.y += y;
                            }
                        }
                      return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
                    });
                };
            }

            /**
             * Tick of the d3 force simulation
             *
             * @param      {D3tick event}  e    D3tick event
             * @param      {number}  width  The width of the simulation
             * @param      {number}  height The height of the simulation
             */
            d3ForceTick(e, width, height) {
            	var thisGraph = this,
            		consts = thisGraph.consts;

            	var offset = consts.displayOffset;	
            	var nodes = thisGraph.nodes;
            	var q = d3.geom.quadtree(thisGraph.nodes),
                      i = 0,
                      n = nodes.length;

                  while (++i < n) {
                    q.visit(this.d3ForceCollide(nodes[i]));
                  }

                thisGraph.circles.each(this.d3ForceCollide(.5))
                    .attr("cx", function(d) { return d.x = Math.max(d.radius + offset, Math.min(width - offset - d.radius, d.x)); })
                     .attr("cy", function(d) { return d.y = Math.max(d.radius + offset, Math.min(height - offset - d.radius, d.y)); });

                thisGraph.paths
                    .attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });
            }

            /**
             * Starts on start of the force simulation
             */
            d3ForceStart() {
            	var thisGraph = this;
                thisGraph.paths
                    .attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });
            }

            /**
             * Called on the end of the force simulation
             */
            d3ForceEnd() {
            	var thisGraph = this;
            	thisGraph.circles
                    .attr('cx', function(d) { return d.x; })
                    .attr('cy', function(d) { return d.y; });

                thisGraph.paths.attr('x1', function(d) { return d.source.x; })
                    .attr('y1', function(d) { return d.source.y; })
                    .attr('x2', function(d) { return d.target.x; })
                    .attr('y2', function(d) { return d.target.y; });
            }

            /**
             * Calculates the width and height bounds for the 
             * force simulation
             *
             * @return     {Object}  width and height as properties 
             */
            d3ForceBounds() {
                var svgWidth = $('#visualization-graph').width();
                var svgHeight = $('#visualization-graph').height();

                var width = svgWidth;
                var height = svgHeight;
                return {width:width, height:height};
            }

            /**
             * Does a d3 force simulation
             *
             * @param      {Function}  callback  The callback
             */
            setForce(callback) {
                var thisGraph = this;

                var nodes = thisGraph.nodes;
                var links = thisGraph.links;
                if (_.isEmpty(nodes)) {
                    return;
                }

                var bounds = thisGraph.d3ForceBounds();

                var force = d3.layout.force()
                    .size([bounds.width, bounds.height])
                    .nodes(nodes)
                    .charge(function(d) {
                        return -6000;
                    })
                    .links(links);

                force.linkDistance(bounds.width/3);
                force.linkStrength(.2);
                force.gravity(.2);

                force.on('tick', function(e) {
                	thisGraph.d3ForceTick.call(thisGraph, 
                			e, bounds.width, bounds.height);
                });

                force.on('start', function() {
                	thisGraph.d3ForceStart.call(thisGraph)
                });

                force.on('end', function() {
                	thisGraph.d3ForceEnd.call(thisGraph)
                }); 


                force.start();
                var k = 0;
                while ((force.alpha() > 1e-2) && (k < 150)) {
                    force.tick();
                    k = k + 1;
                }
                force.stop();

                if (callback != null) {
                	callback();
                }
            }

            /**
             * Sets the positions to be the center of the screen if 
             * not provided
             * also sets the radius of the nodes
             */
            setPositions() {
                var thisGraph = this;

                var offset = thisGraph.consts.displayOffset;
                var svgWidth = $('#visualization-graph').width();
                var svgHeight = $('#visualization-graph').height();

                var width = svgWidth - (2*offset);
                var height = svgHeight - (2*offset);

                var nodes = thisGraph.nodes;

                for (var i = 0; i < nodes.length; i++) {
                    nodes[i].radius = nodes[i].radius || thisGraph.consts.startRadius;
                    if (nodes[i].x == null || nodes[i].y == null) {
                        // nodes[i].xStart = width/2  + nodes[i].radius + offset
                        nodes[i].x = width/2  + nodes[i].radius + offset;
                        // nodes[i].yStart = height/2 + nodes[i].radius + offset
                        nodes[i].y = height/2 + nodes[i].radius + offset
                    }
                }
            }

            /**
             * Called to update the view of the graph when
             * data changes
             *
             * @param      {Function}  callback  The callback
             */
            updateGraph(callback) {
                var thisGraph = this,
                    consts = thisGraph.consts,
                    state = thisGraph.state;

            	if (thisGraph.state.disableUpdate) {
            		return;
            	}

                this.updateExistingNodes();
                var newGs= thisGraph.circles.enter()
                    .append("g");

            	// console.log('update', newGs);
                newGs.classed(consts.circleGClass, true);
               
                // this.updateNewNodes(newGs);

                // remove old nodes
                thisGraph.circles.exit().remove();

                if (state.initForce == false) {
                    thisGraph.setForce(function() {
    	                thisGraph.updateNewNodes.call(thisGraph, newGs);
                    });
                    state.initForce = true;
                } else {
	                this.updateNewNodes(newGs);
	            }

                thisGraph.paths = thisGraph.paths.data(thisGraph.links, function(d){
                    return String(d.source.id) + "+" + String(d.target.id);
                });
                var paths = thisGraph.paths;
                this.updateExistingPaths(paths);

                var newpaths = paths.enter()
                .append("path")
                .style('marker-end','url(#end-arrow)')
                .classed("link", true);
                this.updateNewPaths(newpaths);

                // remove old links
                paths.exit().remove();

                if (callback != null) {
                	callback();
                }

            }
        }

        return {
            Graph: Graph
        }
}]);


