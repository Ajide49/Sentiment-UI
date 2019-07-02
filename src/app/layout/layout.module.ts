import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { ConfigureComponent } from '../configure/configure/configure.component';
import { ConfigureModule } from '../configure/configure.module';


/** Generator: End of imports */


@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    DashboardModule,
    ConfigureModule,
    SharedModule
  ],
  declarations: [LayoutComponent
    /** Generator: End of declarations */
  ]

  /** Generator: Add provider */
})
export class LayoutModule { }
