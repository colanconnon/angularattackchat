import { Component, OnInit } from '@angular/core';
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
  }

  ngOnInit() {
  }

}
