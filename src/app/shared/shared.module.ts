
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Platform } from '@angular/cdk/platform';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { RouterModule } from '@angular/router';
import { CustomPillComponent } from './customPill/customPill.component';
import { CustomButtonComponent } from './customButton/customButton.component';
import { TimelineComponent } from './charts/timelineChart/timelineChart.component';
import { BarChartComponent } from './charts/barChart/barChart.component';
import { D3Service } from 'd3-ng2-service'; 
import {MatRippleModule} from '@angular/material/core';
import { NgxLoadingModule } from 'ngx-loading';
import { AvailabilityChartComponent } from './charts/availability/availabilityChart.component';
import { BootstrapValidatorDirective } from './validation/validationStyle.directive';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data/data.service';
import { LoaderComponent } from './loader/loader.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTreeModule} from '@angular/material/tree';
import { JsonInputComponent } from './forms/jsonInputComponent/json-input.component';
import { CustomSamTimeChartComponent } from './charts/customSamTimeChart/customSamTimeChart.component';
import { PercentageCardComponent } from './percentage/percentageCard.component';
import { NgSelectModule } from '@ng-select/ng-select';
 



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    Ng2GoogleChartsModule,
    MatSnackBarModule,
    ChartsModule,
    MatRippleModule,
    NgSelectModule,
    NgxChartsModule,
    NgxLoadingModule.forRoot({}),
    NgbModule.forRoot(),
    MatTreeModule,
    HttpClientModule
  //  NgSemanticModule,
  ],
  exports: [
   
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatRippleModule,
    CustomButtonComponent,
    CustomPillComponent,
    BarChartComponent,
    TimelineComponent,
    CustomSamTimeChartComponent,
    MatSnackBarModule,
    NgbModule,
    ChartsModule,
    NgxChartsModule,
    NgxLoadingModule,
    LoaderComponent,
    AvailabilityChartComponent,
    JsonInputComponent,
    PercentageCardComponent,
    HttpClientModule,
    MatTreeModule,
    Ng2GoogleChartsModule,
    MatExpansionModule,
    BootstrapValidatorDirective
  ],
  declarations: [
   CustomPillComponent,CustomButtonComponent,
   TimelineComponent,
   BarChartComponent,
   AvailabilityChartComponent
   ,LoaderComponent,
   PercentageCardComponent,
   BootstrapValidatorDirective,
   JsonInputComponent,
   CustomSamTimeChartComponent
  ],
  providers: [
    D3Service,
    FocusMonitor,
    Platform,
    DataService,
    BootstrapValidatorDirective
  ],
})
export class SharedModule {

  constructor() { }
  static forRoot() {
    return {
      ngModule: SharedModule,
      providers: [BootstrapValidatorDirective,DataService]
    }
  }

}
