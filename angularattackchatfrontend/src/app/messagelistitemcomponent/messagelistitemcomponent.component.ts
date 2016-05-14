import { Component, OnInit, Input } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import {MessageItem} from '../models/messageitem';
@Component({
  moduleId: module.id,
  selector: 'app-messagelistitemcomponent',
  templateUrl: 'messagelistitemcomponent.component.html',
  styleUrls: ['messagelistitemcomponent.component.css']
})
export class MessagelistitemcomponentComponent implements OnInit {
  @Input() messageItem : MessageItem;
  constructor() {
    this.messageItem = new MessageItem();
    this.messageItem.owner = true;
    this.messageItem.messageText = "testing text";
    this.messageItem.messageSender = "testing";
  }

  ngOnInit() {
  }

}
