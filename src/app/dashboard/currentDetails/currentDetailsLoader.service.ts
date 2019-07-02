import { Component, OnInit, Input, Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
/**import { ActivatedRoute } from '@angular/router' Use in case of resolver;*/


@Injectable()
export class CurrentDetailsLoaderService {


    loaded: EventEmitter<any> = new EventEmitter<any>();
}
