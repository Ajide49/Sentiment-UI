import { Component, OnInit, Input, ViewChild, TemplateRef, ViewContainerRef } from '@angular/core';
import { DataService } from 'src/app/shared/data/data.service';
import { CurrentDetailsLoaderService } from '../currentDetails/currentDetailsLoader.service';
import { ChangeDetectorRef } from "@angular/core";
import { interval } from 'rxjs';
import { environment } from '../../../environments/environment';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

  centered = false;
  disabled = false;
  unbounded = false;
  panelOpenState = true;
  expanderOpened = true;
  loaderCurrentDetails = false;
  graph = "graph1"



  @ViewChild("content", { read: TemplateRef }) contentRef: TemplateRef<any>;
  @ViewChild("outlet", { read: ViewContainerRef }) outletRef: ViewContainerRef;


  @ViewChild("content2", { read: TemplateRef }) contentRef2: TemplateRef<any>;
  @ViewChild("outlet2", { read: ViewContainerRef }) outletRef2: ViewContainerRef;


  totalModerateServices: any = 0;
  totalPassedServices: any = 0;
  totalFailedServices: any = 0;

  loader = true;
  selectedApp = "";
  fromTime: any;
  toTime: any;
  metadataPercentages: any = {};
  servicePercentages: any = {};
  appPercentages: any = {};
  appAggregate: any = {};
  mainPercentages: any = {};
  totalServices: any;
  totalApps: any;
  overAllPercentage: any;
  metricsData: any = {};
  refreshTime: any = environment.refreshTimeInMinutesForCurrentPage;
  totalMetrics: any = 0;

  aggregatedMetricsData: any = {};

  serviceAggregatedMetricsData: any = {};

  totalTeamAggregatedMetricsDate: any = {};

  selectedService: any = "";

  configData: any;


  constructor(private dataService: DataService, private currentDetailsLoaderService: CurrentDetailsLoaderService, private cdr: ChangeDetectorRef) {

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
    this.initialize();


    /** Logic for refreshing the page with new data */
    interval((this.refreshTime * 1000 * 60)).subscribe(x => {
      this.expanderOpened = true;
      this.initialize();
    });

  }

  initialize() {
    this.loader = true;
    this.selectedService = "";
    this.setDates();
    this.dataService.getConfig().subscribe(res => {
      this.configData = res;
      let totalService = 0;
      let totalApps = 0;
      let totalMetadatas = 0;
      this.configData.forEach(mainService => {
        mainService.applications.forEach(app => {
          totalApps += 1;
          app.services.forEach(service => {
            totalService += 1;
            service.metadata.forEach(metadata => {
              totalMetadatas += 1;

            })
          })
        });

      });
      this.totalServices = totalService;
      this.totalMetrics = totalMetadatas;
      this.totalApps = totalApps;
      this.getPercentages();
    });
  }

  ngAfterViewInit() {
    /**
      Fired after the component template has been initialized by the model
    **/
  }

  ngAfterViewChecked() {

  }

  setDates() {
    this.toTime = new Date();
    this.fromTime = new Date();
    this.fromTime.setDate(this.fromTime.getDate() - 7);
  }

  getPercentages() {
    let serviceLength = 0;
    this.configData.forEach((team, i) => {
      let lengthOfApps = team.applications.length;
      team.applications.forEach((app, j) => {
        let servicesLength = serviceLength + app.services.length;
        app.services.forEach((service, k) => {
          this.dataService.getServiceMetrics(team.name, app.name, service.name, ~~(this.toTime.getTime() / 1000), ~~(this.fromTime.getTime() / 1000)).subscribe(res => {
            let data: any = res
            let metrics: any[] = data.metrics;
            metrics.forEach((met, l) => {
              let name = met.name;
              let dataPoint = met.datapoints
              let temp = {}
              temp[name] = dataPoint;
              if (!(service.name in this.metricsData)) {
                this.metricsData[service.name] = {};
              }
              this.metricsData[service.name][met.name] = {};
              this.metricsData[service.name][met.name] = dataPoint;
              if (Object.keys(this.metricsData).length == this.totalServices) {
                let metadataSum = 0;

                for (var key in this.metricsData) {
                  for (var key2 in this.metricsData[key]) {
                    metadataSum += 1;
                  }
                }
                if (metadataSum == this.totalMetrics) {
                  this.getAggregateServiceMetrics();
                }
              }
              this.getPercentageFromArray(met.name, met.datapoints);
            });
            this.getServicePercentages(this.configData[i].applications[j].services[k]);

          });
        });
      })
    });
  }


  getPercentageFromArray(metadataName: any, dataPoints: any) {
    let totalLength = Object.keys(dataPoints).length;
    var count = 0;
    for (var prop in dataPoints) {
      if (dataPoints[prop] === true) {
        count += 1;
      }
    }
    let percentage = (count / totalLength) * 100
    this.metadataPercentages[metadataName] = percentage;
  }

  getServicePercentages(serviceConfig: any) {
    let total = serviceConfig.metadata.length;
    let sum = 0;
    serviceConfig.metadata.forEach(metadata => {
      sum += this.metadataPercentages[metadata.name];
    })
    let percentage = (sum / total);
    this.servicePercentages[serviceConfig.name] = percentage;
    if (Object.keys(this.servicePercentages).length == this.totalServices) {
      this.getAppPercentages();
      this.getTeamAggregate();
    }

  }

  getAppPercentages() {
    this.configData.forEach(team => {
      team.applications.forEach(app => {
        let serviceLength = app.services.length;
        let sum = 0;
        app.services.forEach(service => {
          sum += this.servicePercentages[service.name];
        });
        this.appPercentages[app.name] = sum / serviceLength;
      });
    });
    this.getMainServicePercentage();


  }

  getTeamAggregate() {
    this.configData.forEach(team => {
      team.applications.forEach(app => {
        let sum = 0;
        app.services.forEach(service => {
          sum += (100 -this.servicePercentages[service.name]);
        });
        this.appAggregate[app.name] = (100 - sum);
      });
    });
  }

  getMainServicePercentage() {
    this.configData.forEach(mainService => {
      let appsLength = mainService.applications.length;
      let sum = 0;
      mainService.applications.forEach(app => {
        sum += this.appPercentages[app.name]
      });
      this.mainPercentages[mainService.name] = sum / appsLength;
    });

    this.getPassedFailedServices();
    if (this.selectedService) {
    }
  }

  onClickService(serviceName: any) {
    this.expanderOpened = false;
    this.selectedService = serviceName;
  }

  /** Method to getting passed failed services for cards */
  getPassedFailedServices() {
    this.totalFailedServices = 0;
    this.totalModerateServices = 0;
    this.totalPassedServices = 0;
    for (var key in this.servicePercentages) {
      if (this.servicePercentages[key] > 95) {
        this.totalPassedServices += 1;
      }
      else if (this.servicePercentages[key] > 90 && this.servicePercentages[key] < 95) {
        this.totalModerateServices += 1;
      }
      else if (this.servicePercentages[key] < 90) {
        this.totalFailedServices += 1;
      }
    }
    
  }

  /** Method to get aggregated service metrics data */
  getAggregateServiceMetrics() {

    let allMetricsData = {};
    allMetricsData = JSON.parse(JSON.stringify(this.metricsData));
    let aggreage = {}
    this.configData.forEach(team => {
      team.applications.forEach(app => {
        app.services.forEach(service => {
          let a = {};
          let serviceName = service.name;
          for (var key in allMetricsData[serviceName]) {
            for (var key2 in allMetricsData[serviceName][key]) {
              if (!a.hasOwnProperty(key2)) {
                a[key2] = true;
              }
              if (a.hasOwnProperty(key2)) {
                if (a[key2] === true) {
                  if (allMetricsData[serviceName][key][key2] === false) {
                    a[key2] = false;
                  }
                }
              }
            }
          }
          aggreage[serviceName] = JSON.parse(JSON.stringify(a));

        });
      });
    });
    this.serviceAggregatedMetricsData = aggreage;
    this.aggregateOverallData();
    this.loader = false;
    this.calculateServiceAggregatePercentages();
  }

  calculateServiceAggregatePercentages(){
    for(var key in this.serviceAggregatedMetricsData){
      var length = Object.keys(this.serviceAggregatedMetricsData[key]).length;
      let count = 0;
      for(var key2 in this.serviceAggregatedMetricsData[key]){
        if(this.serviceAggregatedMetricsData[key][key2]){
          count+=1;
        }
      }
      this.servicePercentages[key] = count/length * 100
      
    }
  
  }

  calculateAppAggregatePercentages(){
    var length = Object.keys(this.aggregatedMetricsData[key]).length;
    let count = 0;
    for(var key in this.aggregatedMetricsData){
      if(this.aggregatedMetricsData[key]){
        count+=1;
      }
    }
    this.overAllPercentage = count/length*100
  
     
     
  }
  
  

  aggregateData(serviceName: any, data: any, index: any) {
    var tempArray;
    let tempMetrics = Object.assign({}, data);
    if (!this.serviceAggregatedMetricsData.hasOwnProperty(serviceName)) {
      tempArray = JSON.parse(JSON.stringify(tempMetrics));
    }
    else {

      tempArray = Object.assign({}, this.serviceAggregatedMetricsData[serviceName]);
      for (var key in tempMetrics) {
        if (!tempMetrics[key]) {
          tempArray[key] = false;
        }
      }
      delete this.serviceAggregatedMetricsData[serviceName]
      this.serviceAggregatedMetricsData[serviceName] = tempArray;

    }

  }





  aggregateOverallData() {
    var tempAggregatedMetrics = JSON.parse(JSON.stringify(this.serviceAggregatedMetricsData));
    let count = Object.keys(tempAggregatedMetrics).length;
    let tempArray = [];
    let a = {};

    for (var key in tempAggregatedMetrics) {
      if (Object.keys(a).length == 0) {
        a = tempAggregatedMetrics[key];
      }
      else {
        for (var key2 in a) {
          if (!a[key2]) {
            a[key2] = false;

          }
          else {
            a[key2] = a[key2] && tempAggregatedMetrics[key][key2];
          }
        }
      }

    }
    this.aggregatedMetricsData = a;
    this.outletRef.clear();
    this.outletRef.createEmbeddedView(this.contentRef);
   // this.calculateAppAggregatePercentages();
  }

}
