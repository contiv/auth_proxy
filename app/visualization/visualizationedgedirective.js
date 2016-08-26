

angular.module('contiv.visualization')
    .directive("visualizationEdge", ['$window',
        function($window) {
            function visualizationEdgeD3(scope, d3) {
                var bodyEl = document.getElementsByTagName('body')[0];
              
                var width = bodyEl.clientWidth - 400,
                    height =  bodyEl.clientHeight - 400;


                //taken from http://bl.ocks.org/simenbrekken/6634070
                // /** MAIN SVG **/
                var limit = 59,
                duration = 750,
                now = new Date(Date.now() - duration);

                var groups = {
                    current: {
                        value: 0,
                        color: 'orange',
                        data: d3.range(limit).map(function(d) {
                            return scope.oldEdgeData[Math.floor(d/10)] || 0;
                        })
                    }
                };
                var x = d3.time.scale()
                    .domain([now - (limit - 2), now - duration])
                    .range([0, width]);

                var y = d3.scale.linear()
                    .domain([0, d3.max(groups.current.data, function (d) { return d + 10; })])
                    .range([height, 0]);

                var line = d3.svg.line()
                    .interpolate('basis')
                    .x(function(d, i) {
                        return x(now - (limit - 1 - i) * duration)
                    })
                    .y(function(d) {
                        return y(d)
                    });

                var xSvg = d3.select('.graph').append('svg')
                    .attr('width', 25)
                    .style('overflow', 'visible')
                    .style('position', 'fixed');

                

                var yAxis = xSvg.append('g')
                    .attr('class', 'y axis')
                    // .attr('transform', 'translate(0,' + width + ')')
                    .call(y.axis = d3.svg.axis().scale(y).orient('left'));
                
                var svg= d3.select('.graph').append('svg')
                    .attr('class', 'chart')
                    .attr('width', width - 50)
                    .attr('height', height + 50);
                    // .style('overflow', "visible");

                var axis = svg.append('g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + height + ')')
                    .call(x.axis = d3.svg.axis().scale(x).orient('bottom'));

                var paths = svg.append('g');

                for (var name in groups) {
                    var group = groups[name];
                    group.path = paths.append('path')
                        .data([group.data])
                        .attr('class', name + ' group')
                        .style('stroke', group.color)
                }

                function tick() {
                    now = new Date();

                    // Add new values
                    for (var name in groups) {
                        var group = groups[name];
                        group.data.push(scope.edgeData || 0);
                        group.path.attr('d', line)
                    }

                    // Shift domain
                    x.domain([now - (limit - 2) * duration, now - duration]);

                    // Slide x-axis left
                    axis.transition()
                        .duration(duration)
                        .ease('linear')
                        .call(x.axis);

                    yAxis.transition()
                        .duration(duration)
                        .ease('linear')
                        .call(y.axis);

                    // Slide paths left
                    paths.attr('transform', null)
                        .transition()
                        .duration(duration)
                        .ease('linear')
                        .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                        .each('end', function() {
                            tick()
                        });

                    // Remove oldest data point from each group
                    for (var name in groups) {
                        var group = groups[name];
                        group.data.shift()
                    }
                }
                tick()
            }

            return{
                restrict:'EA',
                replace: false,
                templateUrl: 'visualization/visualizationedgetemplate.html',
                link: function(scope){
                    scope.$watchGroup(['edgeData', 'oldEdgeData'],
                        function() {
                            if (scope.edgeData != null &&
                                    scope.oldEdgeData != null ) {
                                if (!scope.initialize) {
                                    scope.initialize = true;
                                    var d3 = $window.d3;  
                                    visualizationEdgeD3(scope, d3);
                                }
                            } 
                        });
               }
           };
        }
    ]
);
