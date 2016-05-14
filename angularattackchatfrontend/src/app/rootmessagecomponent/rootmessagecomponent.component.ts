import { Component, OnInit } from '@angular/core';
import {ConversationlistcomponentComponent} from '../conversationlistcomponent/conversationlistcomponent.component';
import { MessagelistcomponentComponent } from '../messagelistcomponent/';
import {MessageformcomponentComponent} from '../messageformcomponent';
import {ConversationItem} from '../models/conversationitem';
import {MessageItem} from '../models/messageitem';
import {MessageSubmitService} from '../Services/MessageSubmit.service';
import {ConversationSelectService} from '../Services/ConversationSelect.service';
import {ConversationService} from '../Services/Conversation.service';
import {MessageService} from '../Services/Message.service';

@Component({
  moduleId: module.id,
  selector: 'app-rootmessagecomponent',
  templateUrl: 'rootmessagecomponent.component.html',
  styleUrls: ['rootmessagecomponent.component.css'],
  providers: [MessageSubmitService, ConversationSelectService, ConversationService
  ,MessageService],
  directives: [ConversationlistcomponentComponent, MessagelistcomponentComponent, MessageformcomponentComponent]
})
export class RootmessagecomponentComponent implements OnInit {
  public conversationList : Array<ConversationItem>;
  public messageList : Array<MessageItem>;
  public conversation : ConversationItem;
  public allMessageList: Array<MessageItem>;
  public currentUser: string = "colan1";
  public curretUserId : number = 1;
  constructor(private messageSubmitService: MessageSubmitService, 
              private conversationSelectService: ConversationSelectService,
              private conversationService: ConversationService,
              private messageService : MessageService) {
    this.conversationList = new Array<ConversationItem>();
    this.messageList = new Array<MessageItem>();
    this.allMessageList = new Array<MessageItem>();
    
    // var username = prompt("Give me a username");
    this.conversationService.getAll().subscribe((data: any[]) => {
      console.log(data);
      for(let i = 0; i < data.length; i++){
        let conversationItem = new ConversationItem();
        conversationItem.id = data[i].conversation_id;
        conversationItem.conversationItemTitle = data[i].conversation_name;
        this.conversationList.push(conversationItem);
      }
      this.conversation = this.conversationList[0];
      this.conversationList[0].selected = true;
      this.updateMessages();
      this.messageService.getMessagesByConversationIdPoll(this.conversation.id).subscribe((result: any[]) => {
        //need this to poll for all messages eventually........
        //will do that soon enough...
        this.messageList = [];
        for(let i = 0; i < result.length; i++){
          let messageItem = new MessageItem();
          messageItem.conversationId = result[i].message_conversation;
          messageItem.id = result[i].message_id;
          messageItem.owner = result[i].message_owner;
          messageItem.messageSender = result[i].message_sender;
          messageItem.messageText = result[i].message_text;
          this.messageList.push(messageItem);
        }
      });
    });
   
   
  }
  
  updateMessages() {
  
    this.messageService.getMessageByConversationId(this.conversation.id).subscribe( (result: any[]) => {
        this.messageList = [];
        for(let i = 0; i < result.length; i++){
          let messageItem = new MessageItem();
          messageItem.conversationId = result[i].message_conversation;
          messageItem.id = result[i].message_id;
          messageItem.owner = result[i].message_owner;
          messageItem.messageSender = result[i].message_sender;
          messageItem.messageText = result[i].message_text;
          this.messageList.push(messageItem);
        }
    });
  }
  sortConversations() {
    
  }
  
  
  ngOnInit() {
     this.messageSubmitService.messageSendEvent$.subscribe((message) => {
      
        //split the conversation id into a list
        let conversationUsers = this.conversation.conversationItemTitle.split(',');
        conversationUsers = conversationUsers.filter(x => x != this.currentUser);
        console.log(conversationUsers);
        //get al the users that arent the current users so we can insert the message as false
        for(let i = 0; i < conversationUsers.length; i++){
          //insert all the messages with owner = false;
        
          this.messageService.getUserInformation(conversationUsers[i])
                            .subscribe((result) => {
                              let messageItem = new MessageItem();
                              messageItem.messageText = message;
                              messageItem.messageSender = this.currentUser;
                              messageItem.messageOwnerId = result.user_id;
                              messageItem.conversationId = this.conversation.id;
                              messageItem.owner = false;
                              console.log(messageItem);
                              this.messageService.insertMessage(messageItem).subscribe(result => {
                                console.log(result);
                              })
                            });
        }
        //now here insert the message with message owner = true and the userid = current user id
        let messageItem = new MessageItem();
        messageItem.messageText = message;
        messageItem.messageSender = "colan1";
        messageItem.conversationId = this.conversation.id;
        messageItem.owner = true;
        messageItem.messageOwnerId = 1;
        this.messageService.insertMessage(messageItem).subscribe(result => {
          console.log(result);
          this.updateMessages();
        });
        
        //end message insert block
        this.allMessageList.push(messageItem);
        
      });
      this.conversationSelectService.conversationSelectEvent$.subscribe((conversationIdNew) => {
        this.conversation = this.conversationList.filter(x => x.id == conversationIdNew)[0];
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
