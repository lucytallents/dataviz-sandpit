/*
 * Copyright (C) 2019 Liam Brannigan
 */

import * as d3 from 'd3';
import * as dc from 'dc';


export function forceBubbleChart(parent, chartGroup = null, alphaDecay, forceObject) {
  var _chart = dc.bubbleChart(parent);

        var RADIUS_TRANSITION = 1500;

        var _circles: any = [];
        var _g = null;
        var _gs = null;

        _chart._doRender = function () {
            _chart.resetSvg();

            _g = _chart.svg().append('g');

            _circles = [];

            drawChart();

            return _chart;
        };

        _chart._doRedraw = function () {
            drawChart();

            return _chart;
        };
        function drawChart() {

          if (_chart.elasticRadius()) {
              _chart.r().domain([_chart.rMin(), _chart.rMax()]);
          }

          _chart.r().range([_chart.MIN_RADIUS, _chart.xAxisLength() * _chart.maxBubbleRelativeSize()]);

          if (_circles.length === 0) {
              createBubbles();
          } else {
              updateBubbles();
          }

          highlightFilter();

            function tickActions () {
              _gs
                .attr('transform', (d) =>  {
                 return `translate(${
                  (d.x = Math.max(d.radius, Math.min(_chart.width() - d.radius, d.x)))
                  }, ${
                  (d.y = Math.max(d.radius, Math.min(_chart.height() - d.radius, d.y)))
                  })`});
                };
            if (typeof forceObject !== 'undefined') {
                var simulation = d3.forceSimulation().nodes(_chart.data()).alphaDecay(alphaDecay);
                Object.entries(forceObject).forEach((force_element) => {
                  simulation = simulation.force(force_element[0], force_element[1]);
                });
                simulation.on('tick', tickActions);
          }

        }
        function bubbleX (d) {
          var x = _chart.x()(_chart.keyAccessor()(d));
          if (isNaN(x) || !isFinite(x)) {
              x = 0;
          }
          return x;
      }

      function bubbleY (d) {
          var y = _chart.y()(_chart.valueAccessor()(d));
          if (isNaN(y) || !isFinite(y)) {
              y = 0;
          }
          return _chart.height() - y;
      }
      var bubbleLocator = function (d) {
        return 'translate(' + (bubbleX(d)) + ',' + (bubbleY(d)) + ')';
    };

        function createBubbles() {
          // The simulation modifies variables x and y. Ensure they start from the initial node position
          // derived from the crossfilter data
          _chart.data().forEach(function(d, index, arrayEl) {
            arrayEl[index]['x'] = bubbleX(d);
            arrayEl[index]['x0'] = JSON.parse(JSON.stringify(bubbleX(d)));
            arrayEl[index]['y'] = bubbleY(d);
            arrayEl[index]['y0'] = JSON.parse(JSON.stringify(bubbleY(d)));
            arrayEl[index]['radius'] = _chart.bubbleR(d);
          });

            _gs = _g
                .selectAll('g')
                .data(_chart.data())
                .enter()
                .append('g')
                .attr('class', _chart.BUBBLE_NODE_CLASS)
                .attr('transform',bubbleLocator);

            _circles = _gs
                .append('circle')
                .attr('class', _chart.BUBBLE_CLASS)
                .attr('fill-opacity', 1)
                .attr('fill', function (d, i) {
                    return _chart.getColor(d, i);
                })
                .attr('stroke-width', 2)
                .on('click', _chart.onClick)
                .on('mouseenter', function (d, i) {
                    d3.select(this).attr('stroke', '#303030');
                })
                .on('mouseout', function (d, i) {
                    d3.select(this).attr('stroke', 'none');
                });

            _chart._doRenderLabel(_gs);
            _chart._doRenderTitles(_gs);

            _circles.transition().duration(RADIUS_TRANSITION).attr('r', function (d) {
                d.radius = _chart.bubbleR(d);
                return d.radius;
            });
        }

        function updateBubbles() {
            _circles.data(_chart.data())
                .attr('r', function (d) {
                    d.radius = _chart.bubbleR(d);
                    console.log(d.key,d.radius);
                    return d.radius;
                });

            _chart.doUpdateLabels(_gs);
            _chart.doUpdateTitles(_gs);
        }

        function highlightFilter() {
            if (_chart.hasFilter()) {
                _gs.each(function (d) {
                    if (_chart.hasFilter(d.key)) {
                        _chart.highlightSelected(this);
                    } else {
                        _chart.fadeDeselected(this);
                    }
                });
            } else {
                _gs.each(function () {
                    _chart.resetHighlight(this);
                });
            }
        }

        return _chart;
  }

