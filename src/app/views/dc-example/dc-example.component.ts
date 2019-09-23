import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as dc from 'dc';
import * as d3 from 'd3';
import * as crossfilter from 'crossfilter2';

@Component({
  selector: 'app-dc-example',
  templateUrl: './dc-example.component.html',
  styleUrls: ['./dc-example.component.css']
})
export class DcExampleComponent implements OnInit {
  @ViewChild('rowChartDiv') rowChartDiv: ElementRef;
  @ViewChild('barChartDiv') barChartDiv: ElementRef;

  data: Array<{
    year: any, genus: string, class: string,
    exporter: string, importer: string,
    supercategory: string
  }>;

  rowChart: any;
  barChart: any;

  constructor() { }

  ngOnInit() {
    // Import the dataset
    d3.csv("../../../assets/csv/felids.csv").then(data => {
      this.data = data;

      var ndx = crossfilter(this.data);
      // Dimensions are variables you can use on chart axes
      var genusDimension = ndx.dimension(function(d) { return d.genus; }),
        genusCountGroup = genusDimension.group().reduceCount(),
        supercatDimension = ndx.dimension(function(d) { return d.supercategory }),
        supercatCountGroup = supercatDimension.group().reduceCount();

      console.log('data', this.data);
      console.log('dimension', supercatDimension);
      console.log('group', supercatCountGroup);
      // See data in the dimension with .top(N) e.g.
      // genusDimension.top(3)
      // See the data in the group with .all() e.g.
      // genusCountGroup.all()
      // IT'S ALWAYS WORTH LOOKING AT THE DATA AND THE GROUP!
      // Create a row chart
      this.rowChart = dc.rowChart(this.rowChartDiv.nativeElement);
      // this.rowChart is a variable with the chart data
      // this.rowChartDiv is a variable that references the div
      // this.rowChartDiv.nativeElement references the div itself
      this.rowChart
        // .width(this.rowChartDiv.nativeElement.offsetWidth)
        // .height(this.rowChartDiv.nativeElement.offsetHeight)
        .dimension(genusDimension)
        .group(genusCountGroup)
        // .elasticX(true)
        .colors('steelblue')
        // .margins({top: 10, right: 20, bottom: 30, left: 10})
        .render();


      // Create a bar chart
      this.barChart = dc.barChart(this.barChartDiv.nativeElement);
      this.barChart
        .dimension(supercatDimension)
        .group(supercatCountGroup)
        .x(d3.scaleOrdinal())
        .xUnits(dc.units.ordinal)
        .colors('steelblue')
        .render();






    })

  }


}
