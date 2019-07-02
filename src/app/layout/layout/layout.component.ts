import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router'; 

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {


  page: any = "Dashboard"

  constructor(
   
    private route: ActivatedRoute,
    private router: Router)
  {
   
    

  }

  ngOnInit() {
  
  }

  onClickPage(page: any){

    this.page = page;
  }


}
