import { Component, OnInit, Input, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/

/**
    Data Service where we can access methods for all rest calls to the middle ware
**/
@Injectable()
export class DataService {


    apiUrl: any = environment.apiUrl;
    startDay: any = environment.startDayForTrends;

    constructor(private http: HttpClient) {

        /**
          The Entry point for this Component and its DI declaration
        **/
    }

    getConfig(){
        return this.http.get(this.apiUrl+"/config");
    }

    addConfig(body: any,teamName: any){
        return this.http.post(this.apiUrl+"/team/"+teamName+"/application/config",body);
    }

    getTeamTrends(teamName:any){
        //
        let params = new HttpParams().set('startDay', this.startDay);
        return this.http.get(this.apiUrl+'/team/'+teamName+'/trends' , { params: params })
    }

    getServiceTrends(teamName: any, appName: any, serviceName: any){
        let params = new HttpParams().set('startDay', this.startDay);
        return this.http.get(this.apiUrl+'/team/'+teamName+'/application/'+appName+'/service/'+serviceName+'/trends' , { params: params })
    }

    getTeamMetrics(teamName: any, appName: any, to: any, from: any){
        let params= new HttpParams().
        set('from', from).
        set('to',to);
        return this.http.get(this.apiUrl+'/team/'+teamName+'/application/'+appName+'/metrics' , { params: params });
    }

    getServiceMetrics(teamName: any, appName: any, serviceName: any, to: any, from: any){
        let params= new HttpParams().
        set('from', from).
        set('to',to);
        //return this.http.get(this.apiUrl+'/'+serviceName, { params: params });
        return this.http.get(this.apiUrl+'/team/'+teamName+'/application/'+appName+'/service/'+serviceName+'/metrics' , { params: params });
    }

    updateMetadata(teamName: any, appName: any, serviceName: any,metadataName:any,body){
        return this.http.put(this.apiUrl+'/team/'+teamName+'/application/'+appName+'/service/'+serviceName+"/metadata/"+metadataName,body);
    }

}
