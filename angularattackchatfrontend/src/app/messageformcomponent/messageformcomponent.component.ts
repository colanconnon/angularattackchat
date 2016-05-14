import { Component, OnInit } from '@angular/core';
import {MessageSubmitService} from '../Services/MessageSubmit.service';
@Component({
  moduleId: module.id,
  selector: 'app-messageformcomponent',
  templateUrl: 'messageformcomponent.component.html',
  styleUrls: ['messageformcomponent.component.css'],

})
export class MessageformcomponentComponent implements OnInit {
  public text: string;
  
  constructor(private messageSubmitSerivce: MessageSubmitService) {}

  ngOnInit() {
    
  }
  messageSubmit() {

    this.messageSubmitSerivce.announceMessageSend(this.text);
    this.text = '';
  }

}
