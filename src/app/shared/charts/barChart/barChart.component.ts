import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { DataService } from '../../data/data.service';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { interval } from 'rxjs';
import { environment } from '../../../../environments/environment';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'barChart',
  templateUrl: './barChart.component.html',
  styleUrls: ['./barChart.component.scss'],
  providers: [DatePipe]
})
export class BarChartComponent implements OnInit {


  @Input()
  teamName: any = 'service';

  refreshTime: any = environment.refreshTimeInMinutesForTrendsPage;


  @ViewChild('parentGraph') private graphContainer: ElementRef;

  @Input()
  appName: any = null;

  @Input()
  serviceName: any = null;

  barData: any;

  dataLoaded: boolean = false;

  dataAvailable: boolean = true;

  single: any = [

  ];


  multi: any[];

  // Size of the graph container 
  view: any[] = [900, 150];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Date';
  showGridLines = true;
  showYAxisLabel = true;
  showDataLabels = "true";
  yAxisLabel = 'percentage';
  colorScheme = {
    domain: ['#5AA454']
  };


  constructor(private dataService: DataService, private datePipe: DatePipe) {

    /**
      The Entry point for this Component and its DI declaration
    **/

  }

  ngOnChanges(...args: any[]) {
    /**
      Only fired whenever @Input changes
    **/

    
  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use 
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });    
  */

    this.loadData();


    let width = this.graphContainer.nativeElement.offsetWidth;
    this.view=[width,150];

  }

  /** Method to load bar data from the service  */
  loadData() {
    this.dataLoaded = false;
    if (this.appName != null && this.serviceName != null && this.teamName != null) {
      this.dataService.getServiceTrends(this.teamName, this.appName, this.serviceName).subscribe(res => {
        this.barData = res;
        if(Object.keys(this.barData.Datapoints).length != 0){
        this.dataAvailable = true;
        this.parseTimeFormat(this.barData.Datapoints);
        this.dataLoaded = true;
        }
        else{
          this.dataAvailable = false;
          this.dataLoaded = true;
        }
      });
    }
    else if (this.teamName != null) {
      this.dataService.getTeamTrends(this.teamName).subscribe(res => {
        this.barData = res;
        if(Object.keys(this.barData.Datapoints).length != 0){
        this.parseTimeFormat(this.barData.Datapoints);
        this.dataLoaded = true;
      }
        else{
          this.dataAvailable = false;
          this.dataLoaded = true;
        }
      });
    }

  }

  /** Method to parse epoch time from data to readable time format */
  parseTimeFormat(obj: any) {
    for (var key in obj) {
      let date: any = key;
      let formattedDate = this.datePipe.transform((date*1000), 'MM/dd/yyyy');
      this.single.push({ 'name': formattedDate, 'value': obj[key] });
      if (obj[key] instanceof Object) {
        this.parseTimeFormat(obj[key]);
      }
    }

  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
    **/


  }

  ngAfterViewChecked() {
    /**
      Fired after the component template has been fully updated by the model
    **/
  }




}
