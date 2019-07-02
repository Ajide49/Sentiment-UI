import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
    selector: 'timelineChart',
    templateUrl: './timelineChart.component.html',
    styleUrls: ['./timelineChart.component.scss'],
    providers: [DatePipe]
})
export class TimelineComponent implements OnInit {




    @Input()
    metricsData: any;

    @Input()
    metadataName: any;

    loaded: boolean = false;

    processedData: any=[];

    public colorMap = {
        // should contain a map of category -> color for every category
        success: '#18BC9C',
        error: '#E74C3C'
    }
      public timelineChart = {
        chartType: 'Timeline',
        dataTable: [
          ['Type', 'from'
            , 'to']
    
        ],
        formatters: [
          {
            columns: [1, 2],
            type: 'DateFormat',
            options: {
              pattern: 'MM/dd/yy HH-mm'
            }
          }
        ],
        options:{
          
          timeline: { groupByRowLabel: true , colorByRowLabel: true},
          colors: ['#18BC9C','#E74C3C']
        }
     };
    

    constructor(private datePipe: DatePipe) {

        /**
          The Entry point for this Component and its DI declaration
        **/
    }

  
    loadGraphData(){
      let totalLength = Object.keys(this.metricsData).length;
      var count = 0;
  
      for (var key in this.metricsData) {
        
          let date;
          date = key;
          let a = [];
          var keys = Object.keys(this.metricsData);
          var index = keys.indexOf(key);
          let nextVariable;
          nextVariable = keys[index+1];
          if(nextVariable!=null){
          a.push( this.metricsData[key]?'up':'down' );
          a.push( new Date(date*1000));
          a.push(new Date(nextVariable*1000));
          this.processedData.push(a);
          }
      }
      this.timelineChart.dataTable=this.processedData;
      this.loaded = true;
    }

  

    ngOnChanges(...args: any[]) {
        /**
          Only fired whenever @Input changes
        **/
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
        **/


    }

    ngAfterViewChecked() {
        /**
          Fired after the component template has been fully updated by the model
        **/
    }




}
