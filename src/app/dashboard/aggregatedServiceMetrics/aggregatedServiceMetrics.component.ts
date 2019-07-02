import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
    selector: 'aggregatedServiceMetrics',
    templateUrl: './aggregatedServiceMetrics.component.html'
})
export class AggregatedServiceMetricsComponent implements OnInit {




    @Input()
    serviceAggregatedMetricsData: any;

    @Input()
    servicePercentages: any;

    @Input()
    serviceName: any;

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