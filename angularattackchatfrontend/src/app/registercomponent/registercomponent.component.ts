import { Component, OnInit, AfterViewInit } from '@angular/core';
import {RegisterService} from '../Services/Register.service';
import { RouteParams, Router } from '@angular/router-deprecated';

declare var componentHandler;
@Component({
  moduleId: module.id,
  selector: 'app-registercomponent',
  templateUrl: 'registercomponent.component.html',
  styleUrls: ['registercomponent.component.css'],
  providers: [RegisterService]
})
export class RegistercomponentComponent implements OnInit, AfterViewInit {
  private username: string;
  private password: string;
  private confirmPassword: string;
  
  constructor(private registerService: RegisterService,
              private router: Router) {}

  ngOnInit() {
  }
  ngAfterViewInit() {
        componentHandler.upgradeAllRegistered();
  }
  
  Register() {
    
  }
  
  goToLogin() {
    this.router.navigate(["Login"]);
  }

}
