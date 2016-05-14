import { Component, OnInit, Input } from '@angular/core';
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
  @Input() messageListItems: Array<MessageItem>;
  constructor() {
    
    
  }

  ngOnInit() {
  }

}
