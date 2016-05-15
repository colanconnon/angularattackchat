import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MessageItem} from '../models/messageitem';


@Injectable()
export class MessageService {
    private domain : string ="https://young-ocean-19580.herokuapp.com/";
    private getUserIdUrl: string = this.domain +"getuserid/";
    private newMessageUrl: string = this.domain +"newmessage";
    private getMessagesUrl: string = this.domain +"getallmessageByConversation/";
    private getNewestMessageURL : string = this.domain +"getnewestmessage";
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