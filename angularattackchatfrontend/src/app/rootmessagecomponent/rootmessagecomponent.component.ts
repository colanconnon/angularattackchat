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
      if(data != null && data.length > 0) {
        console.log("Test");
          for(let i = 0; i < data.length; i++){
            let conversationItem = new ConversationItem();
            conversationItem.id = data[i].conversation_id;
            conversationItem.conversationItemTitle = data[i].conversation_name;
            if(data[i].message_text === null) {
              conversationItem.conversationItemText = "";
            } 
            else {
              conversationItem.conversationItemText = data[i].message_text;
            }
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
      }
    
    });
    
    
    this.conversationService.getAllPoll().subscribe((data: any[]) => {
      console.log(data.length);
      if(data != null && data.length > 0 ) {
          console.log("Test1");
         this.conversationList = [];
          for(let i = 0; i < data.length; i++){
            let conversationItem = new ConversationItem();
            conversationItem.id = data[i].conversation_id;
            conversationItem.conversationItemTitle = data[i].conversation_name;
            if(data[i].message_text === null) {
              conversationItem.conversationItemText = "";
            } 
            else {
              conversationItem.conversationItemText = data[i].message_text;
            }
            if(this.conversation != null) {
              if(conversationItem.id == this.conversation.id){
                conversationItem.selected = true;
              }
            } 
            
            this.conversationList.push(conversationItem);
            if(this.conversation == null){
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
            }//end if
          }
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
            if(messageItem.owner == false){
              this.notifyMe(messageItem.messageSender + " Says  " + messageItem.messageText);
            }
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
    
  }
  
  addNewConvo() {
    // var newConversationName = prompt("Enter New Conversation Name with names seperated by comma's Ex. Bob,John");
    var dialog = <any> document.querySelector('dialog');
    dialog.showModal();
    
    
    
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
          conversationItem.conversationItemText = "";
          this.conversationList.push(conversationItem);
        }
        this.conversation = this.conversationList[0];
        console.log(this.conversation);
        this.conversationList[0].selected = true;
        if(this.pollSub){
          this.pollSub.unsubscribe();
        }
        this.updateMessages();
        this.pollMessages();
      });
    });
  }
  
  logout() {
    localStorage.clear();
    this.router.navigate(['Login']);
  }

}
