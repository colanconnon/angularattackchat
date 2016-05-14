import { Component, OnInit } from '@angular/core';
import {ConversationlistcomponentComponent} from '../conversationlistcomponent/conversationlistcomponent.component';
import { MessagelistcomponentComponent } from '../messagelistcomponent/';

@Component({
  moduleId: module.id,
  selector: 'app-rootmessagecomponent',
  templateUrl: 'rootmessagecomponent.component.html',
  styleUrls: ['rootmessagecomponent.component.css'],
  directives: [ConversationlistcomponentComponent, MessagelistcomponentComponent]
})
export class RootmessagecomponentComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
