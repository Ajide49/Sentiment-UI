import { Component, OnInit, Input } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
    selector: 'customSamTimeChart',
    templateUrl: './customSamTimeChart.component.html',
    styleUrls: ['./customSamTimeChart.component.scss']
})
export class CustomSamTimeChartComponent implements OnInit {


    @Input()
    metricsData: any;

   

    constructor() {

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
