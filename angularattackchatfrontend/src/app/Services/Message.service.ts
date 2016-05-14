import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MessageItem} from '../models/messageitem';

@Injectable()
export class MessageService {
    private getUserIdUrl: string = "http://localhost:3000/getuserid/";
    constructor(private http: Http) { }
    
    
    getUserInformation(username: string) {
        let headers = new Headers({'Content-Type': 'applicaion/json'});
        headers.append('Accept', 'application/json');
        
        headers.append('Authorization', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiY29sYW4xIiwiaWQiOjEsImlhdCI6MTQ2MzIwNTI2NX0.DhhiaHb0GoH0XsbfU4VQaSKfAFPiloxdQDdsTbE2o6I');
        let options = new RequestOptions({headers: headers});
        let result = null;
        return this.http.get(this.getUserIdUrl + username,options)
                        .map(res => res.json());
    }
    
    insertMessage(message : MessageItem ) {
        
    }
    
    getMessageByConversationId(id : number) {
        
    }

}