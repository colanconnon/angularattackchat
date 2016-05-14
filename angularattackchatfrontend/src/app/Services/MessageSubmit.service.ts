import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageSubmitService {
    private messageSendEvent = new Subject<string>();
    
    messageSendEvent$ = this.messageSendEvent.asObservable();
    
    announceMessageSend(message: string) {
        
        this.messageSendEvent.next(message);
    }
    constructor() { }

}