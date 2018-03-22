import { Injectable } from "@angular/core";

import { Http } from "@angular/http";
import { HttpClientModule, HttpClient } from "@angular/common/http";

import "rxjs/add/operator/map";

@Injectable()
export class SidebarService {
  //Declare Properties
  server = "http://localhost:3000";
  api = "/sidebar";

  constructor(private http: Http, private httpClient: HttpClient) {}

  //Get single page
  getSidebar() {
    return this.http
      .get(this.server + this.api + "/edit/sidebar")
      .map(res => res.json());
  }

  //Add a page
  postSidebar(value) {
    return this.http
      .post(this.server + this.api + "/edit/sidebar", value)
      .map(res => res.json());
  }
}
