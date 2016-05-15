import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class LoginService {
    private LoginUrl: string = 'https://young-ocean-19580.herokuapp.com/public/api/user/login';
    constructor(private http: Http) { }
    
    Login(username: string, password: string) {
    let body = JSON.stringify({username: username, password: password});
    let headers = new Headers({'Content-Type': 'application/json'});
    headers.append('Accept', 'application/json');
    let options = new RequestOptions({headers: headers});
    return this.http.post(this.LoginUrl, body, options).map(res => res.json()).do(res => {
      console.log(res);
      localStorage.setItem('Token', res.token);
      localStorage.setItem('username', res.username);
      localStorage.setItem('user_id', res.user_id);
    });
  }

}