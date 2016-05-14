import { Component, OnInit } from '@angular/core';
import {ConversationlistcomponentComponent} from '../conversationlistcomponent/conversationlistcomponent.component';
import { MessagelistcomponentComponent } from '../messagelistcomponent/';
import {MessageformcomponentComponent} from '../messageformcomponent';
import {ConversationItem} from '../models/conversationitem';
import {MessageItem} from '../models/messageitem';

@Component({
  moduleId: module.id,
  selector: 'app-rootmessagecomponent',
  templateUrl: 'rootmessagecomponent.component.html',
  styleUrls: ['rootmessagecomponent.component.css'],
  directives: [ConversationlistcomponentComponent, MessagelistcomponentComponent, MessageformcomponentComponent]
})
export class RootmessagecomponentComponent implements OnInit {
  public conversationList : Array<ConversationItem>;
  public messageList : Array<MessageItem>;
  
  constructor() {
    this.conversationList = new Array<ConversationItem>();
    this.messageList = new Array<MessageItem>();
    
    let messageItem = new MessageItem();
    messageItem.owner = true;
    messageItem.messageText = "testing text";
    messageItem.messageSender = "testing";
    this.messageList.push(messageItem);
    
    let messageItem1 = new MessageItem();
    messageItem1.owner = false;
    messageItem1.messageText = "testing text2";
    messageItem1.messageSender = "testing2";
    this.messageList.push(messageItem1);
    
     let conversationItem1 = new ConversationItem();
    conversationItem1.conversationItemTitle = "test123";
    conversationItem1.conversationItemText = "cest12";
    conversationItem1.id = 1;
    
     let conversationItem2 = new ConversationItem();
    conversationItem2.conversationItemTitle = "Testing";
    conversationItem2.conversationItemText = "besting123";
    conversationItem2.id = 5;
    
    this.conversationList.push(conversationItem1);
    this.conversationList.push(conversationItem2);
  }

  ngOnInit() {
    setTimeout(() => {
     let conversationItem1 = new ConversationItem();
    conversationItem1.conversationItemTitle = "eesting";
    conversationItem1.conversationItemText = "aesting123";
    conversationItem1.id = 3;
    
    this.conversationList.push(conversationItem1);
    }, 2000);
    
    setTimeout(() => {
     
    
    this.conversationList.sort((x1, x2) =>{
      if(x1.id < x2.id) {
         return -1;
      }
      if(x1.id > x2.id){
        return 1;
      }
      
      return 0;
     
    });
    }, 3000);
  }

}
