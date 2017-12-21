/**
 * The graph that is used specifically for the visualization tab.
 */
angular.module('contiv.graph')
    .factory('VisualizerGraph', ['Graph', function (Graph) {
    	class VisualizerGraph extends Graph.Graph {
    		/**
    		 * Constructs the object.
    		 *
    		 * @param   {HTML SVG}  svg             The svg that will 
             *                                      hold the graph
             * @param   {Array}  nodes   		    List of nodes
             * @param   {Array}  links   		    List of links
    		 * @param   {DataSource}  dataSource    The data source
    		 */
            constructor(svg, nodes, links, dataSource) {
                super(svg, nodes, links);
                var thisGraph = this;

                //holds current transitions that are occuring
                thisGraph.state.transition = [];
                //Min distance between nodes when spawning randomly
                thisGraph.consts.edge_buffer = 200;
                //Size reduction as you go through levels in nodes
                thisGraph.consts.radiusDecay = 1;
                //Css class for nodes that are containers
                thisGraph.consts.containerClass = 'container';

                //dataSource holds the server data and methods for
                //converting it to data for the graph
                thisGraph.dataSource = dataSource;
                
                //Drag behavior for nodes
                var drag = d3.behavior.drag()
                    .origin(function(d){
                       return {x: d.x, y: d.y};
                    })
                    .on("dragstart", function() {
                    })
                    .on("drag", function(args){
                    	d3.select( this).attr("transform", function( d, i) {
                            d.x += d3.event.dx;
                            d.y += d3.event.dy;
                            return "translate(" + [ d.x,d.y ] + ")"
                        });
                        thisGraph.updateGraph();	
                    })
                    .on("dragend", function() {
                    });

                thisGraph.drag = drag;

                //Pan and Zoom behavior for the graph
                var zoom = d3.behavior.zoom()
                    .on("zoom", function(){
                        if (d3.event.sourceEvent != null && d3.event.sourceEvent.ctrlKey){
                            return false;
                        } else{
                            thisGraph.zoomed.call(thisGraph);
                        }
                        return true;
                    })
                    .on("zoomstart", function(d, i){
                    });
                thisGraph.dragSvg = zoom;
                thisGraph.svg.call(zoom).on("dblclick.zoom", null);
            }

            /**
             * Called with no args when the graph has a zoom action
             * Can also be called with args to force a zoom or pan 
             * event for the graph.
             *
             * @param      {Array}   translate  The amount to translate
             * @param      {number}  scale      The amount to scale
             */
            zoomed(translate, scale){
                var thisGraph = this;
                if (thisGraph.state.rightClick == true) {
                    return;
                }
                this.state.justScaleTransGraph = true;
                if (translate != null && scale != null) {
                    var zoom = thisGraph.dragSvg;
                    zoom.scale(scale);
                    zoom.translate(translate);
                    //creating names to prevent transition conflicts
                    var zoomSetCallback = function() {
                    	zoom.scale(scale);
                    	zoom.translate(translate);
                    };
                    var translate_name = "zoom" + translate;
                    d3.select("." + this.consts.graphClass).transition(translate_name).delay(100).duration(750)
                        .attr('transform', 'translate(' + zoom.translate() + ') scale(' + zoom.scale() + ')').each("end", zoomSetCallback);
                    return;
                } 
                if (thisGraph.state.canZoom) {
                    d3.select("." + this.consts.graphClass)
                        .attr("transform", "translate(" + thisGraph.dragSvg.translate() + ") scale(" +thisGraph.dragSvg.scale() + ")"); 
                }
            };
            
            /**
             * Called when the window resizes
             *
             * @param      {HTML SVG}  svg    The svg to resize
             */
            onWindowResize(svg) {
                var bodyEl = document.getElementsByTagName('body')[0];
                var offset = $('#visualization-graph').offset();
                var divWidth = $('#visualization-graph').width();
                var height = bodyEl.clientHeight;
                svg.attr("width", divWidth).attr("height", height - offset.top - 20);

            };

            /**
             * Called when the server sends updated data for the links
             */
            updateLinkData() {
                var thisGraph = this;
                var node_names_set = [];
                for (var i = 0; i < thisGraph.nodes.length; i++) {
                    node_names_set.push(thisGraph.nodes[i].id)
                }
                var retData = thisGraph.dataSource.getFlowBetweenSet(node_names_set);
                var linkData = retData.linkData;
                thisGraph.links = thisGraph.dataSource.processLinkData(linkData, thisGraph.nodes);
                this.initNodes();
                this.initLinks();
                thisGraph.updateGraph();
            }

            
        }

        return {
            Graph: VisualizerGraph
        }
}]);



