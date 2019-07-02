import { Component, OnInit, Input, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { toDate } from '@angular/common/src/i18n/format_date';
import { Services } from '@angular/core/src/view';
import { CurrentDetailsLoaderService } from './currentDetailsLoader.service';
import { trigger } from '@angular/animations';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'currentDetails',
  templateUrl: './currentDetails.component.html',
  styleUrls: ['./currentDetails.component.scss']
})
export class CurrentDetailsComponent implements OnInit {


  @Input()
  metricsData: any;

  @ViewChild("content", {read: TemplateRef}) contentRef: TemplateRef<any>;
  @ViewChild("outlet", {read: ViewContainerRef}) outletRef: ViewContainerRef;

  @Input()
  graph: any;

  @Input()
  selectedService: any;

  serviceData: any;

  @Input()
  metadataPercentages:any;

  @Input()
  servicePercentages: any;

  @Input()
  configData: any;
  
  appConfig: any;

  @Input()
  serviceAggregatedMetricsData: any;

  selectedConfig: any;

  serviceName: any;

  loaded:boolean = true;

  operators: any = {
    'le': 'less than or equal to',
    'lt': 'less than',
    'eq': 'equal to',
    'gt': 'greater than',
    'ge': 'greater than or equal to',
    'ne': 'not equal to'};

  constructor(private dataService: DataService, private currentDetailsLoaderService: CurrentDetailsLoaderService) {

    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  ngOnChanges(...args: any[]) {
    /**
      Only fired whenever @Input changes
    **/

  
   this.initialize();
   this.outletRef.clear();
   this.outletRef.createEmbeddedView(this.contentRef);
  }

  ngOnInit() {
    /** Logic to get data from resolver modify to use 
      this.route.data
      .subscribe((data: { replacewithresolvername: replacewithModelObject }) => {
        this.demo = data.demo;
      });    
  */
  

  }

  initialize(){
    this.loaded = false;
    this.serviceName = this.selectedService;
    this.serviceData =  this.serviceAggregatedMetricsData[this.serviceName];
    this.configData.forEach((product) => {
        let lengthOfApps = product.applications.length;
        product.applications.forEach((app) => {
          app.services.forEach((service) => {
                if(this.selectedService == service.name){
                    this.selectedConfig= service;
                    
                }
          });
        });
    });
    this.loaded = true;
    this.currentDetailsLoaderService.loaded.emit("");
    //this.getAggregateServiceMetrics();
    
  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
    **/
   this.initialize();
  }

  ngAfterViewChecked() {
    /**
      Fired after the component template has been fully updated by the model
    **/
  }

  setDates() {
    
  }

  getPercentages() {
    
  }


  
}
