import { Component, OnInit, Input } from '@angular/core';
import {ConversationItem} from '../models/conversationitem';
import {ConversationSelectService} from '../Services/ConversationSelect.service'; 

@Component({
  moduleId: module.id,
  selector: 'app-conversationlistitemcomponent',
  templateUrl: 'conversationlistitemcomponent.component.html',
  styleUrls: ['conversationlistitemcomponent.component.css']
})
export class ConversationlistitemcomponentComponent implements OnInit {
  @Input() conversationItem : ConversationItem;
  constructor(private conversationSelectServce: ConversationSelectService) {
    
  }

  ngOnInit() {
  }
  
  itemClicked() {
    this.conversationSelectServce.annouceConversationSelect(this.conversationItem.id);
  }

}
