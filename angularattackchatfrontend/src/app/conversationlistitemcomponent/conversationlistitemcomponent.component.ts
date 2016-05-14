import { Component, OnInit, Input } from '@angular/core';
import{ConversationItem} from '../models/conversationitem';

@Component({
  moduleId: module.id,
  selector: 'app-conversationlistitemcomponent',
  templateUrl: 'conversationlistitemcomponent.component.html',
  styleUrls: ['conversationlistitemcomponent.component.css']
})
export class ConversationlistitemcomponentComponent implements OnInit {
  @Input() conversationItem : ConversationItem;
  constructor() {}

  ngOnInit() {
  }

}
