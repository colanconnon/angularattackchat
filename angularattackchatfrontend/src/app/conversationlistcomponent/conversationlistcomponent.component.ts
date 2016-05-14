import { Component, OnInit, Input } from '@angular/core';
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
  @Input() conversationItems : Array<ConversationItem>;
  constructor() {
    
   
  }

  ngOnInit() {
    
  }
  
  itemClicked(item: ConversationItem){
    alert(item.conversationItemText);
  }
}
