import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class ConversationSelectService {
    private conversationSelectEvent = new Subject<number>();

    conversationSelectEvent$ = this.conversationSelectEvent.asObservable();
    constructor() { }
    
    annouceConversationSelect(converationId: number) { 
        this.conversationSelectEvent.next(converationId);
    }

}