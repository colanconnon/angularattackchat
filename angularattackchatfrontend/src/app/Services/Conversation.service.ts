import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class ConversationService {
    private conversationurl : string = "http://localhost:3000/getallconversation";
    private newConversationUrl: string = "http://localhost:3000/newconversation";
    private token : string = localStorage.getItem('Token');
    constructor(private http: Http) { }

    getAll() {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        //hardcoded for now
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.conversationurl, options).map(res => res.json());
                   
    }
    
     getAllPoll() {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        //hardcoded for now
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return Observable.interval(4000).switchMap(() => this.http.get(this.conversationurl, options)).map(res => res.json());
                   
    }
    
    postNewConversation(conversationName: string) {
        let body = JSON.stringify({
            name: conversationName
        });
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return this.http.post(this.newConversationUrl, body, options)
                        .map(res => res.json());
    }
}