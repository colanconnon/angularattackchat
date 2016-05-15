import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MessageItem} from '../models/messageitem';


@Injectable()
export class MessageService {
    private getUserIdUrl: string = "http://localhost:3000/getuserid/";
    private newMessageUrl: string = "http://localhost:3000/newmessage";
    private getMessagesUrl: string = "http://localhost:3000/getallmessageByConversation/";
    private getNewestMessageURL : string = "http://localhost:3000/getnewestmessage";
    private token : string = localStorage.getItem('Token');
    
    constructor(private http: Http) { }
    
    
    getUserInformation(username: string) {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.getUserIdUrl + username,options)
                        .map(res => res.json());
    }
    
    insertMessage(message : MessageItem ) {
        let body = JSON.stringify({
            text: message.messageText,
            user_id: message.messageOwnerId,
            conversation: message.conversationId,
            message_owner: message.owner,
            message_sender: message.messageSender
            });
            let headers = new Headers({'Content-Type': 'application/json'});
            headers.append('Accept', 'application/json');
        
            headers.append('Authorization', 'Bearer ' +  this.token);
            let options = new RequestOptions({headers: headers});
            return this.http.post(this.newMessageUrl, body, options)
                       .map(res => res.json())
                       .do(result => console.log(result));
    }
    
    getMessageByConversationId(id : number) {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return this.http.get(this.getMessagesUrl + id, options).map(res => res.json());
    }

    getMessagesByConversationIdPoll(id : number) {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return Observable.interval(5000).switchMap(() => this.http.get(this.getMessagesUrl + id, options)).map(res => res.json());
    }
    
    getNewestMessage() {
        let headers = new Headers({'Content-Type': 'application/json'});
        headers.append('Accept', 'application/json');
        
        headers.append('Authorization', 'Bearer ' + this.token);
        let options = new RequestOptions({headers: headers});
        return Observable.interval(5000).switchMap(() => this.http.get(this.getNewestMessageURL, options)).map(res => res.json());
    }
}