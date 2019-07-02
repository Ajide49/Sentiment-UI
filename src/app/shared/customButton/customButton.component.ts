import { Component, OnInit, Input } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
    selector: 'customButton',
    templateUrl: './customButton.component.html',
    styleUrls: ['./customButton.component.scss']
})
export class CustomButtonComponent implements OnInit {


    @Input()
    percentage: any;

    customClass: any = 'btn-outline-primary'

    constructor() {

        /**
          The Entry point for this Component and its DI declaration
        **/
    }

    ngOnChanges(...args: any[]) {
        /**
          Only fired whenever @Input changes
        **/
        this.changeClassOnPercentage();
    }

    ngOnInit() {
        /** Logic to get data from resolver modify to use 
          this.route.data
          .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
            this.demo = data.demo;
          });    
      */
        this.changeClassOnPercentage();
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

    changeClassOnPercentage() {
        if (this.percentage >= 95) {
            this.customClass = 'btn-outline-success';
        }
        if (this.percentage >= 90 && this.percentage < 95) {
            this.customClass = 'btn-outline-warning';
        }
        if (this.percentage < 90) {
            this.customClass = 'btn-outline-danger';
        }
    }


}
