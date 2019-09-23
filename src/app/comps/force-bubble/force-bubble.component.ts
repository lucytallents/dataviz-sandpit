import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';
import * as dc from 'dc';

import { forceBubbleChart } from './force-bubble'

@Component({
  selector: 'app-force-bubble',
  templateUrl: './force-bubble.component.html',
  styleUrls: ['./force-bubble.component.css']
})
export class ForceBubbleComponent implements OnInit {
  @ViewChild('chartRef') chartRef: ElementRef
  @Input() headerHeight: number;
  @Input() alphaDecay: number;
  @Input() forceObject: any;
  @Input() config: {
    dimension: any;
    group: any;
    x: any;
    y: any;
    keyAccessor: any;
    valueAccessor: any;
    radiusValueAccessor?: Function;
    r?: any;
    elasticRadius?: boolean;
    minRadius?: number;
    minRadiusWithLabel?: number;
    maxBubbleRelativeSize?: number;
    colors?: any;
    colorAccessor?: any;
    colorDomain?: Array<number>;
    title?: string;
    renderLabel?: boolean;
  };

  chart: any;
  get keyAccessor() {
    return this.config.keyAccessor || function(d) {return d.key};
  }
  get valueAccessor() {
    return this.config.valueAccessor || function(d) {return d.value};
  }

  get elasticRadius() {
    return this.config.elasticRadius || true
  }
  get minRadius() {
    return this.config.minRadius || 0
  }
  get minRadiusWithLabel() {
    return this.config.minRadiusWithLabel || 10
  }

  get maxBubbleRelativeSize() {
    return this.config.maxBubbleRelativeSize || 0.075
  }

  get colors() {
    return this.config.colors || d3.scaleSequential().interpolator(d3.interpolateOranges)
  }

  get renderLabel() {
    return this.config.renderLabel || true
  }

  get radiusValueAccessor() {
    return this.config.radiusValueAccessor || function (d) { return d.value };
  }
  get colorAccessor() {
    return this.config.colorAccessor || function (d) { return d.value };
  }
  get colorDomain() {
    return this.config.colorDomain || [0, d3.max(this.config.group.all(), this.colorAccessor)];
  }

  get r() {
    return this.config.r || d3.scaleSqrt().range([0, 40])
  }

  get title() {
    return this.config.title || function (d) { return `${d.key}: ${d.value}` };
  }

  constructor() { }

  ngOnInit() {
    this.chart = forceBubbleChart(this.chartRef.nativeElement, null, this.alphaDecay, this.forceObject);
    this.chart
      .width(this.chartRef.nativeElement.offsetWidth)
      .height(this.chartRef.nativeElement.offsetHeight - this.headerHeight)
      .dimension(this.config.dimension)
      .group(this.config.group)
      .keyAccessor(this.keyAccessor)
      .valueAccessor(this.valueAccessor)
      .radiusValueAccessor(this.radiusValueAccessor)
      .x(this.config.x)
      .xUnits(dc.units.ordinal)
      .y(this.config.y)
      .elasticX(true)
      .elasticY(true)
      .r(this.r)
      .xAxisLabel('Index Gain')
      .elasticRadius(this.elasticRadius)
      .minRadius(this.minRadius)
      .minRadiusWithLabel(this.minRadiusWithLabel)
      .maxBubbleRelativeSize(this.maxBubbleRelativeSize)
      .colors(this.colors)
      .colorAccessor(this.colorAccessor)
      .colorDomain(this.colorDomain)
      .title(this.title)
      .renderLabel(this.renderLabel);

    this.chart.render();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.config.firstChange) {

      this.chart.dimension(this.config.dimension)
        .group(this.config.group)
        .radiusValueAccessor(this.radiusValueAccessor)
        .x(this.config.x)
        .y(this.config.y)
        .r(this.r)
        .elasticRadius(this.elasticRadius)
        .minRadius(this.minRadius)
        .minRadiusWithLabel(this.minRadiusWithLabel)
        .maxBubbleRelativeSize(this.maxBubbleRelativeSize)
        .colors(this.colors)
        .colorAccessor(this.colorAccessor)
        .colorDomain(this.colorDomain)
        .title(this.title)
        .renderLabel(this.renderLabel)
        .render();
    }

  }

}
