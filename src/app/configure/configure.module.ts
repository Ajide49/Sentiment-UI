import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { AppAddComponent } from './addApp/addApp.component';
import { ConfigureComponent } from './configure/configure.component';
import { UpdateMetadataComponent } from './updateMetadata/updateMetadata.component';

/** Generator: End of imports */

@NgModule({
  imports: [
    CommonModule,
    SharedModule.forRoot()
  ],
  declarations: [
  /** Generator: End of declarations */
  AppAddComponent,ConfigureComponent,UpdateMetadataComponent
  ],
  exports:[ConfigureComponent]
 
 /** Generator: Add provider */
})
export class ConfigureModule { }
