import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ConversationService {
    private conversationurl : string = "http://localhost:3000/getallconversation";
    
    constructor(private http: Http) { }

    getAll() {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        //hardcoded for now
        headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY29sYW4xIiwiaWQiOjEsImlhdCI6MTQ2MzIwNTI2NX0.DhhiaHb0GoH0XsbfU4VQaSKfAFPiloxdQDdsTbE2o6I');
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.conversationurl, options).map(res => res.json());
                   
    }
}