import { Component, OnInit } from '@angular/core';
import {ConversationlistitemcomponentComponent}  from '../conversationlistitemcomponent';
@Component({
  moduleId: module.id,
  selector: 'app-conversationlistcomponent',
  templateUrl: 'conversationlistcomponent.component.html',
  styleUrls: ['conversationlistcomponent.component.css'],
  directives: [ConversationlistitemcomponentComponent]
})
export class ConversationlistcomponentComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
