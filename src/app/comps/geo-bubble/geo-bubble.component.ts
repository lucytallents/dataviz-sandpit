import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import * as d3 from 'd3';

import { geoForceBubbleChart } from './geo-force-bubble'

@Component({
  selector: 'app-geo-bubble',
  templateUrl: './geo-bubble.component.html',
  styleUrls: ['./geo-bubble.component.css']
})
export class GeoBubbleComponent implements OnInit {
  @ViewChild('chartRef') chartRef: ElementRef
  @Input() geojson: any;
  // @Input() geoKey: string;
  @Input() headerHeight: number;
  @Input() alphaDecay: number;
  @Input() forceObject: any;
  @Input() config: {
    dimension: any;
    group: any;
    projection: any;
    bounds: any;
    zoom: number;
    moveCenter: any;
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
    return this.config.maxBubbleRelativeSize || 0.045
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
    return this.config.r || d3.scaleSqrt().range([0, 30])
  }

  get title() {
    return this.config.title || function (d) { return `${d.key}: ${d.value}` };
  }

  constructor() { }

  ngOnInit() {
    this.chart = geoForceBubbleChart(this.chartRef.nativeElement, null, this.alphaDecay, this.forceObject, this.geojson);
    this.chart
      .width(this.chartRef.nativeElement.offsetWidth)
      .height(this.chartRef.nativeElement.offsetHeight - this.headerHeight)
      .dimension(this.config.dimension)
      .group(this.config.group)
      .radiusValueAccessor(this.radiusValueAccessor)
      .r(this.r)
      .elasticRadius(this.elasticRadius)
      .minRadius(this.minRadius)
      .minRadiusWithLabel(this.minRadiusWithLabel)
      .maxBubbleRelativeSize(this.maxBubbleRelativeSize)
      .colors(this.colors)
      .colorAccessor(this.colorAccessor)
      .colorDomain(this.colorDomain)
      .title(this.title)
      .renderLabel(this.renderLabel);

    this.chart.projection = this.config.projection(this.chartRef.nativeElement.offsetWidth,
      this.chartRef.nativeElement.offsetHeight, this.config.bounds, this.config.zoom, this.config.moveCenter)
    this.chart.render();
    // })
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.config.firstChange) {

      this.chart.dimension(this.config.dimension)
        .group(this.config.group)
        .radiusValueAccessor(this.radiusValueAccessor)
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
