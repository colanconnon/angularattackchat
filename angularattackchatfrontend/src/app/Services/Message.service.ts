import { Injectable } from '@angular/core';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {MessageItem} from '../models/messageitem';

@Injectable()
export class MessageService {

    constructor(private http: Http) { }
    
    
    getUserInformation(username: string) {
        
    }
    
    insertMessage(message : MessageItem ) {
        
    }
    
    getMessageByConversationId(id : number) {
        
    }

}