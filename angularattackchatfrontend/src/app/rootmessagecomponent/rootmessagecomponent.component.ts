import { Component, OnInit,  AfterViewInit } from '@angular/core';
import {ConversationlistcomponentComponent} from '../conversationlistcomponent/conversationlistcomponent.component';
import { MessagelistcomponentComponent } from '../messagelistcomponent/';
import {MessageformcomponentComponent} from '../messageformcomponent';
import {ConversationItem} from '../models/conversationitem';
import {MessageItem} from '../models/messageitem';
import {MessageSubmitService} from '../Services/MessageSubmit.service';
import {ConversationSelectService} from '../Services/ConversationSelect.service';
import {ConversationService} from '../Services/Conversation.service';
import {MessageService} from '../Services/Message.service';
import { RouteParams, Router } from '@angular/router-deprecated';

declare var componentHandler;
// declare var dialog;
declare function showModal();
declare var Notification;

@Component({
  moduleId: module.id,
  selector: 'app-rootmessagecomponent',
  templateUrl: 'rootmessagecomponent.component.html',
  styleUrls: ['rootmessagecomponent.component.css'],
  providers: [MessageSubmitService, ConversationSelectService, ConversationService
  ,MessageService],
  directives: [ConversationlistcomponentComponent, MessagelistcomponentComponent, MessageformcomponentComponent]
})
export class RootmessagecomponentComponent implements OnInit, AfterViewInit {
  public conversationList : Array<ConversationItem>;
  public messageList : Array<MessageItem>;
  public conversation : ConversationItem;
  public allMessageList: Array<MessageItem>;
  public currentUser: string = localStorage.getItem('username');
  public curretUserId : number = localStorage.getItem('user_id');
  public pollSub : any;
  public conversationTxt: string;
  public lastMessageId : number = 0;
  constructor(private messageSubmitService: MessageSubmitService, 
              private conversationSelectService: ConversationSelectService,
              private conversationService: ConversationService,
              private messageService : MessageService,
              private router : Router) {
    if(localStorage.getItem('Token') == null) {
      this.router.navigate(['Login']);
    }
    this.conversationList = new Array<ConversationItem>();
    this.messageList = new Array<MessageItem>();
    this.allMessageList = new Array<MessageItem>();
   

   //get all the conversations
    this.conversationService.getAll().subscribe((data: any[]) => {
      
      for(let i = 0; i < data.length; i++){
        let conversationItem = new ConversationItem();
        conversationItem.id = data[i].conversation_id;
        conversationItem.conversationItemTitle = data[i].conversation_name;
        conversationItem.conversationItemText = data[i].message_text;
        if(data[i].m_id > this.lastMessageId){
          this.lastMessageId = data[i].m_id;
        }
        this.conversationList.push(conversationItem);
      }
      this.conversation = this.conversationList[0];
      this.conversationList[0].selected = true;
      this.updateMessages();
      this.pollMessages();
      this.messageService.getNewestMessage().subscribe( (result) => {
        console.log(this.lastMessageId + "     " + result[0].message_id);
        if(result[0].message_id > this.lastMessageId){
          console.log(result.message_id);
          this.notifyMe(result[0].message_sender + " Says  " + result[0].message_text);
          this.lastMessageId = result[0].message_id;
        }
      });
    });
    
    
    this.conversationService.getAllPoll().subscribe((data: any[]) => {
      this.conversationList = [];
      for(let i = 0; i < data.length; i++){
        let conversationItem = new ConversationItem();
        conversationItem.id = data[i].conversation_id;
        conversationItem.conversationItemTitle = data[i].conversation_name;
        conversationItem.conversationItemText = data[i].message_text;
        if(conversationItem.id == this.conversation.id){
          conversationItem.selected = true;
        }
        this.conversationList.push(conversationItem);
      }
    });
   
  }
  notifyMe(message : string) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support system notifications");
  }

  // Let's check whether notification permissions have already been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(message);
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification(message);
      }
    });
  }

  // Finally, if the user has denied notifications and you 
  // want to be respectful there is no need to bother them any more.
}
  ngAfterViewInit() {
      componentHandler.upgradeAllRegistered();
  }
  pollMessages() {

     this.pollSub = this.messageService.getMessagesByConversationIdPoll(this.conversation.id).subscribe((result: any[]) => {
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
          if(messageItem.id > this.lastMessageId) {
            this.lastMessageId = messageItem.id;
          }
          this.messageList.push(messageItem);
           setTimeout( () => {
            //let's hack the scroll to the bottom?
            var messageDiv = document.getElementById("message-list");
            messageDiv.scrollTop = messageDiv.scrollHeight;
          }, 0);
        }
      });
      console.log(this.pollSub);
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
          if(messageItem.id > this.lastMessageId) {
            this.lastMessageId = messageItem.id;
          }
          this.messageList.push(messageItem);
          setTimeout( () => {
            //let's hack the scroll to the bottom?
            var messageDiv = document.getElementById("message-list");
            messageDiv.scrollTop = messageDiv.scrollHeight;
          }, 0);
        }
    });
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
        messageItem.messageSender =  this.currentUser;
        messageItem.conversationId = this.conversation.id;
        messageItem.owner = true;
        messageItem.messageOwnerId = this.curretUserId;
        this.messageService.insertMessage(messageItem).subscribe(result => {
          this.updateMessages();
        });
        
        //end message insert block
        this.allMessageList.push(messageItem);
        
      });
      this.conversationSelectService.conversationSelectEvent$.subscribe((conversationIdNew) => {
        //this is where we change the conversation
        this.conversation = this.conversationList.filter(x => x.id == conversationIdNew)[0];
        this.pollSub.unsubscribe();
        this.updateMessages();
        this.pollMessages();
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
  
  addNewConvo() {
    // var newConversationName = prompt("Enter New Conversation Name with names seperated by comma's Ex. Bob,John");
    var dialog = <any> document.querySelector('dialog');
    dialog.showModal();
    
    
    // dialog.querySelector('.close').addEventListener('click', function() {
    //   dialog.close();
    // });
  }
  closeConvo() {
    var dialog = <any> document.querySelector('dialog');
    dialog.close();
  }
  
  startNewConvo() {
    var dialog = <any> document.querySelector('dialog');
    dialog.close();
    
    this.conversationService.postNewConversation(this.conversationTxt + "," + this.currentUser).subscribe((result) => {
      console.log(result);
      this.conversationService.getAll().subscribe((data: any[]) => {
         this.conversationList = [];
         this.messageList = [];
         for(let i = 0; i < data.length; i++){
          let conversationItem = new ConversationItem();
          conversationItem.id = data[i].conversation_id;
          conversationItem.conversationItemTitle = data[i].conversation_name;
          this.conversationList.push(conversationItem);
        }
        this.conversation = this.conversationList[0];
        this.conversationList[0].selected = true;
        this.pollSub.unsubscribe();
        this.updateMessages();
        this.pollMessages();
      });
    });
  }

}
