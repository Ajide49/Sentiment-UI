import { Component, OnInit, Input } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'customPill',
  templateUrl: './customPill.component.html',
  styleUrls: ['./customPill.component.scss']
})
export class CustomPillComponent implements OnInit {



  @Input()
  percentage: any;

  customClass: any = 'btn-outline-primary'

  error: boolean = false;

  warning: boolean = false;

  success: boolean = false;

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

      this.customClass = 'badge-success';
      this.success = true;
      this.error = false;
      this.warning = false;
    }
    if (this.percentage > 90 && this.percentage < 95) {
      this.customClass = 'badge-warning';
      this.success = false;
      this.error = false;
      this.warning = true;
    }
    if (this.percentage < 90) {
      this.customClass = 'badge-danger';
      this.success = false;
      this.error = true;
      this.warning = false;
    }
  }


}
