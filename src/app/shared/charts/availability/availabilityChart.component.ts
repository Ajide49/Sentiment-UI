import { Component, OnInit, Input, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/
import { D3Service, D3, Selection, TimeInterval } from 'd3-ng2-service';
import { DatePipe } from '@angular/common';


declare function visavailChart(): any;

@Component({
  selector: 'availabilityChart',
  templateUrl: './availabilityChart.component.html',
  styleUrls: ['./availabilityChart.component.scss'],
  providers: [DatePipe]
})
export class AvailabilityChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;

  @ViewChild('parentGraph') private graphContainer: ElementRef;


  @Input()
  metricsData: any;

  graphs: any = 0;

  @Input()
  metadataName: any;

  processedData: any = [];

  public dataset: any = [{
    "measure": "",
    "data": [
      ["2016-01-01 12:00:00", 1, "2016-01-01 13:00:00"],
      ["2016-01-01 14:22:51", 1, "2016-01-01 16:14:12"],
      ["2016-01-01 19:20:05", 0, "2016-01-01 20:30:00"],
      ["2016-01-01 20:30:00", 1, "2016-01-01 22:00:00"]
    ]
  }];

  @Input()
  percentage: any;
  private parentNativeElement: any;

  private d3: D3;


  constructor(d3Service: D3Service, element: ElementRef, private datePipe: DatePipe, private cd: ChangeDetectorRef) {
    this.d3 = d3Service.getD3(); // <-- obtain the d3 object from the D3 Service
  }

  loadGraphData() {
   
    let totalLength = Object.keys(this.metricsData).length;
    var count = 0;

    for (var key in this.metricsData) {

      let date;
      date = key;
      let a = [];
      var keys = Object.keys(this.metricsData);
      var index = keys.indexOf(key);
      a.push(this.datePipe.transform((date * 1000), 'yyyy-MM-dd HH:mm:ss'));
      a.push(this.metricsData[key] ? 1 : 0);
      let nextVariable;
      nextVariable = keys[index + 1];
      if (nextVariable != null) {
        a.push(this.datePipe.transform((nextVariable * 1000), 'yyyy-MM-dd HH:mm:ss'));
       
          this.processedData.push(a);
       
       
      }
      this.dataset[0].data = this.processedData;

    }

    const element = this.chartContainer.nativeElement;

    let d3 = this.d3;
    let width = this.graphContainer.nativeElement.offsetWidth;
    let chart = visavailChart().width(width - 120); // define width of chart in px

    d3.select(element)
      .datum(this.dataset)
      .call(chart);

    this.graphs = 1;


  }

  ngOnChanges(...args: any[]) {
    /**
      Only fired whenever @Input changes
    **/
    let d3 = this.d3;
    const element = this.chartContainer.nativeElement;
    if (this.graphs == 0) {
      d3.select(element).html(null);
    }
    // let width = this.graphContainer.nativeElement.offsetWidth;
    // define width of chart in px
    //d3.select(element).remove();
    this.loadGraphData();
  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use 
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });    
  */

    //this.loadGraphData();
  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
   
   let width = this.graphContainer.nativeElement.offsetWidth;
   let a = width+'px';
   const element = this.chartContainer.nativeElement;

   let d3 = this.d3; 
   let  chart = visavailChart().width(width-120); // define width of chart in px
   
   d3.select(element)
        .datum(this.dataset)
        .call(chart);
         **/

  }

  ngAfterViewChecked() {
    /**
      Fired after the component template has been fully updated by the model
    **/


  }


}
