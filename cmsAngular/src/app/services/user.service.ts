import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

import { Http } from '@angular/http';
import {HttpClientModule, HttpClient} from '@angular/common/http';


@Injectable()
export class UserService {
  //Declare Properties
  server = 'http://localhost:3000';
  api = '/users';

  constructor(
    private http:Http,
    private httpClient: HttpClient
  ) { }

  register(user){
    return this.http.post(this.server + this.api+'/register', user).map(res => res.json());
  }

  login(user){
    return this.http.post(this.server + this.api+'/login', user).map(res => res.json());
  }

}
