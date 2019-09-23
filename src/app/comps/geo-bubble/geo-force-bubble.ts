/*
 * Copyright (C) 2019 Liam Brannigan
 */

import * as d3 from 'd3';
import * as dc from 'dc';


export function geoForceBubbleChart(parent, chartGroup = null, alphaDecay, forceObject, geojson) {
  var _chart = dc.bubbleMixin(dc.colorMixin(dc.marginMixin(dc.baseMixin({}))));
  _chart.anchor(parent, chartGroup);

        var RADIUS_TRANSITION = 750;

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
          _chart.r().range([_chart.MIN_RADIUS, _chart.width() * _chart.maxBubbleRelativeSize()]);

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
                var simulation = d3.forceSimulation().nodes(_chart.data().filter(d => geojson.hasOwnProperty(d.key))).alphaDecay(alphaDecay);
                Object.entries(forceObject).forEach((force_element) => {
                  simulation = simulation.force(force_element[0], force_element[1]);
                });
                simulation.on('tick', tickActions);
          }

        }
        function bubbleXY (d) {
          if (geojson.hasOwnProperty(d.key)) {
            return _chart.projection(geojson[d.key].geometry.coordinates);
          } else {
            return [null,null];
          }
        }

      var bubbleLocator = function (d) {
        const pos = bubbleXY(d);
        return 'translate(' + (pos[0]) + ',' + (pos[1]) + ')';
    };

        function createBubbles() {
          // The simulation modifies variables x and y. Ensure they start from the initial node position
          // derived from the crossfilter data
          _chart.data().filter(d => geojson.hasOwnProperty(d.key)).forEach(function(d, index, arrayEl) {
            const pos = bubbleXY(d);
            arrayEl[index]['x'] = pos[0];
            arrayEl[index]['x0'] = JSON.parse(JSON.stringify(pos[0]));
            arrayEl[index]['y'] = pos[1];
            arrayEl[index]['y0'] = JSON.parse(JSON.stringify(pos[1]));
            arrayEl[index]['radius'] = _chart.bubbleR(d);
          });
            _gs = _g
                .selectAll('g')
                .data(_chart.data().filter(d => geojson.hasOwnProperty(d.key)), d => d.key)
                .enter()
                .append('g')
                .attr('class', _chart.BUBBLE_NODE_CLASS)
                .attr('transform',bubbleLocator);

            _circles = _gs
                .append('circle')
                .attr('class', 'force-bubble')
                .attr('fill-opacity', 1)
                .attr('fill', function (d, i) {
                    return _chart.getColor(d, i);
                })
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
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
          _chart.doUpdateLabels(_gs);
          _chart.doUpdateTitles(_gs);
            _circles.data(_chart.data().filter(d => geojson.hasOwnProperty(d.key)))
              .attr('stroke', 'black')
              .attr('stroke-width', 1)
              .attr('fill', function (d, i) {
                return _chart.getColor(d, i);
            })
              .attr('r', function (d) {
                    d.radius = _chart.bubbleR(d);
                    return d.radius;
                });
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

