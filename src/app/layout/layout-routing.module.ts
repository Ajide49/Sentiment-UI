import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { ConfigureComponent } from '../configure/configure/configure.component';

    const coreRoutes: Routes = [
     
    
      { path: '',  component: LayoutComponent,
      children:[
        { path: '',  component: DashboardComponent},
        {path:'configure',component: ConfigureComponent}
        ] }
  
    ];
    @NgModule({
      imports: [
        RouterModule.forRoot(coreRoutes)
      ],
      exports: [
        RouterModule
      ]
    })
    export class LayoutRoutingModule { }