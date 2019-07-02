import { Component, OnInit, ViewChild, TemplateRef, ContentChild, ElementRef, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DataService } from 'src/app/shared/data/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgForOfContext } from '@angular/common';



@Component({
  selector: 'updateMetadata',
  templateUrl: './updateMetadata.component.html',
  styleUrls: ['./updateMetadata.component.scss']
})
export class UpdateMetadataComponent implements OnInit {

  metadataForm: FormGroup;
  @ViewChild('modalUpdate') modalUpdate: ElementRef;
  closeResult: string;
  configData: any;
  loader: boolean = false;
  saveLoader: boolean = false;
  teamName: any;
  appName: any;
  serviceName: any;
  metadataName:any;
  metadata: any;
  updated: EventEmitter<any> = new EventEmitter<any>();

  constructor(private _formBuilder: FormBuilder, private modalService: NgbModal, private dataService: DataService, private snackBar: MatSnackBar) {

    /**
      The Entry point for this Component and its DI declaration
    **/
  }

  open() {
    this.modalService.open(this.modalUpdate, { ariaLabelledBy: 'modal-basic-title', size: 'lg',centered: true }).result.then((result) => {
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
    this.createForm();
    this.loader = true;

   
  }

  createForm() {
    this.metadataForm = this._formBuilder.group({
     
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



  


  touchAll(formGroup: FormGroup | FormArray, func = 'markAsDirty', opts = { onlySelf: false }): void {
    (formGroup.controls, (c, i) => {
      if (c instanceof FormGroup || c instanceof FormArray)
        this.touchAll(c, func, opts);
      else
        c[func](opts);
    })
  }

  onUpdate() {
   // this.saveLoader = true;
   console.log("Coming here")
    this.metadataForm.updateValueAndValidity();


    if (this.metadataForm.invalid) {
      // this._form.controls.custom_labels.pattern_value1.untouched=true

      //Logic to invalidate the form to show error fields in invalid css
      this.saveLoader = false;
      Object.keys(this.metadataForm.controls)
        .forEach(key => {
          this.metadataForm.get(key).markAsDirty();
        });

      return;
    }
    else{
       this.dataService.updateMetadata(this.teamName,this.appName,this.serviceName,this.metadata.name,this.metadataForm.value).subscribe(
           res=>{
            this.modalService.dismissAll();
            this.openSnackBar("Metadata updated successfully", "Success");

            this.updated.emit();
           }
       )
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

 
}

