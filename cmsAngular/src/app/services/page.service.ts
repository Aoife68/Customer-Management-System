import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import 'rxjs/add/operator/map';

import { Http } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Injectable()
export class PageService {
//Declare Properties
server = 'http://localhost:3000';
api = '/pages';

  constructor(
    private http:Http,
    private httpClient: HttpClient
  ) { }

  public pagesBS = new BehaviorSubject<string>(null);

  //Get pages
  getPages(){
    return this.http.get(this.server + this.api).map(res => res.json());
  }

  //Get single page
  getPage(slug){
    return this.http.get(this.server + this.api +'/'+slug).map(res => res.json());
  }

  //Add a page
  postPage(value){
    return this.http.post(this.server + this.api +'/add/page', value).map(res => res.json());
  }

  //edit  page
  getEditPage(id){
    return this.http.get(this.server + this.api +'/edit/page/'+id).map(res => res.json());
  }

    //Post Edit page
    postEditPage(value){
      return this.http.post(this.server + this.api +'/edit/page/'+value.id, value).map(res => res.json());
    }

  //Delete  page
  deletePage(id){
    return this.http.get(this.server + this.api +'/delete/page/'+id).map(res => res.json());
  }
}
