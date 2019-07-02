import { OnInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { ngxLoadingAnimationTypes } from "ngx-loading";
import { reduceTicks } from '@swimlane/ngx-charts';


@Component({
    selector: 'loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
  })
  export class LoaderComponent implements OnInit {

    
    @Input() loader: boolean = true;

    primaryColor:any="red";

    public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;

    constructor(
    ){
    }

  
    ngOnInit(){
      
      }

   

  }