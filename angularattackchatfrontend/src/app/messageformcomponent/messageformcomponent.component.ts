import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-messageformcomponent',
  templateUrl: 'messageformcomponent.component.html',
  styleUrls: ['messageformcomponent.component.css']
})
export class MessageformcomponentComponent implements OnInit {
  public text: string;
  
  constructor() {}

  ngOnInit() {
    
  }
  messageSubmit() {
    alert(this.text);
  }

}
