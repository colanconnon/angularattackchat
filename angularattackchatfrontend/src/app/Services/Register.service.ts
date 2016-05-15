import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RegisterService {
    private RegisterUrl : string = "https://young-ocean-19580.herokuapp.com/public/api/user/signup";
    constructor(private http: Http) { 
        
    }
    
    Register(username: string, password: string, confirmPassword: string) {
        let body = JSON.stringify({
            username: username,
            password: password,
            confirmpassword: confirmPassword
        });
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.RegisterUrl, body, options).map(res => res.json());
    }

}