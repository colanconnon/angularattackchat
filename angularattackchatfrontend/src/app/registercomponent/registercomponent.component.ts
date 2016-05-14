import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var componentHandler;
@Component({
  moduleId: module.id,
  selector: 'app-registercomponent',
  templateUrl: 'registercomponent.component.html',
  styleUrls: ['registercomponent.component.css']
})
export class RegistercomponentComponent implements OnInit, AfterViewInit {

  constructor() {}

  ngOnInit() {
  }
  ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
    }

}
