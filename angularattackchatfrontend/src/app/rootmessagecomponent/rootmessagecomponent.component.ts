import { Component, OnInit } from '@angular/core';
import {ConversationlistcomponentComponent} from '../conversationlistcomponent/conversationlistcomponent.component';
import { MessagelistcomponentComponent } from '../messagelistcomponent/';
import {MessageformcomponentComponent} from '../messageformcomponent';
import {ConversationItem} from '../models/conversationitem';
import {MessageItem} from '../models/messageitem';
import {MessageSubmitService} from '../Services/MessageSubmit.service';
import {ConversationSelectService} from '../Services/ConversationSelect.service';

@Component({
  moduleId: module.id,
  selector: 'app-rootmessagecomponent',
  templateUrl: 'rootmessagecomponent.component.html',
  styleUrls: ['rootmessagecomponent.component.css'],
  providers: [MessageSubmitService, ConversationSelectService],
  directives: [ConversationlistcomponentComponent, MessagelistcomponentComponent, MessageformcomponentComponent]
})
export class RootmessagecomponentComponent implements OnInit {
  public conversationList : Array<ConversationItem>;
  public messageList : Array<MessageItem>;
  public conversationId : number;
  public allMessageList: Array<MessageItem>;
  
  constructor(private messageSubmitService: MessageSubmitService, 
              private conversationSelectService: ConversationSelectService) {
    this.conversationList = new Array<ConversationItem>();
    this.messageList = new Array<MessageItem>();
    this.allMessageList = new Array<MessageItem>();
    
    let messageItem = new MessageItem();
    messageItem.owner = true;
    messageItem.messageText = "testing text";
    messageItem.messageSender = "testing";
    messageItem.id = 2;
    messageItem.conversationId = 5;
    
    this.allMessageList.push(messageItem);
    
    let messageItem1 = new MessageItem();
    messageItem1.owner = false;
    messageItem.id = 1;
    messageItem1.messageText = "testing text2";
    messageItem1.messageSender = "testing2";
    messageItem1.conversationId = 1;
   
    this.allMessageList.push(messageItem1);

    
     let conversationItem1 = new ConversationItem();
    conversationItem1.conversationItemTitle = "test123";
    conversationItem1.conversationItemText = "cest12";
    conversationItem1.id = 1;
    conversationItem1.messages = this.allMessageList.filter(x => x.conversationId == conversationItem1.id);
    
     let conversationItem2 = new ConversationItem();
    conversationItem2.conversationItemTitle = "Testing";
    conversationItem2.conversationItemText = "besting123";
    conversationItem2.id = 5;
    conversationItem2.messages = this.allMessageList.filter(x => x.conversationId == conversationItem2.id);
    
    this.conversationList.push(conversationItem1);
    this.conversationList.push(conversationItem2);
    
    
    this.conversationId = this.conversationList[0].id;
    this.conversationList[0].selected = true;
    this.updateMessages();   
    console.log(this.conversationList);
   
  }
  
  updateMessages() {
    this.messageList = this.allMessageList.filter(x => x.conversationId == this.conversationId);
  }
  sortConversations() {
    
  }
  
  
  ngOnInit() {
     this.messageSubmitService.messageSendEvent$.subscribe((message) => {
        let messageItem = new MessageItem();
        messageItem.owner = true;
        messageItem.id = 5;
        messageItem.messageText = message;
        messageItem.messageSender = "testguy";
        messageItem.conversationId = this.conversationId;
        this.allMessageList.push(messageItem);
        this.updateMessages();
      });
      this.conversationSelectService.conversationSelectEvent$.subscribe((conversationIdNew) => {
        this.conversationId = conversationIdNew;
        this.updateMessages();
      });
    // setTimeout(() => {
    //  let conversationItem1 = new ConversationItem();
    // conversationItem1.conversationItemTitle = "eesting";
    // conversationItem1.conversationItemText = "aesting123";
    // conversationItem1.id = 3;
    
    // this.conversationList.push(conversationItem1);
    // }, 2000);
    
    // setTimeout(() => {
     
    
    // this.conversationList.sort((x1, x2) =>{
      // if(x1.id < x2.id) {
      //    return -1;
      // }
      // if(x1.id > x2.id){
      //   return 1;
      // }
      
      // return 0;
     
    // });
    // }, 3000);
  }

}
