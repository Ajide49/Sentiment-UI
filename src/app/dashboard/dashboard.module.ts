import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { TrendingComponent } from './trending/trending.component';
import { CurrentComponent } from './current/current.component';
import { CurrentDetailsComponent } from './currentDetails/currentDetails.component';
import { CurrentDetailsLoaderService } from './currentDetails/currentDetailsLoader.service';
import { AggregatedServiceMetricsComponent } from './aggregatedServiceMetrics/aggregatedServiceMetrics.component';
import { AggregatedMetricsComponent } from './aggregatedMetrics/aggregatedMetrics.component';
/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [DashboardComponent,TrendingComponent,CurrentComponent,CurrentDetailsComponent,AggregatedServiceMetricsComponent,AggregatedMetricsComponent
  /** Generator: End of declarations */
  ],
  exports:[DashboardComponent,CurrentComponent],
  providers:[
    CurrentDetailsLoaderService
  ] 
 /** Generator: Add provider */
})
export class DashboardModule { }
