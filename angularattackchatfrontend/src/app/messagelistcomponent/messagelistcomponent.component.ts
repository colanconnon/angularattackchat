import { Component, OnInit } from '@angular/core';
import {NgFor, NgIf} from '@angular/common';
import {MessageItem} from '../models/messageitem';
import { MessagelistitemcomponentComponent} from '../messagelistitemcomponent';
@Component({
  moduleId: module.id,
  selector: 'app-messagelistcomponent',
  templateUrl: 'messagelistcomponent.component.html',
  styleUrls: ['messagelistcomponent.component.css'],
  directives: [MessagelistitemcomponentComponent]
})
export class MessagelistcomponentComponent implements OnInit {
  public messageListItems: Array<MessageItem>;
  constructor() {
    this.messageListItems = new Array<MessageItem>();
    let messageItem = new MessageItem();
    messageItem.owner = true;
    messageItem.messageText = "testing text";
    messageItem.messageSender = "testing";
    this.messageListItems.push(messageItem);
    
    let messageItem1 = new MessageItem();
    messageItem1.owner = false;
    messageItem1.messageText = "testing text2";
    messageItem1.messageSender = "testing2";
    this.messageListItems.push(messageItem1);
  }

  ngOnInit() {
  }

}
