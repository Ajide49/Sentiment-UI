import { Component, OnInit, Input } from '@angular/core';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

@Component({
  selector: 'trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent implements OnInit {

  @Input()
  configData: any;

  selectedTeamName: any;

  selectedTrendConfig: any;

  constructor() {

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

  onClickTrendsTeam(teamName: any, config: any) {
    this.selectedTeamName = teamName;
    this.selectedTrendConfig = config;
  }

  //** Method on click to get back from Trends Team details */
  onClickTrendsBack() {
    this.selectedTeamName = '';
    this.selectedTrendConfig = undefined;
  }


}
