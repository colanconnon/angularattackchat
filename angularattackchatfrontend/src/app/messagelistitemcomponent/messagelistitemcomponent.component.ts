import { Component, OnInit } from '@angular/core';
import {MessageItem} from '../models/messageitem';
@Component({
  moduleId: module.id,
  selector: 'app-messagelistitemcomponent',
  templateUrl: 'messagelistitemcomponent.component.html',
  styleUrls: ['messagelistitemcomponent.component.css']
})
export class MessagelistitemcomponentComponent implements OnInit {
  private messageItem : MessageItem;
  constructor() {}

  ngOnInit() {
  }

}
