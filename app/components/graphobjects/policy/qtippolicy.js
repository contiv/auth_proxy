/**
 * This policy adds tooltip functionality to nodes and links.
 * When installing, install on both links and nodes.
 * 
 * Uses the qTip jQuery plugin
 */
angular.module('contiv.graph')
    .factory('QTipPolicy', ['Policy', function (Policy) {
        class QTipPolicy extends Policy.Policy {
            /**
             * Constructs the object.
             */
            constructor() {
                super("QTipPolicy");
            }

            /**
             * Called when the policy is installed
             * Modifies the updateNewNodes and 
             * updateNewPaths method of the graph to install qtip
             * onto each node and path.
             *
             * @param      {Graph}  graph   The graph it is 
             *                              installed on
             */
            initialize(graph) {
                if (this.initialized) {
                    return;
                }
                super.initialize(graph);

                var thisPolicy = this;
                var state = graph.state.QTipPolicy = {};

                state.mousedown = false;

                graph.consts.QTipPolicy = {};

                //Tracking mouse click state to make tooltip
                //disappear if the node is being dragged.
                $('#visualization-graph').mouseup(function(e) {
                    state.mouseup = false;
                });

                //override updateNewNodes and updateNewPaths
                //to install qtip
                var graphUpdateNewNodes = graph.updateNewNodes;
                graph.updateNewNodes = function(newNodes) {
                    graphUpdateNewNodes.call(graph, newNodes);
                    thisPolicy.updateNewNodes(newNodes);
                };

                var graphUpdateNewPaths = graph.updateNewPaths;
                graph.updateNewPaths = function(newPaths) {
                    graphUpdateNewPaths.call(graph, newPaths);
                    thisPolicy.updateNewPaths(newPaths);
                }
            }

            /**
             * Removes all qTips from the DOM.
             * Called when the policy is uninstalled or
             * the graph is destroyed.
             */
            destroy() {
                //removing all qtip from DOM
                $('[id^="qtip"]').remove();
            }

            /**
             * Keeping track of mousedown state
             *
             * @param      {d3Object}  d3obj  The d3 pbject
             * @param      {Node/Link}  d     The matching data object
             */
            mousedown(d3obj, d) {
                var thisGraph = this.graph,
                    state = thisGraph.state.QTipPolicy;
                state.mousedown = true;
            }

            /**
             * Keeping track of mousedown state
             *
             * @param      {d3Object}  d3obj  The d3 pbject
             * @param      {Node/Link}  d     The matching data object
             */
            mouseup(d3obj, d) {
                var thisGraph = this.graph,
                    state = thisGraph.state.QTipPolicy;
                state.mousedown = false;
            }

            whenQTipAvailable(callback) {
                var thisPolicy = this;
                var interval = 500; // ms
                window.setTimeout(function() {
                    if ($(document).qtip != null) {
                        callback();
                    } else {
                        window.setTimeout(thisPolicy.whenQTipAvailable(callback), interval);
                    }
                }, interval);
            }

            /**
             * Called when New Nodes are added during the
             * update graph function
             *
             * @param      {d3Node}  newNodes  The new nodes that are
             *                                 being added to the graph
             */
            updateNewNodes(newNodes) {
                var thisGraph = this.graph,
                    state = thisGraph.state.QTipPolicy;

                function attachQTip() {
                    //attaching qtip
                    newNodes.each(function(d) {
                        var thisNode = this;

                        var text;

                        //If node has children, then it is a service
                        if (thisGraph.dataSource.children_struct[d.id] != null) {
                            text = "<b><u>Selectors:</b></u> ";
                            var selectorMap = thisGraph.dataSource.selectors[d.id];
                            var hasKeys = false;
                            for (var key in selectorMap) {
                                hasKeys = true;
                                text += key + " : <i>"+ selectorMap[key] + "</i>,\n ";
                            }
                            if (hasKeys === false) {
                                //comma will be removed
                                text = "No Selectors, ";
                            }

                        } else {
                            text = "<b><u>Labels:</b></u> ";
                            var labelsMap = thisGraph.dataSource.labels[d.id];
                            var hasKeys = false;
                            for (var key in labelsMap) {
                                hasKeys = true;
                                text += key + " : <i>"+ labelsMap[key] + "</i>,\n ";
                            }
                            if (hasKeys === false) {
                                //comma will be removed
                                text = "No labels, ";
                            }
                        }
                        //remove last comma
                        text = text.slice(0, -2);

                        $(thisNode).qtip({
                            content: {
                                title: d.id,
                                text: text
                            },
                            events: { 
                                show: function() {
                                    var api = $(thisNode).qtip('api');
                                    var offset = $('#graphContainer').offset();
                                    var position = [offset.left + ((d.x * thisGraph.dragSvg.scale()) + thisGraph.dragSvg.translate()[0]), 
                                            offset.top + ((d.y +d.radius) * thisGraph.dragSvg.scale())  + thisGraph.dragSvg.translate()[1]];
                                    api.set('position.target', position);
                                    return !state.mousedown;
                                }
                            },
                            show: {
                                delay: 0,
                                solo: $('#visualization-graph')
                            },
                            style: {
                                classes: 'qtip-blue qtip-shadow'
                            },
                            position: {
                                my: 'top center',
                                at: 'bottom center'
                                // target: position
                            },
                            hide: {
                                event: 'mousedown mouseleave'
                            }
                        });
                    })
                }
                //incase library hasn't loaded yet
                if ($(document).qtip != undefined) {
                    attachQTip();
                } else {
                    this.whenQTipAvailable(attachQTip);
                }
            }

            /**
             * Called when new paths are added during the
             * update graph function
             *
             * @param      {d3Path}  newPaths  The new paths that are
             *                                 being added to the graph
             */
            updateNewPaths(newPaths) {
                var thisGraph = this.graph,
                    state = thisGraph.state.QTipPolicy;

                //incase library hasn't loaded yet
                if ($(document).qtip != undefined) {
                    //adding qtip
                    newPaths.each(function(d) {
                        var thisPath = this;
                        //getting midpoint of path
                        var pathEl   = d3.select(this).node();
                        var midpoint = pathEl.getPointAtLength(pathEl.getTotalLength()/2);
                        var targetRet = d.qtipHelper();
                        var text = "Bytes: " + d.getWeight();
                        $(thisPath).qtip({
                            content: {
                                text: text
                            },
                            events: {
                                show: function() {
                                    //if mouse is down, don't let qtip show
                                    return !state.mousedown;
                                }
                            },
                            show: {
                                delay: 0,
                                solo: $('#graphContainer')
                            },
                            style: {
                                classes: 'qtip-blue qtip-shadow'
                            },
                            position: {
                                my: targetRet.my,
                                at: 'center center', 
                                target: 'mouse',
                                adjust: targetRet.adjust
                            },
                            hide: {
                                event: 'mousedown mouseleave'
                            }

                        });
                    })
                }   
            }

        }
        return {
            Policy: QTipPolicy
        }
}]);








