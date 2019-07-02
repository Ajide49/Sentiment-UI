import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleChartInterface } from 'ng2-google-charts/google-charts-interfaces';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data/data.service';
import { FormattedError } from '@angular/compiler';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateMetadataComponent } from '../updateMetadata/updateMetadata.component';


@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.scss']
})
export class ConfigureComponent implements OnInit {

  configForm: FormGroup;
  closeResult: string;
  configData: any;
  loader: boolean = false;
  saveLoader: boolean = false;
  teams:any = ['Core Ticketing Services','TM1 Apps Maps', 'Host']

  @ViewChild('updateMetadata') updateMetadata:UpdateMetadataComponent;

  constructor(private _formBuilder: FormBuilder, private modalService: NgbModal, private dataService: DataService, private snackBar: MatSnackBar) {

    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.createForm();
    });
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
    this.updateMetadata.updated.subscribe(res=>{
      this.getConfig();
    })

    this.createForm();
    this.loader = true;

    this.getConfig();
  }

  createForm() {
    this.configForm = this._formBuilder.group({
      teamName: ['', Validators.required],
      name: ['', Validators.required],
      services: this._formBuilder.array([this.addService()])

    });
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

  addService(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      metadata: this._formBuilder.array([this.addMetadata()])
    });
  }

  addDynamicService() {
    (this.configForm.get('services') as FormArray).push(this.addService());
  }

  addMetadata(): FormGroup {
    return this._formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      endpoint: ['', Validators.required],
      key: [''],
      slo: ['', Validators.required],
      units: ['', Validators.required],
      comparisonOperator: ['', Validators.required],
      /**criteria: this._formBuilder.group({
        quantile: ['', Validators.required]
      })
      */
      criteria:['']

    })
  }

  addCriteria(): FormGroup {
    return this._formBuilder.group({
      quantile: ['', Validators.required]
    })
  }

  addDynamicMetadata(k: any) {
    ((this.configForm.get('services') as FormArray).controls[k].get('metadata') as FormArray).push(this.addMetadata());
  }

  getConfig() {
    this.dataService.getConfig().subscribe(data => {
      this.configData = data;
      this.loader = false;
    })
  }

  touchAll(formGroup: FormGroup | FormArray, func = 'markAsDirty', opts = { onlySelf: false }): void {
    (formGroup.controls, (c, i) => {
      if (c instanceof FormGroup || c instanceof FormArray)
        this.touchAll(c, func, opts);
      else
        c[func](opts);
    })
  }

  onSave() {
    this.saveLoader = true;
    this.configForm
      .updateValueAndValidity();


    if (this.configForm.invalid) {
      // this._form.controls.custom_labels.pattern_value1.untouched=true

      //Logic to invalidate the form to show error fields in invalid css
      this.saveLoader = false;
      Object.keys(this.configForm.controls)
        .forEach(key => {
          this.configForm.get(key).markAsDirty();
        });


      for (let i = 0; i < (this.configForm.get('services') as FormArray).length; i++) {
        Object.keys((<FormArray>(this.configForm.get('services') as FormArray).controls[i]).controls).forEach(
          (key2 => {

            (this.configForm.get('services') as FormArray).controls[i].get(key2).markAsDirty();
          })
        );
        for (let j = 0; j < ((this.configForm.get('services') as FormArray).controls[i].get('metadata') as FormArray).length; j++) {
          Object.keys((<FormArray>((this.configForm.get('services') as FormArray).controls[i].get('metadata') as FormArray).controls[j]).controls).forEach(
            (key3 => {

              ((this.configForm.get('services') as FormArray).controls[i].get('metadata') as FormArray).controls[j].get(key3).markAsDirty();
            })
          );
        }
      }

      return;
    }
    if (this.configForm.valid) {
     
      let body = this.configForm.value;
      let teamName = body.teamName;
      console.log(body.criteria);
      body.services.forEach((service,index)=>{
        service.metadata.forEach((metadata,j)=>{
          if(metadata.criteria==undefined || metadata.criteria =="" ){
            console.log("This is coming here");
            console.log(body.criteria)
            delete body.services[index].metadata[j]['criteria'];
          }
        })
      })
     
      delete body['teamName'];
      this.dataService.addConfig(body, teamName).subscribe(res => {
        this.saveLoader = false;
        this.modalService.dismissAll();
        this.getConfig();
        this.openSnackBar("Config Saved successfully", "Success");
      })
     // console.log(this.configForm.value);
      //this.config
    }
  }


  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  onClickCancel() {
    this.modalService.dismissAll();
  }

  onClickRemoveService(index: any){
    (this.configForm.get('services') as FormArray).removeAt(index);
  }

  onClickRemoveMetadata(i:any, j:any){
    ((this.configForm.get('services') as FormArray).controls[i].get('metadata') as FormArray).removeAt(j);
  } 

  onClickUpdateMetadata(teamName: any, appName: any, serviceName: any,metadata: any){
    //this.updateMetadata.metadataName = metadataName;
    this.updateMetadata.teamName = teamName;
    this.updateMetadata.appName = appName;
    this.updateMetadata.serviceName = serviceName;
    this.updateMetadata.metadata = metadata;
    this.updateMetadata.metadataForm.patchValue(metadata);
    this.updateMetadata.open();
  }

}

