import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'aggregatedMetrics',
  templateUrl: './aggregatedMetrics.component.html'
})
export class AggregatedMetricsComponent implements OnInit {




  @Input()
  data: any;

  overAllPercentage: any = 0;

  @Input()
  mainPercentages: any;

  serviceName: any = "aggregate"



  ngOnChanges(...args: any[]) {
    /**
      Only fired whenever @Input changes
    **/
    this.calculateServiceAggregatePercentages();
  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use 
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });    
  */

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

  calculateServiceAggregatePercentages(){
    var length = Object.keys(this.data).length;
    let count = 0;
    for(var key in this.data){
     if(this.data[key]){
       count+=1;
     }
    }
    this.overAllPercentage = count/length*100
  }
  


}