import { Component, OnInit } from '@angular/core';
import {NgFor} from '@angular/common';
import {ConversationlistitemcomponentComponent}  from '../conversationlistitemcomponent';
import{ConversationItem} from '../models/conversationitem';
@Component({
  moduleId: module.id,
  selector: 'app-conversationlistcomponent',
  templateUrl: 'conversationlistcomponent.component.html',
  styleUrls: ['conversationlistcomponent.component.css'],
  directives: [ConversationlistitemcomponentComponent, NgFor]
})
export class ConversationlistcomponentComponent implements OnInit {
  public converstionItems : Array<ConversationItem>;
  constructor() {
    this.converstionItems = new Array<ConversationItem>();
    let conversationItem1 = new ConversationItem();
    conversationItem1.conversationItemTitle = "Testing";
    conversationItem1.conversationItemText = "Testing123";
    conversationItem1.id = 1;
    
     let conversationItem2 = new ConversationItem();
    conversationItem2.conversationItemTitle = "Testing";
    conversationItem2.conversationItemText = "Testing123";
    conversationItem2.id = 1;
    
    this.converstionItems.push(conversationItem1);
    this.converstionItems.push(conversationItem2);
  }

  ngOnInit() {
    
  }

}
