import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class RegisterService {

    constructor(private http: Http) { 
        
    }
    
    Register(username: string, password: string, confirmPassword: string) {
        
    }

}